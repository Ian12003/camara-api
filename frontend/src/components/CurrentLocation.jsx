import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* Fix leaflet icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const API_ROOT = "YOUR_API_ROOT/location";

const MOCK_DEVICES = [
  {
    deviceId: "DEVICE-001",
    msisdn: "+491701234567",
    lat: 26.1445,
    lon: 91.7362,
    status: "RENT",
    lastUpdate: "2026-02-13T10:20:00Z",
  },
  {
    deviceId: "DEVICE-002",
    msisdn: "+491709876543",
    lat: 26.15,
    lon: 91.74,
    status: "AVAILABLE",
    lastUpdate: "2026-02-13T10:18:00Z",
  },
  {
    deviceId: "DEVICE-003",
    msisdn: "+491700001111",
    lat: 26.13,
    lon: 91.72,
    status: "OFFLINE",
    lastUpdate: "2026-02-13T10:10:00Z",
  },
];

const mismatchData = [
  { day: "Feb 5", value: 10 },
  { day: "Feb 6", value: 14 },
  { day: "Feb 7", value: 9 },
  { day: "Feb 8", value: 6 },
  { day: "Feb 9", value: 13 },
  { day: "Feb 10", value: 12 },
];

const accuracyData = [
  { name: "50m", value: 6000 },
  { name: "100m", value: 3500 },
  { name: "500m", value: 1200 },
  { name: "1000m", value: 500 },
  { name: "10000m", value: 100 },
];

const CurrentLocation = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint) => {
    console.log("Future API", `${API_ROOT}/${endpoint}`);

    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DEVICES), 500);
    });
  };

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const data = await callApi("current-location");
      setDevices(data);
      setLoading(false);
    };

    fetchLocations();
  }, []);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">📍 Device Location Dashboard</h2>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        {loading ? (
          <p>Loading map...</p>
        ) : (
          <MapContainer
            center={[26.1445, 91.7362]}
            zoom={13}
            style={{ height: "420px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {devices.map((d) => (
              <Marker key={d.deviceId} position={[d.lat, d.lon]}>
                <Popup>
                  <strong>{d.deviceId}</strong> <br />
                  MSISDN: {d.msisdn} <br />
                  Status: {d.status} <br />
                  Last Update: {new Date(d.lastUpdate).toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
<div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total Location Check</p>
          <h3 className="text-2xl font-bold mt-2">5000</h3>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Match Rate</p>
          <h3 className="text-2xl font-bold text-green-500 mt-2">92%</h3>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Mismatch Rate</p>
          <h3 className="text-2xl font-bold text-red-500 mt-2">8%</h3>
        </div>
      </div>
    

      <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-4">Device</th>
              <th>MSISDN</th>
              <th>Status</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Last Update</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((d) => (
              <tr key={d.deviceId} className="border-t">
                <td className="p-4 font-semibold">{d.deviceId}</td>
                <td>{d.msisdn}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
      ${
        d.status === "AVAILABLE"
          ? "bg-green-100 text-green-700"
          : d.status === "OFFLINE"
            ? "bg-red-100 text-red-700"
            : d.status === "RENT"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
      }`}
                  >
                    {d.status}
                  </span>
                </td>

                <td>{d.lat}</td>
                <td>{d.lon}</td>
                <td>{new Date(d.lastUpdate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="font-medium mb-4">GPS vs Network Mismatch</h4>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mismatchData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                fill="#fecaca"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="font-medium mb-4">Location Accuracy Levels</h4>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={accuracyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
  </div>
);

export default CurrentLocation;
