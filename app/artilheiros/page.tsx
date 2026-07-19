// app/artilheiros/page.tsx

"use client";

import { useState } from "react";
import { HeroPodio } from "@/components/artilheiros/hero-podio";
import { StatCardsArtilheiros } from "@/components/artilheiros/stat-cards";
import { ListaArtilheiros, type ArtilheiroRanking } from "@/components/artilheiros/lista-artilheiros";

// Mock de artilheiros — substituir por fetch do Supabase
const mockArtilheiros: ArtilheiroRanking[] = [
  { id: "1", posicao: 1, nome: "Marcos Silva", time: { nome: "Águias SC", sigla: "AS", corCrest: "#4F6BED" }, gols: 16, assistencias: 4, emChamas: true, trilhaGols: [2, 1, 3, 0, 1] },
  { id: "2", posicao: 2, nome: "Rafael Costa", time: { nome: "Panteras FC", sigla: "PF", corCrest: "#DC2626" }, gols: 13, assistencias: 2, trilhaGols: [1, 0, 2, 1, 0] },
  { id: "3", posicao: 3, nome: "Bruno Lima", time: { nome: "Trovões EC", sigla: "TE", corCrest: "#CA8A04" }, gols: 11, assistencias: 5, trilhaGols: [0, 1, 1, 0, 2] },
  { id: "4", posicao: 4, nome: "Diego Ferreira", time: { nome: "Leões FC", sigla: "LF", corCrest: "#EA580C" }, gols: 9, assistencias: 3, trilhaGols: [1, 0, 0, 1, 0] },
  { id: "5", posicao: 5, nome: "Thiago Souza", time: { nome: "Corujas AC", sigla: "CA", corCrest: "#7C3AED" }, gols: 7, assistencias: 1, trilhaGols: [0, 1, 0, 0, 1] },
  { id: "6", posicao: 6, nome: "Lucas Andrade", time: { nome: "Falcões EC", sigla: "FE", corCrest: "#0891B2" }, gols: 6, assistencias: 2, trilhaGols: [0, 0, 1, 0, 1] },
];

const competicoes = ["Liga Empresarial 2025", "Copa Verão 2025"];

export default function ArtilheirosPage() {
  const [competicao, setCompeticao] = useState(competicoes[0]);

  const [primeiro, segundo, terceiro] = mockArtilheiros;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7]">
      <HeroPodio
        competicao={competicao}
        rodadaAtual={8}
        rodadaTotal={14}
        primeiro={{ id: primeiro.id, nome: primeiro.nome, time: primeiro.time.nome, gols: primeiro.gols, sigla: primeiro.time.sigla, corCrest: primeiro.time.corCrest, numeroCamisa: 10 }}
        segundo={{ id: segundo.id, nome: segundo.nome, time: segundo.time.nome, gols: segundo.gols, sigla: segundo.time.sigla, corCrest: segundo.time.corCrest, numeroCamisa: 9 }}
        terceiro={{ id: terceiro.id, nome: terceiro.nome, time: terceiro.time.nome, gols: terceiro.gols, sigla: terceiro.time.sigla, corCrest: terceiro.time.corCrest, numeroCamisa: 7 }}
      />

      <div className="px-4 py-5 md:px-5 lg:px-6">
        <StatCardsArtilheiros
          artilheiro={{ nome: primeiro.nome, gols: primeiro.gols, time: primeiro.time.nome }}
          melhorMedia={{ nome: primeiro.nome, media: 2.0 }}
          hatTricks={3}
          timeMaisArtilheiro={{ nome: "Águias SC", gols: 27 }}
        />

        <ListaArtilheiros
          jogadores={mockArtilheiros}
          competicoes={competicoes}
          competicaoSelecionada={competicao}
          onSelecionarCompeticao={setCompeticao}
        />
      </div>
    </div>
  );
}