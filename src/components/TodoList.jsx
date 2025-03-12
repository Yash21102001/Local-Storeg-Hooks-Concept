import { useEffect, useState } from "react";

function ToDoList({ theme }) {
  const [task, setTask] = useState(() => {
    const savedtask = localStorage.getItem("task");
    return savedtask ? savedtask : "";
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 📦 Persist task to local storage
  useEffect(() => {
    localStorage.setItem("task", task);
  }, [task]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const isLightTheme = theme === "light";

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: isLightTheme ? "#f9fafb" : "#121212",
      padding: "16px",
      transition: "background 0.3s ease",
    },
    wrapper: {
      backgroundColor: isLightTheme ? "#fff" : "#1e1e1e",
      color: isLightTheme ? "#333" : "#f9fafb",
      boxShadow: isLightTheme
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: "24px",
      width: "100%",
      maxWidth: "450px",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "16px",
    },
    inputContainer: {
      display: "flex",
      gap: "8px",
      marginBottom: "16px",
    },
    input: {
      flex: 1,
      backgroundColor: isLightTheme ? "#f3f4f6" : "#333",
      color: isLightTheme ? "#333" : "#fff",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      outline: "none",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    button: {
      backgroundColor: isLightTheme ? "#4f46e5" : "#3b82f6",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s ease",
      fontWeight: "bold",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: `1px solid ${isLightTheme ? "#e5e7eb" : "#444"}`,
      borderRadius: "6px",
      marginBottom: "8px",
      backgroundColor: isLightTheme ? "#f9fafb" : "#2d2d2d",
      color: isLightTheme ? "#333" : "#f9fafb",
      transition: "background 0.3s ease",
    },
    completedTask: {
      textDecoration: "line-through",
      color: isLightTheme ? "#6b7280" : "#bbb",
    },
    actionButton: {
      fontSize: "14px",
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s ease",
      fontWeight: "bold",
    },
    toggleButton: {
      backgroundColor: isLightTheme ? "#10b981" : "#22c55e",
      color: "#fff",
    },
    deleteButton: {
      backgroundColor: isLightTheme ? "#ef4444" : "#dc2626",
      color: "#fff",
    },
  };

  const handleTaskAction = (action, index) => {
    if (action === "add" && task.trim() !== "") {
      setTasks([...tasks, { task, completed: false }]);
      setTask("");
    } else if (action === "toggle") {
      setTasks(
        tasks.map((t, i) =>
          i === index ? { ...t, completed: !t.completed } : t
        )
      );
    } else if (action === "delete") {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  // ⏩ Add task on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTaskAction("add");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>To-Do List</h2>

        <div style={styles.inputContainer}>
          <input
            type="text"
            style={styles.input}
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyPress} // 🔥 Added Key Press Event
          />
          <button
            style={styles.button}
            onClick={() => handleTaskAction("add")}
          >
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((t, index) => (
            <li key={index} style={styles.listItem}>
              <span style={t.completed ? styles.completedTask : {}}>
                {t.task}
              </span>
              <div>
                <button
                  style={{ ...styles.actionButton, ...styles.toggleButton }}
                  onClick={() => handleTaskAction("toggle", index)}
                >
                  {t.completed ? "❌ Undo" : "✔ Done"}
                </button>
                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.deleteButton,
                    marginLeft: "8px",
                  }}
                  onClick={() => handleTaskAction("delete", index)}
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
