import { useEffect, useState } from "react";

const API_ROOT = "YOUR_API_ROOT/status";

const MOCK_STATUS = [
  {
    deviceId: "DEVICE-001",
    status: "USE",
    battery: 42,
    location: "Guwahati",
    lastUpdate: "2026-02-16T10:20:00Z",
  },
  {
    deviceId: "DEVICE-002",
    status: "AVAILABLE",
    battery: 100,
    location: "Guwahati",
    lastUpdate: "2026-02-14T09:45:00Z",
  },
  {
    deviceId: "DEVICE-003",
    status: "OFFLINE",
    battery: 19,
    location: "Guwahati",
    lastUpdate: "2026-02-15T09:10:00Z",
  },
  {
    deviceId: "DEVICE-004",
    status: "CHARGING",
    battery: 67,
    location: "Delhi",
    lastUpdate: "2026-02-17T10:05:00Z",
  },
  {
    deviceId: "DEVICE-005",
    status: "USE",
    battery: 88,
    location: "Mumbai",
    lastUpdate: "2026-02-13T10:12:00Z",
  },
  {
    deviceId: "DEVICE-006",
    status: "AVAILABLE",
    battery: 55,
    location: "Bangalore",
    lastUpdate: "2026-02-12T09:50:00Z",
  },
  {
    deviceId: "DEVICE-007",
    status: "OFFLINE",
    battery: 5,
    location: "Hyderabad",
    lastUpdate: "2026-02-14T08:40:00Z",
  },
  {
    deviceId: "DEVICE-008",
    status: "MAINTENANCE",
    battery: 0,
    location: "Service Center",
    lastUpdate: "2026-02-15T07:20:00Z",
  },
  {
    deviceId: "DEVICE-009",
    status: "CHARGING",
    battery: 32,
    location: "Kolkata",
    lastUpdate: "2026-02-16T09:30:00Z",
  },
  {
    deviceId: "DEVICE-010",
    status: "USE",
    battery: 76,
    location: "Chennai",
    lastUpdate: "2026-02-17T10:01:00Z",
  },
];


const statuses = ["USE", "AVAILABLE", "CHARGING", "OFFLINE", "MAINTENANCE"];

const CurrentStatus = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    setTimeout(() => setDevices(MOCK_STATUS), 400);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Device Status
        </h2>
      </div>

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
    MAINTENANCE: "border-l-purple-500",
  };

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-3">

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-semibold tracking-wide text-slate-800">
          {title}
        </h3>

        <span className="text-xs text-slate-700">
          {devices.length}
        </span>
      </div>

      {/* Devices */}
      <div className="space-y-3">

        {devices.map((device) => (
          <div
            key={device.deviceId}
            className={`border border-slate-300 rounded-lg p-3 bg-white border-l-4 ${colorMap[title]}`}
          >

            {/* Top Row */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-slate-800">
                {device.deviceId}
              </p>

              <StatusBadge status={device.status} />
            </div>

            {/* Battery */}
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Battery</span>
                <span>{device.battery}%</span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    device.battery > 60
                      ? "bg-green-500"
                      : device.battery > 30
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${device.battery}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2">
               {device.location}
            </p>

            <p className="text-[11px] text-slate-500 mt-1">
              Seen {timeAgo(device.lastUpdate)}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
};


const StatusBadge = ({ status }) => {
  const map = {
    USE: "bg-green-100 text-green-700",
    AVAILABLE: "bg-blue-100 text-blue-700",
    CHARGING: "bg-yellow-100 text-yellow-700",
    OFFLINE: "bg-red-100 text-red-700",
    MAINTENANCE: "bg-purple-100 text-purple-700",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${map[status]}`}>
      {status}
    </span>
  );
};

const timeAgo = (date) => {
  const diffMinutes = Math.floor(
    (Date.now() - new Date(date)) / 60000
  );

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  return `${Math.floor(diffMinutes / 60)}h ago`;
};

export default CurrentStatus;
