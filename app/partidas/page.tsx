// app/partidas/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCardsPartidas } from "@/components/partidas/stat-cards";
import { FiltrosPartidas, type FiltroPartida } from "@/components/partidas/filtros";
import { ListaPartidas, type Partida } from "@/components/partidas/lista-partidas";
import { FinalizarPartidaModal, type FinalizarPartidaDados } from "@/components/partidas/finalizar-partida-modal";

// Mock de partidas — substituir por fetch do Supabase
const mockPartidas: Partida[] = [
  {
    id: "1",
    data: "2025-06-01",
    horario: "08:00",
    duracaoInfo: "45min/45min",
    status: "finalizada",
    timeCasa: { nome: "Águias SC", logo: null },
    timeFora: { nome: "Leões FC", logo: null },
    golsCasa: 2,
    golsFora: 1,
    competicao: "Copa Verão 2025",
    local: "Campo Principal",
  },
  {
    id: "2",
    data: "2025-06-01",
    horario: "10:00",
    duracaoInfo: "45min/45min",
    status: "finalizada",
    timeCasa: { nome: "Panteras FC", logo: null },
    timeFora: { nome: "Trovões EC", logo: null },
    golsCasa: 1,
    golsFora: 1,
    competicao: "Copa Verão 2025",
    local: "Campo Principal",
  },
  {
    id: "3",
    data: "2025-06-08",
    horario: "09:00",
    duracaoInfo: "20min/20min",
    status: "ao_vivo",
    timeCasa: { nome: "Atl. Amazonas FC", logo: null },
    timeFora: { nome: "Amigos Cabelinho", logo: null },
    golsCasa: null,
    golsFora: null,
    competicao: "Liga Empresarial",
    local: "Quadra Coberta",
  },
];

export default function PartidasPage() {
  const router = useRouter();

  // Estado do filtro e da busca ficam aqui no page.tsx, como combinado
  const [filtro, setFiltro] = useState<FiltroPartida>("todas");
  const [busca, setBusca] = useState("");

  // Estado do modal de finalizar partida
  const [partidaParaFinalizar, setPartidaParaFinalizar] = useState<Partida | null>(null);
  const [finalizando, setFinalizando] = useState(false);

  function handleFinalizarPartida(partida: Partida) {
    setPartidaParaFinalizar(partida);
  }

  async function handleConfirmarFinalizacao(dados: FinalizarPartidaDados) {
    setFinalizando(true);
    try {
      // TODO: integrar com Supabase (atualizar placar, artilheiros, cartões e status da partida)
      console.log("Finalizar partida:", partidaParaFinalizar?.id, dados);
      setPartidaParaFinalizar(null);
    } finally {
      setFinalizando(false);
    }
  }

  const total = mockPartidas.length;
  const agendadas = mockPartidas.filter((p) => p.status === "agendada").length;
  const emCurso = mockPartidas.filter((p) => p.status === "ao_vivo").length;
  const finalizadas = mockPartidas.filter((p) => p.status === "finalizada").length;

  const buscaNormalizada = busca.trim().toLowerCase();

  const partidasFiltradas = mockPartidas
    .filter((p) => filtro === "todas" || p.status === filtro)
    .filter(
      (p) =>
        buscaNormalizada === "" ||
        p.timeCasa.nome.toLowerCase().includes(buscaNormalizada) ||
        p.timeFora.nome.toLowerCase().includes(buscaNormalizada) ||
        p.competicao.toLowerCase().includes(buscaNormalizada)
    );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Partidas"
        description="Gerencie e acompanhe todos os jogos"
        secondaryButtonLabel="Manual"
        secondaryButtonIcon={Pencil}
        onSecondaryButtonClick={() => router.push("/partidas/nova")}
        buttonLabel="Automático"
        buttonIcon={Zap}
        onButtonClick={() => router.push("/partidas/nova/automatico")}
      />

      <StatCardsPartidas
        total={total}
        agendadas={agendadas}
        emCurso={emCurso}
        finalizadas={finalizadas}
      />

      <FiltrosPartidas
        filtro={filtro}
        onChange={setFiltro}
        busca={busca}
        onBuscaChange={setBusca}
      />

      <ListaPartidas partidas={partidasFiltradas} onFinalizar={handleFinalizarPartida} />

      {partidaParaFinalizar && (
        <FinalizarPartidaModal
          isOpen={!!partidaParaFinalizar}
          timeCasa={partidaParaFinalizar.timeCasa}
          timeFora={partidaParaFinalizar.timeFora}
          jogadoresCasa={[]}
          jogadoresFora={[]}
          isLoading={finalizando}
          onConfirm={handleConfirmarFinalizacao}
          onCancel={() => setPartidaParaFinalizar(null)}
        />
      )}
    </div>
  );
}