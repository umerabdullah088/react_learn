import { useState } from "react";
import TodoForm from "./components/TodoForm";
import Tasklist from "./Tasklist";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("");
  const [auxtodo, setAuxtodo] = useState(todos);
  const addTask = (task) => {
    setTodos([...todos, task]);
  };

  const delTask = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const editTask = (id, text) => {
    setTodos(
      todos.map((todo) =>
        todo.id !== id
          ? todo
          : { ...todo, text: text }
      )
    );
  };

  const completedTask = (id) => {
    setTodos(
      todos.map((todo) => (
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
      ))
    )
  }

  const filteredTodos = todos.filter((todo) => {
    if (status === "completed") {
      return todo.completed === true;
    }

    if (status === "incomplete") {
      return todo.completed === false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 p-10">

      <h1 className="text-4xl font-bold text-white text-center mb-8">
        My Todo List
      </h1>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mb-6 px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <TodoForm addTask={addTask} />

      <Tasklist
        todos={filteredTodos}
        delTask={delTask}
        editTask={editTask}
        completedTask={completedTask}
      />

    </div>
  );
}

export default App;