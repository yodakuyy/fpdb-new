import React, { useState, useMemo } from 'react';
import type { FPDBSubmission, Dealer } from '../types/fpdb';
import { 
  PlusCircle, Edit3, Search, Filter, Clock, CheckCircle2, 
  AlertTriangle, Eye, ArrowRight, Building, 
  ChevronRight
} from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    nik: string;
    role: string;
    branch: string;
  };
  dealers: Dealer[];
  submissions: FPDBSubmission[];
  onStartNewDealer: () => void;
  onStartEditDealer: () => void;
  onViewSubmission: (submission: FPDBSubmission) => void;
  onEditRevision: (submission: FPDBSubmission) => void;
  onNavigateToAllSubmissions?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  dealers,
  submissions,
  onStartNewDealer,
  onStartEditDealer,
  onViewSubmission,
  onEditRevision,
  onNavigateToAllSubmissions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchSearch =
        sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.storeProfile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.storeProfile.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || sub.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [submissions, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const totalActiveDealers = dealers.length;
    const inReview = submissions.filter((s) => s.status.includes('Review') || s.status.includes('Menunggu')).length;
    const needRevision = submissions.filter((s) => s.status === 'Butuh Revisi').length;
    const approved = submissions.filter((s) => s.status === 'Disetujui').length;

    return { totalActiveDealers, inReview, needRevision, approved };
  }, [dealers, submissions]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <span className="status-badge badge-draft">Draft</span>;
      case 'Menunggu Review Branch Manager':
        return <span className="status-badge badge-submitted">Menunggu BM</span>;
      case 'Review Regional BD Sr. Mgr':
        return <span className="status-badge badge-review">Review RSM</span>;
      case 'Review Finance':
        return <span className="status-badge badge-review">Review Finance</span>;
      case 'Menunggu Review Sales Manager':
        return <span className="status-badge badge-submitted">Menunggu Sales Mgr</span>;
      case 'Review Credit Control':
        return <span className="status-badge badge-review">Review Credit Control</span>;
      case 'Butuh Revisi':
        return <span className="status-badge badge-revision">Butuh Revisi</span>;
      case 'Disetujui':
        return <span className="status-badge badge-approved">Disetujui</span>;
      case 'Ditolak':
        return <span className="status-badge badge-rejected">Ditolak</span>;
      default:
        return <span className="status-badge badge-draft">{status}</span>;
    }
  };

  return (
    <div style={{ width: '100%', padding: '1.5rem 2rem 3rem' }}>
      {/* Single Clean Welcome Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#09090b', letterSpacing: '-0.02em', margin: 0 }}>
          Selamat Datang, {user.name}
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#71717a', marginTop: '0.25rem' }}>
          Kelola pengajuan kemitraan dealer baru dan perubahan limit kredit atau data toko wilayah {user.branch}.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* TWO PRIMARY ACTION CARDS: NEW DEALER & EDIT DEALER (KEY USER REQUIREMENT) */}
      {/* ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* CARD 1: NEW DEALER */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
          borderRadius: '12px',
          padding: '1.75rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{
                backgroundColor: '#09090b',
                color: '#ffffff',
                padding: '0.65rem',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}>
                <PlusCircle size={24} />
              </div>
              <span style={{
                backgroundColor: '#f4f4f5',
                color: '#09090b',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                border: '1px solid #d4d4d8'
              }}>
                Outlet / Toko Baru
              </span>
            </div>

            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#09090b', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Pengajuan Dealer Baru
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#52525b', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Buka kemitraan distribusi untuk toko atau badan usaha baru yang belum terdaftar di sistem ERP/SAP perusahaan.
            </p>

            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.785rem',
              color: '#3f3f46'
            }}>
              <div style={{ fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>Persyaratan Utama:</div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'grid', gap: '0.25rem' }}>
                <li>Formulir identitas toko & penanggung jawab</li>
                <li>Foto fisik toko, plang nama, etalase & gudang</li>
                <li>Usulan limit plafon kredit & syarat pembayaran (TOP)</li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartNewDealer}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.8rem 1.25rem',
              fontSize: '0.9rem',
              backgroundColor: '#09090b',
              borderColor: '#000000',
              justifyContent: 'space-between',
              borderRadius: '8px'
            }}
          >
            <span>Mulai Formulir Dealer Baru</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* CARD 2: EDIT DEALER (SELECT FROM EXISTING DATABASE) */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
          borderRadius: '12px',
          padding: '1.75rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{
                backgroundColor: '#09090b',
                color: '#ffffff',
                padding: '0.65rem',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}>
                <Edit3 size={24} />
              </div>
              <span style={{
                backgroundColor: '#f4f4f5',
                color: '#09090b',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                border: '1px solid #d4d4d8'
              }}>
                Database SAP & ACCPAC ({dealers.length} Toko Aktif)
              </span>
            </div>

            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#09090b', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Perubahan Data Dealer
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#52525b', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Ajukan permohonan penyesuaian plafon kredit, perpanjangan TOP, atau perubahan data legalitas dari dealer yang sudah aktif.
            </p>

            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.785rem',
              color: '#3f3f46'
            }}>
              <div style={{ fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>Alur Perubahan Data:</div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'grid', gap: '0.25rem' }}>
                <li>Cari dealer via Nama / Nomor Akun SAP & ACCPAC</li>
                <li>Data lama terisi otomatis ke formulir FPDB</li>
                <li>Ubah parameter yang disesuaikan & submit ke Credit Control</li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartEditDealer}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.8rem 1.25rem',
              fontSize: '0.9rem',
              backgroundColor: '#09090b',
              borderColor: '#000000',
              justifyContent: 'space-between',
              borderRadius: '8px'
            }}
          >
            <span>Pilih Dealer untuk Perubahan Data</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem 1.25rem', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#64748b' }}>Dealer Aktif Terdaftar</span>
            <Building size={16} color="#64748b" />
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>
            {stats.totalActiveDealers}
          </div>
          <div style={{ fontSize: '0.725rem', color: '#059669', marginTop: '0.15rem' }}>
            Area Wilayah Jawa Barat
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem 1.25rem', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#64748b' }}>Sedang Ditinjau (Review)</span>
            <Clock size={16} color="#d97706" />
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#d97706', marginTop: '0.25rem' }}>
            {stats.inReview}
          </div>
          <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '0.15rem' }}>
            Dalam proses evaluasi kredit
          </div>
        </div>

        <div style={{
          backgroundColor: stats.needRevision > 0 ? '#fff1f2' : '#ffffff',
          border: '1px solid #fecdd3',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#9f1239' }}>Memerlukan Revisi</span>
            <AlertTriangle size={16} color="#e11d48" />
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#be123c', marginTop: '0.25rem' }}>
            {stats.needRevision}
          </div>
          <div style={{ fontSize: '0.725rem', color: '#9f1239', fontWeight: 600, marginTop: '0.15rem' }}>
            Perlu tindakan salesman segera
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem 1.25rem', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#64748b' }}>Pengajuan Disetujui</span>
            <CheckCircle2 size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#059669', marginTop: '0.25rem' }}>
            {stats.approved}
          </div>
          <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '0.15rem' }}>
            Nomor SAP resmi diterbitkan
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBMISSIONS LIST / TABLE */}
      {/* ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xs)'
      }}>
        {/* Table Header Controls */}
        <div style={{
          padding: '1.15rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#ffffff'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090b', margin: 0, letterSpacing: '-0.01em' }}>
                Daftar Pengajuan FPDB Terkini
              </h3>
              <span style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                padding: '0.15rem 0.55rem',
                borderRadius: '9999px',
                fontSize: '0.725rem',
                fontWeight: 700
              }}>
                {submissions.length} Total
              </span>
            </div>
            <p style={{ fontSize: '0.785rem', color: '#64748b', margin: '0.2rem 0 0' }}>
              Memuat histori pengajuan baru dan permohonan perubahan data yang Anda ajukan.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search Box */}
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari toko, tiket FPDB, kota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.2rem', fontSize: '0.8rem', padding: '0.45rem 0.75rem 0.45rem 2.2rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            {/* Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={15} color="#64748b" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="ALL">Semua Status</option>
                <option value="Menunggu Review Branch Manager">Menunggu Review BM</option>
                <option value="Review Regional BD Sr. Mgr">Review RSM</option>
                <option value="Review Finance">Review Finance</option>
                <option value="Butuh Revisi">Butuh Revisi</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* View Full Page Button */}
            {onNavigateToAllSubmissions && (
              <button
                type="button"
                onClick={onNavigateToAllSubmissions}
                className="btn-secondary"
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.785rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontWeight: 600,
                  color: '#09090b',
                  borderColor: '#cbd5e1'
                }}
              >
                <span>Halaman Penuh</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Table View */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>No. Tiket FPDB</th>
                <th style={{ padding: '0.85rem 1rem' }}>Tipe</th>
                <th style={{ padding: '0.85rem 1rem' }}>Nama Toko & Kota</th>
                <th style={{ padding: '0.85rem 1rem' }}>Plafon Diajukan</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Tanggal Diajukan</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3.5rem 1rem', textAlign: 'center', color: '#64748b' }}>
                    <div style={{ maxWidth: '320px', margin: '0 auto' }}>
                      <p style={{ fontWeight: 600, color: '#09090b', margin: '0 0 0.25rem' }}>Tidak ada pengajuan ditemukan</p>
                      <p style={{ fontSize: '0.785rem', margin: 0 }}>Coba ubah kata kunci pencarian atau filter status Anda.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => {
                  const isRevision = sub.status === 'Butuh Revisi';
                  const initials = sub.storeProfile.name
                    .replace(/^(UD|PT|CV|TOKO)\.?\s+/i, '')
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <tr
                      key={sub.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        backgroundColor: isRevision ? '#fffcfc' : '#ffffff',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isRevision ? '#fff5f5' : '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isRevision ? '#fffcfc' : '#ffffff';
                      }}
                    >
                      <td style={{ padding: '0.85rem 1.25rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#09090b', fontSize: '0.825rem' }}>
                          {sub.id}
                        </div>
                        {sub.targetDealerCode && (
                          <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginTop: '0.1rem' }}>
                            Ref SAP #{sub.targetDealerCode}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: sub.submissionType === 'NEW_DEALER' ? '#eff6ff' : '#ecfdf5',
                          color: sub.submissionType === 'NEW_DEALER' ? '#1d4ed8' : '#047857',
                          border: `1px solid ${sub.submissionType === 'NEW_DEALER' ? '#bfdbfe' : '#a7f3d0'}`
                        }}>
                          {sub.submissionType === 'NEW_DEALER' ? 'Dealer Baru' : 'Perubahan Data'}
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: '#f1f5f9',
                            color: '#0f172a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            flexShrink: 0
                          }}>
                            {initials}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#09090b', fontSize: '0.85rem' }}>
                              {sub.storeProfile.name}
                            </div>
                            <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '0.1rem' }}>
                              {sub.storeProfile.city}, {sub.storeProfile.province}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 800, color: '#09090b', fontSize: '0.875rem' }}>
                          {formatRupiah(sub.financialRequest.requestedLimit)}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem' }}>
                          TOP: {sub.financialRequest.paymentTerm}
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        {getStatusBadge(sub.status)}
                      </td>

                      <td style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.785rem' }}>
                        {sub.createdAt}
                      </td>

                      <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => onViewSubmission(sub)}
                            className="btn-secondary"
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', gap: '0.35rem', borderRadius: '6px', fontWeight: 600 }}
                            title="Lihat Rincian Pengajuan"
                          >
                            <Eye size={13} />
                            <span>Detail</span>
                          </button>

                          {isRevision && (
                            <button
                              type="button"
                              onClick={() => onEditRevision(sub)}
                              className="btn-primary"
                              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', backgroundColor: '#be123c', borderColor: '#9f1239', gap: '0.35rem', borderRadius: '6px', fontWeight: 600 }}
                              title="Buka untuk Perbaikan Revisi"
                            >
                              <Edit3 size={13} />
                              <span>Perbaiki</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <span>Menampilkan <strong>{filteredSubmissions.length}</strong> dari <strong>{submissions.length}</strong> pengajuan FPDB</span>
          <span>PT Modena Centro Indonesia • Credit Risk & Sales Governance</span>
        </div>
      </div>
    </div>
  );
};
