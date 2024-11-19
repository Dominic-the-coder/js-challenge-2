import React, { useState } from "react";

// Test data - Do not modify
const items = [
  { id: 1, name: "Milk" },
  { id: 2, name: "Bread" },
  { id: 3, name: "Eggs" },
  { id: 4, name: "Butter" },
  { id: 5, name: "Cheese" },
];

function App() {
  const [list, setList] = useState(items);

  const toggleItem = (id) => {
    const updatedItems = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          purchased: !item.purchased,
        };
      }
      return item;
    });

    setList(updatedItems);
  };

  const clearAllItems = () => {
    if (list.length > 0) {
      const updatedItems = list.map((item) => ({
        ...item,
        purchased: false,
      }));
      setList(updatedItems);
    } else {
      console.log("No items to clear.");
    }
  };

  const checkAllItems = () => {
    if (list.length > 0) {
      const updatedItems = list.map((item) => ({
        ...item,
        purchased: true,
      }));
      setList(updatedItems);
    } else {
      console.log("No items to check.");
    }
  };

  const totalItems = list.length;
  const purchasedItems = list.filter((item) => item.purchased).length;
  const remainingItems = totalItems - purchasedItems;

  return (
    <div className="container mt-3">
      <h1 className="mb-4 fw-bold">Grocery List</h1>

      <div className="d-flex justify-content-between mb-4">
        <StatCard label="Total Items" value={totalItems} color="primary" />
        <StatCard label="Purchased" value={purchasedItems} color="success" />
        <StatCard label="Remaining" value={remainingItems} color="warning" />
      </div>

      <div className="card rounded border shadow-sm px-5">
        <ul className="p-0">
          {list.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </ul>
      </div>

      <div className="d-flex justify-content-around mt-3">
        <ActionButton
          label="Clear All"
          onClick={clearAllItems}
          color="danger"
        />
        <ActionButton
          label="Check All"
          onClick={checkAllItems}
          color="success"
        />
      </div>
    </div>
  );
}

function ListItem({ item, onToggle }) {
  return (
    <li className="d-flex justify-content-between align-items-center p-3">
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Checkbox to toggle purchased status */}
        <input
          type="checkbox"
          checked={item.purchased || false}
          onChange={onToggle}
          style={{ marginRight: "10px" }}
        />
        {/* Item name with strike-through if purchased */}
        <span
          style={{
            textDecoration: item.purchased ? "line-through" : "none",
          }}
        >
          {item.name}
        </span>
      </div>
      {/* Badge for purchased status */}
      <span
        style={{
          padding: "5px 10px",
          borderRadius: "10px",
          backgroundColor: item.purchased ? "#28a745" : "#ffc107",
          color: "#fff",
          fontSize: "12px",
        }}
      >
        {item.purchased ? "Purchased" : "To Buy"}
      </span>
    </li>
  );
}

// Component for displaying a stat card
function StatCard({ label, value, color }) {
  return (
    <div
      className={
        "card rounded border shadow-sm px-5 py-2 text-center text-" +
        color +
        " bg-" +
        color +
        "-subtle"
      }
    >
      <h5>{label}</h5>
      <h5>{value}</h5>
    </div>
  );
}

// Component for action buttons
function ActionButton({ label, onClick, color }) {
  return (
    <button
      className={
        "px-5 py-2 rounded border text-" + color + " bg-" + color + "-subtle"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default App;
