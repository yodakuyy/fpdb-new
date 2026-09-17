import React, { useState, useMemo } from 'react';
import type { FPDBSubmission } from '../types/fpdb';
import {
  Search, ArrowLeft, PlusCircle, Eye, Edit3,
  FileText, CheckCircle2, Clock, AlertTriangle,
  MapPin, User, Check, Copy, ArrowUpDown,
  Download, RefreshCw
} from 'lucide-react';

interface SubmissionsPageProps {
  submissions: FPDBSubmission[];
  onViewSubmission: (submission: FPDBSubmission) => void;
  onStartRevision: (submission: FPDBSubmission) => void;
  onStartNewDealer: () => void;
  onBack: () => void;
}

type FilterTab = 'ALL' | 'BM' | 'RSM' | 'FINANCE' | 'REVISION' | 'APPROVED' | 'DRAFT';

export const SubmissionsPage: React.FC<SubmissionsPageProps> = ({
  submissions,
  onViewSubmission,
  onStartRevision,
  onStartNewDealer,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'NEW_DEALER' | 'EDIT_DEALER'>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'OLDEST' | 'HIGHEST_LIMIT' | 'LOWEST_LIMIT'>('NEWEST');
  const [copiedTicketId, setCopiedTicketId] = useState<string | null>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Copy Ticket ID helper
  const handleCopyTicket = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedTicketId(id);
    setTimeout(() => setCopiedTicketId(null), 2000);
  };

  // Status Tab Counts
  const counts = useMemo(() => {
    return {
      all: submissions.length,
      bm: submissions.filter((s) => s.status === 'Menunggu Review Branch Manager' || s.status === 'Menunggu Review Sales Manager').length,
      rsm: submissions.filter((s) => s.status === 'Review Regional BD Sr. Mgr').length,
      finance: submissions.filter((s) => s.status === 'Review Finance' || s.status === 'Review Credit Control').length,
      revision: submissions.filter((s) => s.status === 'Butuh Revisi').length,
      approved: submissions.filter((s) => s.status === 'Disetujui').length,
      draft: submissions.filter((s) => s.status === 'Draft').length,
    };
  }, [submissions]);

  // Filtered & Sorted Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      // 1. Tab Filter
      if (activeTab === 'BM' && !(sub.status === 'Menunggu Review Branch Manager' || sub.status === 'Menunggu Review Sales Manager')) return false;
      if (activeTab === 'RSM' && sub.status !== 'Review Regional BD Sr. Mgr') return false;
      if (activeTab === 'FINANCE' && !(sub.status === 'Review Finance' || sub.status === 'Review Credit Control')) return false;
      if (activeTab === 'REVISION' && sub.status !== 'Butuh Revisi') return false;
      if (activeTab === 'APPROVED' && sub.status !== 'Disetujui') return false;
      if (activeTab === 'DRAFT' && sub.status !== 'Draft') return false;

      // 2. Type Filter
      if (typeFilter !== 'ALL' && sub.submissionType !== typeFilter) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = sub.id.toLowerCase().includes(q);
        const matchStore = sub.storeProfile.name.toLowerCase().includes(q);
        const matchCity = sub.storeProfile.city.toLowerCase().includes(q);
        const matchProvince = sub.storeProfile.province.toLowerCase().includes(q);
        const matchSales = sub.salesman.name.toLowerCase().includes(q);
        const matchOwner = sub.ownerProfile?.fullName?.toLowerCase().includes(q) || false;
        const matchSap = sub.targetDealerCode?.toLowerCase().includes(q) || false;

        if (!matchId && !matchStore && !matchCity && !matchProvince && !matchSales && !matchOwner && !matchSap) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'NEWEST') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'OLDEST') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'HIGHEST_LIMIT') return b.financialRequest.requestedLimit - a.financialRequest.requestedLimit;
      if (sortBy === 'LOWEST_LIMIT') return a.financialRequest.requestedLimit - b.financialRequest.requestedLimit;
      return 0;
    });
  }, [submissions, activeTab, typeFilter, searchQuery, sortBy]);

  // Color helper for Store Initials Avatar
  const getInitialsBg = (name: string) => {
    const colors = [
      { bg: '#eff6ff', text: '#1d4ed8' },
      { bg: '#f0fdf4', text: '#15803d' },
      { bg: '#fef3c7', text: '#b45309' },
      { bg: '#faf5ff', text: '#7e22ce' },
      { bg: '#fff1f2', text: '#be123c' },
      { bg: '#ecfeff', text: '#0e7490' },
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Status Badge Component
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: '1px solid #cbd5e1'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748b' }} />
            Draft
          </span>
        );
      case 'Menunggu Review Branch Manager':
      case 'Menunggu Review Sales Manager':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#fffbeb',
            color: '#b45309',
            border: '1px solid #fde68a'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d97706' }} />
            Menunggu BM
          </span>
        );
      case 'Review Regional BD Sr. Mgr':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#eef2ff',
            color: '#4338ca',
            border: '1px solid #c7d2fe'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
            Review RSM
          </span>
        );
      case 'Review Finance':
      case 'Review Credit Control':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#faf5ff',
            color: '#7e22ce',
            border: '1px solid #e9d5ff'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7' }} />
            Review Finance
          </span>
        );
      case 'Butuh Revisi':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#fff1f2',
            color: '#be123c',
            border: '1px solid #fecdd3'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#e11d48' }} />
            Butuh Revisi
          </span>
        );
      case 'Disetujui':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#ecfdf5',
            color: '#047857',
            border: '1px solid #a7f3d0'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            Disetujui
          </span>
        );
      case 'Ditolak':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700,
            backgroundColor: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            Ditolak
          </span>
        );
      default:
        return <span className="status-badge badge-draft">{status}</span>;
    }
  };

  return (
    <div style={{ width: '100%', padding: '1.5rem 2rem 3rem' }}>
      {/* 1. Header Navigation & Page Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 0.9rem' }}
          >
            <ArrowLeft size={16} /> Kembali
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b', letterSpacing: '-0.02em', margin: 0 }}>
                Daftar Pengajuan FPDB
              </h1>
              <span style={{
                backgroundColor: '#09090b',
                color: '#ffffff',
                padding: '0.15rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {submissions.length} Dokumen
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0 0' }}>
              Database dan monitoring status pengajuan dealer baru serta perubahan data PT Modena Centro Indonesia.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem' }}
          >
            <Download size={15} /> Cetak / PDF
          </button>
          <button
            type="button"
            onClick={onStartNewDealer}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.825rem',
              backgroundColor: '#09090b',
              padding: '0.6rem 1.1rem'
            }}
          >
            <PlusCircle size={16} /> Buat FPDB Baru
          </button>
        </div>
      </div>

      {/* 2. Key KPI Metric Cards Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Seluruh Pengajuan</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#09090b', marginTop: '0.2rem' }}>
              {counts.all}
            </div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={20} color="#0f172a" />
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #fef3c7',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>Menunggu Approval (BM/RSM/Fin)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#b45309', marginTop: '0.2rem' }}>
              {counts.bm + counts.rsm + counts.finance}
            </div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} color="#d97706" />
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #fecdd3',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#be123c', fontWeight: 600 }}>Perlu Tindakan Revisi</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#be123c', marginTop: '0.2rem' }}>
              {counts.revision}
            </div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={20} color="#e11d48" />
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #bbf7d0',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>Disetujui & Siap SAP</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#047857', marginTop: '0.2rem' }}>
              {counts.approved}
            </div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} color="#10b981" />
          </div>
        </div>
      </div>

      {/* 3. Main Data Table Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Top Status Tabs */}
        <div style={{
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          padding: '0.5rem 1.25rem 0',
          display: 'flex',
          gap: '0.35rem',
          overflowX: 'auto',
          alignItems: 'center'
        }}>
          {[
            { key: 'ALL', label: 'Semua Status', count: counts.all },
            { key: 'BM', label: 'Menunggu BM', count: counts.bm },
            { key: 'RSM', label: 'Review RSM', count: counts.rsm },
            { key: 'FINANCE', label: 'Review Finance', count: counts.finance },
            { key: 'REVISION', label: 'Perlu Revisi', count: counts.revision, highlight: counts.revision > 0 },
            { key: 'APPROVED', label: 'Disetujui', count: counts.approved },
            { key: 'DRAFT', label: 'Draft', count: counts.draft },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as FilterTab)}
                style={{
                  padding: '0.65rem 0.95rem',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#09090b' : '#64748b',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2.5px solid #09090b' : '2.5px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  backgroundColor: isActive
                    ? '#09090b'
                    : tab.highlight
                    ? '#ffe4e6'
                    : '#f1f5f9',
                  color: isActive
                    ? '#ffffff'
                    : tab.highlight
                    ? '#be123c'
                    : '#475569'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row */}
        <div style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.85rem'
        }}>
          {/* Left: Search Bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px', maxWidth: '420px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari No. Tiket, nama toko, kota, salesman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem 0.55rem 2.35rem',
                fontSize: '0.825rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Right: Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Type Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.785rem', color: '#64748b', fontWeight: 600 }}>Tipe:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="ALL">Semua Jenis Pengajuan</option>
                <option value="NEW_DEALER">Dealer Baru</option>
                <option value="EDIT_DEALER">Perubahan Data</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowUpDown size={14} color="#64748b" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="NEWEST">Terbaru Diajukan</option>
                <option value="OLDEST">Terlama Diajukan</option>
                <option value="HIGHEST_LIMIT">Plafon Tertinggi</option>
                <option value="LOWEST_LIMIT">Plafon Terendah</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Table Layout */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                color: '#475569',
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                <th style={{ padding: '0.9rem 1.25rem' }}>No. Tiket FPDB</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Profil Toko & Lokasi</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Salesman Pengaju</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Plafon & Pembayaran</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Status Approval</th>
                <th style={{ padding: '0.9rem 1.25rem' }}>Waktu Pengajuan</th>
                <th style={{ padding: '0.9rem 1.25rem', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                    <div style={{ maxWidth: '380px', margin: '0 auto', color: '#64748b' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                      }}>
                        <FileText size={28} color="#94a3b8" />
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem' }}>
                        Tidak Ada Pengajuan Ditemukan
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem' }}>
                        Tidak ada berkas FPDB yang sesuai dengan kata kunci pencarian atau filter status yang dipilih.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('ALL');
                          setSearchQuery('');
                          setTypeFilter('ALL');
                        }}
                        className="btn-secondary"
                        style={{ fontSize: '0.775rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <RefreshCw size={13} /> Reset Semua Filter
                      </button>
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
                  const colorScheme = getInitialsBg(sub.storeProfile.name);

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
                      {/* Column 1: Tiket & Tipe */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            color: '#09090b',
                            fontSize: '0.85rem'
                          }}>
                            {sub.id}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyTicket(sub.id, e)}
                            title="Salin Nomor Tiket"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: '2px',
                              cursor: 'pointer',
                              color: copiedTicketId === sub.id ? '#10b981' : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            {copiedTicketId === sub.id ? <Check size={13} /> : <Copy size={13} />}
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '0.675rem',
                            fontWeight: 700,
                            padding: '0.12rem 0.45rem',
                            borderRadius: '4px',
                            backgroundColor: sub.submissionType === 'NEW_DEALER' ? '#eff6ff' : '#ecfdf5',
                            color: sub.submissionType === 'NEW_DEALER' ? '#1d4ed8' : '#047857',
                            border: `1px solid ${sub.submissionType === 'NEW_DEALER' ? '#bfdbfe' : '#a7f3d0'}`
                          }}>
                            {sub.submissionType === 'NEW_DEALER' ? 'Dealer Baru' : 'Perubahan Data'}
                          </span>

                          {sub.targetDealerCode && (
                            <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                              SAP #{sub.targetDealerCode}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 2: Toko & Lokasi */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            backgroundColor: colorScheme.bg,
                            color: colorScheme.text,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.775rem',
                            flexShrink: 0
                          }}>
                            {initials}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#09090b', fontSize: '0.875rem' }}>
                              {sub.storeProfile.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
                              <MapPin size={12} color="#94a3b8" />
                              <span>{sub.storeProfile.city}, {sub.storeProfile.province}</span>
                            </div>
                            {sub.ownerProfile?.fullName && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>
                                <User size={11} color="#94a3b8" />
                                <span>Owner: {sub.ownerProfile.fullName}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Column 3: Salesman */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>
                          {sub.salesman.name}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '0.15rem' }}>
                          {sub.salesman.branch || sub.salesman.region}
                        </div>
                      </td>

                      {/* Column 4: Plafon & TOP */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ fontWeight: 800, color: '#09090b', fontSize: '0.9rem' }}>
                          {formatRupiah(sub.financialRequest.requestedLimit)}
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', marginTop: '0.2rem' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '0.1rem 0.4rem',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '4px',
                            color: '#475569',
                            fontWeight: 600
                          }}>
                            TOP: {sub.financialRequest.paymentTerm}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Status */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        {renderStatusBadge(sub.status)}
                      </td>

                      {/* Column 6: Tanggal */}
                      <td style={{ padding: '1rem 1.25rem', color: '#475569', fontSize: '0.785rem' }}>
                        <div style={{ fontWeight: 500 }}>{sub.createdAt}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                          Update: {sub.updatedAt || sub.createdAt}
                        </div>
                      </td>

                      {/* Column 7: Aksi */}
                      <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'center' }}>
                          <button
                            type="button"
                            onClick={() => onViewSubmission(sub)}
                            className="btn-secondary"
                            style={{
                              padding: '0.45rem 0.8rem',
                              fontSize: '0.775rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontWeight: 600,
                              borderRadius: '6px'
                            }}
                            title="Buka Lembar Detail Formulir FPDB"
                          >
                            <Eye size={14} />
                            <span>Detail</span>
                          </button>

                          {isRevision && (
                            <button
                              type="button"
                              onClick={() => onStartRevision(sub)}
                              className="btn-primary"
                              style={{
                                padding: '0.45rem 0.8rem',
                                fontSize: '0.775rem',
                                backgroundColor: '#be123c',
                                borderColor: '#9f1239',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontWeight: 600,
                                borderRadius: '6px'
                              }}
                              title="Buka Formulir untuk Memperbaiki Catatan Revisi"
                            >
                              <Edit3 size={14} />
                              <span>Revisi</span>
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

        {/* Table Bottom Footer Summary */}
        <div style={{
          padding: '0.9rem 1.5rem',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.785rem',
          color: '#64748b'
        }}>
          <div>
            Menampilkan <strong>{filteredSubmissions.length}</strong> dari <strong>{submissions.length}</strong> total pengajuan FPDB
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>PT Modena Centro Indonesia</span>
            <span>•</span>
            <span>Credit Risk & Sales Governance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
