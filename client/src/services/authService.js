const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/pure';

/**
 * Auth Service matching S2Y Pure authentication engine:
 * - Email OTP based Login & Registration
 * - Payment-gated account session recovery
 * - Cookie & LocalStorage persistence
 */

export async function sendEmailOtp(email, purpose = 'login') {
  const res = await fetch(`${API_BASE_URL}/auth/email-otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email: email.toLowerCase().trim(), purpose }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to send verification OTP');
  }
  return data;
}

export async function verifyEmailOtp(email, otp, purpose = 'login') {
  const res = await fetch(`${API_BASE_URL}/auth/email-otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email: email.toLowerCase().trim(), otp: otp.trim(), purpose }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Invalid or expired OTP');
  }
  return data; // contains verificationToken
}

export async function loginWithOtp({ email, verificationToken, password, mfaCode }) {
  const payload = { email: email.toLowerCase().trim() };
  if (verificationToken) payload.verificationToken = verificationToken;
  if (password) payload.password = password;
  if (mfaCode) payload.mfaCode = mfaCode;

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
}

export async function registerWithOtp({ name, email, phone, verificationToken }) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      verificationToken,
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
}

export async function logoutUser() {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  } catch (err) {
    console.warn('Logout API warning:', err);
  }
}

export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.success && data?.user) {
      return data.user;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getMyOrders() {
  const res = await fetch(`${API_BASE_URL}/orders/my`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Could not retrieve orders');
  }
  return data.orders || [];
}
