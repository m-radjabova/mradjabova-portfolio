import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaEnvelope, FaShieldAlt, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import type { User } from "../../types/types";
import useContextPro from "../../hooks/useContextPro";

function formatCreatedAt(value: unknown, locale: string) {
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds?: unknown }).seconds === "number"
  ) {
    return new Date((value as { seconds: number }).seconds * 1000).toLocaleDateString(locale);
  }

  return "";
}

function AdminUsers() {
  const { t, i18n } = useTranslation();
  const {
    state: { user: currentUser },
  } = useContextPro();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const nextUsers = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as User[];

      nextUsers.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(nextUsers);
    });

    return () => unsubscribe();
  }, []);

  const stats = useMemo(
    () => ({
      total: users.length,
      admins: users.filter((item) => item.roles?.includes("ADMIN")).length,
      members: users.filter((item) => item.roles?.includes("USER")).length,
    }),
    [users]
  );

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-secondary)]">
          {t("admin.users.badge")}
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
              {t("admin.users.title")}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {t("admin.users.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[1.3rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {t("admin.users.stats.total")}
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">
                {stats.total}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {t("admin.users.stats.admins")}
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">
                {stats.admins}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {t("admin.users.stats.members")}
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">
                {stats.members}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {users.map((item) => {
            const isCurrentUser = currentUser?.uid === item.uid || currentUser?.email === item.email;

            return (
              <article
                key={item.id ?? item.uid}
                className={`rounded-[1.5rem] border p-5 ${
                  isCurrentUser
                    ? "border-[var(--accent-primary)] bg-white/80 shadow-[var(--shadow-soft)] dark:bg-white/8"
                    : "border-[var(--border-soft)] bg-white/72 dark:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white">
                    <FaUser />
                  </div>
                  {isCurrentUser && (
                    <span className="rounded-full bg-[var(--accent-primary)]/12 px-3 py-1 text-xs font-semibold text-[var(--accent-primary)]">
                      {t("admin.users.you")}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)]">
                  {item.name}
                </h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <FaEnvelope className="text-[var(--accent-primary)]" />
                  <span className="truncate">{item.email}</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.roles?.length ? (
                    item.roles.map((role) => (
                      <span
                        key={`${item.uid}-${role}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/82 px-3 py-1 text-xs font-semibold text-[var(--text-primary)] dark:bg-white/5"
                      >
                        <FaShieldAlt className="text-[var(--accent-primary)]" />
                        {role}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                      {t("admin.users.noRoles")}
                    </span>
                  )}
                </div>

                <div className="mt-5 rounded-[1rem] border border-[var(--border-soft)] bg-white/76 px-4 py-3 text-sm text-[var(--text-secondary)] dark:bg-white/5">
                  {t("admin.users.joined")}: {formatCreatedAt(item.createdAt, i18n.language)}
                </div>
              </article>
            );
          })}
        </div>

        {!users.length && (
          <div className="rounded-[1.5rem] border border-dashed border-[var(--border-soft)] px-5 py-8 text-center text-sm leading-7 text-[var(--text-secondary)]">
            {t("admin.users.empty")}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminUsers;
