import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.png";

function AstronomyApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [objectInfo, setObjectInfo] = useState("spaceChurro  v1.0 🚀 ");
  const [response, setResponse] = useState("");
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef(null);

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    sendString(searchQuery);
    setObjectInfo(`spaceChurro  v1.0 🚀 is looking at ${searchQuery}`);
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
        setResponse(data.result);
      })
      .catch((error) => console.error("Error:", error));
  };

  const startCamera = async (deviceId) => {
    try {
      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  useEffect(() => {
    const fetchVideoDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoInputs);

      if (videoInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoInputs[1].deviceId);
      }
    };

    fetchVideoDevices();
  }, [selectedDeviceId]);

  useEffect(() => {
    if (selectedDeviceId) {
      startCamera(selectedDeviceId);
    }
  }, [selectedDeviceId]);

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <video ref={videoRef} autoPlay style={styles.video} />
      <div
        style={styles.microphoneIcon}
        onClick={() => console.log("Microphone clicked")}
      ></div>
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
    marginTop: "50px",
    borderRadius: "10px",
    paddingTop: "100px",
    width: "700px",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    height: "500px",
  },
  logo: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "105px",
    height: "auto",
    zIndex: 10,
  },
  video: {
    width: "400px",
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
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "100px",
    fontSize: "12px",
    padding: "5px",
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
