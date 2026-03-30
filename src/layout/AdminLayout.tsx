import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
