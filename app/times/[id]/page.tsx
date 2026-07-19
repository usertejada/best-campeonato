// app/editar/time/[id]/page.tsx

"use client";

import { useState } from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FormLayout } from "@/components/ui/form-layout";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormLogoUpload } from "@/components/ui/form-logo-upload";
import { FormPhoneInput } from "@/components/ui/form-phone-input";

// Mock data — depois substitui com fetch do Supabase
const mockTime = {
  id: "astro-rey-fc",
  nome: "Astro Rey FC",
  abreviacao: "ARF",
  campeonato: "liga-tejada-2026",
  cidade: "Tabatinga",
  anoFundacao: "2018",
  nomeTecnico: "Carlos Silva",
  contatoTecnico: "999 999 999",
  paisContato: "PE",
  logoUrl: null,
};

export default function EditarTimePage() {
  const router = useRouter();
  const params = useParams();
  const timeId = params.id;

  const [form, setForm] = useState({
    nome: mockTime.nome,
    abreviacao: mockTime.abreviacao,
    campeonato: mockTime.campeonato,
    cidade: mockTime.cidade,
    anoFundacao: mockTime.anoFundacao,
    nomeTecnico: mockTime.nomeTecnico,
    contatoTecnico: mockTime.contatoTecnico,
    paisContato: mockTime.paisContato,
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Campeonatos mockados — trocar por fetch do Supabase futuramente
  const campeonatoOptions = [
    { value: "copa-verao-2025", label: "Copa Verão 2025" },
    { value: "liga-municipal", label: "Liga Municipal" },
    { value: "torneio-inverno", label: "Torneio Inverno" },
    { value: "liga-tejada-2026", label: "Liga Tejada 2026" },
  ];

  const anoAtual = new Date().getFullYear();
  const anoOptions = Array.from({ length: anoAtual - 1899 }, (_, i) => {
    const ano = String(anoAtual - i);
    return { value: ano, label: ano };
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Editar Time"
        description="Atualize as informações do time"
        buttonLabel="Editar Time"
        buttonIcon={Shield}
        onButtonClick={() => {}}
      />

      <button
        onClick={() => router.push("/times")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Times
      </button>

      <FormLayout
        titulo="Editar Time"
        descricao="Atualize as informações do time"
        icone={Shield}
        voltarPara="/times"
        voltarLabel="Times"
        logoUpload={
          <FormLogoUpload
            label="Escudo do Time"
            onChange={(file) => {
              // TODO: tratar upload do escudo
              console.log("Escudo selecionado:", file);
            }}
          />
        }
        formData={{
          Nome: form.nome,
          Abreviação: form.abreviacao,
          Campeonato: form.campeonato,
          Cidade: form.cidade,
          "Ano de Fundação": form.anoFundacao,
          Técnico: form.nomeTecnico,
          Contato: form.contatoTecnico,
        }}
        onSalvar={() => console.log("Salvar edição do time:", form, "ID:", timeId)}
      >

        {/* Nome + Abreviação */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-4">
          <FormInput
            label="Nome do Time"
            placeholder="Ex: Astro Rey FC"
            required
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
          />
          <FormInput
            label="Abreviação"
            placeholder="Ex: ARF (3 letras)"
            value={form.abreviacao}
            onChange={(e) => {
              const val = e.target.value.toUpperCase().slice(0, 3);
              handleChange("abreviacao", val);
            }}
          />
        </div>

        {/* Campeonato */}
        <FormSelect
          label="Campeonato"
          required
          value={form.campeonato}
          onChange={(e) => handleChange("campeonato", e.target.value)}
          options={campeonatoOptions}
        />

        {/* Cidade + Ano de Fundação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Cidade"
            placeholder="Ex: Tabatinga"
            value={form.cidade}
            onChange={(e) => handleChange("cidade", e.target.value)}
          />
          <FormSelect
            label="Ano de Fundação"
            value={form.anoFundacao}
            onChange={(e) => handleChange("anoFundacao", e.target.value)}
            options={anoOptions}
          />
        </div>

        {/* Divisor — Técnico */}
        <div className="border-t border-[#F1F5F9] pt-1">
          <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide">
            Informações do Técnico
          </p>
        </div>

        {/* Nome do técnico */}
        <FormInput
          label="Nome do Técnico"
          placeholder="Ex: Carlos Silva"
          value={form.nomeTecnico}
          onChange={(e) => handleChange("nomeTecnico", e.target.value)}
        />

        {/* Contato do técnico */}
        <FormPhoneInput
          label="Contato do Técnico"
          value={form.contatoTecnico}
          paisSelecionado={form.paisContato}
          onChangeValor={(val) => handleChange("contatoTecnico", val)}
          onChangePais={(pais) => handleChange("paisContato", pais)}
        />

      </FormLayout>
    </div>
  );
}