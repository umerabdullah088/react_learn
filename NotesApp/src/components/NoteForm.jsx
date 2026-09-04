import { useState } from "react";

function NoteForm({ addNote }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("General");

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">

            <h2 className="text-2xl font-semibold text-white mb-5">
                Add New Note
            </h2>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg"
                />

                <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg resize-none"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg"
                >
                    <option value="General">General</option>
                    <option value="React">React</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="College">College</option>
                    <option value="Personal">Personal</option>
                </select>

                <button
                    onClick={() => {

                        if (title.trim() === "" || description.trim() === "") {
                            return;
                        }

                        const note = {
                            id: Date.now(),
                            title: title,
                            description: description,
                            category: category,
                            favorite: false

                        };

                        addNote(note);

                        setTitle("");
                        setDescription("");
                        setCategory("General");

                    }}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer"
                >
                    Add Note
                </button>

            </div>

        </div>
    );
}

export default NoteForm;