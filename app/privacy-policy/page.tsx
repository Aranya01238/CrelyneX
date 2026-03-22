import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CrelyneX",
  description:
    "Read how CrelyneX collects, uses, and protects user information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
          <p className="mt-6 text-muted-foreground">
            We respect your privacy. This policy explains what information we
            collect and how we use it.
          </p>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Information We Collect
              </h2>
              <p className="mt-2">
                We may collect information you provide directly, such as your
                name, email, and messages submitted through contact forms.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                How We Use Information
              </h2>
              <p className="mt-2">
                We use submitted information to respond to inquiries, improve
                our services, and communicate important updates.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Data Security
              </h2>
              <p className="mt-2">
                We take reasonable steps to protect your information. No method
                of transmission or storage is fully secure.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-2">
                For privacy questions, contact us at crelynex@gmail.com.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
