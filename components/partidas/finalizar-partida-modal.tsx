// components/partidas/finalizar-partida-modal.tsx

"use client";

import { useState } from "react";
import { X, Trophy, Plus, Trash2, Square } from "lucide-react";
import { FormSelect } from "@/components/ui/form-select";
import { FormInput } from "@/components/ui/form-input";

interface TimeInfo {
  nome: string;
}

interface JogadorOption {
  value: string;
  label: string;
}

interface GolEvento {
  id: string;
  time: "casa" | "fora";
  jogadorId: string;
  jogadorNome: string;
  minuto: string;
}

interface CartaoEvento {
  id: string;
  time: "casa" | "fora";
  jogadorId: string;
  jogadorNome: string;
  tipo: "amarelo" | "vermelho";
  minuto: string;
}

export interface FinalizarPartidaDados {
  golsCasa: number;
  golsFora: number;
  artilheiros: GolEvento[];
  cartoes: CartaoEvento[];
}

interface FinalizarPartidaModalProps {
  isOpen: boolean;
  timeCasa: TimeInfo;
  timeFora: TimeInfo;
  jogadoresCasa: JogadorOption[];
  jogadoresFora: JogadorOption[];
  isLoading?: boolean;
  onConfirm: (dados: FinalizarPartidaDados) => void;
  onCancel: () => void;
}

const tipoCartaoOptions = [
  { value: "amarelo", label: "Amarelo" },
  { value: "vermelho", label: "Vermelho" },
];

