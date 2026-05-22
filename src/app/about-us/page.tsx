import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us – SellCarUAE",
  description: "Learn about SellCarUAE — the UAE's most trusted used car buyers. We offer fair valuations, fast payments, and a completely hassle-free selling experience.",
};

export default function AboutUs() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative py-20 bg-[#F8F8F8] overflow-hidden">
        <div className="conta-def relative z-10">
          <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
          <h1 className="def-h text-[#1D2126]">About Us</h1>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-['Geometria'] text-[clamp(22px,3vw,32px)] font-bold text-[#1D2126] mb-6">
                Our Family
              </h2>
              <p className="def-p16 text-[#5B5F66] mb-4">
                SellCarUAE was founded with a simple mission: to make selling your used car in the UAE as easy, fast, and fair as possible. We understand the unique challenges of the UAE used car market — the transient population, the complex paperwork, the RTA requirements — and we&apos;ve built our entire service around removing those obstacles for you.
              </p>
              <p className="def-p16 text-[#5B5F66] mb-4">
                Our team of automotive experts brings decades of combined experience in the UAE car market. We use real-time market data to ensure every offer we make is honest, accurate, and competitive. Unlike dealerships that lowball your car, or junkyards that only see scrap value, we see the true worth of your vehicle.
              </p>
              <p className="def-p16 text-[#5B5F66] mb-4">
                We buy any car — any make, model, year, or condition. Financed or not. Running or not. Our process takes under 30 minutes from inspection to cash in hand. We handle all the paperwork, including RTA transfer and finance clearance.
              </p>
              <p className="def-p16 text-[#5B5F66]">
                Based on Sheikh Zayed Road, Dubai, we serve customers across Dubai, Abu Dhabi, and Sharjah — with free home inspection available throughout the UAE. Thousands of happy customers have trusted us with their vehicles, and we&apos;re proud of every one of those transactions.
              </p>
            </div>
            <div>
              <Image
                src="/assets/images/image_2021_08_12T10_11_48_792Z.webp"
                alt="SellCarUAE Team"
                width={550}
                height={450}
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#D8EEE0]">
        <div className="conta-def">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "5,000+", label: "Cars Purchased" },
              { num: "30 min", label: "Average Process Time" },
              { num: "100%", label: "Paperwork Handled" },
              { num: "5★", label: "Customer Rating" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-['Geometria'] font-bold text-[clamp(28px,4vw,42px)] text-[#1EAD5E] mb-1">{s.num}</div>
                <div className="font-['Poppins'] text-[14px] text-[#5B5F66] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1EAD5E]">
        <div className="conta-def text-center">
          <h2 className="font-['Geometria'] text-[clamp(24px,4vw,36px)] font-bold text-white mb-3">
            Ready to Sell Your Car?
          </h2>
          <p className="font-['Poppins'] text-white/90 mb-8">
            Join thousands of satisfied customers who got the best price for their vehicle.
          </p>
          <a href="/car-valuation"
            className="inline-flex items-center justify-center bg-white text-[#1EAD5E] font-['Poppins'] font-semibold
              text-[14px] uppercase h-[50px] px-8 rounded-lg hover:bg-[#D8EEE0] transition-colors">
            Start Free Valuation
          </a>
        </div>
      </section>
    </>
  );
}
