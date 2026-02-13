import { useState } from "react";

const API_ROOT = "YOUR_API_ROOT/sim-swap/v2";

const SimSwap = () => {
  const [phone, setPhone] = useState("");
  const [maxAge, setMaxAge] = useState();

  const [dateResult, setDateResult] = useState(null);
  const [checkResult, setCheckResult] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint, body) => {
    const res = await fetch(`${API_ROOT}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer YOUR_TOKEN"
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  };

  const handleRetrieveDate = async () => {
    setLoading(true);
    setError(null);
    setDateResult(null);

    try {
      const data = await callApi("retrieve-date", {
        phoneNumber: phone,
      });

      setDateResult(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const handleCheckSwap = async () => {
    setLoading(true);
    setError(null);
    setCheckResult(null);

    try {
      const data = await callApi("check", {
        phoneNumber: phone,
        maxAge: Number(maxAge),
      });

      setCheckResult(data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-semibold mb-6 text-center">
          SIM Swap
        </h2>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number (+346661113334)"
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          type="number"
          value={maxAge}
          min={1}
          max={2400}
          onChange={(e) => setMaxAge(e.target.value)}
          placeholder="Max Age (hours)"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <div className="flex flex-col gap-3">

          <button
            onClick={handleRetrieveDate}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Get Latest SIM Change Date"}
          </button>

          <button
            onClick={handleCheckSwap}
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Loading..." : "Check SIM Swap"}
          </button>

        </div>

        {error && (
          <pre className="mt-4 bg-red-100 text-red-600 overflow-auto p-3 rounded text-sm">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        {dateResult && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-semibold mb-2">
              Latest SIM Change
            </h3>
            <p>{dateResult.latestSimChange}</p>
          </div>
        )}

        {checkResult && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-semibold mb-2">
              SIM Swap Status
            </h3>

            <p>
              Swapped:{" "}
              <span
                className={
                  checkResult.swapped
                    ? "text-red-600 font-bold"
                    : "text-green-600 font-bold"
                }
              >
                {checkResult.swapped ? "YES" : "NO"}
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SimSwap;
