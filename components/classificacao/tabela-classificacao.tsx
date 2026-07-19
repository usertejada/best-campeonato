// components/classificacao/tabela-classificacao.tsx

"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Minus, ChevronDown } from "lucide-react";

export type ResultadoJogo = "V" | "E" | "D";

export interface TimeClassificacao {
  id: string;
  posicao: number;
  posicaoAnterior: number;
  time: { nome: string; logo: string | null; corCrest?: string };
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  ultimosJogos: ResultadoJogo[];
}

interface TabelaClassificacaoProps {
  times: TimeClassificacao[];
  zonaClassificacao?: number; // ex: 4 -> primeiras 4 posições
  zonaRebaixamento?: number; // ex: 2 -> últimas 2 posições
  onSelecionarTime?: (time: TimeClassificacao) => void;
}

const CORES_CREST = [
  "#4F6BED", "#DC2626", "#CA8A04", "#EA580C", "#7C3AED",
  "#0891B2", "#059669", "#64748B", "#0D9488", "#B45309",
];

function iniciais(nome: string) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function badgePosicaoClasses(posicao: number) {
  if (posicao === 1)
    return "bg-gradient-to-br from-[#FDE68A] to-[#F5B700] text-[#7A5200] shadow-[0_2px_6px_rgba(245,183,0,0.35)]";
  if (posicao === 2)
    return "bg-gradient-to-br from-[#F1F5F9] to-[#B9C2CC] text-[#475569] shadow-[0_2px_6px_rgba(148,163,184,0.35)]";
  if (posicao === 3)
    return "bg-gradient-to-br from-[#F0C29B] to-[#C97A3D] text-[#5C3313] shadow-[0_2px_6px_rgba(201,122,61,0.35)]";
  return "bg-[#F1F3F7] text-[#64748B]";
}

function TendenciaIcon({ posicao, posicaoAnterior }: { posicao: number; posicaoAnterior: number }) {
  if (posicao < posicaoAnterior) return <ArrowUp size={13} strokeWidth={3} className="text-[#16A34A]" />;
  if (posicao > posicaoAnterior) return <ArrowDown size={13} strokeWidth={3} className="text-[#DC2626]" />;
  return <Minus size={13} strokeWidth={3} className="text-[#CBD5E1]" />;
}

function FormPill({ resultado }: { resultado: ResultadoJogo }) {
  const config = {
    V: { bg: "bg-[#16A34A]", label: "Vitória" },
    E: { bg: "bg-[#CA8A04]", label: "Empate" },
    D: { bg: "bg-[#DC2626]", label: "Derrota" },
  }[resultado];

  return (
    <div
      title={config.label}
      className={`w-5 h-5 rounded-[5px] ${config.bg} text-white text-[9.5px] font-extrabold flex items-center justify-center transition-transform duration-150 hover:scale-[1.18]`}
    >
      {resultado}
    </div>
  );
}

