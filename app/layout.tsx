import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import GlobalInteractiveBackground from "@/components/global-interactive-background";
import SiteOpenTracker from "@/components/site-open-tracker";
import PageLoader from "@/components/page-loader";
import ScrollReveal from "@/components/scroll-reveal";
import Sidebar from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrelyneX",
  description: "CrelyneX official website",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PageLoader />
        <SiteOpenTracker />
        <ScrollReveal />
        <GlobalInteractiveBackground>
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-1 w-full pt-16 md:pt-0">
              {children}
            </main>
          </div>
          <Analytics />
        </GlobalInteractiveBackground>
      </body>
    </html>
  );
}
