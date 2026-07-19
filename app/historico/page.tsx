// app/historico/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCardsHistorico } from "@/components/historico/stat-cards";
import { ListaPartidas, type Partida } from "@/components/historico/lista-partidas";
import { Paginacao } from "@/components/historico/paginacao";

const ITENS_POR_PAGINA = 2; // TODO: voltar para 6 (ou valor real) depois do teste visual

// Mock de partidas — substituir por fetch do Supabase (histórico só traz finalizadas)
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
    gols: [
      { jogadorNome: "Carlos Silva", time: "casa", minuto: "12" },
      { jogadorNome: "Carlos Silva", time: "casa", minuto: "38" },
      { jogadorNome: "Rafael Souza", time: "fora", minuto: "60" },
    ],
    cartoesAmarelos: [{ jogadorNome: "Diego Lima", time: "fora", minuto: "45" }],
    descricao: "Partida equilibrada, decidida com um gol no segundo tempo.",
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
    gols: [
      { jogadorNome: "Marcos Andrade", time: "casa", minuto: "20" },
      { jogadorNome: "Bruno Costa", time: "fora", minuto: "77" },
    ],
    cartoesAmarelos: [],
    descricao: "Empate justo entre dois times equilibrados.",
  },
  {
    id: "3",
    data: "2025-06-08",
    horario: "09:00",
    duracaoInfo: "20min/20min",
    status: "finalizada",
    timeCasa: { nome: "Atl. Amazonas FC", logo: null },
    timeFora: { nome: "Amigos Cabelinho", logo: null },
    golsCasa: 3,
    golsFora: 2,
    competicao: "Liga Empresarial",
    local: "Quadra Coberta",
    gols: [
      { jogadorNome: "Pedro Alves", time: "casa", minuto: "5" },
      { jogadorNome: "Pedro Alves", time: "casa", minuto: "15" },
      { jogadorNome: "Lucas Ferreira", time: "casa", minuto: "18" },
      { jogadorNome: "João Pereira", time: "fora", minuto: "10" },
      { jogadorNome: "João Pereira", time: "fora", minuto: "19" },
    ],
    cartoesAmarelos: [
      { jogadorNome: "João Pereira", time: "fora", minuto: "19" },
      { jogadorNome: "Lucas Ferreira", time: "casa", minuto: "20" },
    ],
    descricao: "Jogo movimentado com gols nos minutos finais de cada tempo.",
  },
];

export default function HistoricoPage() {
  const router = useRouter();

  // Busca e paginação ficam aqui no page.tsx, como combinado
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const totalJogos = mockPartidas.length;
  const totalGols = mockPartidas.reduce((soma, p) => soma + (p.gols?.length ?? 0), 0);
  const totalCartoesAmarelos = mockPartidas.reduce(
    (soma, p) => soma + (p.cartoesAmarelos?.length ?? 0),
    0
  );
  const mediaGolsPorJogo = totalJogos > 0 ? Number((totalGols / totalJogos).toFixed(1)) : 0;

  const buscaNormalizada = busca.trim().toLowerCase();

  const partidasFiltradas = mockPartidas.filter(
    (p) =>
      buscaNormalizada === "" ||
      p.timeCasa.nome.toLowerCase().includes(buscaNormalizada) ||
      p.timeFora.nome.toLowerCase().includes(buscaNormalizada) ||
      p.competicao.toLowerCase().includes(buscaNormalizada)
  );

  const totalPaginas = Math.max(1, Math.ceil(partidasFiltradas.length / ITENS_POR_PAGINA));
  const partidasDaPagina = partidasFiltradas.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Histórico"
        description="Consulte todas as partidas já realizadas"
        buttonLabel="Resultado"
        buttonIcon={Trophy}
        onButtonClick={() => router.push("/historico/resultado")}
      />

      <StatCardsHistorico
        totalJogos={totalJogos}
        totalGols={totalGols}
        totalCartoesAmarelos={totalCartoesAmarelos}
        mediaGolsPorJogo={mediaGolsPorJogo}
      />

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPaginaAtual(1);
          }}
          placeholder="Buscar partida..."
          className="flex-1 min-w-0 sm:max-w-[320px] lg:max-w-[480px] h-9 sm:h-10 px-4 text-[13px] rounded-full bg-white border border-[#E5E7EB] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F6BED]/30 focus:border-[#4F6BED] transition-colors"
        />

        <div className="ml-auto shrink-0">
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onChange={setPaginaAtual}
          />
        </div>
      </div>

      <ListaPartidas partidas={partidasDaPagina} />
    </div>
  );
}