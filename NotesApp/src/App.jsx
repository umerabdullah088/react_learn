import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(
      notes.filter((note) => note.id !== id)
    );
  };

  const editNote = (id, title, description, category) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
            ...note,
            title: title,
            description: description,
            category: category
          }
          : note
      )
    );
  };

  const toggleFavorite = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, favorite: !note.favorite }
          : note
      )
    );
  };

  const filteredNotes = notes.filter((note) => {

    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || note.category === category;

    const matchesFavorite =
      !favoriteOnly || note.favorite === true;

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-white text-center mb-10">
          My Notes
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-3/4 px-5 py-3 bg-slate-800 text-white placeholder-slate-400 rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-6 py-4
            ml-1
            bg-slate-800 text-white rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="College">College</option>
            <option value="Personal">Personal</option>
          </select>

          <button
            onClick={() => setFavoriteOnly(!favoriteOnly)}
            className={`px-4 py-3 rounded-xl text-white font-semibold cursor-pointer transition ${favoriteOnly
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-slate-800 hover:bg-slate-700"
              }`}
          >
            {favoriteOnly ? "★ Favorites" : "☆ Favorites"}
          </button>
        </div>

        <NoteForm addNote={addNote} />

        <NoteList
          notes={filteredNotes}
          deleteNote={deleteNote}
          editNote={editNote}
          toggleFavorite={toggleFavorite}
        />

      </div>

    </div>
  );
}

export default App;