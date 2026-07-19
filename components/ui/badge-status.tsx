// components/ui/badge-status.tsx
import { Clock, Radio, CheckCircle2, LucideIcon } from "lucide-react";

export type StatusPartida = "agendada" | "ao_vivo" | "finalizada";

const configPorStatus: Record<
  StatusPartida,
  { label: string; icon: LucideIcon; bg: string; text: string }
> = {
  agendada: {
    label: "Agendada",
    icon: Clock,
    bg: "bg-[#EFF6FF]",
    text: "text-[#4F6BED]",
  },
  ao_vivo: {
    label: "Ao Vivo",
    icon: Radio,
    bg: "bg-[#FEF3E2]",
    text: "text-[#D97706]",
  },
  finalizada: {
    label: "Finalizada",
    icon: CheckCircle2,
    bg: "bg-[#E9FBF0]",
    text: "text-[#16A34A]",
  },
};

interface BadgeStatusProps {
  status: StatusPartida;
}

export function BadgeStatus({ status }: BadgeStatusProps) {
  const { label, icon: Icon, bg, text } = configPorStatus[status];

  return (
    <span
      className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full ${bg} ${text}`}
    >
      <Icon size={12} />
      {label}
    </span>
  );
}