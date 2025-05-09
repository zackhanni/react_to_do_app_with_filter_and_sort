import { BiCheck, BiEdit, BiSave, BiTrash } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import type { Todo } from "../App";
import { useState } from "react";

export const TodoList = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string, priority: string) => void;
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
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

const TodoItem = ({
  todo,
  deleteTodo,
  toggleTodo,
  editTodo,
}: {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string, priority: string) => void;
}) => {
  const [editingMode, setEditingMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);

  const toggleEditMode = () => {
    setEditingMode((prev) => !prev);
  };

  return (
    <li
      className={
        "flex items-center justify-between p-3 rounded-lg border opacity-70 gap-2"
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
          {editingMode ? (
            <div className="flex flex-col">
              <div>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={title}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div className=" flex-col place-items-center">
                <div className="flex gap-4">
                  {(["Low", "Medium", "High"] as const).map((level) => (
                    <label key={level} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="priority"
                        value={level}
                        checked={priority === level}
                        onChange={() => setPriority(level)}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <label
              onClick={() => toggleTodo(todo.id)}
              htmlFor={`todo-${todo.id}`}
              className={`font-medium cursor-pointer
              ${todo.completed && "line-through text-gray-500"}`}
            >
              {todo.title}
            </label>
          )}
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => toggleEditMode()}
          aria-label="Edit todo item"
          className="rounded-lg border-1 border-transparent hover:border-blue-600 px-4 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 duration-200"
        >
          <BiEdit />
        </button>
        {editingMode ? (
          <button
            onClick={() => {
              editTodo(todo.id, title, priority);
              toggleEditMode();
            }}
            aria-label="Save new todo name"
            className="rounded-lg border-1 border-transparent hover:border-green-600 px-4 py-2 bg-green-300 text-green-600 hover:text-green-300 hover:bg-green-600 duration-200"
          >
            <BiSave />
          </button>
        ) : (
          <button
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete todo item"
            className="rounded-lg border-1 border-transparent hover:border-red-600 px-4 py-2 bg-gray-100 hover:text-red-600 hover:bg-red-100 duration-200"
          >
            <BiTrash />
          </button>
        )}
      </div>
    </li>
  );
};
