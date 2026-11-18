import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ContactCategory } from '../data/emanusData';

interface ContactSectionProps {
  compact?: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  category?: string;
  subject?: string;
  message?: string;
}

interface SuccessReceipt {
  referenceId: string;
  message: string;
  whatsappUrl: string;
  mailtoUrl: string;
  channels: {
    stored: boolean;
    emailDelivered: boolean;
    whatsappDelivered: boolean;
  };
}

export function ContactSection({ compact = false }: ContactSectionProps) {
  const {
    content,
    locale,
    selectedContactCategory,
    setSelectedContactCategory,
    contactSubjectPreset,
    setContactSubjectPreset,
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<SuccessReceipt | null>(null);

  const formLoadedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (contactSubjectPreset) {
      setSubject(contactSubjectPreset);
      setContactSubjectPreset('');
    }
  }, [contactSubjectPreset, setContactSubjectPreset]);

  const validateClient = (): FormErrors => {
    const errors: FormErrors = {};
    if (fullName.trim().length < 2) {
      errors.fullName =
        locale === 'pt'
          ? 'Indique o seu nome completo.'
          : 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email =
        locale === 'pt'
          ? 'Indique um endereço de email válido.'
          : 'Please enter a valid email address.';
    }
    if (subject.trim().length < 3) {
      errors.subject =
        locale === 'pt'
          ? 'Indique o assunto (mínimo 3 caracteres).'
          : 'Please enter a subject (at least 3 characters).';
    }
    if (message.trim().length < 15) {
      errors.message =
        locale === 'pt'
          ? 'Escreva uma mensagem com pelo menos 15 caracteres.'
          : 'Please write a message of at least 15 characters.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const errors = validateClient();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          organization: organization.trim(),
          category: selectedContactCategory,
          subject: subject.trim(),
          message: message.trim(),
          website: honeypot,
          formLoadedAt: formLoadedAtRef.current,
          locale,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        referenceId?: string;
        message?: string;
        whatsappUrl?: string;
        mailtoUrl?: string;
        channels?: {
          stored: boolean;
          emailDelivered: boolean;
          whatsappDelivered: boolean;
        };
        fieldErrors?: FormErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setServerError(
          data.message ||
            (locale === 'pt'
              ? 'Não foi possível enviar a sua mensagem. Verifique os campos e tente novamente.'
              : 'Unable to send your message. Please check your details and try again.')
        );
        return;
      }

      const fallbackBody = [
        `Novo contacto EMANUS (${data.referenceId || 'EM'})`,
        `Categoria: ${selectedContactCategory}`,
        `Nome: ${fullName.trim()}`,
        `Email: ${email.trim()}`,
        `Organização: ${organization.trim() || 'Não indicada'}`,
        `Assunto: ${subject.trim()}`,
        '',
        message.trim(),
      ].join('\n');

      setSuccessReceipt({
        referenceId: data.referenceId || 'EM-REGISTADO',
        message: data.message || content.contact.form.successTitle,
        whatsappUrl:
          data.whatsappUrl ||
          `https://wa.me/${content.footer.whatsappNumber}?text=${encodeURIComponent(fallbackBody)}`,
        mailtoUrl:
          data.mailtoUrl ||
          `mailto:${content.footer.emailDisplay}?subject=${encodeURIComponent(`[EMANUS] ${subject.trim()}`)}&body=${encodeURIComponent(fallbackBody)}`,
        channels: data.channels || {
          stored: true,
          emailDelivered: false,
          whatsappDelivered: false,
        },
      });
      setFullName('');
      setEmail('');
      setOrganization('');
      setSubject('');
      setMessage('');
      setHoneypot('');
      formLoadedAtRef.current = Date.now();
    } catch {
      setServerError(
        locale === 'pt'
          ? 'Falha de ligação ao servidor. Verifique a sua ligação e tente novamente.'
          : 'Connection error while reaching the server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setSuccessReceipt(null);
    setServerError(null);
    formLoadedAtRef.current = Date.now();
  };

  return (
    <section
      id="contactos"
      className={compact ? 'py-20 sm:py-24 bg-[#F6F7F9]' : 'py-16 sm:py-24 bg-white'}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left column: Editorial copy, direct channels, and category selector */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.06em] text-[#D91414] mb-3">
              {content.contact.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B0D12] text-balance">
              {content.contact.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#667085]">
              {content.contact.subtitle}
            </p>

            {/* Direct institutional WhatsApp & Email channels */}
            <div className="mt-8 pt-8 border-t border-slate-200/80 space-y-3">
              <p className="text-sm font-semibold text-[#101828]">
                {content.contact.institutionalNoteTitle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 pt-1">
                <a
                  href={`https://wa.me/${content.footer.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-colors hover:border-[#0B0D12]"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#0B0D12]" />
                    <span className="truncate">
                      <span className="block text-xs text-[#667085]">WhatsApp</span>
                      <span className="font-medium text-[#0B0D12] tabular-nums">
                        {content.footer.whatsappDisplay}
                      </span>
                    </span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#667085]" />
                </a>

                <a
                  href={`mailto:${content.footer.emailDisplay}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-colors hover:border-[#D91414]"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Mail className="h-4 w-4 shrink-0 text-[#D91414]" />
                    <span className="truncate">
                      <span className="block text-xs text-[#667085]">Email</span>
                      <span className="font-medium text-[#0B0D12] truncate block">
                        {content.footer.emailDisplay}
                      </span>
                    </span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#667085]" />
                </a>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-xs font-medium text-[#667085]">
                {content.contact.categoriesLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {content.contact.categories.map((cat) => {
                  const active = selectedContactCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setSelectedContactCategory(cat.value as ContactCategory)}
                      className={`text-left rounded-xl border p-4 transition-colors duration-150 ${
                        active
                          ? 'border-[#D91414] bg-white'
                          : 'border-slate-200/90 bg-white/70 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            active ? 'text-[#D91414]' : 'text-[#101828]'
                          }`}
                        >
                          {cat.label}
                        </span>
                        <span
                          className={`text-xs font-mono ${
                            active ? 'text-[#D91414]' : 'text-[#667085]'
                          }`}
                        >
                          {active ? (locale === 'pt' ? 'Selecionado' : 'Selected') : ''}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#667085]">
                        {cat.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column: Validated real-backend contact form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
              {successReceipt ? (
                <div className="py-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#D91414]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[#0B0D12]">
                    {content.contact.form.successTitle}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#667085]">
                    {successReceipt.message}
                  </p>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-[#F6F7F9] p-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[#667085]">
                        {content.contact.form.referenceLabel}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#0B0D12] tabular-nums">
                        {successReceipt.referenceId}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200/80 text-xs text-[#667085] space-y-1">
                      <p>
                        Email ({content.footer.emailDisplay}):{' '}
                        <span className="font-medium text-[#0B0D12]">
                          {successReceipt.channels.emailDelivered
                            ? locale === 'pt'
                              ? 'Enviado automaticamente'
                              : 'Sent automatically'
                            : locale === 'pt'
                              ? 'Pronto para envio direto'
                              : 'Ready for direct send'}
                        </span>
                      </p>
                      <p>
                        WhatsApp ({content.footer.whatsappDisplay}):{' '}
                        <span className="font-medium text-[#0B0D12]">
                          {successReceipt.channels.whatsappDelivered
                            ? locale === 'pt'
                              ? 'Enviado automaticamente'
                              : 'Sent automatically'
                            : locale === 'pt'
                              ? 'Pronto para envio direto'
                              : 'Ready for direct send'}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Direct 1-click handoff to WhatsApp 940843801 & Email emanueldejesus617@gmail.com */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href={successReceipt.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0B0D12] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1F242D]"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" />
                      <span>
                        {locale === 'pt'
                          ? `Enviar no WhatsApp (${content.footer.whatsappDisplay})`
                          : `Send via WhatsApp (${content.footer.whatsappDisplay})`}
                      </span>
                    </a>
                    <a
                      href={successReceipt.mailtoUrl}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#D91414] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B80E0E]"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>
                        {locale === 'pt'
                          ? 'Enviar por Email'
                          : 'Send via Email'}
                      </span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetSuccess}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-[#101828] transition-colors hover:bg-[#F6F7F9] cursor-pointer"
                  >
                    {content.contact.form.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot field for anti-spam protection */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {serverError && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                    >
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-[#101828]"
                      >
                        {content.contact.form.fullNameLabel}
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (fieldErrors.fullName) {
                            setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        placeholder={content.contact.form.fullNamePlaceholder}
                        className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-slate-400 transition-colors focus:border-[#D91414] focus:outline-none ${
                          fieldErrors.fullName ? 'border-red-400 bg-red-50/40' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {fieldErrors.fullName && (
                        <p className="mt-1.5 text-xs text-red-600">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#101828]"
                      >
                        {content.contact.form.emailLabel}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder={content.contact.form.emailPlaceholder}
                        className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-slate-400 transition-colors focus:border-[#D91414] focus:outline-none ${
                          fieldErrors.email ? 'border-red-400 bg-red-50/40' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-[#101828]"
                      >
                        {content.contact.form.organizationLabel}
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={content.contact.form.organizationPlaceholder}
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-slate-400 transition-colors focus:border-[#D91414] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-[#101828]"
                      >
                        {content.contact.form.categoryLabel}
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={selectedContactCategory}
                        onChange={(e) =>
                          setSelectedContactCategory(e.target.value as ContactCategory)
                        }
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#101828] transition-colors focus:border-[#D91414] focus:outline-none"
                      >
                        {content.contact.categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#101828]"
                    >
                      {content.contact.form.subjectLabel}
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (fieldErrors.subject) {
                          setFieldErrors((prev) => ({ ...prev, subject: undefined }));
                        }
                      }}
                      placeholder={content.contact.form.subjectPlaceholder}
                      className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-slate-400 transition-colors focus:border-[#D91414] focus:outline-none ${
                        fieldErrors.subject ? 'border-red-400 bg-red-50/40' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {fieldErrors.subject && (
                      <p className="mt-1.5 text-xs text-red-600">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#101828]"
                    >
                      {content.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) {
                          setFieldErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder={content.contact.form.messagePlaceholder}
                      className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-slate-400 transition-colors focus:border-[#D91414] focus:outline-none resize-y ${
                        fieldErrors.message ? 'border-red-400 bg-red-50/40' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1.5 text-xs text-red-600">{fieldErrors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs leading-relaxed text-[#667085] max-w-sm">
                      {content.contact.form.privacyNotice}
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D91414] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#B80E0E] disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{content.contact.form.submittingButton}</span>
                        </>
                      ) : (
                        <>
                          <span>{content.contact.form.submitButton}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
