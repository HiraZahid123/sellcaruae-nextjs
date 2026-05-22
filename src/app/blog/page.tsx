import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog – Car Selling Tips & UAE Auto News",
  description: "Read our latest articles on selling your car in Dubai and the UAE. Tips, guides, and insights from the SellCarUAE team.",
};

interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  categories: string | null;
  published_at: string;
}

async function getPosts(page = 1) {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/blog?page=${page}`, { cache: "no-store" });
  if (!res.ok) return { data: [], total: 0, pages: 1 };
  return res.json();
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1"));
  const { data: posts, total, pages } = await getPosts(page);

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1EAD5E] py-16">
        <div className="conta-def text-center">
          <h1 className="def-h text-white mb-3">Our Blog</h1>
          <p className="font-['Poppins'] text-white/80 text-[16px] max-w-xl mx-auto">
            Tips, guides and insights to help you sell your car fast and get the best price in the UAE.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <div className="conta-def">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-['Poppins'] text-[#9E9BA2] text-[16px]">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <p className="font-['Poppins'] text-[#9E9BA2] text-[13px] mb-8">{total} article{total !== 1 ? "s" : ""}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {posts.map((post: Post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="aspect-[16/9] bg-[#D8EEE0] relative overflow-hidden">
                      {post.thumbnail ? (
                        <Image src={post.thumbnail} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">🚗</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {post.categories && (
                        <p className="text-[11px] font-semibold text-[#1EAD5E] uppercase tracking-wide font-['Poppins'] mb-2">
                          {post.categories.split(",")[0].trim()}
                        </p>
                      )}
                      <h2 className="font-['Geometria'] font-bold text-[17px] text-[#1D2126] mb-3 line-clamp-2 group-hover:text-[#1EAD5E] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[12px] text-[#9E9BA2] font-['Poppins']">
                        {new Date(post.published_at).toLocaleDateString("en-AE", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center gap-2">
                  {page > 1 && (
                    <Link href={`/blog?page=${page - 1}`}
                      className="px-4 py-2 rounded-lg border border-[#E9ECEF] text-[13px] font-['Poppins'] hover:border-[#1EAD5E] text-[#5B5F66]">
                      ← Prev
                    </Link>
                  )}
                  <span className="px-4 py-2 text-[13px] font-['Poppins'] text-[#5B5F66]">
                    Page {page} of {pages}
                  </span>
                  {page < pages && (
                    <Link href={`/blog?page=${page + 1}`}
                      className="px-4 py-2 rounded-lg border border-[#E9ECEF] text-[13px] font-['Poppins'] hover:border-[#1EAD5E] text-[#5B5F66]">
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
