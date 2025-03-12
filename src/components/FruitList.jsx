import React, { useState, useRef, useEffect } from "react";

function FruitList({ theme }) {
  const [fruits, setFruits] = useState(() => {
    const savedFruits = localStorage.getItem("fruits");
    return savedFruits ? JSON.parse(savedFruits)
      : [
        { id: 1, name: "Apple", color: "red", quantity: 5 },
        { id: 2, name: "Banana", color: "yellow", quantity: 10 },
        { id: 3, name: "Cherry", color: "red", quantity: 15 },
        { id: 4, name: "Date", color: "brown", quantity: 20 },
        { id: 5, name: "Fig", color: "brown", quantity: 25 },
      ]
  });

  const [newFruit, setNewFruit] = useState({
    name: "",
    color: "",
    quantity: 1,
  });

  useEffect(() => {
    localStorage.setItem("fruits" , JSON.stringify(fruits));
  },[fruits])

  const newfruitRef = useRef(null);
  const isLightTheme = theme === "light";

  const containerStyle = {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: isLightTheme ? "#f9f9f9" : "#333",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: isLightTheme ? "#333" : "#fff",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  };

  const thTdStyle = {
    border: `1px solid ${isLightTheme ? "#ddd" : "#555"}`,
    padding: "12px",
    textAlign: "left",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: isLightTheme ? "#007bff" : "#0056b3",
    color: "#fff",
    margin: "5px",
  };

  const inputStyle = {
    width: "98%",
    padding: "10px",
    margin: "10px 0",
    border: `1px solid ${isLightTheme ? "#ddd" : "#555"}`,
    borderRadius: "5px",
    backgroundColor: isLightTheme ? "#fff" : "#444",
    color: isLightTheme ? "#333" : "#fff",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFruit({
      ...newFruit,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const addFruit = (e) => {
    e.preventDefault();
    if (!newFruit.name || !newFruit.color) return;

    const newId =
      fruits.length > 0 ? Math.max(...fruits.map((f) => f.id)) + 1 : 1;

    setFruits([...fruits, { ...newFruit, id: newId }]);
    setNewFruit({ name: "", color: "", quantity: 1 });

    newfruitRef.current.focus();
  };

  const deleteFruit = (id) => {
    setFruits(fruits.filter((f) => f.id !== id));
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Fruit List</h1>

      {/* Form Section */}
      <form
        onSubmit={addFruit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Fruit Name"
          ref={newfruitRef}
          value={newFruit.name}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={newFruit.color}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          min={1}
          value={newFruit.quantity}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
          Add Fruit
        </button>
      </form>

      {/* Table Section */}
      {fruits.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Color</th>
              <th style={thTdStyle}>Quantity</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fruits.map((fruit) => (
              <tr key={fruit.id}>
                <td style={thTdStyle}>{fruit.name}</td>
                <td style={thTdStyle}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      backgroundColor: fruit.color,
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  ></span>
                  {fruit.color}
                </td>
                <td style={thTdStyle}>{fruit.quantity}</td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => deleteFruit(fruit.id)}
                    style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No Fruits in the List</h3>
      )}
    </div>
  );
}

export default FruitList;
