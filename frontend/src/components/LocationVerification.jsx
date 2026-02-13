import { useState } from "react";

const API_ROOT = "YOUR_API_ROOT/location-verification/v3";

const LocationVerification = () => {

  const [phone, setPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_ROOT}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer YOUR_TOKEN"
        },
        body: JSON.stringify({
          device: { phoneNumber: phone },
          area: {
            areaType: "CIRCLE",
            center: {
              latitude: Number(latitude),
              longitude: Number(longitude)
            },
            radius: Number(radius)
          },
          maxAge: Number(maxAge)
        })
      });

      const data = await res.json();

      if (!res.ok) throw data;

      setResult(data);

    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-semibold mb-6 text-center">
          Location Verification
        </h2>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number (+123456789)"
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Radius (meters)"
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          placeholder="Max Age (seconds)"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Verifying..." : "Verify Location"}
        </button>

        {error && (
          <pre className="mt-4 bg-red-100 text-red-600 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        {result && (
          <div className="mt-6 p-4 rounded-lg border bg-slate-50">

            <h3 className="font-semibold mb-2">Result</h3>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  result.verificationResult === "TRUE"
                    ? "text-green-600"
                    : result.verificationResult === "FALSE"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {result.verificationResult}
              </span>
            </p>

            <p>
              <strong>Last Location Time:</strong>{" "}
              {result.lastLocationTime}
            </p>

            {result.matchRate && (
              <p>
                <strong>Match Rate:</strong> {result.matchRate}%
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default LocationVerification;
