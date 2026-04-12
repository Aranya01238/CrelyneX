"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, ShieldCheck } from "lucide-react";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      // Success - use the redirect from the API
      router.push(data.redirect || "/member");
      return;
    } catch (error) {
      setLoginState("error");
      setMessage(error instanceof Error ? error.message : "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col noise overflow-hidden">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6 relative">
        {/* Background Glowing Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-950/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />

        <section className="w-full max-w-xl reveal-scale">
          <Card className="border-white/10 bg-black/40 backdrop-blur-2xl rounded-[40px] shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-800" />
            
            <CardHeader className="pt-12 pb-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl glass-red flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-red-500" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Secure Gateway</p>
                <CardTitle className="text-4xl font-black text-white tracking-tighter">
                  Portal Login
                </CardTitle>
              </div>
              <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                Authenticate your identity to access the innovation ecosystem.
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-12 sm:px-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  
                  {/* ID Field */}
                  <div className="space-y-2">
                    <label htmlFor="login-id" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                      Identity ID
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <Input
                        id="login-id"
                        value={userId}
                        onChange={(event) => setUserId(event.target.value)}
                        placeholder="e.g. jdoe_77"
                        autoComplete="username"
                        required
                        className="h-14 pl-12 rounded-2xl border-white/5 bg-white/3 focus:bg-white/5 focus:border-red-500/50 transition-all text-white placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label htmlFor="login-password" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Secret Key
                      </label>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors">
                        <Lock className="w-4 h-4" />
                      </div>
                      <Input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        className="h-14 pl-12 rounded-2xl border-white/5 bg-white/3 focus:bg-white/5 focus:border-red-500/50 transition-all text-white placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                </div>

                {message ? (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-500 flex items-center gap-3 animate-fade-in-down">
                    <div className="w-1 h-1 rounded-full bg-red-500" />
                    {message}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  disabled={loginState === "submitting"}
                  className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black text-lg shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-white/10 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loginState === "submitting" ? "Authenticating..." : "Authorize Access →"}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                    Authorized users only · IP logged 
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
