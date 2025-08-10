import React from "react";
import { Advocate } from "@/types";

const AdvocateTable = ({ advocates }: { advocates: Advocate[] }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Specialties
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Experience (yrs)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {advocates.map((advocate, idx) => (
              <tr
                key={idx}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                  {advocate.firstName} {advocate.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {advocate.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {advocate.degree}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {advocate.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {advocate.yearsOfExperience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-semibold">
                  {String(advocate.phoneNumber)
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvocateTable;
