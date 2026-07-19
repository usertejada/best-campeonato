// components/historico/resultado.tsx
import { ArrowLeft, Target, Square, FileText } from "lucide-react";

export type GolResultado = {
  jogadorNome: string;
  time: "casa" | "fora";
  minuto?: string;
};

export type CartaoAmareloResultado = {
  jogadorNome: string;
  time: "casa" | "fora";
  minuto?: string;
};

interface ResultadoPartidaProps {
  nomeCasa: string;
  nomeFora: string;
  gols?: GolResultado[];
  cartoesAmarelos?: CartaoAmareloResultado[];
  descricao?: string;
  onVoltar: () => void;
}

export function ResultadoPartida({
  nomeCasa,
  nomeFora,
  gols = [],
  cartoesAmarelos = [],
  descricao,
  onVoltar,
}: ResultadoPartidaProps) {
  function nomeDoTime(time: "casa" | "fora") {
    return time === "casa" ? nomeCasa : nomeFora;
  }

  return (
    <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-bold text-[#1E293B]">Resultado</h3>
        <button
          onClick={onVoltar}
          className="flex items-center gap-1 text-[12px] font-medium text-[#4F6BED] hover:text-[#3D5BD9] transition-colors"
        >
          <ArrowLeft size={13} />
          Voltar
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {/* Gols */}
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
            <Target size={12} />
            Gols
          </p>
          {gols.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {gols.map((gol, index) => (
                <p key={index} className="text-[12.5px] text-[#1E293B]">
                  <span className="font-medium">{gol.jogadorNome}</span>{" "}
                  <span className="text-[#94A3B8]">
                    ({nomeDoTime(gol.time)}
                    {gol.minuto ? ` · ${gol.minuto}'` : ""})
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-[#94A3B8]">Nenhum gol registrado</p>
          )}
        </div>

        {/* Cartões amarelos */}
        <div className="border-t border-[#F1F5F9] pt-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
            <Square size={11} className="fill-[#FACC15] text-[#FACC15]" />
            Cartões Amarelos
          </p>
          {cartoesAmarelos.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {cartoesAmarelos.map((cartao, index) => (
                <p key={index} className="text-[12.5px] text-[#1E293B]">
                  <span className="font-medium">{cartao.jogadorNome}</span>{" "}
                  <span className="text-[#94A3B8]">
                    ({nomeDoTime(cartao.time)}
                    {cartao.minuto ? ` · ${cartao.minuto}'` : ""})
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-[#94A3B8]">Nenhum cartão registrado</p>
          )}
        </div>

        {/* Descrição */}
        <div className="border-t border-[#F1F5F9] pt-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
            <FileText size={12} />
            Descrição
          </p>
          <p className="text-[12.5px] text-[#1E293B] leading-relaxed">
            {descricao || "Sem descrição para esta partida."}
          </p>
        </div>
      </div>
    </div>
  );
}