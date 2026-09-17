import React, { useState, useRef, useEffect } from 'react';
import { 
  Eye, Trash2, Upload, FileText, X, Image as ImageIcon, 
  ZoomIn, ZoomOut, RotateCcw, CheckCircle2, Maximize2
} from 'lucide-react';

export interface UploadedFileItem {
  id: string;
  label: string;
  required: boolean;
  file?: File;
  previewUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: 'image' | 'pdf' | 'doc' | 'sheet';
  uploadedAt?: string;
}

export interface StepDokumenLampiranProps {
  onBack?: () => void;
  onNext?: () => void;
}

const INITIAL_DOCUMENTS: UploadedFileItem[] = [
  {
    id: 'ktp',
    label: 'FILE KTP',
    required: true,
    fileName: 'KTP_Hendrik_Hartono_Owner.jpg',
    fileSize: '1.4 MB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:30',
    previewUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tdp',
    label: 'FILE TDP',
    required: true,
    fileName: 'TDP_PT_Sinar_Terang_Abadi.pdf',
    fileSize: '2.1 MB',
    fileType: 'pdf',
    uploadedAt: '17 Sep 2026 08:31',
  },
  {
    id: 'siup',
    label: 'FILE SIUP',
    required: true,
    fileName: 'SIUP_Perdagangan_Elektronik_2021.pdf',
    fileSize: '3.4 MB',
    fileType: 'pdf',
    uploadedAt: '17 Sep 2026 08:31',
  },
  {
    id: 'npwp',
    label: 'FILE NPWP',
    required: true,
    fileName: 'Kartu_NPWP_PT_Sinar_Terang.jpg',
    fileSize: '950 KB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:32',
    previewUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'invoice_konsumen',
    label: 'INVOICE KONSUMEN',
    required: true,
    fileName: 'Contoh_Invoice_Penjualan_Toko.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    uploadedAt: '17 Sep 2026 08:33',
  },
  {
    id: 'cap_logo_dealer',
    label: 'CAP LOGO DEALER',
    required: true,
    fileName: 'Cap_Stempel_Logo_Toko.png',
    fileSize: '540 KB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:34',
    previewUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto_luar_1',
    label: 'FOTO DEALER (TAMPAK LUAR, LOGO TOKO DAN BILLBOARD) 1',
    required: true,
    fileName: 'Foto_Dealer_Luar_Billboard_01.jpg',
    fileSize: '3.8 MB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:35',
    previewUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto_luar_2',
    label: 'FOTO DEALER (TAMPAK LUAR, LOGO TOKO DAN BILLBOARD) 2',
    required: true,
    fileName: 'Foto_Dealer_Gedung_Depan_02.jpg',
    fileSize: '2.9 MB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:35',
    previewUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto_dalam_1',
    label: 'FOTO DEALER (TAMPAK DALAM) 1',
    required: true,
    fileName: 'Foto_Dealer_Showroom_Lantai1.jpg',
    fileSize: '4.2 MB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:36',
    previewUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto_dalam_2',
    label: 'FOTO DEALER (TAMPAK DALAM) 2',
    required: true,
    fileName: 'Foto_Dealer_Display_Appliances_Lantai2.jpg',
    fileSize: '3.5 MB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:37',
    previewUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'perjanjian_dealership',
    label: 'PERJANJIAN DEALERSHIP',
    required: false,
    fileName: 'Draf_Perjanjian_Kemitraan_Modena.pdf',
    fileSize: '1.6 MB',
    fileType: 'pdf',
    uploadedAt: '17 Sep 2026 08:38',
  },
  {
    id: 'foto_display_kitchen',
    label: 'FOTO DISPLAY KITCHEN',
    required: false,
    fileName: 'Kitchen_Set_Display_Modena.jpg',
    fileSize: '3.1 MB',
    fileType: 'image',
    uploadedAt: '17 Sep 2026 08:39',
    previewUrl: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'form_insurance_membership',
    label: 'FORM PERNYATAAN INSURANCE MEMBERSHIP',
    required: false,
    fileName: '',
  },
  {
    id: 'copy_pbb',
    label: 'COPY PBB',
    required: false,
    fileName: '',
  },
];

