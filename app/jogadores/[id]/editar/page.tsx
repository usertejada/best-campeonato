// app/jogadores/[id]/editar/page.tsx

"use client";

import { useState } from "react";
import { ArrowLeft, UserSquare2 } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FormLayout } from "@/components/ui/form-layout";
import { FormInput } from "@/components/ui/form-input";
import { FormLogoUpload } from "@/components/ui/form-logo-upload";
import { FormDocumentoUpload } from "@/components/ui/form-documento-upload";
import { FormNacionalidade, type Nacionalidade } from "@/components/ui/form-nacionalidade";
import { FormDocumentoNumero, type TipoDocumentoBR } from "@/components/ui/form-documento-numero";
import { FormPhoneInput } from "@/components/ui/form-phone-input";

// Mock data — depois substitui com fetch do Supabase
const mockJogador = {
  id: "joao-da-silva",
  nomeCompleto: "João da Silva",
  dataNascimento: "2000-05-14",
  nacionalidade: "BR" as Nacionalidade,
  tipoDocumentoBR: "cpf" as TipoDocumentoBR,
  numeroDocumento: "123.456.789-00",
  telefone: "999 999 999",
  paisTelefone: "BR",
  fotoUrl: null,
  documentoUrl: null,
};

export default function EditarJogadorPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const jogadorId = params.id;
  const timeId = searchParams.get("time");

  // Se veio de um time, volta pra listagem do time; senão volta pra lista geral de jogadores
  const rotaVoltar = timeId ? `/jogadores/${timeId}` : "/jogadores";

  const [form, setForm] = useState({
    nomeCompleto: mockJogador.nomeCompleto,
    dataNascimento: mockJogador.dataNascimento,
    nacionalidade: mockJogador.nacionalidade,
    tipoDocumentoBR: mockJogador.tipoDocumentoBR,
    numeroDocumento: mockJogador.numeroDocumento,
    telefone: mockJogador.telefone,
    paisTelefone: mockJogador.paisTelefone,
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleChangeNacionalidade(nacionalidade: Nacionalidade) {
    setForm((prev) => ({ ...prev, nacionalidade, numeroDocumento: "" }));
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Editar Jogador"
        description="Atualize as informações do jogador"
        buttonLabel="Editar Jogador"
        buttonIcon={UserSquare2}
        onButtonClick={() => {}}
      />

      <button
        onClick={() => router.push(rotaVoltar)}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Jogador
      </button>

      <FormLayout
        titulo="Editar Jogador"
        descricao="Atualize as informações do jogador"
        icone={UserSquare2}
        voltarPara={rotaVoltar}
        voltarLabel="Jogador"
        logoUpload={
          <div className="flex flex-col gap-4">
            <FormLogoUpload
              label="Foto 3x4"
              onChange={(file) => {
                // TODO: tratar upload da foto 3x4
                console.log("Foto selecionada:", file);
              }}
            />
            <FormDocumentoUpload
              label="Foto do Documento"
              onChange={(file) => {
                // TODO: tratar upload do documento
                console.log("Documento selecionado:", file);
              }}
            />
          </div>
        }
        formData={{
          Nome: form.nomeCompleto,
          "Data de Nascimento": form.dataNascimento,
          Nacionalidade: form.nacionalidade,
          Documento: form.numeroDocumento,
          Telefone: form.telefone,
        }}
        onSalvar={() => console.log("Salvar edição do jogador:", form, "ID:", jogadorId)}
      >

        {/* Nome completo */}
        <FormInput
          label="Nome Completo"
          placeholder="Ex: João da Silva"
          required
          value={form.nomeCompleto}
          onChange={(e) => handleChange("nomeCompleto", e.target.value)}
        />

        {/* Data de nascimento */}
        <FormInput
          label="Data de Nascimento"
          type="date"
          required
          value={form.dataNascimento}
          onChange={(e) => handleChange("dataNascimento", e.target.value)}
        />

        {/* Divisor — Documentação */}
        <div className="border-t border-[#F1F5F9] pt-1">
          <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide">
            Documentação
          </p>
        </div>

        {/* Nacionalidade */}
        <FormNacionalidade
          value={form.nacionalidade}
          onChange={handleChangeNacionalidade}
          required
        />

        {/* Número do documento */}
        <FormDocumentoNumero
          nacionalidade={form.nacionalidade}
          value={form.numeroDocumento}
          onChange={(val) => handleChange("numeroDocumento", val)}
          tipoDocumentoBR={form.tipoDocumentoBR}
          onChangeTipoDocumentoBR={(tipo) =>
            setForm((prev) => ({ ...prev, tipoDocumentoBR: tipo }))
          }
          required
        />

        {/* Divisor — Contato */}
        <div className="border-t border-[#F1F5F9] pt-1">
          <p className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wide">
            Contato
          </p>
        </div>

        {/* Telefone */}
        <FormPhoneInput
          label="Telefone"
          value={form.telefone}
          paisSelecionado={form.paisTelefone}
          onChangeValor={(val) => handleChange("telefone", val)}
          onChangePais={(pais) => handleChange("paisTelefone", pais)}
        />

      </FormLayout>
    </div>
  );
}