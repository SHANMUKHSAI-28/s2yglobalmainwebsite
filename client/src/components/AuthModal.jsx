import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCheck, KeyRound, ArrowRight, Loader2, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendEmailOtp, verifyEmailOtp, loginWithOtp, registerWithOtp } from '../services/authService';
import './AuthModal.css';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode, setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [otpSent, setOtpSent] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const resetState = () => {
    setEmail('');
    setName('');
    setPhone('');
    setPassword('');
    setOtp('');
    setOtpSent(false);
    setRequiresPassword(false);
    setLoading(false);
    setError('');
    setSuccessMsg('');
  };

  const handleClose = () => {
    resetState();
    setIsAuthModalOpen(false);
  };

  const handleSwitchMode = (newMode) => {
    setError('');
    setSuccessMsg('');
    setOtpSent(false);
    setOtp('');
    setRequiresPassword(false);
    setAuthModalMode(newMode);
  };

  // SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (authModalMode === 'register') {
      if (!name.trim() || name.trim().length < 2) {
        setError('Please enter your full name (at least 2 characters)');
        return;
      }
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        setError('Please enter a valid 10-digit Indian mobile number');
        return;
      }
    }

    setLoading(true);

    try {
      const res = await sendEmailOtp(trimmedEmail, authModalMode);
      if (res.requiresPassword) {
        setRequiresPassword(true);
        setOtpSent(false);
      } else {
        setOtpSent(true);
        setSuccessMsg(`OTP successfully sent to ${trimmedEmail}`);
      }
    } catch (err) {
      const msg = err.message || 'Failed to send OTP';
      if (msg.toLowerCase().includes('account not found')) {
        setError('No account found for this email. Would you like to create one below?');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // VERIFY & COMPLETE
  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const trimmedEmail = email.trim().toLowerCase();

    try {
      if (requiresPassword) {
        // Password login
        const res = await loginWithOtp({ email: trimmedEmail, password });
        setAuth(res.user);
        handleClose();
        return;
      }

      // Step 1: Verify 6-digit OTP
      if (!otp || otp.trim().length !== 6) {
        setError('Please enter the 6-digit verification code');
        setLoading(false);
        return;
      }

      const verifyRes = await verifyEmailOtp(trimmedEmail, otp.trim(), authModalMode);
      const verificationToken = verifyRes.verificationToken;

      if (!verificationToken) {
        throw new Error('Verification token not received');
      }

      // Step 2: Login or Register
      if (authModalMode === 'login') {
        const loginRes = await loginWithOtp({ email: trimmedEmail, verificationToken });
        setAuth(loginRes.user);
      } else {
        const regRes = await registerWithOtp({
          name: name.trim(),
          email: trimmedEmail,
          phone: phone.trim(),
          verificationToken,
        });
        setAuth(regRes.user);
      }

      handleClose();
    } catch (err) {
      setError(err.message || 'Verification failed. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          className="auth-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="auth-modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="auth-modal__header">
              <div className="auth-modal__title">
                <Shield size={22} style={{ color: 'var(--color-pure)' }} />
                <span>
                  {authModalMode === 'login' ? 'Sign In to Your Account' : 'Create Customer Account'}
                </span>
              </div>
              <button className="auth-modal__close" onClick={handleClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="auth-modal__body">
              <div className="auth-notice auth-notice--info">
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Uses the official <strong>S2Y Pure</strong> authentication engine. Secure email OTP login — no password required.
                </span>
              </div>

              {error && (
                <div className="auth-notice auth-notice--error">
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="auth-notice auth-notice--info">
                  <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{successMsg}</span>
                </div>
              )}

              {!otpSent && !requiresPassword ? (
                /* STEP 1: Enter details to receive OTP */
                <form onSubmit={handleSendOtp} className="auth-form">
                  {authModalMode === 'register' && (
                    <>
                      <div className="auth-form__field">
                        <label htmlFor="reg-name">Full Name *</label>
                        <input
                          type="text"
                          id="reg-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          required
                        />
                      </div>
                      <div className="auth-form__field">
                        <label htmlFor="reg-phone">Mobile Number (10 digits) *</label>
                        <input
                          type="tel"
                          id="reg-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          maxLength={10}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="auth-form__field">
                    <label htmlFor="auth-email">Email Address *</label>
                    <input
                      type="email"
                      id="auth-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>{authModalMode === 'login' ? 'Send Login OTP' : 'Continue & Send OTP'}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : requiresPassword ? (
                /* Password Login (for staff or password accounts) */
                <form onSubmit={handleVerifyAndSubmit} className="auth-form">
                  <div className="auth-form__field">
                    <label htmlFor="auth-pwd">Password *</label>
                    <input
                      type="password"
                      id="auth-pwd"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      autoFocus
                    />
                  </div>
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Sign In</span>}
                  </button>
                </form>
              ) : (
                /* STEP 2: Enter 6-digit OTP */
                <form onSubmit={handleVerifyAndSubmit} className="auth-form">
                  <div className="auth-form__field">
                    <label htmlFor="auth-otp">Enter 6-Digit Email OTP</label>
                    <input
                      type="text"
                      id="auth-otp"
                      className="auth-otp-input"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      autoFocus
                      required
                    />
                  </div>

                  <button type="submit" className="auth-submit-btn" disabled={loading || otp.length !== 6}>
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>{authModalMode === 'login' ? 'Verify & Sign In' : 'Verify & Create Account'}</span>
                        <UserCheck size={16} />
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                    <button
                      type="button"
                      style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', textDecoration: 'underline' }}
                      onClick={() => setOtpSent(false)}
                    >
                      Change email or resend code
                    </button>
                  </div>
                </form>
              )}

              <div className="auth-modal__switch">
                {authModalMode === 'login' ? (
                  <>
                    <span>Don't have an account?</span>
                    <button
                      type="button"
                      className="auth-modal__switch-btn"
                      onClick={() => handleSwitchMode('register')}
                    >
                      Create one
                    </button>
                  </>
                ) : (
                  <>
                    <span>Already have an account?</span>
                    <button
                      type="button"
                      className="auth-modal__switch-btn"
                      onClick={() => handleSwitchMode('login')}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
