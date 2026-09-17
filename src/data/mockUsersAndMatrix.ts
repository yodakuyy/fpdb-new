import type { ChannelApprovalMatrix, SystemUser } from '../types/fpdb';

export const mockApprovalMatrices: ChannelApprovalMatrix[] = [
  {
    id: 'matrix-a',
    letterCode: 'a',
    channelCode: 'BRANCH',
    channelName: 'Kredit Limit Dealer di Branch / Cabang',
    creatorTitle: 'Sales Dealer',
    description: 'Dealer ritel, toko elektronik, dan channel cabang regional.',
    tiers: [
      {
        id: 'branch-1',
        limitLabel: '≤ Rp 150.000.000',
        minLimit: 0,
        maxLimit: 150000000,
        creatorRole: 'Sales Dealer',
        approvers: ['Regional BBD Senior Manager']
      },
      {
        id: 'branch-2',
        limitLabel: '> Rp 150.000.000 s/d ≤ Rp 350.000.000',
        minLimit: 150000001,
        maxLimit: 350000000,
        creatorRole: 'Sales Dealer',
        approvers: ['Regional BBD Senior Manager', 'Dealership BD Vice President']
      },
      {
        id: 'branch-3',
        limitLabel: '> Rp 350.000.000 s/d ≤ Rp 600.000.000',
        minLimit: 350000001,
        maxLimit: 600000000,
        creatorRole: 'Sales Dealer',
        approvers: ['Regional BBD Senior Manager', 'Dealership BD Vice President', 'Customer Management EVP']
      },
      {
        id: 'branch-4',
        limitLabel: '> Rp 600.000.000',
        minLimit: 600000001,
        maxLimit: Infinity,
        creatorRole: 'Sales Dealer',
        approvers: ['Regional BBD Senior Manager', 'Dealership BD Vice President', 'Customer Management EVP', 'Chief Operating Officer']
      }
    ]
  },
  {
    id: 'matrix-b',
    letterCode: 'b',
    channelCode: 'MODERN_MARKET_KAM',
    channelName: 'Kredit Limit Dealer di Modern Market / KAM',
    creatorTitle: 'Key Account Sales (KAM)',
    description: 'Modern trade ritel nasional / Key Account Department.',
    tiers: [
      {
        id: 'kam-1',
        limitLabel: '≤ Rp 150.000.000',
        minLimit: 0,
        maxLimit: 150000000,
        creatorRole: 'Key Account Sales (KAM)',
        approvers: ['KAM Senior Manager']
      },
      {
        id: 'kam-2',
        limitLabel: '> Rp 150.000.000 s/d ≤ Rp 350.000.000',
        minLimit: 150000001,
        maxLimit: 350000000,
        creatorRole: 'Key Account Sales (KAM)',
        approvers: ['KAM Senior Manager', 'Dealership BD Vice President']
      },
      {
        id: 'kam-3',
        limitLabel: '> Rp 350.000.000 s/d ≤ Rp 600.000.000',
        minLimit: 350000001,
        maxLimit: 600000000,
        creatorRole: 'Key Account Sales (KAM)',
        approvers: ['KAM Senior Manager', 'Dealership BD Vice President', 'Customer Management EVP']
      },
      {
        id: 'kam-4',
        limitLabel: '> Rp 600.000.000',
        minLimit: 600000001,
        maxLimit: Infinity,
        creatorRole: 'Key Account Sales (KAM)',
        approvers: ['KAM Senior Manager', 'Dealership BD Vice President', 'Customer Management EVP', 'Chief Operating Officer']
      }
    ]
  },
  {
    id: 'matrix-c',
    letterCode: 'c',
    channelCode: 'PROFESSIONAL_APPLIANCE',
    channelName: 'Kredit Limit Dealer di Professional Appliance',
    creatorTitle: 'Professional Appliance Sales Dealer',
    description: 'Lini produk komersial, HORECA, dan peralatan dapur profesional.',
    tiers: [
      {
        id: 'pro-1',
        limitLabel: '≤ Rp 150.000.000',
        minLimit: 0,
        maxLimit: 150000000,
        creatorRole: 'Professional Appliance Sales Dealer',
        approvers: ['Professional BD Senior Manager']
      },
      {
        id: 'pro-2',
        limitLabel: '> Rp 150.000.000 s/d ≤ Rp 350.000.000',
        minLimit: 150000001,
        maxLimit: 350000000,
        creatorRole: 'Professional Appliance Sales Dealer',
        approvers: ['Professional BD Senior Manager', 'Dealership BD Vice President']
      },
      {
        id: 'pro-3',
        limitLabel: '> Rp 350.000.000 s/d ≤ Rp 600.000.000',
        minLimit: 350000001,
        maxLimit: 600000000,
        creatorRole: 'Professional Appliance Sales Dealer',
        approvers: ['Professional BD Senior Manager', 'Dealership BD Vice President', 'Customer Management EVP']
      },
      {
        id: 'pro-4',
        limitLabel: '> Rp 600.000.000',
        minLimit: 600000001,
        maxLimit: Infinity,
        creatorRole: 'Professional Appliance Sales Dealer',
        approvers: ['Professional BD Senior Manager', 'Dealership BD Vice President', 'Customer Management EVP', 'Chief Operating Officer']
      }
    ]
  },
  {
    id: 'matrix-d',
    letterCode: 'd',
    channelCode: 'DISTRIBUTOR',
    channelName: 'Kredit Limit Distributor',
    creatorTitle: 'Sales Distributor',
    description: 'Mitra distributor regional resmi dengan coverage luas.',
    tiers: [
      {
        id: 'dist-1',
        limitLabel: '≤ Rp 350.000.000',
        minLimit: 0,
        maxLimit: 350000000,
        creatorRole: 'Sales Distributor',
        approvers: ['Distributor Manager', 'Dealership BD Vice President']
      },
      {
        id: 'dist-2',
        limitLabel: '> Rp 350.000.000 s/d ≤ Rp 600.000.000',
        minLimit: 350000001,
        maxLimit: 600000000,
        creatorRole: 'Sales Distributor',
        approvers: ['Distributor Manager', 'Dealership BD Vice President', 'Customer Management EVP']
      },
      {
        id: 'dist-3',
        limitLabel: '> Rp 600.000.000',
        minLimit: 600000001,
        maxLimit: Infinity,
        creatorRole: 'Sales Distributor',
        approvers: ['Distributor Manager', 'Dealership BD Vice President', 'Customer Management EVP', 'Chief Operating Officer']
      }
    ]
  },
  {
    id: 'matrix-e',
    letterCode: 'e',
    channelCode: 'SOLAR_PUSAT',
    channelName: 'Kredit Limit untuk Dealer di Solar (Pusat)',
    creatorTitle: 'Sales Dealer',
    description: 'Dealer sistem energi terbarukan / Modena Solar (Pusat).',
    tiers: [
      {
        id: 'solar-1',
        limitLabel: '≤ Rp 350.000.000',
        minLimit: 0,
        maxLimit: 350000000,
        creatorRole: 'Sales Dealer',
        approvers: ['Solar Business Development AVP']
      },
      {
        id: 'solar-2',
        limitLabel: '> Rp 350.000.000',
        minLimit: 350000001,
        maxLimit: Infinity,
        creatorRole: 'Sales Dealer',
        approvers: ['Solar Business Development AVP', 'President Director']
      }
    ]
  },
  {
    id: 'matrix-f',
    letterCode: 'f',
    channelCode: 'FURNITURE_MDS',
    channelName: 'Kredit Limit untuk Dealer di Furniture & MDS',
    creatorTitle: 'Sales Furniture / Sales MDS',
    description: 'Showroom interior/kitchen furniture & Modern Department Store (MDS).',
    tiers: [
      {
        id: 'furn-1',
        limitLabel: '≤ Rp 350.000.000',
        minLimit: 0,
        maxLimit: 350000000,
        creatorRole: 'Sales Furniture / Sales MDS',
        approvers: ['Prive BD AVP', 'President Director']
      },
      {
        id: 'furn-2',
        limitLabel: '> Rp 350.000.000',
        minLimit: 350000001,
        maxLimit: Infinity,
        creatorRole: 'Sales Furniture / Sales MDS',
        approvers: ['Prive BD AVP', 'President Director']
      }
    ]
  },
  {
    id: 'matrix-g',
    letterCode: 'g',
    channelCode: 'PROJECT',
    channelName: 'Kredit Limit untuk Dealer di Project',
    creatorTitle: 'Sales Project',
    description: 'Pengadaan B2B proyek apartemen, gedung residensial, & perhotelan.',
    tiers: [
      {
        id: 'proj-1',
        limitLabel: '≤ Rp 350.000.000',
        minLimit: 0,
        maxLimit: 350000000,
        creatorRole: 'Sales Project',
        approvers: ['Project BD Senior Manager', 'Direct BD Vice President']
      },
      {
        id: 'proj-2',
        limitLabel: '> Rp 350.000.000 s/d ≤ Rp 600.000.000',
        minLimit: 350000001,
        maxLimit: 600000000,
        creatorRole: 'Sales Project',
        approvers: ['Project BD Senior Manager', 'Direct BD Vice President', 'Customer Management EVP']
      },
      {
        id: 'proj-3',
        limitLabel: '> Rp 600.000.000',
        minLimit: 600000001,
        maxLimit: Infinity,
        creatorRole: 'Sales Project',
        approvers: ['Project BD Senior Manager', 'Direct BD Vice President', 'Customer Management EVP', 'Chief Operating Officer']
      }
    ]
  }
];

