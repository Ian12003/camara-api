import React from "react";

const Sidebar = ({ setActivePage }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white px-5 py-6">
      <h2 className="text-xl mb-1">Theta-X</h2>
      <p className="text-sm text-slate-400 mb-7">Telecom verification tools</p>

      <div className="text-xs uppercase text-slate-500 mb-3">Tools</div>

      <nav className="flex flex-col gap-2">
        <div
          onClick={() => setActivePage("device")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          Device Identification
        </div>

        <div
          onClick={() => setActivePage("location")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          Location Verification
        </div>

        <div
          onClick={() => setActivePage("sim")}
          className="px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
        >
          SIM Swap
        </div>
        <div className="flex items-center gap-2 px-3 py-3 rounded-lg cursor-pointer text-gray-200 hover:bg-slate-800 transition">
          <span>QOD</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
