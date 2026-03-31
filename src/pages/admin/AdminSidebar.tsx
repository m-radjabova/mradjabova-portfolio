import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChartPie,
  FaFolderOpen,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import useContextPro from "../../hooks/useContextPro";
import { auth } from "../../firebase";

function AdminSidebar() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { user },
  } = useContextPro();

  const menuItems = [
    { name: "Overview", icon: <FaChartPie />, path: "/admin", role: "ADMIN" },
    { name: "Projects", icon: <FaFolderOpen />, path: "/admin/projects", role: "ADMIN" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users", role: "ADMIN" },
  ];

  const canAccess = (itemRole: string) => {
    if (!user?.roles) return false;
    if (user.roles.includes("SUPER_ADMIN")) return true;
    return user.roles.includes(itemRole);
  };

  const isActiveLink = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully.");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Could not sign out. Try again.");
    }
  };

  const renderNavContent = (collapsed: boolean) => (
    <>
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        {!collapsed && (
          <button onClick={() => navigate("/admin")} className="min-w-0 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-secondary)]">
              Portfolio
            </p>
            <h4 className="mt-1 truncate text-lg font-black text-[var(--text-primary)]">
              Admin Panel
            </h4>
          </button>
        )}
        <button
          className="hidden h-11 w-11 items-center justify-center rounded-[1.2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] text-[var(--text-primary)] shadow-[var(--shadow-soft)] md:inline-flex"
          onClick={() => setIsDesktopOpen((current) => !current)}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      <div className="mb-5 rounded-[1.5rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-primary)]">
          Signed in as
        </p>
        <p className="mt-2 truncate text-base font-bold text-[var(--text-primary)]">
          {user?.name || "Admin"}
        </p>
        <p className="mt-1 truncate text-sm text-[var(--text-secondary)]">
          {user?.email}
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems
          .filter((item) => canAccess(item.role))
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition ${
                isActiveLink(item.path)
                  ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_14px_30px_rgba(255,107,154,0.22)]"
                  : "text-[var(--text-secondary)] hover:bg-white/50 hover:text-[var(--text-primary)] dark:hover:bg-white/8"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
      </nav>

      <div className="mt-5 space-y-3">
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
        >
          <FaHome />
          {!collapsed && <span>View site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/15 dark:text-rose-300"
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-[1.2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] text-[var(--text-primary)] shadow-[var(--shadow-soft)] backdrop-blur-2xl md:hidden"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open admin menu"
      >
        <FaBars />
      </button>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm md:hidden">
          <div className="h-full w-[84vw] max-w-[20rem] border-r border-[var(--border-soft)] bg-[var(--bg-elevated)] p-4 shadow-2xl">
            <div className="mb-4 flex justify-end">
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-[1.2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] text-[var(--text-primary)] shadow-[var(--shadow-soft)]"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close admin menu"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex h-[calc(100%-3.75rem)] flex-col">
              {renderNavContent(false)}
            </div>
          </div>
        </div>
      )}

      <aside
        className={`sticky top-0 hidden min-h-screen shrink-0 border-r border-[var(--border-soft)] bg-[var(--bg-elevated)]/85 p-4 backdrop-blur-2xl transition-all duration-300 md:flex md:flex-col ${
          isDesktopOpen ? "w-72" : "w-24"
        }`}
      >
        {renderNavContent(!isDesktopOpen)}
      </aside>
    </>
  );
}

export default AdminSidebar;
