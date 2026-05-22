// Singleton OTP store — shared across send and verify routes in the same process
declare global {
  // eslint-disable-next-line no-var
  var _otpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}

const otpStore: Map<string, { code: string; expiresAt: number }> =
  globalThis._otpStore ?? new Map();

if (process.env.NODE_ENV !== "production") globalThis._otpStore = otpStore;

export default otpStore;
