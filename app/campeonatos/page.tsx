// /app/campeonatos/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CampeonatoCard } from "./components/campeonato-card";

export default function CampeonatosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Campeonatos"
        description="Gerencie todos os seus campeonatos"
        buttonLabel="Novo Campeonato"
        buttonIcon={Trophy}
        onButtonClick={() => router.push("/formularios/campeonatos")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CampeonatoCard
          nome="Copa Verão 2025"
          descricao="Torneio de futebol society com 16 times"
          status="em_andamento"
          periodo="Jan–Mar 2025"
          totalTimes={16}
          formato="Mata-mata"
          variant="blue"
        />
        <CampeonatoCard
          nome="Liga Municipal"
          descricao="Campeonato municipal de futsal adulto"
          status="pendente"
          periodo="Abr–Jun 2025"
          totalTimes={8}
          formato="Pontos corridos"
          variant="red"
        />
        <CampeonatoCard
          nome="Torneio Inverno"
          descricao="Torneio rápido de fim de semana master server"
          status="finalizado"
          periodo="Jul 2025"
          totalTimes={4}
          formato="Grupos + Mata-mata"
          variant="black"
        />
      </div>
    </div>
  );
}