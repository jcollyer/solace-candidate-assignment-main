"use client";

import { Advocate } from "@/types";
import { useEffect, useState } from "react";
import { Grid2x2, Table } from 'lucide-react';
import AdvocateTable from "./components/AdvocatesTable";
import { AdvocateCards } from "./components/AdvocatesCards";

const COUNT = 8;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [view, setView] = useState<"cards" | "table">("table");

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
    <>
      <header className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <h1 className="text-3xl font-bold text-gray-700 tracking-tight">
            Solace Advocates
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
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
            <div className="flex gap-1">
              <button className={`${view === "table" ? "border-indigo-300" : "border-gray-300"} border-2 rounded-md p-1 hover:bg-gray-100 transition`}>
                <Table className="text-gray-700" onClick={() => setView("table")} />
              </button>
              <button className={`${view === "cards" ? "border-indigo-300" : "border-gray-300"} border-2 rounded-md p-1 hover:bg-gray-100 transition`}>
                <Grid2x2 className="text-gray-700" onClick={() => setView("cards")} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-grow">
        <div className="flex flex-col w-full">
          {loading && (
            <div className="flex items-center justify-center w-full h-full min-h-[400px]">
              <h3 className="text-2xl text-gray-600 font-medium">Loading...</h3>
            </div>
          )}
          {!!advocates && advocates.length > 0 && (view === "cards" ? (
            <AdvocateCards advocates={advocates} />
          ) : (
            <AdvocateTable advocates={advocates} />
          ))}
          {advocates === undefined && !loading && (
            <div className="flex items-center justify-center w-full h-full min-h-[400px]">
              <h3 className="text-2xl text-gray-600 font-medium">No advocates found</h3>
            </div>
          )}
        </div>
      </main>

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
    </>
  );
}
