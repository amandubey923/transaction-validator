"use client";

import {
  Download,
  FileSpreadsheet,
} from "lucide-react";

type DownloadButtonProps = {
  onDownloadClean: () => void;
  onDownloadChunks: () => void;
};

export default function DownloadButton({
  onDownloadClean,
  onDownloadChunks,
}: DownloadButtonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <button
        onClick={onDownloadClean}
        className="
        flex items-center justify-center gap-3
        rounded-2xl
        bg-green-600
        hover:bg-green-500
        px-6 py-4
        font-medium
        transition
        "
      >
        <Download size={20} />

        Download Clean CSV
      </button>

      <button
        onClick={onDownloadChunks}
        className="
        flex items-center justify-center gap-3
        rounded-2xl
        bg-indigo-600
        hover:bg-indigo-500
        px-6 py-4
        font-medium
        transition
        "
      >
        <FileSpreadsheet size={20} />

        Download Split Files
      </button>
    </div>
  );
}