"use client";

import {
  AlertTriangle,
  XCircle,
  ShieldAlert,
} from "lucide-react";

import { ValidationError } from "@/types/transaction";

interface ErrorTableProps {
  errors: ValidationError[];
}

export default function ErrorTable({
  errors,
}: ErrorTableProps) {
  if (!errors.length) return null;

  return (
    <section id="errors-section">
      <div
        className="
        mt-8
        overflow-hidden
        rounded-[32px]
        border
        border-red-500/20
        bg-gradient-to-br
        from-slate-900
        via-slate-950
        to-slate-900
        backdrop-blur-xl
      "
      >
        <div className="p-8 border-b border-red-500/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-2
                text-red-400
                text-sm
                mb-4
              "
              >
                <ShieldAlert size={14} />
                Validation Issues
              </div>

              <h2 className="text-3xl font-bold text-white">
                Error Report
              </h2>

              <p className="text-slate-400 mt-2">
                Review failed validations and
                correct the records before
                processing.
              </p>
            </div>

            <div
              className="
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-6
              py-4
            "
            >
              <p className="text-slate-400 text-sm">
                Total Issues
              </p>

              <h3 className="text-3xl font-bold text-red-400">
                {errors.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="overflow-auto max-h-[650px]">
          <table className="w-full min-w-[1000px]">
            <thead className="sticky top-0 bg-slate-950 z-10">
              <tr className="border-b border-white/10">
                <th className="px-6 py-5 text-left text-slate-400 font-medium">
                  Row
                </th>

                <th className="px-6 py-5 text-left text-slate-400 font-medium">
                  Order ID
                </th>

                <th className="px-6 py-5 text-left text-slate-400 font-medium">
                  Field
                </th>

                <th className="px-6 py-5 text-left text-slate-400 font-medium">
                  Error Description
                </th>

                <th className="px-6 py-5 text-left text-slate-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {errors.map(
                (error, index) => (
                  <tr
                    key={index}
                    className="
                    border-b
                    border-white/5
                    hover:bg-white/[0.03]
                    transition-all
                  "
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      #{error.row}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="
                        rounded-lg
                        bg-cyan-500/10
                        px-3
                        py-1
                        text-cyan-400
                        text-sm
                      "
                      >
                        {error.order_id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="
                        rounded-lg
                        bg-yellow-500/10
                        px-3
                        py-1
                        text-yellow-400
                        text-sm
                      "
                      >
                        {error.field}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {error.message}
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-red-500/20
                        bg-red-500/10
                        px-3
                        py-1
                        text-red-400
                        text-sm
                      "
                      >
                        <XCircle size={14} />
                        Failed
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-white/10 p-6">
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <AlertTriangle
              size={16}
              className="text-amber-400"
            />

            Fix the listed issues and upload
            the corrected CSV file to achieve
            maximum validation success.
          </div>
        </div>
      </div>
    </section>
  );
}