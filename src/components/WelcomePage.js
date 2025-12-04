import React, { useState } from "react";

export default function WelcomePage({ onJoin }) {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    onJoin(name.trim());
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Paoyao!</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            fontSize: "16px"
          }}
        />
      </div>

      <button
        onClick={handleJoin}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Join Game
      </button>
    </div>
  );
}