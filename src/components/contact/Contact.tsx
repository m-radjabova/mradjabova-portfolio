import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import emailjs from "@emailjs/browser";
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SiGmail, SiReact } from "react-icons/si";
import { toast } from "react-toastify";

const CONTACT_EMAIL = "muslimarajabova1997@gmail.com";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const socialLinks = [
    {
      icon: <FaGithub />,
      name: "GitHub",
      handle: "@m-radjabova",
      url: "https://github.com/m-radjabova",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      handle: t("contact.socialHandles.linkedin"),
      url: "https://www.linkedin.com",
    },
    {
      icon: <FaTelegramPlane />,
      name: "Telegram",
      handle: t("contact.socialHandles.telegram"),
      url: "https://t.me/",
    },
    {
      icon: <SiGmail />,
      name: "Gmail",
      handle: t("contact.socialHandles.gmail"),
      url: `mailto:${CONTACT_EMAIL}`,
    },
  ];

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t("contact.form.toasts.required"));
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
          from_email: formData.email,
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
        email: "",
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
      className="relative overflow-hidden px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:min-h-[100svh] lg:px-8 lg:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,107,154,0.16),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.16))] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(255,107,154,0.18),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.2),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.16),rgba(2,6,23,0.52))]" />
      <div className="absolute -left-14 top-12 h-56 w-56 rounded-full bg-[var(--accent-primary)]/16 blur-3xl" />
      <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-[var(--accent-secondary)]/16 blur-3xl" />

      <div className="relative mt-5 mx-auto flex max-w-7xl items-center lg:min-h-[calc(100svh-10rem)]">
        <div className="w-full overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:rounded-[2.5rem]">
          <div className="grid gap-0 xl:grid-cols-[0.9fr_1.2fr_0.9fr]">
            <div className="relative p-5 sm:p-6 lg:p-7">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_60%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_60%)]" />
              <div className="relative flex h-full flex-col">
                <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)] shadow-[0_14px_32px_rgba(255,107,154,0.1)] dark:bg-white/5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.7)]" />
                  {t("contact.workTogether")}
                </div>

                <h2 className="mt-5 max-w-md text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
                  {t("contact.title")}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {t("contact.description")}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(255,107,154,0.24)] transition duration-300 hover:-translate-y-0.5"
                  >
                    <FaEnvelope />
                    {t("contact.primaryCta")}
                  </a>
                  <a
                    href="https://github.com/m-radjabova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/72 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[0_12px_28px_rgba(255,107,154,0.1)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 dark:bg-white/5"
                  >
                    <FaGithub />
                    {t("contact.secondaryCta")}
                  </a>
                </div>

                <div className="mt-4 rounded-[1.5rem] border border-[var(--border-soft)] bg-[linear-gradient(135deg,rgba(255,107,154,0.12),rgba(168,85,247,0.1))] p-4 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl">
                  <div className="flex items-center gap-3 text-[var(--text-primary)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/75 text-lg shadow-[0_12px_28px_rgba(255,107,154,0.12)] dark:bg-white/10">
                      <SiReact className="text-[var(--accent-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t("contact.builtWith")}</p>
                      <p className="text-xs text-[var(--text-secondary)]">React / TypeScript / Tailwind CSS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.14))] p-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] sm:p-6 lg:border-l lg:border-r lg:border-t-0 lg:p-7">
              <div className="rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-solid)] p-5 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                  {t("contact.getInTouch")}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                  {t("contact.form.title")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {t("contact.form.description")}
                </p>

                <form className="mt-5 grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {t("contact.form.fields.name")}
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.placeholders.name")}
                      className="min-h-11 rounded-[1rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition duration-300 placeholder:text-[var(--text-secondary)]/80 focus:border-[var(--accent-primary)]/45 focus:ring-2 focus:ring-[var(--accent-primary)]/15 dark:bg-white/5"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {t("contact.form.fields.email")}
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.placeholders.email")}
                      className="min-h-11 rounded-[1rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition duration-300 placeholder:text-[var(--text-secondary)]/80 focus:border-[var(--accent-primary)]/45 focus:ring-2 focus:ring-[var(--accent-primary)]/15 dark:bg-white/5"
                    />
                  </label>

                  <label className="grid gap-2 sm:col-span-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {t("contact.form.fields.subject")}
                    </span>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.placeholders.subject")}
                      className="min-h-11 rounded-[1rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition duration-300 placeholder:text-[var(--text-secondary)]/80 focus:border-[var(--accent-primary)]/45 focus:ring-2 focus:ring-[var(--accent-primary)]/15 dark:bg-white/5"
                    />
                  </label>

                  <label className="grid gap-2 sm:col-span-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {t("contact.form.fields.message")}
                    </span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.placeholders.message")}
                      rows={4}
                      className="rounded-[1rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition duration-300 placeholder:text-[var(--text-secondary)]/80 focus:border-[var(--accent-primary)]/45 focus:ring-2 focus:ring-[var(--accent-primary)]/15 dark:bg-white/5"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="sm:col-span-2 mt-1 inline-flex min-h-11 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(255,107,154,0.24)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSending ? t("contact.form.sending") : t("contact.form.submit")}
                  </button>
                </form>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:p-7">
              <div className="grid gap-4">
                <div className="rounded-[1.7rem] border border-[var(--border-soft)] bg-[color:var(--card-solid)] p-5 shadow-[0_18px_40px_rgba(255,107,154,0.08)] backdrop-blur-xl sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                    {t("contact.getInTouch")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                    {t("contact.socialTitle")}
                  </h3>

                  <div className="mt-5 grid gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-[1.2rem] border border-[var(--border-soft)] bg-white/68 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/35 dark:bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,107,154,0.2),rgba(168,85,247,0.24))] text-base text-[var(--accent-primary)]">
                            {social.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-[var(--text-primary)]">{social.name}</p>
                            <p className="text-xs text-[var(--text-secondary)]">{social.handle}</p>
                          </div>
                        </div>
                        <FaArrowRight className="text-sm text-[var(--text-secondary)] transition group-hover:text-[var(--accent-primary)]" />
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
