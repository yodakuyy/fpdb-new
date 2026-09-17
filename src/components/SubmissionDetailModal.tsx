import React from 'react';
import type { FPDBSubmission } from '../types/fpdb';
import { 
  X, Building2, User, CreditCard, Paperclip, 
  AlertTriangle, Clock, 
  FileText, ArrowRight 
} from 'lucide-react';

interface SubmissionDetailModalProps {
  submission: FPDBSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onEditRevision?: (sub: FPDBSubmission) => void;
}

export const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  isOpen,
  onClose,
  onEditRevision,
}) => {
  if (!isOpen || !submission) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Draft': return 'badge-draft';
      case 'Menunggu Review Branch Manager': return 'badge-submitted';
      case 'Review Regional BD Sr. Mgr': return 'badge-review';
      case 'Review Finance': return 'badge-review';
      case 'Menunggu Review Sales Manager': return 'badge-submitted';
      case 'Review Credit Control': return 'badge-review';
      case 'Butuh Revisi': return 'badge-revision';
      case 'Disetujui': return 'badge-approved';
      case 'Ditolak': return 'badge-rejected';
      default: return 'badge-draft';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #cbd5e1'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0f2744',
          color: '#ffffff'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: '#93c5fd' }}>
                {submission.id}
              </span>
              <span className={`status-badge ${getStatusBadgeClass(submission.status)}`}>
                {submission.status}
              </span>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 600,
                padding: '0.15rem 0.5rem',
                borderRadius: '4px'
              }}>
                {submission.submissionType === 'NEW_DEALER' ? 'DEALER BARU' : 'PERUBAHAN DATA'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
              {submission.storeProfile.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.4rem',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#cbd5e1'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {/* If Revision Required Alert Box */}
          {submission.status === 'Butuh Revisi' && (
            <div style={{
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <AlertTriangle size={22} color="#e11d48" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#9f1239', marginBottom: '0.35rem' }}>
                  Catatan Revisi dari Tim Reviewer / Sales Manager:
                </div>
                <p style={{ fontSize: '0.825rem', color: '#881337', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                  {submission.revisionNote || 'Mohon lengkapi dan perbaiki dokumen lampiran yang belum sesuai.'}
                </p>
                {onEditRevision && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEditRevision(submission);
                    }}
                    className="btn-primary"
                    style={{ marginTop: '0.75rem', fontSize: '0.8rem', padding: '0.4rem 0.85rem', backgroundColor: '#be123c', borderColor: '#9f1239' }}
                  >
                    <span>Buka & Perbaiki Formulir Sekarang</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Timeline Approval Progress */}
          <div style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem 1.25rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} color="#2563eb" /> Riwayat & Alur Persetujuan (Workflow)
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {submission.approvalLogs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.8rem',
                    borderLeft: '2px solid #cbd5e1',
                    paddingLeft: '0.85rem',
                    marginLeft: '0.4rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#0f172a' }}>{log.stage}</strong>
                      <span style={{ color: '#64748b' }}>oleh {log.actor} ({log.role})</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>• {log.date}</span>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.1rem 0.4rem',
                        borderRadius: '4px',
                        backgroundColor:
                          log.status === 'APPROVED' ? '#ecfdf5' :
                          log.status === 'REVISED' ? '#fff1f2' : '#eff6ff',
                        color:
                          log.status === 'APPROVED' ? '#047857' :
                          log.status === 'REVISED' ? '#be123c' : '#1e40af'
                      }}>
                        {log.status}
                      </span>
                    </div>
                    {log.comment && (
                      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.4rem 0.65rem', marginTop: '0.35rem', color: '#334155', fontStyle: 'italic' }}>
                        "{log.comment}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Toko */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#1e40af', marginBottom: '0.65rem' }}>
                <Building2 size={16} /> Data Toko & Lokasi
              </div>
              <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.35rem' }}>
                <div><span style={{ color: '#64748b' }}>Bentuk:</span> {submission.storeProfile.businessType}</div>
                <div><span style={{ color: '#64748b' }}>Kategori:</span> {submission.storeProfile.category}</div>
                <div><span style={{ color: '#64748b' }}>Alamat:</span> {submission.storeProfile.address}</div>
                <div><span style={{ color: '#64748b' }}>Kota/Prov:</span> {submission.storeProfile.city}, {submission.storeProfile.province}</div>
                <div><span style={{ color: '#64748b' }}>Telepon:</span> {submission.storeProfile.phone}</div>
                <div><span style={{ color: '#64748b' }}>Lama Operasi:</span> {submission.storeProfile.operatingYears} Tahun</div>
              </div>
            </div>

            {/* Pemilik */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#1e40af', marginBottom: '0.65rem' }}>
                <User size={16} /> Penanggung Jawab
              </div>
              <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.35rem' }}>
                <div><span style={{ color: '#64748b' }}>Nama PIC:</span> <strong>{submission.ownerProfile.fullName}</strong></div>
                <div><span style={{ color: '#64748b' }}>NIK KTP:</span> {submission.ownerProfile.nik}</div>
                <div><span style={{ color: '#64748b' }}>NPWP:</span> {submission.ownerProfile.npwp}</div>
                <div><span style={{ color: '#64748b' }}>No HP:</span> {submission.ownerProfile.phone}</div>
                <div><span style={{ color: '#64748b' }}>Alamat Domisili:</span> {submission.ownerProfile.homeAddress}</div>
              </div>
            </div>

            {/* Finansial */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#1e40af', marginBottom: '0.65rem' }}>
                <CreditCard size={16} /> Finansial & Limit
              </div>
              <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.35rem' }}>
                <div>
                  <span style={{ color: '#64748b' }}>Limit Diajukan:</span>{' '}
                  <strong style={{ color: '#1d4ed8', fontSize: '0.95rem' }}>{formatRupiah(submission.financialRequest.requestedLimit)}</strong>
                </div>
                {submission.financialRequest.existingLimit && (
                  <div><span style={{ color: '#64748b' }}>Limit Sebelumnya:</span> {formatRupiah(submission.financialRequest.existingLimit)}</div>
                )}
                <div><span style={{ color: '#64748b' }}>TOP Diajukan:</span> <strong>{submission.financialRequest.paymentTerm}</strong></div>
                <div><span style={{ color: '#64748b' }}>Target Omset:</span> {formatRupiah(submission.financialRequest.estimatedMonthlyPurchase)}/bln</div>
                <div><span style={{ color: '#64748b' }}>Bank:</span> {submission.financialRequest.bankName} - {submission.financialRequest.bankAccountNumber}</div>
              </div>
            </div>
          </div>

          {/* Lampiran Dokumen List */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#1e40af', marginBottom: '0.65rem' }}>
              <Paperclip size={16} /> Lampiran Berkas Dokumen ({submission.attachments.filter(a => a.isUploaded).length} File)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem' }}>
              {submission.attachments.filter(a => a.isUploaded).map(doc => (
                <div
                  key={doc.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <FileText size={16} color="#2563eb" />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.785rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {doc.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      {doc.fileName || 'dokumen.pdf'} ({doc.fileSize || '1.2 MB'})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Diajukan oleh: <strong>{submission.salesman.name}</strong> ({submission.salesman.nik}) pada {submission.createdAt}
          </div>
          <button type="button" onClick={onClose} className="btn-secondary">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
