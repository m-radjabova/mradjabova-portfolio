import { useState } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { name, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error(t("auth.register.validation.passwordsMismatch"));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        roles: ["USER"],
        createdAt: new Date(),
      });

      toast.success(t("auth.register.toasts.success"));
      reset();
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error(t("auth.register.toasts.emailInUse"));
            break;
          case "auth/invalid-email":
            toast.error(t("auth.register.toasts.invalidEmail"));
            break;
          case "auth/weak-password":
            toast.error(t("auth.register.toasts.weakPassword"));
            break;
          default:
            toast.error(t("auth.register.toasts.failed"));
        }
      } else {
        console.error("Unknown error:", error);
        toast.error(t("auth.register.toasts.unknown"));
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6 sm:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.2),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.18),transparent_25%),linear-gradient(135deg,#fff7ed,#ffe4e6_45%,#f8fafc)]" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-[1.7rem] border border-rose-200/60 bg-white/80 p-5 shadow-2xl shadow-rose-200/40 backdrop-blur sm:rounded-[2rem] sm:p-8 xl:p-10">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-200/50 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-sky-200/60 blur-2xl" />

        <div className="relative text-center">
          <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <FaUser className="text-2xl" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{t("auth.register.title")}</h2>
          <p className="mt-2 text-slate-600">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
              {t("auth.register.fullName")}
            </label>
            <div className="flex items-center rounded-2xl border border-rose-200 bg-white px-4">
              <FaUser className="text-rose-500" />
              <input
                {...register("name", { required: true })}
                type="text"
                id="username"
                className="w-full bg-transparent px-4 py-4 outline-none"
              />
            </div>
            {errors.name && <p className="mt-2 text-sm text-rose-500">{t("auth.register.validation.nameRequired")}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              {t("auth.register.email")}
            </label>
            <div className="flex items-center rounded-2xl border border-rose-200 bg-white px-4">
              <FaEnvelope className="text-rose-500" />
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                className="w-full bg-transparent px-4 py-4 outline-none"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-rose-500">{t("auth.register.validation.emailRequired")}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
              {t("auth.register.password")}
            </label>
            <div className="flex items-center rounded-2xl border border-rose-200 bg-white px-4">
              <FaLock className="text-rose-500" />
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full bg-transparent px-4 py-4 outline-none"
              />
              <button
                type="button"
                className="text-rose-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-rose-500">{t("auth.register.validation.passwordRequired")}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
              {t("auth.register.confirmPassword")}
            </label>
            <div className="flex items-center rounded-2xl border border-rose-200 bg-white px-4">
              <FaLock className="text-rose-500" />
              <input
                {...register("confirmPassword", { required: true })}
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                className="w-full bg-transparent px-4 py-4 outline-none"
              />
              <button
                type="button"
                className="text-rose-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-rose-500">{t("auth.register.validation.confirmRequired")}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-rose-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? t("auth.register.loading") : (
              <>
                <span>{t("auth.register.submit")}</span>
                <FaArrowRight />
              </>
            )}
          </button>

          <div className="border-t border-rose-100 pt-4 text-center text-sm text-slate-600">
            <p>
              {t("auth.register.hasAccount")}{" "}
              <Link to="/login" className="font-semibold text-rose-600 transition hover:text-rose-500">
                {t("auth.register.signIn")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
