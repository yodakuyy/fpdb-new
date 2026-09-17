import React from 'react';
import type { FPDBSubmission } from '../types/fpdb';
import { 
  AlertTriangle, ArrowLeft, ArrowRight, Building2, 
  User, CreditCard, CheckCircle2
} from 'lucide-react';

interface RevisionsPageProps {
  submissions: FPDBSubmission[];
  onStartRevision: (submission: FPDBSubmission) => void;
  onBack: () => void;
}

export const RevisionsPage: React.FC<RevisionsPageProps> = ({
  submissions,
  onStartRevision,
  onBack,
}) => {
  const revisionSubmissions = submissions.filter((s) => s.status === 'Butuh Revisi');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div style={{ width: '100%', padding: '1.5rem 2rem 3rem' }}>
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </button>

        <div style={{ textAlign: 'right' }}>
          <span style={{
            backgroundColor: '#fff1f2',
            color: '#be123c',
            border: '1px solid #fecdd3',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}>
            TINDAKAN DIPERLUKAN ({revisionSubmissions.length} TIKET)
          </span>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090b', margin: '0.25rem 0 0', letterSpacing: '-0.02em' }}>
            Pengajuan FPDB yang Membutuhkan Revisi
          </h1>
        </div>
      </div>

      {revisionSubmissions.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
          borderRadius: '12px',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', marginBottom: '0.35rem' }}>
            Tidak Ada Pengajuan yang Membutuhkan Revisi
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#71717a', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Semua formulir pengajuan FPDB yang Anda kirimkan telah lolos verifikasi atau sedang dalam proses review lanjutan.
          </p>
          <button type="button" onClick={onBack} className="btn-primary">
            Kembali ke Dashboard
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {revisionSubmissions.map((sub) => (
            <div
              key={sub.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #fecdd3',
                borderRadius: '12px',
                padding: '1.75rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Header card */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f4f4f5', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.95rem', color: '#09090b' }}>
                      {sub.id}
                    </span>
                    <span className="status-badge badge-revision">
                      Butuh Revisi
                    </span>
                    <span style={{
                      backgroundColor: '#f4f4f5',
                      color: '#09090b',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #e4e4e7'
                    }}>
                      {sub.submissionType === 'NEW_DEALER' ? 'Dealer Baru' : 'Perubahan Data'}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                    {sub.storeProfile.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => onStartRevision(sub)}
                  className="btn-primary"
                  style={{
                    backgroundColor: '#09090b',
                    borderColor: '#000000',
                    padding: '0.65rem 1.25rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <span>Buka & Perbaiki Formulir Sekarang</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Revision Alert Box */}
              <div style={{
                backgroundColor: '#fff1f2',
                border: '1px solid #fecdd3',
                borderRadius: '10px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <AlertTriangle size={24} color="#e11d48" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#9f1239', marginBottom: '0.35rem' }}>
                    Catatan Perbaikan dari Reviewer / Sales Manager:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#881337', whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>
                    {sub.revisionNote || 'Mohon periksa dan unggah ulang lampiran dokumen yang belum jelas atau belum lengkap.'}
                  </p>
                </div>
              </div>

              {/* Data Grid Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1rem', backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#09090b', marginBottom: '0.5rem' }}>
                    <Building2 size={16} /> Data Toko
                  </div>
                  <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.25rem', color: '#52525b' }}>
                    <div>Bentuk: <strong>{sub.storeProfile.businessType}</strong></div>
                    <div>Alamat: {sub.storeProfile.address}, {sub.storeProfile.city}</div>
                    <div>Telepon: {sub.storeProfile.phone}</div>
                  </div>
                </div>

                <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1rem', backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#09090b', marginBottom: '0.5rem' }}>
                    <User size={16} /> Penanggung Jawab
                  </div>
                  <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.25rem', color: '#52525b' }}>
                    <div>Nama PIC: <strong>{sub.ownerProfile.fullName}</strong></div>
                    <div>NIK: {sub.ownerProfile.nik}</div>
                    <div>HP/WA: {sub.ownerProfile.phone}</div>
                  </div>
                </div>

                <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1rem', backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#09090b', marginBottom: '0.5rem' }}>
                    <CreditCard size={16} /> Usulan Finansial
                  </div>
                  <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.25rem', color: '#52525b' }}>
                    <div>Plafon Limit: <strong style={{ color: '#09090b' }}>{formatRupiah(sub.financialRequest.requestedLimit)}</strong></div>
                    <div>TOP: <strong>{sub.financialRequest.paymentTerm}</strong></div>
                    <div>Estimasi Belanja: {formatRupiah(sub.financialRequest.estimatedMonthlyPurchase)}/bln</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
