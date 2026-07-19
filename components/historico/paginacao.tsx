// components/historico/paginacao.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

function getPaginasVisiveis(paginaAtual: number, totalPaginas: number): (number | "...")[] {
  const paginas: (number | "...")[] = [];
  const delta = 1;

  for (let i = 1; i <= totalPaginas; i++) {
    if (
      i === 1 ||
      i === totalPaginas ||
      (i >= paginaAtual - delta && i <= paginaAtual + delta)
    ) {
      paginas.push(i);
    } else if (paginas[paginas.length - 1] !== "...") {
      paginas.push("...");
    }
  }

  return paginas;
}

export function Paginacao({ paginaAtual, totalPaginas, onChange }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  const paginas = getPaginasVisiveis(paginaAtual, totalPaginas);

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onChange(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={15} />
      </button>

      {paginas.map((pagina, index) =>
        pagina === "..." ? (
          <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-[13px] text-[#94A3B8]">
            ...
          </span>
        ) : (
          <button
            key={pagina}
            onClick={() => onChange(pagina)}
            className={`flex items-center justify-center w-9 h-9 rounded-full text-[13px] font-semibold transition-colors ${
              pagina === paginaAtual
                ? "bg-[#4F6BED] text-white"
                : "bg-white text-[#64748B] border border-[#E5E7EB] hover:bg-[#F8FAFC]"
            }`}
          >
            {pagina}
          </button>
        )
      )}

      <button
        onClick={() => onChange(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}