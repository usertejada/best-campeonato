// app/formularios/campeonatos/page.tsx

"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormLayout } from "@/components/ui/form-layout";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormSelect } from "@/components/ui/form-select";
import { FormLogoUpload } from "@/components/ui/form-logo-upload";
import { createCampeonato, uploadCampeonatoLogo } from "@/lib/campeonatos";

export default function NovoCampeonatoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    data_inicio: "",
    data_termino: "",
    formato: "",
    numero_times: "",
    local: "",
    status: "pendente",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleLogoChange(file: File | null) {
    setLogoFile(file);
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSalvar() {
    setSalvando(true);
    setErro(null);
    try {
      let logo_url: string | null = null;
      if (logoFile) {
        logo_url = await uploadCampeonatoLogo(logoFile);
      }

      await createCampeonato({
        nome: form.nome,
        descricao: form.descricao || null,
        data_inicio: form.data_inicio || null,
        data_termino: form.data_termino || null,
        formato: (form.formato || null) as any,
        numero_times: form.numero_times ? Number(form.numero_times) : null,
        local: form.local || null,
        status: form.status as any,
        logo_url,
      });
      router.push("/campeonatos");
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <FormLayout
        titulo="Novo Campeonato"
        descricao="Preencha os dados do campeonato"
        icone={Trophy}
        voltarPara="/campeonatos"
        voltarLabel="Campeonatos"
        logoUpload={
          <FormLogoUpload label="Logo do Campeonato" onChange={handleLogoChange} />
        }
        onSalvar={handleSalvar}
      >
        {erro && <p className="text-[#EF4444] text-[13px] mb-2">Erro: {erro}</p>}

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
            value={form.data_inicio}
            onChange={(e) => handleChange("data_inicio", e.target.value)}
          />
          <FormInput
            label="Data de Término"
            type="date"
            value={form.data_termino}
            onChange={(e) => handleChange("data_termino", e.target.value)}
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
            value={form.numero_times}
            onChange={(e) => handleChange("numero_times", e.target.value)}
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