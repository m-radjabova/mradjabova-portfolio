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

const FormField = (props: FormFieldProps) => {
  const { label, name, value, placeholder, onChange } = props;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim().length > 0;

  const sharedClasses =
    "w-full rounded-[1.15rem] border px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition-all duration-400 placeholder:text-[var(--text-muted)]/40 bg-white/92 backdrop-blur-sm";

  const borderClass =
    isFocused || hasValue
      ? "border-[#c18fa0]/60 shadow-[0_10px_28px_rgba(193,143,160,0.1),0_0_0_1px_rgba(193,143,160,0.08)]"
      : "border-[rgba(220,211,228,0.75)] hover:border-[#c18fa0]/35 hover:shadow-[0_4px_16px_rgba(193,143,160,0.04)]";

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const textareaOnChange = onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void;
  const inputOnChange = onChange as (e: ChangeEvent<HTMLInputElement>) => void;

  if (props.isTextarea) {
    const { maxLength } = props;

    return (
      <div className="grid gap-2.5">
        <label className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">
          {label}
        </label>
        <div className="relative">
          <textarea
            name={name}
            value={value}
            onChange={textareaOnChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={7}
            maxLength={maxLength}
            className={`${sharedClasses} ${borderClass} min-h-[10rem] sm:min-h-[12rem] resize-none`}
          />
          {isFocused && (
            <div className="pointer-events-none absolute inset-0 rounded-[1.15rem] bg-[linear-gradient(135deg,rgba(193,143,160,0.03),transparent_60%)]" />
          )}
        </div>
        <div className="flex justify-end">
          <span className="text-[11px] font-medium text-[var(--text-muted)]/70 tracking-wider">
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2.5">
      <label className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">
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
          className={`${sharedClasses} ${borderClass} min-h-12`}
        />
        {isFocused && (
          <div className="pointer-events-none absolute inset-0 rounded-[1.15rem] bg-[linear-gradient(135deg,rgba(193,143,160,0.03),transparent_60%)]" />
        )}
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
    {
      icon: <FaLinkedinIn />,
      label: "LinkedIn",
      href: "https://www.linkedin.com",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      href: "https://github.com/m-radjabova",
    },
    {
      icon: <FaTelegramPlane />,
      label: "Telegram",
      href: "https://t.me/",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://www.instagram.com",
    },
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
    {
      icon: <FaRegClock />,
      title: t("contact.availability"),
      value: t("contact.availabilityValue"),
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

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-3 py-10 sm:px-4 sm:py-12 lg:px-8 lg:py-16"
    >
      {/* ── Decorative Background Layer ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main ambient glow - smaller on mobile */}
        <div className="absolute right-[4%] top-[1%] h-[20rem] w-[20rem] sm:h-[36rem] sm:w-[36rem] lg:h-[50rem] lg:w-[50rem] rounded-full border border-[#ded2e8]/30 bg-[radial-gradient(circle,rgba(231,221,243,0.48),rgba(248,243,248,0.06)_62%,transparent_80%)] animate-contact-glow-pulse" />

        {/* Secondary glow */}
        <div className="absolute -left-[8%] bottom-[10%] h-[16rem] w-[16rem] sm:h-[28rem] sm:w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,218,205,0.3),rgba(248,243,248,0.04)_60%,transparent_78%)] animate-contact-float-slow" />

        {/* Decorative floating stars - fewer on mobile */}
        <div className="absolute right-[12%] top-[6%] text-[1.2rem] sm:text-[1.6rem] text-[#e0bfd0]/60 animate-contact-star">✦</div>
        <div className="hidden sm:block absolute left-[30%] top-[12%] text-[1.2rem] text-[#dec7db]/55 animate-contact-star-delayed">✦</div>
        <div className="absolute right-[22%] bottom-[28%] text-[1.6rem] sm:text-[2.2rem] text-[#d7c4dd]/60 animate-contact-star">✦</div>
        <div className="hidden sm:block absolute left-[8%] top-[40%] text-[1rem] text-[#e0bfd0]/45 animate-contact-star-delayed">✦</div>
        <div className="hidden sm:block absolute right-[35%] top-[8%] text-[0.8rem] text-[#d7c4dd]/50 animate-contact-star">✦</div>

        {/* Decorative rings - fewer on mobile */}
        <div className="absolute right-[8%] top-[8%] h-16 w-16 sm:h-24 sm:w-24 rounded-full border border-[#eadfea]/45 animate-contact-ring-expand" />
        <div className="hidden sm:block absolute left-[15%] bottom-[30%] h-16 w-16 rounded-full border border-[#eadfea]/35 animate-contact-ring-expand-delayed" />
        <div className="absolute right-[28%] top-[40%] h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#eadfea]/30 animate-contact-ring-expand" />

        {/* Floating particles - fewer on mobile */}
        <div className="absolute left-[20%] top-[20%] h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d7c4dd]/30 animate-contact-particle" />
        <div className="hidden sm:block absolute right-[25%] top-[15%] h-1.5 w-1.5 rounded-full bg-[#e0bfd0]/25 animate-contact-particle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-[45%] bottom-[20%] h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d7c4dd]/25 animate-contact-particle" style={{ animationDelay: "3s" }} />
        <div className="hidden sm:block absolute right-[15%] bottom-[40%] h-1 w-1 rounded-full bg-[#e0bfd0]/30 animate-contact-particle" style={{ animationDelay: "4.5s" }} />

        {/* Decorative leaf-like drifts */}
        <div className="absolute left-[10%] top-[60%] text-[1.4rem] sm:text-[2rem] text-[#e0bfd0]/20 animate-contact-leaf">❋</div>
        <div className="hidden sm:block absolute right-[18%] top-[55%] text-[1.5rem] text-[#d7c4dd]/20 animate-contact-leaf" style={{ animationDelay: "2.5s" }}>❋</div>
      </div>

      <div className="relative mx-auto max-w-[1450px]">
        <div className="stagger-item opacity-0">
          <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-5">
            {/* ── Left Column: Info & Social ── */}
            <div className="max-w-[28rem]">
              <div className="flex items-start gap-2 sm:gap-3">
                <h2 className="section-title-display text-[clamp(2.8rem,8vw,5.9rem)] text-[#726a9c]">
                  {t("contact.heading")}
                </h2>
                <span className="mt-2 sm:mt-3 text-lg sm:text-xl text-[#d8b8c9] animate-contact-star">✦</span>
              </div>

              <p className="mt-3 sm:mt-4 max-w-xs text-[0.9rem] sm:text-[1rem] font-medium leading-7 sm:leading-8 text-[var(--text-secondary)]">
                {t("contact.workTogetherText")}
              </p>

              {/* ── Info Items ── */}
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {infoItems.map((item, idx) => {
                  const content = (
                    <div className="group flex items-center gap-3 sm:gap-4">
                      <div className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full border border-[rgba(232,222,235,0.9)] bg-[linear-gradient(135deg,rgba(246,239,246,0.95),rgba(252,248,249,0.92))] text-[1rem] sm:text-[1.1rem] text-[#8f84af] shadow-[0_10px_24px_rgba(193,143,160,0.04)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(193,143,160,0.12)] group-hover:border-[#c18fa0]/30 group-hover:scale-105">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.95rem] sm:text-[1.05rem] font-semibold text-[#726a9c] transition-colors duration-300 group-hover:text-[#8f84af]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[0.9rem] sm:text-[1rem] font-medium text-[var(--text-secondary)] break-words">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="block transition-all duration-300 hover:translate-x-1"
                        style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.title}
                      style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* ── Social Links ── */}
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-[rgba(236,226,235,0.9)] bg-[rgba(255,251,252,0.68)] text-[1.2rem] sm:text-[1.55rem] text-[var(--lavender-strong)] shadow-[0_10px_24px_rgba(193,143,160,0.04)] transition-all duration-400 hover:-translate-y-1.5 hover:bg-white hover:border-[#c18fa0]/25 hover:shadow-[0_16px_36px_rgba(193,143,160,0.12)]"
                    style={{ animationDelay: `${0.3 + idx * 0.08}s` }}
                  >
                    <span className="transition-transform duration-400 group-hover:scale-110">
                      {item.icon}
                    </span>
                  </a>
                ))}
              </div>

              {/* ── Open Form Button ── */}
              <div className="mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={isFormOpen ? handleCloseForm : handleOpenForm}
                  className="group inline-flex min-h-10 sm:min-h-11 items-center justify-center gap-2 sm:gap-2.5 rounded-full border border-[rgba(221,211,228,0.85)] bg-[rgba(255,251,252,0.68)] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[var(--lavender-strong)] shadow-[0_10px_22px_rgba(193,143,160,0.04)] transition-all duration-400 hover:-translate-y-0.5 hover:bg-white hover:border-[#c18fa0]/25 hover:shadow-[0_14px_30px_rgba(193,143,160,0.1)]"
                >
                  <FaEnvelope className={`text-xs sm:text-sm transition-transform duration-400 ${isFormOpen ? "rotate-45" : "group-hover:scale-110"}`} />
                  <span>{isFormOpen ? t("contact.actions.hideForm") : t("contact.actions.openForm")}</span>
                </button>
              </div>
            </div>

            {/* ── Right Column: Visual ── */}
            <div className="relative flex min-h-[18rem] sm:min-h-[26rem] items-center justify-center lg:min-h-[42rem]">
              {/* Ambient glow behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[16rem] w-[16rem] sm:h-[23rem] sm:w-[23rem] lg:h-[34rem] lg:w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(234,225,243,0.85),rgba(245,239,246,0.3)_66%,transparent_78%)] animate-contact-float" />
              </div>

              {/* Decorative elements around image - fewer on mobile */}
              <div className="absolute left-[15%] top-[8%] text-[1.2rem] sm:text-[1.8rem] text-[#ddc5d8]/65 animate-contact-star-delayed">✦</div>
              <div className="absolute right-[10%] bottom-[20%] text-[2rem] sm:text-[3.2rem] text-[#dac8df]/70 animate-contact-star">✦</div>
              <div className="hidden sm:block absolute left-[8%] bottom-[15%] h-8 w-8 rounded-full border border-[#eadfea]/40 animate-contact-ring-expand-delayed" />
              <div className="absolute right-[20%] top-[12%] h-5 w-5 sm:h-6 sm:w-6 rounded-full border border-[#eadfea]/35 animate-contact-ring-expand" />

              {/* Image with float animation */}
              <div className="relative z-10 animate-contact-float">
                <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(234,225,243,0.3),transparent_70%)] blur-2xl" />
                <img
                  src={emailVisual}
                  alt={t("contact.imageAlt")}
                  className="relative w-full max-w-[14rem] sm:max-w-[20rem] lg:max-w-[70rem] object-contain drop-shadow-[0_28px_44px_rgba(179,170,215,0.22)]"
                />
              </div>
            </div>
          </div>

          {/* ── Form Section ── */}
          <div
            className={`overflow-hidden transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isFormOpen ? "mt-8 sm:mt-12 max-h-[2400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`grid gap-4 sm:gap-6 rounded-[1.8rem] sm:rounded-[2.2rem] border border-[rgba(236,226,235,0.9)] bg-[rgba(255,251,252,0.65)] p-3 sm:p-4 md:p-6 shadow-[0_24px_64px_rgba(183,167,205,0.08)] backdrop-blur-xl xl:grid-cols-[0.76fr_1.24fr] xl:p-8 ${
                isFormOpen ? "contact-form-appear" : ""
              }`}
            >
              {/* ── Features Panel ── */}
              <div className="rounded-[1.4rem] sm:rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,249,250,0.95),rgba(248,241,249,0.8))] p-5 sm:p-6 md:p-8">
                <h3 className="section-title-display text-[2rem] sm:text-[2.6rem] text-[var(--lavender-strong)]">
                  {t("contact.form.heading")}
                </h3>
                <p className="mt-3 sm:mt-4 max-w-sm text-xs sm:text-sm leading-6 sm:leading-7 text-[var(--text-secondary)]">
                  {t("contact.form.description")}
                </p>

                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                  {featureItems.map((item, idx) => (
                    <div
                      key={item.title}
                      className="group flex items-start gap-3 sm:gap-4"
                      style={{ animationDelay: `${0.1 + idx * 0.12}s` }}
                    >
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(239,228,245,0.95),rgba(252,245,247,0.92))] text-[#8d84ac] shadow-[0_12px_24px_rgba(193,143,160,0.06)] transition-all duration-400 group-hover:shadow-[0_16px_32px_rgba(193,143,160,0.12)] group-hover:scale-105">
                        <FaCheckCircle className="transition-transform duration-400 group-hover:scale-110" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-[var(--lavender-strong)]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-[var(--text-secondary)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative accent line */}
                <div className="mt-6 sm:mt-8 h-px w-12 sm:w-16 bg-gradient-to-r from-[#c18fa0]/40 to-transparent" />
              </div>

              {/* ── Form Panel ── */}
              <div className="rounded-[1.4rem] sm:rounded-[1.8rem] bg-white/85 p-5 sm:p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-sm">
                <p className="text-base sm:text-lg lg:text-xl font-semibold text-[var(--lavender-strong)]">
                  {t("contact.form.title")}
                </p>

                <form className="mt-4 sm:mt-6 grid gap-3 sm:gap-4" onSubmit={handleSubmit}>
                  <FormField
                    label={t("contact.form.fields.name")}
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder={t("contact.form.placeholders.name")}
                  />

                  {/* ── Google Verification ── */}
                  <div className="grid gap-2.5">
                    <span className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">
                      {t("contact.form.fields.email")}
                    </span>
                    <div className="rounded-[1.2rem] border border-[rgba(220,211,228,0.8)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(248,241,249,0.78))] p-3 sm:p-4 shadow-[0_14px_30px_rgba(193,143,160,0.04)] transition-all duration-400 hover:border-[#c18fa0]/25 hover:shadow-[0_16px_36px_rgba(193,143,160,0.08)]">
                      {isGoogleVerified ? (
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                              <FaCheckCircle />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-emerald-600/85">
                                {t("contact.form.verification.statusLabel")}
                              </p>
                              <p className="mt-1 break-all text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                                {verifiedEmail}
                              </p>
                              <p className="mt-1 text-[11px] sm:text-xs leading-5 text-[var(--text-secondary)]">
                                {t("contact.form.verification.verifiedHint")}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleGoogleDisconnect}
                            className="inline-flex min-h-9 sm:min-h-10 items-center justify-center gap-2 rounded-full border border-[rgba(220,211,228,0.8)] bg-white/80 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-[var(--lavender-strong)] transition-all duration-400 hover:bg-white hover:border-[#c18fa0]/25 hover:shadow-[0_8px_20px_rgba(193,143,160,0.08)]"
                          >
                            <FaGoogle />
                            {t("contact.form.verification.changeButton")}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(239,228,245,0.95),rgba(252,245,247,0.92))] text-[#8d84ac]">
                              <FaGoogle />
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#b989a2]">
                                {t("contact.form.verification.badge")}
                              </p>
                              <p className="mt-1 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                                {t("contact.form.verification.title")}
                              </p>
                              <p className="mt-1 text-[11px] sm:text-xs leading-5 text-[var(--text-secondary)]">
                                {t("contact.form.verification.description")}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleGoogleVerify}
                            disabled={isVerifyingGoogle}
                            className="group inline-flex min-h-10 sm:min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#8f87bf,#7d76a3)] px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_16px_30px_rgba(125,118,163,0.16)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(125,118,163,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            {isVerifyingGoogle ? (
                              <>
                                <svg
                                  className="h-4 w-4 animate-spin"
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
                                <FaGoogle className="transition-transform duration-400 group-hover:scale-110" />
                                {t("contact.form.verification.actionButton")}
                              </>
                            )}
                          </button>
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

                  {/* ── Submit Button ── */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="group mt-2 inline-flex min-h-10 sm:min-h-12 items-center justify-center gap-2 sm:gap-2.5 rounded-full bg-[linear-gradient(135deg,#8f87bf,#7d76a3)] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_18px_34px_rgba(125,118,163,0.18)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(125,118,163,0.28)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-fit sm:min-w-[15rem] sm:self-end animate-contact-send-glow"
                  >
                    {isSending ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
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
                        {t("contact.form.sending")}
                      </>
                    ) : (
                      <>
                        {t("contact.form.submit")}
                        <FaPaperPlane className="text-[10px] sm:text-xs transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
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