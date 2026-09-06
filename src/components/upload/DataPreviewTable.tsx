"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  SearchX,
} from "lucide-react";

import { TransactionRecord } from "@/types/transaction";
import DataSearchBar from "./DataSearchBar";
import DataFilters from "./DataFilters";

interface DataPreviewTableProps {
  data: TransactionRecord[];
}

const PAGE_SIZE = 25;

export default function DataPreviewTable({ data }: DataPreviewTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [page, setPage] = useState(1);

  const columns = useMemo(() => {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }, [data]);

  const countries = useMemo(() => {
    return [...new Set(data.map((item) => item.country).filter(Boolean))];
  }, [data]);

  const paymentModes = useMemo(() => {
    return [...new Set(data.map((item) => item.payment_mode).filter(Boolean))];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const searchMatch =
        !searchTerm ||
        String(row.order_id ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(row.customer_name ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(row.product_name ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const countryMatch =
        !selectedCountry || row.country === selectedCountry;

      const paymentMatch =
        !selectedPaymentMode || row.payment_mode === selectedPaymentMode;

      return searchMatch && countryMatch && paymentMatch;
    });
  }, [data, searchTerm, selectedCountry, selectedPaymentMode]);

  if (!data.length) return null;

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE) || 1;

  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCountry("");
    setSelectedPaymentMode("");
    setPage(1);
  };

  const startIndex = filteredData.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = Math.min(page * PAGE_SIZE, filteredData.length);

  return (
    <section id="preview-section">
      <div className="space-y-6">
        {/* Search Bar & Filter Controls */}
        <DataSearchBar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
        />

        <DataFilters
          countries={countries}
          paymentModes={paymentModes}
          selectedCountry={selectedCountry}
          selectedPaymentMode={selectedPaymentMode}
          onCountryChange={(value) => {
            setSelectedCountry(value);
            setPage(1);
          }}
          onPaymentModeChange={(value) => {
            setSelectedPaymentMode(value);
            setPage(1);
          }}
          onReset={resetFilters}
        />

        {/* Main Data Grid Container */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] overflow-hidden">
          {/* Grid Header */}
          <div className="p-4 sm:p-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Transaction Records
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Cleaned and validated transaction data
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">
                Rows: <strong className="text-white font-semibold">{filteredData.length.toLocaleString()}</strong>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">
                Columns: <strong className="text-white font-semibold">{columns.length}</strong>
              </span>
            </div>
          </div>

          {/* Data Table */}
          {filteredData.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-3">
                <SearchX size={20} />
              </div>
              <h3 className="text-sm font-medium text-white">No Matching Transactions</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No records matched your search query or filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-3.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-left text-xs min-w-[1000px]">
                <thead className="sticky top-0 bg-[#121520] z-10 border-b border-white/[0.08] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column}
                        className="px-4 py-2.5 font-medium text-slate-300 whitespace-nowrap"
                      >
                        {column.replaceAll("_", " ")}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.04] text-slate-300">
                  {paginatedData.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {columns.map((column) => {
                        const val = row[column];
                        const isNumericOrId =
                          column.includes("id") ||
                          column.includes("amount") ||
                          column.includes("price") ||
                          column.includes("quantity") ||
                          column.includes("date") ||
                          column.includes("time") ||
                          column.includes("phone");

                        return (
                          <td
                            key={column}
                            className={`px-4 py-2.5 whitespace-nowrap ${
                              isNumericOrId ? "font-mono text-slate-200" : ""
                            }`}
                          >
                            {val !== undefined && val !== null && val !== "" ? (
                              String(val)
                            ) : (
                              <span className="text-slate-600 font-mono">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredData.length > 0 && (
            <div className="border-t border-white/[0.06] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="font-mono">
                Showing <span className="text-slate-200 font-medium">{startIndex}</span>–
                <span className="text-slate-200 font-medium">{endIndex}</span> of{" "}
                <span className="text-slate-200 font-medium">{filteredData.length.toLocaleString()}</span> records
              </div>

              <div className="flex items-center gap-2 font-mono">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="
                    p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02]
                    text-slate-300 hover:text-white hover:bg-white/[0.06]
                    disabled:opacity-30 disabled:cursor-not-allowed transition-colors
                  "
                  title="Previous Page"
                >
                  <ChevronLeft size={15} />
                </button>

                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 text-xs">
                  {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="
                    p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02]
                    text-slate-300 hover:text-white hover:bg-white/[0.06]
                    disabled:opacity-30 disabled:cursor-not-allowed transition-colors
                  "
                  title="Next Page"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}