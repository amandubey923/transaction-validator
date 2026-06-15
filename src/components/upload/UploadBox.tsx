"use client";

import { UploadCloud, FileSpreadsheet } from "lucide-react";
import { useRef } from "react";

type UploadBoxProps = {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
};

export default function UploadBox({
  onFileSelect,
  selectedFile,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect(file);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    onFileSelect(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="
      rounded-3xl
      border-2
      border-dashed
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-10
      text-center
      hover:border-indigo-500
      transition-all
      duration-300
      "
    >
      <UploadCloud
        size={60}
        className="mx-auto text-indigo-400"
      />

      <h2 className="mt-4 text-2xl font-bold">
        Upload CSV File
      </h2>

      <p className="mt-2 text-zinc-400">
        Drag & Drop or Select CSV File
      </p>

      <button
        onClick={() => inputRef.current?.click()}
        className="
        mt-6
        rounded-xl
        bg-indigo-600
        px-6
        py-3
        font-medium
        text-white
        hover:bg-indigo-500
        transition
        "
      >
        Choose File
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={handleChange}
      />

      {selectedFile && (
        <div className="mt-8 rounded-2xl bg-white/5 p-4 flex items-center gap-4">
          <FileSpreadsheet
            size={30}
            className="text-green-400"
          />

          <div className="text-left">
            <p className="font-medium">
              {selectedFile.name}
            </p>

            <p className="text-sm text-zinc-400">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}