export const mockSystemUsers: SystemUser[] = [
  {
    id: 'usr-001',
    nik: 'SLS-2021-089',
    name: 'Rian Prasetya',
    email: 'rian.prasetya@modena.com',
    role: 'Senior Field Sales Executive',
    roleCategory: 'SALES',
    department: 'Branch Sales Jawa Barat',
    branchOrRegion: 'Bandung Hub',
    phone: '0812-3344-5566',
    status: 'Aktif',
    canApproveLimit: false
  },
  {
    id: 'usr-002',
    nik: 'MGR-2018-012',
    name: 'Dedi Kurniawan',
    email: 'dedi.kurniawan@modena.com',
    role: 'Regional BBD Senior Manager',
    roleCategory: 'MANAGEMENT',
    department: 'Regional Sales & Business Dev',
    branchOrRegion: 'Jawa Barat Hub',
    phone: '0811-2233-4455',
    status: 'Aktif',
    canApproveLimit: true,
    approvalAuthorityLevel: 'Hingga Rp 150.000.000 (Otoritas Tunggal) & Verifikator Tingkat 1'
  },
  {
    id: 'usr-003',
    nik: 'VPE-2016-004',
    name: 'Hendra Tanudjaya',
    email: 'hendra.tanudjaya@modena.com',
    role: 'Dealership BD Vice President',
    roleCategory: 'MANAGEMENT',
    department: 'Dealership Business Development',
    branchOrRegion: 'Head Office - Jakarta Pusat',
    phone: '0813-8899-0011',
    status: 'Aktif',
    canApproveLimit: true,
    approvalAuthorityLevel: 'Hingga Rp 350.000.000 (Tier 2 National)'
  },
  {
    id: 'usr-004',
    nik: 'EVP-2015-002',
    name: 'Stephanie Wijaya',
    email: 'stephanie.wijaya@modena.com',
    role: 'Customer Management EVP',
    roleCategory: 'EXECUTIVE',
    department: 'Customer Management Division',
    branchOrRegion: 'Head Office - Jakarta Pusat',
    phone: '0812-7788-9900',
    status: 'Aktif',
    canApproveLimit: true,
    approvalAuthorityLevel: 'Hingga Rp 600.000.000 (Tier 3 Corporate)'
  },
  {
    id: 'usr-005',
    nik: 'COO-2014-001',
    name: 'Ir. Michael Santoso, M.B.A.',
    email: 'michael.santoso@modena.com',
    role: 'Chief Operating Officer',
    roleCategory: 'EXECUTIVE',
    department: 'Direksi & Operasional',
    branchOrRegion: 'Head Office - Jakarta Pusat',
    phone: '0811-9988-7766',
    status: 'Aktif',
    canApproveLimit: true,
    approvalAuthorityLevel: 'Diatas Rp 600.000.000 (Otoritas Tertinggi Operasional)'
  },
  {
    id: 'usr-006',
    nik: 'DIR-2010-001',
    name: 'Hartono Tedjo',
    email: 'hartono.tedjo@modena.com',
    role: 'President Director',
    roleCategory: 'EXECUTIVE',
    department: 'Board of Directors',
    branchOrRegion: 'Head Office - Jakarta Pusat',
    phone: '0811-1122-3344',
    status: 'Aktif',
    canApproveLimit: true,
    approvalAuthorityLevel: 'Pusat (Solar, Furniture & MDS, Strategic Partners)'
  },
  {
    id: 'usr-007',
    nik: 'CRD-2019-033',
    name: 'Maya Sari, S.E., Ak.',
    email: 'maya.sari@modena.com',
    role: 'Head of Credit Control Risk & Compliance',
    roleCategory: 'CREDIT_CONTROL',
    department: 'Finance & Credit Risk',
    branchOrRegion: 'Head Office - Jakarta Pusat',
    phone: '0812-4455-6677',
    status: 'Aktif',
    canApproveLimit: true,
    approvalAuthorityLevel: 'Verifikasi Legalitas & Analisis BI Checking/SLIK'
  },
  {
    id: 'usr-008',
    nik: 'KAM-2022-045',
    name: 'Kevin Anggara',
    email: 'kevin.anggara@modena.com',
    role: 'Key Account Sales (KAM)',
    roleCategory: 'SALES',
    department: 'Modern Market / KAM Department',
    branchOrRegion: 'National Hub',
    phone: '0813-5566-7788',
    status: 'Aktif',
    canApproveLimit: false
  },
  {
    id: 'usr-009',
    nik: 'KMR-2017-018',
    name: 'Sandra Dewanti',
    email: 'sandra.dewanti@modena.com',
    role: 'KAM Senior Manager',
    roleCategory: 'MANAGEMENT',
    department: 'Modern Market Division',
    branchOrRegion: 'National Hub',
    phone: '0812-9900-1122',
    status: 'Aktif',
    canApproveLimit: true,
    approvalAuthorityLevel: 'Hingga Rp 150.000.000 (KAM Tier 1)'
  },
  {
    id: 'usr-010',
    nik: 'PRJ-2020-055',
    name: 'Budi Raharjo',
    email: 'budi.raharjo@modena.com',
    role: 'Sales Project',
    roleCategory: 'SALES',
    department: 'Project & B2B Commercial',
    branchOrRegion: 'Jabodetabek & Jabar Hub',
    phone: '0812-6677-8899',
    status: 'Aktif',
    canApproveLimit: false
  }
];
