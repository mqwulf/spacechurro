import React, { useState } from "react";

function AstronomyApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [objectInfo, setObjectInfo] = useState(
    "The Sun, our closest star, is a giant, hot sphere of plasma and gas at the center of the Solar System. Here are some key facts: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div style={styles.container}>
      <img src="" alt="Astronomical Object" style={styles.image} />
      <div
        style={styles.microphoneIcon}
        onClick={() => console.log("Microphone clicked")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-microphone"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
          <path d="M5 10a7 7 0 0 0 14 0" />
          <path d="M8 21l8 0" />
          <path d="M12 17l0 4" />
        </svg>
      </div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search an object..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          Find
        </button>
      </div>
      <div style={styles.infoBox}>{objectInfo}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  microphoneIcon: {
    fontSize: "24px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px 0 0 4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  searchButton: {
    padding: "8px 12px",
    fontSize: "16px",
    borderRadius: "0 4px 4px 0",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#fff",
  },
  infoBox: {
    backgroundColor: "#e0e0e0",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#333",
    fontSize: "14px",
  },
};

export default AstronomyApp;
