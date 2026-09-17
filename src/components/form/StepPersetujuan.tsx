import React, { useState } from 'react';
import { RupiahInput } from '../common/RupiahInput';
import { FileCheck, CheckCircle2, Shield } from 'lucide-react';

export interface ApproverRecord {
  id: string;
  roleKey: 'SALES' | 'BM' | 'RSM' | 'FINANCE';
  roleTitle: string;
  approverName: string;
  tanggal: string;
  keterangan: string;
  sudahMeninjauToko: 'YA' | 'TIDAK';
  mengenalBaik: 'YA' | 'TIDAK';
  targetPenjualan: number;
  rencanaLamaPembayaran: number;
  targetPlafon: number;
  diskonPersentase: string;
  persetujuan: 'YA' | 'TIDAK';
  status: 'APPROVED' | 'PENDING' | 'WAITING';
}

export interface StepPersetujuanProps {
  salesman?: {
    name: string;
    nik: string;
    role: string;
    region: string;
    branch: string;
  };
  initialTargetPenjualan?: number;
  initialLamaPembayaran?: number;
  initialTargetPlafon?: number;
}

export const StepPersetujuan: React.FC<StepPersetujuanProps> = ({
  salesman,
  initialTargetPenjualan = 100000000,
  initialLamaPembayaran = 30,
  initialTargetPlafon = 100000000,
}) => {
  const todayFormatted = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  // 1. Sales States
  const [analisaLayak1, setAnalisaLayak1] = useState(
    'Lokasi toko sangat strategis di pusat perbelanjaan elektronik kota dengan arus pengunjung dan pembeli yang stabil.'
  );
  const [analisaLayak2, setAnalisaLayak2] = useState(
    'Pemilik memiliki rekam jejak keuangan yang terpercaya, tidak pernah tercatat wanprestasi pada prinsipal brand lain.'
  );
  const [analisaLayak3, setAnalisaLayak3] = useState(
    'Toko bersedia memberikan ruang display premium untuk kategori Built-in Hob dan Refrigerator Modena.'
  );

  const [siupSesuai, setSiupSesuai] = useState('YA');
  const [tdpSesuai, setTdpSesuai] = useState('YA');
  const [npwpSesuai, setNpwpSesuai] = useState('YA');
  const [ktpSesuai, setKtpSesuai] = useState('YA');
  const [sudahMeninjauToko, setSudahMeninjauToko] = useState('YA');
  const [mengenalBaik, setMengenalBaik] = useState('YA');

  const [targetPenjualan, setTargetPenjualan] = useState<number>(initialTargetPenjualan);
  const [rencanaLamaPembayaran, setRencanaLamaPembayaran] = useState<number>(initialLamaPembayaran);
  const [targetPlafon, setTargetPlafon] = useState<number>(initialTargetPlafon);
  const [diskonPersentase, setDiskonPersentase] = useState('3.5%');
  const [persetujuanSales, setPersetujuanSales] = useState('YA');

  // 2. Approvers Records (Matrix Approval: BM -> RSM -> Finance)
  const [approvers, setApprovers] = useState<ApproverRecord[]>([
    {
      id: 'bm',
      roleKey: 'BM',
      roleTitle: 'ANALISA BRANCH MANAGER',
      approverName: 'Budi Santoso (Branch Manager Bandung)',
      tanggal: '12 September 2026',
      keterangan: 'OK APPROVED - Layak menjadi rekanan aktif Modena cabang Bandung',
      sudahMeninjauToko: 'YA',
      mengenalBaik: 'YA',
      targetPenjualan: 80000000,
      rencanaLamaPembayaran: 30,
      targetPlafon: 50000000,
      diskonPersentase: '25%',
      persetujuan: 'YA',
      status: 'APPROVED',
    },
    {
      id: 'rsm',
      roleKey: 'RSM',
      roleTitle: 'ANALISA REGIONAL BUSINESS DEVELOPMENT SENIOR MANAGER',
      approverName: 'Darmawan Wijaya (Regional BD Sr. Manager)',
      tanggal: '15 September 2026',
      keterangan: 'OK APPROVED',
      sudahMeninjauToko: 'YA',
      mengenalBaik: 'YA',
      targetPenjualan: 50000000,
      rencanaLamaPembayaran: 30,
      targetPlafon: 25000000,
      diskonPersentase: '28%',
      persetujuan: 'YA',
      status: 'APPROVED',
    },
    {
      id: 'finance',
      roleKey: 'FINANCE',
      roleTitle: 'ANALISA FINANCE',
      approverName: 'Hendra Gunawan (Finance Manager)',
      tanggal: todayFormatted,
      keterangan: 'Rekening koran valid, plafon kredit dan TOP disetujui sesuai target penjualan.',
      sudahMeninjauToko: 'YA',
      mengenalBaik: 'YA',
      targetPenjualan: 50000000,
      rencanaLamaPembayaran: 30,
      targetPlafon: 25000000,
      diskonPersentase: '28%',
      persetujuan: 'YA',
      status: 'PENDING',
    },
  ]);

  // Active Role in View/Simulation
  const [activeRoleView, setActiveRoleView] = useState<'ALL' | 'SALES' | 'BM' | 'RSM' | 'FINANCE'>('ALL');

  // Handle live edit for specific approver in simulation
  const handleUpdateApprover = (id: string, field: keyof ApproverRecord, val: any) => {
    setApprovers(prev =>
      prev.map(app => (app.id === id ? { ...app, [field]: val } : app))
    );
  };

  const handleApproveTier = (id: string) => {
    setApprovers(prev =>
      prev.map(app =>
        app.id === id
          ? {
              ...app,
              status: 'APPROVED',
              tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
              keterangan: app.keterangan || 'OK APPROVED',
              persetujuan: 'YA',
            }
          : app
      )
    );
  };

  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: '#d1d5db',
    color: '#09090b',
    padding: '0.65rem 1.25rem',
    fontSize: '0.825rem',
    fontWeight: 800,
    letterSpacing: '0.03em',
    borderBottom: '1px solid #9ca3af',
  };

  const labelCellStyle: React.CSSProperties = {
    width: '420px',
    minWidth: '320px',
    padding: '0.75rem 1.25rem',
    fontSize: '0.8rem',
    fontWeight: 800,
    color: '#09090b',
    borderRight: '1px solid #e4e4e7',
    verticalAlign: 'middle',
    letterSpacing: '0.01em',
    backgroundColor: '#ffffff',
  };

  const inputCellStyle: React.CSSProperties = {
    padding: '0.65rem 1.25rem',
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '0.825rem',
    color: '#09090b',
    backgroundColor: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '0.825rem',
    color: '#09090b',
    backgroundColor: '#ffffff',
    outline: 'none',
    resize: 'vertical',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '0.825rem',
    color: '#09090b',
    backgroundColor: '#ffffff',
    outline: 'none',
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Role View Filter / Simulator Toolbar */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} color="#09090b" />
          <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#09090b' }}>
            Simulasi Role Pengisian Matrix Approval:
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            { key: 'ALL', label: 'Tampilkan Semua Rantai' },
            { key: 'SALES', label: '1. Salesman' },
            { key: 'BM', label: '2. Branch Manager' },
            { key: 'RSM', label: '3. Regional BD Sr. Mgr' },
            { key: 'FINANCE', label: '4. Finance' },
          ].map((tab) => {
            const isActive = activeRoleView === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveRoleView(tab.key as any)}
                style={{
                  backgroundColor: isActive ? '#09090b' : '#f4f4f5',
                  color: isActive ? '#ffffff' : '#3f3f46',
                  border: isActive ? '1px solid #09090b' : '1px solid #d4d4d8',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 1. TABEL ANALISA SALES DEALER ================= */}
      {(activeRoleView === 'ALL' || activeRoleView === 'SALES') && (
        <div style={{
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th colSpan={2} style={tableHeaderStyle}>
                  ANALISA SALES DEALER :: (Diajukan oleh: {salesman?.name || 'Rian Pratama'})
                </th>
              </tr>
            </thead>
            <tbody>
              {/* TANGGAL */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>TANGGAL</td>
                <td style={{ ...inputCellStyle, fontWeight: 700, fontSize: '0.85rem', color: '#09090b' }}>
                  {todayFormatted}
                </td>
              </tr>

              {/* ANALISA DEALER LAYAK MENJADI REKANAN (1) */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  ANALISA DEALER LAYAK MENJADI REKANAN (1) <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <textarea
                    rows={2}
                    value={analisaLayak1}
                    onChange={(e) => setAnalisaLayak1(e.target.value)}
                    placeholder="Alasan poin 1 kelayakan dealer..."
                    style={textareaStyle}
                  />
                </td>
              </tr>

              {/* ANALISA DEALER LAYAK MENJADI REKANAN (2) */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  ANALISA DEALER LAYAK MENJADI REKANAN (2) <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <textarea
                    rows={2}
                    value={analisaLayak2}
                    onChange={(e) => setAnalisaLayak2(e.target.value)}
                    placeholder="Alasan poin 2 kelayakan dealer..."
                    style={textareaStyle}
                  />
                </td>
              </tr>

              {/* ANALISA DEALER LAYAK MENJADI REKANAN (3) */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  ANALISA DEALER LAYAK MENJADI REKANAN (3) <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <textarea
                    rows={2}
                    value={analisaLayak3}
                    onChange={(e) => setAnalisaLayak3(e.target.value)}
                    placeholder="Alasan poin 3 kelayakan dealer..."
                    style={textareaStyle}
                  />
                </td>
              </tr>

              {/* DATA PADA SIUP SESUAI? */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  DATA PADA SIUP SESUAI? <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <select
                    value={siupSesuai}
                    onChange={(e) => setSiupSesuai(e.target.value)}
                    style={selectStyle}
                  >
                    <option value="YA">-. YA</option>
                    <option value="TIDAK">-. TIDAK</option>
                  </select>
                </td>
              </tr>

              {/* DATA PADA TDP SESUAI? */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  DATA PADA TDP SESUAI? <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <select
                    value={tdpSesuai}
                    onChange={(e) => setTdpSesuai(e.target.value)}
                    style={selectStyle}
                  >
                    <option value="YA">-. YA</option>
                    <option value="TIDAK">-. TIDAK</option>
                  </select>
                </td>
              </tr>

              {/* DATA PADA NPWP SESUAI? */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  DATA PADA NPWP SESUAI? <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <select
                    value={npwpSesuai}
                    onChange={(e) => setNpwpSesuai(e.target.value)}
                    style={selectStyle}
                  >
                    <option value="YA">-. YA</option>
                    <option value="TIDAK">-. TIDAK</option>
                  </select>
                </td>
              </tr>

              {/* DATA PADA KTP SESUAI? */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  DATA PADA KTP SESUAI? <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <select
                    value={ktpSesuai}
                    onChange={(e) => setKtpSesuai(e.target.value)}
                    style={selectStyle}
                  >
                    <option value="YA">-. YA</option>
                    <option value="TIDAK">-. TIDAK</option>
                  </select>
                </td>
              </tr>

              {/* SUDAH PERNAH MENINJAU TOKO DAN BERTEMU DENGAN PEMILIK? */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  SUDAH PERNAH MENINJAU TOKO DAN BERTEMU DENGAN PEMILIK? <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <select
                    value={sudahMeninjauToko}
                    onChange={(e) => setSudahMeninjauToko(e.target.value)}
                    style={selectStyle}
                  >
                    <option value="YA">-. YA</option>
                    <option value="TIDAK">-. TIDAK</option>
                  </select>
                </td>
              </tr>

              {/* MENGENAL TOKO/PEMILIK INI DENGAN BAIK? */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>
                  MENGENAL TOKO/PEMILIK INI DENGAN BAIK? <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={inputCellStyle}>
                  <select
                    value={mengenalBaik}
                    onChange={(e) => setMengenalBaik(e.target.value)}
                    style={selectStyle}
                  >
                    <option value="YA">-. YA</option>
                    <option value="TIDAK">-. TIDAK</option>
                  </select>
                </td>
              </tr>

              {/* TARGET PENJUALAN/BULAN (RP) */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>TARGET PENJUALAN/BULAN (RP)</td>
                <td style={inputCellStyle}>
                  <div style={{ maxWidth: '340px' }}>
                    <RupiahInput
                      value={targetPenjualan}
                      onChange={setTargetPenjualan}
                      style={{ fontWeight: 800 }}
                    />
                  </div>
                </td>
              </tr>

              {/* RENCANA LAMA PEMBAYARAN (HARI) */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>RENCANA LAMA PEMBAYARAN (HARI)</td>
                <td style={inputCellStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      value={rencanaLamaPembayaran}
                      onChange={(e) => setRencanaLamaPembayaran(Number(e.target.value))}
                      style={{ ...inputStyle, maxWidth: '140px', fontWeight: 700 }}
                    />
                    <span style={{ fontSize: '0.825rem', color: '#09090b', fontWeight: 600 }}>Hari Kalender</span>
                  </div>
                </td>
              </tr>

              {/* TARGET PLAFON KREDIT (RP) */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>TARGET PLAFON KREDIT (RP)</td>
                <td style={inputCellStyle}>
                  <div style={{ maxWidth: '340px' }}>
                    <RupiahInput
                      value={targetPlafon}
                      onChange={setTargetPlafon}
                      style={{ fontWeight: 800, color: '#1d4ed8' }}
                    />
                  </div>
                </td>
              </tr>

              {/* DISKON YANG DIAJUKAN (PERSENTASE) */}
              <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                <td style={labelCellStyle}>DISKON YANG DIAJUKAN (PERSENTASE)</td>
                <td style={inputCellStyle}>
                  <div style={{ maxWidth: '240px' }}>
                    <input
                      type="text"
                      value={diskonPersentase}
                      onChange={(e) => setDiskonPersentase(e.target.value)}
                      placeholder="Contoh: 3.5% / 5%..."
                      style={inputStyle}
                    />
                  </div>
                </td>
              </tr>

              {/* PERSETUJUAN */}
              <tr>
                <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd' }}>
                  PERSETUJUAN <span style={{ color: '#dc2626' }}>*</span>
                </td>
                <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                  <select
                    value={persetujuanSales}
                    onChange={(e) => setPersetujuanSales(e.target.value)}
                    style={{ ...selectStyle, fontWeight: 800, color: '#09090b' }}
                  >
                    <option value="YA">-. YA</option>
                    <option value="TIDAK">-. TIDAK</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ================= 2. TABEL-TABEL MATRIX APPROVAL RESMI (SESUAI GAMBAR) ================= */}
      {approvers.map((app) => {
        if (activeRoleView !== 'ALL' && activeRoleView !== app.roleKey) {
          return null;
        }

        const isReadOnly = app.status === 'APPROVED' && activeRoleView !== app.roleKey;

        return (
          <div
            key={app.id}
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th colSpan={2} style={{ ...tableHeaderStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span>{app.roleTitle} ::</span>
                    <span style={{
                      backgroundColor: app.status === 'APPROVED' ? '#ecfdf5' : app.status === 'PENDING' ? '#eff6ff' : '#f1f5f9',
                      color: app.status === 'APPROVED' ? '#059669' : app.status === 'PENDING' ? '#1d4ed8' : '#64748b',
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      border: `1px solid ${app.status === 'APPROVED' ? '#a7f3d0' : '#bfdbfe'}`,
                      letterSpacing: 'normal'
                    }}>
                      {app.status === 'APPROVED' ? '✓ STATUS: TELAH DISETUJUI' : app.status === 'PENDING' ? '⏳ SEDANG MENUNGGU APPROVAL' : 'MENUNGGU TAHAPAN SEBELUMNYA'}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* TANGGAL */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>TANGGAL</td>
                  <td style={{ ...inputCellStyle, fontWeight: 600, color: '#09090b' }}>
                    {isReadOnly ? (
                      <span>{app.tanggal}</span>
                    ) : (
                      <input
                        type="text"
                        value={app.tanggal}
                        onChange={(e) => handleUpdateApprover(app.id, 'tanggal', e.target.value)}
                        style={inputStyle}
                      />
                    )}
                  </td>
                </tr>

                {/* KETERANGAN */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>KETERANGAN</td>
                  <td style={inputCellStyle}>
                    {isReadOnly ? (
                      <strong style={{ color: '#09090b' }}>{app.keterangan}</strong>
                    ) : (
                      <input
                        type="text"
                        value={app.keterangan}
                        onChange={(e) => handleUpdateApprover(app.id, 'keterangan', e.target.value)}
                        placeholder="Contoh: OK APPROVED..."
                        style={inputStyle}
                      />
                    )}
                  </td>
                </tr>

                {/* SUDAH PERNAH MENINJAU TOKO DAN BERTEMU DENGAN PEMILIK? */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>SUDAH PERNAH MENINJAU TOKO DAN BERTEMU DENGAN PEMILIK?</td>
                  <td style={inputCellStyle}>
                    {isReadOnly ? (
                      <strong>{app.sudahMeninjauToko}</strong>
                    ) : (
                      <select
                        value={app.sudahMeninjauToko}
                        onChange={(e) => handleUpdateApprover(app.id, 'sudahMeninjauToko', e.target.value as any)}
                        style={selectStyle}
                      >
                        <option value="YA">YA</option>
                        <option value="TIDAK">TIDAK</option>
                      </select>
                    )}
                  </td>
                </tr>

                {/* MENGENAL TOKO/PEMILIK INI DENGAN BAIK? */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>MENGENAL TOKO/PEMILIK INI DENGAN BAIK?</td>
                  <td style={inputCellStyle}>
                    {isReadOnly ? (
                      <strong>{app.mengenalBaik}</strong>
                    ) : (
                      <select
                        value={app.mengenalBaik}
                        onChange={(e) => handleUpdateApprover(app.id, 'mengenalBaik', e.target.value as any)}
                        style={selectStyle}
                      >
                        <option value="YA">YA</option>
                        <option value="TIDAK">TIDAK</option>
                      </select>
                    )}
                  </td>
                </tr>

                {/* TARGET PENJUALAN/BULAN (RP) */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>TARGET PENJUALAN/BULAN (RP)</td>
                  <td style={inputCellStyle}>
                    {isReadOnly ? (
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>
                        {new Intl.NumberFormat('id-ID').format(app.targetPenjualan)}
                      </strong>
                    ) : (
                      <div style={{ maxWidth: '340px' }}>
                        <RupiahInput
                          value={app.targetPenjualan}
                          onChange={(val) => handleUpdateApprover(app.id, 'targetPenjualan', val)}
                        />
                      </div>
                    )}
                  </td>
                </tr>

                {/* RENCANA LAMA PEMBAYARAN (HARI) */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>RENCANA LAMA PEMBAYARAN (HARI)</td>
                  <td style={inputCellStyle}>
                    {isReadOnly ? (
                      <strong>{app.rencanaLamaPembayaran} Hari</strong>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="number"
                          value={app.rencanaLamaPembayaran}
                          onChange={(e) => handleUpdateApprover(app.id, 'rencanaLamaPembayaran', Number(e.target.value))}
                          style={{ ...inputStyle, maxWidth: '140px' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Hari</span>
                      </div>
                    )}
                  </td>
                </tr>

                {/* TARGET PLAFON KREDIT (RP) */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>TARGET PLAFON KREDIT (RP)</td>
                  <td style={inputCellStyle}>
                    {isReadOnly ? (
                      <strong style={{ color: '#1d4ed8', fontFamily: 'var(--font-mono)' }}>
                        {new Intl.NumberFormat('id-ID').format(app.targetPlafon)}
                      </strong>
                    ) : (
                      <div style={{ maxWidth: '340px' }}>
                        <RupiahInput
                          value={app.targetPlafon}
                          onChange={(val) => handleUpdateApprover(app.id, 'targetPlafon', val)}
                          style={{ color: '#1d4ed8', fontWeight: 800 }}
                        />
                      </div>
                    )}
                  </td>
                </tr>

                {/* DISKON YANG DIAJUKAN (PERSENTASE) */}
                <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={labelCellStyle}>DISKON YANG DIAJUKAN (PERSENTASE)</td>
                  <td style={inputCellStyle}>
                    {isReadOnly ? (
                      <strong>{app.diskonPersentase}</strong>
                    ) : (
                      <div style={{ maxWidth: '240px' }}>
                        <input
                          type="text"
                          value={app.diskonPersentase}
                          onChange={(e) => handleUpdateApprover(app.id, 'diskonPersentase', e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                    )}
                  </td>
                </tr>

                {/* PERSETUJUAN */}
                <tr>
                  <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd' }}>PERSETUJUAN</td>
                  <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {isReadOnly ? (
                        <span style={{
                          backgroundColor: '#ecfdf5',
                          color: '#059669',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px'
                        }}>
                          {app.persetujuan}
                        </span>
                      ) : (
                        <select
                          value={app.persetujuan}
                          onChange={(e) => handleUpdateApprover(app.id, 'persetujuan', e.target.value as any)}
                          style={{ ...selectStyle, maxWidth: '200px', fontWeight: 800 }}
                        >
                          <option value="YA">YA</option>
                          <option value="TIDAK">TIDAK</option>
                        </select>
                      )}

                      {/* Simulation Button to Approve this Tier */}
                      {!isReadOnly && app.status !== 'APPROVED' && (
                        <button
                          type="button"
                          onClick={() => handleApproveTier(app.id)}
                          style={{
                            backgroundColor: '#09090b',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.4rem 0.95rem',
                            fontSize: '0.785rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <CheckCircle2 size={14} /> Simpan Evaluasi {app.roleTitle.replace('ANALISA ', '')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}

      {/* Info Notice Box */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem'
      }}>
        <div style={{ backgroundColor: '#1d4ed8', color: '#ffffff', padding: '0.4rem', borderRadius: '6px' }}>
          <FileCheck size={20} />
        </div>
        <div style={{ fontSize: '0.825rem', color: '#1e3a8a', lineHeight: 1.5 }}>
          <strong>Pernyataan Resmi Seluruh Pihak Penyetuju (Approval Matrix):</strong> Setiap pejabat berwenang (Branch Manager, Regional BD Sr. Manager, Finance) mengisi template analisa yang seragam sesuai evaluasi masing-masing sebelum FPDB dinyatakan sah disetujui.
        </div>
      </div>
    </div>
  );
};
