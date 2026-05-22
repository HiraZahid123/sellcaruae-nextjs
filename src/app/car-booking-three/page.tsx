"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = ["Select your Car", "Model & Condition", "Book Appointment"];

type Stage = "phone" | "otp" | "appointment";

// Office branches
const BRANCHES = [
  "Main Office — Al Quoz, Dubai",
  "Branch — Deira, Dubai",
  "Branch — Sharjah",
  "Branch — Abu Dhabi",
];

// Time slots
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM",
];

// Min date = tomorrow
function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function BookingThreeContent() {
  const router = useRouter();
  const params = useSearchParams();
  const make = params.get("make") || "";
  const model = params.get("model") || "";
  const year = params.get("year") || "";
  const mileage = params.get("mileage") || "";
  const specs = params.get("specs") || "";
  const variantId = params.get("variant_id") || "";

  const [stage, setStage] = useState<Stage>("phone");

  // Phone stage
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [sending, setSending] = useState(false);
  const [devCode, setDevCode] = useState("");

  // OTP stage
  const [otp, setOtp] = useState("");
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Appointment stage
  const [email, setEmail] = useState("");
  const [yourPrice, setYourPrice] = useState("");
  const [bookingType, setBookingType] = useState<"OFFICE_VISIT" | "HOME_INSPECTION">("OFFICE_VISIT");
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [homeAddress, setHomeAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to send OTP"); return; }
      if (data.dev_code) setDevCode(data.dev_code);
      setStage("otp");
    } finally {
      setSending(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setVerifying(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid code"); return; }
      setVerifiedPhone(data.phone);
      setStage("appointment");
    } finally {
      setVerifying(false);
    }
  }

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // 1. Create lead
      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: verifiedPhone,
          make, model, year: parseInt(year),
          mileage, specs,
          variant_id: variantId ? parseInt(variantId) : null,
          your_price: yourPrice || null,
        }),
      });
      const leadData = await leadRes.json();
      if (!leadRes.ok) { setError(leadData.error || "Submission failed"); return; }

      // 2. Create appointment
      const apptRes = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadData.lead_id,
          booking_type: bookingType,
          date,
          time,
          email,
          branch: bookingType === "OFFICE_VISIT" ? branch : null,
          home_address: bookingType === "HOME_INSPECTION" ? homeAddress : null,
          // context for email
          make, model, year, mileage, specs,
          name: name || null,
          phone: verifiedPhone,
        }),
      });
      const apptData = await apptRes.json();
      if (!apptRes.ok) { setError(apptData.error || "Appointment failed"); return; }

      router.push("/thankyou");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] py-12">
      <div className="conta-def max-w-2xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0
                ${i < 2 ? "border-[#4EB876] bg-[#4EB876] text-white" : "border-[#1EAD5E] bg-[#1EAD5E] text-white"}`}>
                {i < 2 ? "✓" : "3"}
              </span>
              <span className={`text-sm font-['Poppins'] hidden sm:block
                ${i === 2 ? "text-[#1EAD5E] font-semibold" : "text-[#4EB876]"}`}>{s}</span>
              {i < 2 && <span className="flex-1 h-px bg-[#4EB876] hidden sm:block" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">

          {/* ── PHONE STAGE ─────────────────────────────────────── */}
          {stage === "phone" && (
            <>
              <h1 className="font-['Geometria'] font-bold text-[24px] text-[#1D2126] mb-1">Book Your Appointment</h1>
              <p className="text-[#5B5F66] text-[14px] font-['Poppins'] mb-6">
                Enter your contact details and we&apos;ll confirm your free car evaluation.
              </p>
              <form onSubmit={sendOtp} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                    Your Name <span className="text-[#9E9BA2] font-normal">(optional)</span>
                  </label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ahmed Al Rashidi" className="form-input" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                    City <span className="text-[#9E9BA2] font-normal">(optional)</span>
                  </label>
                  <select value={city} onChange={e => setCity(e.target.value)} className="form-select">
                    <option value="">Select your city</option>
                    {["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                    UAE Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 050 123 4567" className="form-input" required />
                  <p className="text-[11px] text-[#9E9BA2] font-['Poppins'] mt-1">
                    A 6-digit verification code will be sent to this number.
                  </p>
                </div>
                {error && <p className="text-red-500 text-[13px] font-['Poppins']">{error}</p>}
                <button type="submit" disabled={!phone || sending} className="btn-primary w-full disabled:opacity-50">
                  {sending ? "Sending code…" : "Send Verification Code"}
                </button>
                <button type="button" onClick={() => router.back()}
                  className="w-full text-center text-[13px] text-[#5B5F66] font-['Poppins'] hover:text-[#1EAD5E] transition-colors py-2">
                  ← Go Back
                </button>
              </form>
            </>
          )}

          {/* ── OTP STAGE ───────────────────────────────────────── */}
          {stage === "otp" && (
            <>
              <h1 className="font-['Geometria'] font-bold text-[24px] text-[#1D2126] mb-1">Verify Your Number</h1>
              <p className="text-[#5B5F66] text-[14px] font-['Poppins'] mb-6">
                Enter the 6-digit code sent to <strong>{phone}</strong>
              </p>
              {devCode && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-[13px] font-['Poppins'] text-yellow-800">
                  Dev mode — OTP code: <strong>{devCode}</strong>
                </div>
              )}
              <form onSubmit={verifyOtp} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                    Verification Code <span className="text-red-500">*</span>
                  </label>
                  <input type="text" inputMode="numeric" maxLength={6} value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000" className="form-input text-center text-[20px] tracking-[0.5em]" required />
                </div>
                {error && <p className="text-red-500 text-[13px] font-['Poppins']">{error}</p>}
                <button type="submit" disabled={otp.length !== 6 || verifying}
                  className="btn-primary w-full disabled:opacity-50">
                  {verifying ? "Verifying…" : "Verify Code"}
                </button>
                <button type="button" onClick={() => { setStage("phone"); setOtp(""); setError(""); setDevCode(""); }}
                  className="w-full text-center text-[13px] text-[#5B5F66] font-['Poppins'] hover:text-[#1EAD5E] transition-colors py-2">
                  ← Change number
                </button>
              </form>
            </>
          )}

          {/* ── APPOINTMENT STAGE ───────────────────────────────── */}
          {stage === "appointment" && (
            <>
              {/* Verified badge */}
              <div className="flex items-center gap-3 mb-5 p-3 bg-[#D8EEE0] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#1EAD5E] flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="font-['Poppins'] font-semibold text-[#1D2126] text-[13px]">Number Verified</p>
                  <p className="text-[#5B5F66] text-[12px] font-['Poppins']">{verifiedPhone}</p>
                </div>
              </div>

              <h1 className="font-['Geometria'] font-bold text-[22px] text-[#1D2126] mb-1">Confirm Your Appointment</h1>
              <p className="text-[#5B5F66] text-[14px] font-['Poppins'] mb-6">
                Choose when and how you&apos;d like us to evaluate your car.
              </p>

              <form onSubmit={submitBooking} className="space-y-5">

                {/* Email */}
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com" className="form-input" required />
                  <p className="text-[11px] text-[#9E9BA2] font-['Poppins'] mt-1">
                    Confirmation will be sent to this email.
                  </p>
                </div>

                {/* Expected price */}
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                    Your Expected Price (AED) <span className="text-[#9E9BA2] font-normal">(optional)</span>
                  </label>
                  <input type="number" min="0" value={yourPrice} onChange={e => setYourPrice(e.target.value)}
                    placeholder="e.g. 45000" className="form-input" />
                </div>

                {/* Booking type */}
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-3">
                    Inspection Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { val: "OFFICE_VISIT", label: "Office Visit", icon: "🏢", sub: "Visit our branch" },
                      { val: "HOME_INSPECTION", label: "Home Inspection", icon: "🚗", sub: "We come to you" },
                    ] as const).map(opt => (
                      <label key={opt.val}
                        className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 cursor-pointer transition-colors
                          ${bookingType === opt.val ? "border-[#1EAD5E] bg-[#D8EEE0]" : "border-[#E9ECEF] hover:border-[#1EAD5E]"}`}>
                        <input type="radio" className="sr-only" value={opt.val} checked={bookingType === opt.val}
                          onChange={() => setBookingType(opt.val)} />
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="font-['Poppins'] font-semibold text-[13px] text-[#1D2126]">{opt.label}</span>
                        <span className="font-['Poppins'] text-[11px] text-[#9E9BA2]">{opt.sub}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Branch selector (office visit) */}
                {bookingType === "OFFICE_VISIT" && (
                  <div>
                    <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                      Select Branch <span className="text-red-500">*</span>
                    </label>
                    <select value={branch} onChange={e => setBranch(e.target.value)} className="form-select" required>
                      {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                )}

                {/* Home address (home inspection) */}
                {bookingType === "HOME_INSPECTION" && (
                  <div>
                    <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                      Your Address <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={homeAddress} onChange={e => setHomeAddress(e.target.value)}
                      placeholder="Building, Street, Area, City" className="form-input" required />
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input type="date" value={date} min={minDate()} onChange={e => setDate(e.target.value)}
                      className="form-input" required />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <select value={time} onChange={e => setTime(e.target.value)} className="form-select" required>
                      <option value="">Select time</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-[#F8F8F8] rounded-xl p-4 text-[13px] font-['Poppins'] space-y-1">
                  <p className="font-semibold text-[#1D2126] mb-2">Your Car</p>
                  {[
                    ["Car", `${year} ${make.replace(/-/g, " ")} ${model.replace(/-/g, " ")}`],
                    ...(mileage ? [["Mileage", mileage] as [string, string]] : []),
                    ...(specs ? [["Specs", specs === "gcc" ? "GCC Specs" : "Non-GCC Specs"] as [string, string]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-[#9E9BA2]">{k}</span>
                      <span className="text-[#1D2126] font-medium capitalize">{v}</span>
                    </div>
                  ))}
                </div>

                {error && <p className="text-red-500 text-[13px] font-['Poppins']">{error}</p>}

                <button type="submit"
                  disabled={!email || !date || !time || submitting ||
                    (bookingType === "HOME_INSPECTION" && !homeAddress)}
                  className="btn-primary w-full disabled:opacity-50">
                  {submitting ? "Booking…" : "Confirm Appointment"}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </main>
  );
}

export default function CarBookingThree() {
  return (
    <Suspense>
      <BookingThreeContent />
    </Suspense>
  );
}
