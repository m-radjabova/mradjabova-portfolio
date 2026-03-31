import { Navigate } from "react-router-dom";
import useContextPro from "../hooks/useContextPro";
import IsLoading from "./IsLoading";

interface Props {
  role: string;
  children: React.ReactNode;
}
function ProtectedRoute({ role, children }: Props) {
  const { state: { user, isLoading } } = useContextPro();

  if (isLoading) {
    return <IsLoading />;
  }

  if (!user?.roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
