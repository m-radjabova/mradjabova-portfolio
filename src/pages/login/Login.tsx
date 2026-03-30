import { useState } from "react";
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { type FieldValues, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import type { User } from "../../types/types";
import { FirebaseError } from "firebase/app";

const LoginForm = () => {
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
        if (currentUser?.roles) {
          localStorage.setItem("role", currentUser.roles.join(","));
          navigate("/", { replace: true });
        } else {
          localStorage.removeItem("role");
        }
      } else {
        localStorage.removeItem("role");
        toast.warn("User role topilmadi.");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const code = error.code;

        switch (code) {
          case "auth/user-not-found":
            toast.error("Account topilmadi. Iltimos, ro'yxatdan o'ting!");
            break;
          case "auth/wrong-password":
          case "auth/invalid-credential":
            toast.error("Noto'g'ri email yoki parol. Qayta urinib ko'ring.");
            break;
          case "auth/invalid-email":
            toast.error("Email manzili noto'g'ri formatda.");
            break;
          case "auth/too-many-requests":
            toast.error("Juda ko'p urinish. Iltimos, birozdan keyin qayta urinib ko'ring.");
            break;
          default:
            toast.error("Kirishda hatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        }
      } else {
        toast.error("Noma'lum xatolik yuz berdi!");
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.2),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.18),transparent_25%),linear-gradient(135deg,#fff7ed,#ffe4e6_45%,#f8fafc)]" />

      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-rose-200/60 bg-white/80 p-8 shadow-2xl shadow-rose-200/40 backdrop-blur xl:p-10">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-200/50 blur-2xl" />

        <div className="relative text-center">
          <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <FaLock className="text-2xl" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(Login)} className="relative mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="flex items-center rounded-2xl border border-rose-200 bg-white px-4">
              <FaEnvelope className="text-rose-500" />
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                {...register("email", { required: true })}
                className="w-full bg-transparent px-4 py-4 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="flex items-center rounded-2xl border border-rose-200 bg-white px-4">
              <FaLock className="text-rose-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full bg-transparent px-4 py-4 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                className="text-rose-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-rose-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : (
              <>
                <span>Sign In</span>
                <FaArrowRight />
              </>
            )}
          </button>

          <div className="border-t border-rose-100 pt-4 text-center text-sm text-slate-600">
            <p>
              Don't have an account?{" "}
              <NavLink to="/sign-up" className="font-semibold text-rose-600 transition hover:text-rose-500">
                Create one
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
