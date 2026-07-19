// app/jogadores/perfil/[id]/page.tsx

"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  UserSquare2,
  Pencil,
  CalendarDays,
  Flag,
  FileText,
  Phone,
  Shield,
  Globe2,
  Goal,
  Star,
  Square,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

// Mock data — depois substitui com fetch do Supabase
const mockJogador = {
  id: "joao-da-silva",
  nomeCompleto: "João da Silva",
  dataNascimento: "2000-05-14",
  nacionalidade: "BR",
  tipoDocumentoBR: "cpf",
  numeroDocumento: "123.456.789-00",
  telefone: "999 999 999",
  paisTelefone: "BR",
  fotoUrl: null as string | null,
  documentoUrl: null as string | null,
  timeId: "astro-rey-fc",
  timeNome: "Astro Rey FC",
};

// Mock de estatísticas na temporada — substituir por fetch do Supabase
const mockEstatisticas = {
  jogos: 0,
  gols: 5,
  assistencias: 2,
  cartoesAmarelos: 1,
  cartoesVermelhos: 0,
  mediaGols: 0,
};

const LIMITE_CARTOES_SUSPENSAO = 5;

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function calcularIdade(dataNascimento: string) {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
  if (aindaNaoFezAniversario) idade--;
  return idade;
}

export default function PerfilJogadorPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const jogadorId = params.id as string;

  // timeId vem da URL se disponível, senão cai no mock do jogador
  const timeId = searchParams.get("time") ?? mockJogador.timeId;
  const rotaVoltar = timeId ? `/jogadores/${timeId}` : "/jogadores";

  const iniciais = mockJogador.nomeCompleto
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title={mockJogador.nomeCompleto}
        description="Perfil do jogador"
        buttonLabel="Editar Jogador"
        buttonIcon={Pencil}
        onButtonClick={() => router.push(`/jogadores/${jogadorId}/editar?time=${timeId}`)}
      />

      <button
        onClick={() => router.push(rotaVoltar)}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para {mockJogador.timeNome}
      </button>

      <div className="bg-white rounded-[14px] border border-[#e9f2f9] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
          {/* Card lateral — foto e time */}
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-[6px] bg-[#4F6BED]" />
            <div className="p-5 flex flex-col items-center text-center">
              {mockJogador.fotoUrl ? (
                <img
                  src={mockJogador.fotoUrl}
                  alt={mockJogador.nomeCompleto}
                  className="w-24 h-24 rounded-full object-cover border border-[#E5E7EB]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center">
                  <span className="text-[24px] font-bold text-[#4F6BED]">{iniciais}</span>
                </div>
              )}

              <h2 className="text-[16px] font-extrabold text-[#1E293B] mt-4 leading-tight">
                {mockJogador.nomeCompleto}
              </h2>

              <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#F1F5F9]">
                <Shield size={12} className="text-[#94A3B8]" />
                <span className="text-[12px] font-medium text-[#64748B]">
                  {mockJogador.timeNome}
                </span>
              </div>
            </div>
          </div>

          {/* Card de dados */}
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#F1F5F9]">
              <UserSquare2 size={15} className="text-[#4F6BED]" />
              <p className="text-[14px] font-bold text-[#1E293B]">Dados do Jogador</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <CalendarDays size={15} className="text-[#4F6BED]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#94A3B8] font-medium">Data de Nascimento</p>
                  <p className="text-[13px] font-semibold text-[#1E293B]">
                    {formatarData(mockJogador.dataNascimento)}{" "}
                    <span className="text-[#94A3B8] font-medium">
                      ({calcularIdade(mockJogador.dataNascimento)} anos)
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <Flag size={15} className="text-[#4F6BED]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#94A3B8] font-medium">Nacionalidade</p>
                  <p className="text-[13px] font-semibold text-[#1E293B]">
                    {mockJogador.nacionalidade === "BR" ? "Brasileiro" : mockJogador.nacionalidade}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <FileText size={15} className="text-[#4F6BED]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#94A3B8] font-medium">
                    Documento ({mockJogador.tipoDocumentoBR.toUpperCase()})
                  </p>
                  <p className="text-[13px] font-semibold text-[#1E293B]">
                    {mockJogador.numeroDocumento}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-[#4F6BED]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#94A3B8] font-medium">Telefone</p>
                  <p className="text-[13px] font-semibold text-[#1E293B]">
                    {mockJogador.telefone}
                  </p>
                </div>
              </div>
            </div>

            {mockJogador.documentoUrl && (
              <div className="px-5 pb-5">
                <p className="text-[11px] text-[#94A3B8] font-medium mb-2">Foto do Documento</p>
                <img
                  src={mockJogador.documentoUrl}
                  alt="Documento do jogador"
                  className="w-full max-w-[280px] rounded-[10px] border border-[#E5E7EB]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Estatísticas na Temporada */}
        <div className="mt-4 bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5">
          <p className="text-[14px] font-bold text-[#1E293B] mb-4">Estatísticas na Temporada</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-[12px] bg-[#EEF1FE] p-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Globe2 size={14} className="text-[#4F6BED]" />
                </div>
                <span className="text-[18px] font-extrabold text-[#4F6BED]">
                  {mockEstatisticas.jogos}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] mt-2">Jogos</p>
            </div>

            <div className="rounded-[12px] bg-[#EAF7EE] p-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Goal size={14} className="text-[#22C55E]" />
                </div>
                <span className="text-[18px] font-extrabold text-[#22C55E]">
                  {mockEstatisticas.gols}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] mt-2">Gols</p>
            </div>

            <div className="rounded-[12px] bg-[#EEF1FE] p-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Star size={14} className="text-[#4F6BED]" />
                </div>
                <span className="text-[18px] font-extrabold text-[#4F6BED]">
                  {mockEstatisticas.assistencias}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] mt-2">Assistências</p>
            </div>

            <div className="rounded-[12px] bg-[#FEF9E7] p-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[6px] bg-[#F5C518] flex items-center justify-center shrink-0">
                  <Square size={12} className="text-white fill-white" />
                </div>
                <span className="text-[18px] font-extrabold text-[#B7860B]">
                  {mockEstatisticas.cartoesAmarelos}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] mt-2">C. Amarelos</p>
            </div>

            <div className="rounded-[12px] bg-[#FDECEC] p-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[6px] bg-[#EF4444] flex items-center justify-center shrink-0">
                  <Square size={12} className="text-white fill-white" />
                </div>
                <span className="text-[18px] font-extrabold text-[#EF4444]">
                  {mockEstatisticas.cartoesVermelhos}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] mt-2">C. Vermelhos</p>
            </div>

            <div className="rounded-[12px] bg-[#E9F6FE] p-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Activity size={14} className="text-[#0EA5E9]" />
                </div>
                <span className="text-[18px] font-extrabold text-[#0EA5E9]">
                  {mockEstatisticas.mediaGols}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] mt-2">Média de Gols</p>
            </div>
          </div>
        </div>

        {/* Situação Disciplinar */}
        <div className="mt-4 bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5">
          <p className="text-[14px] font-bold text-[#1E293B] mb-4">Situação Disciplinar</p>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-[#F5C518]" />
              <span className="text-[13px] font-semibold text-[#1E293B]">Cartões Amarelos</span>
            </div>
            <span className="text-[13px] font-bold text-[#F5C518]">
              {mockEstatisticas.cartoesAmarelos} / {LIMITE_CARTOES_SUSPENSAO}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#FEF9E7] overflow-hidden">
            <div
              className="h-full bg-[#F5C518] rounded-full"
              style={{
                width: `${Math.min(
                  (mockEstatisticas.cartoesAmarelos / LIMITE_CARTOES_SUSPENSAO) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <p className="text-[12px] text-[#94A3B8] mt-2">
            {LIMITE_CARTOES_SUSPENSAO - mockEstatisticas.cartoesAmarelos} cartão(ões) para
            suspensão
          </p>

          <div className="mt-4 flex items-start gap-3 rounded-[12px] bg-[#F1F5F9] p-4">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#22C55E]">
                {mockEstatisticas.cartoesVermelhos === 0 ? "Apto para jogar" : "Suspenso"}
              </p>
              <p className="text-[12px] text-[#64748B]">
                {mockEstatisticas.cartoesVermelhos === 0
                  ? "Nenhum cartão vermelho na temporada"
                  : "Cartão vermelho registrado na temporada"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}