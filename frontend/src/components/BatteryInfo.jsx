import { useEffect, useState } from "react";

const API_ROOT = "YOUR_API_ROOT/battery";

const MOCK_DEVICES = [
  {
    deviceId: "device-001",
    msisdn: "+491701234567",
    deviceType: "CAR",
    active: true,
    batteryLevel: 42,
    chargingState: "DISCHARGING",
    lastBatteryUpdate: "2026-02-13T10:28:00Z",
  },
  {
    deviceId: "device-002",
    msisdn: "+491709876543",
    deviceType: "SCOOTER",
    active: true,
    batteryLevel: 100,
    chargingState: "FULL",
    lastBatteryUpdate: "2026-02-13T10:20:00Z",
  },
  {
    deviceId: "device-003",
    msisdn: "+491700001111",
    deviceType: "SENSOR",
    active: true,
    batteryLevel: 19,
    chargingState: "CHARGING",
    lastBatteryUpdate: "2026-02-13T10:12:00Z",
  },
];

const BatteryInfo = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [healthFilter, setHealthFilter] = useState("ALL");
  const [chargeFilter, setChargeFilter] = useState("ALL");

  const callApi = async (endpoint, body = {}) => {
    console.log("Future API Call", `${API_ROOT}/${endpoint}`, body);

    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DEVICES), 600);
    });
  };

  useEffect(() => {
    const fetchBatteryData = async () => {
      setLoading(true);
      const data = await callApi("battery-status", { activeOnly: true });
      setDevices(data);
      setLoading(false);
    };

    fetchBatteryData();
  }, []);

  const getHealth = (level) => {
    if (level > 60) return "GOOD";
    if (level > 30) return "LOW";
    return "CRITICAL";
  };

  const totalDevices = devices.length;
  const lowBattery = devices.filter((d) => d.batteryLevel < 30).length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Device Battery Monitoring</h2>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <p className="text-red-700 text-sm">Critical Devices</p>
          <h3 className="text-3xl font-bold text-red-700 mt-2">
            {devices.filter((d) => d.batteryLevel < 20).length}
          </h3>
          <p className="text-xs text-red-600 mt-1">Battery below 20%</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <p className="text-yellow-700 text-sm">Low & Not Charging</p>
          <h3 className="text-3xl font-bold text-yellow-700 mt-2">
            {
              devices.filter(
                (d) => d.batteryLevel > 30 && d.chargingState === "DISCHARGING",
              ).length
            }
          </h3>
          <p className="text-xs text-yellow-600 mt-1">Needs immediate action</p>
        </div>

        <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
          <p className="text-green-700 text-sm">Healthy Devices</p>
          <h3 className="text-3xl font-bold text-green-700 mt-2">
            {devices.filter((d) => d.batteryLevel > 60).length}
          </h3>
          <p className="text-xs text-green-600 mt-1">Battery above 60%</p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mb-4">
        <select
          value={healthFilter}
          onChange={(e) => setHealthFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="ALL">All Health</option>
          <option value="GOOD">GOOD</option>
          <option value="LOW">LOW</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>

        <select
          value={chargeFilter}
          onChange={(e) => setChargeFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="ALL">All Charging States</option>
          <option value="CHARGING">CHARGING</option>
          <option value="DISCHARGING">DISCHARGING</option>
          <option value="FULL">FULL</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-semibold text-lg">Device Battery Details</h3>
        </div>

        {loading ? (
          <p className="p-6">Loading battery data...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-4">Device ID</th>
                <th>MSISDN</th>
                <th>Type</th>
                <th>Battery</th>
                <th>Health</th>
                <th>Charging</th>
                <th>Last Update</th>
              </tr>
            </thead>

            <tbody>
              {devices
                .filter((device) => {
                  const healthMatch =
                    healthFilter === "ALL" ||
                    getHealth(device.batteryLevel) === healthFilter;

                  const chargeMatch =
                    chargeFilter === "ALL" ||
                    device.chargingState === chargeFilter;

                  return healthMatch && chargeMatch;
                })
                .map((device, index) => (
                  <tr key={index} className="border-t hover:bg-slate-50">
                    <td className="p-4 font-semibold">{device.deviceId}</td>

                    <td>{device.msisdn}</td>

                    <td>
                      <span className="px-2 py-1 rounded bg-slate-200">
                        {device.deviceType}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-28 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              device.batteryLevel > 60
                                ? "bg-green-500"
                                : device.batteryLevel > 30
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${device.batteryLevel}%` }}
                          ></div>
                        </div>
                        {device.batteryLevel}%
                      </div>
                    </td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          getHealth(device.batteryLevel) === "GOOD"
                            ? "bg-green-100 text-green-700"
                            : getHealth(device.batteryLevel) === "LOW"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {getHealth(device.batteryLevel)}
                      </span>
                    </td>

                    <td>
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                        {device.chargingState}
                      </span>
                    </td>

                    <td>
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

export default BatteryInfo;
