"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });
    setLoading(false);
    if (res?.error) { setError("Invalid email or password"); return; }
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-['Geometria'] font-bold text-[28px] text-[#1D2126]">
            Sell<span className="text-[#1EAD5E]">Car</span>UAE
          </h1>
          <p className="text-[#5B5F66] text-[14px] font-['Poppins'] mt-1">Admin Panel</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="font-['Poppins'] font-semibold text-[18px] text-[#1D2126] mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@sellcaruae.com" className="form-input" required autoFocus />
            </div>
            <div>
              <label className="block text-[13px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className="form-input" required />
            </div>
            {error && <p className="text-red-500 text-[13px] font-['Poppins']">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