export function FinalizarPartidaModal({
  isOpen,
  timeCasa,
  timeFora,
  jogadoresCasa,
  jogadoresFora,
  isLoading = false,
  onConfirm,
  onCancel,
}: FinalizarPartidaModalProps) {
  const [placarCasa, setPlacarCasa] = useState("");
  const [placarFora, setPlacarFora] = useState("");

  const [gols, setGols] = useState<GolEvento[]>([]);
  const [golAtual, setGolAtual] = useState({ time: "casa" as "casa" | "fora", jogador: "", minuto: "" });

  const [cartoes, setCartoes] = useState<CartaoEvento[]>([]);
  const [cartaoAtual, setCartaoAtual] = useState({
    time: "casa" as "casa" | "fora",
    jogador: "",
    tipo: "" as "" | "amarelo" | "vermelho",
    minuto: "",
  });

  if (!isOpen) return null;

  const timeOptions = [
    { value: "casa", label: timeCasa.nome },
    { value: "fora", label: timeFora.nome },
  ];

  function jogadoresDoTime(time: "casa" | "fora") {
    return time === "casa" ? jogadoresCasa : jogadoresFora;
  }

  function nomeJogador(time: "casa" | "fora", jogadorId: string) {
    return jogadoresDoTime(time).find((j) => j.value === jogadorId)?.label ?? jogadorId;
  }

  function adicionarGol() {
    if (!golAtual.jogador) return;
    setGols((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        time: golAtual.time,
        jogadorId: golAtual.jogador,
        jogadorNome: nomeJogador(golAtual.time, golAtual.jogador),
        minuto: golAtual.minuto,
      },
    ]);
    setGolAtual({ time: golAtual.time, jogador: "", minuto: "" });
  }

  function removerGol(id: string) {
    setGols((prev) => prev.filter((g) => g.id !== id));
  }

  function adicionarCartao() {
    if (!cartaoAtual.jogador || !cartaoAtual.tipo) return;
    setCartoes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        time: cartaoAtual.time,
        jogadorId: cartaoAtual.jogador,
        jogadorNome: nomeJogador(cartaoAtual.time, cartaoAtual.jogador),
        tipo: cartaoAtual.tipo as "amarelo" | "vermelho",
        minuto: cartaoAtual.minuto,
      },
    ]);
    setCartaoAtual({ time: cartaoAtual.time, jogador: "", tipo: "", minuto: "" });
  }

  function removerCartao(id: string) {
    setCartoes((prev) => prev.filter((c) => c.id !== id));
  }

  function handleConfirm() {
    onConfirm({
      golsCasa: Number(placarCasa) || 0,
      golsFora: Number(placarFora) || 0,
      artilheiros: gols,
      cartoes,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[14px] shadow-lg w-full max-w-[560px] max-h-[90vh] overflow-hidden border border-[#E5E7EB] flex flex-col">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9] bg-[#F8FAFC] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center">
              <Trophy size={16} className="text-[#16A34A]" />
            </div>
            <h2 className="text-[15px] font-bold text-[#1E293B]">Finalizar Partida</h2>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-white transition-colors">
            <X size={16} className="text-[#94A3B8]" />
          </button>
        </div>

        {/* Corpo (scrollável) */}
        <div className="p-5 overflow-y-auto flex flex-col gap-5">

          {/* Placar */}
          <div>
            <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-3">
              Placar Final
            </p>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
              <FormInput
                label={timeCasa.nome}
                type="number"
                placeholder="0"
                value={placarCasa}
                onChange={(e) => setPlacarCasa(e.target.value)}
              />
              <span className="h-[40px] flex items-center text-[13px] font-bold text-[#94A3B8]">
                X
              </span>
              <FormInput
                label={timeFora.nome}
                type="number"
                placeholder="0"
                value={placarFora}
                onChange={(e) => setPlacarFora(e.target.value)}
              />
            </div>
          </div>

          {/* Artilheiros */}
          <div className="border-t border-[#F1F5F9] pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide">
                Artilheiros
              </p>
              <button
                onClick={adicionarGol}
                className="flex items-center gap-1 h-[30px] px-2.5 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[12px] font-medium transition-colors"
              >
                <Plus size={13} />
                Adicionar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_80px] gap-2 mb-3">
              <FormSelect
                label="Time"
                value={golAtual.time}
                onChange={(e) =>
                  setGolAtual({ time: e.target.value as "casa" | "fora", jogador: "", minuto: golAtual.minuto })
                }
                options={timeOptions}
              />
              <FormSelect
                label="Jogador"
                value={golAtual.jogador}
                onChange={(e) => setGolAtual((prev) => ({ ...prev, jogador: e.target.value }))}
                options={jogadoresDoTime(golAtual.time)}
              />
              <FormInput
                label="Min."
                type="number"
                placeholder="Ex: 23"
                value={golAtual.minuto}
                onChange={(e) => setGolAtual((prev) => ({ ...prev, minuto: e.target.value }))}
              />
            </div>

            {gols.length > 0 && (
              <div className="flex flex-col gap-2">
                {gols.map((gol) => (
                  <div
                    key={gol.id}
                    className="flex items-center justify-between gap-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] px-3 py-2"
                  >
                    <p className="text-[12.5px] text-[#1E293B]">
                      <span className="font-medium">{gol.jogadorNome}</span>{" "}
                      <span className="text-[#94A3B8]">
                        ({gol.time === "casa" ? timeCasa.nome : timeFora.nome}
                        {gol.minuto ? ` · ${gol.minuto}'` : ""})
                      </span>
                    </p>
                    <button
                      onClick={() => removerGol(gol.id)}
                      className="shrink-0 text-[#94A3B8] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cartões */}
          <div className="border-t border-[#F1F5F9] pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide">
                Cartões
              </p>
              <button
                onClick={adicionarCartao}
                className="flex items-center gap-1 h-[30px] px-2.5 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[12px] font-medium transition-colors"
              >
                <Plus size={13} />
                Adicionar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_70px] gap-2 mb-3">
              <FormSelect
                label="Time"
                value={cartaoAtual.time}
                onChange={(e) =>
                  setCartaoAtual((prev) => ({ ...prev, time: e.target.value as "casa" | "fora", jogador: "" }))
                }
                options={timeOptions}
              />
              <FormSelect
                label="Jogador"
                value={cartaoAtual.jogador}
                onChange={(e) => setCartaoAtual((prev) => ({ ...prev, jogador: e.target.value }))}
                options={jogadoresDoTime(cartaoAtual.time)}
              />
              <FormSelect
                label="Tipo"
                value={cartaoAtual.tipo}
                onChange={(e) =>
                  setCartaoAtual((prev) => ({ ...prev, tipo: e.target.value as "amarelo" | "vermelho" }))
                }
                options={tipoCartaoOptions}
              />
              <FormInput
                label="Min."
                type="number"
                placeholder="Ex: 40"
                value={cartaoAtual.minuto}
                onChange={(e) => setCartaoAtual((prev) => ({ ...prev, minuto: e.target.value }))}
              />
            </div>

            {cartoes.length > 0 && (
              <div className="flex flex-col gap-2">
                {cartoes.map((cartao) => (
                  <div
                    key={cartao.id}
                    className="flex items-center justify-between gap-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Square
                        size={12}
                        className={
                          cartao.tipo === "amarelo"
                            ? "fill-[#FACC15] text-[#FACC15]"
                            : "fill-[#EF4444] text-[#EF4444]"
                        }
                      />
                      <p className="text-[12.5px] text-[#1E293B]">
                        <span className="font-medium">{cartao.jogadorNome}</span>{" "}
                        <span className="text-[#94A3B8]">
                          ({cartao.time === "casa" ? timeCasa.nome : timeFora.nome}
                          {cartao.minuto ? ` · ${cartao.minuto}'` : ""})
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => removerCartao(cartao.id)}
                      className="shrink-0 text-[#94A3B8] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-[#F1F5F9] bg-[#F8FAFC] shrink-0">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="h-[36px] px-4 rounded-[8px] border border-[#E5E7EB] text-[13px] font-medium text-[#64748B] hover:bg-[#F1F5F9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="h-[36px] px-4 rounded-[8px] bg-[#16A34A] text-white text-[13px] font-medium hover:bg-[#15803D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Finalizando...
              </>
            ) : (
              "Finalizar Partida"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}