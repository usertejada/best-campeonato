// components/ui/form-documento-numero.tsx

"use client";

import { useState } from "react";
import type { Nacionalidade } from "./form-nacionalidade";

export type TipoDocumentoBR = "cpf" | "rg";

interface FormDocumentoNumeroProps {
  nacionalidade: Nacionalidade;
  value: string;
  onChange: (value: string) => void;
  tipoDocumentoBR?: TipoDocumentoBR;
  onChangeTipoDocumentoBR?: (tipo: TipoDocumentoBR) => void;
  required?: boolean;
}

// Máscaras
function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskRG(value: string) {
  return value
    .replace(/[^\dXx]/g, "")
    .slice(0, 9)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})([\dXx]{1})$/, "$1-$2");
}

function maskDNI(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

function maskCedula(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const LABELS_NACIONALIDADE: Record<Nacionalidade, string> = {
  BR: "Documento",
  PE: "DNI",
  CO: "Cédula de Ciudadanía",
};

const PLACEHOLDERS: Record<string, string> = {
  cpf: "000.000.000-00",
  rg: "00.000.000-0",
  PE: "00000000",
  CO: "0.000.000",
};

export function FormDocumentoNumero({
  nacionalidade,
  value,
  onChange,
  tipoDocumentoBR = "cpf",
  onChangeTipoDocumentoBR,
  required,
}: FormDocumentoNumeroProps) {
  function handleInputChange(raw: string) {
    if (nacionalidade === "BR") {
      const masked = tipoDocumentoBR === "cpf" ? maskCPF(raw) : maskRG(raw);
      onChange(masked);
    } else if (nacionalidade === "PE") {
      onChange(maskDNI(raw));
    } else {
      onChange(maskCedula(raw));
    }
  }

  function handleTrocarTipo(tipo: TipoDocumentoBR) {
    onChangeTipoDocumentoBR?.(tipo);
    onChange(""); // reseta valor ao trocar de tipo
  }

  const label = LABELS_NACIONALIDADE[nacionalidade];
  const placeholder =
    nacionalidade === "BR" ? PLACEHOLDERS[tipoDocumentoBR] : PLACEHOLDERS[nacionalidade];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-medium text-[#1E293B]">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {nacionalidade === "BR" && (
          <div className="flex items-center gap-1 text-[12px]">
            <button
              type="button"
              onClick={() => handleTrocarTipo("cpf")}
              className={`px-1.5 py-0.5 rounded-[6px] font-medium transition-colors ${
                tipoDocumentoBR === "cpf"
                  ? "text-[#4F6BED] bg-[#EEF1FE]"
                  : "text-[#94A3B8] hover:text-[#64748B]"
              }`}
            >
              CPF
            </button>
            <span className="text-[#E5E7EB]">/</span>
            <button
              type="button"
              onClick={() => handleTrocarTipo("rg")}
              className={`px-1.5 py-0.5 rounded-[6px] font-medium transition-colors ${
                tipoDocumentoBR === "rg"
                  ? "text-[#4F6BED] bg-[#EEF1FE]"
                  : "text-[#94A3B8] hover:text-[#64748B]"
              }`}
            >
              RG
            </button>
          </div>
        )}
      </div>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full h-[42px] px-3 rounded-[10px] border border-[#E5E7EB] bg-white text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4F6BED] transition-colors"
      />
    </div>
  );
}