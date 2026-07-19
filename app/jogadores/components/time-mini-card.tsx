// app/jogadores/components/time-mini-card.tsx

"use client";

import { Shield } from "lucide-react";

interface TimeMiniCardProps {
  id: string;
  nome: string;
  logo?: string | null;
  variant?: "default" | "blue" | "red" | "black";
  onClick?: () => void;
}

const variantConfig = {
  default: "border-t-[#E5E7EB]",
  blue:    "border-t-[#3B82F6]",
  red:     "border-t-[#EF4444]",
  black:   "border-t-[#1E293B]",
};

export function TimeMiniCard({ nome, logo, variant = "default", onClick }: TimeMiniCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 hover:border-[#4F6BED] hover:shadow-sm transition-all text-left w-full border-t-[3px] ${variantConfig[variant]}`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F1F3F7] shrink-0 overflow-hidden">
        {logo ? (
          <img src={logo} alt={nome} className="w-full h-full object-cover" />
        ) : (
          <Shield size={18} className="text-[#4F6BED]" />
        )}
      </div>
      <span className="text-[#1E293B] font-semibold text-[14px] truncate">
        {nome}
      </span>
    </button>
  );
}