"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "crelynex@gmail.com",
    description: "Send us an email",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "WhatsApp Community",
    description: "Join our WhatsApp group",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "India",
    description: "Community based across India",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 9876543210",
    description: "Call us during business hours",
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFeedback("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/40 py-16 sm:py-20">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-accent/10 to-secondary/10" />
          <div className="absolute right-8 top-6 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="max-w-2xl">
                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Get in{" "}
                  <span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
                    Touch
                  </span>
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Have a question or want to collaborate? We'd love to hear from
                  you. Reach out to us through any of these channels.
                </p>
              </div>
              <div className="relative mx-auto hidden h-52 w-full max-w-sm perspective-distant md:block">
                <div className="absolute inset-8 rounded-2xl border border-primary/40 bg-primary/10 transform-[rotateX(60deg)_rotateZ(-30deg)]" />
                <div className="absolute inset-0 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-xl backdrop-blur transform-[translate3d(0,0,80px)]">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Contact Deck
                  </div>
                  <div className="mt-2 text-xl font-semibold">
                    Email, WhatsApp, Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/40 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={index}
                    className="border-border/40 bg-card/50 backdrop-blur"
                  >
                    <CardHeader>
                      <Icon className="mb-4 h-8 w-8 text-accent" />
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="font-medium">{method.value}</div>
                      <CardDescription>{method.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto max-w-2xl px-4">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-border/40 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-border/40 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      name="subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-border/40 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-border/40 bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-accent hover:bg-accent/90 font-semibold"
                    size="lg"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </Button>

                  {status === "success" && (
                    <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-accent">
                      {feedback}
                    </div>
                  )}

                  {status === "error" && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive-foreground">
                      {feedback}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6 border-border/40 bg-linear-to-r from-secondary/20 to-accent/20 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Quick Response?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Join our WhatsApp community for instant communication and
                    updates
                  </p>
                  <a
                    href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="mt-4 w-full bg-secondary font-semibold hover:bg-secondary/90 sm:w-auto"
                      size="lg"
                    >
                      Join WhatsApp Community
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
