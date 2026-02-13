import { useEffect, useState } from "react";

const API_ROOT = "YOUR_API_ROOT/status";

const MOCK_STATUS = [
  {
    deviceId: "DEVICE-001",
    status: "USE",
    battery: 82,
    location: "Berlin",
    lastUpdate: "2026-02-13T10:20:00Z"
  },
  {
    deviceId: "DEVICE-002",
    status: "AVAILABLE",
    battery: 55,
    location: "Munich",
    lastUpdate: "2026-02-13T09:45:00Z"
  },
  {
    deviceId: "DEVICE-003",
    status: "CHARGING",
    battery: 34,
    location: "Hamburg",
    lastUpdate: "2026-02-13T09:10:00Z"
  },
  {
    deviceId: "DEVICE-004",
    status: "OFFLINE",
    battery: 0,
    location: "Unknown",
    lastUpdate: "2026-02-13T08:30:00Z"
  }
];

const statuses = ["USE", "AVAILABLE", "CHARGING", "OFFLINE", "MAINTENANCE"];

const CurrentStatus = () => {

  const [devices, setDevices] = useState([]);

  const callApi = async (endpoint) => {
    console.log("Future API", `${API_ROOT}/${endpoint}`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_STATUS), 400);
    });
  };

  useEffect(() => {
    callApi("current-status").then(setDevices);
  }, []);

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        Current Status
      </h2>

      <div className="grid grid-cols-5 gap-4">

        {statuses.map((status) => (
          <StatusColumn
            key={status}
            title={status}
            devices={devices.filter(c => c.status === status)}
          />
        ))}

      </div>

    </div>
  );
};

const StatusColumn = ({ title, devices }) => {

  const colorMap = {
    USE: "border-green-500",
    AVAILABLE: "border-blue-500",
    CHARGING: "border-yellow-500",
    OFFLINE: "border-red-500",
    MAINTENANCE: "border-purple-500"
  };

  return (
    <div className="bg-slate-100 rounded-lg p-3">

      <h3 className="font-semibold mb-3 flex justify-between">
        {title}
        <span className="text-sm text-gray-500">
          {devices.length}
        </span>
      </h3>

      <div className="flex flex-col gap-3">

        {devices.map((device) => (
          <div
            key={device.deviceId}
            className={`bg-white p-4 rounded-lg shadow border-l-4 ${colorMap[title]}`}
          >
            <h4 className="font-semibold">
              {device.deviceId}
            </h4>

            <p className="text-sm mt-1">
               Battery Level: {device.battery}%
            </p>

            <p className="text-sm">
              Location: {device.location}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(device.lastUpdate).toLocaleString()}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CurrentStatus;
