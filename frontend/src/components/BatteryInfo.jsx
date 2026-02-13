import { useEffect, useState } from "react";

const API_ROOT = "YOUR_API_ROOT/battery";

const MOCK_DEVICES = [
  {
    deviceId: "device-001",
    active: true,
    activeSince: "2026-02-13T10:30:00Z",
    batteryLevel: 82
  },
  {
    deviceId: "device-002",
    active: true,
    activeSince: "2026-02-13T09:10:00Z",
    batteryLevel: 55
  },
  {
    deviceId: "device-003",
    active: true,
    activeSince: "2026-02-13T08:45:00Z",
    batteryLevel: 23
  }
];

const BatteryInfo = () => {

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const totalDevices = devices.length;
  const lowBattery = devices.filter(c => c.batteryLevel < 30).length;
  const avgBattery =
    totalDevices > 0
      ? Math.round(devices.reduce((a, b) => a + b.batteryLevel, 0) / totalDevices)
      : 0;

  return (
    <div>

      <h2 className="text-3xl font-bold mb-8">
        Battery Monitoring
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Active Devices</p>
          <h3 className="text-3xl font-bold mt-2">{totalDevices}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Low Battery (&lt;30%)</p>
          <h3 className="text-3xl font-bold text-red-600 mt-2">
            {lowBattery}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Average Battery</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            {avgBattery}%
          </h3>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-5 border-b">
          <h3 className="font-semibold text-lg">
             Battery Status
          </h3>
        </div>

        {loading ? (
          <p className="p-6">Loading battery data...</p>
        ) : (
          <table className="w-full">

            <thead className="bg-slate-100 text-left text-sm">
              <tr>
                <th className="p-4">Device</th>
                <th>Status</th>
                <th>Active Since</th>
                <th>Battery Level</th>
              </tr>
            </thead>

            <tbody>
              {devices.map((device, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-semibold">
                    {device.deviceId}
                  </td>

                  <td>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>

                  <td>
                    {new Date(device.activeSince).toLocaleString()}
                  </td>

                  <td>
                    <div className="flex items-center gap-3">

                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            device.batteryLevel > 60
                              ? "bg-green-500"
                              : device.batteryLevel > 30
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${device.batteryLevel}%` }}
                        ></div>
                      </div>

                      <span className="text-sm font-semibold">
                        {device.batteryLevel}%
                      </span>

                    </div>
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
