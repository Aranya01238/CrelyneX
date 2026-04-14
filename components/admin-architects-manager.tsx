"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UserPlus, Trash2, Pencil, X, Users2 } from "lucide-react";

type Architect = {
  id: string;
  name: string;
  role: string;
  bio: string;
  icon: string;
};

const initialForm = {
  name: "",
  role: "",
  bio: "",
  icon: "",
};

export default function AdminArchitectsManager() {
  const [architects, setArchitects] = useState<Architect[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingArchitectId, setEditingArchitectId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const loadArchitects = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/architects", {
        cache: "no-store",
      });
      const data = (await response.json()) as Architect[] | { error?: string };

      if (!response.ok) {
        throw new Error(
          (data as { error?: string }).error || "Failed to load architects.",
        );
      }

      setArchitects(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to load architects.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadArchitects();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const isEditing = Boolean(editingArchitectId);
      const method = isEditing ? "PATCH" : "POST";
      const payload = isEditing ? { id: editingArchitectId, ...form } : form;

      const response = await fetch("/api/admin/architects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to save architect.");
      }

      setForm(initialForm);
      setEditingArchitectId(null);
      setMessage(isEditing ? "Architect updated." : "Architect added.");
      await loadArchitects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Operation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (architect: Architect) => {
    setEditingArchitectId(architect.id);
    setForm({
      name: architect.name,
      role: architect.role,
      bio: architect.bio,
      icon: architect.icon,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingArchitectId(null);
    setForm(initialForm);
    setMessage("");
  };

  const removeArchitect = async (id: string) => {
    if (!confirm("Delete this architect entry?")) return;
    if (editingArchitectId === id) {
      cancelEdit();
    }

    setMessage("");
    try {
      const response = await fetch("/api/admin/architects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete architect.");
      }

      setMessage("Architect deleted.");
      await loadArchitects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Card
          className={`lg:col-span-5 border-white/5 bg-background shadow-2xl rounded-4xl overflow-hidden transition-all duration-300 ${editingArchitectId ? "ring-1 ring-emerald-500/40" : ""}`}
        >
          <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              {editingArchitectId ? (
                <>
                  <Pencil className="w-6 h-6 text-emerald-500" /> Edit Architect
                </>
              ) : (
                <>
                  <UserPlus className="w-6 h-6 text-red-500" /> Add Architect
                </>
              )}
            </CardTitle>

            {editingArchitectId && (
              <Button
                onClick={cancelEdit}
                variant="ghost"
                size="icon"
                className="text-zinc-500 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </CardHeader>

          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Full Name
                </label>
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Name"
                  className="h-12 bg-white/5 border-white/5 focus:border-red-500 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Role
                </label>
                <Input
                  value={form.role}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                  placeholder="Role or title"
                  className="h-12 bg-white/5 border-white/5 focus:border-red-500 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Icon
                </label>
                <Input
                  value={form.icon}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, icon: event.target.value }))
                  }
                  placeholder="Emoji icon (example: 👨‍💼)"
                  className="h-12 bg-white/5 border-white/5 focus:border-red-500 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Bio
                </label>
                <Textarea
                  value={form.bio}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, bio: event.target.value }))
                  }
                  placeholder="Short bio"
                  className="min-h-30 bg-white/5 border-white/5 focus:border-red-500 rounded-xl"
                  required
                />
              </div>

              {message && (
                <p className="text-xs font-bold bg-white/5 p-3 rounded-xl text-zinc-300">
                  {message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-14 text-white font-black text-lg rounded-2xl ${editingArchitectId ? "bg-emerald-600 hover:bg-emerald-500" : "bg-red-600 hover:bg-red-500"}`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : editingArchitectId ? (
                  "Save Changes"
                ) : (
                  "Create Architect"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Users2 className="w-5 h-5 text-red-500" /> Architects Directory
            </h3>
            {isLoading && (
              <Loader2 className="animate-spin w-4 h-4 text-zinc-500" />
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {architects.map((architect) => (
              <div
                key={architect.id}
                className={`glass group p-6 rounded-4xl border-white/5 flex flex-col xl:flex-row items-center justify-between gap-6 transition-all hover:bg-white/5 ${editingArchitectId === architect.id ? "ring-1 ring-emerald-500/30 bg-emerald-500/5" : ""}`}
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="h-16 w-16 rounded-2xl border border-red-500/20 bg-red-500/10 flex shrink-0 items-center justify-center text-2xl">
                    {architect.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">
                      {architect.name}
                    </h4>
                    <div className="text-[10px] font-bold tracking-widest text-red-400 uppercase">
                      {architect.role}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      {architect.bio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto justify-end shrink-0">
                  <Button
                    onClick={() => startEdit(architect)}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-white/5 glass text-zinc-500 hover:text-emerald-400 shrink-0"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeArchitect(architect.id)}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-white/5 glass text-zinc-500 hover:text-red-500 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {!isLoading && architects.length === 0 && (
              <div className="text-center py-20 glass rounded-4xl border-dashed border-white/10">
                <p className="text-zinc-500 text-sm font-medium">
                  No architects found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
