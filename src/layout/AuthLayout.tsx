import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,113,133,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(135deg,_#fff7ed,_#ffe4e6_42%,_#f8fafc)]">
      <Outlet />
    </div>
  );
}
