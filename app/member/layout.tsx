"use client";

import Footer from "@/components/footer";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col noise">
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
