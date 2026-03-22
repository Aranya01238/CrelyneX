import type { Metadata } from "next";
import LoginPageClient from "@/components/login-page-client";

export const metadata: Metadata = {
  title: "Login | CrelyneX",
  description: "Admin login page for CrelyneX.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
