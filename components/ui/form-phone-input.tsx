// components/ui/form-phone-input.tsx

"use client";

import { useState } from "react";

interface Pais {
  codigo: string;
  ddi: string;
  bandeira: string;
  mascara: string;
  placeholder: string;
}

const paises: Pais[] = [
  {
    codigo: "BR",
    ddi: "+55",
    bandeira: "🇧🇷",
    mascara: "(##) #####-####",
    placeholder: "(11) 99999-9999",
  },
  {
    codigo: "PE",
    ddi: "+51",
    bandeira: "🇵🇪",
    mascara: "### ### ###",
    placeholder: "999 999 999",
  },
  {
    codigo: "CO",
    ddi: "+57",
    bandeira: "🇨🇴",
    mascara: "### ### ####",
    placeholder: "300 123 4567",
  },
];

function aplicarMascara(valor: string, mascara: string): string {
  const apenasNumeros = valor.replace(/\D/g, "");
  let resultado = "";
  let indexNumero = 0;

  for (let i = 0; i < mascara.length; i++) {
    if (indexNumero >= apenasNumeros.length) break;

    if (mascara[i] === "#") {
      resultado += apenasNumeros[indexNumero];
      indexNumero++;
    } else {
      resultado += mascara[i];
    }
  }

  return resultado;
}

interface FormPhoneInputProps {
  label: string;
  required?: boolean;
  value?: string;
  paisSelecionado?: string;
  onChangeValor?: (valor: string) => void;
  onChangePais?: (pais: string) => void;
}

export function FormPhoneInput({
  label,
  required,
  value = "",
  paisSelecionado = "BR",
  onChangeValor,
  onChangePais,
}: FormPhoneInputProps) {
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const pais = paises.find((p) => p.codigo === paisSelecionado) ?? paises[0];

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatado = aplicarMascara(e.target.value, pais.mascara);
    onChangeValor?.(formatado);
  }

  function handleSelecionarPais(codigo: string) {
    onChangePais?.(codigo);
    onChangeValor?.("");
    setDropdownAberto(false);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#1E293B]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <div className="flex gap-2 relative">

        {/* Seletor de país */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownAberto((prev) => !prev)}
            className="h-[40px] px-3 rounded-[8px] border border-[#bdcdd0] bg-white flex items-center gap-2 text-[13px] text-[#1E293B] hover:border-[#3B82F6] transition-colors whitespace-nowrap"
          >
            <span className="text-[16px]">{pais.bandeira}</span>
            <span className="text-[#64748B]">{pais.ddi}</span>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-[#94A3B8]">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown de países */}
          {dropdownAberto && (
            <div className="absolute top-[44px] left-0 z-50 bg-white border border-[#E5E7EB] rounded-[10px] shadow-md py-1 min-w-[160px]">
              {paises.map((p) => (
                <button
                  key={p.codigo}
                  type="button"
                  onClick={() => handleSelecionarPais(p.codigo)}
                  className={`flex items-center gap-2.5 w-full px-4 py-2 text-[13px] transition-colors hover:bg-[#F8FAFC]
                    ${p.codigo === paisSelecionado ? "text-[#3B82F6] font-medium" : "text-[#1E293B]"}`}
                >
                  <span className="text-[16px]">{p.bandeira}</span>
                  <span>{p.ddi}</span>
                  <span className="text-[#94A3B8] text-[11px]">{p.codigo}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input do número */}
        <input
          type="tel"
          placeholder={pais.placeholder}
          value={value}
          onChange={handleInputChange}
          className="flex-1 h-[40px] px-3 rounded-[8px] border border-[#bdcdd0] text-[13px] text-[#1E293B] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
        />
      </div>
    </div>
  );
}