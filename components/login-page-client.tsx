"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginState = "idle" | "submitting" | "error";

export default function LoginPageClient() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState<LoginState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, password }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin");
      return;
    } catch (error) {
      setLoginState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Invalid ID or password. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-linear-to-br from-secondary/20 via-accent/10 to-primary/20" />
          <div className="absolute -left-24 top-12 h-56 w-56 rotate-12 rounded-3xl border border-accent/30 bg-accent/10 blur-sm" />
          <div className="absolute -right-20 bottom-10 h-64 w-64 -rotate-6 rounded-full border border-primary/30 bg-primary/10 blur-2xl" />

          <div className="container relative mx-auto max-w-5xl px-4">
            <div className="grid gap-6 md:grid-cols-[1.15fr_1fr]">
              <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Admin Access
                  </p>
                  <CardTitle className="text-3xl sm:text-4xl">
                    CrelyneX Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="max-w-md text-muted-foreground">
                    Enter your admin credentials to securely access the panel.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-background/75 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="login-id" className="text-sm font-medium">
                        ID
                      </label>
                      <Input
                        id="login-id"
                        value={userId}
                        onChange={(event) => setUserId(event.target.value)}
                        placeholder="Enter admin ID"
                        autoComplete="username"
                        required
                        className="bg-background/80"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="login-password"
                        className="text-sm font-medium"
                      >
                        Password
                      </label>
                      <Input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        required
                        className="bg-background/80"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loginState === "submitting"}
                      className="w-full font-semibold"
                    >
                      {loginState === "submitting" ? "Logging in..." : "Login"}
                    </Button>

                    {message ? (
                      <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive-foreground">
                        {message}
                      </div>
                    ) : null}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
