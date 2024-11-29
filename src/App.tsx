import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import "./App.css";
import { PiNotepadLight } from "react-icons/pi";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main>
        <h1>
          <PiNotepadLight style={{ fontSize: "36px", color: "#4caf50" }} />
          TODO List
          <PiNotepadLight style={{ fontSize: "36px", color: "#4caf50" }} />
        </h1>
        <Navbar />
        <AddTodo />
        <Todos />
      </main>
      <Footer />
    </>
  );
}

export default App;
