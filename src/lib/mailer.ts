import nodemailer from "nodemailer";

declare global {
  // eslint-disable-next-line no-var
  var _mailer: nodemailer.Transporter | undefined;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: (process.env.SMTP_PORT || "465") === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function getMailer() {
  if (!globalThis._mailer) {
    globalThis._mailer = createTransporter();
  }
  return globalThis._mailer;
}

export default new Proxy({} as nodemailer.Transporter, {
  get(_target, prop) {
    return (getMailer() as never)[prop as string];
  },
});

export function bookingConfirmationHtml(data: {
  name?: string;
  phone: string;
  make: string;
  model: string;
  year: string;
  mileage?: string;
  specs?: string;
  bookingType: string;
  date: string;
  time: string;
  branch?: string;
  homeAddress?: string;
}) {
  const isOffice = data.bookingType === "OFFICE_VISIT";
  const locationLabel = isOffice ? "Branch" : "Address";
  const locationValue = isOffice ? (data.branch || "Main Office — Dubai") : (data.homeAddress || "");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed – SellCarUAE</title>
</head>
<body style="margin:0;padding:0;background:#F8F8F8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#1EAD5E;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">
              SellCar<span style="color:#D8EEE0;">UAE</span>
            </h1>
            <p style="margin:8px 0 0;color:#D8EEE0;font-size:14px;">Your appointment is confirmed!</p>
          </td>
        </tr>
        <!-- Check icon -->
        <tr>
          <td style="padding:32px 40px 0;text-align:center;">
            <div style="width:64px;height:64px;background:#D8EEE0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
              <span style="color:#1EAD5E;font-size:30px;line-height:64px;">✓</span>
            </div>
            <h2 style="margin:0 0 6px;color:#1D2126;font-size:22px;font-weight:700;">Booking Confirmed</h2>
            <p style="margin:0;color:#5B5F66;font-size:14px;">
              ${data.name ? `Hi ${data.name}, thank` : "Thank"} you for choosing SellCarUAE. Here's your appointment summary.
            </p>
          </td>
        </tr>
        <!-- Details card -->
        <tr>
          <td style="padding:24px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F8;border-radius:12px;padding:20px;">
              <tr><td colspan="2" style="padding-bottom:12px;border-bottom:1px solid #E9ECEF;margin-bottom:12px;">
                <span style="font-weight:700;color:#1D2126;font-size:15px;">Appointment Details</span>
              </td></tr>
              ${[
                ["Car", `${data.year} ${data.make} ${data.model}`],
                ...(data.mileage ? [["Mileage", data.mileage]] : []),
                ...(data.specs ? [["Specs", data.specs === "gcc" ? "GCC Specs" : "Non-GCC Specs"]] : []),
                ["Date", data.date],
                ["Time", data.time],
                ["Type", isOffice ? "Office Visit" : "Home Inspection"],
                [locationLabel, locationValue],
                ["Phone", data.phone],
              ].map(([k, v]) => `
              <tr>
                <td style="padding:8px 0;color:#9E9BA2;font-size:13px;width:120px;">${k}</td>
                <td style="padding:8px 0;color:#1D2126;font-size:13px;font-weight:600;">${v}</td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>
        <!-- What to bring -->
        <tr>
          <td style="padding:0 40px 24px;">
            <p style="margin:0 0 10px;font-weight:700;color:#1D2126;font-size:14px;">What to bring:</p>
            <ul style="margin:0;padding-left:20px;color:#5B5F66;font-size:13px;line-height:22px;">
              <li>Emirates ID</li>
              <li>Vehicle Registration Card (Mulkiya)</li>
              <li>Car keys</li>
            </ul>
          </td>
        </tr>
        <!-- Contact bar -->
        <tr>
          <td style="background:#D8EEE0;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#1D2126;font-size:13px;">
              Questions? Call us: <a href="tel:+971524881200" style="color:#1EAD5E;font-weight:700;text-decoration:none;">052 488 1200</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="mailto:info@sellcaruae.com" style="color:#1EAD5E;font-weight:600;text-decoration:none;">info@sellcaruae.com</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#9E9BA2;font-size:12px;">
              © ${new Date().getFullYear()} SellCarUAE. All rights reserved.<br/>
              You received this email because you booked a car evaluation on sellcaruae.com
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
