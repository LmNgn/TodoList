import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../pages/NotFound";
import CommonRoutes from "./CommonRoutes";
import AuthRoutes from "./AuthRoutes";
let router = createBrowserRouter([
  ...CommonRoutes,
  ...AuthRoutes,
  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
