// components/classificacao/stat-cards.tsx

import { Trophy, TrendingUp, ShieldCheck, TriangleAlert } from "lucide-react";

interface StatCardsClassificacaoProps {
  lider: { nome: string; pontos: number; aproveitamento: number };
  melhorAtaque: { nome: string; gols: number };
  melhorDefesa: { nome: string; golsSofridos: number };
  timesNaZonaRebaixamento: number;
}

export function StatCardsClassificacao({
  lider,
  melhorAtaque,
  melhorDefesa,
  timesNaZonaRebaixamento,
}: StatCardsClassificacaoProps) {
  const cards = [
    {
      icon: Trophy,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#B45309]",
      label: "Líder",
      value: lider.nome,
      sub: `${lider.pontos} pts · ${lider.aproveitamento}% aprov.`,
    },
    {
      icon: TrendingUp,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#15803D]",
      label: "Melhor ataque",
      value: melhorAtaque.nome,
      sub: `${melhorAtaque.gols} gols marcados`,
    },
    {
      icon: ShieldCheck,
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#1D4ED8]",
      label: "Melhor defesa",
      value: melhorDefesa.nome,
      sub: `${melhorDefesa.golsSofridos} gols sofridos`,
    },
    {
      icon: TriangleAlert,
      iconBg: "bg-[#FEE2E2]",
      iconColor: "text-[#DC2626]",
      label: "Zona de rebaixamento",
      value: `${timesNaZonaRebaixamento} times`,
      sub: "últimas posições",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
        >
          <div className={`w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0 ${card.iconBg}`}>
            <card.icon size={20} className={card.iconColor} />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[#94A3B8]">{card.label}</p>
            <p className="text-[16px] font-extrabold text-[#1E293B] truncate">{card.value}</p>
            <p className="text-[11.5px] text-[#94A3B8]">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}