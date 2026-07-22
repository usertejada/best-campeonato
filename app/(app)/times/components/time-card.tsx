// app/times/components/time-card.tsx

"use client";

import { useState } from "react";
import { Users, Eye, Pencil, Trash2, ShieldAlert, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useRouter } from "next/navigation";

interface TimeCardProps {
  id: string;
  nome: string;
  logo?: string | null;
  cidade?: string;
  estado?: string;
  vitorias?: number;
  empates?: number;
  derrotas?: number;
  campeonato?: string;
  variant?: "default" | "blue" | "red" | "black";
}

export function TimeCard({
  id,
  nome,
  logo,
  cidade,
  estado,
  vitorias,
  empates,
  derrotas,
  campeonato,
  variant = "default",
}: TimeCardProps) {
  const router = useRouter();

  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  async function handleConfirmarExcluir() {
    setExcluindo(true);
    try {
      // TODO: chamar API para excluir o time
      console.log("Excluindo time:", id);
      await new Promise((r) => setTimeout(r, 1000));
      setModalExcluirAberto(false);
    } finally {
      setExcluindo(false);
    }
  }

  const menuItems = [
    {
      label: "Ver Time",
      icon: <Eye size={14} className="text-[#64748B]" />,
      onClick: () => router.push(`/times/ficha/${id}`),
    },
    {
      label: "Editar",
      icon: <Pencil size={14} className="text-[#64748B]" />,
      onClick: () => router.push(`/times/${id}`),
    },
    {
      label: "Excluir",
      icon: <Trash2 size={14} />,
      onClick: () => setModalExcluirAberto(true),
      variant: "danger" as const,
      dividerAbove: true,
    },
  ];

  const localizacao = [cidade, estado].filter(Boolean).join("-");

  return (
    <>
      <Card variant={variant} className="flex flex-col gap-3">

        {/* Topo — logo + nome + localização + dropdown */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">

            {/* Logo */}
            <div className="w-11 h-11 rounded-[10px] bg-[#F1F5F9] border border-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
              {logo ? (
                <img src={logo} alt={nome} className="w-full h-full object-contain p-0.5" />
              ) : (
                <ShieldAlert size={20} className="text-[#CBD5E1]" />
              )}
            </div>

            {/* Nome + localização */}
            <div className="min-w-0">
              <p className="text-[#1E293B] font-bold text-[15px] leading-tight truncate">{nome}</p>
              {localizacao && (
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} className="text-[#94A3B8] shrink-0" />
                  <span className="text-[12px] text-[#94A3B8]">{localizacao}</span>
                </div>
              )}
            </div>
          </div>

          <DropdownMenu items={menuItems} />
        </div>

        {/* Stats — V / E / D */}
        <div className="grid grid-cols-3 divide-x divide-[#F1F5F9] bg-[#F8FAFC] rounded-[8px] border border-[#F1F5F9]">
          {[
            { label: "V", value: vitorias },
            { label: "E", value: empates },
            { label: "D", value: derrotas },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center py-2.5 gap-0.5">
              <span className="text-[14px] font-bold text-[#1E293B]">
                {value ?? "—"}
              </span>
              <span className="text-[11px] text-[#94A3B8] font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Campeonato vinculado */}
        {campeonato && (
          <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
            <Users size={13} className="text-[#94A3B8] shrink-0" />
            {campeonato}
          </div>
        )}

      </Card>

      {/* Modal excluir */}
      <ConfirmModal
        isOpen={modalExcluirAberto}
        titulo="Excluir Time"
        descricao={`Tem certeza que deseja excluir "${nome}"? Todos os dados do time serão removidos permanentemente.`}
        dados={{
          Time: nome,
          ...(localizacao && { Localização: localizacao }),
          ...(campeonato && { Campeonato: campeonato }),
        }}
        labelConfirm="Excluir"
        labelCancel="Cancelar"
        isLoading={excluindo}
        onConfirm={handleConfirmarExcluir}
        onCancel={() => setModalExcluirAberto(false)}
      />
    </>
  );
}