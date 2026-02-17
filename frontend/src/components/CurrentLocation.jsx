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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDevices(MOCK_DEVICES);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <h2 className="text-xl font-semibold text-slate-800">
        Device Location
      </h2>

      {/* MAP */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        {loading ? (
          <p className="text-sm text-slate-500">Loading map...</p>
        ) : (
          <MapContainer
            center={[26.1445, 91.7362]}
            zoom={13}
            className="rounded-lg overflow-hidden"
            style={{ height: "420px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {devices.map((d) => (
              <Marker key={d.deviceId} position={[d.lat, d.lon]}>
                <Popup>
                  <strong>{d.deviceId}</strong> <br />
                  {d.msisdn} <br />
                  {d.status} <br />
                  {new Date(d.lastUpdate).toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Total Location Check" value="5000" />
        <StatCard title="Match Rate" value="92%" valueColor="text-emerald-600" />
        <StatCard title="Mismatch Rate" value="8%" valueColor="text-rose-600" />
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <div className="px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-700">
          Device List
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs">
            <tr>
              <th className="p-3 text-left">Device</th>
              <th className="text-left">MSISDN</th>
              <th className="text-left">Status</th>
              <th>Lat</th>
              <th>Lon</th>
              <th className="text-left">Last Update</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((d) => (
              <tr
                key={d.deviceId}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="p-3 font-medium text-slate-800">
                  {d.deviceId}
                </td>

                <td className="text-slate-600">{d.msisdn}</td>

                <td>
                  <StatusBadge status={d.status} />
                </td>

                <td className="text-center">{d.lat}</td>
                <td className="text-center">{d.lon}</td>

                <td className="text-slate-500 text-xs">
                  {new Date(d.lastUpdate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-4">

        <ChartCard title="GPS vs Network Mismatch">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mismatchData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                fill="#fee2e2"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Location Accuracy Levels">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={accuracyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
};

/* ----------------- REUSABLE COMPONENTS ----------------- */

const StatCard = ({ title, value, valueColor }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4">
    <p className="text-xs text-slate-500">{title}</p>
    <h3 className={`text-xl font-semibold mt-1 ${valueColor}`}>
      {value}
    </h3>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    AVAILABLE: "bg-emerald-50 text-emerald-600",
    OFFLINE: "bg-rose-50 text-rose-600",
    RENT: "bg-blue-50 text-blue-600",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4">
    <h4 className="text-sm font-medium text-slate-700 mb-4">
      {title}
    </h4>
    {children}
  </div>
);

export default CurrentLocation;