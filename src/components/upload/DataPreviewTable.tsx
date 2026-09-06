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
        <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Grid Header */}
          <div className="p-6 sm:p-8 border-b border-white/[0.06]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
                  <Eye size={13} className="text-cyan-400" />
                  <span>Interactive Data Grid</span>
                  <span className="text-cyan-600">|</span>
                  <span className="text-slate-400">Paginated Preview</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Transaction Records Explorer
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Full fidelity inspection of cleaned and validated attributes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-center font-mono">
                  <span className="text-[10px] text-slate-500 uppercase block">
                    Filtered Rows
                  </span>
                  <span className="text-lg font-bold text-white">
                    {filteredData.length.toLocaleString()}
                  </span>
                </div>

                <div className="px-4 py-2.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 text-center font-mono">
                  <span className="text-[10px] text-cyan-400 uppercase block">
                    Total Attributes
                  </span>
                  <span className="text-lg font-bold text-cyan-300">
                    {columns.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dense High-Performance Data Table */}
          {filteredData.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-4">
                <SearchX size={24} />
              </div>
              <h3 className="text-base font-semibold text-white">No Matching Transactions Found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No records matched your search query or filter criteria. Try resetting the filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[650px] border-b border-white/[0.06]">
              <table className="w-full text-left text-xs min-w-[1200px]">
                <thead className="sticky top-0 bg-[#080c14] z-10 border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column}
                        className="px-5 py-3.5 font-semibold text-cyan-300/90 whitespace-nowrap"
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
                      className="hover:bg-cyan-500/[0.02] transition-colors"
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
                            className={`px-5 py-3.5 whitespace-nowrap ${
                              isNumericOrId ? "font-mono" : ""
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
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="text-slate-400 text-center sm:text-left">
                Showing <span className="text-cyan-400 font-bold">{startIndex}</span> -{" "}
                <span className="text-cyan-400 font-bold">{endIndex}</span> of{" "}
                <span className="text-white font-bold">{filteredData.length.toLocaleString()}</span> records
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="
                    p-2 rounded-xl border border-white/[0.08] bg-white/[0.03]
                    text-slate-300 hover:text-white hover:bg-white/[0.07]
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all
                  "
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white">
                  Page {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="
                    p-2 rounded-xl border border-white/[0.08] bg-white/[0.03]
                    text-slate-300 hover:text-white hover:bg-white/[0.07]
                    disabled:opacity-30 disabled:cursor-not-allowed transition-all
                  "
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}