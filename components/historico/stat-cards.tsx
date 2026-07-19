// components/historico/stat-cards.tsx
import { StatCard } from "@/components/ui/stat-card";

interface StatCardsHistoricoProps {
  totalJogos: number;
  totalGols: number;
  totalCartoesAmarelos: number;
  mediaGolsPorJogo: number;
}

export function StatCardsHistorico({
  totalJogos,
  totalGols,
  totalCartoesAmarelos,
  mediaGolsPorJogo,
}: StatCardsHistoricoProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard value={totalJogos} label="Jogos" color="purple" />
      <StatCard value={totalGols} label="Gols" color="blue" />
      <StatCard value={totalCartoesAmarelos} label="Cartões Amarelos" color="orange" />
      <StatCard value={mediaGolsPorJogo} label="Média de Gols/Jogo" color="green" />
    </div>
  );
}