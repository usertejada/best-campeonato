// app/formularios/campeonatos/page.tsx

"use client";

import { useState } from "react";
import { ArrowLeft, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FormLayout } from "@/components/ui/form-layout";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormSelect } from "@/components/ui/form-select";
import { FormLogoUpload } from "@/components/ui/form-logo-upload";

export default function FormularioCampeonatoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    dataInicio: "",
    dataTermino: "",
    formato: "",
    numeroTimes: "",
    local: "",
    status: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Novo Campeonato"
        description="Preencha as informações do campeonato"
        buttonLabel="Novo Campeonato"
        buttonIcon={Trophy}
        onButtonClick={() => {}}
      />

      <button
        onClick={() => router.push("/campeonatos")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Campeonatos
      </button>

      <FormLayout
        titulo="Novo Campeonato"
        descricao="Preencha as informações do campeonato"
        icone={Trophy}
        voltarPara="/campeonatos"
        voltarLabel="Campeonatos"
        logoUpload={<FormLogoUpload label="Logo do Campeonato" />}
        onSalvar={() => console.log("Salvar", form)}
      >
        <FormInput
          label="Nome do Campeonato"
          placeholder="Ex: Copa Verão 2025"
          required
          value={form.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
        />

        <FormTextarea
          label="Descrição"
          placeholder="Descreva o campeonato..."
          value={form.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Data de Início"
            type="date"
            value={form.dataInicio}
            onChange={(e) => handleChange("dataInicio", e.target.value)}
          />
          <FormInput
            label="Data de Término"
            type="date"
            value={form.dataTermino}
            onChange={(e) => handleChange("dataTermino", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            label="Formato"
            required
            value={form.formato}
            onChange={(e) => handleChange("formato", e.target.value)}
            options={[
              { value: "mata_mata", label: "Mata-mata" },
              { value: "pontos_corridos", label: "Pontos corridos" },
              { value: "grupos_mata_mata", label: "Grupos + Mata-mata" },
            ]}
          />
          <FormInput
            label="Número de Times"
            placeholder="Ex: 16"
            type="number"
            value={form.numeroTimes}
            onChange={(e) => handleChange("numeroTimes", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Local"
            placeholder="Ex: Arena Central"
            value={form.local}
            onChange={(e) => handleChange("local", e.target.value)}
          />
          <FormSelect
            label="Status"
            required
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            options={[
              { value: "pendente", label: "Pendente" },
              { value: "em_andamento", label: "Em Andamento" },
              { value: "finalizado", label: "Finalizado" },
            ]}
          />
        </div>

      </FormLayout>
    </div>
  );
}