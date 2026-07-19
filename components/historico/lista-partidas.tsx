// components/historico/lista-partidas.tsx

"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Trophy, Shield, ClipboardList } from "lucide-react";
import { BadgeStatus, type StatusPartida } from "@/components/ui/badge-status";
import {
  ResultadoPartida,
  type GolResultado,
  type CartaoAmareloResultado,
} from "@/components/historico/resultado";

export type Partida = {
  id: string;
  data: string; // ISO yyyy-mm-dd
  horario: string;
  duracaoInfo: string;
  status: StatusPartida;
  timeCasa: { nome: string; logo: string | null };
  timeFora: { nome: string; logo: string | null };
  golsCasa: number | null;
  golsFora: number | null;
  competicao: string;
  local: string;
  gols?: GolResultado[];
  cartoesAmarelos?: CartaoAmareloResultado[];
  descricao?: string;
};

interface ListaPartidasProps {
  partidas: Partida[];
}

function formatarDataLonga(data: string) {
  const date = new Date(`${data}T00:00:00`);
  const formatado = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  // "domingo, 01 de junho de 2025" -> "Dom., 01 De Junho De 2025"
  return formatado
    .split(", ")
    .map((parte, i) =>
      i === 0
        ? parte.slice(0, 3).charAt(0).toUpperCase() + parte.slice(1, 3) + "."
        : parte
            .split(" ")
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ")
    )
    .join(", ");
}

function AvatarTime({ nome, logo }: { nome: string; logo: string | null }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={nome}
        className="w-12 h-12 rounded-full object-cover border border-[#E5E7EB]"
      />
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-[#F1F5F9] border border-[#E5E7EB] flex items-center justify-center shrink-0">
      <Shield size={20} className="text-[#CBD5E1]" />
    </div>
  );
}

function CardPartida({ partida }: { partida: Partida }) {
  const [virado, setVirado] = useState(false);

  return (
    <div className="[perspective:1200px]">
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          virado ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Frente */}
        <div className="[backface-visibility:hidden] bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4">
          <div className="flex items-center justify-between mb-4">
            <BadgeStatus status={partida.status} />
            <span className="flex items-center gap-1 text-[12px] text-[#94A3B8]">
              <Clock size={12} />
              {partida.horario} · {partida.duracaoInfo}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
              <AvatarTime nome={partida.timeCasa.nome} logo={partida.timeCasa.logo} />
              <span className="text-[13px] font-semibold text-[#1E293B] text-center leading-tight truncate w-full">
                {partida.timeCasa.nome}
              </span>
              {partida.status !== "agendada" && (
                <span className="text-[20px] font-extrabold text-[#EF4444]">
                  {partida.golsCasa}
                </span>
              )}
            </div>

            <span className="text-[12px] font-medium text-[#CBD5E1] px-2">
              {partida.status === "agendada" ? "vs" : "×"}
            </span>

            <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
              <AvatarTime nome={partida.timeFora.nome} logo={partida.timeFora.logo} />
              <span className="text-[13px] font-semibold text-[#1E293B] text-center leading-tight truncate w-full">
                {partida.timeFora.nome}
              </span>
              {partida.status !== "agendada" && (
                <span className="text-[20px] font-extrabold text-[#EF4444]">
                  {partida.golsFora}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex items-center gap-1 text-[12px] text-[#94A3B8] truncate">
                <Trophy size={12} />
                {partida.competicao}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-[#94A3B8] truncate">
                <MapPin size={12} />
                {partida.local}
              </span>
            </div>

            {partida.status === "finalizada" && (
              <button
                onClick={() => setVirado(true)}
                className="flex items-center gap-1 shrink-0 text-[12px] font-medium text-[#4F6BED] hover:text-[#3D5BD9] transition-colors"
              >
                <ClipboardList size={13} />
                Resultado
              </button>
            )}
          </div>
        </div>

        {/* Verso */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <ResultadoPartida
            nomeCasa={partida.timeCasa.nome}
            nomeFora={partida.timeFora.nome}
            gols={partida.gols}
            cartoesAmarelos={partida.cartoesAmarelos}
            descricao={partida.descricao}
            onVoltar={() => setVirado(false)}
          />
        </div>
      </div>
    </div>
  );
}

export function ListaPartidas({ partidas }: ListaPartidasProps) {
  // Agrupar partidas por data
  const partidasPorData = partidas.reduce<Record<string, Partida[]>>((acc, partida) => {
    if (!acc[partida.data]) acc[partida.data] = [];
    acc[partida.data].push(partida);
    return acc;
  }, {});

  const datasOrdenadas = Object.keys(partidasPorData).sort();

  if (datasOrdenadas.length === 0) {
    return (
      <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center py-14 gap-2">
        <Calendar size={28} className="text-[#CBD5E1]" />
        <p className="text-[13px] text-[#94A3B8]">Nenhuma partida encontrada</p>
      </div>
    );
  }

  return (
    <>
      {datasOrdenadas.map((data) => {
        const partidasDoDia = partidasPorData[data];
        return (
          <div key={data} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1E293B] bg-white border border-[#E5E7EB] rounded-full px-3.5 py-1.5">
                <Calendar size={13} className="text-[#4F6BED]" />
                {formatarDataLonga(data)}
              </span>
              <span className="text-[12px] text-[#94A3B8]">
                {partidasDoDia.length} {partidasDoDia.length === 1 ? "jogo" : "jogos"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
              {partidasDoDia.map((partida) => (
                <CardPartida key={partida.id} partida={partida} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}