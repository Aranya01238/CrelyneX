import type { Metadata } from "next";
import Hero from "@/components/hero";
import Services from "@/components/services";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "CrelyneX | Build, Learn, Innovate",
  description:
    "CrelyneX is a community-driven innovation hub for IoT, web, and 3D-first learning.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Hero />
      <Services />
      <CTA />
      <Footer />
    </div>
  );
}
