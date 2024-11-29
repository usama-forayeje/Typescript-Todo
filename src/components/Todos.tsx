import { useSearchParams } from "react-router-dom";  // Import to work with URL search parameters
import { useTodos } from "../store/ToDo";             // Custom hook to get todos and actions

function Todos() {
  // Use useSearchParams to access the query parameters in the URL
  const [searchParams] = useSearchParams();

  // Get the "todos" query parameter from the URL (could be "active" or "completed")
  let todosData = searchParams.get("todos"); 

  console.log(todosData); // For debugging, shows the current filter (active/completed)

  // Destructure the necessary actions and data from the custom hook useTodos
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();

  // Default is to show all todos
  let filterData = todos;

  // Filter todos based on the query parameter
  if (todosData === "active") {
    // Filter to show only active (not completed) todos
    filterData = filterData.filter((task) => !task.completed);
  }
  if (todosData === "completed") {
    // Filter to show only completed todos
    filterData = filterData.filter((task) => task.completed);
  }

  // Render the list of filtered todos
  return (
    <ul>
      {/* Iterate over the filtered todos and display each */}
      {filterData.map((todo) => {
        return (
          <li key={todo.id}>
            {/* Checkbox to mark todo as completed */}
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleTodoAsCompleted(todo.id)} // Toggle the completion status
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            
            {/* Show the delete button only if the todo is completed */}
            {todo.completed && (
              <button
                type="button"
                onClick={() => handleDeleteTodo(todo.id)} // Handle deletion of the todo
              >
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Todos;
