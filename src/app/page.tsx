import type { Metadata } from "next";
import Image from "next/image";
import CarValuationWidget from "@/components/booking/CarValuationWidget";

export const metadata: Metadata = {
  title: "SellCarUAE – Sell Your Car Fast in Dubai & UAE",
  description: "The best service for evaluating and selling your car in Dubai & UAE. Free valuation, instant cash offer, same-day payment.",
};

const STEPS = [
  {
    num: "01", icon: "/assets/images/tab_ic_01.webp",
    title: "FILL OUT THE FORM", short: "Provide us with information about your vehicle",
    body: "Let us take the stress and hassle out of selling your used vehicle in the UAE. Start the process by completing a simple online form, which will tell us everything we need to know. Then sit back and relax, and wait for our expert team to contact you regarding the appointment process.",
  },
  {
    num: "02", icon: "/assets/images/tab_ic_02.svg",
    title: "BOOK AN APPOINTMENT", short: "Our experts will inspect your vehicle free of charge",
    body: "Before receiving your car's final offer, you'll need to bring your car to us or we will come to you for an inspection as this will ensure you get the best possible price for your Vehicle. The appointment will take around 15 minutes and you can sit back and relax in our comfy customer lounge and enjoy a hot or cold beverage of your choosing.",
  },
  {
    num: "03", icon: "/assets/images/tab_ic_03.svg",
    title: "COMPLETE THE SALE", short: "Receive your no-obligation offer and sell right away",
    body: "Once we've assessed your vehicle we'll be able to give you an offer on the spot. Our expert team uses up-to-date market information to give you the best price. Our offers are always non-obligational, but if you do decide you accept, you can receive your payment in cash or via a bank transfer.",
  },
];

const WHY_POINTS = [
  "Our Experienced Team Take Care of the Entire Process",
  "Simple, Convenient, and Dependable",
  "Fast Process",
  "Always get the Best Price",
  "Financed Vehicle? No Worries!",
];

const FAQS = [
  { q: "Where can I sell my used vehicle in the UAE?", a: "There are a variety of options on offer to people living in the UAE who want to sell their used vehicles. They could choose to sell privately or to a dealership - though this isn't without hard work and lots of paperwork. Alternatively, they could sell with ease using a service like ours, where we'll buy your car no matter its condition or type; and will fill all the paperwork out for you too." },
  { q: "How is vehicle ownership transferred in the UAE?", a: "The biggest downside of selling your used vehicle in the UAE is transferring ownership. There's quite a bit of paperwork involved with this process and failing to complete ownership transfer correctly can be costly. To complete the process you'll need to make a visit to RTA and schedule an appointment to officially transfer ownership. This is why many sellers prefer to use a service such as ours as we take care of all this hard work." },
  { q: "Should I have my car repaired before I sell it?", a: "If you're selling privately then you'll almost certainly need to make costly repairs to your vehicle before selling, as very few buyers want to purchase a damaged car. The cost of repairs can often outstrip the value of the car itself. Services such as ours will buy your car in any condition even if it has been damaged by an accident or is non-operational." },
  { q: "Can I sell my vehicle if it is on finance?", a: "While it is possible for a car under finance to be sold privately, there's a lot of tricky paperwork to complete before this can be done legally. At SELLCARUAE we can purchase your motor from you even if it's still on finance and will take care of the annoying paperwork for you, so all you have to do is receive your quote and accept our offer." },
  { q: "Is Car Inspection free?", a: "With our service, we'll take our time inspecting your vehicle and comparing our findings with our expert knowledge so you're sure to get the best price for your car. Once you've completed our super simple online valuation, you can book a time and date for your inspection that perfectly suits your schedule." },
  { q: "How long does the inspection process take?", a: "Despite being incredibly thorough and in-depth, our inspection process only takes around 10 minutes, which is the perfect amount of time for you to sit back, relax, and enjoy a cup of tea or coffee. Once the inspection is complete you can receive an offer, accept, and complete the sale of your car within just 30 minutes." },
  { q: "Can SELLCARUAE buy my car?", a: "Yes! We will quite literally buy any car in the UAE. It doesn't matter whether your vehicle doesn't run, is very old, is on finance, or is damaged by an accident — at SELLCARUAE we want to buy your vehicle and are committed to making the process as straightforward and convenient for you as possible." },
];

