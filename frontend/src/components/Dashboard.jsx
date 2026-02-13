const Dashboard = () => {
  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Overview
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-4 rounded shadow">
          <p>Total devices</p>
          <h3 className="text-2xl font-bold">120</h3>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Rented devices</p>
          <h3 className="text-2xl font-bold text-green-600">78</h3>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Available devices</p>
          <h3 className="text-2xl font-bold text-blue-600">34</h3>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p>Offline devices</p>
          <h3 className="text-2xl font-bold text-red-600">8</h3>
        </div>

      </div>

      <div className="bg-white rounded shadow">

        <table className="w-full border-collapse">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">device ID</th>
              <th>Status</th>
              <th>Battery</th>
              <th>Network</th>
              <th>Last Location</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3">device-001</td>
              <td>Rented</td>
              <td>82%</td>
              <td>Good</td>
              <td>Berlin</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">device-002</td>
              <td>Idle</td>
              <td>45%</td>
              <td>Weak</td>
              <td>Munich</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Dashboard;
