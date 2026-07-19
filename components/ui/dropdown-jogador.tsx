// components/ui/dropdown-jogador.tsx
// Dropdown específico da página de jogadores do time.
// Diferente do dropdown.tsx padrão: abre como uma barra horizontal de ícones,
// posicionada um pouco abaixo do botão de 3 pontinhos, em vez de lista vertical.

"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface DropdownJogadorItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
  dividerAbove?: boolean;
}

interface DropdownJogadorProps {
  items: DropdownJogadorItem[];
}

export function DropdownJogador({ items }: DropdownJogadorProps) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <div ref={ref} className="relative">

      {/* Botão dos 3 pontinhos */}
      <button
        onClick={() => setAberto((prev) => !prev)}
        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors"
      >
        <MoreVertical size={16} className="text-[#94A3B8]" />
      </button>

      {/* Menu: barra horizontal de ícones, abre um pouco abaixo do botão */}
      {aberto && (
        <div className="absolute top-6 right-0 z-50 bg-white border border-[#E5E7EB] rounded-[10px] shadow-md py-1.5 px-2 flex items-center gap-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-1">

              {/* Divisor opcional antes do item (vertical) */}
              {item.dividerAbove && (
                <div className="w-px h-5 bg-[#F1F5F9] mx-0.5" />
              )}

              <button
                onClick={() => {
                  item.onClick();
                  setAberto(false);
                }}
                title={item.label}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                  ${item.variant === "danger"
                    ? "text-red-500 hover:bg-[#FEF2F2]"
                    : "text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
                  }`}
              >
                {item.icon}
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}