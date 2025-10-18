import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../pages/NotFound";
import CommonRoutes from "./CommonRoutes";
let router = createBrowserRouter([
  ...CommonRoutes,
  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
