import React, { useState } from 'react';
import type { Dealer, FPDBSubmission, DocumentAttachment, BusinessType, PaymentTerm, StoreCategory } from '../types/fpdb';
import { standardDocumentChecklist } from '../data/mockDealers';
import { mockApprovalMatrices } from '../data/mockUsersAndMatrix';
import { StepDataDealer } from './form/StepDataDealer';
import { StepDokumenLampiran } from './form/StepDokumenLampiran';
import { StepTokoDistributor } from './form/StepTokoDistributor';
import { StepAnalisa } from './form/StepAnalisa';
import { StepPersetujuan } from './form/StepPersetujuan';
import { RupiahInput } from './common/RupiahInput';
import { 
  ArrowLeft, CheckCircle2, 
  Building2, User, CreditCard, Paperclip, ChevronRight,
  TrendingUp, Shield
} from 'lucide-react';

interface FPDBFormProps {
  mode: 'NEW' | 'EDIT';
  existingDealer?: Dealer | null;
  onBack: () => void;
  onSubmit: (submission: FPDBSubmission) => void;
  salesman: {
    name: string;
    nik: string;
    role: string;
    region: string;
    branch: string;
  };
}

export const FPDBForm: React.FC<FPDBFormProps> = ({
  mode,
  existingDealer,
  onBack,
  onSubmit,
  salesman,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Top Header Metadata State (.:: FORMULIR PENGAJUAN DATABASE DEALER ::.)
  const [nomorFpdb] = useState(
    mode === 'EDIT' 
      ? (existingDealer?.code ? `26.${existingDealer.code.slice(-5)}` : '26.00140') 
      : '26.00150'
  );
  const [headerKategoriDealer, setHeaderKategoriDealer] = useState('-. TRADISIONAL');
  const [headerCabang, setHeaderCabang] = useState(
    mode === 'EDIT' 
      ? '-. SURABAYA' 
      : (salesman.branch?.toLowerCase().includes('surabaya') ? '-. SURABAYA' :
         salesman.branch?.toLowerCase().includes('bandung') ? '-. BANDUNG' :
         '-. PUSAT')
  );
  const [salesPersonName, setSalesPersonName] = useState(
    mode === 'EDIT' 
      ? (existingDealer?.assignedSalesman ? existingDealer.assignedSalesman.toUpperCase() : 'IRWAN WIDJAYA TJANDRA') 
      : (salesman?.name ? salesman.name.toUpperCase() : 'YOGI DANIS FERMANA')
  );
  const [salesPersonNik, setSalesPersonNik] = useState(
    mode === 'EDIT' ? '11744' : (salesman?.nik ? salesman.nik.replace(/\D/g, '') || '11744' : '11744')
  );
  const [showSalesPicker, setShowSalesPicker] = useState(false);

  // Step 1 State: Profil Toko
  const [storeName, setStoreName] = useState(existingDealer?.name || '');
  const [businessType, setBusinessType] = useState<BusinessType>(existingDealer?.businessType || 'PT');
  const [category, setCategory] = useState<StoreCategory>(existingDealer?.category || 'Toko Elektronik / Home Appliances');
  const [address, setAddress] = useState(existingDealer?.address || '');
  const [city, setCity] = useState(existingDealer?.city || 'Kota Bandung');
  const [province, setProvince] = useState(existingDealer?.province || 'Jawa Barat');
  const [postalCode, setPostalCode] = useState(existingDealer?.postalCode || '');
  const [phone, setPhone] = useState(existingDealer?.phone || '');
  const [email, setEmail] = useState(existingDealer?.email || '');
  const [operatingYears, setOperatingYears] = useState(existingDealer?.operatingYears || 5);
  const [shopAreaM2, setShopAreaM2] = useState(150);
  const [ownershipStatus, setOwnershipStatus] = useState<'Milik Sendiri' | 'Sewa / Kontrak'>('Milik Sendiri');

  // Step 2 State: Data Pemilik
  const [ownerName] = useState(existingDealer?.ownerName || '');
  const [ownerNik] = useState(existingDealer?.ownerNik || '');
  const [ownerPhone] = useState(existingDealer?.ownerPhone || '');
  const [ownerWa] = useState(existingDealer?.ownerPhone || '');
  const [ownerNpwp] = useState(existingDealer?.ownerNpwp || '');
  const [ownerAddress] = useState(existingDealer?.ownerAddress || '');
  const [emergencyContactName] = useState('Hartati (Istri / Keluarga)');
  const [emergencyContactPhone] = useState('081234567890');
  const [emergencyRelation] = useState('Pasangan Suami/Istri');

  // Step 3 State: Finansial
  const [requestedLimit, setRequestedLimit] = useState<number>(
    mode === 'EDIT' && existingDealer ? existingDealer.creditLimit + 50000000 : 100000000
  );
  const [paymentTerm, setPaymentTerm] = useState<PaymentTerm>(
    existingDealer?.paymentTerm || '30 Hari'
  );
  const [monthlyPurchase, setMonthlyPurchase] = useState<number>(
    existingDealer?.monthlySalesAvg || 80000000
  );
  const [bankName, setBankName] = useState('BCA');
  const [bankAccountNumber, setBankAccountNumber] = useState('139-09281-01');
  const [bankAccountHolder, setBankAccountHolder] = useState(existingDealer?.name || 'Rekening Operasional Toko');
  const [justificationNote, setJustificationNote] = useState(
    mode === 'EDIT'
      ? 'Permohonan kenaikan limit kredit dan evaluasi TOP seiring kenaikan target penjualan kuartal ini.'
      : 'Pengajuan kemitraan dealer baru untuk memperluas jangkauan distribusi di area target.'
  );

  // Step 4 State: Dokumen Checklist
  const [attachments] = useState<DocumentAttachment[]>(() => {
    return standardDocumentChecklist.map((item, idx) => {
      // In edit mode, some documents are pre-existing
      if (mode === 'EDIT' && idx < 4) {
        return {
          ...item,
          isUploaded: true,
          fileName: `${item.name.split(' ')[0]}_${existingDealer?.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          fileSize: '1.4 MB',
          uploadedAt: '2026-09-10 09:00',
        };
      }
      return item;
    });
  });

  const [declarationAgreed, setDeclarationAgreed] = useState(true);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleFinalSubmit = (status: 'Draft' | 'Menunggu Review Branch Manager' | 'Menunggu Review Sales Manager') => {
    const newSubmission: FPDBSubmission = {
      id: `FPDB-2026-09-${Math.floor(1000 + Math.random() * 9000)}`,
      submissionType: mode === 'NEW' ? 'NEW_DEALER' : 'EDIT_DEALER',
      dealerId: existingDealer?.id,
      targetDealerCode: existingDealer?.code,
      changeSummary: mode === 'EDIT' ? ['Limit Kredit Plafon', 'Term of Payment (TOP)', 'Data Profil Toko'] : undefined,
      status: status,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      salesman: salesman,
      storeProfile: {
        name: storeName,
        businessType,
        category,
        address,
        city,
        province,
        postalCode,
        phone,
        email,
        operatingYears,
        shopAreaM2,
        ownershipStatus,
      },
      ownerProfile: {
        fullName: ownerName,
        nik: ownerNik,
        phone: ownerPhone,
        waNumber: ownerWa,
        npwp: ownerNpwp,
        homeAddress: ownerAddress,
        emergencyContactName,
        emergencyContactPhone,
        emergencyRelation,
      },
      financialRequest: {
        requestedLimit,
        existingLimit: existingDealer?.creditLimit,
        paymentTerm,
        existingPaymentTerm: existingDealer?.paymentTerm,
        estimatedMonthlyPurchase: monthlyPurchase,
        bankName,
        bankAccountNumber,
        bankAccountHolder,
        justificationNote,
      },
      attachments,
      approvalLogs: [
        {
          stage: 'Pengajuan FPDB (Sales)',
          actor: salesman.name,
          role: salesman.role,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          status: status === 'Draft' ? 'IN_PROGRESS' : 'SUBMITTED',
          comment: status === 'Draft' ? 'Disimpan sebagai draf oleh Salesman.' : 'Dokumen FPDB disubmit ke Branch Manager untuk review dan persetujuan.',
        },
      ],
    };

    onSubmit(newSubmission);
  };

  const steps = [
    { num: 1, label: 'DATA DEALER', icon: Building2 },
    { num: 2, label: 'DOKUMEN LAMPIRAN', icon: Paperclip },
    { num: 3, label: 'TOKO/DISTRIBUTOR', icon: Building2 },
    { num: 4, label: 'ANALISA', icon: TrendingUp },
    { num: 5, label: 'PERSETUJUAN', icon: CheckCircle2 },
  ];

  return (
    <div style={{ width: '100%', padding: '1.5rem 2rem 3rem' }}>
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={15} /> Kembali ke Dashboard
        </button>

        <div>
          <span style={{
            backgroundColor: mode === 'NEW' ? '#eff6ff' : '#fef3c7',
            color: mode === 'NEW' ? '#1d4ed8' : '#92400e',
            border: `1px solid ${mode === 'NEW' ? '#bfdbfe' : '#fde68a'}`,
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            fontSize: '0.725rem',
            fontWeight: 700,
          }}>
            {mode === 'NEW' ? 'MODE: PENGAJUAN DEALER BARU' : `MODE: PERUBAHAN DATA DEALER (SAP: ${existingDealer?.code})`}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL FORM HEADER :: .:: FORMULIR PENGAJUAN DATABASE DEALER ::.        */}
      {/* ========================================================================= */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #d4d4d8',
        borderRadius: '6px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.25rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        {/* Title Header */}
        <div style={{ textAlign: 'center', margin: '0.25rem 0 1.15rem' }}>
          <h2 style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#000000',
            letterSpacing: '0.02em',
            margin: 0
          }}>
            .:: FORMULIR PENGAJUAN DATABASE DEALER ::.
          </h2>
        </div>

        {/* Master Details Table */}
        <div style={{ borderTop: '1px dotted #a1a1aa' }}>
          {/* Row 1: NOMOR */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.6rem 0',
            borderBottom: '1px dotted #a1a1aa',
            fontSize: '0.825rem'
          }}>
            <div style={{ width: '200px', fontWeight: 700, color: '#09090b', flexShrink: 0 }}>
              NOMOR
            </div>
            <div style={{ fontWeight: 800, color: '#09090b', fontSize: '0.9rem' }}>
              {nomorFpdb}
            </div>
          </div>

          {/* Row Optional if EDIT: UPDATE DATA SAP */}
          {mode === 'EDIT' && existingDealer && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '0.6rem 0',
              borderBottom: '1px dotted #a1a1aa',
              fontSize: '0.825rem'
            }}>
              <div style={{ width: '200px', fontWeight: 700, color: '#09090b', flexShrink: 0 }}>
                UPDATE DATA SAP
              </div>
              <div>
                <div style={{
                  backgroundColor: '#fef08a',
                  padding: '0.25rem 0.65rem',
                  display: 'inline-block',
                  fontWeight: 800,
                  fontSize: '0.825rem',
                  color: '#09090b',
                  lineHeight: 1.35
                }}>
                  <div>UPDATE CUSTOMER SAP</div>
                  <div>{existingDealer.code} - {existingDealer.name}</div>
                </div>
              </div>
            </div>
          )}

          {/* Row 2: KATEGORI DEALER */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.6rem 0',
            borderBottom: '1px dotted #a1a1aa',
            fontSize: '0.825rem'
          }}>
            <div style={{ width: '200px', fontWeight: 700, color: '#09090b', flexShrink: 0 }}>
              KATEGORI DEALER
            </div>
            <div style={{ flex: 1, maxWidth: '460px' }}>
              <select
                value={headerKategoriDealer}
                onChange={(e) => setHeaderKategoriDealer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.35rem 0.6rem',
                  backgroundColor: '#f4f4f5',
                  border: '1px solid #a1a1aa',
                  borderRadius: '3px',
                  fontSize: '0.8rem',
                  color: '#09090b'
                }}
              >
                <option value="-. TRADISIONAL">-. TRADISIONAL</option>
                <option value="-. MODERN MARKET">-. MODERN MARKET</option>
                <option value="-. PROJECT">-. PROJECT</option>
                <option value="-. DISTRIBUTOR">-. DISTRIBUTOR</option>
                <option value="-. KITCHENWARE & FURNITURE">-. KITCHENWARE & FURNITURE</option>
              </select>
            </div>
          </div>

          {/* Row 3: CABANG */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.6rem 0',
            borderBottom: '1px dotted #a1a1aa',
            fontSize: '0.825rem'
          }}>
            <div style={{ width: '200px', fontWeight: 700, color: '#09090b', flexShrink: 0 }}>
              CABANG
            </div>
            <div style={{ flex: 1, maxWidth: '460px' }}>
              <select
                value={headerCabang}
                onChange={(e) => setHeaderCabang(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.35rem 0.6rem',
                  backgroundColor: '#f4f4f5',
                  border: '1px solid #a1a1aa',
                  borderRadius: '3px',
                  fontSize: '0.8rem',
                  color: '#09090b'
                }}
              >
                <option value="-. SURABAYA">-. SURABAYA</option>
                <option value="-. PUSAT">-. PUSAT</option>
                <option value="-. BANDUNG">-. BANDUNG</option>
                <option value="-. SEMARANG">-. SEMARANG</option>
                <option value="-. MEDAN">-. MEDAN</option>
                <option value="-. MAKASSAR">-. MAKASSAR</option>
                <option value="-. BALI">-. BALI</option>
                <option value="-. YOGYAKARTA">-. YOGYAKARTA</option>
                <option value="-. PALEMBANG">-. PALEMBANG</option>
                <option value="-. PEKANBARU">-. PEKANBARU</option>
              </select>
            </div>
          </div>

          {/* Row 4: STATUS PENGAJUAN */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.6rem 0',
            borderBottom: '1px dotted #a1a1aa',
            fontSize: '0.825rem'
          }}>
            <div style={{ width: '200px', fontWeight: 700, color: '#09090b', flexShrink: 0 }}>
              STATUS PENGAJUAN
            </div>
            <div>
              {mode === 'EDIT' ? (
                <div>
                  <div style={{ fontWeight: 800, color: '#09090b' }}>
                    PENGAJUAN DATABASE DEALER DISELESAIKAN (STATUS <span style={{ color: '#15803d' }}>DISETUJUI</span>)
                  </div>
                  <div style={{ marginTop: '0.15rem' }}>
                    <a
                      href="#sync"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Sinkronisasi SAP: Database dealer telah tersinkronisasi ulang dengan master data SAP.');
                      }}
                      style={{ color: '#1d4ed8', textDecoration: 'underline', fontWeight: 700, fontSize: '0.785rem' }}
                    >
                      KLIK DISINI UNTUK SIKRONISASI ULANG DATA DEALER KE SAP
                    </a>
                  </div>
                </div>
              ) : (
                <span style={{ fontWeight: 800, color: '#09090b' }}>DRAFT</span>
              )}
            </div>
          </div>

          {/* Row 5: PEMOHON */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '0.6rem 0',
            borderBottom: '1px dotted #a1a1aa',
            fontSize: '0.825rem'
          }}>
            <div style={{ width: '200px', fontWeight: 700, color: '#09090b', flexShrink: 0 }}>
              PEMOHON
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: '#09090b', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                {salesPersonName}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowSalesPicker(!showSalesPicker)}
                  style={{
                    padding: '0.2rem 0.6rem',
                    backgroundColor: '#e4e4e7',
                    border: '1px solid #71717a',
                    borderRadius: '3px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#09090b'
                  }}
                >
                  Pilih Sales Person SAP
                </button>
                <span style={{ fontSize: '0.785rem', fontWeight: 700, color: '#09090b' }}>
                  KODE SALES SAP {salesPersonNik}
                </span>
              </div>

              {showSalesPicker && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.65rem',
                  backgroundColor: '#f4f4f5',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  maxWidth: '420px'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem', color: '#09090b' }}>
                    Pilih Sales Person SAP Modena:
                  </div>
                  <select
                    onChange={(e) => {
                      const [n, k] = e.target.value.split('|');
                      setSalesPersonName(n);
                      setSalesPersonNik(k);
                      setShowSalesPicker(false);
                    }}
                    defaultValue={`${salesPersonName}|${salesPersonNik}`}
                    style={{
                      width: '100%',
                      padding: '0.4rem',
                      fontSize: '0.8rem',
                      borderRadius: '4px',
                      border: '1px solid #a1a1aa'
                    }}
                  >
                    <option value="IRWAN WIDJAYA TJANDRA|11744">IRWAN WIDJAYA TJANDRA (Kode SAP: 11744 - Surabaya)</option>
                    <option value="YOGI DANIS FERMANA|10822">YOGI DANIS FERMANA (Kode SAP: 10822 - Pusat)</option>
                    <option value="RIAN PRASETYA|11402">RIAN PRASETYA (Kode SAP: 11402 - Bandung)</option>
                    <option value="DEDI KURNIAWAN|10219">DEDI KURNIAWAN (Kode SAP: 10219 - Jabar)</option>
                    <option value="BUDI SANTOSO|11388">BUDI SANTOSO (Kode SAP: 11388 - Semarang)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Row 6: TOTAL NILAI (Like Gambar 2) */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '0.6rem 0',
            borderBottom: '1px dotted #a1a1aa',
            fontSize: '0.825rem'
          }}>
            <div style={{ width: '200px', fontWeight: 700, color: '#09090b', flexShrink: 0 }}>
              TOTAL NILAI
            </div>
            <div>
              <div style={{
                backgroundColor: '#fef08a',
                padding: '0.35rem 0.75rem',
                display: 'inline-block',
                fontSize: '0.825rem',
                color: '#09090b',
                lineHeight: 1.4
              }}>
                <div style={{ fontWeight: 800 }}>55.5 (MEDIUM RISK 2)</div>
                <div style={{ fontWeight: 800 }}>
                  REKOMENDASI LIMIT KREDIT : {requestedLimit ? requestedLimit : (existingDealer?.creditLimit || 45000000)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official NAVIGASI FORM Stepper Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: '10px',
        padding: '0.85rem 1.25rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        overflowX: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 800,
          color: '#09090b',
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <span>NAVIGASI FORM</span>
          <span style={{ color: '#71717a' }}>::</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;
            return (
              <React.Fragment key={step.num}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(step.num)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '6px',
                    border: isActive ? '1px solid #09090b' : '1px solid #d4d4d8',
                    backgroundColor: isActive ? '#09090b' : isDone ? '#f4f4f5' : '#ffffff',
                    color: isActive ? '#ffffff' : isDone ? '#09090b' : '#52525b',
                    fontSize: '0.785rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.03em',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#27272a' : isDone ? '#09090b' : '#e4e4e7',
                    color: '#ffffff',
                    fontSize: '0.675rem',
                    fontWeight: 700
                  }}>
                    {isDone ? '✓' : step.num}
                  </span>
                  <span>{step.label}</span>
                </button>

                {idx < steps.length - 1 && (
                  <span style={{ color: '#a1a1aa', fontWeight: 800, fontSize: '1rem', padding: '0 0.15rem' }}>
                    »
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* FORM BODY BASED ON CURRENT STEP */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
        marginBottom: '1.5rem'
      }}>
        {/* ================= STEP 1: DATA DEALER ================= */}
        {currentStep === 1 && (
          <div>
            <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  BAGIAN 1
                </span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Data Dealer, Keadaan Toko, Pembayaran & Produk yang Dijual
                </h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>
                Lengkapi seluruh informasi identitas badan usaha, wilayah administratif (cascading otomatis), kondisi fisik toko, fasilitas pembayaran, dan 3 merek utama.
              </p>
            </div>

            <StepDataDealer
              storeName={storeName}
              setStoreName={setStoreName}
              businessType={businessType}
              setBusinessType={setBusinessType}
              category={category}
              setCategory={setCategory}
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              province={province}
              setProvince={setProvince}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              operatingYears={operatingYears}
              setOperatingYears={setOperatingYears}
              shopAreaM2={shopAreaM2}
              setShopAreaM2={setShopAreaM2}
              ownershipStatus={ownershipStatus}
              setOwnershipStatus={setOwnershipStatus}
            />
          </div>
        )}

        {/* ================= STEP 2: DOKUMEN LAMPIRAN ================= */}
        {currentStep === 2 && (
          <div>
            <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  BAGIAN 2
                </span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Dokumen Lampiran & Unggah Berkas Legalitas Dealer
                </h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>
                Lengkapi dan unggah seluruh berkas legalitas, dokumen perizinan, invoice konsumen, cap stempel, dan foto fisik toko dealer. Dilengkapi fitur preview langsung.
              </p>
            </div>

            <StepDokumenLampiran />
          </div>
        )}

        {/* ================= STEP 3: TOKO / DISTRIBUTOR ================= */}
        {currentStep === 3 && (
          <div>
            <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  BAGIAN 3
                </span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Daftar Toko Cabang / Sub-Distributor (Opsional)
                </h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>
                Daftar cabang toko atau jaringan retail sub-dealer jika calon dealer bertindak sebagai Distributor. Bersifat opsional dan boleh dikosongkan jika dealer adalah single store.
              </p>
            </div>

            <StepTokoDistributor />
          </div>
        )}

        {/* ================= STEP 4: ANALISA & PENGAJUAN LIMIT ================= */}
        {currentStep === 4 && (
          <div>
            <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  BAGIAN 4
                </span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Analisa Finansial, Plafon Kredit & Ketentuan Pembayaran (TOP)
                </h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>
                Lengkapi seluruh evaluasi referensi, data estimasi keuangan, manajemen toko, penilaian subyektif & kuantitatif (skala 1-10), serta usulan plafon kredit limit.
              </p>
            </div>

            {/* Form Analisa Resmi Sesuai 3 Screenshot */}
            <StepAnalisa salesman={salesman} />

            {/* Form Usulan Plafon Kredit & Ketentuan Pembayaran (TOP) */}
            <div style={{
              marginTop: '1.75rem',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                backgroundColor: '#d1d5db',
                color: '#09090b',
                padding: '0.65rem 1.25rem',
                fontSize: '0.825rem',
                fontWeight: 800,
                letterSpacing: '0.03em',
                borderBottom: '1px solid #9ca3af',
              }}>
                USULAN LIMIT KREDIT, TOP & MATRIKS APPROVAL OTOMATIS ::
              </div>

              <div style={{ padding: '1.5rem' }}>
            {/* Comparison for Edit Mode */}
            {mode === 'EDIT' && existingDealer && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Limit Plafon Saat Ini (Master SAP):</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#475569' }}>
                    {formatRupiah(existingDealer.creditLimit)}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>TOP: {existingDealer.paymentTerm}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>Plafon Baru yang Diajukan:</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1d4ed8' }}>
                    {formatRupiah(requestedLimit)}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                    Selisih Kenaikan: {formatRupiah(requestedLimit - existingDealer.creditLimit)}
                  </span>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Plafon Limit Kredit yang Diajukan (IDR) <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <RupiahInput
                  value={requestedLimit}
                  onChange={setRequestedLimit}
                  size="lg"
                  style={{ color: '#1d4ed8', fontWeight: 800 }}
                />
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                  Terbilang: {formatRupiah(requestedLimit)}
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Term of Payment (TOP) <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(e.target.value as PaymentTerm)}
                >
                  <option value="Cash Before Delivery">Cash Before Delivery (CBD)</option>
                  <option value="Cash On Delivery">Cash On Delivery (COD)</option>
                  <option value="14 Hari">Kredit 14 Hari Kalender</option>
                  <option value="30 Hari">Kredit 30 Hari Kalender</option>
                  <option value="45 Hari">Kredit 45 Hari Kalender</option>
                  <option value="60 Hari">Kredit 60 Hari Kalender (Khusus Approval Finance)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Estimasi Target Belanja Bulanan (IDR)
                </label>
                <RupiahInput
                  value={monthlyPurchase}
                  onChange={setMonthlyPurchase}
                  size="lg"
                />
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                  Estimasi: {formatRupiah(monthlyPurchase)} / bulan
                </span>
              </div>
            </div>

            {/* Dynamic Approval Chain Preview based on SOP Matrix */}
            {(() => {
              const branchMatrix = mockApprovalMatrices[0];
              const matchedTier = branchMatrix.tiers.find(
                (t) => requestedLimit <= t.maxLimit && requestedLimit >= t.minLimit
              ) || branchMatrix.tiers[branchMatrix.tiers.length - 1];

              return (
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <Shield size={18} color="#09090b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#09090b' }}>
                        Matriks Approval Otomatis (SOP Point 4.a):
                      </span>
                      <span style={{
                        backgroundColor: '#09090b',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.1rem 0.45rem',
                        borderRadius: '4px'
                      }}>
                        {matchedTier.limitLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.785rem', color: '#475569' }}>
                      Rantai Otoritas Penyetuju:{' '}
                      <strong style={{ color: '#09090b' }}>
                        {matchedTier.approvers.join(' → ')}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Nama Bank Rekanan Toko
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Contoh: BCA / Mandiri / BRI"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Nomor Rekening Operasional
                </label>
                <input
                  type="text"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  placeholder="Nomor rekening..."
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Atas Nama Rekening
                </label>
                <input
                  type="text"
                  value={bankAccountHolder}
                  onChange={(e) => setBankAccountHolder(e.target.value)}
                  placeholder="Nama pemilik rekening..."
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Alasan / Justifikasi Bisnis Pengajuan Limit & TOP <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <textarea
                rows={4}
                value={justificationNote}
                onChange={(e) => setJustificationNote(e.target.value)}
                placeholder="Jelaskan dasar pertimbangan: omset penjualan produk home appliances, histori pembayaran, penambahan display toko baru, dsb..."
              />
            </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: PERSETUJUAN & SUBMIT ================= */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  BAGIAN 5
                </span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Persetujuan Salesman & Analisa Dealer Layak Menjadi Rekanan
                </h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>
                Lengkapi pernyataan analisa kelayakan rekanan dealer, konfirmasi kesesuaian berkas legalitas fisik, dan persetujuan pengajuan sales.
              </p>
            </div>

            {/* Form Persetujuan Resmi Sesuai Screenshot */}
            <StepPersetujuan
              salesman={salesman}
              initialTargetPenjualan={monthlyPurchase}
              initialLamaPembayaran={parseInt(paymentTerm, 10) || 30}
              initialTargetPlafon={requestedLimit}
            />

            {/* Ringkasan Rekapitulasi Data Pengajuan */}
            <div style={{
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                backgroundColor: '#d1d5db',
                color: '#09090b',
                padding: '0.65rem 1.25rem',
                fontSize: '0.825rem',
                fontWeight: 800,
                letterSpacing: '0.03em',
                borderBottom: '1px solid #9ca3af',
              }}>
                RINGKASAN REKAPITULASI DATA PENGAJUAN DEALER ::
              </div>

              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {/* Box 1: Toko */}
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Building2 size={16} /> Identitas Toko
                </h3>
                <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.4rem' }}>
                  <div><span style={{ color: '#64748b' }}>Nama:</span> <strong>{storeName}</strong> ({businessType})</div>
                  <div><span style={{ color: '#64748b' }}>Kategori:</span> {category}</div>
                  <div><span style={{ color: '#64748b' }}>Alamat:</span> {address}, {city}, {province}</div>
                  <div><span style={{ color: '#64748b' }}>Telp:</span> {phone}</div>
                </div>
              </div>

              {/* Box 2: Pemilik */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={16} /> Data Pemilik / PIC
                </h3>
                <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.4rem' }}>
                  <div><span style={{ color: '#64748b' }}>Nama:</span> <strong>{ownerName}</strong></div>
                  <div><span style={{ color: '#64748b' }}>NIK:</span> {ownerNik || '-'}</div>
                  <div><span style={{ color: '#64748b' }}>NPWP:</span> {ownerNpwp || '-'}</div>
                  <div><span style={{ color: '#64748b' }}>Kontak HP/WA:</span> {ownerPhone}</div>
                </div>
              </div>

              {/* Box 3: Finansial */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CreditCard size={16} /> Usulan Finansial
                </h3>
                <div style={{ fontSize: '0.8rem', display: 'grid', gap: '0.4rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Plafon Limit:</span>{' '}
                    <strong style={{ color: '#1d4ed8', fontSize: '0.95rem' }}>{formatRupiah(requestedLimit)}</strong>
                  </div>
                  <div><span style={{ color: '#64748b' }}>TOP:</span> <strong>{paymentTerm}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Target Bulanan:</span> {formatRupiah(monthlyPurchase)}</div>
                  <div><span style={{ color: '#64748b' }}>Bank Operasional:</span> {bankName} ({bankAccountNumber})</div>
                </div>
              </div>
              </div>
            </div>
            </div>

            {/* Declaration Checkbox */}
            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}>
              <input
                type="checkbox"
                id="declaration"
                checked={declarationAgreed}
                onChange={(e) => setDeclarationAgreed(e.target.checked)}
                style={{ width: '18px', height: '18px', marginTop: '0.2rem', cursor: 'pointer' }}
              />
              <label htmlFor="declaration" style={{ fontSize: '0.825rem', color: '#78350f', cursor: 'pointer' }}>
                Saya menyatakan bahwa data toko, foto fisik, dan informasi finansial yang diajukan dalam formulir FPDB ini adalah benar, telah disurvei langsung di lapangan oleh Salesman, dan memenuhi standar operasional PT Modena Centro Indonesia.
              </label>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER WIZARD CONTROLS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1rem 1.5rem'
      }}>
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-secondary"
            >
              <ArrowLeft size={16} /> Sebelumnya
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => handleFinalSubmit('Draft')}
            className="btn-secondary"
            style={{ color: '#475569' }}
          >
            Simpan Sebagai Draft
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="btn-primary"
            >
              <span>Lanjut ke {steps[currentStep].label}</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              disabled={!declarationAgreed}
              onClick={() => handleFinalSubmit('Menunggu Review Branch Manager')}
              className="btn-primary"
              style={{
                opacity: declarationAgreed ? 1 : 0.6,
                cursor: declarationAgreed ? 'pointer' : 'not-allowed',
                padding: '0.75rem 1.65rem',
                fontSize: '0.9rem',
                backgroundColor: '#09090b',
                borderColor: '#000000',
                borderRadius: '8px'
              }}
            >
              <CheckCircle2 size={18} />
              <span>Submit Formulir FPDB Sekarang</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
