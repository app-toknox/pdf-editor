import React from "react";

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip/tooltip";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const InfoIcon = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

export const TextIconTooltip = ({
  content,
  trigger,
  notClickable = true,
  onClick,
  className,
  classNameIcon,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          disabled={notClickable}
          className={!notClickable ? "cursor-pointer" : ""}
          onClick={onClick}
        >
          {trigger ? trigger : <InfoIcon size={18} className={classNameIcon} />}
        </TooltipTrigger>
        <TooltipContent className={cn("max-w-sm px-2", className)}>
          <div className="text-xs font-light">{content}</div>
          <TooltipArrow className="fill-yellow-100" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
