"use client";
import { useState } from "react";
import Link from "next/link";

interface BlogEditorProps {
  initialData?: {
    title: string;
    content: string;
    thumbnail: string;
    categories: string;
    is_published: boolean;
  };
  onSave: (data: {
    title: string;
    content: string;
    thumbnail: string;
    categories: string;
    is_published: boolean;
  }) => void;
  saving: boolean;
}

const TOOLBAR_ACTIONS = [
  { label: "H2", action: (sel: string) => `<h2>${sel || "Heading"}</h2>` },
  { label: "H3", action: (sel: string) => `<h3>${sel || "Subheading"}</h3>` },
  { label: "B", action: (sel: string) => `<strong>${sel || "bold text"}</strong>` },
  { label: "I", action: (sel: string) => `<em>${sel || "italic text"}</em>` },
  { label: "P", action: (sel: string) => `<p>${sel || "Paragraph text here."}</p>` },
  { label: "UL", action: (sel: string) => `<ul>\n  <li>${sel || "Item one"}</li>\n  <li>Item two</li>\n</ul>` },
  { label: "OL", action: (sel: string) => `<ol>\n  <li>${sel || "First step"}</li>\n  <li>Second step</li>\n</ol>` },
  { label: "Quote", action: (sel: string) => `<blockquote>${sel || "Quote text here."}</blockquote>` },
];

export default function BlogEditor({ initialData, onSave, saving }: BlogEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
  const [categories, setCategories] = useState(initialData?.categories || "");
  const [isPublished, setIsPublished] = useState(initialData?.is_published || false);
  const [tab, setTab] = useState<"write" | "preview">("write");

  function insertSnippet(snippet: (sel: string) => string) {
    const ta = document.getElementById("blog-content") as HTMLTextAreaElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = snippet(selected);
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content, thumbnail, categories, is_published: isPublished });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
            <div className="mb-4">
              <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Enter post title…" className="form-input text-[16px] font-semibold" required />
            </div>

            {/* Toolbar + tabs */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1 flex-wrap">
                {TOOLBAR_ACTIONS.map(a => (
                  <button key={a.label} type="button"
                    onClick={() => insertSnippet(a.action)}
                    className="px-2 py-1 text-[11px] font-semibold font-['Poppins'] border border-[#E9ECEF] rounded
                      text-[#5B5F66] hover:border-[#1EAD5E] hover:text-[#1EAD5E] transition-colors">
                    {a.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {(["write", "preview"] as const).map(t => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    className={`px-3 py-1 text-[12px] font-['Poppins'] font-semibold rounded capitalize transition-colors
                      ${tab === t ? "bg-[#1EAD5E] text-white" : "text-[#5B5F66] hover:text-[#1EAD5E]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            {tab === "write" ? (
              <textarea
                id="blog-content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your post content in HTML…&#10;&#10;<h2>Section heading</h2>&#10;<p>Your paragraph here.</p>"
                rows={22}
                required
                className="w-full bg-[#F8F8F8] border border-[#E9ECEF] rounded-lg p-4 text-[13px] font-mono
                  text-[#1D2126] outline-none focus:border-[#1EAD5E] resize-y leading-relaxed"
              />
            ) : (
              <div
                className="min-h-[400px] bg-[#F8F8F8] border border-[#E9ECEF] rounded-lg p-4 overflow-auto
                  prose max-w-none font-['Poppins'] text-[#1D2126]
                  [&_h2]:font-['Geometria'] [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2
                  [&_h3]:font-['Geometria'] [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-1
                  [&_p]:text-[#5B5F66] [&_p]:leading-relaxed [&_p]:mb-3
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-[#5B5F66]
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-[#5B5F66]
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[#1EAD5E] [&_blockquote]:pl-4 [&_blockquote]:italic"
                dangerouslySetInnerHTML={{ __html: content || "<p class='text-gray-400'>Nothing to preview yet…</p>" }}
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-white rounded-2xl border border-[#E9ECEF] p-5">
            <h3 className="font-['Poppins'] font-semibold text-[14px] text-[#1D2126] mb-4">Publish</h3>
            <label className="flex items-center gap-3 cursor-pointer mb-5">
              <div className={`relative w-10 h-5 rounded-full transition-colors ${isPublished ? "bg-[#1EAD5E]" : "bg-[#E9ECEF]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                  ${isPublished ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
              <input type="checkbox" className="sr-only" checked={isPublished}
                onChange={e => setIsPublished(e.target.checked)} />
              <span className="font-['Poppins'] text-[13px] text-[#1D2126] font-medium">
                {isPublished ? "Published" : "Draft"}
              </span>
            </label>
            <div className="flex gap-2">
              <button type="submit" disabled={saving || !title || !content}
                className="btn-primary flex-1 disabled:opacity-50 text-[13px]">
                {saving ? "Saving…" : "Save Post"}
              </button>
              <Link href="/admin/blog"
                className="px-4 py-2 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[13px]
                  font-['Poppins'] hover:border-[#1EAD5E] hover:text-[#1EAD5E] transition-colors">
                Cancel
              </Link>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="bg-white rounded-2xl border border-[#E9ECEF] p-5">
            <h3 className="font-['Poppins'] font-semibold text-[14px] text-[#1D2126] mb-3">Thumbnail URL</h3>
            <input type="url" value={thumbnail} onChange={e => setThumbnail(e.target.value)}
              placeholder="https://…" className="form-input text-[13px]" />
            {thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbnail} alt="thumbnail preview"
                className="mt-3 w-full rounded-lg object-cover aspect-video" />
            )}
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl border border-[#E9ECEF] p-5">
            <h3 className="font-['Poppins'] font-semibold text-[14px] text-[#1D2126] mb-3">Categories</h3>
            <input type="text" value={categories} onChange={e => setCategories(e.target.value)}
              placeholder="e.g. Tips, Guides, Dubai" className="form-input text-[13px]" />
            <p className="text-[11px] text-[#9E9BA2] font-['Poppins'] mt-1">Separate multiple with commas</p>
          </div>
        </div>
      </div>
    </form>
  );
}
