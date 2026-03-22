"use client";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-transparent border-t border-border/40 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-14 sm:py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-accent to-secondary">
                <span className="text-sm font-bold text-accent-foreground">
                  𝞓
                </span>
              </div>
              <span className="font-bold text-lg bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
                CrelyneX
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Innovating tomorrow with cutting-edge technology solutions and
              community-driven development.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-colors"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-accent/20 hover:bg-accent/40 flex items-center justify-center text-accent transition-colors"
              >
                <span className="text-lg">𝕏</span>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-secondary/20 hover:bg-secondary/40 flex items-center justify-center text-secondary transition-colors"
              >
                <span className="text-lg">in</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              {[
                "IoT Consulting",
                "Web Development",
                "App Development",
                "Event Updates",
                "Online Courses",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Community</h3>
            <ul className="space-y-2">
              {[
                "Join Us",
                "Events",
                "Resources",
                "Members",
                "Partnerships",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-muted-foreground">Email</p>
                <a
                  href="mailto:hello@crelynex.com"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  hello@crelynex.com
                </a>
              </li>
              <li>
                <p className="text-muted-foreground">WhatsApp</p>
                <a
                  href="#"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Join Community
                </a>
              </li>
              <li>
                <p className="text-muted-foreground">Based in</p>
                <p className="text-foreground">India 🇮🇳</p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border/40 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:items-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © 2024 CrelyneX. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </a>
          </div>
          <div className="space-y-1 text-center text-xs text-muted-foreground md:text-right">
            <p>In Association with</p>
            <p className="font-semibold text-accent">
              Hind Svaasth Seva & AI ZENERA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
