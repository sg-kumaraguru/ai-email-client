import React from "react";
import { NavLink } from "react-router-dom";
import {
  Inbox,
  Briefcase,
  FileText,
  GraduationCap,
  Shield,
  MoreHorizontal,
  Settings,
} from "lucide-react";

const items = [
  { label: "All", to: "/inbox", icon: Inbox },
  { label: "Placements", to: "/placements", icon: Briefcase },
  { label: "Examination", to: "/exams", icon: FileText },
  { label: "Scholarship", to: "/scholarships", icon: GraduationCap },
  { label: "Admin", to: "/admin", icon: Shield },
  { label: "Other", to: "/other", icon: MoreHorizontal },
];

const SideBar = () => {
  return (
    <aside className="w-64 h-full border-r border-neutral-200 bg-white flex flex-col">
      {/* Main links (scrollable) */}
      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-neutral-100 text-neutral-950 font-medium"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-neutral-200" />

      {/* Settings (always visible) */}
      <div className="p-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
            ${
              isActive
                ? "bg-neutral-100 text-neutral-950 font-medium"
                : "text-neutral-700 hover:bg-neutral-100"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default SideBar;
