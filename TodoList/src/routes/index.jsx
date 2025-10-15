import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../pages/NotFound";
import CommonRoutes from "./CommonRoute";

let router = createBrowserRouter([
  ...CommonRoutes,
  { path: "*", Component: NotFound },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
