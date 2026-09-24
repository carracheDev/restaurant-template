import type { HTMLAttributes, ReactNode } from "react";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  children: ReactNode;
};

export function Section({
  as: Component = "section",
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <Component
      {...props}
      className={[
        "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
