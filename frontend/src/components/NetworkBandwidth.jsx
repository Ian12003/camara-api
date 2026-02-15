import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const API_ROOT = "YOUR_API_ROOT/network-bandwidth";

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
  ]
};

const NetworkBandwidth = () => {

  const [device, setDevice] = useState("DEVICE-001");
  const [series, setSeries] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint, body = {}) => {
    console.log("Future API", `${API_ROOT}/${endpoint}`, body);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          info: MOCK_DEVICE_INFO[body.deviceId],
          history: MOCK_DEVICE_DATA[body.deviceId]
        });
      }, 400);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await callApi("network-history", {
        deviceId: device
      });

      setInfo(result.info);
      setSeries(result.history);
      setLoading(false);
    };

    fetchData();
  }, [device]);

  const latest = series[series.length - 1] || {};

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
       Device Network Bandwidth
      </h2>

      <select
        value={device}
        onChange={(e) => setDevice(e.target.value)}
        className="mb-6 p-2 border rounded-lg"
      >
        <option value="DEVICE-001">DEVICE-001</option>
        <option value="DEVICE-002">DEVICE-002</option>
      </select>

      {info && (
        <div className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-5 gap-4">

          <InfoItem label="Device ID" value={info.deviceId} />
          <InfoItem label="MSISDN" value={info.msisdn} />
          <InfoItem label="Type" value={info.deviceType} />
          <InfoItem label="Quality" value={info.quality} />
          <InfoItem
            label="Last Update"
            value={new Date(info.lastUpdate).toLocaleString()}
          />

        </div>
      )}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <KpiCard title="Download" value={`${latest.download || 0} Mbps`} />
        <KpiCard title="Upload" value={`${latest.upload || 0} Mbps`} />
        <KpiCard title="Latency" value={`${info?.latency || 0} ms`} />
        <KpiCard title="Signal" value={`${info?.signal || 0}%`} />

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold text-lg mb-4">
          Uplink & Downlink Trend
        </h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="download"
                stroke="#2563eb"
                strokeWidth={3}
                name="Download (Mbps)"
              />

              <Line
                type="monotone"
                dataKey="upload"
                stroke="#16a34a"
                strokeWidth={3}
                name="Upload (Mbps)"
              />

            </LineChart>
          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
};


const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const KpiCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
  </div>
);

export default NetworkBandwidth;
