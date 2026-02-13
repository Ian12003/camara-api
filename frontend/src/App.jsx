import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CurrentLocation from "./components/CurrentLocation";
import CurrentStatus from "./components/CurrentStatus";
import BatteryInfo from "./components/BatteryInfo";
import NetworkBandwidth from "./components/NetworkBandwidth";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} />

      <main className="flex-1 bg-slate-50 p-6 overflow-auto">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "location" && <CurrentLocation />}
        {activePage === "status" && <CurrentStatus />}
        {activePage === "battery" && <BatteryInfo />}
        {activePage === "network" && <NetworkBandwidth />}
      </main>
    </div>
  );
}

export default App;
