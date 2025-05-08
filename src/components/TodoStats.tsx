import type { Todo } from "../App";

export const TodoStats = ({ todos }: { todos: Todo[] | [] }) => {
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

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
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
  );
};
