import React, { useState, useRef } from 'react';
import { 
  Plus, Trash2, Upload, Eye, FileText, X, 
  Info, Store, ZoomIn, ZoomOut, RotateCcw
} from 'lucide-react';

export interface TokoDistributorItem {
  id: string;
  namaToko: string;
  invoiceFile?: File;
  invoiceFileName?: string;
  invoiceFileSize?: string;
  invoiceFileUrl?: string;
  invoiceFileType?: 'image' | 'pdf';
  uploadedAt?: string;
}

export interface StepTokoDistributorProps {
  onBack?: () => void;
  onNext?: () => void;
}

const INITIAL_ITEMS: TokoDistributorItem[] = [
  {
    id: 'toko-1',
    namaToko: 'Toko Elektronik Cabang Buah Batu (Sub-Dealer)',
    invoiceFileName: 'Invoice_Penjualan_SubDealer_01.jpg',
    invoiceFileSize: '1.2 MB',
    invoiceFileUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    invoiceFileType: 'image',
    uploadedAt: '17 Sep 2026 08:42',
  },
];

export const StepTokoDistributor: React.FC<StepTokoDistributorProps> = () => {
  const [items, setItems] = useState<TokoDistributorItem[]>(INITIAL_ITEMS);
  const [previewItem, setPreviewItem] = useState<TokoDistributorItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleAddItem = () => {
    const newItem: TokoDistributorItem = {
      id: `toko-${Date.now()}`,
      namaToko: '',
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleNameChange = (id: string, newName: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, namaToko: newName } : item))
    );
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const fileUrl = isImage ? URL.createObjectURL(file) : undefined;
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            invoiceFile: file,
            invoiceFileName: file.name,
            invoiceFileSize: sizeInMB,
            invoiceFileUrl: fileUrl,
            invoiceFileType: isImage ? 'image' : 'pdf',
            uploadedAt: new Date().toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
        }
        return item;
      })
    );
  };

  const handleRemoveFile = (id: string) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            invoiceFile: undefined,
            invoiceFileName: undefined,
            invoiceFileSize: undefined,
            invoiceFileUrl: undefined,
            invoiceFileType: undefined,
            uploadedAt: undefined,
          };
        }
        return item;
      })
    );
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Business Logic Explanation Banner */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          backgroundColor: '#09090b',
          color: '#ffffff',
          padding: '0.4rem',
          borderRadius: '6px',
          flexShrink: 0,
          marginTop: '2px'
        }}>
          <Info size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#09090b' }}>
              Informasi Jaringan Toko Cabang / Sub-Distributor
            </span>
            <span style={{
              backgroundColor: '#ecfdf5',
              color: '#059669',
              border: '1px solid #a7f3d0',
              padding: '0.1rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 700
            }}>
              Bersifat Opsional (Tidak Wajib)
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
            Form ini diisi <strong>hanya jika</strong> calon dealer bertindak sebagai <strong>Distributor</strong> yang mendistribusikan produk Modena ke toko-toko retail binaannya, atau jika dealer memiliki <strong>cabang toko lain</strong>. Jika calon dealer adalah toko independen (single store), tabel ini <strong>dapat dikosongkan</strong>.
          </p>
        </div>
      </div>

      {/* Main Table Matching Legacy Screenshot */}
      <div style={{
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        width: '100%'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
              <th style={{
                width: '70px',
                padding: '0.85rem 1rem',
                fontSize: '0.825rem',
                fontWeight: 800,
                color: '#09090b',
                textAlign: 'center',
                borderRight: '1px solid #e2e8f0'
              }}>
                Nomor
              </th>
              <th style={{
                padding: '0.85rem 1.25rem',
                fontSize: '0.825rem',
                fontWeight: 800,
                color: '#09090b',
                borderRight: '1px solid #e2e8f0'
              }}>
                Nama Toko <span style={{ color: '#dc2626' }}>*</span>
                <span style={{ fontSize: '0.725rem', fontWeight: 500, color: '#71717a', marginLeft: '0.4rem' }}>
                  (Wajib jika baris ditambahkan)
                </span>
              </th>
              <th style={{
                padding: '0.85rem 1.25rem',
                fontSize: '0.825rem',
                fontWeight: 800,
                color: '#09090b',
                borderRight: '1px solid #e2e8f0'
              }}>
                Contoh Invoice Toko (opsional)
              </th>
              <th style={{
                width: '120px',
                padding: '0.85rem 1rem',
                fontSize: '0.825rem',
                fontWeight: 800,
                color: '#09090b',
                textAlign: 'center'
              }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '2.5rem 1rem', textAlign: 'center', color: '#71717a' }}>
                  <Store size={32} color="#a1a1aa" style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Belum ada data toko / sub-distributor ditambahkan
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Jika dealer tidak memiliki cabang toko atau sub-dealer, Anda dapat langsung melewati langkah ini.
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    style={{
                      marginTop: '0.85rem',
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.45rem 0.95rem',
                      fontSize: '0.785rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Plus size={14} /> Tambah Toko / Distributor
                  </button>
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const hasFile = !!item.invoiceFileName;

                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa',
                    }}
                  >
                    {/* Nomor */}
                    <td style={{
                      padding: '0.85rem 1rem',
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      color: '#09090b',
                      borderRight: '1px solid #e2e8f0',
                      verticalAlign: 'middle'
                    }}>
                      {index + 1}
                    </td>

                    {/* Nama Toko Input (Full width) */}
                    <td style={{
                      padding: '0.75rem 1.25rem',
                      borderRight: '1px solid #e2e8f0',
                      verticalAlign: 'middle'
                    }}>
                      <input
                        type="text"
                        value={item.namaToko}
                        onChange={(e) => handleNameChange(item.id, e.target.value)}
                        placeholder="Masukkan nama cabang toko / sub-distributor..."
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #d4d4d8',
                          borderRadius: '6px',
                          fontSize: '0.825rem',
                          color: '#09090b',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    </td>

                    {/* Contoh Invoice Toko (opsional) + View Preview */}
                    <td style={{
                      padding: '0.75rem 1.25rem',
                      borderRight: '1px solid #e2e8f0',
                      verticalAlign: 'middle'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                        <input
                          type="file"
                          ref={el => { fileInputRefs.current[item.id] = el; }}
                          style={{ display: 'none' }}
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileUpload(item.id, e)}
                        />

                        {/* View Button if file uploaded */}
                        {hasFile && (
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            style={{
                              backgroundColor: '#09090b',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                            title="Lihat preview invoice"
                          >
                            <Eye size={13} /> View
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[item.id]?.click()}
                          style={{
                            backgroundColor: '#f4f4f5',
                            border: '1px solid #d4d4d8',
                            borderRadius: '4px',
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.785rem',
                            fontWeight: 600,
                            color: '#18181b',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Upload size={13} />
                          <span>{hasFile ? 'Ganti File' : 'Choose File'}</span>
                        </button>

                        <span style={{
                          fontSize: '0.8rem',
                          color: hasFile ? '#09090b' : '#71717a',
                          fontWeight: hasFile ? 600 : 400,
                          maxWidth: '240px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {hasFile ? item.invoiceFileName : 'No file chosen'}
                        </span>

                        {hasFile && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#dc2626',
                              cursor: 'pointer',
                              padding: '0.2rem',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Hapus file invoice"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Action Column */}
                    <td style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'center',
                      verticalAlign: 'middle'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          style={{
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            border: '1px solid #fca5a5',
                            borderRadius: '4px',
                            padding: '0.4rem 0.6rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            transition: 'all 0.15s ease'
                          }}
                          title="Hapus baris toko ini"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add Row Button at bottom if items exist */}
      {items.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="button"
            onClick={handleAddItem}
            style={{
              backgroundColor: '#ffffff',
              color: '#09090b',
              border: '1px dashed #71717a',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#f4f4f5';
              e.currentTarget.style.borderColor = '#09090b';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#71717a';
            }}
          >
            <Plus size={15} />
            <span>Tambah Toko / Distributor Lainnya</span>
          </button>
        </div>
      )}

      {/* Lightbox Modal for Invoice Preview */}
      {previewItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(9, 9, 11, 0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backdropFilter: 'blur(6px)',
          }}
          onClick={() => setPreviewItem(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              border: '1px solid #3f3f46'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '0.85rem 1.25rem',
              borderBottom: '1px solid #e4e4e7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fafafa',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ backgroundColor: '#09090b', color: '#ffffff', padding: '0.4rem', borderRadius: '6px' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                    Preview Invoice: {previewItem.namaToko || 'Toko Cabang / Sub-Distributor'}
                  </h3>
                  <p style={{ fontSize: '0.725rem', color: '#71717a', margin: '0.15rem 0 0' }}>
                    {previewItem.invoiceFileName} • {previewItem.invoiceFileSize} • Terunggah: {previewItem.uploadedAt || 'Baru Saja'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {previewItem.invoiceFileType === 'image' && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    backgroundColor: '#f4f4f5',
                    border: '1px solid #d4d4d8',
                    borderRadius: '6px',
                    padding: '0.15rem 0.35rem'
                  }}>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                    >
                      <ZoomOut size={15} />
                    </button>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, minWidth: '35px', textAlign: 'center' }}>
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                    >
                      <ZoomIn size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                    >
                      <RotateCcw size={13} />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #d4d4d8',
                    borderRadius: '6px',
                    padding: '0.35rem 0.55rem',
                    cursor: 'pointer',
                    color: '#09090b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  <X size={16} /> Tutup
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#09090b',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              {previewItem.invoiceFileUrl ? (
                <img
                  src={previewItem.invoiceFileUrl}
                  alt={previewItem.namaToko}
                  style={{
                    maxWidth: zoomLevel <= 1 ? '100%' : 'none',
                    maxHeight: zoomLevel <= 1 ? '70vh' : 'none',
                    transform: `scale(${zoomLevel})`,
                    transition: 'transform 0.15s ease-out',
                    borderRadius: '6px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
                  }}
                />
              ) : (
                <div style={{
                  backgroundColor: '#ffffff',
                  width: '100%',
                  maxWidth: '650px',
                  borderRadius: '8px',
                  padding: '2.5rem',
                  color: '#09090b',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.7)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #09090b', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>CONTOH INVOICE PENJUALAN TOKO</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>DOKUMEN HISTORI TRANSAKSI SUB-DEALER</div>
                    </div>
                    <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                      ATTACHED INVOICE
                    </span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#334155' }}>
                    <strong>Toko:</strong> {previewItem.namaToko}<br />
                    <strong>Nama Berkas:</strong> {previewItem.invoiceFileName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
