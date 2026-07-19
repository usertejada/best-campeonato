// components/ui/form-nacionalidade.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type Nacionalidade = "BR" | "PE" | "CO";

interface NacionalidadeOption {
  value: Nacionalidade;
  label: string;
  flag: string;
}

const NACIONALIDADE_OPTIONS: NacionalidadeOption[] = [
  { value: "BR", label: "Brasileiro", flag: "🇧🇷" },
  { value: "PE", label: "Peruano", flag: "🇵🇪" },
  { value: "CO", label: "Colombiano", flag: "🇨🇴" },
];

interface FormNacionalidadeProps {
  label?: string;
  value: Nacionalidade;
  onChange: (value: Nacionalidade) => void;
  required?: boolean;
}

export function FormNacionalidade({
  label = "Nacionalidade",
  value,
  onChange,
  required,
}: FormNacionalidadeProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = NACIONALIDADE_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label className="text-[13px] font-medium text-[#1E293B]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full h-[42px] flex items-center justify-between px-3 rounded-[10px] border border-[#E5E7EB] bg-white text-[13px] text-[#1E293B] hover:border-[#CBD5E1] transition-colors"
        >
          <span className="flex items-center gap-2">
            {selected ? (
              <>
                <span className="text-[16px] leading-none">{selected.flag}</span>
                <span>{selected.label}</span>
              </>
            ) : (
              <span className="text-[#94A3B8]">Selecione a nacionalidade</span>
            )}
          </span>
          <ChevronDown
            size={16}
            className={`text-[#94A3B8] transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute z-10 mt-1.5 w-full rounded-[10px] border border-[#E5E7EB] bg-white shadow-md overflow-hidden">
            {NACIONALIDADE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-left hover:bg-[#F8FAFC] transition-colors ${
                  opt.value === value ? "bg-[#F1F3F7] font-medium text-[#1E293B]" : "text-[#334155]"
                }`}
              >
                <span className="text-[16px] leading-none">{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}