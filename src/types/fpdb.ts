export type BusinessType = 'PT' | 'CV' | 'UD' | 'Perorangan';

export type PaymentTerm = 
  | 'Cash Before Delivery'
  | 'Cash On Delivery'
  | '14 Hari'
  | '30 Hari'
  | '45 Hari'
  | '60 Hari';

export type StoreCategory = 
  | 'Toko Elektronik / Home Appliances'
  | 'Modern Trade Independent (MTI)'
  | 'Traditional Wholesale'
  | 'Kitchenware & Furniture Gallery';

export type FPDBStatus = 
  | 'Draft'
  | 'Menunggu Review Branch Manager'
  | 'Review Regional BD Sr. Mgr'
  | 'Review Finance'
  | 'Menunggu Review Sales Manager'
  | 'Review Credit Control'
  | 'Butuh Revisi'
  | 'Disetujui'
  | 'Ditolak';

export interface Dealer {
  id: string;
  code: string; // SAP Customer Code
  name: string;
  businessType: BusinessType;
  category: StoreCategory;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  operatingYears: number;
  
  // PIC / Owner Info
  ownerName: string;
  ownerNik: string;
  ownerPhone: string;
  ownerNpwp: string;
  ownerAddress: string;

  // Financial Info
  creditLimit: number;
  paymentTerm: PaymentTerm;
  monthlySalesAvg: number;
  status: 'Aktif' | 'Nonaktif' | 'Dalam Penyesuaian';
  joinedDate: string;
  assignedSalesman: string;
}

export interface DocumentAttachment {
  id: string;
  name: string;
  description: string;
  required: boolean;
  isUploaded: boolean;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
}

export interface ApprovalLog {
  stage: string;
  actor: string;
  role: string;
  date: string;
  status: 'SUBMITTED' | 'IN_PROGRESS' | 'REVISED' | 'APPROVED' | 'REJECTED';
  comment?: string;
}

export interface FPDBSubmission {
  id: string;
  submissionType: 'NEW_DEALER' | 'EDIT_DEALER';
  dealerId?: string;
  targetDealerCode?: string;
  changeSummary?: string[]; // Ringkasan kolom yang diubah jika EDIT_DEALER
  
  status: FPDBStatus;
  createdAt: string;
  updatedAt: string;
  salesman: {
    name: string;
    nik: string;
    region: string;
    branch: string;
  };

  // Step 1: Profil Toko
  storeProfile: {
    name: string;
    businessType: BusinessType;
    category: StoreCategory;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
    email: string;
    operatingYears: number;
    shopAreaM2: number;
    ownershipStatus: 'Milik Sendiri' | 'Sewa / Kontrak';
  };

  // Step 2: Data Pemilik / PIC
  ownerProfile: {
    fullName: string;
    nik: string;
    phone: string;
    waNumber: string;
    npwp: string;
    homeAddress: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyRelation: string;
  };

  // Step 3: Pengajuan Finansial
  financialRequest: {
    requestedLimit: number;
    existingLimit?: number; // Kalau edit
    paymentTerm: PaymentTerm;
    existingPaymentTerm?: PaymentTerm; // Kalau edit
    estimatedMonthlyPurchase: number;
    bankName: string;
    bankAccountNumber: string;
    bankAccountHolder: string;
    justificationNote: string;
  };

  // Step 4: Lampiran Dokumen
  attachments: DocumentAttachment[];

  // Logs & Notes
  approvalLogs: ApprovalLog[];
  revisionNote?: string;
}

// -------------------------------------------------------------
// Approval Matrix & Role Management Types (SOP FPDB)
// -------------------------------------------------------------
export type CustomerChannel = 
  | 'BRANCH'
  | 'MODERN_MARKET_KAM'
  | 'PROFESSIONAL_APPLIANCE'
  | 'DISTRIBUTOR'
  | 'SOLAR_PUSAT'
  | 'FURNITURE_MDS'
  | 'PROJECT';

export interface ApprovalMatrixTier {
  id: string;
  limitLabel: string;
  minLimit: number;
  maxLimit: number; // e.g. 150_000_000, 350_000_000, 600_000_000, Infinity
  creatorRole: string;
  approvers: string[];
}

export interface ChannelApprovalMatrix {
  id: string;
  channelCode: CustomerChannel;
  channelName: string;
  letterCode: string; // a, b, c, d, e, f, g
  creatorTitle: string;
  description: string;
  tiers: ApprovalMatrixTier[];
}

export interface SystemUser {
  id: string;
  nik: string;
  name: string;
  email: string;
  role: string;
  roleCategory: 'SALES' | 'MANAGEMENT' | 'CREDIT_CONTROL' | 'EXECUTIVE' | 'ADMIN';
  department: string;
  branchOrRegion: string;
  phone: string;
  status: 'Aktif' | 'Nonaktif';
  canApproveLimit: boolean;
  approvalAuthorityLevel?: string;
}
