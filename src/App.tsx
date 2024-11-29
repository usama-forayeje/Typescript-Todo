import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import "./App.css";
function App() {
  return (
    <main>
      <h1>TODO List</h1>
      <Navbar />
      <AddTodo />
      <Todos />
    </main>
  );
}

export default App;
