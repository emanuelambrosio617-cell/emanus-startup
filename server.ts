import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DATA_DIR = path.resolve(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'contact-submissions.ndjson');

const TARGET_EMAIL =
  process.env.CONTACT_TARGET_EMAIL?.trim() || 'emanueldejesus617@gmail.com';
const TARGET_WHATSAPP_NUMBER = (
  process.env.CONTACT_WHATSAPP_NUMBER?.trim() || '244940843801'
).replace(/\D/g, '');

const ALLOWED_CATEGORIES = new Set([
  'Parcerias',
  'Investimentos',
  'Colaboração',
  'Informações gerais',
]);

interface RateLimitEntry {
  timestamps: number[];
}

interface ContactRecord {
  referenceId: string;
  receivedAt: string;
  fullName: string;
  email: string;
  organization: string | null;
  category: string;
  subject: string;
  message: string;
  locale: 'pt' | 'en';
  ipHash: string;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip: string, now: number): boolean {
  const existing = rateLimitStore.get(ip);
  if (!existing) {
    rateLimitStore.set(ip, { timestamps: [now] });
    return false;
  }

  const recent = existing.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, { timestamps: recent });
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, { timestamps: recent });
  return false;
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}

function sanitizeMessage(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function resolveBaseUrl(req: Request): string {
  const configured = process.env.APP_URL?.trim();
  if (configured && configured.startsWith('http')) {
    return configured.replace(/\/+$/, '');
  }
  const protocol = req.headers['x-forwarded-proto'] === 'https' ? 'https' : req.protocol;
  const host = req.get('host') || `localhost:${PORT}`;
  return `${protocol}://${host}`;
}

function formatPlainTextBody(record: ContactRecord): string {
  const lines = [
    `Novo contacto institucional — EMANUS (${record.referenceId})`,
    '',
    `Categoria: ${record.category}`,
    `Nome: ${record.fullName}`,
    `Email: ${record.email}`,
    `Organização: ${record.organization || 'Não indicada'}`,
    `Assunto: ${record.subject}`,
    '',
    'Mensagem:',
    record.message,
    '',
    `Recebido em: ${record.receivedAt}`,
  ];
  return lines.join('\n');
}

function buildWhatsappUrl(record: ContactRecord): string {
  const text = formatPlainTextBody(record);
  return `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function buildMailtoUrl(record: ContactRecord): string {
  const emailSubject = `[EMANUS · ${record.category}] ${record.subject} (${record.referenceId})`;
  const emailBody = formatPlainTextBody(record);
  return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}

async function trySendEmail(record: ContactRecord): Promise<boolean> {
  const emailSubject = `[EMANUS · ${record.category}] ${record.subject} (${record.referenceId})`;
  const textBody = formatPlainTextBody(record);

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      const fromAddress =
        process.env.RESEND_FROM_EMAIL?.trim() || 'EMANUS Website <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [TARGET_EMAIL],
          reply_to: record.email,
          subject: emailSubject,
          text: textBody,
        }),
      });
      if (res.ok) {
        return true;
      }
      console.error('[EMANUS] Resend email error:', res.status, await res.text());
    } catch (err) {
      console.error('[EMANUS] Resend request failed:', err);
    }
  }

  const smtpUser = process.env.SMTP_USER?.trim() || process.env.GMAIL_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim() || process.env.GMAIL_APP_PASSWORD?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
      await transporter.sendMail({
        from: `"EMANUS Website" <${smtpUser}>`,
        to: TARGET_EMAIL,
        replyTo: `${record.fullName} <${record.email}>`,
        subject: emailSubject,
        text: textBody,
      });
      return true;
    } catch (err) {
      console.error('[EMANUS] SMTP email delivery failed:', err);
    }
  }

  return false;
}

async function trySendWhatsapp(record: ContactRecord): Promise<boolean> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();

  if (accessToken && phoneNumberId) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: TARGET_WHATSAPP_NUMBER,
            type: 'text',
            text: {
              body: formatPlainTextBody(record).slice(0, 4000),
            },
          }),
        }
      );
      if (res.ok) {
        return true;
      }
      console.error('[EMANUS] WhatsApp Cloud API error:', res.status, await res.text());
    } catch (err) {
      console.error('[EMANUS] WhatsApp Cloud API request failed:', err);
    }
  }

  return false;
}

async function startServer(): Promise<void> {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));

  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = resolveBaseUrl(req);
    res.type('text/plain; charset=utf-8');
    res.send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = resolveBaseUrl(req);
    const routes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/sobre', priority: '0.8', changefreq: 'monthly' },
      { path: '/projetos', priority: '0.9', changefreq: 'weekly' },
      { path: '/projetos/emanus-ia', priority: '0.9', changefreq: 'monthly' },
      { path: '/projetos/premier-fit', priority: '0.9', changefreq: 'monthly' },
      { path: '/projetos/famebook', priority: '0.9', changefreq: 'monthly' },
      { path: '/inovacao', priority: '0.8', changefreq: 'monthly' },
      { path: '/equipa', priority: '0.8', changefreq: 'monthly' },
      { path: '/contactos', priority: '0.8', changefreq: 'monthly' },
    ];
    const lastmod = new Date().toISOString().split('T')[0];
    const urlNodes = routes
      .map(
        (route) =>
          `  <url>\n    <loc>${baseUrl}${route.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`
      )
      .join('\n');

    res.type('application/xml; charset=utf-8');
    res.send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>\n`
    );
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'emanus-web' });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const now = Date.now();
    const clientIp = getClientIp(req);

    if (isRateLimited(clientIp, now)) {
      res.status(429).json({
        ok: false,
        code: 'RATE_LIMITED',
        message:
          'Demasiados pedidos num curto período. Por favor, aguarde alguns minutos antes de tentar novamente.',
      });
      return;
    }

    const body = req.body as Record<string, unknown> | undefined;
    if (!body || typeof body !== 'object') {
      res.status(400).json({
        ok: false,
        code: 'INVALID_BODY',
        message: 'Pedido inválido. Verifique os dados enviados.',
      });
      return;
    }

    const honeypot = sanitizeText(body.website, 120);
    if (honeypot.length > 0) {
      res.status(400).json({
        ok: false,
        code: 'SPAM_REJECTED',
        message: 'Não foi possível validar o envio do formulário.',
      });
      return;
    }

    const formLoadedAt = Number(body.formLoadedAt);
    if (!Number.isFinite(formLoadedAt) || now - formLoadedAt < 2000 || formLoadedAt > now + 5000) {
      res.status(400).json({
        ok: false,
        code: 'SUBMISSION_TOO_FAST',
        message: 'Por favor, reveja os seus dados antes de submeter o formulário.',
      });
      return;
    }

    const fullName = sanitizeText(body.fullName, 120);
    const email = sanitizeText(body.email, 160).toLowerCase();
    const organization = sanitizeText(body.organization, 120);
    const category = sanitizeText(body.category, 60);
    const subject = sanitizeText(body.subject, 160);
    const message = sanitizeMessage(body.message, 3000);
    const locale: 'pt' | 'en' = sanitizeText(body.locale, 10) === 'en' ? 'en' : 'pt';

    const fieldErrors: Record<string, string> = {};

    if (fullName.length < 2) {
      fieldErrors.fullName = 'Indique o seu nome completo.';
    }
    if (!isValidEmail(email)) {
      fieldErrors.email = 'Indique um endereço de email válido.';
    }
    if (!ALLOWED_CATEGORIES.has(category)) {
      fieldErrors.category = 'Selecione uma categoria de contacto válida.';
    }
    if (subject.length < 3) {
      fieldErrors.subject = 'Indique o assunto da mensagem (mínimo 3 caracteres).';
    }
    if (message.length < 15) {
      fieldErrors.message = 'Escreva uma mensagem com pelo menos 15 caracteres.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(422).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Existem campos que precisam de atenção.',
        fieldErrors,
      });
      return;
    }

    const referenceId = `EM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const record: ContactRecord = {
      referenceId,
      receivedAt: new Date(now).toISOString(),
      fullName,
      email,
      organization: organization || null,
      category,
      subject,
      message,
      locale,
      ipHash: crypto.createHash('sha256').update(clientIp).digest('hex').slice(0, 16),
    };

    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.appendFile(SUBMISSIONS_FILE, `${JSON.stringify(record)}\n`, 'utf8');

      const [emailDelivered, whatsappDelivered] = await Promise.all([
        trySendEmail(record),
        trySendWhatsapp(record),
      ]);

      const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
      if (webhookUrl && webhookUrl.startsWith('https://')) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...record,
            targetEmail: TARGET_EMAIL,
            targetWhatsapp: TARGET_WHATSAPP_NUMBER,
          }),
        }).catch(() => undefined);
      }

      res.status(201).json({
        ok: true,
        referenceId,
        receivedAt: record.receivedAt,
        targetEmail: TARGET_EMAIL,
        targetWhatsapp: '+244 940 843 801',
        whatsappUrl: buildWhatsappUrl(record),
        mailtoUrl: buildMailtoUrl(record),
        channels: {
          stored: true,
          emailDelivered,
          whatsappDelivered,
        },
        message:
          emailDelivered && whatsappDelivered
            ? 'Mensagem registada e encaminhada para o email e WhatsApp da EMANUS.'
            : 'Mensagem registada com sucesso no sistema da EMANUS. Pode concluir o envio direto abaixo para o WhatsApp ou Email.',
      });
    } catch (error) {
      console.error('[EMANUS] Failed to persist contact submission:', error);
      res.status(500).json({
        ok: false,
        code: 'STORAGE_ERROR',
        message:
          'Ocorreu um erro interno ao registar a sua mensagem. Por favor, tente novamente mais tarde.',
      });
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EMANUS server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start EMANUS server:', err);
  process.exit(1);
});
