import { useEffect, useState } from "react";

const MOCK_DEVICES = [
  {
    deviceId: "DEVICE-001",
    msisdn: "+491701234567",
    deviceType: "CAR",
    batteryLevel: 42,
    chargingState: "DISCHARGING",
    priority: "HIGH",
    lastBatteryUpdate: "2026-02-16T10:28:00Z",
  },
  {
    deviceId: "DEVICE-002",
    msisdn: "+491709876543",
    deviceType: "SCOOTER",
    batteryLevel: 100,
    chargingState: "FULL",
    priority: "LOW",
    lastBatteryUpdate: "2026-02-16T10:20:00Z",
  },
  {
    deviceId: "DEVICE-003",
    msisdn: "+491700001111",
    deviceType: "SENSOR",
    batteryLevel: 19,
    chargingState: "CHARGING",
    priority: "MEDIUM",
    lastBatteryUpdate: "2026-02-16T10:12:00Z",
  },

  {
    deviceId: "DEVICE-004",
    msisdn: "+491701122334",
    deviceType: "CAR",
    batteryLevel: 76,
    chargingState: "DISCHARGING",
    priority: "LOW",
    lastBatteryUpdate: "2026-02-16T10:05:00Z",
  },
  {
    deviceId: "DEVICE-005",
    msisdn: "+491702223344",
    deviceType: "SCOOTER",
    batteryLevel: 58,
    chargingState: "CHARGING",
    priority: "MEDIUM",
    lastBatteryUpdate: "2026-02-16T09:58:00Z",
  },
  {
    deviceId: "DEVICE-006",
    msisdn: "+491703334455",
    deviceType: "CAR",
    batteryLevel: 15,
    chargingState: "DISCHARGING",
    priority: "HIGH",
    lastBatteryUpdate: "2026-02-16T09:50:00Z",
  },
  {
    deviceId: "DEVICE-007",
    msisdn: "+491704445566",
    deviceType: "SENSOR",
    batteryLevel: 90,
    chargingState: "FULL",
    priority: "LOW",
    lastBatteryUpdate: "2026-02-16T09:42:00Z",
  },
  {
    deviceId: "DEVICE-008",
    msisdn: "+491705556677",
    deviceType: "CAR",
    batteryLevel: 33,
    chargingState: "DISCHARGING",
    priority: "MEDIUM",
    lastBatteryUpdate: "2026-02-17T09:30:00Z",
  },
  {
    deviceId: "DEVICE-009",
    msisdn: "+491706667788",
    deviceType: "SCOOTER",
    batteryLevel: 67,
    chargingState: "CHARGING",
    priority: "LOW",
    lastBatteryUpdate: "2026-02-16T09:22:00Z",
  },
  {
    deviceId: "DEVICE-010",
    msisdn: "+491707778899",
    deviceType: "SENSOR",
    batteryLevel: 8,
    chargingState: "DISCHARGING",
    priority: "HIGH",
    lastBatteryUpdate: "2026-02-16T09:10:00Z",
  },
];


