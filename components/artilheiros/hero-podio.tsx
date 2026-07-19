// components/artilheiros/hero-podio.tsx

import { Barlow_Condensed } from "next/font/google";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"] });

export interface ArtilheiroPodio {
  id: string;
  nome: string;
  time: string;
  gols: number;
  sigla: string;
  corCrest: string;
  numeroCamisa: number;
}

interface HeroPodioProps {
  competicao: string;
  rodadaAtual: number;
  rodadaTotal: number;
  primeiro: ArtilheiroPodio;
  segundo: ArtilheiroPodio;
  terceiro: ArtilheiroPodio;
}

const MEDALHAS = {
  1: "bg-gradient-to-br from-[#FDE68A] to-[#F5B700] text-[#7A5200]",
  2: "bg-gradient-to-br from-[#F1F5F9] to-[#B9C2CC] text-[#475569]",
  3: "bg-gradient-to-br from-[#F0C29B] to-[#C97A3D] text-[#5C3313]",
};

function Posto({
  jogador,
  posicao,
}: {
  jogador: ArtilheiroPodio;
  posicao: 1 | 2 | 3;
}) {
  const destaque = posicao === 1;

  return (
    <div
      className={`relative flex-1 max-w-[210px] text-center rounded-t-2xl border border-white/[0.09] bg-white/[0.045] backdrop-blur-sm
        ${destaque ? "px-3.5 pt-1.5 pb-4.5 -translate-y-3.5 z-10" : "px-3.5 pt-5.5 pb-4.5"}`}
    >
      <span
        className={`${barlow.className} absolute left-1/2 -translate-x-1/2 leading-none text-white/[0.05] select-none
          ${destaque ? "text-[132px] -top-3.5" : "text-[108px] -top-1.5"}`}
      >
        {jogador.numeroCamisa}
      </span>

      <div
        className={`absolute -top-2.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-[13px] shadow-[0_3px_8px_rgba(0,0,0,0.35)] ${MEDALHAS[posicao]}`}
      >
        {posicao}
      </div>

      <div
        className={`relative z-[1] mx-auto mb-2.5 rounded-full flex items-center justify-center font-extrabold text-white border-[3px] border-white/65
          ${destaque ? "w-[82px] h-[82px] text-[23px]" : "w-16 h-16 text-[19px]"}`}
        style={{ backgroundColor: jogador.corCrest }}
      >
        {jogador.sigla}
      </div>

      <p className="relative z-[1] font-bold text-[14px] text-white mb-px">{jogador.nome}</p>
      <p className="relative z-[1] text-[11.5px] text-[#B9C4E8] mb-2.5">{jogador.time}</p>

      <div className="relative z-[1]">
        <span className={`${barlow.className} ${destaque ? "text-[48px] text-[#FFE68C]" : "text-[38px] text-white"}`}>
          {jogador.gols}
        </span>
        <br />
        <span className="text-[10.5px] text-[#8FA0D6] uppercase tracking-wide font-bold">gols</span>
      </div>

      <div
        className={`mt-4 rounded-b-sm ${destaque ? "h-5 bg-gradient-to-b from-[#F5B700] to-[#B8860020]" : "h-3.5"}`}
        style={
          !destaque
            ? {
                background:
                  posicao === 2
                    ? "linear-gradient(180deg,#B9C2CC,#8899aa20)"
                    : "linear-gradient(180deg,#C97A3D,#7a4a2020)",
              }
            : undefined
        }
      />
    </div>
  );
}

export function HeroPodio({
  competicao,
  rodadaAtual,
  rodadaTotal,
  primeiro,
  segundo,
  terceiro,
}: HeroPodioProps) {
  return (
    <div className="relative overflow-hidden pt-10 px-6 [background:radial-gradient(ellipse_900px_500px_at_50%_-10%,#223a7a_0%,#16204A_45%,#0B1330_100%)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 26px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 26px)",
        }}
      />
      <div className="spotlight-sweep pointer-events-none absolute -top-[260px] left-[6%] w-[520px] h-[680px] [animation-delay:0.4s]" />
      <div className="spotlight-sweep pointer-events-none absolute -top-[260px] right-[6%] w-[520px] h-[680px] [animation-delay:1.2s]" />

      <div className="relative max-w-[1120px] mx-auto">
        <div className="flex items-center gap-2 text-[11.5px] font-bold tracking-[1.6px] uppercase text-[#9FB3FF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6247] shadow-[0_0_0_4px_rgba(255,98,71,0.18)]" />
          Artilheiros · {competicao} · Rodada {rodadaAtual} de {rodadaTotal}
        </div>

        <h1 className="mt-2.5 mb-1 text-[28px] md:text-[36px] lg:text-[40px] font-extrabold text-white tracking-tight">
          Quem está balançando as redes
        </h1>
        <p className="text-[14px] text-[#B9C4E8] mb-2">Ranking atualizado após a última rodada</p>

        <div className="flex items-end justify-center gap-3.5 mt-7 max-w-[720px] mx-auto">
          <Posto jogador={segundo} posicao={2} />
          <Posto jogador={primeiro} posicao={1} />
          <Posto jogador={terceiro} posicao={3} />
        </div>

        <div className="h-8" />
      </div>

      <style jsx>{`
        .spotlight-sweep {
          background: conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(255, 255, 255, 0.1) 18deg, transparent 40deg);
          animation: sweep 9s ease-in-out infinite alternate;
        }
        @keyframes sweep {
          0% {
            transform: rotate(-8deg);
          }
          100% {
            transform: rotate(8deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .spotlight-sweep {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}