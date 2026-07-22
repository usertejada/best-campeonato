// app/campeonato/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Trophy } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FormLayout } from "@/components/ui/form-layout";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormSelect } from "@/components/ui/form-select";
import { FormLogoUpload } from "@/components/ui/form-logo-upload";
import { getCampeonatoById, updateCampeonato } from "@/lib/campeonatos";

export default function EditarCampeonatoPage() {
  const router = useRouter();
  const params = useParams();
  const campeonatoId = params.id as string;

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

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getCampeonatoById(campeonatoId)
      .then((c) => {
        setForm({
          nome: c.nome,
          descricao: c.descricao ?? "",
          data_inicio: c.data_inicio ?? "",
          data_termino: c.data_termino ?? "",
          formato: c.formato ?? "",
          numero_times: c.numero_times?.toString() ?? "",
          local: c.local ?? "",
          status: c.status,
        });
        setLogoPreview(c.logo_url);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [campeonatoId]);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleLogoChange(file: File | null) {
    // TODO: subir pra um bucket do Supabase Storage e usar a URL real
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSalvar() {
    setSalvando(true);
    setErro(null);
    try {
      await updateCampeonato(campeonatoId, {
        nome: form.nome,
        descricao: form.descricao || null,
        data_inicio: form.data_inicio || null,
        data_termino: form.data_termino || null,
        formato: (form.formato || null) as any,
        numero_times: form.numero_times ? Number(form.numero_times) : null,
        local: form.local || null,
        status: form.status as any,
      });
      router.push("/campeonatos");
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen w-full bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
        <p className="text-[#94A3B8] text-[13px]">Carregando campeonato...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Editar Campeonato"
        description="Atualize as informações do campeonato"
        buttonLabel="Editar Campeonato"
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

      {erro && <p className="text-[#EF4444] text-[13px] mb-4">Erro: {erro}</p>}

      <FormLayout
        titulo="Editar Campeonato"
        descricao="Atualize as informações do campeonato"
        icone={Trophy}
        voltarPara="/campeonatos"
        voltarLabel="Campeonatos"
        logoUpload={
          <FormLogoUpload
            label="Logo do Campeonato"
            onChange={handleLogoChange}
          />
        }
        onSalvar={handleSalvar}
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