import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  categories: string | null;
  published_at: string;
  author_email: string | null;
}

async function getPost(slug: string): Promise<Post | null> {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/blog/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main>
      {/* Hero */}
      {post.thumbnail && (
        <div className="relative h-[340px] sm:h-[420px] w-full bg-[#D8EEE0]">
          <Image src={post.thumbnail} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <section className="py-12">
        <div className="conta-def max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px] font-['Poppins'] text-[#9E9BA2] mb-6">
            <Link href="/blog" className="hover:text-[#1EAD5E] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#5B5F66] truncate">{post.title}</span>
          </div>

          {/* Categories */}
          {post.categories && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.split(",").map(cat => (
                <span key={cat}
                  className="text-[11px] font-semibold text-[#1EAD5E] bg-[#D8EEE0] px-3 py-1 rounded-full font-['Poppins'] uppercase tracking-wide">
                  {cat.trim()}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-['Geometria'] font-bold text-[clamp(24px,4vw,40px)] text-[#1D2126] mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-[13px] text-[#9E9BA2] font-['Poppins'] mb-10 pb-6 border-b border-[#E9ECEF]">
            <span>
              {new Date(post.published_at).toLocaleDateString("en-AE", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            {post.author_email && (
              <>
                <span>·</span>
                <span>By {post.author_email.split("@")[0]}</span>
              </>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none font-['Poppins'] text-[#1D2126]
              [&_h2]:font-['Geometria'] [&_h2]:font-bold [&_h2]:text-[#1D2126] [&_h2]:mt-8 [&_h2]:mb-3
              [&_h3]:font-['Geometria'] [&_h3]:font-bold [&_h3]:text-[#1D2126] [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:text-[#5B5F66] [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-[#5B5F66] [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-[#5B5F66] [&_ol]:mb-4
              [&_li]:mb-1 [&_a]:text-[#1EAD5E] [&_a]:underline
              [&_strong]:text-[#1D2126] [&_strong]:font-semibold
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#1EAD5E] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#5B5F66]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back */}
          <div className="mt-12 pt-6 border-t border-[#E9ECEF]">
            <Link href="/blog" className="btn-primary">← Back to Blog</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
