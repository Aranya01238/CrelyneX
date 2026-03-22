"use client";

import { type ReactNode, useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

export default function GlobalInteractiveBackground({
  children,
}: {
  children: ReactNode;
}) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: -1000,
    y: -1000,
  });

  useEffect(() => {
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative min-h-screen overflow-x-hidden bg-[#050505]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[32px_32px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-size-[32px_32px] opacity-0 transition-opacity duration-500 group-hover:opacity-40"
        style={{
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/4 top-0 z-0 h-96 w-96 rounded-full bg-teal-500/10 blur-[128px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-1/4 z-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[128px]"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
