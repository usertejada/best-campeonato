// components/partidas/stat-cards.tsx
import { StatCard } from "@/components/ui/stat-card";

interface StatCardsPartidasProps {
  total: number;
  agendadas: number;
  emCurso: number;
  finalizadas: number;
}

export function StatCardsPartidas({
  total,
  agendadas,
  emCurso,
  finalizadas,
}: StatCardsPartidasProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard value={total} label="Geral" color="purple" />
      <StatCard value={agendadas} label="Agendadas" color="blue" />
      <StatCard value={emCurso} label="Em Curso" color="orange" />
      <StatCard value={finalizadas} label="Finalizadas" color="green" />
    </div>
  );
}