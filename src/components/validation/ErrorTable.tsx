"use client";

import { AlertCircle } from "lucide-react";

type ErrorRow = {
  row: number;
  orderId: string;
  field: string;
  error: string;
};

type ErrorTableProps = {
  errors: ErrorRow[];
};

export default function ErrorTable({
  errors,
}: ErrorTableProps) {
  if (!errors.length) return null;

  return (
    <div
      className="
      rounded-3xl
      border border-red-500/20
      bg-red-500/5
      p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="text-red-400" />

        <h2 className="text-xl font-semibold">
          Validation Errors
        </h2>
      </div>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3">
                Row
              </th>

              <th className="text-left py-3">
                Order ID
              </th>

              <th className="text-left py-3">
                Field
              </th>

              <th className="text-left py-3">
                Error
              </th>
            </tr>
          </thead>

          <tbody>
            {errors.map((item, index) => (
              <tr
                key={index}
                className="border-b border-white/5"
              >
                <td className="py-4">
                  {item.row}
                </td>

                <td>{item.orderId}</td>

                <td>{item.field}</td>

                <td className="text-red-400">
                  {item.error}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}