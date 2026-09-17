import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Lock, 
  AlertCircle, TrendingUp, FileCheck2, 
  Sparkles, KeyRound, Mail
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; nik: string; role: string; region: string; branch: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('rian.prasetya@modena.com');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Harap masukkan alamat email perusahaan yang valid.');
      return;
    }
    setError('');
    onLoginSuccess({
      name: 'Rian Prasetya',
      nik: 'SLS-2021-089',
      role: 'Senior Field Sales Executive',
      region: 'Jawa Barat 1',
      branch: 'Regional Office Jawa Barat 1 - Bandung Hub',
    });
  };

  const handleMicrosoftLogin = () => {
    setError('');
    // Simulates Microsoft 365 Entra ID SSO Authentication
    onLoginSuccess({
      name: 'Rian Prasetya',
      nik: 'SLS-2021-089',
      role: 'Senior Field Sales Executive',
      region: 'Jawa Barat 1',
      branch: 'Regional Office Jawa Barat 1 - Bandung Hub',
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      backgroundColor: '#ffffff',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden'
    }}>
      {/* LEFT PANEL: LUXURY OBSIDIAN EDITORIAL SHOWCASE */}
      <div style={{
        flex: '1 1 50%',
        backgroundColor: '#09090b',
        color: '#ffffff',
        padding: '3.5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid #27272a'
      }}>
        {/* Subtle geometric luxury background accents */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(9,9,11,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(9,9,11,0) 70%)',
          pointerEvents: 'none'
        }} />

        {/* Top Branding */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2.5rem' }}>
            <div style={{
              backgroundColor: '#ffffff',
              color: '#09090b',
              padding: '0.6rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
            }}>
              <Building2 size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
                MODENA FPDB PORTAL
              </div>
              <div style={{ fontSize: '0.75rem', color: '#a1a1aa', letterSpacing: '0.02em' }}>
                PT Modena Centro Indonesia • SAP Integrated
              </div>
            </div>
          </div>

          {/* Main Statement */}
          <div style={{ maxWidth: '520px', marginTop: '1rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              fontSize: '0.75rem',
              color: '#d4d4d8',
              marginBottom: '1.25rem',
              fontWeight: 600
            }}>
              <Sparkles size={13} color="#60a5fa" />
              <span>Sistem Manajemen Database Dealer & Plafon Kredit v2.4</span>
            </div>

            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              color: '#f4f4f5'
            }}>
              Satu Portal untuk Pembukaan & Pembaruan Data Dealer MODENA.
            </h1>

            <p style={{ fontSize: '0.95rem', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Mempercepat alur persetujuan limit kredit, sinkronisasi master customer SAP, serta verifikasi legalitas toko fisik secara akurat dan transparan.
            </p>
          </div>

          {/* Value Props Cards */}
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '520px' }}>
            <div style={{
              backgroundColor: 'rgba(24, 24, 27, 0.65)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #27272a',
              borderRadius: '10px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', padding: '0.55rem', borderRadius: '8px', color: '#38bdf8' }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#f4f4f5' }}>
                  Penyesuaian Limit & TOP Lebih Cepat
                </div>
                <div style={{ fontSize: '0.775rem', color: '#a1a1aa' }}>
                  Tarik otomatis histori performa dealer existing langsung dari database SAP.
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(24, 24, 27, 0.65)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #27272a',
              borderRadius: '10px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', padding: '0.55rem', borderRadius: '8px', color: '#34d399' }}>
                <FileCheck2 size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#f4f4f5' }}>
                  Standar Kelengkapan Dokumen 100% Digital
                </div>
                <div style={{ fontSize: '0.775rem', color: '#a1a1aa' }}>
                  Validasi KTP, NPWP, NIB, foto etalase toko, dan rekening koran tanpa berkas fisik hilang.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Quote */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '2rem',
          borderTop: '1px solid #27272a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.75rem',
          color: '#71717a'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>Kepatuhan Internal Audit PT Modena Centro Indonesia</span>
          </div>
          <div>SLA Maksimal: 3 Hari Kerja</div>
        </div>
      </div>

      {/* RIGHT PANEL: MINIMALIST LUXURY AUTH FORM */}
      <div style={{
        flex: '1 1 50%',
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2.5rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          padding: '2.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#09090b',
              color: '#ffffff',
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.725rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              marginBottom: '1rem'
            }}>
              <KeyRound size={12} />
              PORTAL SALES RESMI
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#09090b', letterSpacing: '-0.02em', margin: '0 0 0.4rem' }}>
              Masuk ke Akun Anda
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#71717a', margin: 0 }}>
              Gunakan akun Microsoft 365 atau email resmi PT Modena Centro Indonesia.
            </p>
          </div>

          {/* Microsoft Single Sign-On Button */}
          <button
            type="button"
            onClick={handleMicrosoftLogin}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: '#ffffff',
              color: '#09090b',
              border: '1px solid #d4d4d8',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f4f4f5')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            {/* Official Microsoft 4-Square Logo */}
            <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
              <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
            </svg>
            <span>Masuk dengan Microsoft 365</span>
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '0.75rem' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e4e4e7' }} />
            <span style={{ fontSize: '0.725rem', color: '#a1a1aa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              atau dengan email
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e4e4e7' }} />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#fff1f2',
                border: '1px solid #fecdd3',
                borderRadius: '8px',
                color: '#9f1239',
                fontSize: '0.825rem',
                marginBottom: '1.25rem'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#27272a', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Email Perusahaan <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#71717a" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama.sales@modena.com"
                  required
                  style={{
                    fontSize: '0.875rem',
                    padding: '0.7rem 0.95rem 0.7rem 2.4rem',
                    borderRadius: '8px',
                    border: '1px solid #d4d4d8'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.725rem', color: '#71717a', marginTop: '0.3rem', display: 'block' }}>
                Gunakan alamat email resmi @modena.com Anda.
              </span>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#27272a', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  Kata Sandi <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <a
                  href="#reset"
                  onClick={(e) => { e.preventDefault(); alert('Silakan kontak IT Helpdesk MODENA di ext 4401 untuk reset password internal.'); }}
                  style={{ fontSize: '0.75rem', color: '#09090b', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Lupa sandi?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                required
                style={{
                  fontSize: '0.875rem',
                  padding: '0.7rem 0.95rem',
                  borderRadius: '8px',
                  border: '1px solid #d4d4d8'
                }}
              />
            </div>

            {/* Solid Obsidian Black Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.8rem 1.25rem',
                fontSize: '0.925rem',
                borderRadius: '8px'
              }}
            >
              <Lock size={16} />
              <span>Masuk ke Sistem FPDB</span>
            </button>
          </form>

          {/* Footer inside card */}
          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.725rem', color: '#a1a1aa' }}>
            PT Modena Centro Indonesia • Hak Cipta 2026
          </div>
        </div>
      </div>
    </div>
  );
};
