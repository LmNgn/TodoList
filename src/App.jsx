import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRouter from "./routes";
function App() {
  return (
    <div>
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
