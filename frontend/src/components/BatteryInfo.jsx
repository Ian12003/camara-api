import { useEffect, useState } from "react";

const MOCK_DEVICES = [
  {
    deviceId: "DEVICE-001",
    msisdn: "+491701234567",
    deviceType: "CAR",
    batteryLevel: 42,
    chargingState: "DISCHARGING",
    lastBatteryUpdate: "2026-02-13T10:28:00Z",
  },
  {
    deviceId: "DEVICE-002",
    msisdn: "+491709876543",
    deviceType: "SCOOTER",
    batteryLevel: 100,
    chargingState: "FULL",
    lastBatteryUpdate: "2026-02-13T10:20:00Z",
  },
  {
    deviceId: "DEVICE-003",
    msisdn: "+491700001111",
    deviceType: "SENSOR",
    batteryLevel: 19,
    chargingState: "CHARGING",
    lastBatteryUpdate: "2026-02-13T10:12:00Z",
  }
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
      healthFilter === "ALL" ||
      getHealth(device.batteryLevel) === healthFilter;

    const chargeMatch =
      chargeFilter === "ALL" ||
      device.chargingState === chargeFilter;

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
              (d) =>
                d.batteryLevel >30 &&
                d.chargingState === "DISCHARGING"
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
          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-500 text-xs">
              <tr>
                <th className="p-3 text-left">Device</th>
                <th>MSISDN</th>
                <th>Type</th>
                <th>Battery</th>
                <th>Health</th>
                <th>Charging</th>
                <th>Last Update</th>
              </tr>
            </thead>

            <tbody>
              {filteredDevices.map((device) => (
                <tr
                  key={device.deviceId}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="p-3 font-medium text-slate-800">
                    {device.deviceId}
                  </td>

                  <td className="text-slate-600">{device.msisdn}</td>

                  <td>
                    <span className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-600">
                      {device.deviceType}
                    </span>
                  </td>

                  <td className="w-45">
                    <BatteryBar level={device.batteryLevel} />
                  </td>

                  <td>
                    <HealthBadge health={getHealth(device.batteryLevel)} />
                  </td>

                  <td>
                    <ChargingBadge state={device.chargingState} />
                  </td>

                  <td className="text-xs text-slate-500">
                    {new Date(device.lastBatteryUpdate).toLocaleString()}
                  </td>
                </tr>
              ))}
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
      ${title === "Critical Devices"
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
    level > 60
      ? "bg-emerald-500"
      : level > 30
      ? "bg-amber-500"
      : "bg-rose-500";

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

export default BatteryInfo;