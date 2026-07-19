// components/partidas/filtros.tsx
import { Search, Clock, Radio, CheckCircle2, LayoutGrid } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown";
import type { StatusPartida } from "@/components/ui/badge-status";

export type FiltroPartida = "todas" | StatusPartida;

interface FiltrosPartidasProps {
  filtro: FiltroPartida;
  onChange: (filtro: FiltroPartida) => void;
  busca: string;
  onBuscaChange: (busca: string) => void;
}

const opcoesFiltro: { key: FiltroPartida; label: string; icon: React.ElementType }[] = [
  { key: "todas", label: "Todas", icon: LayoutGrid },
  { key: "agendada", label: "Agendadas", icon: Clock },
  { key: "ao_vivo", label: "Ao Vivo", icon: Radio },
  { key: "finalizada", label: "Finalizadas", icon: CheckCircle2 },
];

export function FiltrosPartidas({ filtro, onChange, busca, onBuscaChange }: FiltrosPartidasProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {/* Barra de pesquisa — cresce até o teto e encolhe fluidamente quando os filtros precisam de espaço */}
      <div className="relative flex-1 min-w-0 sm:max-w-[320px] lg:max-w-[480px]">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
        <input
          type="text"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar partida..."
          className="w-full h-9 sm:h-10 pl-9 pr-3 text-[13px] rounded-full bg-white border border-[#E5E7EB] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30 focus:border-[#4F6BED] transition-colors"
        />
      </div>

      {/* Filtros — tablet (só ícone) e desktop (com label), grudados na direita, nunca encolhem */}
      <div className="hidden sm:flex items-center gap-2 ml-auto shrink-0">
        {opcoesFiltro.map(({ key, label, icon: Icon }) => {
          const ativo = filtro === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              title={label}
              className={`flex items-center justify-center gap-1.5 text-[13px] font-semibold rounded-full w-9 h-9 lg:w-auto lg:h-auto lg:px-4 lg:py-2 transition-colors ${
                ativo
                  ? "bg-[#4F6BED] text-white"
                  : "bg-white text-[#64748B] border border-[#E5E7EB] hover:bg-[#F8FAFC]"
              }`}
            >
              <Icon size={13} />
              <span className="hidden lg:inline">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Filtros — mobile (reaproveita o DropdownMenu) */}
      <div className="sm:hidden shrink-0">
        <DropdownMenu
          items={opcoesFiltro.map(({ key, label, icon: Icon }) => ({
            label,
            icon: (
              <Icon
                size={14}
                className={filtro === key ? "text-[#4F6BED]" : "text-[#94A3B8]"}
              />
            ),
            onClick: () => onChange(key),
          }))}
        />
      </div>
    </div>
  );
}