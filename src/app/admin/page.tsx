"use client";
import { useEffect, useState } from "react";

interface Stats {
  totalLeads: number;
  todayLeads: number;
  upcomingAppointments: number;
  byStatus: { status: string; cnt: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  NEW_LEAD: "bg-blue-100 text-blue-700",
  IN_NEGOTIATION: "bg-yellow-100 text-yellow-700",
  VISITED: "bg-purple-100 text-purple-700",
  PURCHASED: "bg-green-100 text-green-700",
  FAKE_LEAD: "bg-red-100 text-red-700",
  NUMBER_NOT_WORKING: "bg-gray-100 text-gray-600",
};

const STATUS_LABELS: Record<string, string> = {
  NEW_LEAD: "New Lead",
  IN_NEGOTIATION: "In Negotiation",
  VISITED: "Visited",
  PURCHASED: "Purchased",
  FAKE_LEAD: "Fake Lead",
  NUMBER_NOT_WORKING: "No Answer",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then(r => r.json()).then(setStats);
  }, []);

  const cards = [
    { label: "Total Leads", value: stats?.totalLeads ?? "—", icon: "👤", color: "border-blue-200 bg-blue-50" },
    { label: "Today's Leads", value: stats?.todayLeads ?? "—", icon: "📬", color: "border-green-200 bg-green-50" },
    { label: "Upcoming Appts", value: stats?.upcomingAppointments ?? "—", icon: "📅", color: "border-purple-200 bg-purple-50" },
  ];

  return (
    <div>
      <h1 className="font-['Geometria'] font-bold text-[26px] text-[#1D2126] mb-6">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className={`rounded-2xl border p-6 ${c.color}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{c.icon}</span>
            </div>
            <p className="font-['Geometria'] font-bold text-[32px] text-[#1D2126]">{c.value}</p>
            <p className="text-[13px] text-[#5B5F66] font-['Poppins'] mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      {stats?.byStatus && stats.byStatus.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6">
          <h2 className="font-['Poppins'] font-semibold text-[15px] text-[#1D2126] mb-4">Leads by Status</h2>
          <div className="space-y-3">
            {stats.byStatus.map(s => (
              <div key={s.status} className="flex items-center justify-between">
                <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[s.status] || "bg-gray-100 text-gray-600"}`}>
                  {STATUS_LABELS[s.status] || s.status}
                </span>
                <div className="flex items-center gap-3 flex-1 ml-4">
                  <div className="flex-1 bg-[#F8F8F8] rounded-full h-2">
                    <div
                      className="bg-[#1EAD5E] h-2 rounded-full"
                      style={{ width: `${Math.round((s.cnt / (stats.totalLeads || 1)) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[13px] font-semibold text-[#1D2126] w-8 text-right">{s.cnt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
