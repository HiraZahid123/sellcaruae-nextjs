"use client";
import { useEffect, useState, useCallback } from "react";

interface Variant {
  id: number;
  name: string;
  year: number;
  body_type: string | null;
  transmission: string | null;
  price_min: number | null;
  price_max: number | null;
  is_active: boolean;
  make_name: string;
  model_name: string;
}

export default function AdminPricing() {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<number, { min: string; max: string }>>({});
  const [saving, setSaving] = useState<number | null>(null);

  const fetchVariants = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({ page: String(page) });
    if (search) q.set("search", search);
    const res = await fetch(`/api/admin/pricing?${q}`);
    const data = await res.json();
    setVariants(data.data || []);
    setTotal(data.total || 0);
    setPages(data.pages || 1);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchVariants(); }, [fetchVariants]);

  function startEdit(v: Variant) {
    setEditing(prev => ({
      ...prev,
      [v.id]: { min: v.price_min ? String(v.price_min) : "", max: v.price_max ? String(v.price_max) : "" },
    }));
  }

  async function savePrice(id: number) {
    const vals = editing[id];
    if (!vals) return;
    setSaving(id);
    await fetch("/api/admin/pricing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        price_min: vals.min ? parseInt(vals.min) : null,
        price_max: vals.max ? parseInt(vals.max) : null,
      }),
    });
    setSaving(null);
    setEditing(prev => { const next = { ...prev }; delete next[id]; return next; });
    fetchVariants();
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
          <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126]">Car Pricing</h1>
          <p className="text-[#5B5F66] text-[13px] font-['Poppins'] mt-0.5">{total} variants</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E9ECEF] p-4 mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by make, model, or variant name…" className="form-input flex-1 h-10" />
          <button type="submit" className="btn-primary h-10 px-4 text-[12px]">Search</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9ECEF] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#1EAD5E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : variants.length === 0 ? (
          <div className="text-center py-16 text-[#9E9BA2] font-['Poppins'] text-[14px]">No variants found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-['Poppins']">
              <thead>
                <tr className="border-b border-[#E9ECEF] bg-[#F8F8F8]">
                  {["Make / Model", "Variant", "Year", "Type", "Price Min (AED)", "Price Max (AED)", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[#9E9BA2] font-semibold text-[12px] uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map(v => {
                  const isEditing = !!editing[v.id];
                  const vals = editing[v.id];
                  return (
                    <tr key={v.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F8F8]">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1D2126]">{v.make_name}</p>
                        <p className="text-[#9E9BA2] text-[12px]">{v.model_name}</p>
                      </td>
                      <td className="px-4 py-3 text-[#1D2126] max-w-[200px]">
                        <p className="truncate">{v.name}</p>
                        {v.transmission && <p className="text-[11px] text-[#9E9BA2]">{v.transmission}</p>}
                      </td>
                      <td className="px-4 py-3 text-[#5B5F66]">{v.year}</td>
                      <td className="px-4 py-3 text-[#5B5F66] capitalize">{v.body_type || "—"}</td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="number" value={vals.min}
                            onChange={e => setEditing(prev => ({ ...prev, [v.id]: { ...prev[v.id], min: e.target.value } }))}
                            className="border border-[#E9ECEF] rounded-lg px-2 py-1 w-28 text-[12px] focus:border-[#1EAD5E] outline-none" />
                        ) : (
                          <span className="text-[#1D2126] font-medium">
                            {v.price_min ? v.price_min.toLocaleString() : <span className="text-[#9E9BA2]">—</span>}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="number" value={vals.max}
                            onChange={e => setEditing(prev => ({ ...prev, [v.id]: { ...prev[v.id], max: e.target.value } }))}
                            className="border border-[#E9ECEF] rounded-lg px-2 py-1 w-28 text-[12px] focus:border-[#1EAD5E] outline-none" />
                        ) : (
                          <span className="text-[#1D2126] font-medium">
                            {v.price_max ? v.price_max.toLocaleString() : <span className="text-[#9E9BA2]">—</span>}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button onClick={() => savePrice(v.id)} disabled={saving === v.id}
                              className="px-3 py-1 bg-[#1EAD5E] text-white rounded-lg text-[12px] font-semibold disabled:opacity-50">
                              {saving === v.id ? "…" : "Save"}
                            </button>
                            <button onClick={() => setEditing(prev => { const next = { ...prev }; delete next[v.id]; return next; })}
                              className="px-3 py-1 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[12px]">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => startEdit(v)}
                            className="px-3 py-1 border border-[#E9ECEF] text-[#5B5F66] rounded-lg text-[12px] hover:border-[#1EAD5E] hover:text-[#1EAD5E] transition-colors">
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">
            ← Prev
          </button>
          <span className="px-3 py-1.5 text-[13px] text-[#5B5F66]">Page {page} of {pages}</span>
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
            className="px-3 py-1.5 rounded-lg border border-[#E9ECEF] text-[13px] disabled:opacity-40 hover:border-[#1EAD5E]">
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