function CardClassificacaoMobile({
  t,
  idx,
  totalTimes,
  zonaClassificacao,
  zonaRebaixamento,
  onSelecionarTime,
}: {
  t: TimeClassificacao;
  idx: number;
  totalTimes: number;
  zonaClassificacao: number;
  zonaRebaixamento: number;
  onSelecionarTime?: (time: TimeClassificacao) => void;
}) {
  const [aberto, setAberto] = useState(false);

  const saldoGols = t.golsPro - t.golsContra;
  const aproveitamento = t.jogos > 0 ? Math.round((t.pontos / (t.jogos * 3)) * 100) : 0;
  const naZonaClassificacao = t.posicao <= zonaClassificacao;
  const naZonaRebaixamento = t.posicao > totalTimes - zonaRebaixamento;
  const corCrest = t.time.corCrest ?? CORES_CREST[idx % CORES_CREST.length];
  const corBorda = naZonaClassificacao ? "#16A34A" : naZonaRebaixamento ? "#DC2626" : "#E5E7EB";

  return (
    <div
      className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden"
      style={{ borderLeft: `3px solid ${corBorda}` }}
    >
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="w-full flex items-center gap-3 px-3.5 py-3 text-left"
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-[12.5px] shrink-0 ${badgePosicaoClasses(
            t.posicao
          )}`}
        >
          {t.posicao}
        </div>

        <div
          className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[11px] font-extrabold text-white shrink-0"
          style={{ backgroundColor: corCrest }}
        >
          {iniciais(t.time.nome)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[13.5px] text-[#1E293B] truncate">{t.time.nome}</p>
          <p className="text-[11.5px] text-[#94A3B8]">
            {t.pontos} pts · {aproveitamento}% aprov.
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`text-[#94A3B8] shrink-0 transition-transform duration-200 ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      <div className="grid grid-cols-5 gap-1 px-3.5 pb-3 border-t border-[#F1F3F7] pt-2.5">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase">P</p>
          <p className="text-[14px] font-extrabold text-[#1E293B]">{t.pontos}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase">J</p>
          <p className="text-[14px] font-bold text-[#94A3B8]">{t.jogos}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase">V</p>
          <p className="text-[14px] font-bold text-[#16A34A]">{t.vitorias}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase">E</p>
          <p className="text-[14px] font-bold text-[#CA8A04]">{t.empates}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase">D</p>
          <p className="text-[14px] font-bold text-[#DC2626]">{t.derrotas}</p>
        </div>
      </div>

      {aberto && (
        <div className="px-3.5 pb-3.5 border-t border-[#F1F3F7] pt-3">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="border border-[#E5E7EB] rounded-[10px] py-2 text-center">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase">GP</p>
              <p className="text-[14px] font-extrabold text-[#1E293B]">{t.golsPro}</p>
            </div>
            <div className="border border-[#E5E7EB] rounded-[10px] py-2 text-center">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase">GC</p>
              <p className="text-[14px] font-extrabold text-[#1E293B]">{t.golsContra}</p>
            </div>
            <div className="border border-[#E5E7EB] rounded-[10px] py-2 text-center">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase">SG</p>
              <p className={`text-[14px] font-extrabold ${saldoGols >= 0 ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                {saldoGols > 0 ? `+${saldoGols}` : saldoGols}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-2 bg-[#F1F3F7] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4F6BED] to-[#7C93F2] transition-[width] duration-700 ease-out"
                style={{ width: `${aproveitamento}%` }}
              />
            </div>
            <span className="text-[12px] font-bold text-[#4F6BED] w-9 text-right">{aproveitamento}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            {t.ultimosJogos.map((r, i) => (
              <FormPill key={i} resultado={r} />
            ))}
          </div>

          {onSelecionarTime && (
            <button
              type="button"
              onClick={() => onSelecionarTime(t)}
              className="mt-3 w-full h-9 rounded-[8px] border border-[#E5E7EB] text-[12.5px] font-semibold text-[#4F6BED]"
            >
              Ver detalhes do time
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function TabelaClassificacao({
  times,
  zonaClassificacao = 4,
  zonaRebaixamento = 2,
  onSelecionarTime,
}: TabelaClassificacaoProps) {
  const totalTimes = times.length;

  return (
    <>
      {/* Mobile / tablet: cards em accordion */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        {times.map((t, idx) => (
          <CardClassificacaoMobile
            key={t.id}
            t={t}
            idx={idx}
            totalTimes={totalTimes}
            zonaClassificacao={zonaClassificacao}
            zonaRebaixamento={zonaRebaixamento}
            onSelecionarTime={onSelecionarTime}
          />
        ))}

        <div className="flex items-center gap-4 px-1 py-2 text-[11px] text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#16A34A]" /> Classificação
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#DC2626]" /> Rebaixamento
          </span>
        </div>
      </div>

      {/* Desktop: tabela completa */}
      <div className="hidden lg:block bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[880px]">
          <thead>
            <tr className="bg-[#FAFBFC] border-b border-[#E5E7EB]">
              <th className="text-left text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5 w-[76px]">
                Pos
              </th>
              <th className="text-left text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">
                Time
              </th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">P</th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">J</th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">V</th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">E</th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">D</th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">GP</th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">GC</th>
              <th className="text-center text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5">SG</th>
              <th className="text-left text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5 w-[110px]">
                Aproveit.
              </th>
              <th className="text-left text-[11px] font-bold text-[#94A3B8] uppercase tracking-wide py-3.5 px-2.5 w-[140px]">
                Últimos 5
              </th>
            </tr>
          </thead>
          <tbody>
            {times.map((t, idx) => {
              const saldoGols = t.golsPro - t.golsContra;
              const aproveitamento = t.jogos > 0 ? Math.round((t.pontos / (t.jogos * 3)) * 100) : 0;
              const naZonaClassificacao = t.posicao <= zonaClassificacao;
              const naZonaRebaixamento = t.posicao > totalTimes - zonaRebaixamento;
              const corCrest = t.time.corCrest ?? CORES_CREST[idx % CORES_CREST.length];

              return (
                <tr
                  key={t.id}
                  onClick={() => onSelecionarTime?.(t)}
                  className={`border-b border-[#F1F3F7] last:border-b-0 cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC]
                    ${naZonaClassificacao ? "shadow-[inset_3px_0_0_0_#16A34A]" : ""}
                    ${naZonaRebaixamento ? "shadow-[inset_3px_0_0_0_#DC2626]" : ""}`}
                >
                  <td className="py-3 px-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-[26px] h-[26px] rounded-full flex items-center justify-center font-extrabold text-[12.5px] ${badgePosicaoClasses(
                          t.posicao
                        )}`}
                      >
                        {t.posicao}
                      </div>
                      <div className="w-4 h-4 flex items-center justify-center">
                        <TendenciaIcon posicao={t.posicao} posicaoAnterior={t.posicaoAnterior} />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-2.5">
                    <div className="flex items-center gap-2.5 font-semibold text-[13.5px] text-[#1E293B]">
                      <div
                        className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center text-[11px] font-extrabold text-white shrink-0"
                        style={{ backgroundColor: corCrest }}
                      >
                        {iniciais(t.time.nome)}
                      </div>
                      {t.time.nome}
                    </div>
                  </td>

                  <td className="py-3 px-2.5 text-center font-extrabold text-[14px] text-[#1E293B]">{t.pontos}</td>
                  <td className="py-3 px-2.5 text-center text-[13.5px] text-[#94A3B8]">{t.jogos}</td>
                  <td className="py-3 px-2.5 text-center text-[13.5px] font-bold text-[#16A34A]">{t.vitorias}</td>
                  <td className="py-3 px-2.5 text-center text-[13.5px] font-bold text-[#CA8A04]">{t.empates}</td>
                  <td className="py-3 px-2.5 text-center text-[13.5px] font-bold text-[#DC2626]">{t.derrotas}</td>
                  <td className="py-3 px-2.5 text-center text-[13.5px] text-[#94A3B8]">{t.golsPro}</td>
                  <td className="py-3 px-2.5 text-center text-[13.5px] text-[#94A3B8]">{t.golsContra}</td>
                  <td
                    className={`py-3 px-2.5 text-center text-[13.5px] font-bold ${
                      saldoGols >= 0 ? "text-[#16A34A]" : "text-[#DC2626]"
                    }`}
                  >
                    {saldoGols > 0 ? `+${saldoGols}` : saldoGols}
                  </td>

                  <td className="py-3 px-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#F1F3F7] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#4F6BED] to-[#7C93F2] transition-[width] duration-700 ease-out"
                          style={{ width: `${aproveitamento}%` }}
                        />
                      </div>
                      <span className="text-[12px] font-bold text-[#4F6BED] w-8">{aproveitamento}%</span>
                    </div>
                  </td>

                  <td className="py-3 px-2.5">
                    <div className="flex items-center gap-1">
                      {t.ultimosJogos.map((r, i) => (
                        <FormPill key={i} resultado={r} />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-5 px-4 py-3 border-t border-[#F1F3F7] text-[11.5px] text-[#94A3B8]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[3px] bg-[#16A34A]" /> Zona de classificação
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-[3px] bg-[#DC2626]" /> Zona de rebaixamento
        </span>
      </div>
      </div>
    </>
  );
}