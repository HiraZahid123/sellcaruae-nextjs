"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Evaluate Your Car", href: "/car-valuation" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[999] bg-white"
        style={{ boxShadow: "drop-shadow(0px 5px 6px rgba(0,0,0,.161))", filter: "drop-shadow(0px 5px 6px rgba(0,0,0,.161))" }}>
        <div className="conta-wide flex items-center justify-between" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/assets/images/logo.webp" alt="SellCarUAE" width={257} height={38}
              className="w-[165px] h-auto sm:w-[221px] lg:w-[257px]" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="font-['Poppins'] text-[19px] font-medium text-[#000000DE] hover:text-[#1EAD5E] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <a href="https://wa.me/971524881200" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/images/whatsapp-logo.png" alt="WhatsApp" width={32} height={32} />
            </a>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex flex-col gap-[5px] p-1">
              <span className="block w-6 h-[2px] bg-[#1D2126]" />
              <span className="block w-6 h-[2px] bg-[#1D2126]" />
              <span className="block w-6 h-[2px] bg-[#1D2126]" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[1000]" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full z-[1001] bg-white transition-transform duration-200 ease-out
        w-[300px] sm:w-[400px] flex flex-col
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: sidebarOpen ? "0 0 10px 0 #4EB8764F" : "none" }}>
        <div className="flex items-center justify-between p-4 border-b border-[#BFBFBF]">
          <Image src="/assets/images/logo.webp" alt="SellCarUAE" width={165} height={28} />
          <button onClick={() => setSidebarOpen(false)} className="text-2xl text-[#1D2126] p-1">✕</button>
        </div>

        <nav className="flex-1 flex flex-col">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setSidebarOpen(false)}
              className="font-['Poppins'] text-[18px] font-bold text-[#000000DE] hover:text-[#38AD5E]
                border-t border-[#BFBFBF] py-[10px] pl-[17px] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Help section */}
        <div className="p-5 border-t border-[#BFBFBF]">
          <p className="font-['Poppins'] text-sm font-bold text-[#000000DE] mb-2">Help and support</p>
          <p className="text-[#515151] text-xs mb-1">Saturday to Thursday 10:00 – 20:00</p>
          <p className="text-[#515151] text-xs mb-2">Friday Home Service Only 14:00 – 20:00</p>
          <a href="tel:0524881200" className="block text-[#00A4FF] text-sm mb-1">052 488 1200</a>
          <a href="mailto:info@sellcaruae.com" className="block text-[#00A4FF] text-sm mb-1">info@sellcaruae.com</a>
          <p className="text-[#515151] text-xs">Response time usually 30 minutes</p>
        </div>
      </aside>

      {/* Spacer for fixed header */}
      <div style={{ height: "96px" }} />
    </>
  );
}
