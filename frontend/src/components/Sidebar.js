import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="title">Network APIs</h2>
        <p className="subtitle">Telecom verification tools</p>

        <div className="tools-label">Tools</div>

        <nav className="menu">
          <div className="menu-item">
             <span>Device Identification</span>
          </div>

          <div className="menu-item">
             <span>Location Verification</span>
          </div>

          <div className="menu-item active">
             <span>SIM Swap</span>
          </div>
        </nav>
      </aside>

      <main className="content"></main>
    </div>
  );
};

export default Sidebar;
