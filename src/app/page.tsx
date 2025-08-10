"use client";

import { Advocate } from "@/types";
import { useEffect, useState } from "react";
import AdvocateTable from "./components/AdvocatesTable";

const COUNT = 8;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(total / COUNT));

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: String(COUNT) });
    if (term) params.set("term", term);

    fetch(`/api/advocates?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setAdvocates(data.rows);
        setTotal(data.total);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));

  }, [page, term]);


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
            setPage(1); // reset to first page on new search
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



      <div className="flex gap-2 sticky bottom-0 justify-center bg-white p-4 border-t border-gray-200">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-4 py-1 rounded-xl shadow-sm text-sm font-medium transition-all duration-200 
          ${page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-100 hover:bg-indigo-200 shadow-md"
            }`}
        >
          Prev
        </button>

        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-lg shadow-inner">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>{" "}
          <span className="text-xs text-gray-500">({total} results)</span>
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-4 py-1 rounded-xl shadow-sm text-sm font-medium transition-all duration-200 
          ${page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-100 hover:bg-indigo-200 shadow-md"
            }`}
        >
          Next
        </button>
      </div>
    </main>
  );
}