const TESTIMONIALS = [
  "I tried to sell my used car in Dubai for five months when I came across Sell Car UAE. This fantastic platform helped me sell my second-hand car in 30 mins at an amazing price. I am highly impressed by their fast and easy process and friendly customer service.",
  "Excellent service! The team was professional, the process was quick and the price offered was very fair. I would definitely recommend SellCarUAE to anyone looking to sell their car in Dubai.",
  "Amazing experience from start to finish. They came to my house, inspected the car, and I had cash in hand within the hour. Couldn't ask for more!",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section
        className="relative h-screen flex items-center justify-center flex-col"
        style={{
          backgroundImage: "url('/assets/images/hero_bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "cover",
        }}>
        <div className="conta-def w-full">
          <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-6"
            style={{ boxShadow: "0 0 10px #1EAD5E80" }} />
          <h1 className="def-h text-[#1D2126] mb-2">The best service for</h1>
          <h2 className="font-['Geometria'] text-[clamp(20px,2.8vw,32px)] font-normal text-[#1D2126] mb-8">
            evaluating and selling your car
          </h2>
          <div className="max-w-[700px]">
            <CarValuationWidget variant="hero" />
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="conta-def">
          <div className="text-center mb-12">
            <h2 className="font-['Geometria'] text-[clamp(28px,4vw,40px)] font-bold text-[#1D2126]">
              Just 3 simple steps and
            </h2>
            <h3 className="font-['Geometria'] text-[clamp(22px,3vw,35px)] font-normal text-[#1D2126]">
              your car is sold!
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-8 text-center"
                style={{ boxShadow: "0 5px 40px #0E285312" }}>
                <div className="relative mb-4">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 font-['Geometria'] font-bold text-[64px] leading-none text-[#B3EBCD69] select-none">
                    {s.num}
                  </span>
                  <div className="relative z-10 flex justify-center pt-4">
                    <Image src={s.icon} alt={s.title} width={60} height={60} />
                  </div>
                </div>
                <h3 className="font-['Poppins'] font-bold text-[16px] text-[#1D2126] mb-2 mt-4">{s.title}</h3>
                <p className="font-['Poppins'] font-medium text-[14px] text-[#1EAD5E] mb-3">{s.short}</p>
                <p className="font-['Poppins'] text-[14px] text-[#5B5F66] leading-6">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image src="/assets/images/phonetestimonial.webp" alt="Why Choose SellCarUAE"
                width={500} height={500} className="w-full max-w-md mx-auto rounded-2xl" />
            </div>
            <div>
              <h2 className="font-['Geometria'] text-[clamp(28px,4vw,40px)] font-bold text-[#1D2126] mb-2">
                Why Choose Us
              </h2>
              <h3 className="font-['Geometria'] text-[clamp(18px,2.5vw,28px)] font-normal text-[#1D2126] mb-6">
                to Sell Your Used Car in Dubai?
              </h3>
              <p className="def-p16 text-[#5B5F66] mb-4">
                Due to the transient nature of Dubai residents, the used car market in the UAE is very competitive.
                At SellCarUAE we&apos;ll buy your car without question; no matter its age, make, model, or condition.
              </p>
              <p className="def-p16 text-[#5B5F66] mb-4">
                Our sales process is simple and starts with filling out a conveniently easy form on our dependable website.
                You&apos;ll receive your free evaluation as soon as your motor has been inspected.
              </p>
              <p className="def-p16 text-[#5B5F66] mb-6">
                Our experts know exactly what to look for when assessing your car. If you&apos;re asking &apos;where to sell
                my car in Dubai&apos;, our service is the answer.
              </p>
              <ul className="space-y-3">
                {WHY_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#1EAD5E] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-['Poppins'] font-medium text-[15px] text-[#1D2126]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WE BUY ANY CAR ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="conta-def text-center max-w-3xl mx-auto">
          <h2 className="font-['Geometria'] text-[clamp(26px,4vw,36px)] font-bold text-[#1D2126] mb-6">We Buy Any Car</h2>
          <p className="def-p16 text-[#5B5F66]">
            Yes, you&apos;ve read that correctly, at SellCarUAE you can sell any car. It doesn&apos;t matter to us whether
            your car is on the fritz, hasn&apos;t driven in years, or has been damaged by an accident; we&apos;re more than
            happy to take your vehicle off your hands for a fair and honest price. We don&apos;t care about how old your car
            is, or its make, model, or condition — all we care about is giving you the best price possible.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-[#D8EEE0]">
        <div className="conta-def">
          <div className="text-center mb-10">
            <h2 className="font-['Geometria'] text-[clamp(26px,4vw,36px)] font-bold text-[#1D2126]">
              Take a Look What Our Customers
            </h2>
            <p className="font-['Geometria'] text-[clamp(18px,2.5vw,26px)] font-normal text-[#1D2126]">
              Have to Say About Us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6" style={{ boxShadow: "0 5px 40px #0E285312" }}>
                <div className="text-[#1EAD5E] text-3xl mb-3">&ldquo;</div>
                <p className="font-['Poppins'] text-[14px] text-[#5B5F66] leading-6">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="conta-def">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-['Geometria'] text-[clamp(26px,4vw,36px)] font-bold text-[#1D2126]">Frequently</h2>
              <h3 className="font-['Geometria'] text-[clamp(18px,2.5vw,26px)] font-normal text-[#1D2126] mb-3">
                ask questions
              </h3>
              <p className="def-p16 text-[#5B5F66] mb-6">Do you have any questions? Get expert advice</p>
              <Image src="/assets/images/faq_grid_img.svg" alt="FAQ" width={300} height={300}
                className="w-full max-w-xs" />
            </div>
            <div className="lg:col-span-2 space-y-3">
              {FAQS.map((f, i) => (
                <details key={i} className="faq-item border border-[#E9ECEF] rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 font-['Poppins'] font-medium text-[18px] text-[#1D2126] hover:bg-[#D8EEE0] transition-colors">
                    {f.q}
                    <span className="ml-4 flex-shrink-0 text-[#1EAD5E] text-xl font-bold">+</span>
                  </summary>
                  <div className="px-5 pb-5 font-['Poppins'] text-[15px] text-[#5B5F66] leading-7">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#1EAD5E]">
        <div className="conta-def text-center">
          <h2 className="font-['Geometria'] text-[clamp(24px,4vw,36px)] font-bold text-white mb-3">
            Turn Your Car into Cash Today
          </h2>
          <p className="font-['Poppins'] text-white/90 text-[16px] mb-8">
            Enter your details to start your free valuation now.
          </p>
          <a href="/car-valuation"
            className="inline-flex items-center justify-center bg-white text-[#1EAD5E] font-['Poppins'] font-semibold
              text-[14px] uppercase h-[50px] px-8 rounded-lg hover:bg-[#D8EEE0] transition-colors">
            Sell Your Car Today
          </a>
        </div>
      </section>
    </>
  );
}
