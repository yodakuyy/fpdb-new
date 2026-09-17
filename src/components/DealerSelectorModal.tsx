import React, { useState, useMemo } from 'react';
import type { Dealer } from '../types/fpdb';
import { Search, X, Building, Check, ArrowRight, ShieldCheck, CreditCard, Clock, MapPin } from 'lucide-react';

interface DealerSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealers: Dealer[];
  onSelectDealer: (dealer: Dealer) => void;
}

export const DealerSelectorModal: React.FC<DealerSelectorModalProps> = ({
  isOpen,
  onClose,
  dealers,
  onSelectDealer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);

  const filteredDealers = useMemo(() => {
    return dealers.filter((d) => {
      const matchQuery =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.code.includes(searchQuery) ||
        d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'ALL' || d.businessType === selectedType;
      return matchQuery && matchType;
    });
  }, [dealers, searchQuery, selectedType]);

  const selectedDealer = useMemo(() => {
    return dealers.find((d) => d.id === selectedDealerId);
  }, [dealers, selectedDealerId]);

  if (!isOpen) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
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
        maxWidth: '860px',
        maxHeight: '90vh',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #cbd5e1'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #27272a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          color: '#ffffff'
        }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Building size={20} color="#ffffff" />
              Pilih Dealer dari Database Master (SAP & ACCPAC)
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '0.2rem', marginBottom: 0 }}>
              Pilih dealer aktif yang ingin diajukan perubahannya (penyesuaian limit kredit, TOP, perbaikan alamat, atau PIC).
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.4rem',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#a1a1aa'
            }}
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama toko, kode SAP (cth: 1008291), kota, atau nama pemilik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
              autoFocus
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Bentuk Usaha:</span>
            {['ALL', 'PT', 'CV', 'UD', 'Perorangan'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid',
                  cursor: 'pointer',
                  backgroundColor: selectedType === type ? '#0f2744' : '#ffffff',
                  color: selectedType === type ? '#ffffff' : '#475569',
                  borderColor: selectedType === type ? '#0f2744' : '#cbd5e1'
                }}
              >
                {type === 'ALL' ? 'Semua' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Dealers List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {filteredDealers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.35rem' }}>Dealer tidak ditemukan</p>
              <p style={{ fontSize: '0.8rem' }}>Coba kata kunci pencarian lain atau pilih opsi 'Semua'.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {filteredDealers.map((dealer) => {
                const isSelected = selectedDealerId === dealer.id;
                return (
                  <div
                    key={dealer.id}
                    onClick={() => setSelectedDealerId(dealer.id)}
                    style={{
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{
                          backgroundColor: '#0f2744',
                          color: '#ffffff',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px'
                        }}>
                          SAP #{dealer.code}
                        </span>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                          {dealer.name}
                        </h3>
                        <span style={{
                          fontSize: '0.7rem',
                          backgroundColor: '#e2e8f0',
                          color: '#334155',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          {dealer.businessType}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          backgroundColor: '#ecfdf5',
                          color: '#059669',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem'
                        }}>
                          <ShieldCheck size={12} /> {dealer.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                        <MapPin size={13} color="#64748b" />
                        <span>{dealer.address}, {dealer.city}, {dealer.province}</span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.785rem', color: '#334155', marginTop: '0.5rem', borderTop: '1px dashed #cbd5e1', paddingTop: '0.5rem' }}>
                        <div>
                          <span style={{ color: '#64748b' }}>Pemilik / PIC: </span>
                          <strong>{dealer.ownerName}</strong> ({dealer.ownerPhone})
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <CreditCard size={13} color="#2563eb" />
                          <span style={{ color: '#64748b' }}>Limit Aktif: </span>
                          <strong style={{ color: '#1e40af' }}>{formatRupiah(dealer.creditLimit)}</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Clock size={13} color="#d97706" />
                          <span style={{ color: '#64748b' }}>TOP: </span>
                          <strong>{dealer.paymentTerm}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '0.25rem' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid #2563eb' : '2px solid #cbd5e1',
                        backgroundColor: isSelected ? '#2563eb' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
          <div style={{ fontSize: '0.825rem', color: '#475569' }}>
            {selectedDealer ? (
              <span>Dealer terpilih: <strong style={{ color: '#0f172a' }}>{selectedDealer.name}</strong> ({selectedDealer.city})</span>
            ) : (
              <span>Silakan pilih salah satu dealer untuk melanjutkan formulir perubahan data.</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Batal
            </button>
            <button
              type="button"
              disabled={!selectedDealer}
              onClick={() => {
                if (selectedDealer) {
                  onSelectDealer(selectedDealer);
                }
              }}
              className="btn-primary"
              style={{
                opacity: selectedDealer ? 1 : 0.5,
                cursor: selectedDealer ? 'pointer' : 'not-allowed'
              }}
            >
              <span>Lanjutkan ke Formulir FPDB</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
