import React, { useState, useMemo } from 'react';
import type { Dealer } from '../types/fpdb';
import { 
  Search, ArrowLeft, ArrowRight, 
  CreditCard, Clock, MapPin, ShieldCheck, Check
} from 'lucide-react';

interface DealersPageProps {
  dealers: Dealer[];
  onSelectDealer: (dealer: Dealer) => void;
  onBack: () => void;
}

export const DealersPage: React.FC<DealersPageProps> = ({
  dealers,
  onSelectDealer,
  onBack,
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
            backgroundColor: '#f4f4f5',
            color: '#09090b',
            border: '1px solid #d4d4d8',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}>
            DATABASE EXISTING ({dealers.length} TOKO)
          </span>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090b', margin: '0.25rem 0 0', letterSpacing: '-0.02em' }}>
            Pilih Dealer dari Database Master (SAP & ACCPAC)
          </h1>
        </div>
      </div>

      {/* Main Content Box */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        marginBottom: '1.5rem'
      }}>
        {/* Search & Filter Toolbar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #f4f4f5',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: '#ffffff'
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <Search size={16} color="#71717a" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama toko, kode SAP / ACCPAC (cth: 1008291), kota, atau pemilik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
              autoFocus
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#71717a' }}>Bentuk Usaha:</span>
            {['ALL', 'PT', 'CV', 'UD', 'Perorangan'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid',
                  cursor: 'pointer',
                  backgroundColor: selectedType === type ? '#09090b' : '#ffffff',
                  color: selectedType === type ? '#ffffff' : '#52525b',
                  borderColor: selectedType === type ? '#09090b' : '#d4d4d8',
                  transition: 'all 0.15s ease'
                }}
              >
                {type === 'ALL' ? 'Semua' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Dealers List */}
        <div style={{ padding: '1.5rem' }}>
          {filteredDealers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#71717a' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.35rem' }}>Dealer tidak ditemukan</p>
              <p style={{ fontSize: '0.8rem' }}>Coba kata kunci pencarian lain atau pilih opsi 'Semua'.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {filteredDealers.map((dealer) => {
                const isSelected = selectedDealerId === dealer.id;
                return (
                  <div
                    key={dealer.id}
                    onClick={() => setSelectedDealerId(dealer.id)}
                    style={{
                      border: isSelected ? '2px solid #09090b' : '1px solid #e4e4e7',
                      backgroundColor: isSelected ? '#fafafa' : '#ffffff',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1.25rem'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                        <span style={{
                          backgroundColor: '#09090b',
                          color: '#ffffff',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          SAP & ACCPAC #{dealer.code}
                        </span>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                          {dealer.name}
                        </h3>
                        <span style={{
                          fontSize: '0.725rem',
                          backgroundColor: '#f4f4f5',
                          color: '#3f3f46',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                          fontWeight: 600,
                          border: '1px solid #e4e4e7'
                        }}>
                          {dealer.businessType}
                        </span>
                        <span style={{
                          fontSize: '0.725rem',
                          backgroundColor: '#ecfdf5',
                          color: '#047857',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          border: '1px solid #a7f3d0'
                        }}>
                          <ShieldCheck size={12} /> {dealer.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.825rem', color: '#52525b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
                        <MapPin size={14} color="#71717a" />
                        <span>{dealer.address}, {dealer.city}, {dealer.province}</span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', color: '#27272a', borderTop: '1px dashed #e4e4e7', paddingTop: '0.65rem' }}>
                        <div>
                          <span style={{ color: '#71717a' }}>Pemilik / PIC: </span>
                          <strong>{dealer.ownerName}</strong> ({dealer.ownerPhone})
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <CreditCard size={14} color="#09090b" />
                          <span style={{ color: '#71717a' }}>Plafon Limit Aktif: </span>
                          <strong>{formatRupiah(dealer.creditLimit)}</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Clock size={14} color="#d97706" />
                          <span style={{ color: '#71717a' }}>TOP: </span>
                          <strong>{dealer.paymentTerm}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', flexShrink: 0 }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid #09090b' : '2px solid #d4d4d8',
                        backgroundColor: isSelected ? '#09090b' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDealer(dealer);
                        }}
                        className="btn-primary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', borderRadius: '6px' }}
                      >
                        <span>Pilih Toko Ini</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid #e4e4e7',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '0.825rem', color: '#52525b' }}>
            {selectedDealer ? (
              <span>Dealer terpilih: <strong style={{ color: '#09090b' }}>{selectedDealer.name}</strong> ({selectedDealer.city})</span>
            ) : (
              <span>Pilih salah satu dealer di atas untuk membuka formulir perubahan data (FPDB Perubahan).</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" onClick={onBack} className="btn-secondary">
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
