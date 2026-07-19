// components/ui/dropdown.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
  dividerAbove?: boolean;
}

interface DropdownMenuProps {
  items: DropdownItem[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
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

      {/* Menu */}
      {aberto && (
        <div className="absolute top-8 right-0 z-50 bg-white border border-[#E5E7EB] rounded-[10px] shadow-md py-1 min-w-[150px]">
          {items.map((item, index) => (
            <div key={index}>

              {/* Divisor opcional acima do item */}
              {item.dividerAbove && (
                <div className="border-t border-[#F1F5F9] my-1" />
              )}

              <button
                onClick={() => {
                  item.onClick();
                  setAberto(false);
                }}
                className={`flex items-center gap-2.5 w-full px-4 py-2 text-[13px] transition-colors
                  ${item.variant === "danger"
                    ? "text-red-500 hover:bg-[#FEF2F2]"
                    : "text-[#1E293B] hover:bg-[#F8FAFC]"
                  }`}
              >
                {item.icon}
                {item.label}
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}