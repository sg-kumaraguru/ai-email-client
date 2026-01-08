import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const TopBar = ({ username = "John" }) => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-neutral-200 bg-white shadow-sm">
      {/* Left: hamburger + greeting */}
      <div className="flex items-center gap-4">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-neutral-100 transition"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-neutral-900" />
        </button>

        {/* Greeting */}
        <div className="flex flex-col">
          <span className="text-sm text-neutral-500">Good morning,</span>
          <span className="text-lg font-semibold text-neutral-900">
            {username}
          </span>
        </div>
      </div>

      {/* Center: search input */}
      <div className="hidden md:flex flex-1 justify-center px-4">
        <input
          type="text"
          placeholder="Search emails…"
          className="w-full max-w-md rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
      </div>

      {/* Right: empty for now */}
      <div className="flex items-center gap-4">
        {/* Placeholder for future buttons if needed */}
      </div>
    </header>
  );
};

export default TopBar;
