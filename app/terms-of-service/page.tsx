import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | CrelyneX",
  description:
    "Review the terms and conditions for using CrelyneX platforms and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">

      <main className="flex-1">
        <section className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-bold sm:text-4xl">Terms of Service</h1>
          <p className="mt-6 text-muted-foreground">
            By using CrelyneX services, you agree to the following terms.
          </p>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Use of Services
              </h2>
              <p className="mt-2">
                You agree to use our platforms responsibly and in compliance
                with applicable laws.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Intellectual Property
              </h2>
              <p className="mt-2">
                Content, branding, and educational resources on this site are
                owned by CrelyneX unless stated otherwise.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Limitation of Liability
              </h2>
              <p className="mt-2">
                CrelyneX is not liable for indirect damages arising from the use
                of our services.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Updates</h2>
              <p className="mt-2">
                We may update these terms from time to time. Continued use means
                acceptance of the revised terms.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