const BatteryInfo = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [healthFilter, setHealthFilter] = useState("ALL");
  const [chargeFilter, setChargeFilter] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDevices(MOCK_DEVICES);
      setLoading(false);
    }, 600);
  }, []);

  const getHealth = (level) => {
    if (level > 60) return "GOOD";
    if (level > 30) return "LOW";
    return "CRITICAL";
  };

  const filteredDevices = devices.filter((device) => {
    const healthMatch =
      healthFilter === "ALL" || getHealth(device.batteryLevel) === healthFilter;

    const chargeMatch =
      chargeFilter === "ALL" || device.chargingState === chargeFilter;

    return healthMatch && chargeMatch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <h2 className="text-xl font-semibold text-slate-800">
        Device Battery Monitoring
      </h2>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard
          title="Critical Devices"
          value={devices.filter((d) => d.batteryLevel < 20).length}
          color="text-rose-600"
          note="Battery below 20%"
        />

        <StatCard
          title="Low & Not Charging"
          value={
            devices.filter(
              (d) => d.batteryLevel < 30 && d.chargingState === "DISCHARGING",
            ).length
          }
          color="text-amber-600"
          note="Needs attention"
        />

        <StatCard
          title="Healthy Devices"
          value={devices.filter((d) => d.batteryLevel > 60).length}
          color="text-emerald-600"
          note="Battery above 60%"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Select
          value={healthFilter}
          onChange={setHealthFilter}
          options={["ALL", "GOOD", "LOW", "CRITICAL"]}
        />

        <Select
          value={chargeFilter}
          onChange={setChargeFilter}
          options={["ALL", "CHARGING", "DISCHARGING", "FULL"]}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 text-sm font-medium text-slate-700">
          Device Battery Details
        </div>

        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading battery data...</p>
        ) : (
          <table className="w-full text-sm table-auto">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Device</th>
                <th className="px-4 py-3 text-left">MSISDN</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left w-52">Battery</th>
                <th className="px-4 py-3 text-left">Health</th>
                <th className="px-4 py-3 text-left">Charging</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Last Seen</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredDevices.map((device) => {
                const hoursRemaining = Math.max(
                  Math.round(device.batteryLevel / 15),
                  0,
                );

                const risk =
                  device.batteryLevel < 20 &&
                  device.chargingState !== "CHARGING";

                return (
                  <tr
                    key={device.deviceId}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-4 font-medium text-slate-800 whitespace-nowrap">
                      {device.deviceId}
                    </td>

                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {device.msisdn}
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-600">
                        {device.deviceType}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <BatteryBar level={device.batteryLevel} />
                    </td>

                    <td className="px-4 py-4">
                      <HealthBadge health={getHealth(device.batteryLevel)} />
                    </td>

                    <td className="px-4 py-4">
                      <ChargingBadge state={device.chargingState} />
                    </td>

                    <td className="px-4 py-4 text-slate-600 text-xs whitespace-nowrap">
                      ~{hoursRemaining}h
                      {risk && (
                        <span className="ml-2 text-rose-600 font-medium">
                          ⚠
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <PriorityBadge priority={device.priority} />
                    </td>

                    <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">
                      {timeAgo(device.lastBatteryUpdate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value, color, note }) => (
  <div
    className={`rounded-xl p-4 border
      ${
        title === "Critical Devices"
          ? "bg-red-50 border-red-500"
          : title === "Low & Not Charging"
            ? "bg-yellow-50 border-yellow-500"
            : "bg-green-50 border-green-500"
      }`}
  >
    <p className="text-xs text-slate-500">{title}</p>
    <h3 className={`text-xl font-semibold mt-1 ${color}`}>{value}</h3>
    <p className="text-xs text-slate-400 mt-1">{note}</p>
  </div>
);

const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-600"
  >
    {options.map((o) => (
      <option key={o}>{o}</option>
    ))}
  </select>
);

const BatteryBar = ({ level }) => {
  const color =
    level > 60 ? "bg-emerald-500" : level > 30 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="flex items-center gap-3">
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 ${color} rounded-full`}
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-xs text-slate-600">{level}%</span>
    </div>
  );
};

const HealthBadge = ({ health }) => {
  const map = {
    GOOD: "bg-emerald-50 text-emerald-600",
    LOW: "bg-amber-50 text-amber-600",
    CRITICAL: "bg-rose-50 text-rose-600",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${map[health]}`}>
      {health}
    </span>
  );
};

const ChargingBadge = ({ state }) => (
  <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600">
    {state}
  </span>
);

const PriorityBadge = ({ priority }) => {
  const map = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-amber-100 text-amber-700",
    LOW: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${map[priority]}`}
    >
      {priority}
    </span>
  );
};

const timeAgo = (date) => {
  const mins = Math.floor((Date.now() - new Date(date)) / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;

  return `${Math.floor(mins / 60)}h ago`;
};

export default BatteryInfo;
