import React, { useState, useEffect, useRef } from "react";

function AstronomyApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [objectInfo, setObjectInfo] = useState(
    "The Sun, our closest star, is a giant, hot sphere of plasma and gas at the center of the Solar System. Here are some key facts: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [response, setResponse] = useState("");
  const [videoDevices, setVideoDevices] = useState([]); // State to hold video devices
  const [selectedDeviceId, setSelectedDeviceId] = useState(""); // State for selected device ID
  const videoRef = useRef(null); // Create a ref for the video element

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    sendString(searchQuery);
  };

  const sendString = (inputString) => {
    fetch("http://10.0.0.236:5000/api/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: inputString }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResponse(data.result); // Update state with the response
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to start the camera
  const startCamera = async (deviceId) => {
    try {
      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined, // Use the selected deviceId if available
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Set the video element's source to the camera stream
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  // Use useEffect to list video devices and start the camera
  useEffect(() => {
    const fetchVideoDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoInputs); // Set state with video input devices

      // Automatically select the first device if none is selected
      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    };

    fetchVideoDevices();
  }, [selectedDeviceId]);

  // Effect to start the camera when the selected device changes
  useEffect(() => {
    if (selectedDeviceId) {
      startCamera(selectedDeviceId);
    }
  }, [selectedDeviceId]);

  return (
    <div style={styles.container}>
      <video
        ref={videoRef} // Attach the ref to the video element
        autoPlay
        style={styles.video}
      />
      <div
        style={styles.microphoneIcon}
        onClick={() => console.log("Microphone clicked")}
      >
        {/* Microphone SVG Icon */}
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
      <select
        id="cameraSelect"
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
        style={styles.select}
      >
        {videoDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
          </option>
        ))}
      </select>
      <div style={styles.infoBox}>{objectInfo}</div>
      {response && <div style={styles.responseBox}>{response}</div>}{" "}
      {/* Display the response */}
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
    width: "500px",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative", // Add position relative for absolute positioning
  },
  video: {
    width: "300px",
    height: "auto",
    borderRadius: "10px",
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
  select: {
    position: "absolute", // Position the select box absolutely
    top: "10px", // Adjust as necessary
    right: "10px", // Adjust as necessary
    width: "100px", // Make it small
    fontSize: "12px", // Smaller font size
    padding: "5px", // Less padding for a smaller appearance
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
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
  responseBox: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#d0f0c0",
    borderRadius: "5px",
    textAlign: "center",
  },
};

export default AstronomyApp;
