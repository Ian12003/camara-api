import React from "react";

const Sidebar = ({ setActivePage }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white px-5 py-6">

      <h2 className="text-xl mb-1">Theta-X</h2>

      <div className="text-xs uppercase text-slate-500 mb-3">
       Monitoring Dashboard
      </div>

      <nav className="flex flex-col gap-2">

        <div
          onClick={() => setActivePage("dashboard")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          Overview
        </div>

        <div
          onClick={() => setActivePage("location")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          Current Location
        </div>

        <div
          onClick={() => setActivePage("status")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          Current Status
        </div>

        <div
          onClick={() => setActivePage("battery")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          Battery Information
        </div>

        <div
          onClick={() => setActivePage("network")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          Network Bandwidth
        </div>

      </nav>

    </aside>
  );
};

export default Sidebar;
