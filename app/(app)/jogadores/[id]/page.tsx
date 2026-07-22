// app/jogadores/[id]/page.tsx

"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MapPin, Shield, User, ArrowRightLeft, CreditCard, Pencil, Trash2, Eye, UserPlus } from "lucide-react";
import { DropdownJogador } from "@/components/ui/dropdown-jogador";
import { PageHeader } from "@/components/shared/page-header";

// Mock dos times — substituir por fetch do Supabase
const times: Record<
  string,
  { nome: string; cidade: string; estado: string; logo: string | null }
> = {
  "astro-rey-fc": { nome: "Astro Rey FC", cidade: "Tabatinga", estado: "AM", logo: null },
  "botafogo-master": { nome: "Botafogo Master", cidade: "Manaus", estado: "AM", logo: null },
  "sporting-sub17": { nome: "Sporting Sub-17", cidade: "Belém", estado: "PA", logo: null },
  "unidos-fc": { nome: "Unidos FC", cidade: "Fortaleza", estado: "CE", logo: null },
};

// Mock de jogadores — substituir por fetch do Supabase
const jogadoresPorTime: Record<string, { id: string; nome: string; foto: string | null }[]> = {
  "astro-rey-fc": [
    { id: "1", nome: "Carlos Endreo Jarvas Candeiro", foto: null },
    { id: "2", nome: "Luiz Henrique de Oliveira", foto: null },
    { id: "6", nome: "Rafael Souza Lima", foto: null },
    { id: "7", nome: "Gabriel Martins Rocha", foto: null },
    { id: "16", nome: "Marcos Vinícius Andrade", foto: null },
    { id: "17", nome: "João Victor Nunes Farias", foto: null },
    { id: "18", nome: "Alexandre Pereira Duarte", foto: null },
    { id: "19", nome: "Renato Silveira Guimarães", foto: null },
    { id: "20", nome: "Fábio Augusto Monteiro", foto: null },
    { id: "21", nome: "Wesley dos Santos Freitas", foto: null },
    { id: "22", nome: "Igor Ramalho Xavier", foto: null },
    { id: "23", nome: "Daniel Correia Peixoto", foto: null },
  ],
  "botafogo-master": [
    { id: "3", nome: "Bruno Costa Nascimento", foto: null },
    { id: "8", nome: "Thiago Ferreira Alves", foto: null },
    { id: "9", nome: "Matheus Cardoso Pinto", foto: null },
    { id: "10", nome: "Eduardo Ribeiro Santos", foto: null },
  ],
  "sporting-sub17": [
    { id: "4", nome: "Diego Alves Marimon", foto: null },
    { id: "11", nome: "Vinícius Almeida Dias", foto: null },
    { id: "12", nome: "Lucas Barbosa Teixeira", foto: null },
    { id: "13", nome: "João Pedro Cavalcante", foto: null },
  ],
  "unidos-fc": [
    { id: "5", nome: "Felipe Araújo Bezerra", foto: null },
    { id: "14", nome: "André Luiz Correia", foto: null },
    { id: "15", nome: "Pedro Henrique Moura", foto: null },
  ],
};

function AvatarJogador({ foto, nome }: { foto: string | null; nome: string }) {
  const iniciais = nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (foto) {
    return (
      <img
        src={foto}
        alt={nome}
        className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
      <span className="text-[13px] font-bold text-[#3B82F6]">{iniciais}</span>
    </div>
  );
}

export default function JogadoresDoTimePage() {
  const router = useRouter();
  const params = useParams();
  const timeId = params.id as string;

  const time = times[timeId];
  const jogadores = jogadoresPorTime[timeId] ?? [];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title={time?.nome ?? "Time não encontrado"}
        description="Jogadores cadastrados neste time"
        buttonLabel="Adicionar Jogador"
        buttonIcon={UserPlus}
        onButtonClick={() => router.push(`/formularios/jogador?time=${timeId}`)}
      />

      <button
        onClick={() => router.push("/jogadores")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Jogadores
      </button>

      {/* Wrapper igual ao FormLayout */}
      <div className="bg-white rounded-[14px] border border-[#e9f2f9] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6">

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">

          {/* Card do time */}
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-[6px] bg-[#3B82F6]" />
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[10px] bg-[#F1F5F9] border border-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
                  {time?.logo ? (
                    <img src={time.logo} alt={time.nome} className="w-full h-full object-cover" />
                  ) : (
                    <Shield size={22} className="text-[#CBD5E1]" />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-[15px] font-extrabold text-[#1E293B] leading-tight truncate">
                    {time?.nome ?? "—"}
                  </h2>
                  {time && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-[#94A3B8] shrink-0" />
                      <span className="text-[12px] text-[#94A3B8] truncate">
                        {time.cidade} — {time.estado}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card de jogadores */}
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <User size={15} className="text-[#3B82F6]" />
                <p className="text-[14px] font-bold text-[#1E293B]">Jogadores</p>
              </div>
              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#3B82F6]">
                {jogadores.length} cadastrados
              </span>
            </div>

            {jogadores.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <User size={28} className="text-[#CBD5E1]" />
                <p className="text-[13px] text-[#94A3B8]">Nenhum jogador cadastrado</p>
              </div>
            ) : (
              <ul className="divide-y divide-[#F8FAFC]">
                {jogadores.map((jogador) => (
                  <li
                    key={jogador.id}
                    className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <AvatarJogador foto={jogador.foto} nome={jogador.nome} />
                      <span className="text-[13px] font-medium text-[#1E293B] truncate">
                        {jogador.nome}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => router.push(`/jogadores/perfil/${jogador.id}`)}
                        title="Ver jogador"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#EFF6FF] hover:text-[#3B82F6] transition-colors"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => router.push(`/transferencias?jogador=${jogador.id}`)}
                        title="Transferir"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#EFF6FF] hover:text-[#3B82F6] transition-colors"
                      >
                        <ArrowRightLeft size={15} />
                      </button>
                      <button
                        onClick={() => router.push(`/carteirinhas/${jogador.id}`)}
                        title="Carteirinha"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#EFF6FF] hover:text-[#3B82F6] transition-colors"
                      >
                        <CreditCard size={15} />
                      </button>
                      <button
                        onClick={() => router.push(`/jogadores/${jogador.id}/editar?time=${timeId}`)}
                        title="Editar"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#EFF6FF] hover:text-[#3B82F6] transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => {}}
                        title="Excluir"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Mobile: dropdown com as mesmas ações */}
                    <div className="sm:hidden shrink-0">
                      <DropdownJogador
                        items={[
                          {
                            label: "Ver jogador",
                            icon: <Eye size={15} />,
                            onClick: () => router.push(`/jogadores/perfil/${jogador.id}`),
                          },
                          {
                            label: "Transferir",
                            icon: <ArrowRightLeft size={15} />,
                            onClick: () => router.push(`/transferencias?jogador=${jogador.id}`),
                          },
                          {
                            label: "Carteirinha",
                            icon: <CreditCard size={15} />,
                            onClick: () => router.push(`/carteirinhas/${jogador.id}`),
                          },
                          {
                            label: "Editar",
                            icon: <Pencil size={15} />,
                            onClick: () => router.push(`/jogadores/${jogador.id}/editar?time=${timeId}`),
                          },
                          {
                            label: "Excluir",
                            icon: <Trash2 size={15} />,
                            onClick: () => {},
                            variant: "danger",
                            dividerAbove: true,
                          },
                        ]}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}