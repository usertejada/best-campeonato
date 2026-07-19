// app/jogadores/page.tsx

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, User, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { TimeMiniCard } from "./components/time-mini-card";

interface Jogador {
  id: string;
  nome: string;
  timeId: string;
  timeNome: string;
}

interface Time {
  id: string;
  nome: string;
  logo: string | null;
  variant?: "default" | "blue" | "red" | "black";
}

const times: Time[] = [
  { id: "astro-rey-fc", nome: "Astro Rey FC", logo: null, variant: "blue" },
  { id: "botafogo-master", nome: "Botafogo Master", logo: null, variant: "red" },
  { id: "sporting-sub17", nome: "Sporting Sub-17", logo: null, variant: "black" },
  { id: "unidos-fc", nome: "Unidos FC", logo: null, variant: "default" },
];

const jogadores: Jogador[] = [
  { id: "1", nome: "Lucas Silva", timeId: "astro-rey-fc", timeNome: "Astro Rey FC" },
  { id: "2", nome: "Rafael Souza", timeId: "astro-rey-fc", timeNome: "Astro Rey FC" },
  { id: "3", nome: "Bruno Costa", timeId: "botafogo-master", timeNome: "Botafogo Master" },
  { id: "4", nome: "Diego Alves", timeId: "sporting-sub17", timeNome: "Sporting Sub-17" },
  { id: "5", nome: "Felipe Araújo", timeId: "unidos-fc", timeNome: "Unidos FC" },
];

export default function JogadoresPage() {
  const router = useRouter();
  const [busca, setBusca] = useState("");

  const jogadoresFiltrados = useMemo(() => {
    if (!busca.trim()) return [];
    return jogadores.filter((j) =>
      j.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Jogadores"
        description="Consulte os jogadores por time ou pesquise pelo nome"
        buttonLabel="Novo Jogador"
        buttonIcon={UserPlus}
        onButtonClick={() => router.push("/formularios/jogador")}
      />

      <div className="relative mb-6 w-full max-w-xs">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquisar jogador..."
          className="w-full h-[34px] pl-8 pr-3 bg-white border border-[#E5E7EB] rounded-[10px] text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#4F6BED] transition-colors"
        />
      </div>

      {busca.trim() ? (
        <div className="flex flex-col gap-2">
          {jogadoresFiltrados.length > 0 ? (
            jogadoresFiltrados.map((jogador) => (
              <button
                key={jogador.id}
                onClick={() => router.push(`/jogadores/${jogador.timeId}`)}
                className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 hover:border-[#4F6BED] hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F1F3F7] shrink-0">
                  <User size={16} className="text-[#4F6BED]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#1E293B] font-semibold text-[14px] truncate">
                    {jogador.nome}
                  </p>
                  <p className="text-[#94A3B8] text-[12px] truncate">
                    {jogador.timeNome}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="text-[#94A3B8] text-[14px] text-center py-6">
              Nenhum jogador encontrado
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {times.map((time) => (
            <TimeMiniCard
              key={time.id}
              id={time.id}
              nome={time.nome}
              logo={time.logo}
              variant={time.variant}
              onClick={() => router.push(`/jogadores/${time.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}