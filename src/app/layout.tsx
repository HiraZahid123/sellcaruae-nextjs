import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: { default: "SellCarUAE – Sell Your Car Fast in Dubai & UAE", template: "%s | SellCarUAE" },
  description: "Sell your used car in Dubai & UAE fast. Free valuation, instant cash offer, same-day payment. We buy any car — any condition, any make, financed or not.",
  keywords: ["sell car dubai", "sell used car uae", "car valuation dubai", "cash for cars uae", "sell my car"],
  metadataBase: new URL("https://sellcaruae.com"),
  openGraph: {
    siteName: "SellCarUAE",
    type: "website",
    images: ["/assets/images/logo.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
