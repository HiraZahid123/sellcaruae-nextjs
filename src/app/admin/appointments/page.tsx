"use client";
import { useEffect, useState, useCallback } from "react";

interface Appt {
  id: number;
  lead_id: number;
  booking_type: string;
  branch: string | null;
  home_address: string | null;
  date: string;
  time: string;
  email: string;
  created_at: string;
  phone_number: string;
  make: string;
  model: string;
  year: string;
  lead_status: string;
}

interface ApptForm {
  lead_id: string;
  booking_type: "OFFICE_VISIT" | "HOME_INSPECTION";
  date: string;
  time: string;
  email: string;
  branch: string;
  home_address: string;
}

const TIME_SLOTS = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM",
];
const BRANCHES = [
  "Main Office — Al Quoz, Dubai",
  "Branch — Deira, Dubai",
  "Branch — Sharjah",
  "Branch — Abu Dhabi",
];

const STATUS_COLORS: Record<string, string> = {
  NEW_LEAD: "bg-blue-100 text-blue-700",
  IN_NEGOTIATION: "bg-yellow-100 text-yellow-700",
  VISITED: "bg-purple-100 text-purple-700",
  PURCHASED: "bg-green-100 text-green-700",
  FAKE_LEAD: "bg-red-100 text-red-700",
  NUMBER_NOT_WORKING: "bg-gray-100 text-gray-500",
};
const STATUS_LABELS: Record<string, string> = {
  NEW_LEAD: "New Lead", IN_NEGOTIATION: "In Negotiation", VISITED: "Visited",
  PURCHASED: "Purchased", FAKE_LEAD: "Fake", NUMBER_NOT_WORKING: "No Answer",
};

const BLANK_FORM: ApptForm = {
  lead_id: "", booking_type: "OFFICE_VISIT", date: "", time: "",
  email: "", branch: BRANCHES[0], home_address: "",
};

