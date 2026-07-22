// app/times/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { TimeCard } from "./components/time-card";

export default function TimesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Times"
        description="Gerencie todos os seus times"
        buttonLabel="Novo Time"
        buttonIcon={Shield}
        onButtonClick={() => router.push("/formularios/time")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TimeCard
          id="astro-rey-fc"
          nome="Astro Rey FC"
          logo={null}
          cidade="Tabatinga"
          estado="AM"
          vitorias={5}
          empates={2}
          derrotas={1}
          campeonato="Liga Tejada 2026"
          variant="blue"
        />

        <TimeCard
          id="botafogo-master"
          nome="Botafogo Master"
          logo={null}
          cidade="Manaus"
          estado="AM"
          vitorias={3}
          empates={1}
          derrotas={4}
          campeonato="Copa Verão 2025"
          variant="red"
        />

        <TimeCard
          id="sporting-sub17"
          nome="Sporting Sub-17"
          logo={null}
          cidade="Belém"
          estado="PA"
          vitorias={7}
          empates={0}
          derrotas={2}
          campeonato="Torneio Inverno"
          variant="black"
        />

        <TimeCard
          id="unidos-fc"
          nome="Unidos FC"
          logo={null}
          cidade="Fortaleza"
          estado="CE"
          campeonato="Liga Municipal"
          variant="default"
        />
      </div>
    </div>
  );
}