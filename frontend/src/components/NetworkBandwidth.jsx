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

  const [device, setDevice] = useState("CAR-001");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint, body = {}) => {
    console.log("Future API", `${API_ROOT}/${endpoint}`, body);

    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DEVICE_DATA[body.carId]), 400);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await callApi("network-history", {
        carId: device
      });
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [device]);

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
     Network Bandwidth
      </h2>

      <select
        value={device}
        onChange={(e) => setDevice(e.target.value)}
        className="mb-6 p-2 border rounded-lg"
      >
        <option value="DEVICE-001">DEVICE-001</option>
        <option value="DEVICE-002">DEVICE-002</option>
      </select>

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold text-lg mb-4">
          Uplink & Downlink Trend
        </h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
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

export default NetworkBandwidth;