export default function AdminAppointments() {
  const [appts, setAppts] = useState<Appt[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [upcoming, setUpcoming] = useState(true);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<{ mode: "create" | "edit"; appt?: Appt } | null>(null);
  const [form, setForm] = useState<ApptForm>(BLANK_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchAppts = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({ page: String(page), upcoming: upcoming ? "1" : "0" });
    const res = await fetch(`/api/admin/appointments?${q}`);
    const data = await res.json();
    setAppts(data.data || []);
    setTotal(data.total || 0);
    setPages(data.pages || 1);
    setLoading(false);
  }, [page, upcoming]);

  useEffect(() => { fetchAppts(); }, [fetchAppts]);

  function openCreate() {
    setForm(BLANK_FORM);
    setModal({ mode: "create" });
  }

  function openEdit(a: Appt) {
    setForm({
      lead_id: String(a.lead_id),
      booking_type: a.booking_type as "OFFICE_VISIT" | "HOME_INSPECTION",
      date: a.date ? a.date.split("T")[0] : "",
      time: a.time,
      email: a.email,
      branch: a.branch || BRANCHES[0],
      home_address: a.home_address || "",
    });
    setModal({ mode: "edit", appt: a });
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    if (modal?.mode === "create") {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: parseInt(form.lead_id),
          booking_type: form.booking_type,
          date: form.date,
          time: form.time,
          email: form.email,
          branch: form.booking_type === "OFFICE_VISIT" ? form.branch : null,
          home_address: form.booking_type === "HOME_INSPECTION" ? form.home_address : null,
        }),
      });
    } else if (modal?.appt) {
      await fetch(`/api/admin/appointments/${modal.appt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_type: form.booking_type,
          date: form.date,
          time: form.time,
          email: form.email,
          branch: form.booking_type === "OFFICE_VISIT" ? form.branch : null,
          home_address: form.booking_type === "HOME_INSPECTION" ? form.home_address : null,
        }),
      });
    }
    setSubmitting(false);
    setModal(null);
    fetchAppts();
  }

  async function deleteAppt(id: number) {
    if (!confirm("Delete this appointment?")) return;
    setDeleting(id);
    await fetch(`/api/admin/appointments/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchAppts();
  }

  function setF<K extends keyof ApptForm>(k: K, v: ApptForm[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126]">Appointments</h1>
          <p className="text-[#5B5F66] text-[13px] font-['Poppins'] mt-0.5">{total} records</p>
        </div>
        <div className="flex gap-2">
          {[{ val: true, label: "Upcoming" }, { val: false, label: "All" }].map(opt => (
            <button key={String(opt.val)} onClick={() => { setUpcoming(opt.val); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold font-['Poppins'] transition-colors
                ${upcoming === opt.val ? "bg-[#1EAD5E] text-white" : "border border-[#E9ECEF] text-[#5B5F66] hover:border-[#1EAD5E]"}`}>
              {opt.label}
            </button>
          ))}
          <button onClick={openCreate} className="btn-primary">+ New</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9ECEF] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#1EAD5E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : appts.length === 0 ? (
          <div className="text-center py-16 text-[#9E9BA2] font-['Poppins'] text-[14px]">No appointments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-['Poppins']">
              <thead>
                <tr className="border-b border-[#E9ECEF] bg-[#F8F8F8]">
                  {["Date & Time", "Customer", "Car", "Type", "Location", "Lead Status", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[#9E9BA2] font-semibold text-[12px] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appts.map(a => (
                  <tr key={a.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F8F8]">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#1D2126]">
                        {new Date(a.date).toLocaleDateString("en-AE", { weekday: "short", month: "short", day: "numeric" })}
                      </p>
                      <p className="text-[#9E9BA2]">{a.time}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1D2126]">{a.phone_number}</p>
                      <p className="text-[#9E9BA2] text-[11px]">{a.email}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-[#1D2126]">
                      {a.year} {a.make.replace(/-/g, " ")} {a.model.replace(/-/g, " ")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                        ${a.booking_type === "OFFICE_VISIT" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                        {a.booking_type === "OFFICE_VISIT" ? "Office" : "Home"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#5B5F66] max-w-[160px] truncate">{a.branch || a.home_address || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[a.lead_status] || "bg-gray-100 text-gray-600"}`}>
                        {STATUS_LABELS[a.lead_status] || a.lead_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(a)}
                          className="px-3 py-1 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[12px] hover:border-[#1EAD5E] hover:text-[#1EAD5E] transition-colors">
                          Edit
                        </button>
                        <button onClick={() => deleteAppt(a.id)} disabled={deleting === a.id}
                          className="px-3 py-1 border border-red-200 text-red-400 rounded-lg text-[12px] hover:bg-red-50 transition-colors disabled:opacity-50">
                          {deleting === a.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">← Prev</button>
          <span className="px-3 py-1.5 text-[13px] text-[#5B5F66]">Page {page} of {pages}</span>
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">Next →</button>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-['Poppins'] font-semibold text-[16px] text-[#1D2126]">
                {modal.mode === "create" ? "New Appointment" : "Edit Appointment"}
              </h2>
              <button onClick={() => setModal(null)} className="text-[#9E9BA2] hover:text-[#1D2126] text-xl leading-none">×</button>
            </div>
            <form onSubmit={submitForm} className="space-y-4">
              {modal.mode === "create" && (
                <div>
                  <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Lead ID <span className="text-red-500">*</span></label>
                  <input type="number" value={form.lead_id} onChange={e => setF("lead_id", e.target.value)}
                    placeholder="Enter lead ID" className="form-input" required />
                </div>
              )}
              <div>
                <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" value={form.email} onChange={e => setF("email", e.target.value)}
                  placeholder="customer@example.com" className="form-input" required />
              </div>
              <div>
                <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-2">Type</label>
                <div className="flex gap-3">
                  {(["OFFICE_VISIT", "HOME_INSPECTION"] as const).map(opt => (
                    <label key={opt} className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border-2 cursor-pointer text-[12px] font-semibold font-['Poppins'] transition-colors
                      ${form.booking_type === opt ? "border-[#1EAD5E] bg-[#D8EEE0] text-[#1EAD5E]" : "border-[#E9ECEF] text-[#5B5F66]"}`}>
                      <input type="radio" className="sr-only" value={opt} checked={form.booking_type === opt}
                        onChange={() => setF("booking_type", opt)} />
                      {opt === "OFFICE_VISIT" ? "Office" : "Home"}
                    </label>
                  ))}
                </div>
              </div>
              {form.booking_type === "OFFICE_VISIT" ? (
                <div>
                  <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Branch</label>
                  <select value={form.branch} onChange={e => setF("branch", e.target.value)} className="form-select">
                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Address</label>
                  <input type="text" value={form.home_address} onChange={e => setF("home_address", e.target.value)}
                    placeholder="Building, Street, Area" className="form-input" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Date <span className="text-red-500">*</span></label>
                  <input type="date" value={form.date} onChange={e => setF("date", e.target.value)}
                    className="form-input" required />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Time <span className="text-red-500">*</span></label>
                  <select value={form.time} onChange={e => setF("time", e.target.value)} className="form-select" required>
                    <option value="">Select</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary flex-1 disabled:opacity-50">
                  {submitting ? "Saving…" : modal.mode === "create" ? "Create" : "Save Changes"}
                </button>
                <button type="button" onClick={() => setModal(null)}
                  className="flex-1 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[14px] font-['Poppins'] hover:border-[#1EAD5E]">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
