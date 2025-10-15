import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const CommonLayout = () => {
  return (
    <div className="flex handwritten">
      <Sidebar />
      <main className="flex-1 min-h-screen p-4 md:p-8 bg-amber-50">
        <Outlet />
      </main>
    </div>
  );
};

export default CommonLayout;
