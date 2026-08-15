import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import emailjs from "@emailjs/browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaRegClock,
  FaTelegramPlane,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import emailVisual from "../../assets/me/resume_email.png";
import { auth } from "../../firebase";
import useResolvedTheme from "../../hooks/useResolvedTheme";

const CONTACT_EMAIL = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const GOOGLE_PROVIDER_ID = "google.com";
const MAX_MESSAGE_LENGTH = 1000;
const CONTACT_PHONE = "+998 90 123 45 67";

type ContactFormState = {
  name: string;
  subject: string;
  message: string;
};

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isTextarea?: false;
};

type TextareaFieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isTextarea: true;
  maxLength: number;
};

type FormFieldProps = InputFieldProps | TextareaFieldProps;

/* ── Minimal underline-style field: quieter chrome, the accent line does the work ── */
const FormField = (props: FormFieldProps) => {
  const { label, name, value, placeholder, onChange } = props;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim().length > 0;
  const isActive = isFocused || hasValue;

  const sharedClasses =
    "peer w-full bg-transparent px-0.5 pb-3 pt-1 text-[0.95rem] text-[var(--text-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--text-muted)]/45";

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const textareaOnChange = onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void;
  const inputOnChange = onChange as (e: ChangeEvent<HTMLInputElement>) => void;

  const underline = (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--text-muted)]/20">
      <div
        className="h-full bg-[#8f7fae] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ width: isActive ? "100%" : "0%" }}
      />
    </div>
  );

  if (props.isTextarea) {
    const { maxLength } = props;

    return (
      <div className="grid gap-2">
        <div className="flex items-baseline justify-between">
          <label className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {label}
          </label>
          <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)]/60">
            {String(value.length).padStart(2, "0")}/{maxLength}
          </span>
        </div>
        <div className="relative">
          <textarea
            name={name}
            value={value}
            onChange={textareaOnChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={5}
            maxLength={maxLength}
            className={`${sharedClasses} min-h-[7.5rem] resize-none leading-6`}
          />
          {underline}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <label className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={value}
          onChange={inputOnChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={sharedClasses}
        />
        {underline}
      </div>
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  useResolvedTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [isGoogleVerified, setIsGoogleVerified] = useState(false);
  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const socialLinks = [
    { icon: <FaLinkedinIn />, label: "LinkedIn", href: "https://www.linkedin.com" },
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/m-radjabova" },
    { icon: <FaTelegramPlane />, label: "Telegram", href: "https://t.me/" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com" },
  ];

  const infoItems = [
    {
      icon: <FaEnvelope />,
      title: t("contact.email"),
      value: CONTACT_EMAIL || "hello@muslimaradjabova.uz",
      href: `mailto:${CONTACT_EMAIL || "hello@muslimaradjabova.uz"}`,
    },
    {
      icon: <FaPhoneAlt />,
      title: t("contact.phone"),
      value: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE.replace(/\s+/g, "")}`,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: t("contact.location"),
      value: t("contact.locationValue"),
    },
  ];

  const featureItems = [
    {
      title: t("contact.features.response.title"),
      description: t("contact.features.response.description"),
    },
    {
      title: t("contact.features.communication.title"),
      description: t("contact.features.communication.description"),
    },
    {
      title: t("contact.features.quality.title"),
      description: t("contact.features.quality.description"),
    },
  ];

  const handleInputChange = useCallback(
    (name: keyof ContactFormState, value: string) => {
      setFormData((current) => ({ ...current, [name]: value }));
    },
    [],
  );

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value),
    [handleInputChange],
  );
  const handleSubjectChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => handleInputChange("subject", e.target.value),
    [handleInputChange],
  );
  const handleMessageChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange("message", e.target.value),
    [handleInputChange],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.06 },
    );

    const section = sectionRef.current;
    if (section) {
      const children = section.querySelectorAll(".stagger-item");
      children.forEach((child, i) => {
        (child as HTMLElement).style.animationDelay = `${i * 0.08}s`;
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const email = user?.email?.trim() ?? "";
      const isGoogleUser =
        user?.providerData.some((provider) => provider.providerId === GOOGLE_PROVIDER_ID) ??
        false;

      setVerifiedEmail(isGoogleUser ? email : "");
      setIsGoogleVerified(Boolean(email) && isGoogleUser);
    });

    return unsubscribe;
  }, []);

  const handleGoogleVerify = async () => {
    setIsVerifyingGoogle(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email?.trim() ?? "";

      if (!email) {
        toast.error(t("contact.form.verification.toasts.missingEmail"));
        return;
      }

      setVerifiedEmail(email);
      setIsGoogleVerified(true);
      toast.success(t("contact.form.verification.toasts.success", { email }));
    } catch {
      toast.error(t("contact.form.verification.toasts.verifyError"));
    } finally {
      setIsVerifyingGoogle(false);
    }
  };

  const handleGoogleDisconnect = async () => {
    try {
      await signOut(auth);
      setVerifiedEmail("");
      setIsGoogleVerified(false);
    } catch {
      toast.error(t("contact.form.verification.toasts.disconnectError"));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.subject || !formData.message) {
      toast.error(t("contact.form.toasts.required"));
      return;
    }

    if (!verifiedEmail || !isGoogleVerified) {
      toast.error(t("contact.form.verification.toasts.required"));
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast.error(t("contact.form.toasts.configError"));
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: verifiedEmail,
          reply_to: verifiedEmail,
          subject: formData.subject,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setFormData({ name: "", subject: "", message: "" });
      toast.success(t("contact.form.toasts.success"));
    } catch {
      toast.error(t("contact.form.toasts.error"));
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-3 py-10 sm:px-4 sm:py-12 lg:px-8 lg:py-16"
    >
      {/* ── Scoped keyframes for the new signature motion ── */}
      <style>{`
        @keyframes contact-orbit-spin { to { transform: rotate(360deg); } }
        @keyframes contact-dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(120,190,140,0.35); }
          50% { box-shadow: 0 0 0 6px rgba(120,190,140,0); }
        }
        @keyframes contact-shimmer { 100% { transform: translateX(160%); } }
        @media (prefers-reduced-motion: reduce) {
          .contact-orbit, .contact-dot, .contact-shimmer { animation: none !important; }
        }
      `}</style>

      {/* ── Background: one quiet gradient field + fine grid texture, no clutter ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-6%] top-[-4%] h-[22rem] w-[22rem] sm:h-[38rem] sm:w-[38rem] lg:h-[52rem] lg:w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(143,127,174,0.14),rgba(248,243,248,0)_68%)]" />
        <div className="absolute -left-[10%] bottom-[6%] h-[16rem] w-[16rem] sm:h-[26rem] sm:w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(193,143,160,0.1),rgba(248,243,248,0)_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1450px]">
        <div className="stagger-item opacity-0">
          <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
            {/* ── Left Column: identity, contact points, socials ── */}
            <div className="max-w-[30rem]">


              <h2 className="section-title-display mt-3 text-[clamp(2.6rem,7.5vw,5.2rem)] leading-[0.98] text-[var(--text-primary)]">
                {t("contact.form.title")}
              </h2>

              <p className="mt-4 max-w-sm text-[0.95rem] font-medium leading-7 text-[var(--text-secondary)]">
                {t("contact.workTogetherText")}
              </p>

              {/* ── Availability status — the one confident signal ── */}
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[rgba(220,211,228,0.9)] bg-white/70 py-2 pl-3 pr-4 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="contact-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                  <span
                    className="contact-dot absolute inline-flex h-full w-full rounded-full"
                    style={{ animation: "contact-dot-pulse 2.2s ease-out infinite" }}
                  />
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                  <FaRegClock className="text-[10px] text-[var(--text-muted)]" />
                  {t("contact.availability")}
                  <span className="text-[var(--text-primary)]">{t("contact.availabilityValue")}</span>
                </span>
              </div>

              {/* ── Contact points: hairline list, not boxed cards ── */}
              <div className="mt-8 divide-y divide-[rgba(220,211,228,0.6)] border-y border-[rgba(220,211,228,0.6)]">
                {infoItems.map((item) => {
                  const rowContent = (
                    <div className="group flex items-center justify-between gap-4 py-4">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(220,211,228,0.9)] text-[0.85rem] text-[#8f7fae] transition-colors duration-300 group-hover:border-[#8f7fae]/50 group-hover:text-[#726a9c]">
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                            {item.title}
                          </p>
                          <p className="mt-0.5 truncate text-[0.92rem] font-medium text-[var(--text-primary)]">
                            {item.value}
                          </p>
                        </div>
                      </div>
                      {item.href && (
                        <FaArrowRight className="shrink-0 -translate-x-1 text-[0.7rem] text-[var(--text-muted)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#8f7fae] group-hover:opacity-100" />
                      )}
                    </div>
                  );

                  return item.href ? (
                    <a key={item.title} href={item.href} className="block">
                      {rowContent}
                    </a>
                  ) : (
                    <div key={item.title}>{rowContent}</div>
                  );
                })}
              </div>

              {/* ── Socials + CTA ── */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(220,211,228,0.9)] text-[1.05rem] text-[var(--text-secondary)] transition-all duration-300 hover:border-[#8f7fae]/50 hover:text-[#726a9c] hover:-translate-y-0.5"
                  >
                    {item.icon}
                  </a>
                ))}

                <button
                  type="button"
                  onClick={isFormOpen ? handleCloseForm : handleOpenForm}
                  className="group ml-auto inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-primary,#fff)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(114,106,156,0.24)]"
                  style={{ backgroundColor: "#726a9c" }}
                >
                  <span>{isFormOpen ? t("contact.actions.hideForm") : t("contact.actions.openForm")}</span>
                  <FaArrowRight
                    className={`text-xs transition-transform duration-300 ${
                      isFormOpen ? "rotate-90" : "group-hover:translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* ── Right Column: visual with a single orbiting-ring signature ── */}
            <div className="relative flex min-h-[16rem] items-center justify-center sm:min-h-[22rem] lg:min-h-[38rem]">
              <div
                className="contact-orbit absolute h-[13rem] w-[13rem] rounded-full border border-dashed border-[#8f7fae]/25 sm:h-[19rem] sm:w-[19rem] lg:h-[28rem] lg:w-[28rem]"
                style={{ animation: "contact-orbit-spin 34s linear infinite" }}
              />
              <div className="absolute h-[10rem] w-[10rem] rounded-full bg-[radial-gradient(circle,rgba(234,225,243,0.9),rgba(245,239,246,0.2)_70%)] sm:h-[15rem] sm:w-[15rem] lg:h-[22rem] lg:w-[22rem]" />

              <div className="relative z-10">
                <img
                  src={emailVisual}
                  alt={t("contact.imageAlt")}
                  className="relative w-full max-w-[13rem] object-contain drop-shadow-[0_24px_40px_rgba(114,106,156,0.18)] sm:max-w-[18rem] lg:max-w-[26rem]"
                />
              </div>
            </div>
          </div>

          {/* ── Form Section ── */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isFormOpen ? "mt-10 sm:mt-14 max-h-[2400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`grid gap-px overflow-hidden rounded-[1.6rem] border border-[rgba(220,211,228,0.9)] bg-[rgba(220,211,228,0.6)] shadow-[0_30px_70px_rgba(114,106,156,0.1)] xl:grid-cols-[0.78fr_1.22fr] ${
                isFormOpen ? "contact-form-appear" : ""
              }`}
            >
              {/* ── Features Panel ── */}
              <div className="bg-[rgba(255,251,252,0.97)] p-6 sm:p-8">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#8f7fae]">
                  {t("contact.form.heading")}
                </span>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                  {t("contact.form.description")}
                </p>

                <div className="relative mt-8 space-y-6 pl-5">
                  <div className="absolute inset-y-1 left-[3px] w-px bg-[rgba(220,211,228,0.9)]" />
                  {featureItems.map((item) => (
                    <div key={item.title} className="relative">
                      <span className="absolute -left-5 top-1.5 h-[7px] w-[7px] rounded-full bg-[#8f7fae]" />
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[0.82rem] leading-5 text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Form Panel ── */}
              <div className="bg-[rgba(255,255,255,0.98)] p-6 sm:p-8 md:p-10">
                <form className="grid gap-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      label={t("contact.form.fields.name")}
                      name="name"
                      value={formData.name}
                      onChange={handleNameChange}
                      placeholder={t("contact.form.placeholders.name")}
                    />
                    <FormField
                      label={t("contact.form.fields.subject")}
                      name="subject"
                      value={formData.subject}
                      onChange={handleSubjectChange}
                      placeholder={t("contact.form.placeholders.subject")}
                    />
                  </div>

                  {/* ── Google Verification ── */}
                  <div className="grid gap-2">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {t("contact.form.fields.email")}
                    </span>
                    <div className="rounded-2xl border border-[rgba(220,211,228,0.85)] bg-[rgba(248,244,249,0.6)] p-3.5 transition-colors duration-300 hover:border-[#8f7fae]/35">
                      {isGoogleVerified ? (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                              <FaCheckCircle />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600/85">
                                {t("contact.form.verification.statusLabel")}
                              </p>
                              <p className="mt-0.5 truncate text-sm font-semibold text-[var(--text-primary)]">
                                {verifiedEmail}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleGoogleDisconnect}
                            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-[rgba(220,211,228,0.9)] bg-white px-3.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors duration-300 hover:border-[#8f7fae]/40 hover:text-[#726a9c]"
                          >
                            <FaGoogle className="text-[11px]" />
                            {t("contact.form.verification.changeButton")}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(220,211,228,0.9)] text-[#8f7fae]">
                              <FaGoogle />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">
                                {t("contact.form.verification.title")}
                              </p>
                              <p className="mt-0.5 text-[0.78rem] leading-4 text-[var(--text-secondary)]">
                                {t("contact.form.verification.description")}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleGoogleVerify}
                            disabled={isVerifyingGoogle}
                            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                            style={{ backgroundColor: "#726a9c" }}
                          >
                            {isVerifyingGoogle ? (
                              <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <FaGoogle className="text-[11px]" />
                            )}
                            {isVerifyingGoogle
                              ? t("contact.form.verification.loadingButton")
                              : t("contact.form.verification.actionButton")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    label={t("contact.form.fields.message")}
                    name="message"
                    value={formData.message}
                    onChange={handleMessageChange}
                    placeholder={t("contact.form.placeholders.message")}
                    isTextarea={true}
                    maxLength={MAX_MESSAGE_LENGTH}
                  />

                  <button
                    type="submit"
                    disabled={isSending}
                    className="group relative mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-fit sm:min-w-[14rem] sm:self-end"
                    style={{ background: "linear-gradient(135deg,#8f87bf,#7d76a3)" }}
                  >
                    <span
                      className=" pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25"
                     
                    />
                    {isSending ? (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <FaPaperPlane className="text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    )}
                    {isSending ? t("contact.form.sending") : t("contact.form.submit")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Contact;