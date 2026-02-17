import React, { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  MapPin,
  Activity,
  BatteryCharging,
  Wifi,
} from "lucide-react";

const Sidebar = ({ setActivePage, activePage }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Overview", key: "dashboard", icon: LayoutDashboard },
    { name: "Current Location", key: "location", icon: MapPin },
    { name: "Device Status", key: "status", icon: Activity },
    { name: "Battery Information", key: "battery", icon: BatteryCharging },
    { name: "Network Bandwidth", key: "network", icon: Wifi },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-slate-900 border-r border-slate-800 text-slate-300 h-screen flex flex-col transition-all duration-300`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
        {!collapsed && (
          <div onClick={()=>setActivePage("dashboard")} className="cursor-pointer" >
            <h2 className="text-white text-lg font-semibold">Theta-X</h2>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Monitoring Dashboard
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;

          return (
            <div
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
              
              ${
                isActive
                  ? "bg-slate-800 text-white shadow-sm"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={`${
                  isActive
                    ? "text-indigo-400"
                    : "text-slate-400 group-hover:text-white"
                }`}
              />

              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </div>
          );
        })}
      </nav>

      
    </aside>
  );
};

export default Sidebar;