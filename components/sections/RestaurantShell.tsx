import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import type { Restaurant } from "@/types/restaurant";

export type RestaurantShellProps = {
  restaurant: Restaurant;
  children: ReactNode;
};

export function RestaurantShell({ restaurant, children }: RestaurantShellProps) {
  return (
    <div
      style={{
        backgroundColor: restaurant.theme.background,
        color: restaurant.theme.text,
      }}
      className="min-h-screen"
    >
      <Container>{children}</Container>
    </div>
  );
}
