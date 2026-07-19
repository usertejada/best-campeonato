// components/ui/stat-card.tsx

type CorStatCard = "blue" | "orange" | "green" | "red" | "purple";

const corPorVariante: Record<CorStatCard, string> = {
  blue: "text-[#4F6BED]",
  orange: "text-[#D97706]",
  green: "text-[#16A34A]",
  red: "text-[#EF4444]",
  purple: "text-[#7C3AED]",
};

interface StatCardProps {
  value: number | string;
  label: string;
  color?: CorStatCard;
}

export function StatCard({ value, label, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5">
      <p className={`text-[26px] font-extrabold leading-none ${corPorVariante[color]}`}>
        {value}
      </p>
      <p className="text-[13px] text-[#94A3B8] mt-2">{label}</p>
    </div>
  );
}