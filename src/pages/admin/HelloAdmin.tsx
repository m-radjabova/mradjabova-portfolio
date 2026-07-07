import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { FaArrowRight, FaFolderOpen, FaHome, FaShieldAlt, FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useContextPro from "../../hooks/useContextPro";
import { db } from "../../firebase";
import type { User } from "../../types/types";
import type { Project } from "../../hooks/useProjects";

function HelloAdmin() {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContextPro();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const nextUsers = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as User[];
      setUsers(nextUsers);
    });

    const unsubscribeProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      const nextProjects = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Project[];
      setProjects(nextProjects);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeProjects();
    };
  }, []);

  const adminCount = useMemo(
    () => users.filter((item) => item.roles?.includes("ADMIN")).length,
    [users]
  );

  const latestProjects = useMemo(
    () => [...projects].sort((a, b) => a.title.localeCompare(b.title)).slice(0, 4),
    [projects]
  );

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8">
        <div className="absolute -left-12 top-8 h-56 w-56 rounded-full bg-[var(--accent-primary)]/12 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--accent-secondary)]/14 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)] sm:text-sm">
                {t("admin.overview.badge")}
              </p>
              <h1 className="mt-3 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
                {t("admin.overview.welcome", { name: user?.name || t("admin.sidebar.adminFallback") })}
              </h1>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
              onClick={() => navigate("/")}
            >
              <FaHome /> {t("admin.overview.homePage")}
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {user?.email && (
              <p className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-white/72 px-4 py-2 text-sm text-[var(--text-secondary)] dark:bg-white/5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)]" />
                {user.email}
              </p>
            )}

            <p className="max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {t("admin.overview.description")}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                label: t("admin.sidebar.projects"),
                value: projects.length,
                note: t("admin.overview.stats.projectsNote"),
                icon: <FaFolderOpen />,
              },
              {
                label: t("admin.sidebar.users"),
                value: users.length,
                note: t("admin.overview.stats.usersNote"),
                icon: <FaUsers />,
              },
              {
                label: t("admin.overview.stats.admins"),
                value: adminCount,
                note: t("admin.overview.stats.adminsNote"),
                icon: <FaShieldAlt />,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.7rem] border border-[var(--border-soft)] bg-white/74 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl dark:bg-white/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-lg text-white">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-black text-[var(--text-primary)]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl">
          <h2 className="text-2xl font-black text-[var(--text-primary)]">
            {t("admin.overview.quickActions.title")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {t("admin.overview.quickActions.description")}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              to="/admin/projects"
              className="rounded-[1.5rem] border border-[var(--border-soft)] bg-white/76 p-5 transition hover:-translate-y-1 hover:border-[var(--accent-primary)]/35 dark:bg-white/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                {t("admin.overview.quickActions.manage")}
              </p>
              <h3 className="mt-3 text-xl font-bold text-[var(--text-primary)]">
                {t("admin.overview.quickActions.projectsTitle")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {t("admin.overview.quickActions.projectsDescription")}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)]">
                {t("admin.overview.quickActions.openProjects")} <FaArrowRight />
              </span>
            </Link>

            <Link
              to="/admin/users"
              className="rounded-[1.5rem] border border-[var(--border-soft)] bg-white/76 p-5 transition hover:-translate-y-1 hover:border-[var(--accent-primary)]/35 dark:bg-white/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
                {t("admin.overview.quickActions.review")}
              </p>
              <h3 className="mt-3 text-xl font-bold text-[var(--text-primary)]">
                {t("admin.overview.quickActions.usersTitle")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {t("admin.overview.quickActions.usersDescription")}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)]">
                {t("admin.overview.quickActions.openUsers")} <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-[var(--text-primary)]">
                {t("admin.overview.projectList.title")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {t("admin.overview.projectList.description")}
              </p>
            </div>
            <Link
              to="/admin/projects"
              className="text-sm font-semibold text-[var(--accent-primary)]"
            >
              {t("admin.overview.projectList.viewAll")}
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {latestProjects.length ? (
              latestProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-[1.4rem] border border-[var(--border-soft)] bg-white/74 px-4 py-3 dark:bg-white/5"
                >
                  <p className="font-semibold text-[var(--text-primary)]">
                    {project.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {project.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-dashed border-[var(--border-soft)] px-4 py-5 text-sm text-[var(--text-secondary)]">
                {t("admin.overview.projectList.empty")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelloAdmin;
