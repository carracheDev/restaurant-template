import type { ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "muted";
};

const tones = {
  default: "border border-[#E7D3B4] bg-[#F8F1E7] text-[#1C1A19]",
  accent: "border border-[#B86C2D] bg-[#F3E5D4] text-[#472B14]",
  muted: "border border-[#E9E4E0] bg-[#F5F2F0] text-[#5A4D46]",
} as const;

export function Badge({ children, className = "", tone = "default" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em]",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
