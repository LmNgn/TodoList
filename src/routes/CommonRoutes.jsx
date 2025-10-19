import CommonLayout from "../components/CommonLayout";
import TodoList from "../TodoList/TodoList";
import TodoDetail from "../TodoList/TodoDetail";
import HighPriorityTodos from "../TodoList/HighPriorityTodos";
import TodoForm from "../TodoList/TodoForm";
import { Navigate } from "react-router-dom";
import ProtectRoute from "./ProtectRoute";

const CommonRoutes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { index: true, element: <Navigate to="/auth" /> },

      {
        element: <ProtectRoute />,
        children: [
          { path: "todos", element: <TodoList /> },
          { path: "todos/:id", element: <TodoDetail /> },
          { path: "important", element: <HighPriorityTodos /> },
          { path: "todo", element: <TodoForm /> },
          { path: "todo/:id", element: <TodoForm /> },
        ],
      },
    ],
  },
];

export default CommonRoutes;
