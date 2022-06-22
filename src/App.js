import { AuthPage } from "./Components/Auth";
import { RealTimeDbFromFirebase, Todo } from "./Components/Todo";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <AuthPage />
      <Todo />
      <RealTimeDbFromFirebase />
    </div>
  );
}
