import { createContext } from "react";

export const TodoItemsContext = createContext({
  todoItems: [],

  addNewItem: (itemName, itemDueDate, priority) => {},

  deleteItem: (id) => {},

  toggleComplete: (id) => {},

  editItem: (id, newName) => {},
});