"use client";

type DataPreviewTableProps = {
  data: Record<string, string>[];
};

export default function DataPreviewTable({
  data,
}: DataPreviewTableProps) {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          CSV Preview
        </h2>

        <span className="text-sm text-zinc-400">
          {data.length} Rows
        </span>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10">
              {headers.map((header) => (
                <th
                  key={header}
                  className="
                  py-4
                  px-4
                  text-left
                  text-sm
                  font-semibold
                  text-zinc-300
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 10).map((row, index) => (
              <tr
                key={index}
                className="
                border-b
                border-white/5
                hover:bg-white/5
                transition
                "
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="
                    px-4
                    py-4
                    text-sm
                    text-zinc-300
                    "
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 10 && (
        <p className="mt-4 text-sm text-zinc-500">
          Showing first 10 rows of {data.length}
        </p>
      )}
    </div>
  );
}