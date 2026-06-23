// components/ui/form-layout.tsx

"use client";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

interface FormLayoutProps {
  titulo: string;
  descricao: string;
  icone: LucideIcon;
  voltarPara: string;
  voltarLabel: string;
  children: React.ReactNode;
  logoUpload?: React.ReactNode;
  onSalvar: () => void;
}

export function FormLayout({
  titulo,
  descricao,
  icone: Icone,
  voltarPara,
  voltarLabel,
  children,
  logoUpload,
  onSalvar,
}: FormLayoutProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-[14px] border border-[#e9f2f9] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6">

      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#F1F5F9]">
        <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
          <Icone size={18} className="text-[#3B82F6]" />
        </div>
        <div>
          <p className="text-[15px] font-bold text-[#1E293B]">{titulo}</p>
          <p className="text-[12px] text-[#94A3B8]">{descricao}</p>
        </div>
      </div>

      {/* Corpo: logo (opcional) + campos */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Coluna esquerda — logo (só aparece se passar) */}
        {logoUpload && (
          <>
            <div className="w-full lg:w-[280px] shrink-0">
              {logoUpload}
            </div>
            <div className="hidden lg:block w-px bg-[#F1F5F9]" />
          </>
        )}

        {/* Coluna direita — campos */}
        <div className="flex-1 flex flex-col gap-5">
          {children}
        </div>

      </div>

      {/* Botões */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-[#F1F5F9]">
        <button
          onClick={() => router.push(voltarPara)}
          className="h-[38px] px-5 rounded-[8px] border border-[#E5E7EB] text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onSalvar}
          className="h-[38px] px-5 rounded-[8px] bg-[#3B82F6] text-white text-[13px] font-medium flex items-center gap-2 hover:bg-[#2563EB] transition-colors"
        >
          <Save size={14} />
          Salvar
        </button>
      </div>

    </div>
  );
}