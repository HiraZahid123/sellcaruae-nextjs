"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  categories: string | null;
  is_published: boolean;
}

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then(r => r.json())
      .then(d => setPost(d.data));
  }, [id]);

  async function handleSave(data: {
    title: string; content: string; thumbnail: string;
    categories: string; is_published: boolean;
  }) {
    setError("");
    setSaving(true);
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setSaving(false);
    if (!res.ok) { setError(json.error || "Failed to save"); return; }
    router.push("/admin/blog");
  }

  if (!post) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-[#1EAD5E] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126] mb-6">Edit Post</h1>
      {error && <p className="text-red-500 text-[13px] font-['Poppins'] mb-4">{error}</p>}
      <BlogEditor
        initialData={{
          title: post.title,
          content: post.content,
          thumbnail: post.thumbnail || "",
          categories: post.categories || "",
          is_published: post.is_published,
        }}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
