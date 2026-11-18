import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import nodemailer from 'nodemailer';

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
}

type VercelReq = IncomingMessage & {
  body?: unknown;
};

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

function formatPlainTextBody(record: ContactRecord): string {
  return [
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
  ].join('\n');
}

async function readJsonBody(req: VercelReq): Promise<Record<string, unknown> | null> {
  if (req.body && typeof req.body === 'object') {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  if (chunks.length === 0) {
    return null;
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
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
    } catch {
      // Fallback to SMTP below if configured
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
    } catch {
      return false;
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
      return res.ok;
    } catch {
      return false;
    }
  }

  return false;
}

export default async function handler(req: VercelReq, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, message: 'Method not allowed.' });
    return;
  }

  const now = Date.now();
  const body = await readJsonBody(req);
  if (!body) {
    sendJson(res, 400, {
      ok: false,
      code: 'INVALID_BODY',
      message: 'Pedido inválido. Verifique os dados enviados.',
    });
    return;
  }

  const honeypot = sanitizeText(body.website, 120);
  if (honeypot.length > 0) {
    sendJson(res, 400, {
      ok: false,
      code: 'SPAM_REJECTED',
      message: 'Não foi possível validar o envio do formulário.',
    });
    return;
  }

  const formLoadedAt = Number(body.formLoadedAt);
  if (!Number.isFinite(formLoadedAt) || now - formLoadedAt < 2000 || formLoadedAt > now + 5000) {
    sendJson(res, 400, {
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
    sendJson(res, 422, {
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
  };

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

  const formattedText = formatPlainTextBody(record);
  const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedText)}`;
  const mailtoSubject = `[EMANUS · ${record.category}] ${record.subject} (${record.referenceId})`;
  const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(formattedText)}`;

  sendJson(res, 201, {
    ok: true,
    referenceId,
    receivedAt: record.receivedAt,
    targetEmail: TARGET_EMAIL,
    targetWhatsapp: '+244 940 843 801',
    whatsappUrl,
    mailtoUrl,
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
}
