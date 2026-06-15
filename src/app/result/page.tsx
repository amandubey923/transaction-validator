import AppLayout from "@/components/layout/AppLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import {
  CheckCircle2,
  AlertTriangle,
  Download,
  FileSpreadsheet,
} from "lucide-react";

export default function ResultPage() {
  return (
    <AppLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Validation Results
          </h1>

          <p className="mt-2 text-zinc-400">
            Review validation summary and download processed files.
          </p>
        </div>

        <StatsCards
          totalRecords={5000}
          validRecords={4820}
          invalidRecords={180}
          countries={12}
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" />
              <h2 className="text-xl font-semibold">
                Validation Summary
              </h2>
            </div>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Total Records
                </span>

                <span className="font-semibold">
                  5000
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Valid Records
                </span>

                <span className="text-green-400 font-semibold">
                  4820
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Invalid Records
                </span>

                <span className="text-red-400 font-semibold">
                  180
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Success Rate
                </span>

                <span className="text-cyan-400 font-semibold">
                  96.4%
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-yellow-400" />
              <h2 className="text-xl font-semibold">
                Error Breakdown
              </h2>
            </div>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">
                <span>Invalid Phone Numbers</span>
                <span className="text-red-400">
                  92
                </span>
              </div>

              <div className="flex justify-between">
                <span>Invalid Dates</span>
                <span className="text-red-400">
                  48
                </span>
              </div>

              <div className="flex justify-between">
                <span>Missing Fields</span>
                <span className="text-red-400">
                  23
                </span>
              </div>

              <div className="flex justify-between">
                <span>Duplicate Orders</span>
                <span className="text-red-400">
                  17
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Downloads
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <button className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-5 py-4 text-white font-medium hover:bg-green-500 transition">
              <Download size={20} />
              Download Clean CSV
            </button>

            <button className="flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-5 py-4 text-white font-medium hover:bg-indigo-500 transition">
              <FileSpreadsheet size={20} />
              Download Chunks
            </button>

            <button className="flex items-center justify-center gap-3 rounded-2xl bg-purple-600 px-5 py-4 text-white font-medium hover:bg-purple-500 transition">
              <Download size={20} />
              Export Report
            </button>

          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Validation Logs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 text-left">
                    Order ID
                  </th>

                  <th className="py-3 text-left">
                    Country
                  </th>

                  <th className="py-3 text-left">
                    Status
                  </th>

                  <th className="py-3 text-left">
                    Message
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b border-white/5">
                  <td className="py-4">
                    ORD001
                  </td>

                  <td>India</td>

                  <td className="text-green-400">
                    Valid
                  </td>

                  <td>
                    Passed all checks
                  </td>
                </tr>

                <tr className="border-b border-white/5">
                  <td className="py-4">
                    ORD002
                  </td>

                  <td>Singapore</td>

                  <td className="text-red-400">
                    Invalid
                  </td>

                  <td>
                    Phone number format error
                  </td>
                </tr>

                <tr>
                  <td className="py-4">
                    ORD003
                  </td>

                  <td>India</td>

                  <td className="text-red-400">
                    Invalid
                  </td>

                  <td>
                    Date format mismatch
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}