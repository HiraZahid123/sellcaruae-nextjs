import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions – SellCarUAE",
  description: "Read the terms and conditions for using SellCarUAE's car buying and valuation services.",
};

export default function TermsConditions() {
  return (
    <>
      <section className="py-20 bg-[#F8F8F8]">
        <div className="conta-def">
          <span className="block w-[50px] h-[3px] bg-[#1EAD5E] mb-4" />
          <h1 className="def-h text-[#1D2126]">Terms & Conditions</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="conta-def max-w-4xl">
          <div className="space-y-8 font-['Poppins'] text-[15px] text-[#5B5F66] leading-7">

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using the SellCarUAE website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">2. Services</h2>
              <p>SellCarUAE provides an online platform for valuing and selling used vehicles in the UAE. Our services include free vehicle valuations, appointment booking, vehicle inspections, and cash purchase of vehicles.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">3. Valuation & Offers</h2>
              <p>All valuations provided online are estimates only. Final offers are made after physical inspection of the vehicle at our branch or during a home inspection. All offers are non-binding and you are under no obligation to accept. SellCarUAE reserves the right to revise or withdraw any offer based on the physical condition of the vehicle.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">4. Vehicle Ownership</h2>
              <p>By submitting a vehicle for sale, you confirm that you are the legal owner of the vehicle or have full authority to sell it. You confirm the vehicle is free of any undisclosed encumbrances, or that any outstanding finance will be settled prior to or as part of the transaction.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">5. Phone Verification</h2>
              <p>To use our booking and valuation services, you must verify your UAE mobile number via SMS OTP. This helps us prevent fraudulent submissions. We will not share your number with third parties. Message rates may apply.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">6. Appointments</h2>
              <p>By booking an appointment, you agree to make the vehicle available at the agreed time. If you need to cancel or reschedule, please contact us at least 2 hours in advance. Repeated no-shows may result in restricted access to our services.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">7. Privacy & Data</h2>
              <p>We collect your name, phone number, email address, and vehicle details solely to facilitate our car-buying services. We do not sell your data to third parties. Your IP address may be recorded for fraud prevention purposes.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">8. Limitation of Liability</h2>
              <p>SellCarUAE shall not be liable for any indirect, incidental, or consequential damages arising from use of our services. Our maximum liability is limited to the value of any transaction completed through our platform.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">9. Governing Law</h2>
              <p>These Terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.</p>
            </div>

            <div>
              <h2 className="font-bold text-[20px] text-[#1D2126] mb-3">10. Changes to Terms</h2>
              <p>SellCarUAE reserves the right to update these Terms at any time. Continued use of our services after changes constitutes acceptance of the updated Terms. Last updated: 2024.</p>
            </div>

            <div className="pt-4 border-t border-[#E9ECEF]">
              <p>For any questions about these Terms, contact us at{" "}
                <a href="mailto:info@sellcaruae.com" className="text-[#1EAD5E] hover:underline">info@sellcaruae.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
