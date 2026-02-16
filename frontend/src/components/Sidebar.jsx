import React, { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  MapPin,
  Activity,
  BatteryCharging,
  Wifi,
} from "lucide-react";

const Sidebar = ({ setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Overview", key: "dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Current Location", key: "location", icon: <MapPin size={18} /> },
    { name: "Current Status", key: "status", icon: <Activity size={18} /> },
    { name: "Battery Information", key: "battery", icon: <BatteryCharging size={18} /> },
    { name: "Network Bandwidth", key: "network", icon: <Wifi size={18} /> },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-slate-900 text-white px-4 py-6 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <div>
            <h2 className="text-xl">Theta-X</h2>
            <p className="text-xs uppercase text-slate-500">
              Monitoring Dashboard
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer hover:bg-slate-800"
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
