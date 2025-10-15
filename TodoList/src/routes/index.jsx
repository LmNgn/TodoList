import { createBrowserRouter, RouterProvider } from "react-router-dom";
import commonRoutes from "./CommonRoute";
import NotFound from "../pages/NotFound";

let router = createBrowserRouter([
  ...commonRoutes,
  { path: "*", Component: NotFound },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
