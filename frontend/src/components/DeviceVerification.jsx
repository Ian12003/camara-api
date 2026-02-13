import { useState } from "react";

const API_ROOT = "YOUR_API_ROOT/device-identifier/v0.3";

const DeviceVerification = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [identifierData, setIdentifierData] = useState(null);
  const [typeData, setTypeData] = useState(null);
  const [ppidData, setPpidData] = useState(null);

  const [error, setError] = useState(null);

  const callApi = async (endpoint) => {
    const res = await fetch(`${API_ROOT}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer YOUR_TOKEN"
      },
      body: JSON.stringify({
        device: { phoneNumber: phone },
      }),
    });

    const data = await res.json();

    if (!res.ok) throw data;
    return data;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const [idRes, typeRes, ppidRes] = await Promise.all([
        callApi("retrieve-identifier"),
        callApi("retrieve-type"),
        callApi("retrieve-ppid"),
      ]);

      setIdentifierData(idRes);
      setTypeData(typeRes);
      setPpidData(ppidRes);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
   <div className="flex justify-center items-center h-full">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Device Verification
        </h2>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+123456789"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Checking..." : "Verify Device"}
        </button>

        {error && (
          <pre className="mt-4 bg-red-100 overflow-auto text-red-600 p-4 rounded">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {identifierData && (
            <div className="bg-slate-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2 text-sm">Device Identifier</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(identifierData, null, 2)}
              </pre>
            </div>
          )}

          {typeData && (
            <div className="bg-slate-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2 text-sm">Device Type</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(typeData, null, 2)}
              </pre>
            </div>
          )}

          {ppidData && (
            <div className="bg-slate-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2 text-sm">PPID</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(ppidData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceVerification;
