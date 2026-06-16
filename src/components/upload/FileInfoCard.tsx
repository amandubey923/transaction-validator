"use client";

import {
  FileSpreadsheet,
  Database,
  Columns3,
  HardDrive,
  Clock3,
} from "lucide-react";

import { FileInfo } from "@/types/transaction";

interface FileInfoCardProps {
  fileInfo: FileInfo | null;
}

export default function FileInfoCard({
  fileInfo,
}: FileInfoCardProps) {
  if (!fileInfo) return null;

  const stats = [
    {
      title: "Rows",
      value: fileInfo.totalRows,
      icon: Database,
      color: "text-cyan-400",
    },
    {
      title: "Columns",
      value: fileInfo.totalColumns,
      icon: Columns3,
      color: "text-violet-400",
    },
    {
      title: "File Size",
      value: fileInfo.fileSize,
      icon: HardDrive,
      color: "text-emerald-400",
    },
    {
      title: "Uploaded",
      value: fileInfo.uploadedAt,
      icon: Clock3,
      color: "text-amber-400",
    },
  ];

  return (
    <section id="file-info-section">
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
        backdrop-blur-xl
      "
      >
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-violet-500
              to-indigo-500
            "
            >
              <FileSpreadsheet
                size={30}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Uploaded File Information
              </h2>

              <p className="text-slate-400 mt-1">
                File successfully processed
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div
            className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-cyan-500/5
            p-6
            mb-6
          "
          >
            <p className="text-slate-400 text-sm mb-2">
              FILE NAME
            </p>

            <h3 className="text-xl font-semibold text-white break-all">
              {fileInfo.fileName}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon
                      size={22}
                      className={item.color}
                    />

                    <span className="text-slate-400">
                      {item.title}
                    </span>
                  </div>

                  <h4 className="text-white text-2xl font-bold break-words">
                    {item.value}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}