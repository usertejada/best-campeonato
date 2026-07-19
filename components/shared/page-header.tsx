// components/shared/page-header.tsx
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonIcon?: LucideIcon;
  onSecondaryButtonClick?: () => void;
}

export function PageHeader({
  title,
  description,
  buttonLabel,
  buttonIcon: Icon,
  onButtonClick,
  secondaryButtonLabel,
  secondaryButtonIcon: SecondaryIcon,
  onSecondaryButtonClick,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-6 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
      <div className="min-w-0">
        <h1 className="text-[#1E293B] font-extrabold text-[22px] lg:text-[28px] leading-tight truncate">
          {title}
        </h1>
        {description && (
          <p className="text-[#94A3B8] text-[14px] font-normal mt-1">
            {description}
          </p>
        )}
      </div>

      {(buttonLabel || secondaryButtonLabel) && (
        <div className="flex items-center gap-2 shrink-0 self-start min-[640px]:self-auto">
          {secondaryButtonLabel && (
            <Button
              onClick={onSecondaryButtonClick}
              variant="outline"
              className="bg-white hover:bg-[#F8FAFC] text-[#1E293B] border border-[#E5E7EB] text-[13px] font-medium h-[38px] px-4 rounded-[8px] whitespace-nowrap"
            >
              {SecondaryIcon && <SecondaryIcon size={15} />}
              {secondaryButtonLabel}
            </Button>
          )}

          {buttonLabel && (
            <Button
              onClick={onButtonClick}
              className="bg-[#4F6BED] hover:bg-[#3D5BD9] text-white text-[13px] font-medium h-[38px] px-4 rounded-[8px] whitespace-nowrap"
            >
              {Icon && <Icon size={15} />}
              {buttonLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}