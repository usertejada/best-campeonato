// components/ui/form-documento-upload.tsx

"use client";

import { useRef, useState } from "react";
import { FileText, ImagePlus, X } from "lucide-react";

interface FormDocumentoUploadProps {
  label?: string;
  onChange?: (file: File | null) => void;
}

export function FormDocumentoUpload({
  label = "Documento",
  onChange,
}: FormDocumentoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);

  function handleFile(file: File) {
    setFileName(file.name);

    if (file.type === "application/pdf") {
      setIsPdf(true);
      setPreview(null);
    } else {
      setIsPdf(false);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }

    onChange?.(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    setPreview(null);
    setFileName(null);
    setIsPdf(false);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const hasFile = preview || (isPdf && fileName);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#1E293B]">{label}</label>

      {hasFile ? (
        <div className="relative w-full h-[120px] rounded-[10px] border border-[#E5E7EB] overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
          {isPdf ? (
            <div className="flex flex-col items-center gap-1.5 px-3">
              <FileText size={28} className="text-[#94A3B8]" />
              <p className="text-[12px] text-[#64748B] text-center break-all line-clamp-1">
                {fileName}
              </p>
            </div>
          ) : (
            <img src={preview!} alt={label} className="max-h-full max-w-full object-contain" />
          )}
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full border border-[#E5E7EB] flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
          >
            <X size={12} className="text-red-500" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-[120px] rounded-[10px] border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[#3B82F6] hover:bg-[#F8FAFC] transition-colors"
        >
          <ImagePlus size={24} className="text-[#CBD5E1]" />
          <p className="text-[13px] text-[#3B82F6] font-medium">Clique para enviar uma imagem</p>
          <p className="text-[11px] text-[#94A3B8]">PNG, JPG, PDF • Max. 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, application/pdf"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}