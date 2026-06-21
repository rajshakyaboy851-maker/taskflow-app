import styles from "./WelcomeMessage.module.css";
import { useContext } from "react";
import { TodoItemsContext } from "../store/todo-items-store";

const WelcomeMessage = () => {
  const { todoItems } = useContext(TodoItemsContext);

  const totalTasks = todoItems.length;
  const completedTasks = todoItems.filter(
    (item) => item.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <>
      {totalTasks === 0 && (
        <p className={styles.welcome}>Enjoy Your Day 😊</p>
      )}

      {totalTasks > 0 && (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <h5>Total Tasks: {totalTasks}</h5>
          <h5>✅ Completed: {completedTasks}</h5>
          <h5>⏳ Pending: {pendingTasks}</h5>
        </div>
      )}
    </>
  );
};

export default WelcomeMessage;