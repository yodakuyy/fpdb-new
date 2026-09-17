import React, { useState } from 'react';
import { RupiahInput } from '../common/RupiahInput';

export interface StepAnalisaProps {
  salesman?: {
    name: string;
    nik: string;
    role: string;
    region: string;
    branch: string;
  };
}

export const StepAnalisa: React.FC<StepAnalisaProps> = ({ salesman }) => {
  // 1. Yang Mengajukan
  const [salesName, setSalesName] = useState(salesman?.name || 'Rian Pratama');
  const [salesKenalSejak, setSalesKenalSejak] = useState('Januari 2024');
  const [bmName, setBmName] = useState('Budi Santoso (Branch Manager)');
  const [bmKenalSejak, setBmKenalSejak] = useState('Maret 2024');

  // 2. Referensi Dari
  const [sumberReferensi, setSumberReferensi] = useState('CARI SENDIRI');
  const [refEksternalNama, setRefEksternalNama] = useState('');
  const [refEksternalKenalSejak, setRefEksternalKenalSejak] = useState('');
  const [refEksternalPerusahaan, setRefEksternalPerusahaan] = useState('');
  const [refInternalDiberikanKepada, setRefInternalDiberikanKepada] = useState('SALES');
  const [aktifMencariSendiriOleh, setAktifMencariSendiriOleh] = useState('SALES');
  const [calonDealerMemintaSendiri, setCalonDealerMemintaSendiri] = useState('YA');
  const [lainLain, setLainLain] = useState('-');

  // 3. Data Keuangan (Estimasi Intern)
  const [omsetPerBulan, setOmsetPerBulan] = useState<number>(150000000);
  const [estimasiNilaiRuko, setEstimasiNilaiRuko] = useState<number>(2500000000);
  const [rataRataPenjualan3Bulan, setRataRataPenjualan3Bulan] = useState<number>(125000000);
  const [rataRataLamaPembayaran, setRataRataLamaPembayaran] = useState<number>(28);
  const [limitKreditSaatIni, setLimitKreditSaatIni] = useState<number>(0);

  // 4. Management Dealer
  const [dikelolaOleh, setDikelolaOleh] = useState('SUAMI');
  const [alamatPengelola, setAlamatPengelola] = useState('Jl. Dago Atas No. 128, RT 02 / RW 05, Bandung');
  const [yangLebihBerperan, setYangLebihBerperan] = useState('Suami mengelola operasional, Istri mengelola keuangan toko');

  // 5. Analisa Subyektif & Kuantitatif 1 s/d 10
  const [karakterPengelola, setKarakterPengelola] = useState('Kooperatif, transparan, reputasi bisnis sangat baik di paguyuban');
  const [nilaiKarakter, setNilaiKarakter] = useState<number>(9);

  const [keadaanKeuangan, setKeadaanKeuangan] = useState('Cash flow lancar, perputaran piutang stabil, tidak ada riwayat blacklist');
  const [nilaiKeuangan, setNilaiKeuangan] = useState<number>(8);

  const [keadaanToko, setKeadaanToko] = useState('Toko bersih, rapi, display produk tertata di area depan');
  const [nilaiKeadaanToko, setNilaiKeadaanToko] = useState<number>(8);

  const [lokasiToko, setLokasiToko] = useState('Pinggir jalan raya utama provinsi, akses kontainer & parkir luas');
  const [nilaiLokasiToko, setNilaiLokasiToko] = useState<number>(9);

  const [agresifitasSales, setAgresifitasSales] = useState('Memiliki 6 sales counter aktif dan promosi aktif via WhatsApp catalog');
  const [nilaiAgresifitasSales, setNilaiAgresifitasSales] = useState<number>(8);

  const [potensialBerkembang, setPotensialBerkembang] = useState('Sangat potensial, berencana ekspansi lantai 2 khusus Modena cooking');
  const [nilaiPotensialBerkembang, setNilaiPotensialBerkembang] = useState<number>(9);

  // 6. Kategori Barang & Billboard
  const [kategoriMinati1, setKategoriMinati1] = useState('Cooking (Freestanding Cooker & Built-in Hob)');
  const [kategoriMinati2, setKategoriMinati2] = useState('Cooling (Side by Side Refrigerator & Chest Freezer)');
  const [kategoriMinati3, setKategoriMinati3] = useState('Cleaning (Front Loading Washing Machine & Dishwasher)');
  const [billboardBrandLain, setBillboardBrandLain] = useState('Electrolux, Bosch (Ukuran 3x4 meter di sisi barat)');
  const [boothBrandLain, setBoothBrandLain] = useState('Rinnai, Modena Island Booth, Beko');
  const [sistemKerja, setSistemKerja] = useState('TRADISIONAL');

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
    width: '380px',
    minWidth: '280px',
    padding: '0.65rem 1.25rem',
    fontSize: '0.785rem',
    fontWeight: 800,
    color: '#09090b',
    borderRight: '1px solid #e4e4e7',
    verticalAlign: 'middle',
    letterSpacing: '0.01em',
    backgroundColor: '#ffffff',
  };

  const inputCellStyle: React.CSSProperties = {
    padding: '0.5rem 1.25rem',
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.45rem 0.75rem',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '0.825rem',
    color: '#09090b',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.45rem 0.75rem',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '0.825rem',
    color: '#09090b',
    backgroundColor: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Table 1: YANG MENGAJUKAN & REFERENSI DARI */}
      <div style={{
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          {/* SECTION 1: YANG MENGAJUKAN */}
          <thead>
            <tr>
              <th colSpan={2} style={tableHeaderStyle}>
                YANG MENGAJUKAN ::
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                SALES <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={salesName}
                  onChange={(e) => setSalesName(e.target.value)}
                  placeholder="Nama Sales yang mengajukan..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                SALES KENAL SEJAK <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={salesKenalSejak}
                  onChange={(e) => setSalesKenalSejak(e.target.value)}
                  placeholder="Contoh: Januari 2024 / 2 Tahun..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                BM <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={bmName}
                  onChange={(e) => setBmName(e.target.value)}
                  placeholder="Nama Branch Manager..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                BM KENAL SEJAK <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={bmKenalSejak}
                  onChange={(e) => setBmKenalSejak(e.target.value)}
                  placeholder="Contoh: Maret 2024 / 1 Tahun..."
                  style={inputStyle}
                />
              </td>
            </tr>

            {/* SECTION 2: REFERENSI DARI */}
            <tr>
              <th colSpan={2} style={tableHeaderStyle}>
                REFERENSI DARI ::
              </th>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>SUMBER REFERENSI</td>
              <td style={inputCellStyle}>
                <select
                  value={sumberReferensi}
                  onChange={(e) => setSumberReferensi(e.target.value)}
                  style={selectStyle}
                >
                  <option value="CARI SENDIRI">-. CARI SENDIRI</option>
                  <option value="REFERENSI EKSTERNAL">-. REFERENSI EKSTERNAL</option>
                  <option value="REFERENSI INTERNAL">-. REFERENSI INTERNAL</option>
                  <option value="CALON DEALER MEMINTA SENDIRI">-. CALON DEALER MEMINTA SENDIRI</option>
                  <option value="LAIN-LAIN">-. LAIN-LAIN</option>
                </select>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                (REFERENSI EKSTERNAL) NAMA <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={refEksternalNama}
                  onChange={(e) => setRefEksternalNama(e.target.value)}
                  placeholder="Nama pihak eksternal pemberi referensi..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                KENAL SEJAK <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={refEksternalKenalSejak}
                  onChange={(e) => setRefEksternalKenalSejak(e.target.value)}
                  placeholder="Lama kenal dengan pihak pemberi referensi..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                PERUSAHAAN <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={refEksternalPerusahaan}
                  onChange={(e) => setRefEksternalPerusahaan(e.target.value)}
                  placeholder="Perusahaan pihak referensi eksternal..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                (REFERENSI INTERNAL) REFERENSI DIBERIKAN KEPADA <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <select
                  value={refInternalDiberikanKepada}
                  onChange={(e) => setRefInternalDiberikanKepada(e.target.value)}
                  style={selectStyle}
                >
                  <option value="SALES">-. SALES</option>
                  <option value="BRANCH MANAGER">-. BRANCH MANAGER</option>
                  <option value="REGIONAL SALES MANAGER">-. REGIONAL SALES MANAGER</option>
                  <option value="DIREKSI">-. DIREKSI</option>
                </select>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>AKTIF MENCARI SENDIRI OLEH</td>
              <td style={inputCellStyle}>
                <select
                  value={aktifMencariSendiriOleh}
                  onChange={(e) => setAktifMencariSendiriOleh(e.target.value)}
                  style={selectStyle}
                >
                  <option value="">-. PILIH SALAH SATU</option>
                  <option value="SALES">SALES</option>
                  <option value="BRANCH MANAGER">BRANCH MANAGER</option>
                  <option value="TIM MARKETING / TRADE">TIM MARKETING / TRADE</option>
                </select>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>CALON DEALER MEMINTA SENDIRI</td>
              <td style={inputCellStyle}>
                <select
                  value={calonDealerMemintaSendiri}
                  onChange={(e) => setCalonDealerMemintaSendiri(e.target.value)}
                  style={selectStyle}
                >
                  <option value="YA">-. YA</option>
                  <option value="TIDAK">-. TIDAK</option>
                </select>
              </td>
            </tr>

            <tr>
              <td style={labelCellStyle}>LAIN-LAIN</td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={lainLain}
                  onChange={(e) => setLainLain(e.target.value)}
                  placeholder="Keterangan referensi lainnya jika ada..."
                  style={inputStyle}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 2: DATA KEUANGAN & MANAGEMENT DEALER */}
      <div style={{
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          {/* SECTION 3: DATA KEUANGAN */}
          <thead>
            <tr>
              <th colSpan={2} style={tableHeaderStyle}>
                DATA KEUANGAN :: Menurut Estimasi Intern dan bukan berdasarkan informasi dealer
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                OMSET PER BULAN (RP) <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <div style={{ maxWidth: '340px' }}>
                  <RupiahInput
                    value={omsetPerBulan}
                    onChange={setOmsetPerBulan}
                    style={{ fontWeight: 800 }}
                  />
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                ESTIMASI NILAI RUKO (RP) <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <div style={{ maxWidth: '340px' }}>
                  <RupiahInput
                    value={estimasiNilaiRuko}
                    onChange={setEstimasiNilaiRuko}
                    style={{ fontWeight: 800 }}
                  />
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>RATA-RATA PENJUALAN 3 BULAN TERAKHIR (RP)</td>
              <td style={inputCellStyle}>
                <div style={{ maxWidth: '340px' }}>
                  <RupiahInput
                    value={rataRataPenjualan3Bulan}
                    onChange={setRataRataPenjualan3Bulan}
                    style={{ fontWeight: 800 }}
                  />
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>RATA-RATA LAMA PEMBAYARAN 3 BULAN TERAKHIR (HARI)</td>
              <td style={inputCellStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="number"
                    value={rataRataLamaPembayaran}
                    onChange={(e) => setRataRataLamaPembayaran(Number(e.target.value))}
                    style={{ ...inputStyle, maxWidth: '140px', fontWeight: 700 }}
                  />
                  <span style={{ fontSize: '0.825rem', color: '#09090b', fontWeight: 600 }}>Hari Kalender</span>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>LIMIT KREDIT SAAT INI (RP, UNTUK UPDATE FPDB)</td>
              <td style={inputCellStyle}>
                <div style={{ maxWidth: '340px' }}>
                  <RupiahInput
                    value={limitKreditSaatIni}
                    onChange={setLimitKreditSaatIni}
                    style={{ fontWeight: 800 }}
                  />
                </div>
              </td>
            </tr>

            {/* SECTION 4: MANAGEMENT DEALER */}
            <tr>
              <th colSpan={2} style={tableHeaderStyle}>
                MANAGEMENT DEALER ::
              </th>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                DIKELOLA OLEH <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <select
                  value={dikelolaOleh}
                  onChange={(e) => setDikelolaOleh(e.target.value)}
                  style={selectStyle}
                >
                  <option value="SUAMI">-. SUAMI</option>
                  <option value="ISTRI">-. ISTRI</option>
                  <option value="BERSAMA (SUAMI & ISTRI)">-. BERSAMA (SUAMI & ISTRI)</option>
                  <option value="ANAK / PENERUS">-. ANAK / PENERUS</option>
                  <option value="PROFESIONAL MANAGER">-. PROFESIONAL MANAGER</option>
                </select>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                ALAMAT PENGELOLA <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <textarea
                  rows={3}
                  value={alamatPengelola}
                  onChange={(e) => setAlamatPengelola(e.target.value)}
                  placeholder="Alamat domisili lengkap pengelola / penanggung jawab operasional..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </td>
            </tr>

            <tr>
              <td style={labelCellStyle}>
                YANG LEBIH BERPERAN <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={yangLebihBerperan}
                  onChange={(e) => setYangLebihBerperan(e.target.value)}
                  placeholder="Contoh: Suami lebih dominan untuk negosiasi pembelian dan keputusan finansial..."
                  style={inputStyle}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 3: ANALISA SUBYEKTIF DAN KUANTITATIF 1 S/D 10 */}
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
                ANALISA SUBYEKTIF DAN KUANTITATIF 1 S/D 10 :: Berikan penilaian dalam skala 1-10 (1=tidak baik, 10=sangat baik)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                KARAKTER PENGELOLA <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={karakterPengelola}
                  onChange={(e) => setKarakterPengelola(e.target.value)}
                  placeholder="Deskripsi karakter, kejujuran & komitmen pengelola..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7', backgroundColor: '#fcfcfd' }}>
              <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd', paddingLeft: '2.5rem', color: '#475569' }}>
                NILAI KARAKTER PENGELOLA <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={nilaiKarakter}
                    onChange={(e) => setNilaiKarakter(Number(e.target.value))}
                    style={{ ...inputStyle, maxWidth: '120px', fontWeight: 800, textAlign: 'center' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Skala 1 s/d 10</span>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                KEADAAN KEUANGAN <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={keadaanKeuangan}
                  onChange={(e) => setKeadaanKeuangan(e.target.value)}
                  placeholder="Kondisi likuiditas & perputaran modal..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7', backgroundColor: '#fcfcfd' }}>
              <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd', paddingLeft: '2.5rem', color: '#475569' }}>
                NILAI KEADAAN KEUANGAN <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={nilaiKeuangan}
                    onChange={(e) => setNilaiKeuangan(Number(e.target.value))}
                    style={{ ...inputStyle, maxWidth: '120px', fontWeight: 800, textAlign: 'center' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Skala 1 s/d 10</span>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                KEADAAN TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={keadaanToko}
                  onChange={(e) => setKeadaanToko(e.target.value)}
                  placeholder="Kondisi kebersihan, tata letak & visual toko..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7', backgroundColor: '#fcfcfd' }}>
              <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd', paddingLeft: '2.5rem', color: '#475569' }}>
                NILAI KEADAAN TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={nilaiKeadaanToko}
                    onChange={(e) => setNilaiKeadaanToko(Number(e.target.value))}
                    style={{ ...inputStyle, maxWidth: '120px', fontWeight: 800, textAlign: 'center' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Skala 1 s/d 10</span>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                LOKASI TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={lokasiToko}
                  onChange={(e) => setLokasiToko(e.target.value)}
                  placeholder="Strategis tidaknya lokasi, aksesibilitas pelanggan..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7', backgroundColor: '#fcfcfd' }}>
              <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd', paddingLeft: '2.5rem', color: '#475569' }}>
                NILAI LOKASI TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={nilaiLokasiToko}
                    onChange={(e) => setNilaiLokasiToko(Number(e.target.value))}
                    style={{ ...inputStyle, maxWidth: '120px', fontWeight: 800, textAlign: 'center' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Skala 1 s/d 10</span>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                AGRESIFITAS SALES TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={agresifitasSales}
                  onChange={(e) => setAgresifitasSales(e.target.value)}
                  placeholder="Keaktifan tim penjual toko menawarkan produk..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7', backgroundColor: '#fcfcfd' }}>
              <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd', paddingLeft: '2.5rem', color: '#475569' }}>
                NILAI AGRESIFITAS SALES TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={nilaiAgresifitasSales}
                    onChange={(e) => setNilaiAgresifitasSales(Number(e.target.value))}
                    style={{ ...inputStyle, maxWidth: '120px', fontWeight: 800, textAlign: 'center' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Skala 1 s/d 10</span>
                </div>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                POTENSIAL BERKEMBANG <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={potensialBerkembang}
                  onChange={(e) => setPotensialBerkembang(e.target.value)}
                  placeholder="Prospek pertumbuhan volume penjualan ke depan..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...labelCellStyle, backgroundColor: '#fcfcfd', paddingLeft: '2.5rem', color: '#475569' }}>
                NILAI POTENSIAL BERKEMBANG <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={{ ...inputCellStyle, backgroundColor: '#fcfcfd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={nilaiPotensialBerkembang}
                    onChange={(e) => setNilaiPotensialBerkembang(Number(e.target.value))}
                    style={{ ...inputStyle, maxWidth: '120px', fontWeight: 800, textAlign: 'center' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Skala 1 s/d 10</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 4: KATEGORI BARANG DAN BILLBOARD */}
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
                KATEGORI BARANG DAN BILLBOARD ::
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                KATEGORI BARANG YANG PALING BANYAK DIMINATI 1 <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={kategoriMinati1}
                  onChange={(e) => setKategoriMinati1(e.target.value)}
                  placeholder="Kategori barang terlaris urutan 1..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                KATEGORI BARANG YANG PALING BANYAK DIMINATI 2 <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={kategoriMinati2}
                  onChange={(e) => setKategoriMinati2(e.target.value)}
                  placeholder="Kategori barang terlaris urutan 2..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                KATEGORI BARANG YANG PALING BANYAK DIMINATI 3 <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={kategoriMinati3}
                  onChange={(e) => setKategoriMinati3(e.target.value)}
                  placeholder="Kategori barang terlaris urutan 3..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                BILLBOARD BRAND LAIN YANG TERPASANG DI TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={billboardBrandLain}
                  onChange={(e) => setBillboardBrandLain(e.target.value)}
                  placeholder="Sebutkan merek lain yang memiliki billboard di toko..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
              <td style={labelCellStyle}>
                BOOTH BRAND LAIN YANG TERPASANG DI TOKO <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <input
                  type="text"
                  value={boothBrandLain}
                  onChange={(e) => setBoothBrandLain(e.target.value)}
                  placeholder="Sebutkan merek lain yang memiliki booth/display khusus..."
                  style={inputStyle}
                />
              </td>
            </tr>

            <tr>
              <td style={labelCellStyle}>
                SISTEM KERJA <span style={{ color: '#dc2626' }}>*</span>
              </td>
              <td style={inputCellStyle}>
                <select
                  value={sistemKerja}
                  onChange={(e) => setSistemKerja(e.target.value)}
                  style={selectStyle}
                >
                  <option value="TRADISIONAL">-. TRADISIONAL</option>
                  <option value="SEMI MODERN">-. SEMI MODERN</option>
                  <option value="MODERN RETAIL">-. MODERN RETAIL</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
