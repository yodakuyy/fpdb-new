import React, { useState } from 'react';
import type { CustomerChannel } from '../types/fpdb';
import { mockApprovalMatrices } from '../data/mockUsersAndMatrix';
import { 
  ArrowLeft, Shield, Sliders, CheckCircle2, 
  Layers, Check, HelpCircle,
  Building, Briefcase, Zap, Store
} from 'lucide-react';

interface ApprovalMatrixPageProps {
  onBack: () => void;
  onNavigateToUsers?: () => void;
}

export const ApprovalMatrixPage: React.FC<ApprovalMatrixPageProps> = ({
  onBack,
  onNavigateToUsers,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<CustomerChannel>('BRANCH');
  
  // Simulation Calculator State
  const [simChannel, setSimChannel] = useState<CustomerChannel>('BRANCH');
  const [simLimit, setSimLimit] = useState<number>(250000000);

  const activeMatrix = mockApprovalMatrices.find((m) => m.channelCode === selectedChannel) || mockApprovalMatrices[0];

  // Simulation Logic
  const simMatrix = mockApprovalMatrices.find((m) => m.channelCode === simChannel) || mockApprovalMatrices[0];
  const matchedTier = simMatrix.tiers.find((tier) => simLimit <= tier.maxLimit && simLimit >= tier.minLimit) || simMatrix.tiers[simMatrix.tiers.length - 1];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getChannelIcon = (code: CustomerChannel) => {
    switch (code) {
      case 'BRANCH': return Building;
      case 'MODERN_MARKET_KAM': return Store;
      case 'PROFESSIONAL_APPLIANCE': return Briefcase;
      case 'DISTRIBUTOR': return Layers;
      case 'SOLAR_PUSAT': return Zap;
      case 'FURNITURE_MDS': return Store;
      case 'PROJECT': return Building;
      default: return Shield;
    }
  };

  return (
    <div style={{ width: '100%', padding: '1.5rem 2rem 3rem' }}>
      {/* Header & Back Button */}
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
            backgroundColor: '#f4f4f5',
            color: '#09090b',
            border: '1px solid #d4d4d8',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}>
            POINT 4 SOP PENDAFTARAN DEALER / DISTRIBUTOR
          </span>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090b', margin: '0.25rem 0 0', letterSpacing: '-0.02em' }}>
            Matriks Kewenangan Approval Kredit Limit (FPDB)
          </h1>
        </div>
      </div>

      {/* Corporate Notice / Explanation Banner */}
      <div style={{
        backgroundColor: '#fafafa',
        border: '1px solid #e4e4e7',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: '#09090b',
          color: '#ffffff',
          padding: '0.65rem',
          borderRadius: '8px',
          flexShrink: 0
        }}>
          <Shield size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
              Mengapa Matriks Approval Ini Krusial dalam Sistem FPDB?
            </h3>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
            Setiap pengajuan FPDB memiliki penanganan yang <strong>berbeda tergantung Tipe Customer / Channel</strong> (Branch, KAM, Pro Appliance, Distributor, Solar, Furniture, Project) serta <strong>Nominal Plafon Limit Kredit</strong> yang diajukan. Sistem secara otomatis memetakan siapa saja pejabat (Senior Manager, Vice President, EVP, hingga COO/Direktur Utama) yang wajib menandatangani berkas persetujuan.
          </p>
        </div>
      </div>

      {/* Interactive Simulator / Kalkulator Approval Rantai */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #09090b',
        borderRadius: '12px',
        padding: '1.5rem 1.75rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} color="#09090b" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
              Simulasi Dinamis: Uji Rantai Approval Otomatis
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#71717a', backgroundColor: '#f4f4f5', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            Kalkulator Alur Persetujuan Real-Time
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          {/* Controls */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                1. Pilih Tipe Customer / Channel:
              </label>
              <select
                value={simChannel}
                onChange={(e) => setSimChannel(e.target.value as CustomerChannel)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid #d4d4d8',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: '#ffffff'
                }}
              >
                {mockApprovalMatrices.map((m) => (
                  <option key={m.channelCode} value={m.channelCode}>
                    {m.letterCode.toUpperCase()}. {m.channelName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#09090b' }}>
                  2. Geser Plafon Limit Kredit yang Diajukan:
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.95rem', color: '#09090b' }}>
                  {formatRupiah(simLimit)}
                </span>
              </div>
              <input
                type="range"
                min={25000000}
                max={1000000000}
                step={25000000}
                value={simLimit}
                onChange={(e) => setSimLimit(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#09090b', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#71717a', marginTop: '0.25rem' }}>
                <span>Rp 25 Juta</span>
                <span>Rp 350 Juta</span>
                <span>Rp 600 Juta</span>
                <span>Rp 1 Miliar+</span>
              </div>
            </div>
          </div>

          {/* Simulation Result Display */}
          <div style={{
            backgroundColor: '#fafafa',
            border: '1px solid #e4e4e7',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Hasil Evaluasi Berdasarkan SOP FPDB:
            </div>
            
            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: '#52525b' }}>Kategori Limit:</span>
              <span style={{
                backgroundColor: '#09090b',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '4px'
              }}>
                {matchedTier.limitLabel}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#52525b' }}>• Dibuat Oleh: <strong>{matchedTier.creatorRole}</strong></span>
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.5rem' }}>
              Rantai Pejabat Penyetuju ({matchedTier.approvers.length} Tingkat Otoritas):
            </div>

            <div style={{ display: 'grid', gap: '0.45rem' }}>
              {matchedTier.approvers.map((approver, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem'
                  }}
                >
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#09090b',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontWeight: 700, color: '#09090b', flex: 1 }}>{approver}</span>
                  <CheckCircle2 size={16} color="#059669" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for 7 Channels from Image 1 & Image 2 */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
            Tabel Matriks SOP Resmi (7 Kategori Customer)
          </h2>
          {onNavigateToUsers && (
            <button
              type="button"
              onClick={onNavigateToUsers}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              Lihat Daftar Pejabat & User
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {mockApprovalMatrices.map((m) => {
            const Icon = getChannelIcon(m.channelCode);
            const isCurrent = selectedChannel === m.channelCode;
            return (
              <button
                key={m.channelCode}
                type="button"
                onClick={() => setSelectedChannel(m.channelCode)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 0.95rem',
                  borderRadius: '8px',
                  border: isCurrent ? '2px solid #09090b' : '1px solid #e4e4e7',
                  backgroundColor: isCurrent ? '#09090b' : '#ffffff',
                  color: isCurrent ? '#ffffff' : '#3f3f46',
                  fontWeight: isCurrent ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={15} />
                <span>{m.letterCode}. {m.channelName.replace('Kredit Limit Dealer di ', '').replace('Kredit Limit untuk Dealer di ', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Official Corporate SOP Table */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        {/* Table Title Bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #e4e4e7',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '0.85rem',
                backgroundColor: '#09090b',
                color: '#ffffff',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px'
              }}>
                Pasal 4.{activeMatrix.letterCode}
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                {activeMatrix.channelName}
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>
              {activeMatrix.description} • Dibuat Oleh: <strong>{activeMatrix.creatorTitle}</strong>
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #d4d4d8',
            borderRadius: '6px',
            padding: '0.4rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#09090b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <span>Status:</span>
            <span style={{ backgroundColor: '#ecfdf5', padding: '0.1rem 0.45rem', borderRadius: '3px', color: '#047857' }}>
              FPDB Standard
            </span>
          </div>
        </div>

        {/* The Matrix Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f5', borderBottom: '2px solid #e4e4e7' }}>
                <th style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: '#09090b', width: '25%' }}>
                  Limit Kewenangan
                </th>
                <th style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: '#09090b', width: '20%' }}>
                  Dibuat Oleh
                </th>
                <th style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontWeight: 700, color: '#09090b', width: '55%' }}>
                  Disetujui Oleh (Rantai Otoritas Approval)
                </th>
              </tr>
            </thead>
            <tbody>
              {activeMatrix.tiers.map((tier, idx) => (
                <tr
                  key={tier.id}
                  style={{
                    borderBottom: '1px solid #e4e4e7',
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                  }}
                >
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: '#09090b' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                      {tier.limitLabel}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: '#52525b', fontWeight: 600 }}>
                    {tier.creatorRole}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                      {tier.approvers.map((approver, aIdx) => (
                        <span
                          key={aIdx}
                          style={{
                            backgroundColor: '#ffffff',
                            color: '#09090b',
                            border: '1px solid #d4d4d8',
                            borderRadius: '6px',
                            padding: '0.3rem 0.65rem',
                            fontSize: '0.785rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                          }}
                        >
                          <Check size={14} color="#059669" strokeWidth={3} />
                          <span>{approver}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div style={{ padding: '0.9rem 1.5rem', backgroundColor: '#fafafa', borderTop: '1px solid #e4e4e7', fontSize: '0.75rem', color: '#71717a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={15} />
          <span>Setiap jenjang approver wajib menyelesaikan verifikasi dalam rentang waktu SLA (maksimum 24 jam per level).</span>
        </div>
      </div>
    </div>
  );
};
