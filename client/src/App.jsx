import React from "react";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-500">React - FastAPI test</h1>
      <p className="text-xl italic">{message}</p>
    </div>
  );
};

export default App;
