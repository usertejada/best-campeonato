// components/ui/form-logo-upload.tsx

"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

interface FormLogoUploadProps {
  label?: string;
  onChange?: (file: File | null) => void;
}

export function FormLogoUpload({ label = "Logo", onChange }: FormLogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPreview(url);
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
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#1E293B]">{label}</label>

      {preview ? (
        <div className="relative w-full h-[120px] rounded-[10px] border border-[#E5E7EB] overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
          <img src={preview} alt="Logo" className="max-h-full max-w-full object-contain" />
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
          <p className="text-[11px] text-[#94A3B8]">PNG, JPG, WEBP • Max. 2MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}