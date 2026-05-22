"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(data: {
    title: string; content: string; thumbnail: string;
    categories: string; is_published: boolean;
  }) {
    setError("");
    setSaving(true);
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setSaving(false);
    if (!res.ok) { setError(json.error || "Failed to save"); return; }
    router.push("/admin/blog");
  }

  return (
    <div>
      <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126] mb-6">New Blog Post</h1>
      {error && <p className="text-red-500 text-[13px] font-['Poppins'] mb-4">{error}</p>}
      <BlogEditor onSave={handleSave} saving={saving} />
    </div>
  );
}
