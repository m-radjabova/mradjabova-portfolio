import useResolvedTheme from "../hooks/useResolvedTheme";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";

export default function AdminLayout() {
  useResolvedTheme();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.1),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(177,124,255,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,244,247,0.1))] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,107,154,0.12),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(177,124,255,0.14),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.2),rgba(15,23,42,0.34))]" />
      <div className="relative flex min-h-screen">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-4 md:p-6 xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
