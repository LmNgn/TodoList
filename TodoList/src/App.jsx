import { Toaster } from "react-hot-toast";
import "./App.css";
import TodoList from "./TodoList/TodoList";

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <TodoList />
      <Toaster />
    </div>
  );
}

export default App;
