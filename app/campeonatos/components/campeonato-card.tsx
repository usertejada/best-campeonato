// app/campeonatos/components/campeonato-card.tsx

"use client";

import { useState } from "react";
import { Trophy, Pencil, CheckCircle, Trash2, Calendar, Users, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useRouter } from "next/navigation";

interface CampeonatoCardProps {
  id: string;
  nome: string;
  descricao: string;
  status?: "em_andamento" | "finalizado" | "pendente";
  periodo?: string;
  totalTimes?: number;
  formato?: string;
  variant?: "default" | "blue" | "red" | "black";
}

const statusConfig = {
  em_andamento: { label: "Em Andamento", className: "bg-[#ECFDF5] text-[#059669]" },
  finalizado:   { label: "Finalizado",   className: "bg-[#EFF6FF] text-[#3B82F6]" },
  pendente:     { label: "Pendente",     className: "bg-[#FEF9C3] text-[#CA8A04]" },
};

export function CampeonatoCard({
  id,
  nome,
  descricao,
  status = "em_andamento",
  periodo,
  totalTimes,
  formato,
  variant = "default",
}: CampeonatoCardProps) {

  const router = useRouter();
  const { label, className } = statusConfig[status];

  const [modalFinalizarAberto, setModalFinalizarAberto] = useState(false);
  const [finalizando, setFinalizando] = useState(false);

  function handleFinalizar() {
    setModalFinalizarAberto(true);
  }

  async function handleConfirmarFinalizar() {
    setFinalizando(true);
    try {
      // TODO: chamar API para finalizar o campeonato
      console.log("Finalizando campeonato:", id);
      await new Promise((r) => setTimeout(r, 1000)); // simulação
      setModalFinalizarAberto(false);
    } finally {
      setFinalizando(false);
    }
  }

  const menuItems = [
    {
      label: "Editar",
      icon: <Pencil size={14} className="text-[#64748B]" />,
      onClick: () => router.push(`/campeonatos/${id}`),
    },
    {
      label: "Finalizar",
      icon: <CheckCircle size={14} className="text-[#64748B]" />,
      onClick: handleFinalizar,
    },
    {
      label: "Excluir",
      icon: <Trash2 size={14} />,
      onClick: () => console.log("Excluir", nome),
      variant: "danger" as const,
      dividerAbove: true,
    },
  ];

  return (
    <>
      <Card variant={variant} className="flex flex-col h-full">

        {/* Topo */}
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
            <Trophy size={18} className="text-[#94A3B8]" />
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${className}`}>
              {label}
            </span>
            <DropdownMenu items={menuItems} />
          </div>
        </div>

        {/* Nome e descrição */}
        <div className="mt-3 flex-1">
          <p className="text-[#1E293B] font-bold text-[15px]">{nome}</p>
          <p className="text-[#94A3B8] text-[12px] mt-0.5 line-clamp-2">{descricao}</p>
        </div>

        {/* Rodapé */}
        <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-col gap-1.5">
          {periodo && (
            <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
              <Calendar size={13} className="text-[#94A3B8]" /> {periodo}
            </div>
          )}
          {totalTimes !== undefined && (
            <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
              <Users size={13} className="text-[#94A3B8]" /> {totalTimes} times
            </div>
          )}
          {formato && (
            <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
              <Shield size={13} className="text-[#94A3B8]" /> {formato}
            </div>
          )}
        </div>

      </Card>

      {/* Modal de confirmação — Finalizar */}
      <ConfirmModal
        isOpen={modalFinalizarAberto}
        titulo="Finalizar Campeonato"
        descricao={`Tem certeza que deseja finalizar "${nome}"? Essa ação não poderá ser desfeita.`}
        dados={{
          Campeonato: nome,
          ...(periodo && { Período: periodo }),
          ...(totalTimes !== undefined && { Times: `${totalTimes} times` }),
          ...(formato && { Formato: formato }),
        }}
        labelConfirm="Finalizar"
        labelCancel="Cancelar"
        isLoading={finalizando}
        onConfirm={handleConfirmarFinalizar}
        onCancel={() => setModalFinalizarAberto(false)}
      />
    </>
  );
}