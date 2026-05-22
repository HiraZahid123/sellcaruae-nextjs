"use client";
import { useEffect, useState, useCallback } from "react";

interface Lead {
  id: number;
  phone_number: string;
  make: string;
  model: string;
  year: string;
  mileage: string | null;
  specifications: string | null;
  your_price: string | null;
  status: string;
  is_verified: boolean;
  created_at: string;
  booking_type: string | null;
  appt_date: string | null;
  appt_time: string | null;
  branch: string | null;
  home_address: string | null;
  appt_email: string | null;
  appt_id: number | null;
}

interface EditState {
  phone_number: string;
  your_price: string;
  mileage: string;
  specifications: string;
  status: string;
}

const STATUSES = [
  { value: "", label: "All Statuses" },
  { value: "NEW_LEAD", label: "New Lead" },
  { value: "IN_NEGOTIATION", label: "In Negotiation" },
  { value: "VISITED", label: "Visited" },
  { value: "PURCHASED", label: "Purchased" },
  { value: "FAKE_LEAD", label: "Fake Lead" },
  { value: "NUMBER_NOT_WORKING", label: "No Answer" },
];

const STATUS_COLORS: Record<string, string> = {
  NEW_LEAD: "bg-blue-100 text-blue-700",
  IN_NEGOTIATION: "bg-yellow-100 text-yellow-700",
  VISITED: "bg-purple-100 text-purple-700",
  PURCHASED: "bg-green-100 text-green-700",
  FAKE_LEAD: "bg-red-100 text-red-700",
  NUMBER_NOT_WORKING: "bg-gray-100 text-gray-500",
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  // Edit modal
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [editState, setEditState] = useState<EditState>({ phone_number: "", your_price: "", mileage: "", specifications: "", status: "" });
  const [saving, setSaving] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({ page: String(page) });
    if (status) q.set("status", status);
    if (search) q.set("search", search);
    const res = await fetch(`/api/admin/leads?${q}`);
    const data = await res.json();
    setLeads(data.data || []);
    setTotal(data.total || 0);
    setPages(data.pages || 1);
    setLoading(false);
  }, [page, status, search]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  function openEdit(lead: Lead) {
    setEditLead(lead);
    setEditState({
      phone_number: lead.phone_number,
      your_price: lead.your_price || "",
      mileage: lead.mileage || "",
      specifications: lead.specifications || "",
      status: lead.status,
    });
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editLead) return;
    setSaving(true);
    await fetch(`/api/admin/leads/${editLead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editState),
    });
    setSaving(false);
    setEditLead(null);
    fetchLeads();
  }

  async function quickStatus(id: number, newStatus: string) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchLeads();
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126]">Leads</h1>
          <p className="text-[#5B5F66] text-[13px] font-['Poppins'] mt-0.5">{total} total records</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E9ECEF] p-4 mb-4 flex flex-wrap gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
            placeholder="Search phone, make, model…" className="form-input flex-1 h-10" />
          <button type="submit" className="btn-primary h-10 px-4 text-[12px]">Search</button>
        </form>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="form-select h-10 w-auto min-w-[160px]">
          {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E9ECEF] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#1EAD5E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16 text-[#9E9BA2] font-['Poppins'] text-[14px]">No leads found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-['Poppins']">
              <thead>
                <tr className="border-b border-[#E9ECEF] bg-[#F8F8F8]">
                  {["#", "Phone", "Car", "Mileage", "Status", "Date", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[#9E9BA2] font-semibold text-[12px] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <>
                    <tr key={lead.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F8F8] cursor-pointer"
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                      <td className="px-4 py-3 text-[#9E9BA2]">{lead.id}</td>
                      <td className="px-4 py-3 font-medium text-[#1D2126]">
                        {lead.phone_number}
                        {lead.is_verified && <span className="ml-1 text-[10px] text-[#1EAD5E]">✓</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[#1D2126] font-medium capitalize">
                          {lead.year} {lead.make.replace(/-/g, " ")} {lead.model.replace(/-/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#5B5F66]">{lead.mileage || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-600"}`}>
                          {STATUSES.find(s => s.value === lead.status)?.label || lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#9E9BA2]">
                        {new Date(lead.created_at).toLocaleDateString("en-AE")}
                      </td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-2">
                          <select value={lead.status} onChange={e => quickStatus(lead.id, e.target.value)}
                            className="text-[12px] border border-[#E9ECEF] rounded-lg px-2 py-1 bg-white text-[#1D2126] focus:outline-none focus:border-[#1EAD5E]">
                            {STATUSES.filter(s => s.value).map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                          <button onClick={() => openEdit(lead)}
                            className="px-3 py-1 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[12px] hover:border-[#1EAD5E] hover:text-[#1EAD5E] transition-colors">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === lead.id && (
                      <tr key={`${lead.id}-detail`} className="bg-[#F8F8F8]">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
                            {[
                              ["Specs", lead.specifications],
                              ["Expected Price", lead.your_price ? `AED ${lead.your_price}` : null],
                              ["Appt Type", lead.booking_type?.replace("_", " ")],
                              ["Appt Date", lead.appt_date ? new Date(lead.appt_date).toLocaleDateString("en-AE") : null],
                              ["Appt Time", lead.appt_time],
                              ["Location", lead.branch || lead.home_address],
                              ["Email", lead.appt_email],
                            ].map(([k, v]) => v ? (
                              <div key={String(k)}>
                                <p className="text-[#9E9BA2] font-semibold uppercase tracking-wide text-[10px]">{k}</p>
                                <p className="text-[#1D2126] mt-0.5 capitalize">{String(v)}</p>
                              </div>
                            ) : null)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">
            ← Prev
          </button>
          <span className="px-3 py-1.5 text-[13px] text-[#5B5F66] font-['Poppins']">Page {page} of {pages}</span>
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">
            Next →
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editLead && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setEditLead(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-['Poppins'] font-semibold text-[16px] text-[#1D2126]">
                Edit Lead #{editLead.id}
              </h2>
              <button onClick={() => setEditLead(null)} className="text-[#9E9BA2] hover:text-[#1D2126] text-xl leading-none">×</button>
            </div>
            <form onSubmit={saveEdit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Phone Number</label>
                <input type="text" value={editState.phone_number}
                  onChange={e => setEditState(s => ({ ...s, phone_number: e.target.value }))}
                  className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Expected Price (AED)</label>
                  <input type="text" value={editState.your_price}
                    onChange={e => setEditState(s => ({ ...s, your_price: e.target.value }))}
                    placeholder="e.g. 45000" className="form-input" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Mileage</label>
                  <input type="text" value={editState.mileage}
                    onChange={e => setEditState(s => ({ ...s, mileage: e.target.value }))}
                    placeholder="e.g. 60,000 km" className="form-input" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Specifications</label>
                <select value={editState.specifications}
                  onChange={e => setEditState(s => ({ ...s, specifications: e.target.value }))}
                  className="form-select">
                  <option value="">— Select —</option>
                  <option value="gcc">GCC Specs</option>
                  <option value="non-gcc">Non-GCC Specs</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold font-['Poppins'] text-[#1D2126] mb-1">Status</label>
                <select value={editState.status}
                  onChange={e => setEditState(s => ({ ...s, status: e.target.value }))}
                  className="form-select">
                  {STATUSES.filter(s => s.value).map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button type="button" onClick={() => setEditLead(null)}
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
