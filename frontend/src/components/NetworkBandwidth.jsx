import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Timer,
  Signal,
  RefreshCcw,
} from "lucide-react";

const MOCK_DEVICE_INFO = {
  "DEVICE-001": {
    deviceId: "DEVICE-001",
    msisdn: "+491701234567",
    deviceType: "CAR",
    quality: "GOOD",
    latency: 40,
    signal: 85,
    operator: "Vodafone",
    connectionType: "5G",
    ipAddress: "10.0.0.21",
    lastUpdate: "2026-02-13T10:30:00Z",
  },
  "DEVICE-002": {
    deviceId: "DEVICE-002",
    msisdn: "+491709876543",
    deviceType: "SCOOTER",
    quality: "FAIR",
    latency: 110,
    signal: 58,
    operator: "Airtel",
    connectionType: "4G",
    ipAddress: "10.0.0.43",
    lastUpdate: "2026-02-13T10:30:00Z",
  },
  "DEVICE-003": {
    deviceId: "DEVICE-003",
    msisdn: "+491700001111",
    deviceType: "SENSOR",
    quality: "POOR",
    latency: 210,
    signal: 25,
    operator: "Jio",
    connectionType: "LTE",
    ipAddress: "10.0.0.88",
    lastUpdate: "2026-02-13T10:30:00Z",
  },
  "DEVICE-004": {
    deviceId: "DEVICE-004",
    msisdn: "+491702222333",
    deviceType: "CAR",
    quality: "GOOD",
    latency: 55,
    signal: 78,
    operator: "Vodafone",
    connectionType: "5G",
    ipAddress: "10.0.0.99",
    lastUpdate: "2026-02-13T10:30:00Z",
  },
  "DEVICE-005": {
    deviceId: "DEVICE-005",
    msisdn: "+491703333444",
    deviceType: "DRONE",
    quality: "FAIR",
    latency: 140,
    signal: 50,
    operator: "Airtel",
    connectionType: "4G",
    ipAddress: "10.0.0.101",
    lastUpdate: "2026-02-13T10:30:00Z",
  },
};

const MOCK_DEVICE_DATA = {
  "DEVICE-001": [
    { time: "10:00", download: 20, upload: 6 },
    { time: "10:05", download: 32, upload: 8 },
    { time: "10:10", download: 28, upload: 7 },
    { time: "10:15", download: 40, upload: 10 },
    { time: "10:20", download: 35, upload: 9 },
    { time: "10:25", download: 42, upload: 11 },
  ],
  "DEVICE-002": [
    { time: "10:00", download: 12, upload: 4 },
    { time: "10:05", download: 15, upload: 5 },
    { time: "10:10", download: 10, upload: 3 },
    { time: "10:15", download: 18, upload: 6 },
    { time: "10:20", download: 14, upload: 4 },
    { time: "10:25", download: 17, upload: 5 },
  ],
  "DEVICE-003": [
    { time: "10:00", download: 6, upload: 2 },
    { time: "10:05", download: 5, upload: 1 },
    { time: "10:10", download: 4, upload: 2 },
    { time: "10:15", download: 3, upload: 1 },
    { time: "10:20", download: 6, upload: 2 },
    { time: "10:25", download: 4, upload: 1 },
  ],
  "DEVICE-004": [
    { time: "10:00", download: 25, upload: 7 },
    { time: "10:05", download: 30, upload: 9 },
    { time: "10:10", download: 33, upload: 8 },
    { time: "10:15", download: 37, upload: 10 },
    { time: "10:20", download: 39, upload: 9 },
    { time: "10:25", download: 41, upload: 12 },
  ],
  "DEVICE-005": [
    { time: "10:00", download: 8, upload: 3 },
    { time: "10:05", download: 9, upload: 4 },
    { time: "10:10", download: 11, upload: 3 },
    { time: "10:15", download: 13, upload: 5 },
    { time: "10:20", download: 10, upload: 4 },
    { time: "10:25", download: 12, upload: 4 },
  ],
};

const getHealth = (latency, signal) => {
  if (latency < 80 && signal > 70) return "STABLE";
  if (latency < 150 && signal > 40) return "DEGRADED";
  return "CRITICAL";
};

const avg = (arr, key) =>
  Math.round(arr.reduce((a, b) => a + b[key], 0) / arr.length || 0);

const peak = (arr, key) => Math.max(...arr.map((d) => d[key] || 0), 0);

const NetworkBandwidth = () => {
  const [device, setDevice] = useState("DEVICE-001");
  const [series, setSeries] = useState([]);
  const [info, setInfo] = useState(null);
  const [syncedAt, setSyncedAt] = useState(Date.now());

  const fetchData = () => {
    setInfo(MOCK_DEVICE_INFO[device]);
    setSeries(MOCK_DEVICE_DATA[device]);
    setSyncedAt(Date.now());
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 10000);
    return () => clearInterval(timer);
  }, [device]);

  const latest = series.at(-1) || {};
  const health = getHealth(info?.latency, info?.signal);

  const showAlert = health === "CRITICAL";

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Network Bandwidth</h2>

        <select
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>DEVICE-001</option>
          <option>DEVICE-002</option>
          <option>DEVICE-003</option>
        </select>
      </div>

      {info && (
        <div className="bg-white p-4 rounded-xl border flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <span
              className={`px-3 py-1 rounded text-sm font-semibold
              ${health === "STABLE" && "bg-green-100 text-green-700"}
              ${health === "DEGRADED" && "bg-yellow-100 text-yellow-700"}
              ${health === "CRITICAL" && "bg-red-100 text-red-700"}
            `}
            >
              {health}
            </span>

            <span className="text-sm text-gray-500">
              {info.connectionType} • {info.operator} • IP {info.ipAddress}
            </span>
          </div>

          <span className="text-xs flex items-center gap-1 text-gray-500">
            <RefreshCcw size={14} /> Synced just now
          </span>
        </div>
      )}

      {showAlert && (
        <div className="bg-red-50 border border-red-500 p-4 rounded-xl text-red-700">
          ⚠ Network Degradation Detected
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi
          title="Download"
          value={`${latest.download || 0} Mbps`}
          icon={<ArrowDownToLine />}
        />
        <Kpi
          title="Upload"
          value={`${latest.upload || 0} Mbps`}
          icon={<ArrowUpToLine />}
        />
        <Kpi
          title="Latency"
          value={`${info?.latency || 0} ms`}
          icon={<Timer />}
        />
        <Kpi title="Signal" value={`${info?.signal || 0}%`} icon={<Signal />} />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Mini title="Avg Download" value={`${avg(series, "download")} Mbps`} />
        <Mini
          title="Peak Download"
          value={`${peak(series, "download")} Mbps`}
        />
        <Mini title="Avg Upload" value={`${avg(series, "upload")} Mbps`} />
        <Mini title="Stability" value={health} />
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line dataKey="download" stroke="#4f46e5" strokeWidth={2.5} />
            <Line dataKey="upload" stroke="#16a34a" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Kpi = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-xl border flex justify-between items-center">
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
    {icon}
  </div>
);

const Mini = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl border">
    <p className="text-xs text-gray-500">{title}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default NetworkBandwidth;
