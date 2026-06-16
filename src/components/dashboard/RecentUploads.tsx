"use client";

import {
  History,
  FileSpreadsheet,
  Clock3,
} from "lucide-react";

import { UploadHistory } from "@/types/transaction";

interface RecentUploadsProps {
  uploads: UploadHistory[];
}

export default function RecentUploads({
  uploads,
}: RecentUploadsProps) {
  if (!uploads.length) return null;

  return (
    <section id="recent-uploads-section">
      <div
        className="
        mt-8
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-slate-900
        via-slate-950
        to-slate-900
      "
      >
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-violet-500
              to-indigo-500
            "
            >
              <History
                size={26}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Recent Uploads
              </h2>

              <p className="text-slate-400">
                Last uploaded transaction
                files
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            {uploads.map(
              (upload, index) => (
                <div
                  key={`${upload.fileName}-${index}`}
                  className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-500/10
                    "
                    >
                      <FileSpreadsheet
                        size={22}
                        className="text-cyan-400"
                      />
                    </div>

                    <div>
                      <h4 className="text-white font-medium break-all">
                        {upload.fileName}
                      </h4>

                      <p className="text-slate-500 text-sm">
                        Transaction Dataset
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock3 size={14} />

                    {upload.uploadedAt}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}