import React, { useState, useMemo } from 'react';
import type { BusinessType, StoreCategory } from '../../types/fpdb';
import {
  getAllProvinces,
  getCitiesByProvince,
  getDistrictsByCity,
  getVillagesByDistrict,
  findPostalCode,
} from '../../services/regionService';

export interface StepDataDealerProps {
  storeName: string;
  setStoreName: (v: string) => void;
  businessType: BusinessType;
  setBusinessType: (v: BusinessType) => void;
  category?: StoreCategory;
  setCategory?: (v: StoreCategory) => void;
  address: string;
  setAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  province: string;
  setProvince: (v: string) => void;
  postalCode: string;
  setPostalCode: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  operatingYears: number;
  setOperatingYears: (v: number) => void;
  shopAreaM2: number;
  setShopAreaM2: (v: number) => void;
  ownershipStatus: 'Milik Sendiri' | 'Sewa / Kontrak';
  setOwnershipStatus: (v: 'Milik Sendiri' | 'Sewa / Kontrak') => void;
}

export const StepDataDealer: React.FC<StepDataDealerProps> = ({
  storeName,
  setStoreName,
  businessType,
  setBusinessType,
  category,
  setCategory: _setCategory,
  address,
  setAddress,
  city,
  setCity,
  province,
  setProvince,
  postalCode,
  setPostalCode,
  phone,
  setPhone,
  email,
  setEmail,
  operatingYears,
  setOperatingYears,
  shopAreaM2,
  setShopAreaM2,
  ownershipStatus,
  setOwnershipStatus,
}) => {
  // 1. INFORMASI DEALER STATE
  const [jenisDealer, setJenisDealer] = useState(businessType === 'PT' ? '-. PT (Terbuka)' : businessType === 'CV' ? '-. CV' : businessType === 'UD' ? '-. UD' : '-. Perorangan');
  const [namaDealerInvoice, setNamaDealerInvoice] = useState(storeName ? `${storeName} (KONSUMEN)` : '');

  // ================= 38 PROVINCES CASCADING REGION STATE =================
  const allProvincesList = useMemo(() => getAllProvinces(), []);
  const [selectedProvince, setSelectedProvince] = useState<string>(province || 'DKI Jakarta');

  const availableCities = useMemo(() => {
    return getCitiesByProvince(selectedProvince);
  }, [selectedProvince]);

  const [selectedKota, setSelectedKota] = useState<string>(() => {
    const cities = getCitiesByProvince(province || 'DKI Jakarta');
    if (city && cities.includes(city)) return city;
    return cities[0] || 'Kota Jakarta Selatan';
  });

  const availableDistricts = useMemo(() => {
    return getDistrictsByCity(selectedProvince, selectedKota);
  }, [selectedProvince, selectedKota]);

  const [selectedKecamatan, setSelectedKecamatan] = useState<string>(() => {
    const dists = getDistrictsByCity(province || 'DKI Jakarta', selectedKota);
    return dists[0] || 'Kebayoran Baru';
  });

  const availableVillages = useMemo(() => {
    return getVillagesByDistrict(selectedProvince, selectedKota, selectedKecamatan);
  }, [selectedProvince, selectedKota, selectedKecamatan]);

  const [selectedKelurahan, setSelectedKelurahan] = useState<string>(() => {
    const vills = getVillagesByDistrict(province || 'DKI Jakarta', selectedKota, selectedKecamatan);
    return vills[0]?.kelurahan || 'Melawai';
  });

  // Handlers for cascading selection
  const handleProvinceChange = (newProv: string) => {
    setSelectedProvince(newProv);
    setProvince(newProv);

    const cities = getCitiesByProvince(newProv);
    if (cities.length > 0) {
      const firstCity = cities[0];
      setSelectedKota(firstCity);
      setCity(firstCity);

      const dists = getDistrictsByCity(newProv, firstCity);
      if (dists.length > 0) {
        const firstDist = dists[0];
        setSelectedKecamatan(firstDist);

        const vills = getVillagesByDistrict(newProv, firstCity, firstDist);
        if (vills.length > 0) {
          const firstVill = vills[0];
          setSelectedKelurahan(firstVill.kelurahan);
          setPostalCode(firstVill.kodePos);
        } else {
          setSelectedKelurahan('');
        }
      } else {
        setSelectedKecamatan('');
        setSelectedKelurahan('');
      }
    } else {
      setSelectedKota('');
      setSelectedKecamatan('');
      setSelectedKelurahan('');
    }
  };

  const handleKotaChange = (newKota: string) => {
    setSelectedKota(newKota);
    setCity(newKota);

    const dists = getDistrictsByCity(selectedProvince, newKota);
    if (dists.length > 0) {
      const firstDist = dists[0];
      setSelectedKecamatan(firstDist);

      const vills = getVillagesByDistrict(selectedProvince, newKota, firstDist);
      if (vills.length > 0) {
        const firstVill = vills[0];
        setSelectedKelurahan(firstVill.kelurahan);
        setPostalCode(firstVill.kodePos);
      } else {
        setSelectedKelurahan('');
      }
    } else {
      setSelectedKecamatan('');
      setSelectedKelurahan('');
    }
  };

  const handleKecamatanChange = (newKec: string) => {
    setSelectedKecamatan(newKec);

    const vills = getVillagesByDistrict(selectedProvince, selectedKota, newKec);
    if (vills.length > 0) {
      const firstVill = vills[0];
      setSelectedKelurahan(firstVill.kelurahan);
      setPostalCode(firstVill.kodePos);
    } else {
      setSelectedKelurahan('');
    }
  };

  const handleKelurahanChange = (newKel: string) => {
    setSelectedKelurahan(newKel);
    const found = availableVillages.find(v => v.kelurahan.toLowerCase() === newKel.toLowerCase());
    if (found) {
      setPostalCode(found.kodePos);
    } else {
      const code = findPostalCode(selectedProvince, selectedKota, selectedKecamatan, newKel);
      if (code) setPostalCode(code);
    }
  };

  const [wilayah, setWilayah] = useState('-. LAIN-LAIN (SELAIN DKI JAKARTA)');
  const [noHp, setNoHp] = useState('0812-2334-4556');
  const [fax, setFax] = useState('022-2501235');
  const [website, setWebsite] = useState('www.sinarelektronik.co.id');
  const [punyaGudang, setPunyaGudang] = useState('-. YA');
  const [sudahBeroperasiSejak, setSudahBeroperasiSejak] = useState(operatingYears ? `${2026 - operatingYears}` : '2018');
  const [usahaSebelumnya, setUsahaSebelumnya] = useState('Toko Kelontong & Alat Listrik');
  const [usahaLainSekarang, setUsahaLainSekarang] = useState('Distribusi Furniture Lokal');
  const [usahaUtama, setUsahaUtama] = useState<string>(category || 'Ritel Home Appliances & Elektronik Rumah Tangga');
  const [kepemilikanRekening, setKepemilikanRekening] = useState('-. a.n OWNER');
  const [namaBank, setNamaBank] = useState('-. BCA');
  const [bankAtasNama, setBankAtasNama] = useState('Hendrik Hartono');
  const [noRekening, setNoRekening] = useState('139-09281-01');

  // 2. KEADAAN TOKO STATE
  const [adaDisplayModena, setAdaDisplayModena] = useState('-. ADA');
  const [luas, setLuas] = useState(150);
  const [periodeBerakhirSewa, setPeriodeBerakhirSewa] = useState('2026-09-17');
  const [lokasiToko, setLokasiToko] = useState('-. JALAN UTAMA / PROTOKOL');
  const [usiaToko, setUsiaToko] = useState('5 Tahun');
  const [jumlahSalesman, setJumlahSalesman] = useState(4);
  const [jumlahTeknisi, setJumlahTeknisi] = useState(2);
  const [jumlahKaryawan, setJumlahKaryawan] = useState(10);
  const [jumlahArmada, setJumlahArmada] = useState('-. 2');
  const [penjualanGrosir, setPenjualanGrosir] = useState('-. YA');
  const [jumlahPerusahaanPembiayaan, setJumlahPerusahaanPembiayaan] = useState(2);
  const [namaPerusahaanPembiayaan, setNamaPerusahaanPembiayaan] = useState('Spektra / FIF, Home Credit Indonesia, Kredivo');
  const [jumlahMesinEdc, setJumlahMesinEdc] = useState(3);
  const [siupAn, setSiupAn] = useState('PT Sinar Terang Abadi');
  const [noSiup] = useState('0129/09-04/SIUP-PB/IV/2021');
  const [npwpType, setNpwpType] = useState('-. NPWP BADAN USAHA');
  const [npwpAn, setNpwpAn] = useState('PT Sinar Terang Abadi');
  const [noNpwp] = useState('01.234.567.8-428.000');
  const [ktpAn, setKtpAn] = useState('Hendrik Hartono, S.E.');

  // 3. PEMBAYARAN STATE
  const [caraPembayaran, setCaraPembayaran] = useState('-. TAGIH');
  const [pembayaran, setPembayaran] = useState('-. Kredit TOP');

  // 4. PRODUK YANG DIJUAL STATE
  const [prodBuiltInCooker, setProdBuiltInCooker] = useState('MODENA, Rinnai, Electrolux');
  const [prodFreestandingCooker, setProdFreestandingCooker] = useState('MODENA, Tecnogas, Ariston');
  const [prodExhaustHood, setProdExhaustHood] = useState('MODENA, Rinnai, Linea');
  const [prodMicrowaveOven, setProdMicrowaveOven] = useState('MODENA, Sharp, Panasonic');
  const [prodSmallAppl, setProdSmallAppl] = useState('Philips, Miyako, Cosmos');
  const [prodWmFrontLoading, setProdWmFrontLoading] = useState('Electrolux, LG, Samsung');
  const [prodWmTopFullAuto, setProdWmTopFullAuto] = useState('Sharp, Panasonic, LG');
  const [prodWmTopSemiAuto, setProdWmTopSemiAuto] = useState('Sharp, Polytron, Sanken');
  const [prodWaterHeater, setProdWaterHeater] = useState('MODENA, Ariston, Rinnai');
  const [prodKitchenSinkTap, setProdKitchenSinkTap] = useState('MODENA, Blanco, Teka');
  const [prodIronerHairDryer, setProdIronerHairDryer] = useState('Philips, Panasonic, Dyson');
  const [prodKulkas, setProdKulkas] = useState('Sharp, LG, Samsung');
  const [prodFreezer, setProdFreezer] = useState('MODENA, RSA, GEA');
  const [prodShowcaseCooler, setProdShowcaseCooler] = useState('MODENA, Polytron, GEA');
  const [prodWaterDispenser, setProdWaterDispenser] = useState('MODENA, Sanken, Miyako');
  const [relasi3MerekUtama, setRelasi3MerekUtama] = useState('MODENA, Sharp, Electrolux');
  const [totalOmsetMerekPerBulan, setTotalOmsetMerekPerBulan] = useState(180000000);
  const [jumlahSupplier, setJumlahSupplier] = useState('-. 3+');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.48rem 0.85rem',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '0.825rem',
    backgroundColor: '#ffffff',
    outline: 'none',
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.48rem 0.85rem',
    border: '1px solid #d4d4d8',
    borderRadius: '4px',
    fontSize: '0.825rem',
    backgroundColor: '#ffffff',
    outline: 'none',
    resize: 'vertical',
  };

  const FormRow: React.FC<{
    label: string;
    required?: boolean;
    helper?: string;
    children: React.ReactNode;
  }> = ({ label, required, helper, children }) => (
    <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
      <td style={{
        width: '340px',
        minWidth: '280px',
        maxWidth: '380px',
        padding: '0.65rem 1rem',
        backgroundColor: '#fafafa',
        borderRight: '1px solid #e4e4e7',
        verticalAlign: 'middle',
        fontSize: '0.785rem',
        fontWeight: 700,
        color: '#18181b',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
      }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
        {helper && <div style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 500, textTransform: 'none', marginTop: '0.15rem' }}>{helper}</div>}
      </td>
      <td style={{
        padding: '0.5rem 1rem',
        verticalAlign: 'middle',
        backgroundColor: '#ffffff',
      }}>
        {children}
      </td>
    </tr>
  );

  const SectionHeader: React.FC<{
    title: string;
    subtitle?: string;
  }> = ({ title, subtitle }) => (
    <tr style={{ backgroundColor: '#e2e8f0', borderTop: '2px solid #cbd5e1', borderBottom: '1px solid #cbd5e1' }}>
      <td colSpan={2} style={{ padding: '0.75rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#09090b', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {title}
          </span>
          {subtitle && (
            <span style={{ fontSize: '0.725rem', color: '#475569', fontWeight: 600 }}>
              {subtitle}
            </span>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div style={{
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <tbody>
          {/* ========================================================================= */}
          {/* 1. INFORMASI DEALER :: */}
          {/* ========================================================================= */}
          <SectionHeader title="INFORMASI DEALER ::" subtitle="Data Identitas Usaha, Kontak & Rekening" />

          <FormRow label="JENIS DEALER" required>
            <select
              style={inputStyle}
              value={jenisDealer}
              onChange={(e) => {
                setJenisDealer(e.target.value);
                if (e.target.value.includes('PT')) setBusinessType('PT');
                else if (e.target.value.includes('CV')) setBusinessType('CV');
                else if (e.target.value.includes('UD')) setBusinessType('UD');
                else setBusinessType('Perorangan');
              }}
            >
              <option value="-. PT (Terbuka)">-. PT (Terbuka)</option>
              <option value="-. PT (Tertutup)">-. PT (Tertutup)</option>
              <option value="-. CV">-. CV</option>
              <option value="-. UD">-. UD</option>
              <option value="-. Perorangan">-. Perorangan</option>
            </select>
          </FormRow>

          <FormRow label="NAMA DEALER" required>
            <input
              type="text"
              style={inputStyle}
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
                setNamaDealerInvoice(e.target.value ? `${e.target.value} (KONSUMEN)` : '');
              }}
              placeholder="Nama badan usaha / toko..."
              required
            />
          </FormRow>

          <FormRow label="NAMA DEALER PADA INVOICE KONSUMEN" required>
            <input
              type="text"
              style={inputStyle}
              value={namaDealerInvoice}
              onChange={(e) => setNamaDealerInvoice(e.target.value)}
              placeholder="Nama yang tercetak pada invoice penjualan..."
              required
            />
          </FormRow>

          <FormRow label="ALAMAT DEALER" required>
            <textarea
              rows={2}
              style={textareaStyle}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nama jalan, nomor gedung/ruko, RT/RW..."
              required
            />
          </FormRow>

          <FormRow label="PROVINSI" required helper="Pilih provinsi untuk mengaktifkan pilihan kota otomatis">
            <select
              style={inputStyle}
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
            >
              {allProvincesList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="KOTA / KABUPATEN" required>
            <select
              style={inputStyle}
              value={selectedKota}
              onChange={(e) => handleKotaChange(e.target.value)}
            >
              {availableCities.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="KECAMATAN" required>
            <select
              style={inputStyle}
              value={selectedKecamatan}
              onChange={(e) => handleKecamatanChange(e.target.value)}
            >
              {availableDistricts.map((kec) => (
                <option key={kec} value={kec}>
                  {kec}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="KELURAHAN" required>
            <select
              style={inputStyle}
              value={selectedKelurahan}
              onChange={(e) => handleKelurahanChange(e.target.value)}
            >
              {availableVillages.map((vel) => (
                <option key={vel.kelurahan} value={vel.kelurahan}>
                  {vel.kelurahan}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="KODE POS" required helper="Terisi otomatis berdasarkan kelurahan (dapat diedit manual)">
            <input
              type="text"
              style={{ ...inputStyle, fontFamily: 'monospace', fontWeight: 700 }}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Auto / Isi Kode Pos"
              required
            />
          </FormRow>

          <FormRow label="WILAYAH" required>
            <select style={inputStyle} value={wilayah} onChange={(e) => setWilayah(e.target.value)}>
              <option value="-. LAIN-LAIN (SELAIN DKI JAKARTA)">-. LAIN-LAIN (SELAIN DKI JAKARTA)</option>
              <option value="-. DKI JAKARTA">-. DKI JAKARTA</option>
              <option value="-. JABODETABEK">-. JABODETABEK</option>
              <option value="-. JAWA BARAT">-. JAWA BARAT</option>
            </select>
          </FormRow>

          <FormRow label="NO HANDPHONE" required>
            <input
              type="tel"
              style={inputStyle}
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              placeholder="0812-xxxx-xxxx"
              required
            />
          </FormRow>

          <FormRow label="TELEPON (KODE AREA - NO TELP)" required>
            <input
              type="text"
              style={inputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="022-xxxxxxx"
              required
            />
          </FormRow>

          <FormRow label="FAX (KODE AREA - NO TELP)">
            <input
              type="text"
              style={inputStyle}
              value={fax}
              onChange={(e) => setFax(e.target.value)}
              placeholder="022-xxxxxxx"
            />
          </FormRow>

          <FormRow label="EMAIL" required>
            <input
              type="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@dealer.com"
              required
            />
          </FormRow>

          <FormRow label="WEBSITE" required>
            <input
              type="text"
              style={inputStyle}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="www.sinarelektronik.co.id"
              required
            />
          </FormRow>

          <FormRow label="PUNYA GUDANG" required>
            <select style={inputStyle} value={punyaGudang} onChange={(e) => setPunyaGudang(e.target.value)}>
              <option value="-. YA">-. YA</option>
              <option value="-. TIDAK">-. TIDAK</option>
            </select>
          </FormRow>

          <FormRow label="SUDAH BEROPERASI SEJAK" required>
            <input
              type="text"
              style={inputStyle}
              value={operatingYears ? `${2026 - operatingYears}` : sudahBeroperasiSejak}
              onChange={(e) => {
                setSudahBeroperasiSejak(e.target.value);
                const y = parseInt(e.target.value);
                if (!isNaN(y)) setOperatingYears(Math.max(0, 2026 - y));
              }}
              placeholder="Tahun pendirian / mulai usaha (cth: 2018)"
              required
            />
          </FormRow>

          <FormRow label="USAHA SEBELUMNYA">
            <input
              type="text"
              style={inputStyle}
              value={usahaSebelumnya}
              onChange={(e) => setUsahaSebelumnya(e.target.value)}
              placeholder="Bidang usaha sebelum toko ini dibuka..."
            />
          </FormRow>

          <FormRow label="USAHA LAIN SEKARANG" required>
            <input
              type="text"
              style={inputStyle}
              value={usahaLainSekarang}
              onChange={(e) => setUsahaLainSekarang(e.target.value)}
              placeholder="Bidang usaha sampingan lain..."
              required
            />
          </FormRow>

          <FormRow label="USAHA UTAMA" required>
            <input
              type="text"
              style={inputStyle}
              value={usahaUtama}
              onChange={(e) => setUsahaUtama(e.target.value)}
              placeholder="Bidang usaha utama..."
              required
            />
          </FormRow>

          <FormRow label="KEPEMILIKAN REKENING" required>
            <select style={inputStyle} value={kepemilikanRekening} onChange={(e) => setKepemilikanRekening(e.target.value)}>
              <option value="-. a.n OWNER">-. a.n OWNER</option>
              <option value="-. a.n SELAIN OWNER">-. a.n SELAIN OWNER</option>
              <option value="-. a.n PERUSAHAAN">-. a.n PERUSAHAAN</option>
            </select>
          </FormRow>

          <FormRow label="NAMA BANK" required>
            <select style={inputStyle} value={namaBank} onChange={(e) => setNamaBank(e.target.value)}>
              <option value="-. BCA">-. BCA</option>
              <option value="-. Mandiri">-. Mandiri</option>
              <option value="-. BRI">-. BRI</option>
              <option value="-. BNI">-. BNI</option>
              <option value="-. CIMB Niaga">-. CIMB Niaga</option>
              <option value="-. Permata Bank">-. Permata Bank</option>
              <option value="-. Danamon">-. Danamon</option>
              <option value="-. Panin Bank">-. Panin Bank</option>
              <option value="-. ANZ Panin Bank">-. ANZ Panin Bank</option>
              <option value="-. Bank Lainnya">-. Bank Lainnya</option>
            </select>
          </FormRow>

          <FormRow label="BANK ATAS NAMA" required>
            <input
              type="text"
              style={inputStyle}
              value={bankAtasNama}
              onChange={(e) => setBankAtasNama(e.target.value)}
              placeholder="Nama pemegang rekening sesuai buku tabungan..."
              required
            />
          </FormRow>

          <FormRow label="NO REKENING">
            <input
              type="text"
              style={inputStyle}
              value={noRekening}
              onChange={(e) => setNoRekening(e.target.value)}
              placeholder="Nomor rekening bank..."
            />
          </FormRow>

          {/* ========================================================================= */}
          {/* 2. KEADAAN TOKO :: */}
          {/* ========================================================================= */}
          <SectionHeader title="KEADAAN TOKO ::" subtitle="Fisik Toko, Lokasi, Ketenagakerjaan & Legalitas Usaha" />

          <FormRow label="ADA DISPLAY UNIT MODENA DOMO" required>
            <select style={inputStyle} value={adaDisplayModena} onChange={(e) => setAdaDisplayModena(e.target.value)}>
              <option value="-. ADA">-. ADA</option>
              <option value="-. TIDAK ADA">-. TIDAK ADA</option>
            </select>
          </FormRow>

          <FormRow label="LUAS" required helper="Luas bangunan toko dalam meter persegi (m²)">
            <input
              type="number"
              style={inputStyle}
              value={luas || shopAreaM2}
              onChange={(e) => {
                setLuas(Number(e.target.value));
                setShopAreaM2(Number(e.target.value));
              }}
              placeholder="Luas toko..."
              required
            />
          </FormRow>

          <FormRow label="KEPEMILIKAN" required>
            <select
              style={inputStyle}
              value={ownershipStatus === 'Milik Sendiri' ? '-. MILIK SENDIRI' : '-. SEWA < 2 TAHUN'}
              onChange={(e) => {
                setOwnershipStatus(e.target.value.includes('MILIK SENDIRI') ? 'Milik Sendiri' : 'Sewa / Kontrak');
              }}
            >
              <option value="-. MILIK SENDIRI">-. MILIK SENDIRI</option>
              <option value="-. SEWA < 2 TAHUN">-. SEWA &lt; 2 TAHUN</option>
              <option value="-. SEWA >= 2 TAHUN">-. SEWA &gt;= 2 TAHUN</option>
            </select>
          </FormRow>

          <FormRow label="PERIODE BERAKHIR SEWA (APABILA SEWA)">
            <input
              type="date"
              style={inputStyle}
              value={periodeBerakhirSewa}
              onChange={(e) => setPeriodeBerakhirSewa(e.target.value)}
            />
          </FormRow>

          <FormRow label="LOKASI TOKO" required>
            <select style={inputStyle} value={lokasiToko} onChange={(e) => setLokasiToko(e.target.value)}>
              <option value="-. JALAN UTAMA / PROTOKOL">-. JALAN UTAMA / PROTOKOL</option>
              <option value="-. PERUMAHAN">-. PERUMAHAN</option>
              <option value="-. RUKO KOMERSIAL">-. RUKO KOMERSIAL</option>
              <option value="-. MALL / PLAZA">-. MALL / PLAZA</option>
              <option value="-. PASAR TRADISIONAL">-. PASAR TRADISIONAL</option>
            </select>
          </FormRow>

          <FormRow label="USIA TOKO">
            <input
              type="text"
              style={inputStyle}
              value={usiaToko}
              onChange={(e) => setUsiaToko(e.target.value)}
              placeholder="Contoh: 5 Tahun"
            />
          </FormRow>

          <FormRow label="JUMLAH SALESMAN" required>
            <input
              type="number"
              style={inputStyle}
              value={jumlahSalesman}
              onChange={(e) => setJumlahSalesman(Number(e.target.value))}
              required
            />
          </FormRow>

          <FormRow label="JUMLAH TEKNISI" required>
            <input
              type="number"
              style={inputStyle}
              value={jumlahTeknisi}
              onChange={(e) => setJumlahTeknisi(Number(e.target.value))}
              required
            />
          </FormRow>

          <FormRow label="JUMLAH KARYAWAN" required>
            <input
              type="number"
              style={inputStyle}
              value={jumlahKaryawan}
              onChange={(e) => setJumlahKaryawan(Number(e.target.value))}
              required
            />
          </FormRow>

          <FormRow label="JUMLAH ARMADA PENGIRIMAN" required>
            <select style={inputStyle} value={jumlahArmada} onChange={(e) => setJumlahArmada(e.target.value)}>
              <option value="-. 0">-. 0</option>
              <option value="-. 1">-. 1</option>
              <option value="-. 2">-. 2</option>
              <option value="-. 3">-. 3</option>
              <option value="-. >3">-. &gt;3</option>
            </select>
          </FormRow>

          <FormRow label="PENJUALAN GROSIR" required>
            <select style={inputStyle} value={penjualanGrosir} onChange={(e) => setPenjualanGrosir(e.target.value)}>
              <option value="-. YA">-. YA</option>
              <option value="-. TIDAK">-. TIDAK</option>
            </select>
          </FormRow>

          <FormRow label="JUMLAH PERUSAHAAN PEMBIAYAAN" required>
            <input
              type="number"
              style={inputStyle}
              value={jumlahPerusahaanPembiayaan}
              onChange={(e) => setJumlahPerusahaanPembiayaan(Number(e.target.value))}
              required
            />
          </FormRow>

          <FormRow label="NAMA PERUSAHAAN PEMBIAYAAN">
            <input
              type="text"
              style={inputStyle}
              value={namaPerusahaanPembiayaan}
              onChange={(e) => setNamaPerusahaanPembiayaan(e.target.value)}
              placeholder="Contoh: Spektra/FIF, HCI, Kredivo..."
            />
          </FormRow>

          <FormRow label="JUMLAH MESIN EDC TOKO" required>
            <input
              type="number"
              style={inputStyle}
              value={jumlahMesinEdc}
              onChange={(e) => setJumlahMesinEdc(Number(e.target.value))}
              required
            />
          </FormRow>

          <FormRow label="SIUP AN" required>
            <input
              type="text"
              style={inputStyle}
              value={siupAn}
              onChange={(e) => setSiupAn(e.target.value)}
              placeholder="Atas nama yang tercantum di SIUP..."
              required
            />
          </FormRow>

          <FormRow label="NO SIUP" required>
            <input
              type="text"
              style={inputStyle}
              value={noSiup}
              placeholder="Nomor izin usaha SIUP / NIB..."
              required
            />
          </FormRow>

          <FormRow label="NPWP" required>
            <select style={inputStyle} value={npwpType} onChange={(e) => setNpwpType(e.target.value)}>
              <option value="-. NPWP PRIBADI">-. NPWP PRIBADI</option>
              <option value="-. NPWP BADAN USAHA">-. NPWP BADAN USAHA</option>
            </select>
          </FormRow>

          <FormRow label="NPWP AN" required>
            <input
              type="text"
              style={inputStyle}
              value={npwpAn}
              onChange={(e) => setNpwpAn(e.target.value)}
              placeholder="Atas nama pada kartu NPWP..."
              required
            />
          </FormRow>

          <FormRow label="NO NPWP" required>
            <input
              type="text"
              style={{ ...inputStyle, fontFamily: 'monospace', fontWeight: 700 }}
              value={noNpwp}
              placeholder="xx.xxx.xxx.x-xxx.xxx"
              required
            />
          </FormRow>

          <FormRow label="KTP AN" required>
            <input
              type="text"
              style={inputStyle}
              value={ktpAn}
              onChange={(e) => setKtpAn(e.target.value)}
              placeholder="Nama penanggung jawab sesuai KTP..."
              required
            />
          </FormRow>

          {/* ========================================================================= */}
          {/* 3. PEMBAYARAN :: */}
          {/* ========================================================================= */}
          <SectionHeader title="PEMBAYARAN ::" subtitle="Ketentuan Cara Pembayaran & Fasilitas Kredit" />

          <FormRow label="CARA PEMBAYARAN" required>
            <select style={inputStyle} value={caraPembayaran} onChange={(e) => setCaraPembayaran(e.target.value)}>
              <option value="-. TAGIH">-. TAGIH</option>
              <option value="-. TRANSFER BANK">-. TRANSFER BANK</option>
              <option value="-. GIRO MUNDUR">-. GIRO MUNDUR</option>
              <option value="-. TUNAI / CASH">-. TUNAI / CASH</option>
            </select>
          </FormRow>

          <FormRow label="PEMBAYARAN">
            <select style={inputStyle} value={pembayaran} onChange={(e) => setPembayaran(e.target.value)}>
              <option value="-. Bank Garansi">-. Bank Garansi</option>
              <option value="-. Cash Before Delivery (CBD)">-. Cash Before Delivery (CBD)</option>
              <option value="-. Kredit TOP">-. Kredit TOP</option>
            </select>
          </FormRow>

          {/* ========================================================================= */}
          {/* 4. PRODUK YANG DIJUAL :: */}
          {/* ========================================================================= */}
          <SectionHeader
            title="PRODUK YANG DIJUAL ::"
            subtitle="Sebutkan 3 merek yang paling utama untuk masing-masing kategori"
          />

          <FormRow label="BUILT-IN COOKER (HOB & OVEN)" required>
            <input
              type="text"
              style={inputStyle}
              value={prodBuiltInCooker}
              onChange={(e) => setProdBuiltInCooker(e.target.value)}
              placeholder="Contoh: MODENA, Rinnai, Electrolux"
              required
            />
          </FormRow>

          <FormRow label="FREESTANDING COOKER" required>
            <input
              type="text"
              style={inputStyle}
              value={prodFreestandingCooker}
              onChange={(e) => setProdFreestandingCooker(e.target.value)}
              placeholder="Contoh: MODENA, Tecnogas, Ariston"
              required
            />
          </FormRow>

          <FormRow label="EXHAUST HOOD (CHIMNEY & SLIM)" required>
            <input
              type="text"
              style={inputStyle}
              value={prodExhaustHood}
              onChange={(e) => setProdExhaustHood(e.target.value)}
              placeholder="Contoh: MODENA, Rinnai, Linea"
              required
            />
          </FormRow>

          <FormRow label="MICROWAVE OVEN" required>
            <input
              type="text"
              style={inputStyle}
              value={prodMicrowaveOven}
              onChange={(e) => setProdMicrowaveOven(e.target.value)}
              placeholder="Contoh: MODENA, Sharp, Panasonic"
              required
            />
          </FormRow>

          <FormRow label="SMALL APPL (RICE COOKER, BLENDER, SANDWICH MAKER, ORANGE JUICER)" required>
            <input
              type="text"
              style={inputStyle}
              value={prodSmallAppl}
              onChange={(e) => setProdSmallAppl(e.target.value)}
              placeholder="Contoh: Philips, Miyako, Cosmos"
              required
            />
          </FormRow>

          <FormRow label="WM FRONT LOADING & DRYER" required>
            <input
              type="text"
              style={inputStyle}
              value={prodWmFrontLoading}
              onChange={(e) => setProdWmFrontLoading(e.target.value)}
              placeholder="Contoh: Electrolux, LG, Samsung"
              required
            />
          </FormRow>

          <FormRow label="WM TOP LOADING FULL AUTO" required>
            <input
              type="text"
              style={inputStyle}
              value={prodWmTopFullAuto}
              onChange={(e) => setProdWmTopFullAuto(e.target.value)}
              placeholder="Contoh: Sharp, Panasonic, LG"
              required
            />
          </FormRow>

          <FormRow label="WM TOP LOADING SEMI AUTO" required>
            <input
              type="text"
              style={inputStyle}
              value={prodWmTopSemiAuto}
              onChange={(e) => setProdWmTopSemiAuto(e.target.value)}
              placeholder="Contoh: Sharp, Polytron, Sanken"
              required
            />
          </FormRow>

          <FormRow label="WATER HEATER (ELECTRIC & GAS)" required>
            <input
              type="text"
              style={inputStyle}
              value={prodWaterHeater}
              onChange={(e) => setProdWaterHeater(e.target.value)}
              placeholder="Contoh: MODENA, Ariston, Rinnai"
              required
            />
          </FormRow>

          <FormRow label="KITCHEN SINK & TAP" required>
            <input
              type="text"
              style={inputStyle}
              value={prodKitchenSinkTap}
              onChange={(e) => setProdKitchenSinkTap(e.target.value)}
              placeholder="Contoh: MODENA, Blanco, Teka"
              required
            />
          </FormRow>

          <FormRow label="IRONER, HAIR DRYER, VACUUM CLEANER" required>
            <input
              type="text"
              style={inputStyle}
              value={prodIronerHairDryer}
              onChange={(e) => setProdIronerHairDryer(e.target.value)}
              placeholder="Contoh: Philips, Panasonic, Dyson"
              required
            />
          </FormRow>

          <FormRow label="KULKAS" required>
            <input
              type="text"
              style={inputStyle}
              value={prodKulkas}
              onChange={(e) => setProdKulkas(e.target.value)}
              placeholder="Contoh: Sharp, LG, Samsung"
              required
            />
          </FormRow>

          <FormRow label="FREEZER (CHEST & SLIDING GLASS)" required>
            <input
              type="text"
              style={inputStyle}
              value={prodFreezer}
              onChange={(e) => setProdFreezer(e.target.value)}
              placeholder="Contoh: MODENA, RSA, GEA"
              required
            />
          </FormRow>

          <FormRow label="SHOWCASE DISPLAY COOLER" required>
            <input
              type="text"
              style={inputStyle}
              value={prodShowcaseCooler}
              onChange={(e) => setProdShowcaseCooler(e.target.value)}
              placeholder="Contoh: MODENA, Polytron, GEA"
              required
            />
          </FormRow>

          <FormRow label="WATER DISPENSER" required>
            <input
              type="text"
              style={inputStyle}
              value={prodWaterDispenser}
              onChange={(e) => setProdWaterDispenser(e.target.value)}
              placeholder="Contoh: MODENA, Sanken, Miyako"
              required
            />
          </FormRow>

          <FormRow label="3 MEREK RELASI UTAMA" required>
            <input
              type="text"
              style={inputStyle}
              value={relasi3MerekUtama}
              onChange={(e) => setRelasi3MerekUtama(e.target.value)}
              placeholder="Contoh: MODENA, Sharp, Electrolux"
              required
            />
          </FormRow>

          <FormRow label="TOTAL OMSET MEREK TSB PER BULAN (RP)" required>
            <input
              type="number"
              style={inputStyle}
              value={totalOmsetMerekPerBulan}
              onChange={(e) => setTotalOmsetMerekPerBulan(Number(e.target.value))}
              placeholder="0"
              required
            />
          </FormRow>

          <FormRow label="JUMLAH SUPPLIER" required>
            <select style={inputStyle} value={jumlahSupplier} onChange={(e) => setJumlahSupplier(e.target.value)}>
              <option value="-. 1">-. 1</option>
              <option value="-. 2">-. 2</option>
              <option value="-. 3+">-. 3+</option>
            </select>
          </FormRow>
        </tbody>
      </table>
    </div>
  );
};
