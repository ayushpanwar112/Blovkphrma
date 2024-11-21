"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function Lenis({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
      }}
    >
      {children}
    </ReactLenis>
  );
}
