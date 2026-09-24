import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-[#B86C2D] text-white hover:bg-[#9f5622]",
  secondary:
    "border border-[#B86C2D] bg-transparent text-[#1C1A19] hover:bg-[#F3E5D4]",
  ghost:
    "border border-transparent bg-transparent text-[#1C1A19] hover:bg-[#F3E5D4]",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200",
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
