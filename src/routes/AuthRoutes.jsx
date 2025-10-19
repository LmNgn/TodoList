import AuthForm from "../pages/AuthForm";

const AuthRoutes = [
  {
    path: "/auth",
    element: <AuthForm />,
    children: [{ index: true, element: <AuthForm /> }],
  },
];
export default AuthRoutes;
