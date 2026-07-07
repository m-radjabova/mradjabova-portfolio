import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FaEdit, FaPlus, FaSave, FaTrash, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import type { Project } from "../../hooks/useProjects";

type ProjectFormState = {
  title: string;
  description: string;
  technologies: string;
  demoLink: string;
  githubLink: string;
};

const emptyForm: ProjectFormState = {
  title: "",
  description: "",
  technologies: "",
  demoLink: "",
  githubLink: "",
};

function AdminProjects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const nextProjects = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Project[];

      nextProjects.sort((a, b) => a.title.localeCompare(b.title));
      setProjects(nextProjects);
    });

    return () => unsubscribe();
  }, []);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );

  const projectStats = useMemo(
    () => ({
      total: projects.length,
      withGithub: projects.filter((project) => project.githubLink?.trim()).length,
      totalTech: projects.reduce((sum, project) => sum + project.technologies.length, 0),
    }),
    [projects]
  );

  const resetForm = () => {
    setSelectedProjectId(null);
    setForm(emptyForm);
  };

  const startEditing = (project: Project) => {
    setSelectedProjectId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      demoLink: project.demoLink,
      githubLink: project.githubLink ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();
    const description = form.description.trim();
    const demoLink = form.demoLink.trim();
    const githubLink = form.githubLink.trim();
    const technologies = form.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!title || !description || !demoLink || !technologies.length) {
      toast.error(t("admin.projects.toasts.required"));
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title,
        description,
        demoLink,
        githubLink,
        technologies,
        updatedAt: serverTimestamp(),
      };

      if (selectedProjectId) {
        await updateDoc(doc(db, "projects", selectedProjectId), payload);
        toast.success(t("admin.projects.toasts.updated"));
      } else {
        await addDoc(collection(db, "projects"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        toast.success(t("admin.projects.toasts.created"));
      }

      resetForm();
    } catch (error) {
      console.error("Project save failed:", error);
      toast.error(t("admin.projects.toasts.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!window.confirm(t("admin.projects.confirmDelete", { title: projectTitle }))) {
      return;
    }

    try {
      await deleteDoc(doc(db, "projects", projectId));
      toast.success(t("admin.projects.toasts.deleted"));

      if (selectedProjectId === projectId) {
        resetForm();
      }
    } catch (error) {
      console.error("Project delete failed:", error);
      toast.error(t("admin.projects.toasts.deleteError"));
    }
  };

  return (
    <div className="space-y-6 pt-14 md:pt-0">
      <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-primary)]">
          {t("admin.projects.badge")}
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
              {t("admin.projects.title")}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {t("admin.projects.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[1.3rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {t("admin.projects.stats.totalLabel")}
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">
                {projectStats.total}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {t("admin.projects.stats.githubLinked")}
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">
                {projectStats.withGithub}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-[var(--border-soft)] bg-white/72 px-4 py-3 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {t("admin.projects.stats.techTags")}
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">
                {projectStats.totalTech}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-[var(--text-primary)]">
                {selectedProject
                  ? t("admin.projects.form.editTitle")
                  : t("admin.projects.form.createTitle")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {selectedProject
                  ? t("admin.projects.form.editingDescription")
                  : t("admin.projects.form.creatingDescription")}
              </p>
            </div>
            {selectedProject && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[var(--border-soft)] bg-white/72 text-[var(--text-primary)] transition hover:text-[var(--accent-primary)] dark:bg-white/5"
                aria-label={t("admin.projects.form.cancelEditing")}
              >
                <FaTimes />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                {t("admin.projects.form.titleLabel")}
              </span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-[1rem] border border-[var(--border-soft)] bg-white/82 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] dark:bg-white/5"
                placeholder={t("admin.projects.form.placeholders.title")}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                {t("admin.projects.form.descriptionLabel")}
              </span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-[1rem] border border-[var(--border-soft)] bg-white/82 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] dark:bg-white/5"
                placeholder={t("admin.projects.form.placeholders.description")}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                {t("admin.projects.form.technologiesLabel")}
              </span>
              <input
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                className="w-full rounded-[1rem] border border-[var(--border-soft)] bg-white/82 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] dark:bg-white/5"
                placeholder={t("admin.projects.form.placeholders.technologies")}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                {t("admin.projects.form.demoLinkLabel")}
              </span>
              <input
                name="demoLink"
                value={form.demoLink}
                onChange={handleChange}
                className="w-full rounded-[1rem] border border-[var(--border-soft)] bg-white/82 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] dark:bg-white/5"
                placeholder="https://..."
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                {t("admin.projects.form.githubLinkLabel")}
              </span>
              <input
                name="githubLink"
                value={form.githubLink}
                onChange={handleChange}
                className="w-full rounded-[1rem] border border-[var(--border-soft)] bg-white/82 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-primary)] dark:bg-white/5"
                placeholder="https://github.com/..."
              />
            </label>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {selectedProject ? <FaSave /> : <FaPlus />}
                {isSaving
                  ? t("admin.projects.form.saving")
                  : selectedProject
                    ? t("admin.projects.form.update")
                    : t("admin.projects.form.create")}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/82 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
              >
                <FaTimes />
                {t("admin.projects.form.clear")}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[var(--text-primary)]">
                {t("admin.projects.listTitle")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {t("admin.projects.listDescription")}
              </p>
            </div>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              {projects.length} {t("admin.projects.stats.total")}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {projects.length ? (
              projects.map((project) => (
                <article
                  key={project.id}
                  className={`rounded-[1.5rem] border p-5 transition ${
                    selectedProjectId === project.id
                      ? "border-[var(--accent-primary)] bg-white/80 shadow-[var(--shadow-soft)] dark:bg-white/8"
                      : "border-[var(--border-soft)] bg-white/70 dark:bg-white/5"
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={`${project.id}-${tech}`}
                            className="rounded-full border border-[var(--border-soft)] bg-white/82 px-3 py-1 text-xs font-medium text-[var(--text-primary)] dark:bg-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => startEditing(project)}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/82 px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] dark:bg-white/5"
                      >
                        <FaEdit />
                        {t("admin.projects.actions.edit")}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id, project.title)}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/15 dark:text-rose-300"
                      >
                        <FaTrash />
                        {t("admin.projects.actions.delete")}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate rounded-[1rem] border border-[var(--border-soft)] bg-white/80 px-4 py-3 transition hover:text-[var(--accent-primary)] dark:bg-white/5"
                    >
                      {t("admin.projects.demo")}: {project.demoLink}
                    </a>
                    <div className="truncate rounded-[1rem] border border-[var(--border-soft)] bg-white/80 px-4 py-3 dark:bg-white/5">
                      {t("admin.projects.github")}: {project.githubLink?.trim() || t("admin.projects.notAdded")}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-[var(--border-soft)] px-5 py-8 text-center text-sm leading-7 text-[var(--text-secondary)]">
                {t("admin.projects.empty")}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminProjects;
