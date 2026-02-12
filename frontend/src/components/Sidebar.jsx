import React from "react";

const Sidebar = () => {
  return (
    <div className="flex h-screen font-sans">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-slate-900 text-white px-5 py-6">
        <h2 className="text-xl mb-1">Network APIs</h2>
        <p className="text-sm text-slate-400 mb-7">
          Telecom verification tools
        </p>

        <div className="text-xs uppercase text-slate-500 mb-3">
          Tools
        </div>

        <nav className="flex flex-col gap-2">
          
          <div className="flex items-center gap-2 px-3 py-3 rounded-lg cursor-pointer text-gray-200 hover:bg-slate-800 transition">
            <span>Device Identification</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-3 rounded-lg cursor-pointer text-gray-200 hover:bg-slate-800 transition">
            <span>Location Verification</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-3 rounded-lg cursor-pointer bg-slate-800 text-white">
            <span>SIM Swap</span>
          </div>

          <div className="flex items-center px-3 py-3 gap-2 rounded-lg cursor-pointer text-white bg-">
            <span>QOD</span>
          </div>

        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-slate-50"></main>
    </div>
  );
};

export default Sidebar;