import { BiCheck, BiTrash } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import type { Todo } from "../App";

export const TodoList = ({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}) => {
  if (!todos.length) {
    return (
      <div className="px-4 py-16 border-1 rounded-lg">
        <p>No todos found.</p>
        <p>Use the form above to create a new one.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

const TodoItem = ({
  todo,
  deleteTodo,
  toggleTodo,
}: {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}) => {
  return (
    <li
      className={
        "flex items-center justify-between p-3 rounded-lg border opacity-70"
      }
    >
      <div className="flex items-center gap-3 flex-1">
        {todo.completed ? (
          <BiCheck />
        ) : (
          <BsCircleFill
            className={`${todo.priority === "Low" && "text-green-500"} ${
              todo.priority === "Medium" && "text-yellow-500"
            } ${todo.priority === "High" && "text-red-500"}`}
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <label
            onClick={() => toggleTodo(todo.id)}
            htmlFor={`todo-${todo.id}`}
            className={`font-medium cursor-pointer
              ${todo.completed && "line-through text-gray-500"}`}
          >
            {todo.title}
          </label>
        </div>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete todo"
        className="hover:text-red-500 hover:bg-red-100 hover:border-red-600!"
      >
        <BiTrash />
      </button>
    </li>
  );
};
