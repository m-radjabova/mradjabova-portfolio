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
  FaLinkedin,
  FaPaperPlane,
  FaTelegramPlane,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SiGmail, SiReact } from "react-icons/si";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import useResolvedTheme from "../../hooks/useResolvedTheme";

const CONTACT_EMAIL = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const GOOGLE_PROVIDER_ID = "google.com";
const MAX_MESSAGE_LENGTH = 1000;

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

const FormField = (props: FormFieldProps) => {
  const { label, name, value, placeholder, onChange } = props;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim().length > 0;

  const sharedClasses =
    "w-full rounded-[1rem] border px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] focus:ring-2";

  const borderClass =
    isFocused || hasValue
      ? "border-[var(--accent-primary)]/55 ring-2 ring-[var(--accent-primary)]/15 shadow-[0_10px_24px_rgba(255,107,154,0.08)]"
      : "border-[var(--border-soft)]/80 hover:border-[var(--accent-primary)]/25";

  const bgClass =
    "bg-white/88 dark:bg-white/7 backdrop-blur-sm";

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const textareaOnChange = onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void;
  const inputOnChange = onChange as (e: ChangeEvent<HTMLInputElement>) => void;

  if (props.isTextarea) {
    const { maxLength } = props;
    return (
      <div className="relative grid gap-2">
        <label className="text-sm font-semibold text-[var(--text-primary)]">
          {label}
        </label>
        <label className="relative block">
          <textarea
            name={name}
            value={value}
            onChange={textareaOnChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={4}
            maxLength={maxLength}
            className={`${sharedClasses} ${borderClass} ${bgClass} min-h-[120px] resize-y`}
          />
        </label>
        <div className="flex justify-end">
          <span
            className={`text-[11px] font-medium tabular-nums ${
              value.length >= maxLength
                ? "text-red-500"
                : value.length >= maxLength * 0.85
                  ? "text-amber-500"
                  : "text-[var(--text-muted)]"
            }`}
          >
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid gap-2">
      <label className="text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </label>
      <label className="relative block">
        <input
          type="text"
          name={name}
          value={value}
          onChange={inputOnChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${sharedClasses} ${borderClass} ${bgClass} min-h-11`}
        />
      </label>
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for parallax-like glow effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    },
    [],
  );

  const socialLinks = [
    {
      icon: <FaGithub />,
      name: "GitHub",
      handle: "@m-radjabova",
      url: "https://github.com/m-radjabova",
      color: "from-gray-700/30 to-gray-900/30 dark:from-gray-300/20 dark:to-white/20",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      handle: t("contact.socialHandles.linkedin"),
      url: "https://www.linkedin.com",
      color: "from-blue-600/30 to-blue-800/30 dark:from-blue-400/20 dark:to-blue-600/20",
    },
    {
      icon: <FaTelegramPlane />,
      name: "Telegram",
      handle: t("contact.socialHandles.telegram"),
      url: "https://t.me/",
      color: "from-sky-500/30 to-sky-700/30 dark:from-sky-400/20 dark:to-sky-600/20",
    },
    {
      icon: <SiGmail />,
      name: "Gmail",
      handle: t("contact.socialHandles.gmail"),
      url: `mailto:${CONTACT_EMAIL}`,
      color: "from-red-500/30 to-red-700/30 dark:from-red-400/20 dark:to-red-600/20",
    },
  ];

  const handleInputChange = useCallback(
    (name: keyof ContactFormState, value: string) => {
      setFormData((current) => ({
        ...current,
        [name]: value,
      }));
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
      { threshold: 0.1 },
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
      const isGoogleUser = user?.providerData.some(
        (provider) => provider.providerId === GOOGLE_PROVIDER_ID,
      ) ?? false;

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
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setFormData({
        name: "",
        subject: "",
        message: "",
      });
      toast.success(t("contact.form.toasts.success"));
    } catch {
      toast.error(t("contact.form.toasts.error"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:min-h-[100svh] lg:px-8 lg:py-20"
    >
      {/* ===== Ambient background orbs ===== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent blur-3xl"
          style={{
            animation: "glow-drift 8s ease-in-out infinite",
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        />
        <div
          className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-gradient-to-bl from-[var(--accent-secondary)]/18 to-transparent blur-3xl"
          style={{
            animation: "glow-drift 12s ease-in-out infinite reverse",
            transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`,
          }}
        />
        <div
          className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-gradient-to-tr from-[var(--accent-tertiary)]/12 to-transparent blur-3xl"
          style={{
            animation: "glow-drift 10s ease-in-out infinite 2s",
          }}
        />

        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--accent-primary)]/30"
            style={{
              top: `${15 + Math.sin(i * 1.2) * 30 + i * 8}%`,
              left: `${10 + Math.cos(i * 0.9) * 35 + i * 5}%`,
              animation: `twinkle-soft ${2 + (i % 3) * 0.8}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <div
            key={i + 6}
            className="absolute h-[3px] w-[3px] rounded-full bg-[var(--accent-secondary)]/25"
            style={{
              top: `${60 + Math.cos(i * 1.1) * 20}%`,
              right: `${12 + Math.sin(i * 0.8) * 25}%`,
              animation: `twinkle-soft ${3 + (i % 2) * 0.5}s ease-in-out ${i * 0.8 + 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="relative mx-auto mt-5 flex max-w-7xl items-center lg:min-h-[calc(100svh-10rem)]"
        onMouseMove={handleMouseMove}
      >
        <div className="stagger-item w-full overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[var(--shadow-soft)] opacity-0 backdrop-blur-2xl sm:rounded-[2.5rem]">
          {/* Animated gradient border line at top */}
          <div
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer-text 3s ease-in-out infinite",
            }}
          />

          <div className="grid gap-0 xl:grid-cols-[0.9fr_1.2fr_0.9fr]">
            {/* ===== Left panel: Intro ===== */}
            <div className="relative p-5 sm:p-6 lg:p-7">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_60%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_60%)]" />
              <div className="relative flex h-full flex-col">
                <div className="stagger-item inline-flex w-fit animate-[fade-up_0.6s_ease-out_forwards] items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)] shadow-[0_14px_32px_rgba(255,107,154,0.1)] opacity-0 dark:bg-white/5">
                  <span className="relative h-2.5 w-2.5">
                    <span className="absolute inset-0 h-full w-full animate-[ring-pulse_2s_ease-in-out_infinite] rounded-full bg-emerald-400" />
                    <span className="absolute inset-0 h-full w-full rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.7)]" />
                  </span>
                  {t("contact.workTogether")}
                </div>

                <h2 className="stagger-item mt-5 animate-[fade-up_0.6s_ease-out_0.1s_forwards] max-w-md text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)] opacity-0 sm:text-4xl">
                  {t("contact.title")}
                </h2>
                <p className="stagger-item mt-4 animate-[fade-up_0.6s_ease-out_0.2s_forwards] max-w-lg text-sm leading-7 text-[var(--text-secondary)] opacity-0 sm:text-base">
                  {t("contact.description")}
                </p>

                <div className="stagger-item mt-5 flex animate-[fade-up_0.6s_ease-out_0.3s_forwards] flex-wrap gap-3 opacity-0">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(255,107,154,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(255,107,154,0.35)]"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                    <FaEnvelope className="relative" />
                    <span className="relative">{t("contact.primaryCta")}</span>
                  </a>
                  <a
                    href="https://github.com/m-radjabova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[var(--border-soft)] bg-white/72 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_12px_28px_rgba(255,107,154,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:shadow-[0_16px_36px_rgba(255,107,154,0.18)] dark:bg-white/5"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                    <FaGithub className="relative" />
                    <span className="relative">{t("contact.secondaryCta")}</span>
                  </a>
                </div>

                <div className="stagger-item mt-auto animate-[fade-up_0.6s_ease-out_0.4s_forwards] pt-4 opacity-0">
                  <div className="group rounded-[1.5rem] border border-[var(--border-soft)] bg-[linear-gradient(135deg,rgba(255,107,154,0.12),rgba(168,85,247,0.1))] p-4 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_18px_50px_rgba(255,107,154,0.16)]">
                    <div className="flex items-center gap-3 text-[var(--text-primary)]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/75 shadow-[0_12px_28px_rgba(255,107,154,0.12)] transition-all duration-500 group-hover:rotate-[8deg] group-hover:scale-105 dark:bg-white/10">
                        <SiReact className="text-[var(--accent-primary)] transition-all duration-500 group-hover:text-[var(--accent-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t("contact.builtWith")}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{t("contact.builtWithStack")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Middle panel: Form ===== */}
            <div className="border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.14))] p-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] sm:p-6 lg:border-l lg:border-r lg:border-t-0 lg:p-7">
              <div className="group/panel relative rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-solid)] p-5 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_24px_56px_rgba(255,107,154,0.14)] sm:p-6">
                {/* Subtle gradient border on hover */}
                <div className="pointer-events-none absolute inset-[-1px] rounded-[1.7rem] bg-gradient-to-br from-[var(--accent-primary)]/0 via-transparent to-[var(--accent-secondary)]/0 opacity-0 transition-opacity duration-500 group-hover/panel:from-[var(--accent-primary)]/12 group-hover/panel:to-[var(--accent-secondary)]/10 group-hover/panel:opacity-100" />

                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                    {t("contact.getInTouch")}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                    {t("contact.form.title")}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {t("contact.form.description")}
                  </p>
                </div>

                <form className="relative mt-5 grid gap-3" onSubmit={handleSubmit}>
                  <FormField
                    label={t("contact.form.fields.name")}
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder={t("contact.form.placeholders.name")}
                  />

                  {/* Google verification block */}
                  <div className="relative grid gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {t("contact.form.fields.email")}
                    </span>
                    <div className="relative overflow-hidden rounded-[1.3rem] border border-[var(--border-soft)] bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(255,255,255,0.5))] p-4 text-sm text-[var(--text-primary)] shadow-[0_16px_34px_rgba(255,107,154,0.08)] backdrop-blur-sm transition-all duration-300 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]">
                      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--accent-secondary)]/18 blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-10 left-0 h-20 w-20 rounded-full bg-[var(--accent-primary)]/15 blur-2xl" />
                      {isGoogleVerified ? (
                        <div className="relative animate-[fade-up_0.4s_ease-out_forwards]">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-base text-emerald-600 dark:text-emerald-400">
                                <FaCheckCircle className="animate-[ring-pulse_2s_ease-in-out_1] text-lg" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600/90 dark:text-emerald-400/90">
                                  {t("contact.form.verification.statusLabel")}
                                </p>
                                <p className="mt-1 break-all text-sm font-semibold text-[var(--text-primary)]">
                                  {verifiedEmail}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                  {t("contact.form.verification.verifiedHint")}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={handleGoogleDisconnect}
                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[0.95rem] border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:shadow-[0_8px_24px_rgba(255,107,154,0.12)] dark:bg-white/5"
                              >
                                <FaGoogle />
                                {t("contact.form.verification.changeButton")}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,107,154,0.16),rgba(168,85,247,0.2))] text-base text-[var(--accent-primary)]">
                                <FaGoogle />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                                  {t("contact.form.verification.badge")}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                                  {t("contact.form.verification.title")}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                  {t("contact.form.verification.description")}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={handleGoogleVerify}
                              disabled={isVerifyingGoogle}
                              className="group/verify relative inline-flex min-h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(255,107,154,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(255,107,154,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              <span className="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/verify:translate-x-[100%]" />
                              {isVerifyingGoogle ? (
                                <>
                                  <svg
                                    className="relative h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                  </svg>
                                  {t("contact.form.verification.loadingButton")}
                                </>
                              ) : (
                                <>
                                  <FaGoogle className="relative" />
                                  {t("contact.form.verification.actionButton")}
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    label={t("contact.form.fields.subject")}
                    name="subject"
                    value={formData.subject}
                    onChange={handleSubjectChange}
                    placeholder={t("contact.form.placeholders.subject")}
                  />

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
                    className="group/submit relative mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-[1.1rem] bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(255,107,154,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(255,107,154,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/submit:translate-x-[100%]" />
                    {isSending ? (
                      <>
                        <svg
                          className="relative h-5 w-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span className="relative">{t("contact.form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="relative text-base transition-transform duration-300 group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" />
                        <span className="relative">{t("contact.form.submit")}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ===== Right panel: Social links ===== */}
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="grid gap-4">
                <div className="group/social relative rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-solid)] p-5 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_24px_56px_rgba(255,107,154,0.14)] sm:p-6">
                  {/* Subtle gradient border on hover */}
                  <div className="pointer-events-none absolute inset-[-1px] rounded-[1.7rem] bg-gradient-to-tr from-[var(--accent-secondary)]/0 via-transparent to-[var(--accent-primary)]/0 opacity-0 transition-opacity duration-500 group-hover/social:from-[var(--accent-secondary)]/10 group-hover/social:to-[var(--accent-primary)]/12 group-hover/social:opacity-100" />

                  <div className="relative">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                      {t("contact.getInTouch")}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                      {t("contact.socialTitle")}
                    </h3>
                  </div>

                  <div className="relative mt-5 grid gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setFocusedIndex(index)}
                        onMouseLeave={() => setFocusedIndex(null)}
                        className="group/link relative flex items-center justify-between gap-3 overflow-hidden rounded-[1.2rem] border border-[var(--border-soft)] bg-white/68 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 hover:shadow-[0_12px_28px_rgba(255,107,154,0.12)] dark:bg-white/5"
                        style={{
                          transitionDelay: focusedIndex === index ? "0ms" : "100ms",
                        }}
                      >
                        {/* Hover glow */}
                        <div
                          className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 transition-opacity duration-300 group-hover/link:opacity-100`}
                        />

                        <div className="relative flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,107,154,0.2),rgba(168,85,247,0.24))] text-base text-[var(--accent-primary)] transition-all duration-300 group-hover/link:scale-110 group-hover/link:rotate-[6deg]"
                          >
                            {social.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-[var(--text-primary)]">
                              {social.name}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)]">
                              {social.handle}
                            </p>
                          </div>
                        </div>
                        <FaArrowRight className="relative text-sm text-[var(--text-secondary)] transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:text-[var(--accent-primary)]" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
