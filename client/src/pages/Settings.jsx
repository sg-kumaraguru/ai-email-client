import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Mail,
  Pencil,
  Save,
  Lock,
  LogOut,
  Trash2,
  MailCheck,
  ArrowLeft,
} from "lucide-react";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <NavLink
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </NavLink>

        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Account Settings
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your profile and connected services
          </p>
        </div>
      </header>

      {/* Profile */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-neutral-800">Profile</h2>

          <button
            onClick={() => setIsEditing((v) => !v)}
            className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
          >
            {isEditing ? <Save size={16} /> : <Pencil size={16} />}
            {isEditing ? "Save changes" : "Edit profile"}
          </button>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-4 space-y-4">
          {/* Name */}
          <div className="flex items-start gap-3">
            <User size={18} className="text-neutral-500 mt-1" />
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Name</p>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              ) : (
                <p className="text-sm text-neutral-900">John Doe</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-neutral-500 mt-1" />
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              ) : (
                <p className="text-sm text-neutral-900">
                  john@example.com
                </p>
              )}
            </div>
          </div>

          <NavLink
            to="/change-password"
            className="inline-flex items-center gap-2 text-sm text-neutral-700 underline hover:text-neutral-900"
          >
            <Lock size={14} />
            Change password
          </NavLink>
        </div>
      </section>

      {/* Gmail connection */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-neutral-800">
          Connected Accounts
        </h2>

        <div className="rounded-lg border border-neutral-200 bg-white p-4 space-y-4">
          <p className="text-sm text-neutral-600">
            Connect your Gmail account to fetch and organize your emails.
            Mailwise will request permission only to read and process your mail.
          </p>

          <NavLink
            to="/connect-gmail"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 text-neutral-50 text-sm hover:bg-neutral-800 transition"
          >
            <MailCheck size={16} />
            Connect Gmail
          </NavLink>
        </div>
      </section>

      {/* Danger zone */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-neutral-800">
          Danger zone
        </h2>

        <div className="rounded-lg border border-red-200 bg-white p-4 space-y-2">
          <NavLink
            to="/logout"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-neutral-900 hover:bg-neutral-100 transition"
          >
            <LogOut size={16} />
            Log out
          </NavLink>

          <NavLink
            to="/delete-account"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition"
          >
            <Trash2 size={16} />
            Delete account
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Settings;
