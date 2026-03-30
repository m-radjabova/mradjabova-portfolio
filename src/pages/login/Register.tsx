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

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
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
      toast.error("Passwords do not match.");
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

      toast.success("Registration successful!");
      reset();
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email is already registered.");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email address.");
            break;
          case "auth/weak-password":
            toast.error("Password should be at least 6 characters.");
            break;
          default:
            toast.error("Registration failed. Please try again.");
        }
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.2),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.18),transparent_25%),linear-gradient(135deg,#fff7ed,#ffe4e6_45%,#f8fafc)]" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-rose-200/60 bg-white/80 p-8 shadow-2xl shadow-rose-200/40 backdrop-blur xl:p-10">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-200/50 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-sky-200/60 blur-2xl" />

        <div className="relative text-center">
          <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <FaUser className="text-2xl" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Create account</h2>
          <p className="mt-2 text-slate-600">
            Register to access the portfolio project panel
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
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
            {errors.name && <p className="mt-2 text-sm text-rose-500">Name is required</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
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
            {errors.email && <p className="mt-2 text-sm text-rose-500">Email is required</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
              Password
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
            {errors.password && <p className="mt-2 text-sm text-rose-500">Password is required</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
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
              <p className="mt-2 text-sm text-rose-500">Confirm password is required</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-rose-300/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating..." : (
              <>
                <span>Create account</span>
                <FaArrowRight />
              </>
            )}
          </button>

          <div className="border-t border-rose-100 pt-4 text-center text-sm text-slate-600">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-rose-600 transition hover:text-rose-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
