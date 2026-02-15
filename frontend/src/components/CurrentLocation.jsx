import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const API_ROOT = "http://localhost:9091/location-verification/v3";

const locations=[
  { lat: 26.1445, lon: 91.7362 },
  { lat: 26.1500, lon: 91.7400 },
  { lat: 26.1300, lon: 91.7200 },
]

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
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const verifyLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_ROOT}/verify`,
        {
          device: {
            phoneNumber: "+123456789",
          },
          area: {
            areaType: "CIRCLE",
            center: {
              latitude: locations[0].lat,
              longitude: locations[0].lon,
            },
            radius: 50000,
          },
          maxAge: 120,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-correlator": "b4333c46-49c0-4f62-80d7-f0ef930f1c46",
            // If needed:
            // Authorization: `Bearer ${yourToken}`
          },
        },
      );

      setVerificationResult(response.data);
    }  catch (err) {
    setError(
      err.response?.data?.message ||
      err.response?.data?.code ||
      err.message
    );
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Location Verification
        </h2>

        <button
          onClick={verifyLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="h-80 bg-gray-200 rounded-lg  text-gray-500 font-medium overflow-hidden">
          <iframe
            title="map"
            width="100%"
            height="100%"
            src={`https://maps.google.com/maps?q=${locations[0].lat},${locations[0].lon}&z=13&output=embed`}
          />
        </div>
      </div>

      {/* API Result Card */}
      {verificationResult && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <p className="text-lg font-semibold mb-2">Verification Result</p>
          <p>
            <strong>Status:</strong> {verificationResult.verificationResult}
          </p>
          <p>
            <strong>Match Rate:</strong> {verificationResult.matchRate}%
          </p>
          <p>
            <strong>Last Location Time:</strong>{" "}
            {verificationResult.lastLocationTime}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 transition-opacity duration-500">
          Error: {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total Location Check</p>
          <h3 className="text-2xl font-bold mt-2">5000</h3>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Match Rate</p>
          <h3 className="text-2xl font-bold text-green-500 mt-2">92%</h3>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Mismatch Rate</p>
          <h3 className="text-2xl font-bold text-red-500 mt-2">8%</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-gray-700 font-medium mb-4">
            GPS vs Network mismatch
          </h4>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mismatchData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                fill="#fecaca"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-gray-700 font-medium mb-4">
            Location accuracy levels
          </h4>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={accuracyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CurrentLocation;
