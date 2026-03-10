"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="CrelyneX Logo"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
          />
          <span className="truncate text-lg font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent sm:text-xl">
            CrelyneX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-accent"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium transition-colors hover:text-accent"
          >
            Projects
          </Link>
          <Link
            href="/events-courses"
            className="text-sm font-medium transition-colors hover:text-accent"
          >
            Events & Courses
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-accent"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-accent"
          >
            Contact
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-accent/50 hover:border-accent"
            >
              WhatsApp
            </Button>
          </a>
          <a
            href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              size="sm"
            >
              Join Community
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="shrink-0 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border/40 bg-background/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium transition-colors hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/events-courses"
              className="text-sm font-medium transition-colors hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              Events & Courses
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <a
              href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Join Community
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
