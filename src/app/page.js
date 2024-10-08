"use client";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const mainStyles = {
  background: "rgb(0,0,0,0.1)",
  height: "100vh",
  width: "100vw",
  display: "grid",
  placeItems: "center",
};

const boxStyles = {
  width: "30%",
  height: "20%",
  background: "white",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  borderRadius: "18px",
  alignItems: "center",
  boxShadow: "1px 1px 2px 1px rgb(0,0,0,0.1)",
  justifyContent: "center",
};

const heading = {
  fontSize: "41px",
  fontWeight: "600",
  textAlign: "center",
  letterSpacing: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
  gap: "10px",
};

export default function Home() {
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    window.electron?.onDeviceId((id) => {
      console.log("Received device ID:", id); // Debugging log
      setDeviceId(id);
    });
  }, []);

  return (
    <main style={mainStyles}>
      <div style={boxStyles}>
        <div style={heading}>
          <FaCheckCircle size={35} color="green" /> Thank you
        </div>
        {deviceId && (
          <p>
            Your Device ID: <strong>{deviceId}</strong>
          </p>
        )}
      </div>
    </main>
  );
}
