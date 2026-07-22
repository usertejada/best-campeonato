// app/classificacao/page.tsx

"use client";

import { useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCardsClassificacao } from "@/components/classificacao/stat-cards";
import { TabelaClassificacao, type TimeClassificacao } from "@/components/classificacao/tabela-classificacao";

// Mock de classificação — substituir por fetch do Supabase
const mockClassificacao: TimeClassificacao[] = [
  { id: "1", posicao: 1, posicaoAnterior: 1, time: { nome: "Águias SC", logo: null, corCrest: "#4F6BED" }, pontos: 22, jogos: 8, vitorias: 7, empates: 1, derrotas: 0, golsPro: 20, golsContra: 5, ultimosJogos: ["V", "V", "V", "E", "V"] },
  { id: "2", posicao: 2, posicaoAnterior: 3, time: { nome: "Panteras FC", logo: null, corCrest: "#DC2626" }, pontos: 19, jogos: 8, vitorias: 6, empates: 1, derrotas: 1, golsPro: 24, golsContra: 10, ultimosJogos: ["V", "V", "D", "V", "V"] },
  { id: "3", posicao: 3, posicaoAnterior: 2, time: { nome: "Trovões EC", logo: null, corCrest: "#CA8A04" }, pontos: 17, jogos: 8, vitorias: 5, empates: 2, derrotas: 1, golsPro: 18, golsContra: 9, ultimosJogos: ["E", "V", "V", "V", "D"] },
  { id: "4", posicao: 4, posicaoAnterior: 4, time: { nome: "Leões FC", logo: null, corCrest: "#EA580C" }, pontos: 15, jogos: 8, vitorias: 4, empates: 3, derrotas: 1, golsPro: 16, golsContra: 11, ultimosJogos: ["V", "E", "V", "E", "V"] },
  { id: "5", posicao: 5, posicaoAnterior: 6, time: { nome: "Corujas AC", logo: null, corCrest: "#7C3AED" }, pontos: 13, jogos: 8, vitorias: 4, empates: 1, derrotas: 3, golsPro: 14, golsContra: 13, ultimosJogos: ["D", "V", "V", "D", "V"] },
  { id: "6", posicao: 6, posicaoAnterior: 5, time: { nome: "Falcões EC", logo: null, corCrest: "#0891B2" }, pontos: 12, jogos: 8, vitorias: 3, empates: 3, derrotas: 2, golsPro: 13, golsContra: 12, ultimosJogos: ["E", "D", "V", "E", "V"] },
  { id: "7", posicao: 7, posicaoAnterior: 7, time: { nome: "Tubarões FC", logo: null, corCrest: "#059669" }, pontos: 10, jogos: 8, vitorias: 3, empates: 1, derrotas: 4, golsPro: 12, golsContra: 15, ultimosJogos: ["D", "V", "D", "V", "D"] },
  { id: "8", posicao: 8, posicaoAnterior: 8, time: { nome: "Amigos Cabelinho", logo: null, corCrest: "#64748B" }, pontos: 6, jogos: 8, vitorias: 1, empates: 3, derrotas: 4, golsPro: 9, golsContra: 16, ultimosJogos: ["D", "E", "D", "E", "D"] },
  { id: "9", posicao: 9, posicaoAnterior: 10, time: { nome: "Atl. Amazonas FC", logo: null, corCrest: "#0D9488" }, pontos: 4, jogos: 8, vitorias: 1, empates: 1, derrotas: 6, golsPro: 7, golsContra: 18, ultimosJogos: ["D", "D", "V", "D", "D"] },
  { id: "10", posicao: 10, posicaoAnterior: 9, time: { nome: "Vento Sul EC", logo: null, corCrest: "#B45309" }, pontos: 3, jogos: 8, vitorias: 0, empates: 3, derrotas: 5, golsPro: 6, golsContra: 20, ultimosJogos: ["D", "E", "D", "E", "D"] },
];

const competicoes = ["Liga Empresarial 2025", "Copa Verão 2025"];

export default function ClassificacaoPage() {
  const [competicao, setCompeticao] = useState(competicoes[0]);
  const [carregando, setCarregando] = useState(false);

  async function handleAtualizar() {
    setCarregando(true);
    try {
      // TODO: refetch da classificação no Supabase
      await new Promise((r) => setTimeout(r, 600));
    } finally {
      setCarregando(false);
    }
  }

  const lider = mockClassificacao[0];
  const melhorAtaque = [...mockClassificacao].sort((a, b) => b.golsPro - a.golsPro)[0];
  const melhorDefesa = [...mockClassificacao].sort((a, b) => a.golsContra - b.golsContra)[0];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Classificação"
        description={`${competicao} · Rodada 8 de 14`}
        secondaryButtonLabel="Exportar"
        secondaryButtonIcon={Download}
        onSecondaryButtonClick={() => {
          // TODO: exportar tabela em PDF/CSV
        }}
        buttonLabel={carregando ? "Atualizando..." : "Atualizar"}
        buttonIcon={RefreshCw}
        onButtonClick={handleAtualizar}
      />

      <StatCardsClassificacao
        lider={{
          nome: lider.time.nome,
          pontos: lider.pontos,
          aproveitamento: Math.round((lider.pontos / (lider.jogos * 3)) * 100),
        }}
        melhorAtaque={{ nome: melhorAtaque.time.nome, gols: melhorAtaque.golsPro }}
        melhorDefesa={{ nome: melhorDefesa.time.nome, golsSofridos: melhorDefesa.golsContra }}
        timesNaZonaRebaixamento={2}
      />

      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-3">
        <select
          value={competicao}
          onChange={(e) => setCompeticao(e.target.value)}
          className="h-9 border border-[#E5E7EB] rounded-[8px] px-3 text-[13px] font-medium bg-white text-[#1E293B]"
        >
          {competicoes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <TabelaClassificacao
        times={mockClassificacao}
        zonaClassificacao={4}
        zonaRebaixamento={2}
        onSelecionarTime={(time) => {
          // TODO: navegar para detalhes do time
          console.log("Time selecionado:", time.time.nome);
        }}
      />
    </div>
  );
}