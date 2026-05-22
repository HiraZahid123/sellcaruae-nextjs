import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us – SellCarUAE",
  description: "Get in touch with SellCarUAE. Call, WhatsApp, or email us for help selling your car in Dubai and across the UAE.",
};

export default function ContactUs() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="conta-def">
          <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
          <h1 className="def-h text-[#1D2126]">Contact Us</h1>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20 bg-white">
        <div className="conta-def">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Customer Service */}
            <div className="bg-[#F8F8F8] rounded-2xl p-8 text-center" style={{ boxShadow: "0 5px 40px #0E285312" }}>
              <div className="w-16 h-16 bg-[#D8EEE0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1EAD5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-['Poppins'] font-bold text-[18px] text-[#1D2126] mb-3">Customer Service</h3>
              <p className="font-['Poppins'] text-[14px] text-[#5B5F66] mb-2">8:00 AM – 5:30 PM</p>
              <p className="font-['Poppins'] text-[14px] text-[#5B5F66]">Monday through Friday</p>
            </div>

            {/* Our Offices */}
            <div className="bg-[#F8F8F8] rounded-2xl p-8 text-center" style={{ boxShadow: "0 5px 40px #0E285312" }}>
              <div className="w-16 h-16 bg-[#D8EEE0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1EAD5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="font-['Poppins'] font-bold text-[18px] text-[#1D2126] mb-3">Our Offices</h3>
              <p className="font-['Poppins'] text-[14px] text-[#5B5F66] mb-2">For general enquiries</p>
              <a href="tel:+971524881200" className="font-['Poppins'] font-semibold text-[#1EAD5E] text-[16px] hover:underline">
                (971) 52-4881200
              </a>
            </div>

            {/* Media Inquiries */}
            <div className="bg-[#F8F8F8] rounded-2xl p-8 text-center" style={{ boxShadow: "0 5px 40px #0E285312" }}>
              <div className="w-16 h-16 bg-[#D8EEE0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1EAD5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="font-['Poppins'] font-bold text-[18px] text-[#1D2126] mb-3">Media Inquiries</h3>
              <a href="tel:+971551865677" className="block font-['Poppins'] font-semibold text-[#1EAD5E] text-[16px] hover:underline mb-1">
                (971) 55-1865677
              </a>
              <a href="mailto:info@sellcaruae.com" className="font-['Poppins'] text-[14px] text-[#5B5F66] hover:text-[#1EAD5E] transition-colors">
                info@sellcaruae.com
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/assets/images/map.webp"
              alt="SellCarUAE Location — Sheikh Zayed Road, Dubai"
              width={1200}
              height={400}
              className="w-full object-cover"
            />
          </div>

          {/* Address */}
          <div className="mt-8 text-center">
            <p className="font-['Poppins'] font-medium text-[16px] text-[#1D2126]">
              Sheikh Zayed Road, Next to Bentley Showroom, Dubai, UAE
            </p>
            <p className="font-['Poppins'] text-[14px] text-[#5B5F66] mt-1">
              Saturday to Thursday: 10:00 – 20:00 &nbsp;|&nbsp; Friday (Home Service Only): 14:00 – 20:00
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="conta-def max-w-2xl mx-auto">
          <h2 className="font-['Geometria'] font-bold text-[clamp(24px,3vw,36px)] text-[#1D2126] mb-2 text-center">
            Send Us a Message
          </h2>
          <p className="font-['Poppins'] text-[15px] text-[#5B5F66] text-center mb-8">
            Fill in the form below and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
