// app/partidas/nova/page.tsx

"use client";

import { useState } from "react";
import { ArrowLeft, CalendarPlus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FormLayout } from "@/components/ui/form-layout";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";

interface Confronto {
  id: string;
  timeCasa: string;
  timeFora: string;
}

// Times mockados — trocar por fetch do Supabase
const timeOptions = [
  { value: "aguias-sc", label: "Águias SC" },
  { value: "leoes-fc", label: "Leões FC" },
  { value: "panteras-fc", label: "Panteras FC" },
  { value: "trovoes-ec", label: "Trovões EC" },
  { value: "atl-amazonas-fc", label: "Atl. Amazonas FC" },
  { value: "amigos-cabelinho", label: "Amigos Cabelinho" },
];

const campeonatoOptions = [
  { value: "copa-verao-2025", label: "Copa Verão 2025" },
  { value: "liga-municipal", label: "Liga Municipal" },
  { value: "torneio-inverno", label: "Torneio Inverno" },
  { value: "liga-tejada-2026", label: "Liga Tejada 2026" },
];

const tempoOptions = [
  { value: "45-45", label: "45min / 45min" },
  { value: "20-20", label: "20min / 20min" },
  { value: "15-15", label: "15min / 15min" },
];

function novoConfronto(): Confronto {
  return { id: crypto.randomUUID(), timeCasa: "", timeFora: "" };
}

export default function GerarPartidasManualPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    data: "",
    horario: "",
    campeonato: "",
    local: "",
    tempo: "",
    intervalo: "",
  });

  const [confrontos, setConfrontos] = useState<Confronto[]>([]);
  const [confrontoAtual, setConfrontoAtual] = useState({ timeCasa: "", timeFora: "" });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleConfrontoAtualChange(campo: "timeCasa" | "timeFora", value: string) {
    setConfrontoAtual((prev) => ({ ...prev, [campo]: value }));
  }

  function adicionarConfronto() {
    if (!confrontoAtual.timeCasa || !confrontoAtual.timeFora) return;
    setConfrontos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...confrontoAtual },
    ]);
    setConfrontoAtual({ timeCasa: "", timeFora: "" });
  }

  function removerConfronto(id: string) {
    setConfrontos((prev) => prev.filter((c) => c.id !== id));
  }

  function nomeTime(value: string) {
    return timeOptions.find((t) => t.value === value)?.label ?? value;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Gerar Partidas"
        description="Cadastro manual de confrontos"
      />

      <button
        onClick={() => router.push("/partidas")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Partidas
      </button>

      <FormLayout
        titulo="Gerar Partidas — Manual"
        descricao="Defina a rodada e monte os confrontos"
        icone={CalendarPlus}
        voltarPara="/partidas"
        voltarLabel="Partidas"
        formData={{
          Data: form.data,
          Horário: form.horario,
          Campeonato: form.campeonato,
          Local: form.local,
          Tempo: form.tempo,
          Intervalo: form.intervalo,
          Confrontos: confrontos.length,
        }}
        onSalvar={() => console.log("Gerar partidas:", { ...form, confrontos })}
      >

        {/* Data + Horário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Data do Jogo"
            type="date"
            required
            value={form.data}
            onChange={(e) => handleChange("data", e.target.value)}
          />
          <FormInput
            label="Horário"
            type="time"
            required
            value={form.horario}
            onChange={(e) => handleChange("horario", e.target.value)}
          />
        </div>

        {/* Campeonato + Local */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            label="Campeonato"
            required
            value={form.campeonato}
            onChange={(e) => handleChange("campeonato", e.target.value)}
            options={campeonatoOptions}
          />
          <FormInput
            label="Local (Campo)"
            placeholder="Ex: Campo Principal"
            required
            value={form.local}
            onChange={(e) => handleChange("local", e.target.value)}
          />
        </div>

        {/* Tempo de jogo + Intervalo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            label="Tempo do Jogo"
            required
            value={form.tempo}
            onChange={(e) => handleChange("tempo", e.target.value)}
            options={tempoOptions}
          />
          <FormInput
            label="Intervalo (min)"
            type="number"
            placeholder="Ex: 10"
            value={form.intervalo}
            onChange={(e) => handleChange("intervalo", e.target.value)}
          />
        </div>

        {/* Divisor */}
        <div className="border-t border-[#F1F5F9] pt-1">
          <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide">
            Confrontos
          </p>
        </div>

        {/* Confrontos: formulário (esquerda) + lista (direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Coluna esquerda — adicionar confronto */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[10px] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-[#1E293B]">
                Escolha os Confrontos
              </p>
              <button
                onClick={adicionarConfronto}
                className="flex items-center justify-center gap-1.5 h-[34px] px-3 rounded-[8px] bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[12px] font-medium transition-colors whitespace-nowrap"
              >
                <Plus size={14} />
                Adicionar
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <FormSelect
                label="Time A"
                value={confrontoAtual.timeCasa}
                onChange={(e) => handleConfrontoAtualChange("timeCasa", e.target.value)}
                options={timeOptions}
              />
              <span className="flex justify-center text-[13px] font-bold text-[#94A3B8]">
                VS
              </span>
              <FormSelect
                label="Time B"
                value={confrontoAtual.timeFora}
                onChange={(e) => handleConfrontoAtualChange("timeFora", e.target.value)}
                options={timeOptions}
              />
            </div>
          </div>

          {/* Coluna direita — lista de jogos adicionados */}
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[10px] p-4">
            <p className="text-[12px] font-semibold text-[#94A3B8] mb-3">
              Jogos ({confrontos.length})
            </p>

            {confrontos.length === 0 ? (
              <p className="text-[13px] text-[#94A3B8] py-6 text-center">
                Nenhum confronto adicionado ainda
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {confrontos.map((confronto, index) => (
                  <div
                    key={confronto.id}
                    className="flex items-center justify-between gap-2 bg-white border border-[#E5E7EB] rounded-[8px] px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[#94A3B8]">
                        Jogo {index + 1}
                      </p>
                      <p className="text-[13px] font-medium text-[#1E293B] truncate">
                        {nomeTime(confronto.timeCasa)} <span className="text-[#94A3B8]">vs</span> {nomeTime(confronto.timeFora)}
                      </p>
                    </div>
                    <button
                      onClick={() => removerConfronto(confronto.id)}
                      className="shrink-0 text-[#94A3B8] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </FormLayout>
    </div>
  );
}