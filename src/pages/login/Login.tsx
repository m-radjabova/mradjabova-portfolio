import { useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { type FieldValues, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import type { User } from "../../types/types";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import myPhoto from "../../assets/photo_2025-11-03_08-23-39.jpg";

const LoginForm = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const Login = async (data: FieldValues) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem("token", user.uid);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const currentUser = { id: user.uid, ...userDocSnap.data() } as User;

        if (currentUser?.roles?.includes("ADMIN")) {
          localStorage.setItem("role", currentUser.roles.join(","));
          navigate("/admin", { replace: true });
          return;
        }

        localStorage.removeItem("role");
        toast.error(t("auth.login.toasts.noAdminAccess"));
        return;
      }

      localStorage.removeItem("role");
      toast.warn(t("auth.login.toasts.roleNotFound"));
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const code = error.code;

        switch (code) {
          case "auth/user-not-found":
            toast.error(t("auth.login.toasts.userNotFound"));
            break;
          case "auth/wrong-password":
          case "auth/invalid-credential":
            toast.error(t("auth.login.toasts.wrongCredentials"));
            break;
          case "auth/invalid-email":
            toast.error(t("auth.login.toasts.invalidEmail"));
            break;
          case "auth/too-many-requests":
            toast.error(t("auth.login.toasts.tooManyRequests"));
            break;
          default:
            toast.error(t("auth.login.toasts.failed"));
        }
      } else {
        toast.error(t("auth.login.toasts.unknown"));
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,107,154,0.16),transparent_24%),radial-gradient(circle_at_88%_15%,rgba(177,124,255,0.16),transparent_24%),linear-gradient(135deg,#fff8fb_0%,#fff2f6_42%,#fffafc_100%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(255,115,164,0.14),transparent_24%),radial-gradient(circle_at_88%_15%,rgba(177,124,255,0.16),transparent_24%),linear-gradient(135deg,#0f1724_0%,#141b2e_50%,#1b2236_100%)]" />
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[var(--accent-primary)]/12 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[var(--accent-secondary)]/14 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center">
        <div className="grid w-full overflow-hidden rounded-[2.2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] shadow-[0_30px_90px_rgba(190,24,93,0.14)] backdrop-blur-2xl lg:grid-cols-[1.04fr_0.96fr]">
          <section className="relative hidden min-h-[42rem] overflow-hidden p-8 lg:block xl:p-10">
            <img
              src={myPhoto}
              alt="Admin access visual"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.72),rgba(88,28,135,0.46),rgba(244,114,182,0.28))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_18%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.14),transparent_20%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between text-white">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
                <FaShieldAlt />
                {t("auth.login.adminOnlyBadge")}
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                  {t("auth.login.controlRoom")}
                </p>
              </div>
            </div>
          </section>

          <section className="relative flex items-center p-5 sm:p-8 xl:p-12">
            <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-[var(--accent-primary)]/10 blur-3xl" />
            <div className="absolute bottom-6 right-6 h-36 w-36 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-xl">
              <div className="rounded-[2rem] border border-[var(--border-soft)] bg-white/72 p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl dark:bg-white/5 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--accent-primary)]"
                  >
                    <FaStar className="text-[var(--accent-primary)]" />
                    Portfolio
                  </Link>
                  <span className="rounded-full border border-[var(--border-soft)] bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)] dark:bg-white/5">
                    Admin
                  </span>
                </div>

                <div className="mt-8">
                  <h2 className="text-3xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                    {t("auth.login.title")}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                    {t("auth.login.subtitle")}
                  </p>
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-[var(--border-soft)] bg-[var(--bg-soft)]/65 p-4 text-sm leading-7 text-[var(--text-secondary)] dark:bg-white/5">
                  {t("auth.login.adminRoleNote.prefix")}{" "}
                  <span className="font-semibold text-[var(--text-primary)]">
                    {t("auth.login.adminRoleNote.role")}
                  </span>{" "}
                  {t("auth.login.adminRoleNote.suffix")}
                </div>

                <form onSubmit={handleSubmit(Login)} className="mt-8 space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      {t("auth.login.email")}
                    </span>
                    <div className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--border-soft)] bg-white/82 px-4 py-3 shadow-[0_10px_24px_rgba(255,107,154,0.06)] dark:bg-white/5">
                      <FaEnvelope className="shrink-0 text-[var(--accent-primary)]" />
                      <input
                        type="email"
                        placeholder={t("auth.login.emailPlaceholder")}
                        {...register("email", { required: true })}
                        className="w-full bg-transparent text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]/70"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      {t("auth.login.password")}
                    </span>
                    <div className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--border-soft)] bg-white/82 px-4 py-3 shadow-[0_10px_24px_rgba(255,107,154,0.06)] dark:bg-white/5">
                      <FaLock className="shrink-0 text-[var(--accent-primary)]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth.login.passwordPlaceholder")}
                        {...register("password", { required: true })}
                        className="w-full bg-transparent text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]/70"
                      />
                      <button
                        type="button"
                        className="text-[var(--accent-primary)] transition hover:text-[var(--accent-secondary)]"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword
                            ? t("auth.login.hidePassword")
                            : t("auth.login.showPassword")
                        }
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </label>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-6 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(255,107,154,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? t("auth.login.loading") : (
                      <>
                        <span>{t("auth.login.submit")}</span>
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
