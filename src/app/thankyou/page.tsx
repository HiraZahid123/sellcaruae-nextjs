import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Confirmed – SellCarUAE",
  description: "Your appointment has been booked. Our team will be in touch shortly.",
};

export default function ThankYou() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F8F8F8] py-20">
      <div className="conta-def text-center max-w-2xl mx-auto">
        {/* Check circle */}
        <div className="w-24 h-24 bg-[#1EAD5E] rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ boxShadow: "0 0 40px #1EAD5E40" }}>
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-['Geometria'] text-[clamp(28px,4vw,42px)] font-bold text-[#1D2126] mb-4">
          Booking Confirmed!
        </h1>
        <p className="font-['Poppins'] text-[18px] text-[#5B5F66] mb-3">
          Thank you for choosing SellCarUAE.
        </p>
        <p className="font-['Poppins'] text-[16px] text-[#5B5F66] mb-10">
          We&apos;ve received your appointment and sent a confirmation to your email. Our team will be in touch shortly to confirm the details.
        </p>

        <div className="valuation-box text-left mb-10">
          <h2 className="font-['Poppins'] font-bold text-[#1D2126] text-[16px] mb-4">What happens next?</h2>
          <ul className="space-y-3">
            {[
              "Our team will confirm your appointment via SMS or call",
              "Bring your Emirates ID and vehicle registration card",
              "The inspection takes only 10 minutes",
              "Receive a cash offer on the spot — no obligation",
              "Get paid same day in cash or bank transfer",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1EAD5E] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </span>
                <span className="font-['Poppins'] text-[14px] text-[#5B5F66]">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary px-10">Back to Home</Link>
          <a href="tel:+971524881200"
            className="inline-flex items-center justify-center border-2 border-[#1EAD5E] text-[#1EAD5E]
              font-['Poppins'] font-semibold text-[14px] uppercase h-[50px] px-8 rounded-lg
              hover:bg-[#D8EEE0] transition-colors">
            Call Us: 052 488 1200
          </a>
        </div>
      </div>
    </section>
  );
}
