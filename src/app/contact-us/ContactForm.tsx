"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, val: string) {
    setForm(prev => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSubmitting(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) { setError(data.error || "Failed to send. Please try again."); return; }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-[#D8EEE0] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1EAD5E" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="font-['Geometria'] font-bold text-[20px] text-[#1D2126] mb-2">Message Sent!</h3>
        <p className="font-['Poppins'] text-[14px] text-[#5B5F66]">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
            placeholder="Ahmed Al Rashidi" className="form-input" required />
        </div>
        <div>
          <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
            placeholder="you@example.com" className="form-input" required />
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
          Phone Number <span className="text-[#9E9BA2] font-normal">(optional)</span>
        </label>
        <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
          placeholder="050 123 4567" className="form-input" />
      </div>
      <div>
        <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea value={form.message} onChange={e => set("message", e.target.value)}
          placeholder="How can we help you?" rows={5} required
          className="w-full bg-[#F2F2F2] border-none rounded-[4px] px-[18px] py-3
            font-['Poppins'] text-[14px] text-[#1D2126] outline-none resize-none
            focus:shadow-[0_0_0_2px_#1EAD5E40]" />
      </div>
      {error && <p className="text-red-500 text-[13px] font-['Poppins']">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
