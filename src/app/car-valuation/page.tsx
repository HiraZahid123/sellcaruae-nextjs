import type { Metadata } from "next";
import Image from "next/image";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Free Car Valuation – Get Your Car Value in 30 Seconds",
  description: "Thinking of selling your car? Get your car value now in 30 seconds using our online car resale value calculator.",
};

export default function CarValuationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-[#F8F8F8] overflow-hidden">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
              <h1 className="def-h text-[#1D2126] mb-3">Free Car Valuation</h1>
              <p className="font-['Poppins'] text-[#1EAD5E] font-medium text-[18px] mb-6">
                Thinking of selling your car? Get your car Value now in 30 seconds using our online car resale value calculator
              </p>
              <a href="#valuate" className="btn-primary">Get My Valuation</a>
            </div>
            <div className="flex justify-center">
              <Image src="/assets/images/White-Car-Trans.png" alt="Car Valuation" width={500} height={350}
                className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Valuation form */}
      <section id="valuate" className="py-20 bg-white">
        <div className="conta-def max-w-2xl mx-auto">
          <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] text-center mb-3">
            Buying or Selling Car?
          </h2>
          <p className="font-['Poppins'] text-[#5B5F66] text-center mb-10">
            We Can Help to Evaluate the price of car
          </p>
          <CarValuationWidget variant="form" />
        </div>
      </section>

      {/* 3 steps */}
      <section className="py-16 bg-[#D8EEE0]">
        <div className="conta-def">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
    </>
  );
}
