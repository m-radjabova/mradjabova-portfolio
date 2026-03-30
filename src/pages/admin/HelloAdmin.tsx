import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useContextPro from "../../hooks/useContextPro";

function HelloAdmin() {
  const {
    state: { user },
  } = useContextPro();
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="absolute -left-12 top-8 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200">Admin dashboard</p>
            <h1 className="mt-3 text-4xl font-black text-white">
              Welcome, {user?.name || "Admin"}!
            </h1>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            onClick={() => navigate("/")}
          >
            <FaHome /> Home Page
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {user?.email && (
            <p className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <svg className="h-4 w-4 text-cyan-300" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" />
              </svg>
              {user.email}
            </p>
          )}

          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Ready to manage your system today? Let's make it productive!
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Users</h3>
            <p className="mt-2 text-slate-400">Manage access and roles from the admin area.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-400/10 text-fuchsia-300">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 10V3C14 2.46957 13.7893 1.96086 13.4142 1.58579C13.0391 1.21071 12.5304 1 12 1C11.4696 1 10.9609 1.21071 10.5858 1.58579C10.2107 1.96086 10 2.46957 10 3V10H3C2.46957 10 1.96086 10.2107 1.58579 10.5858C1.21071 10.9609 1 11.4696 1 12C1 12.5304 1.21071 13.0391 1.58579 13.4142C1.96086 13.7893 2.46957 14 3 14H10V21C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23C12.5304 23 13.0391 22.7893 13.4142 22.4142C13.7893 22.0391 14 21.5304 14 21V14H21C21.5304 14 22.0391 13.7893 22.4142 13.4142C22.7893 13.0391 23 12.5304 23 12C23 11.4696 22.7893 10.9609 22.4142 10.5858C22.0391 10.2107 21.5304 10 21 10H14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Products</h3>
            <p className="mt-2 text-slate-400">Create and organize product content efficiently.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Orders</h3>
            <p className="mt-2 text-slate-400">Track operations and keep the workflow consistent.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelloAdmin;
