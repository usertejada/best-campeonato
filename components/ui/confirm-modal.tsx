// components/ui/confirm-modal.tsx

"use client";

import { X, AlertCircle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  titulo: string;
  descricao: string;
  dados?: Record<string, any>;
  labelConfirm?: string;
  labelCancel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  titulo,
  descricao,
  dados,
  labelConfirm = "Confirmar",
  labelCancel = "Cancelar",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  // Filtra dados vazios e formata
  const dadosFormatados = dados
    ? Object.entries(dados)
        .filter(([, value]) => value !== "" && value !== null)
        .slice(0, 5) // Mostra só os 5 primeiros
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[14px] shadow-lg w-full max-w-[400px] overflow-hidden border border-[#E5E7EB]">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FEF9C3] flex items-center justify-center">
              <AlertCircle size={16} className="text-[#CA8A04]" />
            </div>
            <h2 className="text-[15px] font-bold text-[#1E293B]">{titulo}</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-white transition-colors"
          >
            <X size={16} className="text-[#94A3B8]" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5">
          <p className="text-[13px] text-[#64748B] mb-4">{descricao}</p>

          {/* Resumo dos dados */}
          {dadosFormatados.length > 0 && (
            <div className="bg-[#F8FAFC] rounded-[8px] p-3 mb-4 border border-[#E5E7EB]">
              <p className="text-[11px] font-medium text-[#94A3B8] mb-2.5">Dados a serem salvos:</p>
              <div className="space-y-1.5">
                {dadosFormatados.map(([key, value]) => (
                  <div key={key} className="flex justify-between text-[12px]">
                    <span className="text-[#94A3B8] capitalize">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                    </span>
                    <span className="text-[#1E293B] font-medium truncate ml-2">
                      {String(value).substring(0, 30)}
                      {String(value).length > 30 ? "..." : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-[#F1F5F9] bg-[#F8FAFC]">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="h-[36px] px-4 rounded-[8px] border border-[#E5E7EB] text-[13px] font-medium text-[#64748B] hover:bg-[#F1F5F9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {labelCancel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="h-[36px] px-4 rounded-[8px] bg-[#3B82F6] text-white text-[13px] font-medium hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              labelConfirm
            )}
          </button>
        </div>

      </div>
    </div>
  );
}