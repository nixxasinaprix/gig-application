// src/lib/otp-store.js
// Temporary OTP storage (in production, use Redis or database)

const otpStore = new Map();

// Store OTP with 10-minute expiry
export function storeOTP(email, otp) {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
    maxAttempts: 5,
  });
}

// Verify OTP
export function verifyOTP(email, otp) {
  const record = otpStore.get(email);
  
  if (!record) {
    return { success: false, error: "OTP not found. Please request a new one." };
  }
  
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return { success: false, error: "OTP expired. Please request a new one." };
  }
  
  if (record.attempts >= record.maxAttempts) {
    otpStore.delete(email);
    return { success: false, error: "Too many attempts. Please request a new OTP." };
  }
  
  record.attempts += 1;
  
  if (record.otp !== otp) {
    return { 
      success: false, 
      error: `Invalid OTP. ${record.maxAttempts - record.attempts} attempts remaining.` 
    };
  }
  
  // OTP verified, clean up
  otpStore.delete(email);
  return { success: true };
}

// Check if OTP exists (for resend logic)
export function hasActiveOTP(email) {
  const record = otpStore.get(email);
  return record && Date.now() < record.expiresAt;
}