export const StepDokumenLampiran: React.FC<StepDokumenLampiranProps> = () => {
  const [docList, setDocList] = useState<UploadedFileItem[]>(INITIAL_DOCUMENTS);
  const [previewItem, setPreviewItem] = useState<UploadedFileItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Reset zoom when preview opens
  useEffect(() => {
    if (previewItem) {
      setZoomLevel(1);
    }
  }, [previewItem]);

  // Keyboard Escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewItem) {
        setPreviewItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewItem]);

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isDoc = file.name.endsWith('.doc') || file.name.endsWith('.docx');
    const isSheet = file.name.endsWith('.xls') || file.name.endsWith('.xlsx');

    const fileType: 'image' | 'pdf' | 'doc' | 'sheet' = isImage
      ? 'image'
      : isPdf
      ? 'pdf'
      : isDoc
      ? 'doc'
      : isSheet
      ? 'sheet'
      : 'pdf';

    const objectUrl = isImage ? URL.createObjectURL(file) : undefined;
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    setDocList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            file,
            previewUrl: objectUrl,
            fileName: file.name,
            fileSize: sizeInMB,
            fileType,
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
    setDocList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            file: undefined,
            previewUrl: undefined,
            fileName: '',
            fileSize: '',
            uploadedAt: '',
          };
        }
        return item;
      })
    );
  };

  const uploadedCount = docList.filter(d => !!d.fileName).length;
  const mandatoryCount = docList.filter(d => d.required).length;
  const uploadedMandatoryCount = docList.filter(d => d.required && !!d.fileName).length;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Overview Status Banner */}
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
      }}>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#09090b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Status Kelengkapan Dokumen & Foto</span>
            <span style={{
              backgroundColor: uploadedMandatoryCount === mandatoryCount ? '#ecfdf5' : '#fef3c7',
              color: uploadedMandatoryCount === mandatoryCount ? '#047857' : '#b45309',
              fontSize: '0.725rem',
              fontWeight: 700,
              padding: '0.15rem 0.6rem',
              borderRadius: '9999px',
              border: `1px solid ${uploadedMandatoryCount === mandatoryCount ? '#a7f3d0' : '#fde68a'}`
            }}>
              {uploadedMandatoryCount} dari {mandatoryCount} Dokumen Wajib Terunggah
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
            Format didukung: <strong>JPEG, JPG, PNG, PDF, XLS, XLSX, DOC</strong>. Klik pada gambar foto atau dokumen untuk melihat tampilan layar penuh (HD Preview).
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.775rem', color: '#52525b', fontWeight: 600 }}>Total Berkas: {uploadedCount} / {docList.length}</span>
        </div>
      </div>

      {/* Main Table Matching User Legacy Screenshot */}
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
            <tr style={{ backgroundColor: '#d1d5db', borderBottom: '1px solid #9ca3af' }}>
              <th colSpan={2} style={{ padding: '0.75rem 1.25rem', color: '#09090b', fontSize: '0.825rem', fontWeight: 800, letterSpacing: '0.02em' }}>
                UPLOAD :: Pilih file upload sesuai dengan kolom yang dimaksud. <u>File upload berekstensi JPEG, JPG, PNG, PDF, XLS, XLSX, DOC.</u>
              </th>
            </tr>
          </thead>
          <tbody>
            {docList.map((doc, idx) => {
              const isUploaded = !!doc.fileName;

              return (
                <tr
                  key={doc.id}
                  style={{
                    borderBottom: '1px solid #e4e4e7',
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                  }}
                >
                  {/* Left Column: Label */}
                  <td style={{
                    width: '380px',
                    minWidth: '280px',
                    padding: '0.85rem 1.25rem',
                    borderRight: '1px solid #e4e4e7',
                    verticalAlign: 'middle',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#09090b',
                    letterSpacing: '0.02em',
                  }}>
                    {doc.label} {doc.required && <span style={{ color: '#dc2626' }}>*</span>}
                  </td>

                  {/* Right Column: Upload Input + Direct Inline Preview matching screenshot */}
                  <td style={{
                    padding: '0.75rem 1.25rem',
                    verticalAlign: 'middle',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1.25rem',
                    }}>
                      {/* Left: Input File Trigger and Meta */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, minWidth: '260px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <input
                            type="file"
                            ref={el => {
                              fileInputRefs.current[doc.id] = el;
                            }}
                            style={{ display: 'none' }}
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
                            onChange={(e) => handleFileChange(doc.id, e)}
                          />

                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[doc.id]?.click()}
                            style={{
                              backgroundColor: '#f4f4f5',
                              border: '1px solid #d4d4d8',
                              borderRadius: '4px',
                              padding: '0.35rem 0.85rem',
                              fontSize: '0.785rem',
                              fontWeight: 600,
                              color: '#18181b',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.15s ease',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e4e4e7')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f4f4f5')}
                          >
                            <Upload size={14} />
                            <span>{isUploaded ? 'Ganti File' : 'Choose File'}</span>
                          </button>

                          <span style={{
                            fontSize: '0.8rem',
                            color: isUploaded ? '#09090b' : '#71717a',
                            fontWeight: isUploaded ? 600 : 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '320px'
                          }}>
                            {isUploaded ? doc.fileName : 'No file chosen'}
                          </span>
                        </div>

                        {/* File Details & Remove action if uploaded */}
                        {isUploaded && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.725rem', color: '#64748b' }}>
                            <span>Ukuran: <strong>{doc.fileSize}</strong></span>
                            <span>•</span>
                            <span>Waktu: <strong>{doc.uploadedAt}</strong></span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(doc.id)}
                              style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#dc2626',
                                cursor: 'pointer',
                                padding: 0,
                                fontSize: '0.725rem',
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                marginLeft: '0.35rem'
                              }}
                              title="Hapus berkas ini"
                            >
                              <Trash2 size={12} /> Hapus
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Right: Direct Preview Display (Exact layout as shown in screenshot!) */}
                      {isUploaded && (
                        <div>
                          {doc.previewUrl ? (
                            /* Photo / Image Preview Card (Prominent & Clickable) */
                            <div
                              onClick={() => setPreviewItem(doc)}
                              style={{
                                position: 'relative',
                                width: '185px',
                                height: '115px',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                border: '2px solid #cbd5e1',
                                cursor: 'pointer',
                                backgroundColor: '#18181b',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              }}
                              title="Klik untuk membuka preview lebih besar (HD Lightbox)"
                              onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.borderColor = '#09090b';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.borderColor = '#cbd5e1';
                              }}
                            >
                              <img
                                src={doc.previewUrl}
                                alt={doc.label}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  display: 'block'
                                }}
                              />

                              {/* Hover overlay hint */}
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  backgroundColor: 'rgba(9, 9, 11, 0.45)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.25rem',
                                  color: '#ffffff',
                                  opacity: 0,
                                  transition: 'opacity 0.2s ease',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                              >
                                <Maximize2 size={20} />
                                <span style={{ fontSize: '0.725rem', fontWeight: 700 }}>Klik Perbesar</span>
                              </div>

                              {/* Corner badge indication */}
                              <div style={{
                                position: 'absolute',
                                bottom: '5px',
                                right: '5px',
                                backgroundColor: 'rgba(9, 9, 11, 0.8)',
                                color: '#ffffff',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                fontSize: '0.625rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                backdropFilter: 'blur(2px)'
                              }}>
                                <Eye size={10} /> Preview HD
                              </div>
                            </div>
                          ) : (
                            /* PDF / Document Preview Card (Clickable) */
                            <div
                              onClick={() => setPreviewItem(doc)}
                              style={{
                                width: '185px',
                                height: '115px',
                                borderRadius: '6px',
                                border: '1px dashed #94a3b8',
                                backgroundColor: '#f8fafc',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.4rem',
                                padding: '0.5rem',
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                              }}
                              title="Klik untuk membuka dokumen PDF"
                              onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#f1f5f9';
                                e.currentTarget.style.borderColor = '#0284c7';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#f8fafc';
                                e.currentTarget.style.borderColor = '#94a3b8';
                              }}
                            >
                              <FileText size={28} color="#0284c7" />
                              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#0369a1' }}>
                                {doc.fileType === 'pdf' ? 'Dokumen PDF' : 'Dokumen Berkas'}
                              </span>
                              <span style={{
                                backgroundColor: '#0284c7',
                                color: '#ffffff',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}>
                                <Eye size={10} /> Buka Preview
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= LIGHTBOX / FULL-SIZE PREVIEW MODAL ================= */}
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
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '92vh',
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
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {previewItem.fileType === 'image' ? (
                  <div style={{ backgroundColor: '#09090b', color: '#ffffff', padding: '0.4rem', borderRadius: '6px' }}>
                    <ImageIcon size={18} />
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '0.4rem', borderRadius: '6px' }}>
                    <FileText size={18} />
                  </div>
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <h3 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                      {previewItem.label}
                    </h3>
                    <span style={{
                      backgroundColor: '#e4e4e7',
                      color: '#09090b',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px'
                    }}>
                      PREVIEW RESOLUSI PENUH
                    </span>
                  </div>
                  <p style={{ fontSize: '0.725rem', color: '#71717a', margin: '0.15rem 0 0' }}>
                    {previewItem.fileName} • {previewItem.fileSize} • Terunggah: {previewItem.uploadedAt}
                  </p>
                </div>
              </div>

              {/* Zoom & Action Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {previewItem.fileType === 'image' && (
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
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#18181b'
                      }}
                      title="Perkecil (-)"
                    >
                      <ZoomOut size={15} />
                    </button>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, minWidth: '40px', textAlign: 'center', color: '#09090b' }}>
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#18181b'
                      }}
                      title="Perbesar (+)"
                    >
                      <ZoomIn size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#71717a'
                      }}
                      title="Reset Zoom"
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
                  title="Tutup Preview (Esc)"
                >
                  <X size={16} /> Tutup
                </button>
              </div>
            </div>

            {/* Modal Body: Full Image or PDF Document Canvas */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#09090b',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '440px',
              maxHeight: 'calc(92vh - 120px)'
            }}>
              {previewItem.fileType === 'image' && previewItem.previewUrl ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  overflow: 'auto',
                  padding: '1rem'
                }}>
                  <img
                    src={previewItem.previewUrl}
                    alt={previewItem.label}
                    style={{
                      maxWidth: zoomLevel <= 1 ? '100%' : 'none',
                      maxHeight: zoomLevel <= 1 ? '70vh' : 'none',
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.15s ease-out',
                      borderRadius: '6px',
                      objectFit: 'contain',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
                    }}
                  />
                </div>
              ) : (
                /* PDF Interactive Document Preview */
                <div style={{
                  backgroundColor: '#ffffff',
                  width: '100%',
                  maxWidth: '700px',
                  minHeight: '460px',
                  borderRadius: '8px',
                  padding: '2.5rem 2.25rem',
                  color: '#09090b',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '2px solid #09090b',
                      paddingBottom: '0.85rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '0.05em' }}>
                          PT MODENA CENTRO INDONESIA
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          PORTAL FPDB • ARSIP RESMI DOKUMEN DEALER
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          backgroundColor: '#ecfdf5',
                          color: '#059669',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.725rem',
                          fontWeight: 800,
                          border: '1px solid #a7f3d0'
                        }}>
                          VALIDATED ARTIFACT
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                        Jenis Dokumen Legalitas:
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#09090b' }}>
                        {previewItem.label}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      fontSize: '0.825rem',
                      lineHeight: 1.6,
                      color: '#334155'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '0.4rem', marginBottom: '0.75rem' }}>
                        <span style={{ color: '#64748b' }}>Nama Dokumen:</span>
                        <strong style={{ color: '#09090b' }}>{previewItem.fileName}</strong>
                        <span style={{ color: '#64748b' }}>Ukuran Berkas:</span>
                        <strong style={{ color: '#09090b' }}>{previewItem.fileSize}</strong>
                        <span style={{ color: '#64748b' }}>Status Sistem:</span>
                        <span style={{ color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={14} /> Terverifikasi untuk Proses Approval FPDB
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.775rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                        Dokumen digital ini diunggah secara sah oleh Salesman/Area Manager sebagai persyaratan pengajuan dealer baru atau pembaruan limit plafon PT Modena Centro Indonesia.
                      </p>
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    <span>Halaman 1 dari 1 (Dokumen Lengkap)</span>
                    <span>Waktu Unggah: {previewItem.uploadedAt}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid #e4e4e7',
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#71717a' }}>
                Tekan tombol <strong>Esc</strong> atau klik di luar kotak untuk menutup. Gunakan kontrol zoom di atas untuk memperbesar.
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  style={{
                    backgroundColor: '#09090b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.45rem 1.15rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Tutup Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
