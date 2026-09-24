import type { HTMLAttributes, ReactNode } from "react";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={[
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
