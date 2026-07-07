import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="relative">

      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
