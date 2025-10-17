import { Navigate } from "react-router-dom";
import CommonLayout from "../components/CommonLayout";
import TodoList from "../TodoList/TodoList";
import TodoDetail from "../TodoList/TodoDetail";
import HighPriorityTodos from "../TodoList/HighPriorityTodos";

import TodoForm from "../TodoList/TodoForm";

const CommonRoutes = [
  {
    path: "/",
    Component: CommonLayout,
    children: [
      { index: true, element: <Navigate to={"/todos"} /> },
      { path: "todos", Component: TodoList },
      { path: "todos/:id", Component: TodoDetail },
      { path: "important", Component: HighPriorityTodos },
      { path: "todo", Component: TodoForm },
      { path: "todo/:id", Component: TodoForm },
    ],
  },
];
export default CommonRoutes;
