import { useState } from 'react';
import { Eye, EyeOff, Heart, ShieldCheck, Activity } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('admin@healthsync.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated background orbs */}
      <div className="login-bg">
        <div className="login-bg__orb login-bg__orb--1" />
        <div className="login-bg__orb login-bg__orb--2" />
        <div className="login-bg__orb login-bg__orb--3" />
        <div className="login-bg__grid" />
      </div>

      <div className="login-container">
        {/* Left Panel */}
        <div className="login-left">
          <div className="login-left__content">
            <div className="login-left__logo">
              <div className="login-left__logo-icon">
                <Heart size={28} strokeWidth={2.5} />
              </div>
              <span className="login-left__logo-text">HealthSync</span>
            </div>

            <h2 className="login-left__headline">
              The Future of<br />
              <span className="gradient-text">Healthcare Management</span>
            </h2>
            <p className="login-left__desc">
              A comprehensive B2B platform built for healthcare providers —
              streamline patient care, analytics, and operations in one place.
            </p>

            <div className="login-left__features">
              {[
                { icon: ShieldCheck, text: 'HIPAA Compliant & Secure' },
                { icon: Activity, text: 'Real-time Patient Monitoring' },
                { icon: Heart, text: 'AI-Powered Health Insights' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="login-left__feature">
                  <div className="login-left__feature-icon">
                    <Icon size={16} />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="login-left__stats">
              {[
                { value: '50K+', label: 'Patients Managed' },
                { value: '200+', label: 'Hospitals' },
                { value: '99.9%', label: 'Uptime SLA' },
              ].map(({ value, label }) => (
                <div key={label} className="login-left__stat">
                  <span className="login-left__stat-value">{value}</span>
                  <span className="login-left__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="login-right">
          <div className="login-form-card animate-fade-in">
            <div className="login-form__header">
              <h1 className="login-form__title">Welcome back</h1>
              <p className="login-form__subtitle">Sign in to your HealthSync account</p>
            </div>

            {error && (
              <div className="login-error animate-slide-down">
                <span>⚠ {error}</span>
              </div>
            )}

            <div className="login-demo-hint">
              <span>🔑 Demo:</span> admin@healthsync.com / Admin@123
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="you@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-with-icon login-form__password">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    className="login-form__eye"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="login-form__options">
                <label className="login-form__remember">
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <a href="#" className="login-form__forgot">Forgot password?</a>
              </div>

              <button
                id="login-submit"
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ width: 18, height: 18 }} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="login-divider">
              <div className="divider" />
              <span>or</span>
              <div className="divider" />
            </div>

            <button
              id="google-login"
              type="button"
              className="btn btn-secondary btn-full"
              onClick={handleGoogle}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>

            <p className="login-form__terms">
              By signing in, you agree to our{' '}
              <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
