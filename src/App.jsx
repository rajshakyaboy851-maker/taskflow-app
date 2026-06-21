import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState, useEffect } from "react";
import { TodoItemsContext } from "./store/todo-items-store";

function App() {
  const [todoItems, setTodoItems] = useState(() => {
    const saved = localStorage.getItem("todoItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ADD TASK
  const addNewItem = (name, dueDate, priority = "medium") => {
    const newItem = {
      id: Date.now(),
      name,
      dueDate,
      priority,
      completed: false,
    };

    setTodoItems([...todoItems, newItem]);
  };

  // DELETE
  const deleteItem = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  // COMPLETE
  const toggleComplete = (id) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // EDIT
  const editItem = (id, newName) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  // LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  // SEARCH
  const filteredItems = todoItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // PROGRESS
  const completedTasks = todoItems.filter((i) => i.completed).length;
  const totalTasks = todoItems.length;
  const progress =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <TodoItemsContext.Provider
        value={{
          todoItems: filteredItems,
          addNewItem,
          deleteItem,
          toggleComplete,
          editItem,
        }}
      >
        <div className="todo-container">

          <AppName />

          <button
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          <input
            type="text"
            placeholder="Search Task..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* PROGRESS BAR */}
          <div className="progress-wrapper">
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{Math.round(progress)}% Completed</p>
          </div>

          <AddTodo />
          <WelcomeMessage />
          <TodoItems />
        </div>
      </TodoItemsContext.Provider>
    </div>
  );
}

export default App;