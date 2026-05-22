import type { Metadata } from "next";
import Image from "next/image";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Cash Your Car in UAE – Instant Cash for Any Car",
  description: "Cash any car in UAE from the comfort of your home. Trusted RTA-certified car buyers in Dubai. We handle loans too.",
};

const SECTIONS = [
  {
    icon: "/assets/cash-your-car/point1.svg",
    img: "/assets/cash-your-car/carapp.png",
    title: "Start with our Streamlined Online Process",
    body: "The cash your car option is now hassle-free with our online process. Simply provide your car details for a quick valuation on our website. After a few easy steps, we'll contact you immediately and provide you with an appointment at our branch.",
    reverse: false,
  },
  {
    icon: "/assets/cash-your-car/cloack.svg",
    img: "/assets/cash-your-car/savetime.png",
    title: "Trusted Partners: Cash for Your Car",
    body: "It is always crucial to verify the credibility of the prospective buyers claiming to cash any car. That is why you can trust us as your buyer, because we stand as a well-established enterprise in the UAE, boasting the trust of countless clients and holding certification from the RTA.",
    reverse: true,
  },
  {
    icon: "/assets/cash-your-car/cash.svg",
    img: "/assets/cash-your-car/money.png",
    title: "Cash for Cars: Anywhere",
    body: "We proudly stand by our promise: 'We cash any car.' Unlike others who may claim the same, we deliver as expected. Don't take our word for it – visit us and experience our honesty and fair deals firsthand.",
    reverse: false,
  },
  {
    icon: "/assets/cash-your-car/tinycar.svg",
    img: "/assets/cash-your-car/longdrive.png",
    title: "We Handle Car Loans Too",
    body: "Many car dealerships will give you a straightforward no when you try to sell them a car with payments due. We like to make things easier for our customers, so we will also facilitate you even if your car has loan payments.",
    reverse: true,
  },
];

export default function CashYourCar() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
              <h1 className="def-h text-[#1D2126] mb-6">Cash Any Car in UAE from Comfort of your home</h1>
              <a href="#book" className="btn-primary">Book Now</a>
            </div>
            <div id="book" className="max-w-md">
              <CarValuationWidget variant="form" />
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-20 bg-white">
        <div className="conta-def space-y-20">
          {SECTIONS.map((s, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${s.reverse ? "lg:flex-row-reverse" : ""}`}>
              <div className={s.reverse ? "lg:order-2" : ""}>
                <div className="w-12 h-12 mb-4">
                  <Image src={s.icon} alt="" width={48} height={48} className="object-contain" />
                </div>
                <h2 className="font-['Geometria'] text-[clamp(22px,3vw,30px)] font-bold text-[#1D2126] mb-4">{s.title}</h2>
                <p className="def-p16 text-[#5B5F66]">{s.body}</p>
              </div>
              <div className={s.reverse ? "lg:order-1" : ""}>
                <Image src={s.img} alt={s.title} width={450} height={350}
                  className="w-full max-w-md mx-auto rounded-2xl object-contain" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1EAD5E]">
        <div className="conta-def text-center">
          <h2 className="font-['Geometria'] text-[clamp(24px,4vw,36px)] font-bold text-white mb-3">Cash Your Car Today</h2>
          <p className="font-['Poppins'] text-white/90 mb-8">Get your free valuation and instant cash offer now.</p>
          <a href="/car-valuation" className="inline-flex items-center justify-center bg-white text-[#1EAD5E] font-['Poppins'] font-semibold text-[14px] uppercase h-[50px] px-8 rounded-lg hover:bg-[#D8EEE0] transition-colors">
            Get My Cash Offer
          </a>
        </div>
      </section>
    </>
  );
}
