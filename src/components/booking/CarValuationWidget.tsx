"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Make { id: number; name: string; slug: string; }
interface Model { id: number; name: string; slug: string; }

export default function CarValuationWidget({ variant = "hero" }: { variant?: "hero" | "form" }) {
  const router = useRouter();
  const [makes, setMakes] = useState<Make[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetch("/api/cars/makes").then(r => r.json()).then(d => setMakes(d.data || []));
  }, []);

  useEffect(() => {
    if (!make) { setModels([]); setModel(""); return; }
    fetch(`/api/cars/models?make=${make}`).then(r => r.json()).then(d => setModels(d.data || []));
    setModel(""); setYear("");
  }, [make]);

  useEffect(() => {
    if (!model) { setYears([]); setYear(""); return; }
    fetch(`/api/cars/years?make=${make}&model=${model}`).then(r => r.json()).then(d => setYears(d.data || []));
    setYear("");
  }, [model, make]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!make || !model || !year) return;
    router.push(`/car-booking-two?make=${make}&model=${model}&year=${year}`);
  }

  const isHero = variant === "hero";
  const selectCls = isHero
    ? "bg-transparent border-r border-white/40 text-white placeholder:text-white/80 h-full px-4 font-['Poppins'] text-[14px] flex-1 outline-none appearance-none cursor-pointer"
    : "form-select";

  if (isHero) {
    return (
      <form onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch bg-[#1EAD5E] rounded-xl overflow-hidden h-auto sm:h-[64px]"
        style={{ boxShadow: "0 5px 40px #0E285312" }}>
        <select value={make} onChange={e => setMake(e.target.value)}
          className={selectCls + " bg-[#1EAD5E] text-white py-3 sm:py-0 border-b sm:border-b-0 border-white/40"}>
          <option value="" className="text-black">Select Make</option>
          {makes.map(m => <option key={m.id} value={m.slug} className="text-black">{m.name}</option>)}
        </select>
        <select value={model} onChange={e => setModel(e.target.value)} disabled={!make}
          className={selectCls + " bg-[#1EAD5E] text-white py-3 sm:py-0 border-b sm:border-b-0 border-white/40 disabled:opacity-50"}>
          <option value="" className="text-black">Select Model</option>
          {models.map(m => <option key={m.id} value={m.slug} className="text-black">{m.name}</option>)}
        </select>
        <select value={year} onChange={e => setYear(e.target.value)} disabled={!model}
          className={selectCls + " bg-[#1EAD5E] text-white py-3 sm:py-0 disabled:opacity-50"}>
          <option value="" className="text-black">Select Year</option>
          {years.map(y => <option key={y} value={y} className="text-black">{y}</option>)}
        </select>
        <button type="submit" disabled={!make || !model || !year}
          className="bg-white text-[#1EAD5E] font-['Poppins'] font-semibold text-[14px] uppercase
            px-6 py-3 sm:py-0 whitespace-nowrap hover:bg-[#D8EEE0] transition-colors disabled:opacity-50">
          Evaluate Now
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="valuation-box space-y-4">
      <h3 className="font-['Poppins'] font-semibold text-[#1D2126] text-[16px]">Evaluate and sell your car</h3>
      <div className="flex items-center gap-3 mb-4">
        {["Select your Car", "Model & Condition", "Book Appointment"].map((s, i) => (
          <div key={i} className="flex items-center gap-1 flex-1">
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0
              ${i === 0 ? "border-[#4EB876] bg-[#4EB876] text-white" : "border-[#4EB876] text-[#4EB876]"}`}>
              {i === 0 ? "1" : i + 1}
            </span>
            <span className="text-[10px] text-[#999] hidden sm:block">{s}</span>
            {i < 2 && <span className="flex-1 h-px bg-[#E9ECEF] hidden sm:block" />}
          </div>
        ))}
      </div>
      <p className="text-[#5B5F66] text-[13px] font-['Poppins']">Please enter the following information to see your car valuation.</p>
      <select value={make} onChange={e => setMake(e.target.value)} className="form-select">
        <option value="">Select Make</option>
        {makes.map(m => <option key={m.id} value={m.slug}>{m.name}</option>)}
      </select>
      <select value={model} onChange={e => setModel(e.target.value)} disabled={!make} className="form-select disabled:opacity-50">
        <option value="">Select Model</option>
        {models.map(m => <option key={m.id} value={m.slug}>{m.name}</option>)}
      </select>
      <select value={year} onChange={e => setYear(e.target.value)} disabled={!model} className="form-select disabled:opacity-50">
        <option value="">Select Year</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <button type="submit" disabled={!make || !model || !year} className="btn-primary w-full disabled:opacity-50">
        Evaluate Now
      </button>
    </form>
  );
}
