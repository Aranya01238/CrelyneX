"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    setIsSubmitting(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <Button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="mt-6"
      variant="outline"
    >
      {isSubmitting ? "Logging out..." : "Logout"}
    </Button>
  );
}
