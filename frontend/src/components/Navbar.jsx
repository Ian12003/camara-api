import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-blue-950 text-white flex items-center justify-between px-6 shadow-md">

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Theta-X </h1>
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
