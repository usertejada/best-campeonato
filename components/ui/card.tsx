// components/ui/card.tsx

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "blue" | "red" | "black";
}

const variantConfig = {
  default: "border-t-[#E5E7EB]",
  blue:    "border-t-[#3B82F6]",
  red:     "border-t-[#EF4444]",
  black:   "border-t-[#1E293B]",
};

export function Card({ children, className, variant = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[12px] border border-[#E5E7EB] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        "border-t-[3px]",
        variantConfig[variant],
        className
      )}
    >
      {children}
    </div>
  );
}