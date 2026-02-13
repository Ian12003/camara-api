import { useState } from "react";

function App() {
  const [phonenumber, setPhonenumber] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:9091/device-identifier";

  const fetchData = async () => {
    if (!imei.trim()) return;

    setLoading(true);
    setData(null);

    try {
      const body = {
        device: {
          phonenumber:phonenumber
        }
      };

      const [identifierRes, typeRes, ppidRes] = await Promise.all([
        fetch(`${API}/retrieve-identifier`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }).then(r => r.json()),

        fetch(`${API}/retrieve-type`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }).then(r => r.json()),

        fetch(`${API}/retrieve-ppid`,{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then(r=>r.json())
      ]);

      setData({
        lastChecked:identifierRes.lastChecked,
        imeisv: identifierRes.imeisv,
        imei:identifierRes.imei,
        tac:identifierRes.tac,
        model: identifierRes.model,
        manufacturer:identifierRes.manufacturer,
        ppid:ppidRes.ppid
      });

    } catch (err) {
      console.error("API Error:",err);
      alert(err.message || "unknown error occcured");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Device Identifier Lookup
        </h1>

        <input
          type="text"
          placeholder="Enter IMEI Number"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={fetchData}
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700 transition"
        >
          {loading ? "Fetching..." : "Search"}
        </button>

        {data && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-md">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              Device Details
            </h2>
            <p><strong>IMEI:</strong> {data.imei}</p>
            <p><strong>IMEISV:</strong> {data.imeisv}</p>
            <p><strong>Brand:</strong> {data.brand}</p>
            <p><strong>Model:</strong> {data.model}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
