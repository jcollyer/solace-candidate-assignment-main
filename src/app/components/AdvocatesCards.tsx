import React from "react";
import { Advocate } from "@/types";
import { formattedPhone} from "@/app/utils";

export function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const {
    firstName,
    lastName,
    city,
    degree,
    specialties,
    yearsOfExperience,
    phoneNumber,
  } = advocate;

  return (
    <div className="col-span-1 flex flex-col bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white text-2xl font-semibold shadow-lg select-none">
          {`${firstName[0]}${lastName[0]}`}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {firstName} {lastName}, {degree}
          </h2>
          <p className="text-gray-600">{city}</p>
          <p className="text-sm text-indigo-600 font-medium mt-1">
            {yearsOfExperience} years experience
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Specialties</h3>
        <div className="relative">
          <ul className="text-gray-600 text-sm h-24 overflow-auto space-y-1">
            {specialties.map((spec, i) => (
              <li key={i} className="list-disc list-inside">
                {spec}
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200 text-gray-700 text-sm">
        <p>
          <span className="font-semibold">Phone:</span> {formattedPhone(phoneNumber)}
        </p>
      </div>
    </div>
  );
}

export function AdvocateCards({ advocates }: { advocates: Advocate[] }) {
  return (
    <div className="container mx-auto p-6 grid grid-cols-3 gap-4">
      {advocates.map((advocate) => (
        <AdvocateCard key={advocate.id} advocate={advocate} />
      ))}
    </div>
  );
}
