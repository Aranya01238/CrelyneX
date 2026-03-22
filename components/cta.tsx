"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CTA() {
  return (
    <section
      id="community"
      className="relative overflow-hidden bg-transparent px-4 py-16 sm:py-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                  Join CrelyneX Community
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Be part of an innovative community transforming the tech
                landscape. Connect with fellow developers, IoT enthusiasts, and
                tech innovators.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                "Access to exclusive IoT projects",
                "Learn from industry experts",
                "Network with 500+ tech professionals",
                "24/7 community support",
                "Early access to courses and events",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:pt-8">
              <a
                href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground font-bold px-8"
                >
                  Join Community
                </Button>
              </a>
              <a
                href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 font-bold px-8"
                >
                  WhatsApp Group
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted-foreground">
                  Active Members
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">4</div>
                <div className="text-sm text-muted-foreground">
                  Service Tracks
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">
                  Growth Potential
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Card showcase */}
          <div className="relative flex min-h-[22rem] items-center justify-center sm:min-h-96">
            <Card className="relative w-full max-w-sm overflow-hidden border-border/40 bg-card p-6 shadow-2xl sm:p-8">
              {/* Accent gradient background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 to-secondary/10" />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    CrelyneX
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Community Group
                  </p>
                </div>

                {/* Community highlights */}
                <div className="space-y-3 py-6 border-y border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                      👥
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Active Daily
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Real-time discussions
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                      🚀
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Opportunities
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Project collaborations
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      📚
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Resources
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Learning materials
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    Scan QR to Join
                  </Button>
                </a>

                {/* Footer text */}
                <p className="text-center text-xs text-muted-foreground">
                  In Association with{" "}
                  <span className="font-semibold text-accent">
                    Hind Svaasth Seva
                  </span>{" "}
                  &{" "}
                  <span className="font-semibold text-secondary">
                    AI ZENERA
                  </span>
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-bl-full -z-10" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
