"use client";

import { Advocate } from "@/types";
import { useEffect, useState } from "react";
import AdvocateTable from "./components/AdvocatesTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/advocates")
      .then((r) => r.json())
      .then(({data}) => {
        console.log("data", data);
        setAdvocates(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);
console.log("advocates", advocates);
  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          placeholder="Type to search..."
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm transition"
        />
        <button
          onClick={() => setTerm("")}
          className="bg-indigo-100 text-gray-600 font-medium px-4 py-2 rounded-xl shadow hover:bg-indigo-200 hover:shadow-md transition"
        >
          Reset Search
        </button>
      </div>
      {!!loading && (<p className="text-gray-500">Loading advocates...</p>)}
      {!!advocates?.length && <AdvocateTable advocates={advocates} />}
    </main>
  );
}
