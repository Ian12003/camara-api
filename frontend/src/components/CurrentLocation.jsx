import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";

/* Fix leaflet icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const API_ROOT = "YOUR_API_ROOT/location";

const MOCK_DEVICES = [
  {
    deviceId: "DEVICE-001",
    msisdn: "+491701234567",
    lat: 26.1445,
    lon: 91.7362,
    status: "ACTIVE",
    lastUpdate: "2026-02-13T10:20:00Z"
  },
  {
    deviceId: "DEVICE-002",
    msisdn: "+491709876543",
    lat: 26.1500,
    lon: 91.7400,
    status: "LOW_BATTERY",
    lastUpdate: "2026-02-13T10:18:00Z"
  },
  {
    deviceId: "DEVICE-003",
    msisdn: "+491700001111",
    lat: 26.1300,
    lon: 91.7200,
    status: "OFFLINE",
    lastUpdate: "2026-02-13T10:10:00Z"
  }
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
    <div>

      <h2 className="text-3xl font-bold mb-6">
         Device Location
      </h2>

      <div className="bg-white p-4 rounded-xl shadow mb-6">

        {loading ? (
          <p>Loading map...</p>
        ) : (
          <MapContainer
            center={[26.1445, 91.7362]}
            zoom={13}
            style={{ height: "420px", width: "100%" }}
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {devices.map((d) => (
              <Marker
                key={d.deviceId}
                position={[d.lat, d.lon]}
              >
                <Popup>
                  <strong>{d.deviceId}</strong> <br />
                  MSISDN: {d.msisdn} <br />
                  Status: {d.status} <br />
                  Last Update:{" "}
                  {new Date(d.lastUpdate).toLocaleString()}
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        )}

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

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

                <td className="p-4 font-semibold">
                  {d.deviceId}
                </td>

                <td>{d.msisdn}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      d.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : d.status === "LOW_BATTERY"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>

                <td>{d.lat}</td>
                <td>{d.lon}</td>

                <td>
                  {new Date(d.lastUpdate).toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default CurrentLocation;
