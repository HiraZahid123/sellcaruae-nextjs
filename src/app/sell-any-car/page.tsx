import type { Metadata } from "next";
import Image from "next/image";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Sell Any Car in UAE – Any Condition, Any Make",
  description: "Evaluate and sell your car fast! The number one way to sell your car in the UAE hassle-free. Broken, old, accident car — we buy it all.",
};

export default function SellAnyCar() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 overflow-hidden bg-[#F8F8F8]">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
              <h1 className="def-h text-[#1D2126] mb-2">Evaluate and Sell Your Car Fast!</h1>
              <p className="font-['Poppins'] text-[#1EAD5E] font-medium text-[18px] mb-8">
                The number one way to sell your car in the UAE hassle-free!
              </p>
              <CarValuationWidget variant="form" />
            </div>
            <div className="hidden lg:flex justify-center">
              <Image src="/assets/images/sell-any-car.png" alt="Sell Any Car" width={450} height={400}
                className="w-full max-w-sm object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="py-16 bg-[#D8EEE0]">
        <div className="conta-def">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { num: "01", title: "FILL OUT THE FORM", desc: "Fill our perfectly simple online car valuation form." },
              { num: "02", title: "INSPECTION", desc: "Have a cup of coffee while we are doing our inspection to your used car." },
              { num: "03", title: "COMPLETE THE SALE", desc: "Get your used car SOLD and Cash it!" },
            ].map(s => (
              <div key={s.num} className="bg-white rounded-xl p-6" style={{ boxShadow: "0 5px 40px #0E285312" }}>
                <span className="font-['Geometria'] font-bold text-[48px] text-[#B3EBCD69] leading-none block">{s.num}</span>
                <h3 className="font-['Poppins'] font-bold text-[15px] text-[#1D2126] mt-2 mb-2">{s.title}</h3>
                <p className="font-['Poppins'] text-[14px] text-[#5B5F66]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-20 bg-white">
        <div className="conta-def space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] mb-4">Want to Sell Your Car?</h2>
              <p className="def-p16 text-[#5B5F66]">
                We are on SERVICE! Learn how you can sell your car through SELL ANY CAR: Broken car? Old Car? Old Model? Accident Car? Non-operational car? WHATEVER your used car is. We are still more than happy to buy your used car and with the best price that leaves you satisfied.
              </p>
            </div>
            <Image src="/assets/images/buy-car-from-car-dealer.png" alt="Buy Car" width={450} height={350}
              className="w-full max-w-md mx-auto rounded-2xl" />
          </div>

          <div>
            <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] mb-4">
              How To Sell Your Used Car Online With Us With No Hassle?
            </h2>
            <p className="def-p16 text-[#5B5F66] mb-4">
              The UAE is a fast-paced country where residents come and go. Because of this dynamic, there&apos;s always a strong demand for used cars across Dubai, Abu Dhabi, Sharjah, and beyond. Selling online with SellCarUAE is the fastest, safest, and most convenient way to turn your car into cash.
            </p>
            <p className="def-p16 text-[#5B5F66]">
              Simply fill out our online form, book your free inspection, receive your offer — and get paid the same day. We handle all the paperwork, including RTA transfer requirements and finance clearance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1EAD5E]">
        <div className="conta-def text-center">
          <h2 className="font-['Geometria'] text-[clamp(24px,4vw,36px)] font-bold text-white mb-3">Ready to Sell Any Car?</h2>
          <p className="font-['Poppins'] text-white/90 mb-8">Start your free valuation today — any make, model, or condition.</p>
          <a href="/car-valuation" className="inline-flex items-center justify-center bg-white text-[#1EAD5E] font-['Poppins'] font-semibold text-[14px] uppercase h-[50px] px-8 rounded-lg hover:bg-[#D8EEE0] transition-colors">
            Evaluate My Car
          </a>
        </div>
      </section>
    </>
  );
}
