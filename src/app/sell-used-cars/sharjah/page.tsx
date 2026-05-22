import type { Metadata } from "next";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Sell Used Car in Sharjah – Best Price Guaranteed",
  description: "Sell your used car in Sharjah fast and hassle-free. Free valuation, instant cash offer, same-day payment.",
};

export default function SellUsedCarsSharjah() {
  return (
    <>
      <section className="py-16 bg-[#F8F8F8]">
        <div className="conta-def">
          <div className="max-w-2xl">
            <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
            <h1 className="def-h text-[#1D2126] mb-6">Sell Used Car in Sharjah.</h1>
            <CarValuationWidget variant="form" />
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="conta-def max-w-3xl mx-auto">
          <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] mb-6">Sell Your Car in Sharjah</h2>
          <p className="def-p16 text-[#5B5F66] mb-4">
            Looking to sell your used car in Sharjah? SellCarUAE makes it easy. Complete our simple online valuation form, and our team will contact you to arrange a free inspection at your convenience — we can even come to you.
          </p>
          <p className="def-p16 text-[#5B5F66]">
            We buy any car in any condition. Get a fair, honest offer and same-day cash payment. No hidden fees, no hassle.
          </p>
        </div>
      </section>
    </>
  );
}
