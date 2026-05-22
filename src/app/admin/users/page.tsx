"use client";
import { useEffect, useState, useCallback } from "react";

interface User {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("staff");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [resetting, setResetting] = useState<number | null>(null);
  const [resetPw, setResetPw] = useState<Record<number, string>>({});

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(""); setCreating(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole }),
    });
    const data = await res.json();
    setCreating(false);
    if (!res.ok) { setCreateError(data.error || "Failed"); return; }
    setShowNew(false); setNewEmail(""); setNewPassword(""); setNewRole("staff");
    fetchUsers();
  }

  async function toggleActive(user: User) {
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !user.is_active }),
    });
    fetchUsers();
  }

  async function resetPassword(userId: number) {
    const pw = resetPw[userId];
    if (!pw || pw.length < 6) return;
    setResetting(userId);
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setResetting(null);
    setResetPw(prev => { const n = { ...prev }; delete n[userId]; return n; });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126]">Users</h1>
          <p className="text-[#5B5F66] text-[13px] font-['Poppins'] mt-0.5">{users.length} accounts</p>
        </div>
        <button onClick={() => setShowNew(v => !v)} className="btn-primary">
          {showNew ? "Cancel" : "+ New User"}
        </button>
      </div>

      {/* New user form */}
      {showNew && (
        <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6 mb-4">
          <h2 className="font-['Poppins'] font-semibold text-[15px] text-[#1D2126] mb-4">Create New User</h2>
          <form onSubmit={createUser} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
              placeholder="Email address" className="form-input" required />
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
              placeholder="Password (min 6 chars)" minLength={6} className="form-input" required />
            <div className="flex gap-3">
              <select value={newRole} onChange={e => setNewRole(e.target.value)} className="form-select flex-1">
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
              <button type="submit" disabled={creating} className="btn-primary px-5 disabled:opacity-50">
                {creating ? "…" : "Create"}
              </button>
            </div>
          </form>
          {createError && <p className="text-red-500 text-[13px] font-['Poppins'] mt-2">{createError}</p>}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E9ECEF] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#1EAD5E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <table className="w-full text-[13px] font-['Poppins']">
            <thead>
              <tr className="border-b border-[#E9ECEF] bg-[#F8F8F8]">
                {["Email", "Role", "Status", "Created", "Reset Password", ""].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[#9E9BA2] font-semibold text-[12px] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-[#E9ECEF] hover:bg-[#F8F8F8]">
                  <td className="px-4 py-3 font-medium text-[#1D2126]">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full
                      ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full
                      ${u.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {u.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#9E9BA2]">
                    {new Date(u.created_at).toLocaleDateString("en-AE")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <input
                        type="password" placeholder="New password" minLength={6}
                        value={resetPw[u.id] || ""}
                        onChange={e => setResetPw(prev => ({ ...prev, [u.id]: e.target.value }))}
                        className="border border-[#E9ECEF] rounded-lg px-3 py-1.5 text-[12px] w-36 focus:border-[#1EAD5E] outline-none" />
                      <button
                        onClick={() => resetPassword(u.id)}
                        disabled={!resetPw[u.id] || resetting === u.id}
                        className="px-3 py-1.5 bg-[#1EAD5E] text-white rounded-lg text-[12px] font-semibold disabled:opacity-40">
                        {resetting === u.id ? "…" : "Set"}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(u)}
                      className={`px-3 py-1 border rounded-lg text-[12px] transition-colors
                        ${u.is_active
                          ? "border-red-200 text-red-400 hover:bg-red-50"
                          : "border-green-200 text-green-600 hover:bg-green-50"}`}>
                      {u.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
