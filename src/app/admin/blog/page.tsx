"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  categories: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/blog?page=${page}`);
    const data = await res.json();
    setPosts(data.data || []);
    setTotal(data.total || 0);
    setPages(data.pages || 1);
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  async function togglePublish(post: Post) {
    setToggling(post.id);
    await fetch(`/api/admin/blog/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: post.title,
        content: "",
        is_published: !post.is_published,
      }),
    });
    setToggling(null);
    fetchPosts();
  }

  async function deletePost(id: number) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchPosts();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126]">Blog Posts</h1>
          <p className="text-[#5B5F66] text-[13px] font-['Poppins'] mt-0.5">{total} posts</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary">+ New Post</Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9ECEF] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#1EAD5E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#9E9BA2] font-['Poppins'] text-[14px] mb-4">No blog posts yet.</p>
            <Link href="/admin/blog/new" className="btn-primary">Write your first post</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-['Poppins']">
              <thead>
                <tr className="border-b border-[#E9ECEF] bg-[#F8F8F8]">
                  {["Title", "Categories", "Status", "Date", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[#9E9BA2] font-semibold text-[12px] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F8F8]">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#1D2126] max-w-[280px] truncate">{post.title}</p>
                      <p className="text-[11px] text-[#9E9BA2]">/blog/{post.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-[#5B5F66]">
                      {post.categories || <span className="text-[#9E9BA2]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublish(post)}
                        disabled={toggling === post.id}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors disabled:opacity-50
                          ${post.is_published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                        {toggling === post.id ? "…" : post.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-[#9E9BA2]">
                      {new Date(post.created_at).toLocaleDateString("en-AE")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/blog/${post.id}/edit`}
                          className="px-3 py-1 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[12px] hover:border-[#1EAD5E] hover:text-[#1EAD5E] transition-colors">
                          Edit
                        </Link>
                        {post.is_published && (
                          <Link href={`/blog/${post.slug}`} target="_blank"
                            className="px-3 py-1 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[12px] hover:border-[#1EAD5E] hover:text-[#1EAD5E] transition-colors">
                            View ↗
                          </Link>
                        )}
                        <button onClick={() => deletePost(post.id)} disabled={deleting === post.id}
                          className="px-3 py-1 border border-red-200 text-red-400 rounded-lg text-[12px] hover:bg-red-50 transition-colors disabled:opacity-50">
                          {deleting === post.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">
            ← Prev
          </button>
          <span className="px-3 py-1.5 text-[13px] text-[#5B5F66]">Page {page} of {pages}</span>
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
