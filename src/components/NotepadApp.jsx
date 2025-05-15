import React, { useState, useEffect, useRef } from "react";
import { Home, Briefcase, Dumbbell, StickyNote } from "lucide-react";

const categories = ["Home", "Work", "Fitness", "Other"];

export default function NotepadApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Other");
  const [reminder, setReminder] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const formRef = useRef(null);

  // Load saved notes and ask for permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Schedule all reminders on load
  useEffect(() => {
    notes.forEach(scheduleReminder);
  }, [notes]);

  const scheduleReminder = (note) => {
    if (!note.reminder) return;
    const time = new Date(note.reminder).getTime() - Date.now();
    if (time > 0 && Notification.permission === "granted") {
      setTimeout(() => {
        new Notification(`Reminder: ${note.title}`, {
          body: note.content,
        });
      }, time);
    }
  };

  const addNote = () => {
    if (!title.trim() && !content.trim()) return;

    if (editingId) {
      const original = notes.find((n) => n.id === editingId);
      const updatedNote = {
        ...original,
        title,
        content,
        category,
        reminder,
      };
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? updatedNote : n))
      );
      scheduleReminder(updatedNote);
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        category,
        reminder,
        createdAt: new Date().toISOString(),
        pinned: false,
      };
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      scheduleReminder(newNote);
    }

    setTitle("");
    setContent("");
    setCategory("Other");
    setReminder("");

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const filteredNotes = notes
    .filter(
      (n) =>
        (n.title + n.content).toLowerCase().includes(search.toLowerCase()) &&
        (filter === "all" || n.category === filter)
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return sort === "title"
        ? a.title.localeCompare(b.title)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Home":
        return "bg-green-300 border-green-500 shadow-green-300/50";
      case "Work":
        return "bg-yellow-300 border-yellow-500 shadow-yellow-300/50";
      case "Fitness":
        return "bg-blue-300 border-blue-500 shadow-blue-300/50";
      case "Other":
        return "bg-purple-300 border-purple-500 shadow-purple-300/50";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Home":
        return <Home className="w-4 h-4 inline mr-1" />;
      case "Work":
        return <Briefcase className="w-4 h-4 inline mr-1" />;
      case "Fitness":
        return <Dumbbell className="w-4 h-4 inline mr-1" />;
      case "Other":
        return <StickyNote className="w-4 h-4 inline mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 font-[Inter]">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 animate-fade-in">
        📝 My Notepad
      </h1>

      {/* Form */}
      <div
        ref={formRef}
        className="bg-white/50 backdrop-blur-xl shadow-2xl rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <input
          className="col-span-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="col-span-1 lg:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Write a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          min={new Date().toISOString().slice(0, 16)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-4 rounded-lg w-full transition shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          onClick={addNote}
        >
          {editingId ? "✏️ Update Note" : "➕ Add Note"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto flex-grow focus:ring-2 focus:ring-blue-400"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="date">Newest</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Notes */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`border p-5 rounded-2xl shadow-2xl transition transform hover:scale-[1.02] relative cursor-pointer ${getCategoryColor(
              note.category
            )}`}
            onClick={() =>
              setExpandedId(expandedId === note.id ? null : note.id)
            }
          >
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
              aria-label="Delete note"
            >
              ✕
            </button>
            <button
              className="absolute top-2 left-2 text-yellow-500 hover:text-yellow-700"
              onClick={(e) => {
                e.stopPropagation();
                togglePin(note.id);
              }}
              aria-label="Toggle pin"
            >
              {note.pinned ? "📍" : "📌"}
            </button>
            <h2 className="font-bold text-xl text-gray-800 mb-1 truncate">
              {note.title}
            </h2>
            <p className="text-sm text-gray-600 mb-1 italic">
              {getCategoryIcon(note.category)} {note.category}
            </p>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {expandedId === note.id
                ? note.content
                : `${note.content.slice(0, 120)}${
                    note.content.length > 120 ? "..." : ""
                  }`}
            </p>
            {note.reminder && (
              <p className="text-xs text-blue-800 mt-2">
                ⏰ {new Date(note.reminder).toLocaleString()}
              </p>
            )}
            <button
              className="absolute bottom-2 right-2 text-blue-700 hover:text-blue-900 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setEditingId(note.id);
                setTitle(note.title);
                setContent(note.content);
                setCategory(note.category);
                setReminder(note.reminder || "");
                setTimeout(() => {
                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
            >
              ✏️ Edit
            </button>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <p className="text-center text-gray-400 italic">No notes found...</p>
      )}
    </div>
  );
}
