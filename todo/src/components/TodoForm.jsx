import { useState } from "react";

function TodoForm({ addTask }) {
    const [counter, setCounter] = useState(1);
    const [text, setTask] = useState("");

    const task = {
        id: counter,
        text: text,
        completed: false,
    };

    return (
        <div className="flex gap-4 mb-8">
            <input
                type="text"
                placeholder="Enter the task"
                value={task.text}
                onChange={(e) => setTask(e.target.value)}
                className="flex-1 px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={() => {
                    if (text.trim() === "") return;

                    addTask(task);
                    setTask("");
                    setCounter(counter + 1);
                }}
                className="px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
            >
                Add +
            </button>
        </div>
    );
}

export default TodoForm;