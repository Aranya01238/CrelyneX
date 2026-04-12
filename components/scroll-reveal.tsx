"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const timeoutPath = setTimeout(() => {
      const targets = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      targets.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutPath);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
