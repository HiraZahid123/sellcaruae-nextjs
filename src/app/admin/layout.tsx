"use client";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/leads", label: "Leads", icon: "👤" },
  { href: "/admin/appointments", label: "Appointments", icon: "📅" },
  { href: "/admin/pricing", label: "Pricing", icon: "💰" },
  { href: "/admin/blog", label: "Blog", icon: "✏️" },
  { href: "/admin/users", label: "Users", icon: "👥" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-[#F8F8F8]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-[#E9ECEF] flex flex-col fixed h-full z-20">
        <div className="p-5 border-b border-[#E9ECEF]">
          <p className="font-['Geometria'] font-bold text-[20px] text-[#1D2126]">
            Sell<span className="text-[#1EAD5E]">Car</span>UAE
          </p>
          <p className="text-[11px] text-[#9E9BA2] mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(item => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors
                  ${active
                    ? "bg-[#D8EEE0] text-[#1EAD5E]"
                    : "text-[#5B5F66] hover:bg-[#F8F8F8] hover:text-[#1D2126]"}`}>
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[#E9ECEF]">
          <button onClick={() => { signOut({ redirect: false }); router.push("/admin/login"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-[#5B5F66]
              hover:bg-red-50 hover:text-red-500 transition-colors font-medium">
            <span>⎋</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-56 min-h-screen">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
