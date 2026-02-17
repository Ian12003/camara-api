import { useEffect, useState } from "react";

const API_ROOT = "YOUR_API_ROOT/status";

const MOCK_STATUS = [
  {
    deviceId: "DEVICE-001",
    status: "USE",
    battery: 42,
    location: "Guwahati",
    lastUpdate: "2026-02-13T10:20:00Z"
  },
  {
    deviceId: "DEVICE-002",
    status: "AVAILABLE",
    battery: 100,
    location: "Guwahati",
    lastUpdate: "2026-02-13T09:45:00Z"
  },
  {
    deviceId: "DEVICE-003",
    status: "OFFLINE",
    battery: 19,
    location: "Guwahati",
    lastUpdate: "2026-02-13T09:10:00Z"
  }
];

const statuses = ["USE", "AVAILABLE", "CHARGING", "OFFLINE", "MAINTENANCE"];

const CurrentStatus = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    setTimeout(() => setDevices(MOCK_STATUS), 400);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Current Status
        </h2>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {statuses.map((status) => (
          <StatusColumn
            key={status}
            title={status}
            devices={devices.filter((d) => d.status === status)}
          />
        ))}
      </div>

    </div>
  );
};

const StatusColumn = ({ title, devices }) => {
  const colorMap = {
    USE: "border-l-emerald-500",
    AVAILABLE: "border-l-blue-500",
    CHARGING: "border-l-amber-500",
    OFFLINE: "border-l-rose-500",
    MAINTENANCE: "border-l-purple-500"
  };

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-3">

      {/* Column header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-semibold tracking-wide text-slate-800">
          {title}
        </h3>
        <span className="text-xs text-slate-800">
          {devices.length}
        </span>
      </div>

      {/* Devices */}
      <div className="space-y-3">
        {devices.map((device) => (
          <div
            key={device.deviceId}
            className={`group border border-slate-400 rounded-lg p-3 hover:border-slate-300 transition ${colorMap[title]} border-l-4`}
          >

            {/* Top row */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-800">
                {device.deviceId}
              </p>

              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                Battery :{device.battery}%
              </span>
            </div>

            {/* Info */}
            <p className="text-xs text-slate-700 mt-1">
              Location :{device.location}
            </p>

            <p className="text-[11px] text-slate-700 mt-2">
              {new Date(device.lastUpdate).toLocaleString()}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CurrentStatus;