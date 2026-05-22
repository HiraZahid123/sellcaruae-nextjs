import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found – SellCarUAE",
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F8F8F8] py-20">
      <div className="conta-def text-center max-w-xl mx-auto">
        <p className="font-['Geometria'] font-bold text-[100px] text-[#D8EEE0] leading-none mb-4">404</p>
        <h1 className="font-['Geometria'] font-bold text-[clamp(24px,4vw,36px)] text-[#1D2126] mb-4">
          Page Not Found
        </h1>
        <p className="font-['Poppins'] text-[16px] text-[#5B5F66] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary px-10">Go to Home</Link>
          <Link href="/car-valuation"
            className="inline-flex items-center justify-center border-2 border-[#1EAD5E] text-[#1EAD5E]
              font-['Poppins'] font-semibold text-[14px] uppercase h-[50px] px-8 rounded-lg
              hover:bg-[#D8EEE0] transition-colors">
            Value My Car
          </Link>
        </div>
      </div>
    </section>
  );
}
