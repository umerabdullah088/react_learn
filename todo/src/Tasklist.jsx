import { use, useState } from "react";

function Tasklist({ todos, delTask, editTask, completedTask }) {

    const [editingid, setEditingid] = useState(null);
    const [newText, setNewText] = useState("");



    return (
        <ul className="space-y-4">

            {todos.map((todo) => (

                editingid === todo.id ? (

                    <li
                        key={todo.id}
                        className="flex gap-3 bg-slate-800 p-4 rounded-xl"
                    >
                        <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={() => {
                                editTask(todo.id, newText);
                                setEditingid(null);
                                setNewText("");
                            }}
                            className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                        >
                            Save
                        </button>
                    </li>

                ) : (

                    <li
                        key={todo.id}
                        className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700"
                    >

                        <span
                            className={`text-lg ${todo.completed
                                ? "text-slate-500 line-through"
                                : "text-white"
                                }`}
                        >
                            {todo.text}
                        </span>

                        <div className="flex gap-2">

                            <button
                                onClick={() => delTask(todo.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Del
                            </button>

                            <button
                                onClick={() => {
                                    setEditingid(todo.id);
                                    setNewText(todo.text);
                                }}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                            >
                                Edit
                            </button>



                            <button
                                onClick={() => completedTask(todo.id)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                            >
                                {todo.completed === false ? "✔" : "❌"}
                            </button>
                        </div>

                    </li>

                )

            ))}

        </ul>
    );
}

export default Tasklist;