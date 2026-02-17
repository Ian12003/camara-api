// const Dashboard = () => {
//   return (
//     <div>

//       <h2 className="text-2xl font-semibold mb-6">
//         Overview
//       </h2>

//       <div className="grid grid-cols-4 gap-4 mb-8">

//         <div className="bg-white p-4 rounded shadow">
//           <p>Total devices</p>
//           <h3 className="text-2xl font-bold">120</h3>
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <p>Rented devices</p>
//           <h3 className="text-2xl font-bold text-green-600">78</h3>
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <p>Available devices</p>
//           <h3 className="text-2xl font-bold text-blue-600">34</h3>
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <p>Offline devices</p>
//           <h3 className="text-2xl font-bold text-red-600">8</h3>
//         </div>

//       </div>

//       <div className="bg-white rounded shadow">

//         <table className="w-full border-collapse">

//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-3 text-left">device ID</th>
//               <th>Status</th>
//               <th>Battery</th>
//               <th>Network</th>
//               <th>Last Location</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr className="border-t">
//               <td className="p-3">device-001</td>
//               <td>Rented</td>
//               <td>82%</td>
//               <td>Good</td>
//               <td>Berlin</td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-3">device-002</td>
//               <td>Idle</td>
//               <td>45%</td>
//               <td>Weak</td>
//               <td>Munich</td>
//             </tr>
//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;

import { Activity, CheckCircle, Cpu, Wifi } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* PAGE TITLE */}
      <h2 className="text-2xl font-semibold text-slate-800">Overview</h2>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL */}
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Total Devices</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">120</h3>
            </div>
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Cpu size={20} />
            </div>
          </div>
        </div>

        {/* RENTED */}
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Rented Devices</p>
              <h3 className="text-3xl font-bold text-emerald-600 mt-1">78</h3>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        {/* AVAILABLE */}
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Available Devices</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">34</h3>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Activity size={20} />
            </div>
          </div>
        </div>

        {/* OFFLINE */}
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Offline Devices</p>
              <h3 className="text-3xl font-bold text-rose-600 mt-1">8</h3>
            </div>
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
              <Wifi size={20} />
            </div>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Device Details
        </h3>

        <table className="w-full text-sm">

          <thead className="text-xs uppercase text-slate-500 border-b">
            <tr>
              <th className="text-left py-3">Device ID</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Battery</th>
              <th className="text-left py-3">Network</th>
              <th className="text-left py-3">Last Location</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="py-3 font-medium text-slate-700">device-001</td>

              <td>
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
                  Rented
                </span>
              </td>

              <td className="text-emerald-600 font-medium">82%</td>
              <td className="text-slate-700">Good</td>
              <td className="text-slate-500">Berlin</td>
            </tr>

            <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
              <td className="py-3 font-medium text-slate-700">device-002</td>

              <td>
                <span className="px-3 py-1 text-xs rounded-full bg-slate-200 text-slate-700 font-medium">
                  Idle
                </span>
              </td>

              <td className="text-amber-600 font-medium">45%</td>
              <td className="text-amber-600 font-medium">Weak</td>
              <td className="text-slate-500">Munich</td>
            </tr>

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Dashboard;