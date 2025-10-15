import { Navigate } from "react-router-dom";
import CommonLayout from "../components/CommonLayout";
import TodoList from "../TodoList/TodoList";
import TodoDetail from "../TodoList/TodoDetail";
import HighPriorityTodos from "../TodoList/HighPriorityTodos";

const commonRoutes = [
  {
    path: "/",
    Component: CommonLayout,
    children: [
      { index: true, element: <Navigate to={"/todos"} /> },
      { path: "todos", Component: TodoList },
      { path: "todos/:id", Component: TodoDetail },
      { path: "important", Component: HighPriorityTodos },
    ],
  },
];
export default commonRoutes;
