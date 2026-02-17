import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg">
          <Search size={16} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
          <Bell size={20} className="text-slate-600" />
        </button>

        {/* USER */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-2 py-1.5 rounded-lg transition">
          <UserCircle size={28} className="text-slate-600" />
          <span className="hidden md:block text-sm font-medium text-slate-700">
            Admin
          </span>
        </div>

      </div>
    </header>
  );
};

export default Navbar;