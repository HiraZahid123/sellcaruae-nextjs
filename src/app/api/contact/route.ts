import { NextRequest, NextResponse } from "next/server";
import mailer from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const to = process.env.SMTP_FROM || "info@sellcaruae.com";

    if (process.env.SMTP_PASS) {
      await mailer.sendMail({
        from: `"SellCarUAE Website" <${process.env.SMTP_FROM || "noreply@sellcaruae.com"}>`,
        to,
        replyTo: email,
        subject: `New Contact Enquiry from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#1EAD5E;padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:20px;">New Contact Enquiry</h2>
            </div>
            <div style="padding:24px 32px;background:#fff;border:1px solid #E9ECEF;">
              <table style="width:100%;border-collapse:collapse;">
                ${[["Name", name], ["Email", email], ["Phone", phone || "—"]].map(([k, v]) => `
                <tr>
                  <td style="padding:8px 0;color:#9E9BA2;font-size:13px;width:80px;vertical-align:top;">${k}</td>
                  <td style="padding:8px 0;color:#1D2126;font-size:13px;font-weight:600;">${v}</td>
                </tr>`).join("")}
                <tr>
                  <td style="padding:8px 0;color:#9E9BA2;font-size:13px;vertical-align:top;">Message</td>
                  <td style="padding:8px 0;color:#1D2126;font-size:13px;white-space:pre-wrap;">${message}</td>
                </tr>
              </table>
            </div>
            <div style="padding:16px 32px;background:#F8F8F8;font-size:12px;color:#9E9BA2;">
              Sent from sellcaruae.com contact form
            </div>
          </div>
        `,
      });
    } else {
      console.log("[contact DEV] Would send enquiry from:", email, "—", message.substring(0, 80));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
