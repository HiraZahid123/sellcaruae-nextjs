import type { Metadata } from "next";
import Image from "next/image";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Sell Scrap Car in UAE – Best Scrap Car Buyers in Dubai",
  description: "We are the best scrap car buyers in Dubai, Sharjah, and Abu Dhabi. Sell any junk car with us today. Instant cash, hassle-free process.",
};

export default function SellScrapCar() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
              <h1 className="def-h text-[#1D2126] mb-2">Scrap Your Car in UAE Instantly & Hassle-Free</h1>
              <p className="font-['Poppins'] text-[#1EAD5E] font-medium text-[18px] mt-3 mb-8">
                We are the Best Scrap Car Buyers in Dubai, Sell any junk car with us today
              </p>
              <CarValuationWidget variant="form" />
            </div>
            <div className="hidden lg:flex justify-center">
              <Image src="/assets/images/car-group.png" alt="Scrap Car UAE" width={450} height={350}
                className="w-full max-w-md object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="conta-def space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Geometria'] text-[clamp(22px,3vw,32px)] font-bold text-[#1D2126] mb-4">
                Do You Need To Scrap YOUR CAR?
              </h2>
              <p className="def-p16 text-[#5B5F66]">
                There are so many reasons why you might find yourself left with a car you need to scrap. From a faithful old motor that&apos;s finally given up, a car damaged by accident, or a vehicle that&apos;s now costing more to run and repair than it&apos;s worth; when you need to sell your junk car you need a service that&apos;s quick, reliable, and that won&apos;t break the bank. At SELLCARUAE we&apos;re proud to say that we&apos;re the number one scrap car buyers in Dubai, Sharjah, and Abu Dhabi.
              </p>
            </div>
            <Image src="/assets/images/scrp01.png" alt="Scrap Car" width={450} height={350}
              className="w-full max-w-md mx-auto rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Image src="/assets/images/scrp02.png" alt="Why Scrap" width={450} height={350}
              className="w-full max-w-md mx-auto rounded-2xl lg:order-1" />
            <div className="lg:order-2">
              <h2 className="font-['Geometria'] text-[clamp(22px,3vw,32px)] font-bold text-[#1D2126] mb-4">
                Why Might I Need To Scrap My Car?
              </h2>
              <p className="def-p16 text-[#5B5F66] mb-4">
                Vehicles that have sustained serious damage from an accident, flooding, or extensive wear may be too costly to repair. When repair costs exceed the car&apos;s market value, scrapping becomes the most sensible financial decision.
              </p>
              <p className="def-p16 text-[#5B5F66]">
                Older vehicles may also fail RTA roadworthiness tests, making them illegal to drive. In these cases, selling for scrap with SellCarUAE gives you a fair cash value with zero hassle.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Geometria'] text-[clamp(22px,3vw,32px)] font-bold text-[#1D2126] mb-4">
                Why Shouldn&apos;t I Sell My Scrap Car To A Junkyard?
              </h2>
              <p className="def-p16 text-[#5B5F66] mb-4">
                Junkyards typically offer the bare minimum for your scrap vehicle — often just the weight value of the metal. They don&apos;t consider the parts, the model value, or any reusable components.
              </p>
              <p className="def-p16 text-[#5B5F66]">
                At SellCarUAE, we assess your scrap car properly and give you a far better price than any junkyard would. We also handle all the deregistration paperwork, saving you time and stress.
              </p>
            </div>
            <Image src="/assets/images/scrp03.png" alt="Junkyard vs SellCarUAE" width={450} height={350}
              className="w-full max-w-md mx-auto rounded-2xl" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1EAD5E]">
        <div className="conta-def text-center">
          <h2 className="font-['Geometria'] text-[clamp(24px,4vw,36px)] font-bold text-white mb-3">Selling Your Car For Scrap Is Quick And Easy!</h2>
          <p className="font-['Poppins'] text-white/90 mb-8">Get your free scrap car valuation today.</p>
          <a href="/car-valuation" className="inline-flex items-center justify-center bg-white text-[#1EAD5E] font-['Poppins'] font-semibold text-[14px] uppercase h-[50px] px-8 rounded-lg hover:bg-[#D8EEE0] transition-colors">
            Get Scrap Car Value
          </a>
        </div>
      </section>
    </>
  );
}
