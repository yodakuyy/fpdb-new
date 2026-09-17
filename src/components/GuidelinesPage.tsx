import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, ShieldCheck, FileText, 
  Building, CreditCard, Check, ArrowRight
} from 'lucide-react';

interface GuidelinesPageProps {
  onBack: () => void;
  onNavigateToMatrix?: () => void;
}

export const GuidelinesPage: React.FC<GuidelinesPageProps> = ({ onBack, onNavigateToMatrix }) => {
  const [activeTab, setActiveTab] = useState<'CHECKLIST' | 'WORKFLOW' | 'CREDIT_POLICY'>('CHECKLIST');

  const checklistDocs = [
    {
      title: 'e-KTP Asli Pemilik / Direktur',
      desc: 'Foto asli e-KTP jelas, tidak silau lampu, NIK dan foto terbaca penuh tanpa potongan.',
      req: 'Wajib Semua Bentuk Usaha',
      tag: 'Legalitas'
    },
    {
      title: 'NPWP Perusahaan / Pemilik',
      desc: 'Kartu NPWP 15/16 digit format terbaru atau SKT (Surat Keterangan Terdaftar Pajak).',
      req: 'Wajib Semua Bentuk Usaha',
      tag: 'Perpajakan'
    },
    {
      title: 'NIB / SIUP / Izin Usaha',
      desc: 'Nomor Induk Berusaha berbasis OSS RBA atau SIUP aktif yang masih berlaku.',
      req: 'Wajib PT, CV, UD',
      tag: 'Legalitas'
    },
    {
      title: 'Foto Fasad Toko & Plang Nama',
      desc: 'Tampak depan dari seberang jalan raya terlihat jelas plang nama toko dan lingkungan sekitar.',
      req: 'Wajib Semua Bentuk Usaha',
      tag: 'Fisik Toko'
    },
    {
      title: 'Foto Showroom & Display',
      desc: 'Display etalase elektronik dan penempatan produk home appliances di dalam toko.',
      req: 'Wajib Semua Bentuk Usaha',
      tag: 'Fisik Toko'
    },
    {
      title: 'Foto Gudang Penyimpanan',
      desc: 'Kapasitas dan kebersihan gudang penyimpanan stok barang aman dari kebocoran/banjir.',
      req: 'Wajib Semua Bentuk Usaha',
      tag: 'Fisik Toko'
    },
    {
      title: 'Rekening Koran Bank (3 Bulan)',
      desc: 'Mutasi rekening koran operasional 3 bulan terakhir untuk analisis likuiditas & cashflow.',
      req: 'Wajib Pengajuan Kredit > 100 Juta',
      tag: 'Finansial'
    },
    {
      title: 'Spesimen TTD & Stempel Toko',
      desc: 'Contoh tanda tangan basah penanggung jawab dan stempel resmi toko pada lembar spesimen.',
      req: 'Wajib Semua Bentuk Usaha',
      tag: 'Otorisasi'
    },
    {
      title: 'Akta Pendirian & SK Kemenkumham',
      desc: 'Akta pendirian notaris beserta akta perubahan pengurus terakhir dan lembar pengesahan.',
      req: 'Wajib Khusus PT & CV',
      tag: 'Legalitas'
    },
    {
      title: 'Peta / Denah Akses Ekspedisi',
      desc: 'Akses jalan masuk truk tronton/colt diesel untuk kelancaran pengiriman logistik.',
      req: 'Opsional (Sangat Dianjurkan)',
      tag: 'Logistik'
    }
  ];

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
            STANDAR OPERASIONAL PROSEDUR (SOP)
          </span>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090b', margin: '0.25rem 0 0', letterSpacing: '-0.02em' }}>
            Pedoman & Standar Operasional Pengajuan FPDB
          </h1>
        </div>
      </div>

      {/* Highlights 4 Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#09090b', marginBottom: '0.35rem' }}>
            <Clock size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>SLA Persetujuan</span>
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>Maks. 3 Hari Kerja</div>
          <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '0.25rem 0 0' }}>Sejak seluruh dokumen diverifikasi lengkap</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#09090b', marginBottom: '0.35rem' }}>
            <FileText size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Dokumen Standar</span>
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>10 Berkas Wajib</div>
          <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '0.25rem 0 0' }}>Legalitas, fisik toko, & rekam jejak finansial</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#09090b', marginBottom: '0.35rem' }}>
            <Building size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Integrasi Core</span>
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>SAP & ACCPAC</div>
          <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '0.25rem 0 0' }}>Sinkronisasi otomatis ID Dealer & Credit Limit</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#09090b', marginBottom: '0.35rem' }}>
            <ShieldCheck size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Matriks Approval</span>
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>7 Tipe Channel</div>
          <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '0.25rem 0 0' }}>Otoritas limit bertingkat sesuai SOP FPDB</p>
        </div>
      </div>

      {/* Banner Call-to-action for Matrix Approval */}
      {onNavigateToMatrix && (
        <div style={{
          backgroundColor: '#09090b',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '1.25rem 1.75rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div>
            <span style={{
              backgroundColor: '#27272a',
              color: '#34d399',
              fontSize: '0.725rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)'
            }}>
              SOP RESMI FPDB
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.35rem 0 0.2rem', color: '#ffffff' }}>
              Aturan Matriks Kewenangan Limit Kredit Dealer (Point 4 SOP)
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#a1a1aa', margin: 0, maxWidth: '650px' }}>
              Approval pengajuan kredit limit ditentukan secara otomatis berdasarkan channel customer (Cabang, KAM, Pro Appliance, Distributor, Solar, Furniture & MDS, Project) serta nominal limit yang diajukan.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToMatrix}
            style={{
              backgroundColor: '#ffffff',
              color: '#09090b',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0
            }}
          >
            <span>Buka Matriks Approval Limit</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Tabs Menu */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid #e4e4e7',
        marginBottom: '1.5rem',
        overflowX: 'auto'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('CHECKLIST')}
          style={{
            padding: '0.75rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: activeTab === 'CHECKLIST' ? 700 : 500,
            color: activeTab === 'CHECKLIST' ? '#09090b' : '#71717a',
            borderBottom: activeTab === 'CHECKLIST' ? '2px solid #09090b' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
        >
          <FileText size={16} />
          <span>Checklist Dokumen Wajib</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('WORKFLOW')}
          style={{
            padding: '0.75rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: activeTab === 'WORKFLOW' ? 700 : 500,
            color: activeTab === 'WORKFLOW' ? '#09090b' : '#71717a',
            borderBottom: activeTab === 'WORKFLOW' ? '2px solid #09090b' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
        >
          <Clock size={16} />
          <span>Alur Persetujuan & SLA</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('CREDIT_POLICY')}
          style={{
            padding: '0.75rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: activeTab === 'CREDIT_POLICY' ? 700 : 500,
            color: activeTab === 'CREDIT_POLICY' ? '#09090b' : '#71717a',
            borderBottom: activeTab === 'CREDIT_POLICY' ? '2px solid #09090b' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
        >
          <CreditCard size={16} />
          <span>Kebijakan Plafon Limit & TOP</span>
        </button>
      </div>

      {/* Tab 1: Checklist Dokumen */}
      {activeTab === 'CHECKLIST' && (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
          borderRadius: '12px',
          padding: '1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: '0 0 0.25rem' }}>
              Daftar Kelengkapan Dokumen Persyaratan
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#71717a', margin: 0 }}>
              Seluruh dokumen wajib discan atau difoto dengan resolusi tinggi (maks. 5MB per file) berformat PDF/JPG/PNG.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {checklistDocs.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #f4f4f5',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      color: '#09090b',
                      backgroundColor: '#e4e4e7',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px'
                    }}>
                      DOC-{idx + 1}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#52525b',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e4e4e7',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px'
                    }}>
                      {item.tag}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#09090b', margin: '0 0 0.35rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.785rem', color: '#52525b', lineHeight: 1.45, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px dashed #e4e4e7', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: '#09090b' }}>
                  <Check size={14} color="#059669" />
                  <span>{item.req}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Workflow & SLA */}
      {activeTab === 'WORKFLOW' && (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
          borderRadius: '12px',
          padding: '1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: '0 0 1.25rem' }}>
            Tahapan dan Alur Kerja Standar (Workflow SOP)
          </h3>

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#09090b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#09090b', margin: 0 }}>
                    Pengisian Formulir oleh Salesman (Day 1)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Sistem: Portal Online FPDB</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  Salesman wajib mengisi seluruh formulir 5 langkah (Profil Toko, Data Pemilik, Usulan Finansial, Lampiran Berkas, dan Deklarasi Integritas). Pastikan nomor kontak dan e-KTP akurat.
                </p>
              </div>
            </div>

            <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#09090b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#09090b', margin: 0 }}>
                    Review Sales Manager / Regional Head (Maks. 24 Jam)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Verifikasi Lapangan & Wilayah</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  Sales Manager memvalidasi keabsahan toko fisik, potensi omset penjualan per bulan, dan memastikan tidak terjadi kanibalisasi pasar dengan dealer Modena terdekat.
                </p>
              </div>
            </div>

            <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#09090b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#09090b', margin: 0 }}>
                    Credit Risk & Compliance Analysis (Maks. 24 Jam)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Divisi Credit Control Pusat</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  Credit Analyst melakukan evaluasi rekening koran, cross-check NIK/NPWP ke sistem perpajakan, dan SLIK OJK / BI Checking untuk memastikan tidak ada riwayat kredit macet (NPL).
                </p>
              </div>
            </div>

            <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#09090b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                4
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#09090b', margin: 0 }}>
                    Final Approval Pejabat Sesuai Matriks Limit (Maks. 24 Jam)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#71717a' }}>EVP / COO / Direksi</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  Persetujuan akhir otomatis diteruskan ke jenjang pimpinan sesuai batasan nominal limit kredit. Setelah disetujui, akun dealer langsung dibuat di master SAP & ACCPAC.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Credit Policy */}
      {activeTab === 'CREDIT_POLICY' && (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
          borderRadius: '12px',
          padding: '1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090b', margin: '0 0 1.25rem' }}>
            Kebijakan Batasan Plafon Kredit & Syarat Pembayaran (TOP)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#fafafa' }}>
              <div style={{ fontWeight: 800, color: '#09090b', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Kriteria Dealer Baru (First Order)
              </div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.825rem', color: '#52525b', display: 'grid', gap: '0.45rem' }}>
                <li>Dealer baru yang beroperasi &lt; 1 tahun direkomendasikan menggunakan syarat pembayaran <strong>CBD (Cash Before Delivery)</strong> atau <strong>COD</strong>.</li>
                <li>Maksimum plafon kredit awal tanpa jaminan sertifikat/bank garansi adalah <strong>Rp 100.000.000</strong>.</li>
                <li>Term of Payment (TOP) standar untuk outlet ritel tradisional adalah <strong>14 s/d 30 Hari</strong>.</li>
              </ul>
            </div>

            <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#fafafa' }}>
              <div style={{ fontWeight: 800, color: '#09090b', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Kenaikan Limit & Evaluasi Berkala
              </div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.825rem', color: '#52525b', display: 'grid', gap: '0.45rem' }}>
                <li>Pengajuan kenaikan limit dapat diproses minimal setelah <strong>3 bulan transaksi aktif</strong> tanpa catatan gagal bayar.</li>
                <li>Plafon limit &gt; Rp 350.000.000 wajib menyertakan laporan keuangan internal dan evaluasi omset oleh Regional BBD Senior Manager.</li>
                <li>Plafon limit &gt; Rp 600.000.000 memerlukan persetujuan hingga tingkat <strong>Chief Operating Officer (COO)</strong>.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
