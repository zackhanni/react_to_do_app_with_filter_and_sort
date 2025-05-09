import { BiCheck } from "react-icons/bi";
import type { Todo } from "../App";
import { BsCircleFill } from "react-icons/bs";

export const TodoStats = ({
  todos,
  toggleTodo,
}: {
  todos: Todo[] | [];
  toggleTodo: (id: number) => void;
}) => {
  const total = todos.length;
  let active = 0;
  let completed = 0;

  const getStats = (todos: Todo[]) => {
    for (const todo of todos) {
      if (todo.completed === true) {
        completed++;
      } else {
        active++;
      }
    }
  };
  getStats(todos);
  const HighPriorityTodos = todos.filter((todo) => todo.priority === "High");
  // .slice(0, 5);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 text-center pb-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <div className="text-2xl font-bold">{active}</div>
          <div className="text-sm text-blue-600">Active</div>
        </div>
        <div className="bg-green-100 p-3 rounded-lg">
          <div className="text-2xl font-bold">{completed}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
      </div>
      <div className="space-y-2">
        <p>{HighPriorityTodos.length} High Priority</p>
        <ul className="space-y-2">
          {HighPriorityTodos.map((todo) => {
            return (
              <PriorityTodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
              />
            );
          })}
        </ul>
        {/* <button className="w-full rounded-lg border-1 px-2 py-1 border-transparent hover:border-gray-600 bg-gray-100 text-gray-600 duration-200">
          All high priority tasks
        </button> */}
      </div>
    </div>
  );
};

const PriorityTodoItem = ({
  todo,
  toggleTodo,
}: {
  todo: Todo;
  toggleTodo: (id: number) => void;
}) => {
  return (
    <li
      className={
        "flex items-center justify-between p-3 rounded-lg border opacity-70 gap-2 bg-red-100"
      }
    >
      <div className="flex items-center gap-3 flex-1">
        {todo.completed ? (
          <BiCheck />
        ) : (
          <BsCircleFill className={` text-red-500`} />
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
    </li>
  );
};
