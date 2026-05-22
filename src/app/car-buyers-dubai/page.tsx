import type { Metadata } from "next";
import Image from "next/image";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "Car Buyers Dubai – Instant Cash Offer for Your Car",
  description: "Looking for car buyers in Dubai? SellCarUAE offers the best price for your used car. Free valuation, 10-minute inspection, same-day cash payment.",
};

const FAQS = [
  { q: "How quickly can I sell my car in Dubai?", a: "With SellCarUAE, you can complete the entire process in under 30 minutes. Fill out our form online, bring your car to our Sheikh Zayed Road branch (or we come to you), and receive your cash offer on the spot." },
  { q: "Do you buy cars with accidents or damage?", a: "Absolutely. We buy cars in any condition — accident damaged, non-operational, high mileage, or cosmetically imperfect. We'll always give you a fair offer regardless of the car's condition." },
  { q: "What documents do I need to sell my car?", a: "You'll need your Emirates ID, vehicle registration card, and car keys. If the car is financed, we'll handle the clearance paperwork for you." },
  { q: "Can you come to my location?", a: "Yes! We offer free home inspection services across Dubai. Select 'Home Inspection' when booking your appointment." },
];

export default function CarBuyersDubai() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
              <h1 className="def-h text-[#1D2126] mb-3">Car Buyers Dubai</h1>
              <p className="font-['Poppins'] text-[#5B5F66] text-[16px] mb-8">
                The most trusted car buyers in Dubai. We offer instant valuations, free inspections, and same-day cash payments for any car.
              </p>
              <a href="#valuate" className="btn-primary">Get My Cash Offer</a>
            </div>
            <div className="flex justify-center">
              <Image src="/assets/images/phonetestimonial.webp" alt="Car Buyers Dubai" width={450} height={400}
                className="w-full max-w-md rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Find car section */}
      <section id="valuate" className="py-20 bg-white">
        <div className="conta-def max-w-2xl mx-auto">
          <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] text-center mb-3">
            Find Out What Your Car Is Worth
          </h2>
          <p className="font-['Poppins'] text-[#5B5F66] text-center mb-10">Get your free valuation in seconds</p>
          <CarValuationWidget variant="form" />
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="conta-def">
          <h2 className="font-['Geometria'] text-[clamp(24px,3vw,36px)] font-bold text-[#1D2126] text-center mb-12">
            Why Choose SellCarUAE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏆", title: "Best Price", desc: "We use live market data to ensure you get the highest possible offer for your vehicle." },
              { icon: "⚡", title: "Fast Process", desc: "Complete the entire sale in under 30 minutes. From form submission to cash in hand." },
              { icon: "📋", title: "All Paperwork Done", desc: "We handle all RTA transfer requirements and finance clearance on your behalf." },
              { icon: "🚗", title: "Any Car", desc: "Any make, model, year, or condition. Financed vehicles welcome." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 text-center" style={{ boxShadow: "0 5px 40px #0E285312" }}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-['Poppins'] font-bold text-[16px] text-[#1D2126] mb-2">{item.title}</h3>
                <p className="font-['Poppins'] text-[14px] text-[#5B5F66]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#D8EEE0]">
        <div className="conta-def">
          <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] text-center mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "I tried to sell my used car in Dubai for five months when I came across Sell Car UAE. This fantastic platform helped me sell my second-hand car in 30 mins at an amazing price.",
              "Excellent service! The team was professional, the process was quick and the price offered was very fair. I would definitely recommend SellCarUAE.",
              "Amazing experience from start to finish. They came to my house, inspected the car, and I had cash in hand within the hour.",
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6" style={{ boxShadow: "0 5px 40px #0E285312" }}>
                <div className="text-[#1EAD5E] text-3xl mb-3">&ldquo;</div>
                <p className="font-['Poppins'] text-[14px] text-[#5B5F66] leading-6">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="conta-def max-w-3xl mx-auto">
          <h2 className="font-['Geometria'] text-[clamp(24px,3vw,32px)] font-bold text-[#1D2126] text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="faq-item border border-[#E9ECEF] rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-['Poppins'] font-medium text-[17px] text-[#1D2126] hover:bg-[#D8EEE0] transition-colors">
                  {f.q}
                  <span className="ml-4 flex-shrink-0 text-[#1EAD5E] text-xl font-bold">+</span>
                </summary>
                <div className="px-5 pb-5 font-['Poppins'] text-[15px] text-[#5B5F66] leading-7">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
