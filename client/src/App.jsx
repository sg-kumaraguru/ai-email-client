import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [message, setMessage] = useState("Loading..");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.data))
      .catch((err) => {
        console.error(err);
        setMessage("Error connecting to server ");
      });
  }, []);

  let Home = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">
          React - FastAPI test
        </h1>
        <p className="text-xl italic">{message}</p>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
