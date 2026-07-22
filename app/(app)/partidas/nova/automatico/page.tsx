// app/partidas/nova/automatico/page.tsx

"use client";

import { useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FormLayout } from "@/components/ui/form-layout";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";

// Campeonatos mockados — trocar por fetch do Supabase
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

const quantidadeOptions = Array.from({ length: 12 }, (_, i) => {
  const qtd = String(i + 1);
  return { value: qtd, label: qtd };
});

export default function GerarPartidasAutomaticoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    data: "",
    horario: "",
    campeonato: "",
    local: "",
    tempo: "",
    intervalo: "",
    quantidade: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Gerar Partidas"
        description="Geração automática de confrontos"
      />

      <button
        onClick={() => router.push("/partidas")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Partidas
      </button>

      <FormLayout
        titulo="Gerar Partidas — Automático"
        descricao="Defina o início e o formato dos jogos; os confrontos e datas são calculados automaticamente"
        icone={Zap}
        voltarPara="/partidas"
        voltarLabel="Partidas"
        formData={{
          "Data de Início": form.data,
          "Horário de Início": form.horario,
          Campeonato: form.campeonato,
          Local: form.local,
          Tempo: form.tempo,
          Intervalo: form.intervalo,
          "Partidas por Dia": form.quantidade,
        }}
        onSalvar={() => console.log("Gerar partidas automaticamente:", form)}
      >

        {/* Data de início + Horário de início */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Data de Início"
            type="date"
            required
            value={form.data}
            onChange={(e) => handleChange("data", e.target.value)}
          />
          <FormInput
            label="Horário de Início"
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

        {/* Quantidade de partidas por dia */}
        <FormSelect
          label="Quantidade de Partidas por Dia"
          required
          value={form.quantidade}
          onChange={(e) => handleChange("quantidade", e.target.value)}
          options={quantidadeOptions}
        />

        {/* Aviso */}
        <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-[8px] p-3">
          <p className="text-[12px] text-[#3B82F6]">
            Os confrontos, datas e horários de cada rodada serão calculados
            automaticamente pelo sistema com base no formato do campeonato já
            definido.
          </p>
        </div>

      </FormLayout>
    </div>
  );
}