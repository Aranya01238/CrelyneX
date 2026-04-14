"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Image as ImageIcon,
  Video,
  Trash2,
  Plus,
  UploadCloud,
  PlayCircle,
  ExternalLink,
} from "lucide-react";
import type { GraphicsUpload } from "@/lib/graphics";

const initialForm = {
  title: "",
  type: "poster" as const,
  url: "",
  description: "",
};

export default function GraphicsPortalClient() {
  const [uploads, setUploads] = useState<GraphicsUpload[]>([]);
  const [form, setForm] = useState<{
    title: string;
    type: "poster" | "video";
    url: string;
    description: string;
  }>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [memberId, setMemberId] = useState("");

  const loadUploads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/graphics");
      if (!response.ok) throw new Error("Load failed.");
      const data = await response.json();
      setUploads(data);
    } catch (err) {
      setError("Failed to synchronize with central storage.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)"),
      );
      return match ? decodeURIComponent(match[2]) : "";
    };
    setMemberId(getCookie("crelynex-member-id"));
    loadUploads();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/graphics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Synchronization failed.");
      setForm(initialForm);
      await loadUploads();
    } catch (err) {
      setError("Failed to register new data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/graphics", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Removal failed.");
      await loadUploads();
    } catch (err) {
      setError("Failed to scrub data.");
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 border border-purple-500/20 bg-purple-500/10 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-purple-400 uppercase">
            <UploadCloud className="w-3 h-3" /> Shared Creative Hub
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">
            Graphics <span className="text-gradient-purple">Vault</span>
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-2xl">
            A secure distributed storage for CrelyneX promotional content.
            Upload, preview, and synchronize posters and video assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Registration Side */}
        <Card className="lg:col-span-4 border-white/5 bg-background shadow-2xl rounded-[32px] overflow-hidden reveal-left delay-100">
          <CardHeader className="p-8 pb-4 border-b border-white/5">
            <CardTitle className="text-xl font-black text-white flex items-center gap-3">
              <Plus className="w-5 h-5 text-purple-500" /> New Submission
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6 pt-6">
            <form onSubmit={handleAdd} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    Classification
                  </label>
                  <Select
                    value={form.type}
                    onValueChange={(val) =>
                      setForm((f) => ({
                        ...f,
                        type: val as "poster" | "video",
                      }))
                    }
                  >
                    <SelectTrigger className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/10">
                      <SelectItem value="poster">
                        Static Poster (Image)
                      </SelectItem>
                      <SelectItem value="video">Dynamic Video (URL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    Asset Label
                  </label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Brief identifying name"
                    className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    Digital Location (URL)
                  </label>
                  <Input
                    value={form.url}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, url: e.target.value }))
                    }
                    placeholder="Direct link to source file"
                    className="h-12 bg-white/5 border-white/5 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-[10px] text-purple-500 font-bold bg-purple-500/10 p-3 rounded-xl italic">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-purple-600 hover:bg-purple-500 text-white font-black text-sm rounded-2xl flex gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <UploadCloud className="w-4 h-4" />
                )}
                Synchronize Asset
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Gallery Side */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-8 reveal delay-200">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-zinc-500" /> Distributed Assets
            </h3>
            {isLoading && (
              <Loader2 className="animate-spin w-4 h-4 text-zinc-500" />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full reveal-right delay-300">
            {uploads.map((upload, i) => (
              <Card
                key={upload.id}
                className="group overflow-hidden border-white/5 bg-[#0a0a0a] rounded-[32px] hover:bg-white/5 transition-all shadow-xl"
              >
                <div className="relative aspect-video glass overflow-hidden flex items-center justify-center p-2">
                  {upload.type === "poster" ? (
                    <img
                      src={upload.url}
                      alt={upload.title}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/600x400/0a0a0a/444?text=PREVIEW_NA")
                      }
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 text-zinc-600 group-hover:text-purple-500 transition-colors">
                      <PlayCircle className="w-12 h-12" />
                      <span className="text-[8px] font-black uppercase tracking-widest">
                        Video Stream
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 z-10">
                    <a
                      href={upload.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 glass rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <CardContent className="p-6 relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-white uppercase tracking-wide truncate">
                        {upload.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[8px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                        <div className="flex items-center gap-1">
                          {upload.type === "poster" ? (
                            <ImageIcon className="w-2.5 h-2.5" />
                          ) : (
                            <Video className="w-2.5 h-2.5" />
                          )}
                          {upload.type}
                        </div>
                        <div className="h-3 w-px bg-white/10" />
                        <span>BY {upload.uploadedByName}</span>
                      </div>
                    </div>
                    {upload.uploadedBy === memberId && (
                      <Button
                        onClick={() => handleDelete(upload.id)}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-white/5 glass text-zinc-500 hover:text-purple-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {uploads.length === 0 && !isLoading && (
              <div className="col-span-2 py-32 glass rounded-[40px] border-dashed border-white/10 text-center flex flex-col items-center justify-center gap-4">
                <ImageIcon className="w-12 h-12 text-white/5" />
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest italic">
                  Digital archive is currently empty.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
