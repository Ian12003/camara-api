import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  ArrowDownToLine, ArrowUpToLine, Timer, Signal
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const MOCK_DEVICE_INFO = {
  "DEVICE-001": {
    deviceId: "DEVICE-001",
    msisdn: "+491701234567",
    deviceType: "CAR",
    quality: "GOOD",
    latency: 40,
    signal: 85,
    lastUpdate: "2026-02-13T10:30:00Z"
  },
  "DEVICE-002": {
    deviceId: "DEVICE-002",
    msisdn: "+491709876543",
    deviceType: "SCOOTER",
    quality: "FAIR",
    latency: 120,
    signal: 55,
    lastUpdate: "2026-02-13T10:30:00Z"
  },
  "DEVICE-003": {
    deviceId: "DEVICE-003",
    msisdn: "+491700001111",
    deviceType: "SENSOR",
    quality: "POOR",
    latency: 200,
    signal: 25,
    lastUpdate: "2026-02-13T10:30:00Z"
  }
};

const MOCK_DEVICE_DATA = {
  "DEVICE-001": [
    { time: "10:00", download: 20, upload: 6 },
    { time: "10:05", download: 32, upload: 8 },
    { time: "10:10", download: 28, upload: 7 },
    { time: "10:15", download: 40, upload: 10 },
    { time: "10:20", download: 35, upload: 9 }
  ],
  "DEVICE-002": [
    { time: "10:00", download: 12, upload: 4 },
    { time: "10:05", download: 15, upload: 5 },
    { time: "10:10", download: 10, upload: 3 },
    { time: "10:15", download: 18, upload: 6 },
    { time: "10:20", download: 14, upload: 4 }
  ],
  "DEVICE-003": [{ time: "10:00", download: 6, upload: 2 }]
};

/* ---------------- COMPONENT ---------------- */

const NetworkBandwidth = () => {

  const [device, setDevice] = useState("DEVICE-001");
  const [series, setSeries] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setInfo(MOCK_DEVICE_INFO[device]);
      setSeries(MOCK_DEVICE_DATA[device]);
      setLoading(false);
    }, 400);

  }, [device]);

  const latest = series[series.length - 1] || {};

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-xl font-semibold text-slate-800">
          Network Bandwidth
        </h2>

        <select
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm"
        >
          <option value="DEVICE-001">DEVICE-001</option>
          <option value="DEVICE-002">DEVICE-002</option>
          <option value="DEVICE-003">DEVICE-003</option>
        </select>
      </div>

      {/* DEVICE INFO */}
      {info && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 grid md:grid-cols-3 xl:grid-cols-5 gap-4">

          <InfoItem label="Device ID" value={info.deviceId} />
          <InfoItem label="MSISDN" value={info.msisdn} />
          <InfoItem label="Type" value={info.deviceType} />

          <QualityBadge quality={info.quality} />

          <InfoItem
            label="Last Update"
            value={new Date(info.lastUpdate).toLocaleString()}
          />
        </div>
      )}

      {/* KPI */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <KpiCard title="Download" value={`${latest.download || 0} Mbps`} icon={<ArrowDownToLine size={18} />} color="indigo" />
        <KpiCard title="Upload" value={`${latest.upload || 0} Mbps`} icon={<ArrowUpToLine size={18} />} color="emerald" />
        <KpiCard title="Latency" value={`${info?.latency || 0} ms`} icon={<Timer size={18} />} color="amber" />
        <KpiCard title="Signal" value={`${info?.signal || 0}%`} icon={<Signal size={18} />} color="rose" />

      </div>

      {/* CHART */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">

        <div className="flex justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-700">
            Uplink & Downlink Trend
          </h3>
          <span className="text-xs text-slate-400">Last 30 minutes</span>
        </div>

        {loading ? (
          <div className="h-[320px] flex items-center justify-center text-slate-500">
            Loading chart...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />

              <Line type="monotone" dataKey="download" stroke="#4f46e5" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="upload" stroke="#16a34a" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>
  );
};

/* ---------------- REUSABLE ---------------- */

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-medium text-slate-800 mt-1">{value}</p>
  </div>
);

const QualityBadge = ({ quality }) => {

  const map = {
    GOOD: "bg-emerald-50 text-emerald-600",
    FAIR: "bg-amber-50 text-amber-600",
    POOR: "bg-rose-50 text-rose-600"
  };

  return (
    <div>
      <p className="text-xs text-slate-500">Quality</p>
      <span className={`mt-1 inline-block px-2 py-1 text-xs rounded-md font-medium ${map[quality]}`}>
        {quality}
      </span>
    </div>
  );
};

const KpiCard = ({ title, value, icon, color }) => {

  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600"
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center">

      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <h3 className="text-xl font-semibold text-slate-800 mt-1">
          {value}
        </h3>
      </div>

      <div className={`p-2 rounded-lg ${colorMap[color]}`}>
        {icon}
      </div>

    </div>
  );
};

export default NetworkBandwidth;