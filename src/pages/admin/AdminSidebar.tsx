import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBox,
  FaClipboardList,
  FaCog,
  FaHeart,
  FaHome,
  FaImages,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { SiWine } from "react-icons/si";
import useContextPro from "../../hooks/useContextPro";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { user },
    dispatch,
  } = useContextPro();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin", role: "ADMIN" },
    { name: "Products", icon: <FaClipboardList />, path: "/admin/products", role: "ADMIN" },
    { name: "Categories", icon: <FaCog />, path: "/admin/categories", role: "ADMIN" },
    { name: "Carousel/Slider", icon: <FaHeart />, path: "/admin/carousel", role: "ADMIN" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users", role: "ADMIN" },
    { name: "Orders", icon: <FaBox />, path: "/admin/orders", role: "CHEF" },
    { name: "Waiter", icon: <SiWine />, path: "/admin/waiter", role: "WAITER" },
    { name: "Gallery", icon: <FaImages />, path: "/admin/gallery", role: "ADMIN" },
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

  return (
    <div
      className={`sticky top-0 flex min-h-screen shrink-0 flex-col border-r border-white/10 bg-slate-900/95 px-3 py-4 backdrop-blur transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="mb-4 flex items-center justify-between px-2">
        {isOpen && (
          <button onClick={() => navigate("/admin")} className="text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Admin</p>
            <h4 className="mt-1 text-lg font-bold text-white">Panel</h4>
          </button>
        )}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-2">
        {menuItems
          .filter((item) => canAccess(item.role))
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActiveLink(item.path)
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
      </nav>

      <div className="mt-auto pt-4">
        <button
          onClick={() => dispatch({ type: "LOGOUT" })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
        >
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
