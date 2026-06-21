import { useContext, useState } from "react";
import { TodoItemsContext } from "../store/todo-items-store";

function TodoItem({ id, name, dueDate, completed, priority }) {
  const { deleteItem, toggleComplete, editItem } =
    useContext(TodoItemsContext);

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);

  const isOverdue =
    dueDate && new Date(dueDate) < new Date() && !completed;

  return (
    <div className="task-card">

      <div>

        {editMode ? (
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <h4 style={{ textDecoration: completed ? "line-through" : "" }}>
            {name}
          </h4>
        )}

        <small>
          📅 {dueDate}{" "}
          {isOverdue && (
            <span style={{ color: "red" }}>⚠ Overdue</span>
          )}
        </small>

        <div className={`priority ${priority}`}>
          {priority}
        </div>

      </div>

      <div>

        <button onClick={() => toggleComplete(id)}>✔</button>

        {editMode ? (
          <button
            onClick={() => {
              editItem(id, newName);
              setEditMode(false);
            }}
          >
            Save
          </button>
        ) : (
          <button onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}

        <button onClick={() => deleteItem(id)}>
          Delete
        </button>

      </div>

    </div>
  );
}

export default TodoItem;