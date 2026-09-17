import React from 'react';
import { X, BookOpen, Clock, ShieldAlert, FileText } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '840px',
        maxHeight: '90vh',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #cbd5e1'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0f2744',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ backgroundColor: '#2563eb', padding: '0.4rem', borderRadius: '6px' }}>
              <BookOpen size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Pedoman & Standar Operasional Pengajuan FPDB
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#93c5fd', margin: '0.15rem 0 0' }}>
                Panduan resmi Salesman, Credit Control, dan Tim Accounting
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'grid', gap: '1.5rem' }}>
          {/* Section 1 */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#f8fafc' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={16} color="#2563eb" /> 1. Checklist Berkas Wajib Disiapkan Salesman
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.65rem' }}>
                <strong>e-KTP Asli Pemilik</strong>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0' }}>Foto jelas, tidak silau lampu, NIK dan foto terbaca penuh.</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.65rem' }}>
                <strong>NPWP Pribadi / Badan Usaha</strong>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0' }}>NPWP valid 15/16 digit format terbaru DJP.</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.65rem' }}>
                <strong>Foto Fasad Toko & Plang Nama</strong>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0' }}>Tampak depan dari seberang jalan raya terlihat plang nama.</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.65rem' }}>
                <strong>Foto Showroom & Gudang</strong>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0' }}>Display etalase elektronik dan kapasitas penyimpanan stok.</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.65rem' }}>
                <strong>Rekening Koran 3 Bulan</strong>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0' }}>Wajib untuk pengajuan plafon kredit &gt; Rp 100 Juta.</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.65rem' }}>
                <strong>Spesimen TTD & Stempel Toko</strong>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0' }}>Cap stempel basah toko resmi pada lembar spesimen.</p>
              </div>
            </div>
          </div>

          {/* Section 2: SLA & Hierarchy */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} color="#d97706" /> 2. Matriks Persetujuan & Service Level Agreement (SLA)
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#475569', display: 'grid', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <span><strong>Tier 1 (&le; Rp 100 Juta, TOP &le; 14 Hari):</strong></span>
                <span style={{ color: '#059669', fontWeight: 600 }}>Sales Manager + Credit Control Supervisor (24 Jam)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <span><strong>Tier 2 (Rp 100 Jt - Rp 300 Jt, TOP &le; 30 Hari):</strong></span>
                <span style={{ color: '#059669', fontWeight: 600 }}>Credit Control Manager + Head of Sales (48 Jam)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <span><strong>Tier 3 (&gt; Rp 300 Juta atau TOP 45-60 Hari):</strong></span>
                <span style={{ color: '#2563eb', fontWeight: 600 }}>Direktur Keuangan (CFO) & Direktur Komersial (72 Jam)</span>
              </div>
            </div>
          </div>

          {/* Section 3: Revision Rules */}
          <div style={{ border: '1px solid #fecdd3', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#fff1f2' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#9f1239', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldAlert size={16} color="#e11d48" /> 3. Penanganan Tiket "Butuh Revisi"
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#881337', margin: 0, lineHeight: 1.5 }}>
              Jika pengajuan dikembalikan dengan status <strong>"Butuh Revisi"</strong>, Salesman harus memeriksa kotak catatan perbaikan pada modal detail dan klik <strong>"Perbaiki"</strong>. Salesman tidak perlu membuat nomor tiket baru; pengajuan akan otomatis melanjutkan proses verifikasi setelah diperbaiki.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn-primary">
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
