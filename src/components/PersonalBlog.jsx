import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Trash2 } from "lucide-react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

function PersonalBlog() {
  const categories = [
    {
      name: "Projects",
      description:
        "Articles about HTML, CSS, JavaScript, and how to build user interfaces using modern frontend technologies like React, Vue, and Tailwind CSS.",
    },
    {
      name: "College",
      description:
        "Tips, tricks, and tutorials on using React, including hooks, state management, component patterns, and performance optimization.",
    },
    {
      name: "Sports",
      description:
        "Thoughts on UI/UX design, color theory, typography, layout principles, and creating accessible and user-friendly interfaces.",
    },
    {
      name: "Life",
      description:
        "Personal reflections on work-life balance, productivity, freelancing, and life as a developer in the modern tech world.",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await addDoc(collection(db, "comments"), {
      text: newComment,
      timestamp: serverTimestamp(),
      likes: 0,
    });
    setNewComment("");
  };

  const handleLike = async (id) => {
    const ref = doc(db, "comments", id);
    await updateDoc(ref, {
      likes: increment(1),
    });
  };

  const handleReply = (id, text) => {
    if (!text.trim()) return;
    setReplies((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { text, timestamp: new Date() }],
    }));
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteDoc(doc(db, "comments", id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <div className="w-28 h-28 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 shadow-sm">
          👤
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-4 tracking-tight">Ali Hashemi</h1>
        <p className="text-sm text-gray-500 mt-1">Frontend Developer · Computer Engineer Student</p>
        <p className="text-gray-600 mt-4 max-w-md mx-auto leading-relaxed text-base">
          Welcome to my personal blog where I share thoughts, tutorials, and experiences around web development, design, and life in tech.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Explore Categories</h2>
        <div className="flex gap-4 flex-nowrap overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:overflow-visible">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <motion.button
                key={cat.name}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveCategory(cat.name)}
                className={`snap-start relative flex items-center gap-1 
                  px-3 py-1 text-xs 
                  sm:px-5 sm:py-2 sm:text-sm 
                  rounded-full border transition-all duration-200 font-medium whitespace-nowrap
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-lg hover:from-blue-600 hover:to-purple-600 text-white shadow-md"
                      : "bg-white text-blue-700 hover:bg-gray-100 hover:scale-[1.03]"
                  }
                `}
              >
                {cat.name}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isActive ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-gradient-to-r from-pink-200 to-blue-300 mt-6 border border-gray-200 rounded-xl p-5 shadow-inner"
          >
            <p className="text-gray-700 leading-relaxed tracking-wide">
              {categories.find((cat) => cat.name === activeCategory)?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Comments Section */}
      <section className="mt-10 bg-white border border-gray-200 rounded-xl p-5 shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Comments</h3>

        <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-white font-bold">
                  👤
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-800 font-medium">Anonymous</p>
                    <span className="text-xs text-gray-500">
                      {comment.timestamp?.seconds
                        ? formatDistanceToNow(new Date(comment.timestamp.seconds * 1000), { addSuffix: true })
                        : "Just now"}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.text}</p>

                  {/* Like + Reply */}
                  <div className="mt-3 flex gap-4 text-sm text-gray-500">
                    <button onClick={() => handleLike(comment.id)} className="hover:underline">
                      👍 {comment.likes || 0} Like
                    </button>
                    <button onClick={() => handleDelete(comment.id)} className="hover:underline text-red-500">
                      <Trash2 size={16} className="inline mr-1" /> Delete
                    </button>
                  </div>

                  {/* Replies */}
                  {replies[comment.id]?.map((reply, idx) => (
                    <div key={idx} className="mt-3 ml-4 border-l pl-3 text-sm text-gray-600">
                      ↳ {reply.text} <span className="ml-2 text-xs text-gray-400">{formatDistanceToNow(reply.timestamp, { addSuffix: true })}</span>
                    </div>
                  ))}

                  <div className="mt-3 ml-4">
                    <input
                      type="text"
                      placeholder="Reply..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleReply(comment.id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="w-full rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PersonalBlog;
