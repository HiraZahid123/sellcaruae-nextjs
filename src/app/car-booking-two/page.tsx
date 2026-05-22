"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Variant {
  id: number;
  name: string;
  body_type: string;
  engine: string;
  transmission: string;
  gcc_specs: boolean;
  price_min: number | null;
  price_max: number | null;
}

const MILEAGE_OPTIONS = [
  "Under 10,000 km",
  "10,000 – 30,000 km",
  "30,000 – 60,000 km",
  "60,000 – 90,000 km",
  "90,000 – 120,000 km",
  "120,000 – 150,000 km",
  "150,000 – 200,000 km",
  "Over 200,000 km",
];

const STEPS = ["Select your Car", "Model & Condition", "Book Appointment"];

function BookingTwoContent() {
  const router = useRouter();
  const params = useSearchParams();
  const make = params.get("make") || "";
  const model = params.get("model") || "";
  const year = params.get("year") || "";

  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantId, setVariantId] = useState<string>("");
  const [mileage, setMileage] = useState("");
  const [specs, setSpecs] = useState<"gcc" | "non-gcc" | "">("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!make || !model || !year) { router.replace("/car-valuation"); return; }
    setLoading(true);
    fetch(`/api/cars/variants?make=${make}&model=${model}&year=${year}`)
      .then(r => r.json())
      .then(d => { setVariants(d.data || []); setLoading(false); });
  }, [make, model, year, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mileage || !specs) return;
    const q = new URLSearchParams({ make, model, year, mileage, specs });
    if (variantId) q.set("variant_id", variantId);
    router.push(`/car-booking-three?${q.toString()}`);
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] py-12">
      <div className="conta-def max-w-2xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0
                ${i === 0 ? "border-[#4EB876] bg-[#4EB876] text-white" :
                  i === 1 ? "border-[#1EAD5E] bg-[#1EAD5E] text-white" :
                  "border-[#E9ECEF] text-[#9E9BA2]"}`}>
                {i === 0 ? "✓" : i + 1}
              </span>
              <span className={`text-sm font-['Poppins'] hidden sm:block
                ${i === 1 ? "text-[#1EAD5E] font-semibold" : i === 0 ? "text-[#4EB876]" : "text-[#9E9BA2]"}`}>
                {s}
              </span>
              {i < 2 && <span className="flex-1 h-px bg-[#E9ECEF] hidden sm:block" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="font-['Geometria'] font-bold text-[24px] text-[#1D2126] mb-1">Model &amp; Condition</h1>
          <p className="text-[#5B5F66] text-[14px] font-['Poppins'] mb-6">
            Tell us more about your {year} {make.replace(/-/g, " ")} {model.replace(/-/g, " ")}
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#1EAD5E] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {variants.length > 0 && (
                <div>
                  <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                    Variant / Trim <span className="text-[#9E9BA2] font-normal">(optional)</span>
                  </label>
                  <select value={variantId} onChange={e => setVariantId(e.target.value)} className="form-select">
                    <option value="">— Select variant (optional) —</option>
                    {variants.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name}{v.transmission ? ` · ${v.transmission}` : ""}{v.engine ? ` · ${v.engine}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
                  Current Mileage <span className="text-red-500">*</span>
                </label>
                <select value={mileage} onChange={e => setMileage(e.target.value)} className="form-select" required>
                  <option value="">Select mileage range</option>
                  {MILEAGE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-3">
                  Specifications <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {(["gcc", "non-gcc"] as const).map(opt => (
                    <label key={opt}
                      className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border-2 cursor-pointer
                        font-['Poppins'] text-[14px] font-semibold transition-colors
                        ${specs === opt ? "border-[#1EAD5E] bg-[#D8EEE0] text-[#1EAD5E]" : "border-[#E9ECEF] text-[#5B5F66] hover:border-[#1EAD5E]"}`}>
                      <input type="radio" className="sr-only" value={opt} checked={specs === opt}
                        onChange={() => setSpecs(opt)} required />
                      {opt === "gcc" ? "GCC Specs" : "Non-GCC Specs"}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={!mileage || !specs}
                className="btn-primary w-full mt-2 disabled:opacity-50">
                Continue to Book Appointment
              </button>
              <button type="button" onClick={() => router.back()}
                className="w-full text-center text-[13px] text-[#5B5F66] font-['Poppins'] hover:text-[#1EAD5E] transition-colors py-2">
                ← Go Back
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CarBookingTwo() {
  return (
    <Suspense>
      <BookingTwoContent />
    </Suspense>
  );
}
