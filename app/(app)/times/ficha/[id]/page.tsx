// app/times/components/ficha.tsx

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Trophy, Calendar, Shield, User, Phone, Pencil } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

// Mock do time — substituir por fetch do Supabase
const mockTime = {
  id: "astro-rey-fc",
  nome: "Astro Rey FC",
  abreviacao: "ARF",
  cidade: "Tabatinga",
  estado: "AM",
  campeonato: "Liga Tejada 2026",
  anoFundacao: "2018",
  nomeTecnico: "Carlos Silva",
  contatoTecnico: "+51 999 999 999",
  logo: "https://ui-avatars.com/api/?name=ARF&length=3&background=4F6BED&color=ffffff&bold=true&size=128",
  vitorias: 5,
  empates: 2,
  derrotas: 1,
};

// Mock de jogadores — substituir por fetch do Supabase
const mockJogadores = [
  { id: "1", nome: "João Pedro",      foto: null },
  { id: "2", nome: "Carlos Neto",     foto: null },
  { id: "3", nome: "Luis Andrade",    foto: null },
  { id: "4", nome: "Marcos Vinicius", foto: null },
  { id: "5", nome: "Rafael Souza",    foto: null },
];

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

export default function FichaTimePage() {
  const router = useRouter();
  const time = mockTime;
  const jogadores = mockJogadores;

  const stats = [
    { label: "V", value: time.vitorias },
    { label: "E", value: time.empates },
    { label: "D", value: time.derrotas },
  ];

  const infos = [
    { icone: Trophy,   label: "Campeonato",     valor: time.campeonato },
    { icone: Calendar, label: "Ano de Fundação", valor: time.anoFundacao },
    { icone: Shield,   label: "Abreviação",      valor: time.abreviacao },
    { icone: User,     label: "Técnico",         valor: time.nomeTecnico },
    { icone: Phone,    label: "Contato",         valor: time.contatoTecnico },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

      <PageHeader
        title={time.nome}
        description="Detalhes e jogadores cadastrados"
        buttonLabel="Editar Time"
        buttonIcon={Pencil}
        onButtonClick={() => router.push(`/editar/time/${time.id}`)}
      />

      <button
        onClick={() => router.push("/times")}
        className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] text-[13px] font-medium transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Voltar para Times
      </button>

      {/* Wrapper igual ao FormLayout */}
      <div className="bg-white rounded-[14px] border border-[#e9f2f9] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6">

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">

          {/* Card do time */}
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-[6px] bg-[#3B82F6]" />
            <div className="p-4">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-[10px] bg-[#F1F5F9] border border-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
                  {time.logo ? (
                    <img src={time.logo} alt={time.nome} className="w-full h-full object-cover" />
                  ) : (
                    <Shield size={22} className="text-[#CBD5E1]" />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-[15px] font-extrabold text-[#1E293B] leading-tight truncate">{time.nome}</h2>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-[#94A3B8] shrink-0" />
                    <span className="text-[12px] text-[#94A3B8] truncate">{time.cidade} — {time.estado}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-[#F1F5F9] bg-[#F8FAFC] rounded-[10px] border border-[#F1F5F9] mb-4">
                {stats.map(({ label, value }) => (
                  <div key={label} className="flex flex-col items-center py-2 gap-0.5">
                    <span className="text-[15px] font-extrabold text-[#1E293B]">{value ?? "—"}</span>
                    <span className="text-[10px] text-[#94A3B8] font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                {infos.map(({ icone: Icone, label, valor }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0">
                      <Icone size={11} className="text-[#64748B]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#94A3B8] leading-tight">{label}</span>
                      <span className="text-[12px] text-[#1E293B] font-medium leading-tight truncate">{valor}</span>
                    </div>
                  </div>
                ))}
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
                    className="flex items-center gap-3 px-5 py-3 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <AvatarJogador foto={jogador.foto} nome={jogador.nome} />
                    <span className="text-[13px] font-medium text-[#1E293B]">{jogador.nome}</span>
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