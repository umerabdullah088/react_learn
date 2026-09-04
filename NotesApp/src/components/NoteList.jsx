import { useState } from "react";

function NoteList({ notes, deleteNote, editNote, toggleFavorite }) {

    const [editingId, setEditingId] = useState(null);

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("General");

    return (
        <div>

            <h2 className="text-2xl font-semibold text-white mb-5">
                Your Notes
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {notes.map((note) => (

                    <div
                        key={note.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg"
                    >

                        {editingId === note.id ? (

                            /* EDIT MODE */

                            <div className="space-y-4">

                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />

                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="General">General</option>
                                    <option value="React">React</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="College">College</option>
                                    <option value="Personal">Personal</option>
                                </select>

                                <button
                                    onClick={() => {

                                        editNote(
                                            note.id,
                                            editTitle,
                                            editDescription,
                                            editCategory
                                        );

                                        setEditingId(null);

                                    }}
                                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition cursor-pointer"
                                >
                                    Save Changes
                                </button>

                            </div>

                        ) : (

                            /* NORMAL MODE */

                            <>

                                <h3 className="text-xl font-bold text-white mb-2">
                                    {note.title}
                                </h3>

                                <p className="text-slate-400 mb-4 leading-relaxed">
                                    {note.description}
                                </p>

                                <span className="inline-block px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full mb-5">
                                    {note.category}
                                </span>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => toggleFavorite(note.id)}
                                        className={`px-4 py-2 text-white font-semibold rounded-lg transition cursor-pointer ${note.favorite
                                            ? "bg-yellow-500 hover:bg-yellow-600"
                                            : "bg-slate-700 hover:bg-slate-600"
                                            }`}
                                    >
                                        {note.favorite ? "★ Favorite" : "☆ Favorite"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingId(note.id);
                                            setEditTitle(note.title);
                                            setEditDescription(note.description);
                                            setEditCategory(note.category);
                                        }}
                                        className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition cursor-pointer"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition cursor-pointer"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </>

                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}

export default NoteList;