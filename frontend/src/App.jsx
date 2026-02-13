import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DeviceVerification from "./components/DeviceVerification";
import LocationVerification from "./components/LocationVerification";
import SimSwap from "./components/SimSwap";

function App() {
  const [activePage, setActivePage] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} />

      <main className="flex-1 bg-slate-50 p-8">
        {activePage === "device" && <DeviceVerification />}
        {activePage === "location" && <LocationVerification />}
        {activePage === "sim" && <SimSwap />}

        {!activePage && (
          <p className="text-gray-500 text-center mt-20">
            Select a tool from the sidebar
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
