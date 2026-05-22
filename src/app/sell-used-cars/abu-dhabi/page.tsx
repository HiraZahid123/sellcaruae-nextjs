import type { Metadata } from "next";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Sell Used Car in Abu Dhabi – Best Price Guaranteed",
  description: "Sell your used car in Abu Dhabi fast and hassle-free. Get the best price, same-day cash payment. We buy any car in any condition.",
};

export default function SellUsedCarsAbuDhabi() {
  return (
    <>
      <section className="py-16 bg-[#F8F8F8]">
        <div className="conta-def">
          <div className="max-w-2xl">
            <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
            <h1 className="def-h text-[#1D2126] mb-6">Sell Used Car in Abu Dhabi.</h1>
            <CarValuationWidget variant="form" />
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="conta-def max-w-3xl mx-auto">
          <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] mb-6">Sell Your Car in Abu Dhabi</h2>
          <p className="def-p16 text-[#5B5F66] mb-4">
            Whether you&apos;re based in Abu Dhabi or the wider UAE, SellCarUAE is here to help you sell your used vehicle quickly and at the best price. Our team of experts will come to you for a free home inspection, or you can visit our Dubai branch for a 10-minute assessment.
          </p>
          <p className="def-p16 text-[#5B5F66]">
            We buy any car — any make, model, age, or condition. Financed vehicles welcome. Start your free valuation today and receive a same-day cash offer.
          </p>
        </div>
      </section>
    </>
  );
}
