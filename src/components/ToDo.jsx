import { useState, useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [now, setNow] = useState(new Date());
  const [sortOrder, setSortOrder] = useState("default");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addTask = () => {
    if (input.trim() === "" || !deadline) return;
    setTasks([
      ...tasks,
      {
        task: input,
        description: description,
        deadline: new Date(deadline),
        completed: false,
        created: new Date(),
      },
    ]);
    setInput("");
    setDescription("");
    setDeadline("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const startEdit = (index) => {
    const t = tasks[index];
    setInput(t.task);
    setDescription(t.description);
    setDeadline(t.deadline.toISOString().slice(0, 16));
    setEditIndex(index);
  };

  const saveEdit = () => {
    if (input.trim() === "" || !deadline) return;
    const updated = tasks.map((t, i) =>
      i === editIndex
        ? { ...t, task: input, description, deadline: new Date(deadline) }
        : t
    );
    setTasks(updated);
    setInput("");
    setDescription("");
    setDeadline("");
    setEditIndex(null);
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  const getTimeLeft = (deadline) => {
    const diff = deadline - now;
    if (diff <= 0) return "Time's up";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getStatusColor = (task) => {
    if (task.completed) return "border-l-4 border-green-500";
    if (new Date(task.deadline) < now) return "border-l-4 border-red-500";
    return "border-l-4 border-blue-500";
  };

  const isExpired = (task) => new Date(task.deadline) < now;

  const handleSort = (event) => {
    setSortOrder(event.target.value);
    const sortedTasks = [...tasks];
    if (event.target.value === "deadline") {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (event.target.value === "status") {
      sortedTasks.sort((a, b) => a.completed - b.completed);
    } else {
      sortedTasks.sort((a, b) => a.created - b.created);
    }
    setTasks(sortedTasks);
  };

  const filteredTasks = useMemo(() => {
    switch (filterStatus) {
      case "completed":
        return tasks.filter((t) => t.completed);
      case "inprogress":
        return tasks.filter((t) => !t.completed && new Date(t.deadline) > now);
      case "expired":
        return tasks.filter((t) => !t.completed && new Date(t.deadline) <= now);
      default:
        return tasks;
    }
  }, [tasks, filterStatus, now]);

  const chartData = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const expired = tasks.filter(
      (t) => !t.completed && new Date(t.deadline) < now
    ).length;
    const active = total - completed - expired;

    // گروه‌بندی تسک‌ها بر اساس تاریخ deadline
    const tasksByDay = tasks.reduce((acc, task) => {
      const day = new Date(task.deadline).toLocaleDateString(); // استفاده از تاریخ به صورت روزانه
      if (!acc[day]) acc[day] = { completed: 0, inProgress: 0, expired: 0 };
      if (task.completed) acc[day].completed++;
      else if (new Date(task.deadline) < now) acc[day].expired++;
      else acc[day].inProgress++;
      return acc;
    }, {});

    // تبدیل داده‌ها برای نمودار میله‌ای
    const sortedDays = Object.keys(tasksByDay).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const barData = sortedDays.map((day) => ({
      name: day,
      completed: tasksByDay[day].completed,
      inProgress: tasksByDay[day].inProgress,
      expired: tasksByDay[day].expired,
    }));

    return {
      pie: [
        { name: "Completed", value: completed },
        { name: "In Progress", value: active },
        { name: "Expired", value: expired },
      ],
      bar: barData,
    };
  }, [tasks, now]);

  return (
    <div className="max-w-full p-6 bg-[#f4eaea]  rounded-2xl shadow-xl mt-10 mx-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        To-Do List
      </h2>

      <div className="flex flex-col lg:flex-row mb-6 space-y-4 lg:space-y-0 lg:space-x-4 w-full">
        <input
          type="text"
          placeholder="Task"
          className="flex-1 border border-gray-300 bg-white rounded-2xl px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="flex-1 border border-gray-300 bg-white rounded-2xl px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          className="flex-1 border border-gray-300 bg-white rounded-2xl px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={handleSort}
          className="flex-1 border border-gray-300 bg-white rounded-2xl px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="deadline">By Deadline</option>
          <option value="status">By Status</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="flex-1 border border-gray-300 bg-white rounded-2xl px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="inprogress">In Progress</option>
          <option value="expired">Expired</option>
        </select>
        <button
          onClick={editIndex === null ? addTask : saveEdit}
          className="bg-[#3add91] hover:bg-[#2fb879] text-white px-6 py-3 rounded-2xl shadow-md text-lg transition"
        >
          {editIndex === null ? "Add" : "Save"}
        </button>
      </div>

      <ul className="space-y-4">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 rounded-xl p-4 ${getStatusColor(
              task
            )}`}
          >
            <div className="flex-1 w-full">
              <div className="text-xl font-semibold">{task.task}</div>
              {task.description && (
                <p className="text-sm text-gray-700 mt-1">{task.description}</p>
              )}
              <p className="text-sm text-gray-600 mt-1">
                Deadline: {new Date(task.deadline).toLocaleString()}
              </p>
              {!isExpired(task) && !task.completed && (
                <p className="text-sm text-yellow-600 mt-1">
                  Time left: {getTimeLeft(new Date(task.deadline))}
                </p>
              )}
            </div>
            <div className="flex flex-row space-x-2 mt-4 sm:mt-0 sm:ml-4 items-center">
              <input
                type="checkbox"
                className="w-6 h-6"
                checked={task.completed}
                disabled={isExpired(task) && !task.completed}
                onChange={() => {
                  if (!isExpired(task)) toggleComplete(index);
                }}
              />
              {!task.completed && !isExpired(task) && (
                <button
                  onClick={() => startEdit(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                >
                  ✎
                </button>
              )}
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 w-full">
        <h3 className="text-2xl font-bold text-center mb-8 text-black">
          Task Status Overview
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.pie}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {chartData.pie.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="md:w-1/2 w-full h-72 ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.bar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="completed" stackId="a" barSize={50}>
                  {chartData.bar.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={COLORS[0]} />
                  ))}
                </Bar>
                <Bar dataKey="inProgress" stackId="a" barSize={50}>
                  {chartData.bar.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={COLORS[1]} />
                  ))}
                </Bar>
                <Bar dataKey="expired" stackId="a" barSize={50}>
                  {chartData.bar.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={COLORS[2]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
