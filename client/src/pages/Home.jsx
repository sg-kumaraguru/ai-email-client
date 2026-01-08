import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-semibold tracking-tight">
          Mailwise
        </NavLink>

        <NavLink
          to="/login"
          className="text-base font-medium px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
        >
          Login
        </NavLink>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 min-h-[85vh] grid md:grid-cols-2 items-center gap-12">
        {/* Text */}
        <div className="space-y-6">
          <h1 className="text-gray-950 text-4xl md:text-5xl font-bold leading-tight">
            Email, but smarter.
            <br />
            Let AI do the boring parts.
          </h1>

          <p className="text-gray-600 text-lg max-w-md">
            Mailwise helps you read faster and never miss what
            matters. Less inbox chaos. More clarity.
          </p>

          <NavLink
            to="/register"
            className="inline-block bg-gray-950 text-gray-50 px-6 py-3 rounded-md shadow hover:bg-gray-800 transition"
          >
            Get started
          </NavLink>
        </div>

        {/* Visual placeholder */}
        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-md h-80 rounded-xl bg-gradient-to-br from-gray-200 to-gray-100 shadow-inner" />
        </div>
      </main>
    </div>
  );
};

export default Home;
