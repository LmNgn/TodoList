import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const authData =
    localStorage.getItem("authData") || sessionStorage.getItem("authData");

  if (!authData) {
    toast.error("Vui long dang nhap de tiep tuc");
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;
