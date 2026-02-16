import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-blue-950 text-white flex items-center justify-between px-6 shadow-md">

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Theta-X </h1>
      </div>

      <div className="hidden md:flex items-center bg-slate-500 rounded-lg px-3 py-1 w-80">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm text-white ml-2 w-full"
        />
      </div>

      <div className="flex items-center gap-4">

        <button className="p-2 rounded-lg hover:bg-slate-700">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-700 px-2 py-1 rounded-lg">
          <UserCircle size={26} />
          <span className="hidden md:block">Admin</span>
        </div>

      </div>

    </header>
  );
};

export default Navbar;
