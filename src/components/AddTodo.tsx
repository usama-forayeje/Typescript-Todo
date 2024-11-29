import { useState } from "react";
import { useTodos } from "../store/ToDo";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const { handleAddToDo } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddToDo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodo;
