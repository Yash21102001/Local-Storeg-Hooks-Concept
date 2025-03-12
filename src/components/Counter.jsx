import React, { use, useEffect, useState } from "react";

function Counter({ theme }) {
  
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count")
    return savedCount ? parseInt(savedCount, 10) : 0
  });

  const [autoIncrement, setAutoIncrement] = useState(() => {
    const savedAutoIncrement = localStorage.getItem("autoIncrement")
    return savedAutoIncrement === "true";
  });

  const [incrementValue, setIncrementValue] = useState(() => {
    const savedIncrementValue = localStorage.getItem("incrementValue")
    return savedIncrementValue ? parseInt(savedIncrementValue, 10) : 1
  });

  //localStorage.setItem
  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem("autoIncrement", autoIncrement.toString())
  }, [autoIncrement]);

  useEffect(() => {
    localStorage.setItem("incrementValue", incrementValue.toString())
  }, [incrementValue]);

  useEffect(() => {
    let interval;
    if (autoIncrement) {
      interval = setInterval(() => setCount((prev) => prev + incrementValue), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [autoIncrement, incrementValue]);

  const handleReset = () => {
    setCount(0);
    setAutoIncrement(false);
  };

  const handleIncrement = () => {
    setCount((prev) => Math.min(prev + incrementValue, 100));
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(prev - incrementValue, 0));
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25px",
    color: theme === "light" ? "#333" : "#f9fafb",
    fontFamily: "'Poppins', sans-serif",
  };

  const cardStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: theme === "light"
      ? "0 4px 8px rgba(0, 0, 0, 0.1)"
      : "0 4px 8px rgba(255, 255, 255, 0.1)",
    border: `1px solid ${theme === "light" ? "#e5e7eb" : "#444"}`,
    textAlign: "center",
    width: "500px",
    transition: "background 0.3s ease, color 0.3s ease",
    color: theme === "light" ? "#333" : "#f9fafb",
  };

  const inputStyle = {
    padding: "15px",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: theme === "light" ? "#f3f4f6" : "#333",
    color: theme === "light" ? "#333" : "#f9fafb",
    border: `1px solid ${theme === "light" ? "#ccc" : "#555"}`,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px -16px",
    width: "100%",
    transition: "background 0.3s ease, color 0.3s ease",
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    transition: "background 0.3s ease",
    border: "none",
  };

  const toggleButtonStyle = {
    ...buttonStyle,
    backgroundColor: autoIncrement ? "#ef4444" : "#10b981",
  };

  const incrementButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4f46e5",
  };

  const decrementButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc2626",
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f59e0b",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "10px", fontSize: "28px", fontWeight: "bold" }}>
          Creative Counter
        </h1>
        <h3 style={{ marginBottom: "20px", fontSize: "16px" }}>Using React Hooks</h3>
        <h1 style={{ ...inputStyle, fontSize: "32px", fontWeight: "bold" }}>{count}</h1>

        <div>
          <label
            htmlFor="increment"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "10px",
              color: theme === "light" ? "#333" : "#f9fafb",
            }}
          >
            Increment Amount
          </label>
          <input
            type="number"
            value={incrementValue}
            onChange={(e) => setIncrementValue(Number(e.target.value))}
            min="1"
            max="100"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            onClick={handleDecrement}
            style={decrementButtonStyle}
          >
            ➖
          </button>
          <button
            onClick={handleIncrement}
            style={incrementButtonStyle}
          >
            ➕
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setAutoIncrement(!autoIncrement)}
            style={toggleButtonStyle}
          >
            {autoIncrement ? "⏹ Stop Auto Increment" : "▶️ Start Auto Increment"}
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleReset}
            style={resetButtonStyle}
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
