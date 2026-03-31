import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import HelloAdmin from "./pages/admin/HelloAdmin";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./components/NotFound";
import IsLoading from "./components/IsLoading";
import useLoading from "./hooks/useLoading";
import ProjectDetails from "./pages/projects/ProjectDetails";
import Resume from "./pages/resume/Resume";

function App() {
  const { loading } = useLoading();

  if (loading) {
    return <IsLoading />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/resume" element={<Resume />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/adm-login" element={<Login />} />
          <Route path="/sign-up" element={<Navigate to="/login" replace />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HelloAdmin />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
