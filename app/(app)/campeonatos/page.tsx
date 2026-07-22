// app/campeonatos/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CampeonatoCard } from "./components/campeonato-card";
import { getCampeonatos, Campeonato } from "@/lib/campeonatos";

const variants: Array<"blue" | "red" | "black"> = ["blue", "red", "black"];

function formatarPeriodo(inicio: string | null, termino: string | null) {
  if (!inicio) return undefined;
  const opts: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" };
  const dataInicio = new Date(inicio).toLocaleDateString("pt-BR", opts);
  if (!termino) return dataInicio;
  const dataTermino = new Date(termino).toLocaleDateString("pt-BR", opts);
  return `${dataInicio} – ${dataTermino}`;
}

const formatoLabels: Record<string, string> = {
  mata_mata: "Mata-mata",
  pontos_corridos: "Pontos corridos",
  grupos_mata_mata: "Grupos + Mata-mata",
};

export default function CampeonatosPage() {
  const router = useRouter();
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getCampeonatos()
      .then(setCampeonatos)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F1F3F7] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <PageHeader
        title="Campeonatos"
        description="Gerencie todos os seus campeonatos"
        buttonLabel="Novo Campeonato"
        buttonIcon={Trophy}
        onButtonClick={() => router.push("/formularios/campeonatos")}
      />

      {loading && (
        <p className="text-[#94A3B8] text-[13px]">Carregando campeonatos...</p>
      )}

      {erro && (
        <p className="text-[#EF4444] text-[13px]">Erro ao carregar: {erro}</p>
      )}

      {!loading && !erro && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campeonatos.map((c, i) => (
            <CampeonatoCard
              key={c.id}
              id={c.id}
              nome={c.nome}
              descricao={c.descricao ?? ""}
              status={c.status}
              periodo={formatarPeriodo(c.data_inicio, c.data_termino)}
              totalTimes={c.numero_times ?? undefined}
              formato={c.formato ? formatoLabels[c.formato] : undefined}
              logoUrl={c.logo_url}
              variant={variants[i % variants.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
}