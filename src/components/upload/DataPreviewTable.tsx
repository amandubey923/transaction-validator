"use client";

import { useMemo, useState } from "react";

import {
  Database,
  Eye,
  Table2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { TransactionRecord } from "@/types/transaction";

import DataSearchBar from "./DataSearchBar";
import DataFilters from "./DataFilters";

interface DataPreviewTableProps {
  data: TransactionRecord[];
}

const PAGE_SIZE = 25;

export default function DataPreviewTable({
  data,
}: DataPreviewTableProps) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCountry,
    setSelectedCountry,
  ] = useState("");

  const [
    selectedPaymentMode,
    setSelectedPaymentMode,
  ] = useState("");

  const [page, setPage] =
    useState(1);

  if (!data.length) return null;

  const columns = Object.keys(data[0]);

  const countries = [
    ...new Set(
      data
        .map((item) => item.country)
        .filter(Boolean)
    ),
  ];

  const paymentModes = [
    ...new Set(
      data
        .map(
          (item) =>
            item.payment_mode
        )
        .filter(Boolean)
    ),
  ];

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const searchMatch =
        !searchTerm ||
        String(
          row.order_id ?? ""
        )
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        String(
          row.customer_name ?? ""
        )
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        String(
          row.product_name ?? ""
        )
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const countryMatch =
        !selectedCountry ||
        row.country ===
          selectedCountry;

      const paymentMatch =
        !selectedPaymentMode ||
        row.payment_mode ===
          selectedPaymentMode;

      return (
        searchMatch &&
        countryMatch &&
        paymentMatch
      );
    });
  }, [
    data,
    searchTerm,
    selectedCountry,
    selectedPaymentMode,
  ]);

  const totalPages =
    Math.ceil(
      filteredData.length /
        PAGE_SIZE
    ) || 1;

  const paginatedData =
    filteredData.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCountry("");
    setSelectedPaymentMode("");
    setPage(1);
  };

  return (
    <section id="preview-section">
      <div className="space-y-6 mt-8">
        <DataSearchBar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
        />

        <DataFilters
          countries={countries}
          paymentModes={
            paymentModes
          }
          selectedCountry={
            selectedCountry
          }
          selectedPaymentMode={
            selectedPaymentMode
          }
          onCountryChange={(
            value
          ) => {
            setSelectedCountry(
              value
            );
            setPage(1);
          }}
          onPaymentModeChange={(
            value
          ) => {
            setSelectedPaymentMode(
              value
            );
            setPage(1);
          }}
          onReset={resetFilters}
        />

        <div
          className="
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-gradient-to-br
          from-slate-900
          via-slate-950
          to-slate-900
          backdrop-blur-xl
        "
        >
          <div className="p-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div
                  className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  px-4
                  py-2
                  text-cyan-300
                  text-sm
                  mb-4
                "
                >
                  <Eye size={14} />
                  Dataset Preview
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Transaction Records
                </h2>

                <p className="text-slate-400 mt-2">
                  Search, filter and
                  inspect uploaded
                  transaction data.
                </p>
              </div>

              <div className="flex gap-4">
                <div
                  className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-5
                  py-4
                "
                >
                  <p className="text-slate-500 text-xs">
                    RECORDS
                  </p>

                  <p className="text-white text-2xl font-bold">
                    {
                      filteredData.length
                    }
                  </p>
                </div>

                <div
                  className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-5
                  py-4
                "
                >
                  <p className="text-slate-500 text-xs">
                    COLUMNS
                  </p>

                  <p className="text-cyan-400 text-2xl font-bold">
                    {
                      columns.length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-auto max-h-[700px]">
            <table className="w-full min-w-[1400px]">
              <thead className="sticky top-0 bg-slate-950 z-10">
                <tr className="border-b border-white/10">
                  {columns.map(
                    (column) => (
                      <th
                        key={column}
                        className="
                        px-5
                        py-5
                        text-left
                        text-xs
                        uppercase
                        tracking-widest
                        text-cyan-300
                        whitespace-nowrap
                      "
                      >
                        {column.replaceAll(
                          "_",
                          " "
                        )}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {paginatedData.map(
                  (
                    row,
                    index
                  ) => (
                    <tr
                      key={index}
                      className="
                      border-b
                      border-white/5
                      hover:bg-white/[0.03]
                    "
                    >
                      {columns.map(
                        (
                          column
                        ) => (
                          <td
                            key={
                              column
                            }
                            className="
                            px-5
                            py-4
                            text-sm
                            text-slate-300
                            whitespace-nowrap
                          "
                          >
                            {String(
                              row[
                                column
                              ] ??
                                "-"
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              Showing{" "}
              <span className="text-cyan-400">
                {
                  paginatedData.length
                }
              </span>{" "}
              of{" "}
              <span className="text-white">
                {
                  filteredData.length
                }
              </span>{" "}
              records
            </p>

            <div className="flex items-center gap-3">
              <button
                disabled={
                  page === 1
                }
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
                className="
                p-3
                rounded-xl
                bg-white/5
                text-white
                disabled:opacity-40
              "
              >
                <ChevronLeft
                  size={18}
                />
              </button>

              <span className="text-white">
                Page {page} /{" "}
                {totalPages}
              </span>

              <button
                disabled={
                  page ===
                  totalPages
                }
                onClick={() =>
                  setPage(
                    page + 1
                  )
                }
                className="
                p-3
                rounded-xl
                bg-white/5
                text-white
                disabled:opacity-40
              "
              >
                <ChevronRight
                  size={18}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}