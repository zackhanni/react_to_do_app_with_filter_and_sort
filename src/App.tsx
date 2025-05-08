import { useState, useEffect, useRef } from "react";
import "./App.css";

import { getTodos } from "./database/demoList";
import { TodoList } from "./components/TodoList";
import { TodoForm, type NewTodo } from "./components/TodoForm";
import { TodoStats } from "./components/TodoStats";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  createdAt: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const hasLoaded = useRef(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos && JSON.parse(savedTodos).length > 0) {
      setTodos(JSON.parse(savedTodos));
    } else {
      const getInitTodos = async () => {
        const initTodos = await getTodos();
        setTodos(
          initTodos.map((todo) => ({
            ...todo,
            priority: todo.priority as "Low" | "Medium" | "High",
          }))
        );
      };
      getInitTodos();
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      hasLoaded.current = true;
    }
  }, [todos]);

  // Add todo handler
  const addTodo = (newTodo: NewTodo) => {
    setTodos([
      ...todos,
      {
        ...newTodo,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Toggle todo completion status
  const toggleTodo = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: Todo["id"]) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Get filtered and sorted todos
  const getFilteredTodos = () => {
    return todos
      .filter((todo) => {
        // Status filter
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .filter((todo) => {
        // Priority filter
        if (priorityFilter !== "all") return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        // Sorting
        if (sortBy === "priority") {
          const priorityValues = { Low: 1, Medium: 2, High: 3 };
          return priorityValues[b.priority] - priorityValues[a.priority];
        }
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  };

  return (
    <div className="App space-y-4 pb-4">
      <h1>Todo Manager</h1>

      <TodoStats todos={todos} />
      <TodoForm addTodo={addTodo} />
      {/* Filter and Sort Controls */}
      {todos.length > 0 && (
        <div className="controls space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-100 p-2 rounded-lg text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-gray-100 p-2 rounded-lg text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-100 p-2 rounded-lg text-sm"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      )}
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
