// components/artilheiros/lista-artilheiros.tsx

"use client";

import { useMemo, useState } from "react";
import { Barlow_Condensed } from "next/font/google";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"] });

export interface ArtilheiroRanking {
  id: string;
  posicao: number;
  nome: string;
  time: { nome: string; sigla: string; corCrest: string };
  gols: number;
  assistencias: number;
  emChamas?: boolean;
  // gols marcados em cada uma das últimas 5 rodadas (0 = não jogou/não marcou)
  trilhaGols: number[];
}

interface ListaArtilheirosProps {
  jogadores: ArtilheiroRanking[];
  competicoes: string[];
  competicaoSelecionada: string;
  onSelecionarCompeticao: (competicao: string) => void;
}

const CORES_POS = ["", "text-[#F5B700]", "text-[#B9C2CC]", "text-[#C97A3D]"];

function DiaTrilha({ gols }: { gols: number }) {
  const estilo =
    gols === 0
      ? "bg-[#EDEFF3] text-[#C3C9D4]"
      : gols === 1
      ? "bg-[#D2ECDD] text-[#16A34A]"
      : gols === 2
      ? "bg-[#9FDCB6] text-[#0B6B33]"
      : "bg-[#16A34A] text-white";

  return (
    <div className={`w-5 h-5 rounded-[6px] flex items-center justify-center text-[9.5px] font-extrabold ${estilo}`}>
      {gols === 0 ? "-" : gols}
    </div>
  );
}

function LinhaJogador({ jogador }: { jogador: ArtilheiroRanking }) {
  const corPos = CORES_POS[jogador.posicao] ?? "text-[#94A3B8]";

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 grid grid-cols-[24px_36px_1fr_auto] md:grid-cols-[30px_40px_1.4fr_1.6fr_90px] items-center gap-3.5 transition-all duration-150 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <div className={`font-extrabold text-[13px] text-center ${corPos}`}>{jogador.posicao}</div>

      <div
        className="w-9 h-9 rounded-[9px] flex items-center justify-center text-[12px] font-extrabold text-white shrink-0"
        style={{ backgroundColor: jogador.time.corCrest }}
      >
        {jogador.time.sigla}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 font-bold text-[13.5px] text-[#1E293B]">
          <span className="truncate">{jogador.nome}</span>
          {jogador.emChamas && (
            <span className="shrink-0 text-[10px] font-extrabold text-[#FF6247] bg-[#FFF1EE] border border-[#FFD9CE] rounded-full px-[7px] py-px">
              🔥 em chamas
            </span>
          )}
        </div>
        <p className="text-[11.5px] text-[#94A3B8]">{jogador.time.nome}</p>
      </div>

      <div className="hidden md:flex items-center gap-1.5">
        <span className="text-[10px] text-[#94A3B8] mr-0.5">últ. 5</span>
        {jogador.trilhaGols.map((g, i) => (
          <DiaTrilha key={i} gols={g} />
        ))}
      </div>

      <div className="text-right">
        <div className={`${barlow.className} text-[26px] leading-none text-[#1E293B]`}>{jogador.gols}</div>
        <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide font-bold">gols</p>
        <p className="text-[11px] text-[#94A3B8] mt-0.5">{jogador.assistencias} assist.</p>
      </div>
    </div>
  );
}

export function ListaArtilheiros({
  jogadores,
  competicoes,
  competicaoSelecionada,
  onSelecionarCompeticao,
}: ListaArtilheirosProps) {
  const [busca, setBusca] = useState("");
  const [timeSelecionado, setTimeSelecionado] = useState<string | null>(null);

  const times = useMemo(
    () => Array.from(new Set(jogadores.map((j) => j.time.nome))),
    [jogadores]
  );

  const jogadoresFiltrados = jogadores.filter((j) => {
    const passaBusca = j.nome.toLowerCase().includes(busca.toLowerCase());
    const passaTime = !timeSelecionado || j.time.nome === timeSelecionado;
    return passaBusca && passaTime;
  });

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        <select
          value={competicaoSelecionada}
          onChange={(e) => onSelecionarCompeticao(e.target.value)}
          className="h-9 border border-[#E5E7EB] rounded-[8px] px-3 text-[13px] font-medium bg-white text-[#1E293B]"
        >
          {competicoes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={() => setTimeSelecionado(null)}
          className={`h-9 px-3.5 rounded-full border text-[12.5px] font-semibold transition-colors ${
            !timeSelecionado
              ? "bg-[#4F6BED] border-[#4F6BED] text-white"
              : "bg-white border-[#E5E7EB] text-[#94A3B8]"
          }`}
        >
          Todos os times
        </button>

        {times.map((t) => (
          <button
            key={t}
            onClick={() => setTimeSelecionado(t)}
            className={`h-9 px-3.5 rounded-full border text-[12.5px] font-semibold transition-colors ${
              timeSelecionado === t
                ? "bg-[#4F6BED] border-[#4F6BED] text-white"
                : "bg-white border-[#E5E7EB] text-[#94A3B8]"
            }`}
          >
            {t}
          </button>
        ))}

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar jogador..."
          className="h-9 flex-1 min-w-[180px] border border-[#E5E7EB] rounded-[8px] px-3 text-[13px] bg-white text-[#1E293B]"
        />
      </div>

      <div className="flex flex-col gap-2">
        {jogadoresFiltrados.map((j) => (
          <LinhaJogador key={j.id} jogador={j} />
        ))}

        {jogadoresFiltrados.length === 0 && (
          <div className="text-center py-10 text-[13px] text-[#94A3B8]">
            Nenhum jogador encontrado com esse filtro.
          </div>
        )}
      </div>
    </div>
  );
}