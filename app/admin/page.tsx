import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth";
import AdminLogoutButton from "@/components/admin-logout-button";
import SiteOpenTimesList from "@/components/site-open-times-list";
import AdminEventsCoursesManager from "@/components/admin-events-courses-manager";

export const metadata: Metadata = {
  title: "Admin | CrelyneX",
  description: "Simple admin page for CrelyneX.",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (session !== ADMIN_SESSION_VALUE) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              CrelyneX
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Admin Panel</h1>
            <p className="mt-4 text-muted-foreground">
              You are logged in as CrelyneX admin. This is a simple admin page.
            </p>
            <AdminEventsCoursesManager />
            <SiteOpenTimesList />
            <AdminLogoutButton />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
