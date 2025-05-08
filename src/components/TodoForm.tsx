import React, { useState } from "react";

export interface NewTodo {
  title: string;
  priority: "Low" | "Medium" | "High";
}

export const TodoForm = ({ addTodo }: { addTodo: (todo: NewTodo) => void }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: NewTodo = {
      title,
      priority: priority,
    };
    addTodo(newTodo);

    // Reset form
    setTitle("");
    setPriority("Medium");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg border"
    >
      <div>
        <label htmlFor="title" className="block font-medium">
          What needs to be done?
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div className=" flex-col place-items-center">
        <label className="font-medium">Priority</label>
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

      <button
        type="submit"
        className="w-full rounded-lg border-1 px-2 py-3 border-transparent hover:border-gray-600 bg-gray-100 text-gray-600 duration-200"
      >
        Add Todo
      </button>
    </form>
  );
};
