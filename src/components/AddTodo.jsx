import { useState, useContext } from "react";
import { TodoItemsContext } from "../store/todo-items-store";

function AddTodo() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const { addNewItem } = useContext(TodoItemsContext);

  const handleAdd = () => {
    if (!name || !date) return;

    addNewItem(name, date, priority);

    setName("");
    setDate("");
    setPriority("medium");
  };

  return (
    <div className="row kg-row">

      <input
        type="text"
        placeholder="Task"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTodo;