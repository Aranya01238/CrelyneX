"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showLabel?: boolean;
}

export default function LogoutButton({ 
  className, 
  variant = "outline", 
  showLabel = true 
}: LogoutButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      // Clear any client side state/cookies if necessary
      document.cookie = "crelynex-member-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "crelynex-admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "crelynex-hr-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      disabled={isSubmitting}
      onClick={handleLogout}
      className={cn(
        "gap-2 rounded-xl transition-all active:scale-95",
        className
      )}
    >
      {isSubmitting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      {showLabel && (
        <span>{isSubmitting ? "Terminating..." : "Terminate Session"}</span>
      )}
    </Button>
  );
}
