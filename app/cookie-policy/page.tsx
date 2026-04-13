import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Cookie Policy | CrelyneX",
  description: "Understand how CrelyneX uses cookies and related technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">

      <main className="flex-1">
        <section className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-bold sm:text-4xl">Cookie Policy</h1>
          <p className="mt-6 text-muted-foreground">
            This policy explains what cookies are and how we use them.
          </p>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                What Are Cookies?
              </h2>
              <p className="mt-2">
                Cookies are small text files stored on your device to improve
                site functionality and performance.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                How We Use Cookies
              </h2>
              <p className="mt-2">
                We use cookies for analytics, session behavior, and improving
                user experience.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Managing Cookies
              </h2>
              <p className="mt-2">
                You can control cookie settings through your browser
                preferences. Disabling cookies may affect site functionality.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
