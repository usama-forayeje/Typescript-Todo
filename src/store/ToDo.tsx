import { createContext, useState, ReactNode, useContext } from "react";

// Define the type for the props that the TodosProvider will receive.
// It will wrap around child components.
export type TodosProviderProps = {
  children: ReactNode; // The child components inside the provider.
};

// Define the structure of a single todo item.
export type ToDo = {
  id: string;         // Unique ID for each todo.
  task: string;       // The task description (what the todo is).
  completed: boolean; // Whether the todo is marked as completed or not.
  createdAt: Date;    // The date and time when the todo was created.
};

// Define the context value type that will be shared in the context.
export type TodosContext = {
  todos: ToDo[];                           // List of todos.
  handleAddToDo: (task: string) => void;   // Function to add a new todo.
  toggleTodoAsCompleted: (id: string) => void;  // Function to toggle completion status of a todo.
  handleDeleteTodo: (id: string) => void;    // Function to delete a todo by id.
};

// Create the todos context that will be used to share the state across components.
export const todosContext = createContext<TodosContext | null>(null);

// Create the TodosProvider component that will manage the todos state
// and provide access to it through context to child components.
export const TodosProvider = ({ children }: TodosProviderProps) => {
  // Initialize state to store todos.
  const [todos, setTodos] = useState<ToDo[]>(() => {
    // Try to load the todos from localStorage when the app starts.
    try {
      const storedTodos = localStorage.getItem("todos") || "[]"; // Default to an empty array if nothing is in localStorage
      return JSON.parse(storedTodos) as ToDo[]; // Parse and return the todos from localStorage
    } catch (error) {
      // If there is an error (e.g., malformed data in localStorage), return an empty array
      return [];
    }
  });

  // Function to add a new todo to the list.
  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      // Create a new todo object with the provided task and other default values
      const newTodos: ToDo[] = [
        {
          id: Math.random().toString(), // Generate a random unique ID for the new todo.
          task: task,                   // The new task description (passed as argument).
          completed: false,             // Initially, the todo is not completed.
          createdAt: new Date(),        // Set the current date and time as the creation time.
        },
        ...prev, // Spread the previous todos into the new list so the new todo is added at the top.
      ];
      // Save the updated todos list to localStorage so it persists after page reload.
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos; // Return the new updated list of todos.
    });
  };

  // Function to toggle the completion status of a todo (mark it as completed or not).
  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      // Map over the todos and toggle the completed status of the todo with the matching ID.
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }; // Toggle completed status.
        }
        return todo; // Leave other todos unchanged.
      });
      // Save the updated list of todos to localStorage.
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos; // Return the updated todos list.
    });
  };

  // Function to delete a todo by its ID.
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      // Filter out the todo with the matching ID from the list.
      const newTodos = prev.filter((todo) => todo.id !== id);
      // Save the updated list of todos to localStorage.
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos; // Return the updated todos list without the deleted todo.
    });
  };

  // Return the provider that wraps around the child components
  // and gives them access to the todos and the functions to modify them.
  return (
    <todosContext.Provider value={{ todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo }}>
      {children} {/* Render the child components passed to the provider */}
    </todosContext.Provider>
  );
};



// Custom hook to consume the TodosContext and get access to todos and related functions.
export const useTodos = () => {
  const todosConsumer = useContext(todosContext);

  // If the component using this hook is not wrapped inside TodosProvider, throw an error.
  if (!todosConsumer) {
    throw new Error("No provider found for TodosContext");
  }

  // Return the todosContext value (todos and functions).
  return todosConsumer;
};
