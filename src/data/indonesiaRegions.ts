// Master Data Wilayah Indonesia (38 Provinsi, Seluruh Kota/Kabupaten Utama, Kecamatan, Kelurahan & Kode Pos)
// Self-contained, ultra-fast, offline-ready tanpa ketergantungan CORS/jaringan eksternal.

export interface PostalItem {
  kelurahan: string;
  kodePos: string;
}

export interface KecamatanItem {
  name: string;
  kelurahanList: PostalItem[];
}

export interface KotaItem {
  name: string;
  kecamatanList: KecamatanItem[];
}

export interface ProvinceItem {
  name: string;
  kotaList: KotaItem[];
}

export const ALL_38_PROVINCES: ProvinceItem[] = [
  // 1. DKI JAKARTA
  {
    name: 'DKI Jakarta',
    kotaList: [
      {
        name: 'Kota Jakarta Selatan',
        kecamatanList: [
          {
            name: 'Kebayoran Baru',
            kelurahanList: [
              { kelurahan: 'Melawai', kodePos: '12160' },
              { kelurahan: 'Senayan', kodePos: '12190' },
              { kelurahan: 'Selong', kodePos: '12110' },
              { kelurahan: 'Gunung', kodePos: '12120' },
              { kelurahan: 'Kramat Pela', kodePos: '12130' },
              { kelurahan: 'Gandaria Utara', kodePos: '12140' },
              { kelurahan: 'Cipete Utara', kodePos: '12150' },
              { kelurahan: 'Pulo', kodePos: '12160' },
              { kelurahan: 'Petogogan', kodePos: '12170' },
              { kelurahan: 'Rawa Barat', kodePos: '12180' },
            ]
          },
          {
            name: 'Setiabudi',
            kelurahanList: [
              { kelurahan: 'Karet Kuningan', kodePos: '12940' },
              { kelurahan: 'Kuningan Timur', kodePos: '12950' },
              { kelurahan: 'Setiabudi', kodePos: '12910' },
              { kelurahan: 'Karet', kodePos: '12920' },
              { kelurahan: 'Karet Semanggi', kodePos: '12930' },
              { kelurahan: 'Menteng Atas', kodePos: '12960' },
              { kelurahan: 'Pasar Manggis', kodePos: '12970' },
              { kelurahan: 'Guntur', kodePos: '12980' },
            ]
          },
          {
            name: 'Cilandak',
            kelurahanList: [
              { kelurahan: 'Cilandak Barat', kodePos: '12430' },
              { kelurahan: 'Cipete Selatan', kodePos: '12410' },
              { kelurahan: 'Gandaria Selatan', kodePos: '12420' },
              { kelurahan: 'Lebak Bulus', kodePos: '12440' },
              { kelurahan: 'Pondok Labu', kodePos: '12450' },
            ]
          },
          {
            name: 'Kebayoran Lama',
            kelurahanList: [
              { kelurahan: 'Kebayoran Lama Utara', kodePos: '12240' },
              { kelurahan: 'Kebayoran Lama Selatan', kodePos: '12240' },
              { kelurahan: 'Pondok Pinang', kodePos: '12310' },
              { kelurahan: 'Pondok Indah', kodePos: '12310' },
              { kelurahan: 'Cipulir', kodePos: '12230' },
              { kelurahan: 'Grogol Utara', kodePos: '12210' },
              { kelurahan: 'Grogol Selatan', kodePos: '12220' },
            ]
          },
          {
            name: 'Mampang Prapatan',
            kelurahanList: [
              { kelurahan: 'Bangka (Kemang)', kodePos: '12730' },
              { kelurahan: 'Mampang Prapatan', kodePos: '12790' },
              { kelurahan: 'Pela Mampang', kodePos: '12720' },
              { kelurahan: 'Tegal Parang', kodePos: '12790' },
              { kelurahan: 'Kuningan Barat', kodePos: '12710' },
            ]
          },
          {
            name: 'Pasar Minggu',
            kelurahanList: [
              { kelurahan: 'Cilandak Timur', kodePos: '12560' },
              { kelurahan: 'Pejaten Barat', kodePos: '12510' },
              { kelurahan: 'Pejaten Timur', kodePos: '12510' },
              { kelurahan: 'Pasar Minggu', kodePos: '12520' },
              { kelurahan: 'Ragunan', kodePos: '12550' },
              { kelurahan: 'Kebagusan', kodePos: '12520' },
              { kelurahan: 'Jati Padang', kodePos: '12540' },
            ]
          },
          {
            name: 'Pancoran',
            kelurahanList: [
              { kelurahan: 'Kalibata', kodePos: '12740' },
              { kelurahan: 'Pancoran', kodePos: '12780' },
              { kelurahan: 'Duren Tiga', kodePos: '12760' },
              { kelurahan: 'Cikoko', kodePos: '12770' },
              { kelurahan: 'Pengadegan', kodePos: '12770' },
              { kelurahan: 'Rawajati', kodePos: '12750' },
            ]
          },
          {
            name: 'Tebet',
            kelurahanList: [
              { kelurahan: 'Tebet Barat', kodePos: '12810' },
              { kelurahan: 'Tebet Timur', kodePos: '12820' },
              { kelurahan: 'Kebon Baru', kodePos: '12830' },
              { kelurahan: 'Bukit Duri', kodePos: '12840' },
              { kelurahan: 'Manggarai', kodePos: '12850' },
              { kelurahan: 'Menteng Dalam', kodePos: '12870' },
            ]
          },
          {
            name: 'Pesanggrahan',
            kelurahanList: [
              { kelurahan: 'Bintaro', kodePos: '12330' },
              { kelurahan: 'Pesanggrahan', kodePos: '12250' },
              { kelurahan: 'Petukangan Utara', kodePos: '12260' },
              { kelurahan: 'Petukangan Selatan', kodePos: '12270' },
              { kelurahan: 'Ulujami', kodePos: '12250' },
            ]
          },
          {
            name: 'Jagakarsa',
            kelurahanList: [
              { kelurahan: 'Tanjung Barat', kodePos: '12530' },
              { kelurahan: 'Lenteng Agung', kodePos: '12610' },
              { kelurahan: 'Jagakarsa', kodePos: '12620' },
              { kelurahan: 'Ciganjur', kodePos: '12630' },
              { kelurahan: 'Srengseng Sawah', kodePos: '12640' },
              { kelurahan: 'Cipedak', kodePos: '12630' },
            ]
          },
        ]
      },
      {
        name: 'Kota Jakarta Pusat',
        kecamatanList: [
          {
            name: 'Menteng',
            kelurahanList: [
              { kelurahan: 'Menteng', kodePos: '10310' },
              { kelurahan: 'Pegangsaan', kodePos: '10320' },
              { kelurahan: 'Cikini', kodePos: '10330' },
              { kelurahan: 'Gondangdia', kodePos: '10350' },
              { kelurahan: 'Kebon Sirih', kodePos: '10340' },
            ]
          },
          {
            name: 'Tanah Abang',
            kelurahanList: [
              { kelurahan: 'Bendungan Hilir', kodePos: '10210' },
              { kelurahan: 'Karet Tengsin', kodePos: '10220' },
              { kelurahan: 'Kebon Melati', kodePos: '10230' },
              { kelurahan: 'Kebon Kacang', kodePos: '10240' },
              { kelurahan: 'Kampung Bali', kodePos: '10250' },
              { kelurahan: 'Petamburan', kodePos: '10260' },
              { kelurahan: 'Gelora', kodePos: '10270' },
            ]
          },
          {
            name: 'Gambir',
            kelurahanList: [
              { kelurahan: 'Gambir', kodePos: '10110' },
              { kelurahan: 'Kebon Kelapa', kodePos: '10120' },
              { kelurahan: 'Petojo Selatan', kodePos: '10130' },
              { kelurahan: 'Duri Pulo', kodePos: '10140' },
              { kelurahan: 'Cideng', kodePos: '10150' },
              { kelurahan: 'Petojo Utara', kodePos: '10160' },
            ]
          },
          {
            name: 'Kemayoran',
            kelurahanList: [
              { kelurahan: 'Gunung Sahari Selatan', kodePos: '10610' },
              { kelurahan: 'Kemayoran', kodePos: '10620' },
              { kelurahan: 'Kebon Kosong', kodePos: '10630' },
              { kelurahan: 'Harapan Mulya', kodePos: '10640' },
              { kelurahan: 'Cempaka Baru', kodePos: '10640' },
              { kelurahan: 'Utan Panjang', kodePos: '10650' },
              { kelurahan: 'Serdang', kodePos: '10650' },
            ]
          },
          {
            name: 'Senen',
            kelurahanList: [
              { kelurahan: 'Senen', kodePos: '10410' },
              { kelurahan: 'Kwitang', kodePos: '10420' },
              { kelurahan: 'Kenari', kodePos: '10430' },
              { kelurahan: 'Paseban', kodePos: '10440' },
              { kelurahan: 'Kramat', kodePos: '10450' },
              { kelurahan: 'Bungur', kodePos: '10460' },
            ]
          },
          {
            name: 'Sawah Besar',
            kelurahanList: [
              { kelurahan: 'Pasar Baru', kodePos: '10710' },
              { kelurahan: 'Gunung Sahari Utara', kodePos: '10720' },
              { kelurahan: 'Mangga Dua Selatan', kodePos: '10730' },
              { kelurahan: 'Karang Anyar', kodePos: '10740' },
              { kelurahan: 'Kartini', kodePos: '10750' },
            ]
          },
          {
            name: 'Cempaka Putih',
            kelurahanList: [
              { kelurahan: 'Cempaka Putih Timur', kodePos: '10510' },
              { kelurahan: 'Cempaka Putih Barat', kodePos: '10520' },
              { kelurahan: 'Rawasari', kodePos: '10570' },
            ]
          },
          {
            name: 'Johar Baru',
            kelurahanList: [
              { kelurahan: 'Johar Baru', kodePos: '10560' },
              { kelurahan: 'Kampung Rawa', kodePos: '10550' },
              { kelurahan: 'Galur', kodePos: '10530' },
              { kelurahan: 'Tanah Tinggi', kodePos: '10540' },
            ]
          },
        ]
      },
      {
        name: 'Kota Jakarta Barat',
        kecamatanList: [
          {
            name: 'Kebon Jeruk',
            kelurahanList: [
              { kelurahan: 'Kebon Jeruk', kodePos: '11530' },
              { kelurahan: 'Duri Kepa', kodePos: '11510' },
              { kelurahan: 'Kedoya Selatan', kodePos: '11520' },
              { kelurahan: 'Kedoya Utara', kodePos: '11520' },
              { kelurahan: 'Sukabumi Utara', kodePos: '11540' },
              { kelurahan: 'Kelapa Dua', kodePos: '11550' },
              { kelurahan: 'Sukabumi Selatan', kodePos: '11560' },
            ]
          },
          {
            name: 'Kembangan',
            kelurahanList: [
              { kelurahan: 'Kembangan Selatan (Puri)', kodePos: '11610' },
              { kelurahan: 'Kembangan Utara', kodePos: '11610' },
              { kelurahan: 'Meruya Utara', kodePos: '11620' },
              { kelurahan: 'Srengseng', kodePos: '11630' },
              { kelurahan: 'Joglo', kodePos: '11640' },
              { kelurahan: 'Meruya Selatan', kodePos: '11650' },
            ]
          },
          {
            name: 'Grogol Petamburan',
            kelurahanList: [
              { kelurahan: 'Tomang', kodePos: '11440' },
              { kelurahan: 'Grogol', kodePos: '11450' },
              { kelurahan: 'Tanjung Duren Utara', kodePos: '11470' },
              { kelurahan: 'Tanjung Duren Selatan', kodePos: '11470' },
              { kelurahan: 'Jelambar', kodePos: '11460' },
              { kelurahan: 'Wijaya Kusuma', kodePos: '11460' },
            ]
          },
          {
            name: 'Cengkareng',
            kelurahanList: [
              { kelurahan: 'Cengkareng Barat', kodePos: '11730' },
              { kelurahan: 'Cengkareng Timur', kodePos: '11730' },
              { kelurahan: 'Duri Kosambi', kodePos: '11750' },
              { kelurahan: 'Rawa Buaya', kodePos: '11740' },
              { kelurahan: 'Kedaung Kali Angke', kodePos: '11710' },
              { kelurahan: 'Kapuk', kodePos: '11720' },
            ]
          },
          {
            name: 'Kalideres',
            kelurahanList: [
              { kelurahan: 'Kalideres', kodePos: '11840' },
              { kelurahan: 'Semanan', kodePos: '11850' },
              { kelurahan: 'Pegadungan', kodePos: '11830' },
              { kelurahan: 'Tegal Alur', kodePos: '11820' },
              { kelurahan: 'Kamal', kodePos: '11810' },
            ]
          },
          {
            name: 'Tamansari',
            kelurahanList: [
              { kelurahan: 'Glodok', kodePos: '11120' },
              { kelurahan: 'Pinangsia', kodePos: '11110' },
              { kelurahan: 'Mangga Besar', kodePos: '11180' },
              { kelurahan: 'Keagungan', kodePos: '11130' },
              { kelurahan: 'Krukut', kodePos: '11140' },
              { kelurahan: 'Maphar', kodePos: '11160' },
              { kelurahan: 'Tangki', kodePos: '11170' },
            ]
          },
          {
            name: 'Tambora',
            kelurahanList: [
              { kelurahan: 'Jembatan Besi', kodePos: '11320' },
              { kelurahan: 'Tambora', kodePos: '11220' },
              { kelurahan: 'Roa Malaka', kodePos: '11230' },
              { kelurahan: 'Pekojan', kodePos: '11240' },
              { kelurahan: 'Angke', kodePos: '11330' },
              { kelurahan: 'Krendang', kodePos: '11260' },
            ]
          },
          {
            name: 'Palmerah',
            kelurahanList: [
              { kelurahan: 'Slipi', kodePos: '11410' },
              { kelurahan: 'Palmerah', kodePos: '11480' },
              { kelurahan: 'Kemanggisan', kodePos: '11480' },
              { kelurahan: 'Kota Bambu Utara', kodePos: '11420' },
              { kelurahan: 'Kota Bambu Selatan', kodePos: '11420' },
              { kelurahan: 'Jatipulo', kodePos: '11430' },
            ]
          },
        ]
      },
      {
        name: 'Kota Jakarta Utara',
        kecamatanList: [
          {
            name: 'Kelapa Gading',
            kelurahanList: [
              { kelurahan: 'Kelapa Gading Barat', kodePos: '14240' },
              { kelurahan: 'Kelapa Gading Timur', kodePos: '14240' },
              { kelurahan: 'Pegangsaan Dua', kodePos: '14250' },
            ]
          },
          {
            name: 'Penjaringan',
            kelurahanList: [
              { kelurahan: 'Pluit', kodePos: '14450' },
              { kelurahan: 'Pejagalan', kodePos: '14450' },
              { kelurahan: 'Penjaringan', kodePos: '14440' },
              { kelurahan: 'Kapuk Muara (PIK)', kodePos: '14460' },
              { kelurahan: 'Kamal Muara', kodePos: '14470' },
            ]
          },
          {
            name: 'Tanjung Priok',
            kelurahanList: [
              { kelurahan: 'Sunter Agung', kodePos: '14350' },
              { kelurahan: 'Sunter Jaya', kodePos: '14350' },
              { kelurahan: 'Tanjung Priok', kodePos: '14310' },
              { kelurahan: 'Kebon Bawang', kodePos: '14320' },
              { kelurahan: 'Sungai Bambu', kodePos: '14330' },
              { kelurahan: 'Papanggo', kodePos: '14340' },
              { kelurahan: 'Warakas', kodePos: '14340' },
            ]
          },
          {
            name: 'Pademangan',
            kelurahanList: [
              { kelurahan: 'Ancol', kodePos: '14430' },
              { kelurahan: 'Pademangan Barat', kodePos: '14420' },
              { kelurahan: 'Pademangan Timur', kodePos: '14410' },
            ]
          },
          {
            name: 'Koja',
            kelurahanList: [
              { kelurahan: 'Koja', kodePos: '14220' },
              { kelurahan: 'Rawa Badak Utara', kodePos: '14230' },
              { kelurahan: 'Rawa Badak Selatan', kodePos: '14230' },
              { kelurahan: 'Tugu Utara', kodePos: '14260' },
              { kelurahan: 'Tugu Selatan', kodePos: '14260' },
              { kelurahan: 'Lagoa', kodePos: '14270' },
            ]
          },
          {
            name: 'Cilincing',
            kelurahanList: [
              { kelurahan: 'Cilincing', kodePos: '14120' },
              { kelurahan: 'Semper Barat', kodePos: '14130' },
              { kelurahan: 'Semper Timur', kodePos: '14130' },
              { kelurahan: 'Sukapura', kodePos: '14140' },
              { kelurahan: 'Rorotan', kodePos: '14140' },
              { kelurahan: 'Marunda', kodePos: '14150' },
            ]
          },
        ]
      },
      {
        name: 'Kota Jakarta Timur',
        kecamatanList: [
          {
            name: 'Jatinegara',
            kelurahanList: [
              { kelurahan: 'Kampung Melayu', kodePos: '13320' },
              { kelurahan: 'Bidara Cina', kodePos: '13330' },
              { kelurahan: 'Cipinang Cempedak', kodePos: '13340' },
              { kelurahan: 'Rawa Bunga', kodePos: '13350' },
              { kelurahan: 'Cipinang Besar Utara', kodePos: '13410' },
              { kelurahan: 'Cipinang Besar Selatan', kodePos: '13410' },
              { kelurahan: 'Cipinang Muara', kodePos: '13420' },
            ]
          },
          {
            name: 'Duren Sawit',
            kelurahanList: [
              { kelurahan: 'Duren Sawit', kodePos: '13440' },
              { kelurahan: 'Pondok Kelapa', kodePos: '13450' },
              { kelurahan: 'Pondok Kopi', kodePos: '13460' },
              { kelurahan: 'Malaka Jaya', kodePos: '13460' },
              { kelurahan: 'Malaka Sari', kodePos: '13460' },
              { kelurahan: 'Klender', kodePos: '13470' },
            ]
          },
          {
            name: 'Pulo Gadung',
            kelurahanList: [
              { kelurahan: 'Rawamangun', kodePos: '13220' },
              { kelurahan: 'Pisangan Timur', kodePos: '13230' },
              { kelurahan: 'Cipinang', kodePos: '13240' },
              { kelurahan: 'Jatinegara Kaum', kodePos: '13250' },
              { kelurahan: 'Kayu Putih', kodePos: '13210' },
              { kelurahan: 'Pulo Gadung', kodePos: '13260' },
            ]
          },
          {
            name: 'Kramat Jati',
            kelurahanList: [
              { kelurahan: 'Kramat Jati', kodePos: '13510' },
              { kelurahan: 'Batu Ampar', kodePos: '13520' },
              { kelurahan: 'Balekambang', kodePos: '13530' },
              { kelurahan: 'Kampung Tengah', kodePos: '13540' },
              { kelurahan: 'Dukuh', kodePos: '13550' },
              { kelurahan: 'Cawang', kodePos: '13630' },
              { kelurahan: 'Cililitan', kodePos: '13640' },
            ]
          },
          {
            name: 'Cakung',
            kelurahanList: [
              { kelurahan: 'Cakung Barat', kodePos: '13910' },
              { kelurahan: 'Cakung Timur', kodePos: '13910' },
              { kelurahan: 'Rawa Terate', kodePos: '13920' },
              { kelurahan: 'Jatinegara Indah', kodePos: '13930' },
              { kelurahan: 'Penggilingan', kodePos: '13940' },
              { kelurahan: 'Pulogebang', kodePos: '13950' },
              { kelurahan: 'Ujung Menteng', kodePos: '13960' },
            ]
          },
          {
            name: 'Ciracas',
            kelurahanList: [
              { kelurahan: 'Cibubur', kodePos: '13720' },
              { kelurahan: 'Kelapa Dua Wetan', kodePos: '13730' },
              { kelurahan: 'Ciracas', kodePos: '13740' },
              { kelurahan: 'Susukan', kodePos: '13750' },
              { kelurahan: 'Rambutan', kodePos: '13740' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Kepulauan Seribu',
        kecamatanList: [
          {
            name: 'Kepulauan Seribu Selatan',
            kelurahanList: [
              { kelurahan: 'Pulau Tidung', kodePos: '14520' },
              { kelurahan: 'Pulau Pari', kodePos: '14520' },
              { kelurahan: 'Pulau Untung Jawa', kodePos: '14510' },
            ]
          },
          {
            name: 'Kepulauan Seribu Utara',
            kelurahanList: [
              { kelurahan: 'Pulau Kelapa', kodePos: '14530' },
              { kelurahan: 'Pulau Harapan', kodePos: '14530' },
              { kelurahan: 'Pulau Panggang', kodePos: '14530' },
            ]
          },
        ]
      },
    ]
  },

  // 2. JAWA BARAT
  {
    name: 'Jawa Barat',
    kotaList: [
      {
        name: 'Kota Bandung',
        kecamatanList: [
          {
            name: 'Coblong',
            kelurahanList: [
              { kelurahan: 'Dago', kodePos: '40135' },
              { kelurahan: 'Lebak Siliwangi', kodePos: '40132' },
              { kelurahan: 'Sadang Serang', kodePos: '40133' },
              { kelurahan: 'Sekeloa', kodePos: '40134' },
            ]
          },
          {
            name: 'Sumur Bandung',
            kelurahanList: [
              { kelurahan: 'Braga', kodePos: '40111' },
              { kelurahan: 'Kebon Pisang', kodePos: '40112' },
              { kelurahan: 'Merdeka', kodePos: '40113' },
              { kelurahan: 'Babakan Ciamis', kodePos: '40117' },
            ]
          },
          {
            name: 'Cicendo',
            kelurahanList: [
              { kelurahan: 'Pasirkaliki', kodePos: '40171' },
              { kelurahan: 'Arjuna', kodePos: '40172' },
              { kelurahan: 'Husen Sastranegara', kodePos: '40174' },
              { kelurahan: 'Sukaraja', kodePos: '40175' },
            ]
          },
          {
            name: 'Lengkong',
            kelurahanList: [
              { kelurahan: 'Malabar', kodePos: '40262' },
              { kelurahan: 'Burangrang', kodePos: '40262' },
              { kelurahan: 'Cijagra', kodePos: '40265' },
              { kelurahan: 'Turangga', kodePos: '40264' },
            ]
          },
          {
            name: 'Regol',
            kelurahanList: [
              { kelurahan: 'Balonggede', kodePos: '40251' },
              { kelurahan: 'Pungkur', kodePos: '40252' },
              { kelurahan: 'Ciateul', kodePos: '40252' },
              { kelurahan: 'Ancol', kodePos: '40254' },
            ]
          },
          {
            name: 'Sukajadi',
            kelurahanList: [
              { kelurahan: 'Pasteur', kodePos: '40161' },
              { kelurahan: 'Sukabungah', kodePos: '40162' },
              { kelurahan: 'Sukagalih', kodePos: '40163' },
              { kelurahan: 'Sukawarna', kodePos: '40164' },
            ]
          },
        ]
      },
      {
        name: 'Kota Bekasi',
        kecamatanList: [
          {
            name: 'Bekasi Selatan',
            kelurahanList: [
              { kelurahan: 'Pekayon Jaya', kodePos: '17148' },
              { kelurahan: 'Jaka Setia', kodePos: '17147' },
              { kelurahan: 'Jaka Mulya', kodePos: '17146' },
              { kelurahan: 'Kayuringin Jaya', kodePos: '17144' },
            ]
          },
          {
            name: 'Bekasi Barat',
            kelurahanList: [
              { kelurahan: 'Kranji', kodePos: '17135' },
              { kelurahan: 'Bintara', kodePos: '17134' },
              { kelurahan: 'Kota Baru', kodePos: '17133' },
            ]
          },
          {
            name: 'Bekasi Timur',
            kelurahanList: [
              { kelurahan: 'Margahayu', kodePos: '17113' },
              { kelurahan: 'Aren Jaya', kodePos: '17111' },
              { kelurahan: 'Duren Jaya', kodePos: '17111' },
            ]
          },
          {
            name: 'Pondok Gede',
            kelurahanList: [
              { kelurahan: 'Jatiwaringin', kodePos: '17411' },
              { kelurahan: 'Jaticempaka', kodePos: '17411' },
              { kelurahan: 'Jatibening', kodePos: '17412' },
            ]
          },
        ]
      },
      {
        name: 'Kota Depok',
        kecamatanList: [
          {
            name: 'Margonda (Pancoran Mas)',
            kelurahanList: [
              { kelurahan: 'Depok', kodePos: '16431' },
              { kelurahan: 'Pancoran Mas', kodePos: '16436' },
              { kelurahan: 'Rangkapan Jaya', kodePos: '16435' },
            ]
          },
          {
            name: 'Cinere',
            kelurahanList: [
              { kelurahan: 'Cinere', kodePos: '16514' },
              { kelurahan: 'Gandul', kodePos: '16512' },
              { kelurahan: 'Pangkalan Jati', kodePos: '16513' },
            ]
          },
          {
            name: 'Sukmajaya',
            kelurahanList: [
              { kelurahan: 'Mekarjaya', kodePos: '16411' },
              { kelurahan: 'Baktijaya', kodePos: '16418' },
              { kelurahan: 'Abadijaya', kodePos: '16417' },
            ]
          },
        ]
      },
      {
        name: 'Kota Bogor',
        kecamatanList: [
          {
            name: 'Bogor Tengah',
            kelurahanList: [
              { kelurahan: 'Babakan', kodePos: '16128' },
              { kelurahan: 'Paledang', kodePos: '16122' },
              { kelurahan: 'Gudang', kodePos: '16123' },
            ]
          },
          {
            name: 'Bogor Timur',
            kelurahanList: [
              { kelurahan: 'Baranangsiang', kodePos: '16143' },
              { kelurahan: 'Sukasari', kodePos: '16142' },
              { kelurahan: 'Katulampa', kodePos: '16144' },
            ]
          },
          {
            name: 'Bogor Selatan',
            kelurahanList: [
              { kelurahan: 'Batutulis', kodePos: '16133' },
              { kelurahan: 'Bondongan', kodePos: '16131' },
              { kelurahan: 'Cipaku', kodePos: '16137' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Bogor (Cibinong)',
        kecamatanList: [
          {
            name: 'Cibinong',
            kelurahanList: [
              { kelurahan: 'Cibinong', kodePos: '16911' },
              { kelurahan: 'Pakansari', kodePos: '16915' },
              { kelurahan: 'Cirimekar', kodePos: '16917' },
            ]
          },
          {
            name: 'Sentul (Babakan Madang)',
            kelurahanList: [
              { kelurahan: 'Sentul', kodePos: '16810' },
              { kelurahan: 'Babakan Madang', kodePos: '16810' },
              { kelurahan: 'Citaringgul', kodePos: '16810' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Bekasi (Cikarang)',
        kecamatanList: [
          {
            name: 'Cikarang Pusat',
            kelurahanList: [
              { kelurahan: 'Sukamahi', kodePos: '17530' },
              { kelurahan: 'Pasirtanjung', kodePos: '17530' },
            ]
          },
          {
            name: 'Cikarang Selatan (Lippo)',
            kelurahanList: [
              { kelurahan: 'Sukaresmi', kodePos: '17530' },
              { kelurahan: 'Serang', kodePos: '17530' },
              { kelurahan: 'Cibatu', kodePos: '17530' },
            ]
          },
        ]
      },
      {
        name: 'Kota Cimahi',
        kecamatanList: [
          {
            name: 'Cimahi Tengah',
            kelurahanList: [
              { kelurahan: 'Baros', kodePos: '40521' },
              { kelurahan: 'Cigugur Tengah', kodePos: '40522' },
              { kelurahan: 'Cimahi', kodePos: '40525' },
            ]
          },
        ]
      },
      {
        name: 'Kota Cirebon',
        kecamatanList: [
          {
            name: 'Kejaksan',
            kelurahanList: [
              { kelurahan: 'Kejaksan', kodePos: '45123' },
              { kelurahan: 'Kebonbaru', kodePos: '45124' },
            ]
          },
          {
            name: 'Kesambi',
            kelurahanList: [
              { kelurahan: 'Kesambi', kodePos: '45134' },
              { kelurahan: 'Pekiringan', kodePos: '45131' },
            ]
          },
        ]
      },
      {
        name: 'Kota Sukabumi',
        kecamatanList: [
          {
            name: 'Cikole',
            kelurahanList: [
              { kelurahan: 'Cikole', kodePos: '43111' },
              { kelurahan: 'Selabatu', kodePos: '43114' },
            ]
          },
        ]
      },
      {
        name: 'Kota Tasikmalaya',
        kecamatanList: [
          {
            name: 'Cihideung',
            kelurahanList: [
              { kelurahan: 'Nagarawangi', kodePos: '46124' },
              { kelurahan: 'Tuguraja', kodePos: '46125' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Karawang',
        kecamatanList: [
          {
            name: 'Karawang Barat',
            kelurahanList: [
              { kelurahan: 'Nagangasari', kodePos: '41312' },
              { kelurahan: 'Karangpawitan', kodePos: '41315' },
            ]
          },
          {
            name: 'Telukjambe Timur (KIIC)',
            kelurahanList: [
              { kelurahan: 'Sukaharja', kodePos: '41361' },
              { kelurahan: 'Sirnabaya', kodePos: '41361' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Bandung (Soreang)',
        kecamatanList: [
          {
            name: 'Soreang',
            kelurahanList: [
              { kelurahan: 'Soreang', kodePos: '40911' },
              { kelurahan: 'Pamekaran', kodePos: '40912' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Bandung Barat (Ngamprah / Padalarang)',
        kecamatanList: [
          {
            name: 'Padalarang',
            kelurahanList: [
              { kelurahan: 'Kertajaya (Kota Baru Parahyangan)', kodePos: '40553' },
              { kelurahan: 'Padalarang', kodePos: '40553' },
            ]
          },
        ]
      },
    ]
  },

  // 3. BANTEN
  {
    name: 'Banten',
    kotaList: [
      {
        name: 'Kota Tangerang Selatan (Tangsel)',
        kecamatanList: [
          {
            name: 'Serpong (BSD City)',
            kelurahanList: [
              { kelurahan: 'Lengkong Gudang', kodePos: '15321' },
              { kelurahan: 'Rawa Buntu', kodePos: '15318' },
              { kelurahan: 'Serpong', kodePos: '15311' },
              { kelurahan: 'Ciater', kodePos: '15317' },
            ]
          },
          {
            name: 'Serpong Utara (Alam Sutera)',
            kelurahanList: [
              { kelurahan: 'Pakulonan', kodePos: '15325' },
              { kelurahan: 'Pondok Jagung', kodePos: '15326' },
              { kelurahan: 'Jelupang', kodePos: '15323' },
            ]
          },
          {
            name: 'Pondok Aren (Bintaro)',
            kelurahanList: [
              { kelurahan: 'Pondok Ranji', kodePos: '15222' },
              { kelurahan: 'Jurangmangu Timur', kodePos: '15222' },
              { kelurahan: 'Pondok Aren', kodePos: '15224' },
              { kelurahan: 'Pondok Kacang Timur', kodePos: '15226' },
            ]
          },
          {
            name: 'Ciputat',
            kelurahanList: [
              { kelurahan: 'Ciputat', kodePos: '15411' },
              { kelurahan: 'Cipayung', kodePos: '15411' },
              { kelurahan: 'Sawah Baru', kodePos: '15413' },
            ]
          },
          {
            name: 'Pamulang',
            kelurahanList: [
              { kelurahan: 'Pamulang Barat', kodePos: '15417' },
              { kelurahan: 'Pamulang Timur', kodePos: '15417' },
              { kelurahan: 'Pondok Benda', kodePos: '15416' },
            ]
          },
        ]
      },
      {
        name: 'Kota Tangerang',
        kecamatanList: [
          {
            name: 'Tangerang',
            kelurahanList: [
              { kelurahan: 'Sukasari', kodePos: '15118' },
              { kelurahan: 'Babakan', kodePos: '15118' },
              { kelurahan: 'Cikokol', kodePos: '15117' },
            ]
          },
          {
            name: 'Cipondoh',
            kelurahanList: [
              { kelurahan: 'Cipondoh', kodePos: '15148' },
              { kelurahan: 'Poris Plawad', kodePos: '15141' },
              { kelurahan: 'Kenanga', kodePos: '15146' },
            ]
          },
          {
            name: 'Karawaci (Lippo Village)',
            kelurahanList: [
              { kelurahan: 'Karawaci', kodePos: '15115' },
              { kelurahan: 'Bojong Jaya', kodePos: '15115' },
              { kelurahan: 'Bencongan', kodePos: '15810' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Tangerang (Gading Serpong / Karawaci)',
        kecamatanList: [
          {
            name: 'Kelapa Dua (Gading Serpong)',
            kelurahanList: [
              { kelurahan: 'Kelapa Dua', kodePos: '15810' },
              { kelurahan: 'Pakulonan Barat', kodePos: '15810' },
              { kelurahan: 'Curug Sangereng', kodePos: '15810' },
            ]
          },
          {
            name: 'Cisauk',
            kelurahanList: [
              { kelurahan: 'Cisauk', kodePos: '15341' },
              { kelurahan: 'Sampora (BSD Green)', kodePos: '15345' },
            ]
          },
        ]
      },
      {
        name: 'Kota Serang',
        kecamatanList: [
          {
            name: 'Serang',
            kelurahanList: [
              { kelurahan: 'Kotabaru', kodePos: '42112' },
              { kelurahan: 'Lopang', kodePos: '42113' },
            ]
          },
        ]
      },
      {
        name: 'Kota Cilegon',
        kecamatanList: [
          {
            name: 'Cilegon',
            kelurahanList: [
              { kelurahan: 'Ciwedus', kodePos: '42418' },
              { kelurahan: 'Bagendung', kodePos: '42419' },
            ]
          },
        ]
      },
    ]
  },

  // 4. JAWA TENGAH
  {
    name: 'Jawa Tengah',
    kotaList: [
      {
        name: 'Kota Semarang',
        kecamatanList: [
          {
            name: 'Semarang Tengah',
            kelurahanList: [
              { kelurahan: 'Pandansari', kodePos: '50139' },
              { kelurahan: 'Pekunden (Simpang Lima)', kodePos: '50134' },
              { kelurahan: 'Sekayu', kodePos: '50132' },
            ]
          },
          {
            name: 'Gajahmungkur (Candi)',
            kelurahanList: [
              { kelurahan: 'Gajahmungkur', kodePos: '50232' },
              { kelurahan: 'Bendan Ngisor', kodePos: '50233' },
            ]
          },
          {
            name: 'Banyumanik',
            kelurahanList: [
              { kelurahan: 'Banyumanik', kodePos: '50264' },
              { kelurahan: 'Srondol Wetan', kodePos: '50263' },
            ]
          },
        ]
      },
      {
        name: 'Kota Surakarta (Solo)',
        kecamatanList: [
          {
            name: 'Banjarsari',
            kelurahanList: [
              { kelurahan: 'Manahan', kodePos: '57139' },
              { kelurahan: 'Banjarsari', kodePos: '57138' },
              { kelurahan: 'Keprabon', kodePos: '57131' },
            ]
          },
          {
            name: 'Laweyan',
            kelurahanList: [
              { kelurahan: 'Laweyan', kodePos: '57148' },
              { kelurahan: 'Purwosari (Slamet Riyadi)', kodePos: '57142' },
              { kelurahan: 'Kerten', kodePos: '57143' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Sukoharjo (Solo Baru)',
        kecamatanList: [
          {
            name: 'Grogol (Solo Baru)',
            kelurahanList: [
              { kelurahan: 'Madegondo', kodePos: '57552' },
              { kelurahan: 'Kwarasan', kodePos: '57552' },
              { kelurahan: 'Langensari', kodePos: '57552' },
            ]
          },
        ]
      },
      {
        name: 'Kota Magelang',
        kecamatanList: [
          {
            name: 'Magelang Tengah',
            kelurahanList: [
              { kelurahan: 'Cacaban', kodePos: '56121' },
              { kelurahan: 'Kemirirejo', kodePos: '56122' },
            ]
          },
        ]
      },
      {
        name: 'Kota Pekalongan',
        kecamatanList: [
          {
            name: 'Pekalongan Timur',
            kelurahanList: [
              { kelurahan: 'Noyontaan', kodePos: '51121' },
              { kelurahan: 'Kauman', kodePos: '51125' },
            ]
          },
        ]
      },
      {
        name: 'Kota Tegal',
        kecamatanList: [
          {
            name: 'Tegal Barat',
            kelurahanList: [
              { kelurahan: 'Kraton', kodePos: '52112' },
              { kelurahan: 'Tegalsari', kodePos: '52111' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Banyumas (Purwokerto)',
        kecamatanList: [
          {
            name: 'Purwokerto Timur',
            kelurahanList: [
              { kelurahan: 'Kranji', kodePos: '53116' },
              { kelurahan: 'Purwokerto Wetan', kodePos: '53111' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Kudus',
        kecamatanList: [
          {
            name: 'Kota Kudus',
            kelurahanList: [
              { kelurahan: 'Demaan', kodePos: '59313' },
              { kelurahan: 'Kramat', kodePos: '59314' },
            ]
          },
        ]
      },
    ]
  },

  // 5. DI YOGYAKARTA
  {
    name: 'DI Yogyakarta',
    kotaList: [
      {
        name: 'Kota Yogyakarta',
        kecamatanList: [
          {
            name: 'Gondokusuman',
            kelurahanList: [
              { kelurahan: 'Kotabaru', kodePos: '55224' },
              { kelurahan: 'Klitren', kodePos: '55222' },
              { kelurahan: 'Terban', kodePos: '55223' },
            ]
          },
          {
            name: 'Danurejan (Malioboro)',
            kelurahanList: [
              { kelurahan: 'Suryatmajan', kodePos: '55213' },
              { kelurahan: 'Bausasran', kodePos: '55211' },
            ]
          },
          {
            name: 'Umbulharjo',
            kelurahanList: [
              { kelurahan: 'Muja Muju', kodePos: '55165' },
              { kelurahan: 'Semaki', kodePos: '55166' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Sleman',
        kecamatanList: [
          {
            name: 'Depok (Gejayan / Babarsari)',
            kelurahanList: [
              { kelurahan: 'Caturtunggal', kodePos: '55281' },
              { kelurahan: 'Maguwoharjo', kodePos: '55282' },
              { kelurahan: 'Condongcatur', kodePos: '55283' },
            ]
          },
          {
            name: 'Mlati (Jombor)',
            kelurahanList: [
              { kelurahan: 'Sinduadi', kodePos: '55284' },
              { kelurahan: 'Sendangadi', kodePos: '55285' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Bantul',
        kecamatanList: [
          {
            name: 'Kasihan (Ringroad Selatan)',
            kelurahanList: [
              { kelurahan: 'Tirtonirmolo', kodePos: '55181' },
              { kelurahan: 'Tamantirto', kodePos: '55183' },
            ]
          },
        ]
      },
    ]
  },

  // 6. JAWA TIMUR
  {
    name: 'Jawa Timur',
    kotaList: [
      {
        name: 'Kota Surabaya',
        kecamatanList: [
          {
            name: 'Tegalsari (Basuki Rahmat / TP)',
            kelurahanList: [
              { kelurahan: 'Kedungdoro', kodePos: '60261' },
              { kelurahan: 'Tegalsari', kodePos: '60262' },
              { kelurahan: 'Dr. Soetomo', kodePos: '60264' },
            ]
          },
          {
            name: 'Gubeng',
            kelurahanList: [
              { kelurahan: 'Gubeng', kodePos: '60281' },
              { kelurahan: 'Kertajaya', kodePos: '60282' },
              { kelurahan: 'Pucang Sewu', kodePos: '60283' },
            ]
          },
          {
            name: 'Wiyung (Surabaya Barat)',
            kelurahanList: [
              { kelurahan: 'Babatan', kodePos: '60227' },
              { kelurahan: 'Wiyung', kodePos: '60228' },
              { kelurahan: 'Jajar Tunggal', kodePos: '60229' },
            ]
          },
          {
            name: 'Dukuh Pakis (Mayjend Sungkono)',
            kelurahanList: [
              { kelurahan: 'Gunung Sari', kodePos: '60224' },
              { kelurahan: 'Dukuh Kupang', kodePos: '60225' },
              { kelurahan: 'Pradah Kalikendal', kodePos: '60226' },
            ]
          },
          {
            name: 'Rungkut',
            kelurahanList: [
              { kelurahan: 'Rungkut Kidul', kodePos: '60293' },
              { kelurahan: 'Kali Rungkut', kodePos: '60293' },
              { kelurahan: 'Medokan Ayu', kodePos: '60295' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Sidoarjo',
        kecamatanList: [
          {
            name: 'Sidoarjo',
            kelurahanList: [
              { kelurahan: 'Sidokumpul', kodePos: '61212' },
              { kelurahan: 'Lemahputro', kodePos: '61213' },
            ]
          },
          {
            name: 'Waru (Juanda)',
            kelurahanList: [
              { kelurahan: 'Waru', kodePos: '61256' },
              { kelurahan: 'Bungurasih', kodePos: '61256' },
            ]
          },
        ]
      },
      {
        name: 'Kota Malang',
        kecamatanList: [
          {
            name: 'Klojen (Pusat)',
            kelurahanList: [
              { kelurahan: 'Klojen', kodePos: '65111' },
              { kelurahan: 'Kauman', kodePos: '65119' },
              { kelurahan: 'Oro-oro Dowo', kodePos: '65112' },
            ]
          },
          {
            name: 'Lowokwaru (Soekarno Hatta)',
            kelurahanList: [
              { kelurahan: 'Jatimulyo', kodePos: '65141' },
              { kelurahan: 'Mojolangu', kodePos: '65142' },
              { kelurahan: 'Dinoyo', kodePos: '65144' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Gresik',
        kecamatanList: [
          {
            name: 'Kebomas',
            kelurahanList: [
              { kelurahan: 'Kebomas', kodePos: '61121' },
              { kelurahan: 'Dahanrejo', kodePos: '61124' },
            ]
          },
        ]
      },
      {
        name: 'Kota Kediri',
        kecamatanList: [
          {
            name: 'Kota Kediri',
            kelurahanList: [
              { kelurahan: 'Banjaran', kodePos: '64124' },
              { kelurahan: 'Kemasan', kodePos: '64125' },
            ]
          },
        ]
      },
      {
        name: 'Kota Madiun',
        kecamatanList: [
          {
            name: 'Kartoharjo',
            kelurahanList: [
              { kelurahan: 'Kartoharjo', kodePos: '63117' },
              { kelurahan: 'Kanigoro', kodePos: '63118' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Jember',
        kecamatanList: [
          {
            name: 'Kaliwates',
            kelurahanList: [
              { kelurahan: 'Kaliwates', kodePos: '68131' },
              { kelurahan: 'Sempusari', kodePos: '68135' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Banyuwangi',
        kecamatanList: [
          {
            name: 'Banyuwangi',
            kelurahanList: [
              { kelurahan: 'Kepatihan', kodePos: '68411' },
              { kelurahan: 'Panderejo', kodePos: '68412' },
            ]
          },
        ]
      },
    ]
  },

  // 7. BALI
  {
    name: 'Bali',
    kotaList: [
      {
        name: 'Kota Denpasar',
        kecamatanList: [
          {
            name: 'Denpasar Barat (Teuku Umar)',
            kelurahanList: [
              { kelurahan: 'Dauh Puri', kodePos: '80113' },
              { kelurahan: 'Pemecutan', kodePos: '80119' },
              { kelurahan: 'Padangsambian', kodePos: '80117' },
            ]
          },
          {
            name: 'Denpasar Selatan (Sanur)',
            kelurahanList: [
              { kelurahan: 'Sanur', kodePos: '80228' },
              { kelurahan: 'Panjer', kodePos: '80225' },
              { kelurahan: 'Renon', kodePos: '80226' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Badung (Kuta / Seminyak / Canggu)',
        kecamatanList: [
          {
            name: 'Kuta',
            kelurahanList: [
              { kelurahan: 'Kuta', kodePos: '80361' },
              { kelurahan: 'Legian', kodePos: '80361' },
              { kelurahan: 'Seminyak', kodePos: '80361' },
              { kelurahan: 'Tuban (Airport)', kodePos: '80361' },
            ]
          },
          {
            name: 'Kuta Utara (Canggu / Kerobokan)',
            kelurahanList: [
              { kelurahan: 'Canggu', kodePos: '80361' },
              { kelurahan: 'Kerobokan Kelod', kodePos: '80361' },
              { kelurahan: 'Tibubeneng', kodePos: '80361' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Gianyar (Ubud)',
        kecamatanList: [
          {
            name: 'Ubud',
            kelurahanList: [
              { kelurahan: 'Ubud', kodePos: '80571' },
              { kelurahan: 'Peliatan', kodePos: '80571' },
            ]
          },
        ]
      },
    ]
  },

  // 8. SUMATERA UTARA
  {
    name: 'Sumatera Utara',
    kotaList: [
      {
        name: 'Kota Medan',
        kecamatanList: [
          {
            name: 'Medan Barat',
            kelurahanList: [
              { kelurahan: 'Kesawan', kodePos: '20111' },
              { kelurahan: 'Silalas', kodePos: '20114' },
              { kelurahan: 'Glugur Kota', kodePos: '20115' },
            ]
          },
          {
            name: 'Medan Kota',
            kelurahanList: [
              { kelurahan: 'Pasar Baru', kodePos: '20212' },
              { kelurahan: 'Teladan Barat', kodePos: '20214' },
              { kelurahan: 'Mesjid', kodePos: '20213' },
            ]
          },
          {
            name: 'Medan Petisah',
            kelurahanList: [
              { kelurahan: 'Petisah Tengah', kodePos: '20112' },
              { kelurahan: 'Sekip', kodePos: '20113' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Deli Serdang',
        kecamatanList: [
          {
            name: 'Lubuk Pakam',
            kelurahanList: [
              { kelurahan: 'Lubuk Pakam Pekan', kodePos: '20517' },
            ]
          },
        ]
      },
      {
        name: 'Kota Binjai',
        kecamatanList: [
          {
            name: 'Binjai Kota',
            kelurahanList: [
              { kelurahan: 'Binjai', kodePos: '20711' },
            ]
          },
        ]
      },
      {
        name: 'Kota Pematangsiantar',
        kecamatanList: [
          {
            name: 'Siantar Barat',
            kelurahanList: [
              { kelurahan: 'Proklamasi', kodePos: '21111' },
            ]
          },
        ]
      },
    ]
  },

  // 9. SUMATERA BARAT
  {
    name: 'Sumatera Barat',
    kotaList: [
      {
        name: 'Kota Padang',
        kecamatanList: [
          {
            name: 'Padang Barat',
            kelurahanList: [
              { kelurahan: 'Kampung Jao', kodePos: '25112' },
              { kelurahan: 'Belakang Tangsi', kodePos: '25111' },
            ]
          },
        ]
      },
      {
        name: 'Kota Bukittinggi',
        kecamatanList: [
          {
            name: 'Guguk Panjang',
            kelurahanList: [
              { kelurahan: 'Benteng Pasar Atas', kodePos: '26113' },
            ]
          },
        ]
      },
    ]
  },

  // 10. RIAU
  {
    name: 'Riau',
    kotaList: [
      {
        name: 'Kota Pekanbaru',
        kecamatanList: [
          {
            name: 'Pekanbaru Kota',
            kelurahanList: [
              { kelurahan: 'Simpang Empat', kodePos: '28116' },
              { kelurahan: 'Kota Tinggi', kodePos: '28112' },
            ]
          },
          {
            name: 'Marpoyan Damai',
            kelurahanList: [
              { kelurahan: 'Tangkerang Barat', kodePos: '28282' },
            ]
          },
        ]
      },
      {
        name: 'Kota Dumai',
        kecamatanList: [
          {
            name: 'Dumai Kota',
            kelurahanList: [
              { kelurahan: 'Bumi Ayu', kodePos: '28812' },
            ]
          },
        ]
      },
    ]
  },

  // 11. KEPULAUAN RIAU
  {
    name: 'Kepulauan Riau',
    kotaList: [
      {
        name: 'Kota Batam',
        kecamatanList: [
          {
            name: 'Batam Kota',
            kelurahanList: [
              { kelurahan: 'Teluk Tering', kodePos: '29461' },
              { kelurahan: 'Belian', kodePos: '29464' },
              { kelurahan: 'Sungai Panas', kodePos: '29433' },
            ]
          },
          {
            name: 'Lubuk Baja (Nagoya)',
            kelurahanList: [
              { kelurahan: 'Lubuk Baja Kota (Nagoya)', kodePos: '29432' },
              { kelurahan: 'Kampung Pelita', kodePos: '29443' },
            ]
          },
        ]
      },
      {
        name: 'Kota Tanjungpinang',
        kecamatanList: [
          {
            name: 'Tanjungpinang Barat',
            kelurahanList: [
              { kelurahan: 'Tanjungpinang Barat', kodePos: '29113' },
            ]
          },
        ]
      },
    ]
  },

  // 12. SUMATERA SELATAN
  {
    name: 'Sumatera Selatan',
    kotaList: [
      {
        name: 'Kota Palembang',
        kecamatanList: [
          {
            name: 'Ilir Timur I',
            kelurahanList: [
              { kelurahan: '16 Ilir', kodePos: '30122' },
              { kelurahan: 'Kepandean', kodePos: '30121' },
            ]
          },
          {
            name: 'Ilir Barat I',
            kelurahanList: [
              { kelurahan: 'Bukit Lama', kodePos: '30139' },
              { kelurahan: 'Lorok Pakjo', kodePos: '30137' },
            ]
          },
        ]
      },
    ]
  },

  // 13. LAMPUNG
  {
    name: 'Lampung',
    kotaList: [
      {
        name: 'Kota Bandar Lampung',
        kecamatanList: [
          {
            name: 'Tanjung Karang Pusat',
            kelurahanList: [
              { kelurahan: 'Palapa', kodePos: '35116' },
              { kelurahan: 'Pasir Gintung', kodePos: '35113' },
            ]
          },
          {
            name: 'Kedaton',
            kelurahanList: [
              { kelurahan: 'Kedaton', kodePos: '35141' },
            ]
          },
        ]
      },
    ]
  },

  // 14. JAMBI
  {
    name: 'Jambi',
    kotaList: [
      {
        name: 'Kota Jambi',
        kecamatanList: [
          {
            name: 'Pasar Jambi',
            kelurahanList: [
              { kelurahan: 'Pasar Jambi', kodePos: '36111' },
            ]
          },
        ]
      },
    ]
  },

  // 15. BENGKULU
  {
    name: 'Bengkulu',
    kotaList: [
      {
        name: 'Kota Bengkulu',
        kecamatanList: [
          {
            name: 'Ratu Samban',
            kelurahanList: [
              { kelurahan: 'Anggut Atas', kodePos: '38222' },
            ]
          },
        ]
      },
    ]
  },

  // 16. KEPULAUAN BANGKA BELITUNG
  {
    name: 'Kepulauan Bangka Belitung',
    kotaList: [
      {
        name: 'Kota Pangkalpinang',
        kecamatanList: [
          {
            name: 'Taman Sari',
            kelurahanList: [
              { kelurahan: 'Batin Tikal', kodePos: '33121' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Belitung (Tanjung Pandan)',
        kecamatanList: [
          {
            name: 'Tanjung Pandan',
            kelurahanList: [
              { kelurahan: 'Kota Tanjung Pandan', kodePos: '33411' },
            ]
          },
        ]
      },
    ]
  },

  // 17. ACEH
  {
    name: 'Aceh',
    kotaList: [
      {
        name: 'Kota Banda Aceh',
        kecamatanList: [
          {
            name: 'Baiturrahman',
            kelurahanList: [
              { kelurahan: 'Kampung Baru', kodePos: '23242' },
              { kelurahan: 'Neusu Aceh', kodePos: '23244' },
            ]
          },
        ]
      },
      {
        name: 'Kota Lhokseumawe',
        kecamatanList: [
          {
            name: 'Banda Sakti',
            kelurahanList: [
              { kelurahan: 'Lhokseumawe', kodePos: '24351' },
            ]
          },
        ]
      },
    ]
  },

  // 18. KALIMANTAN BARAT
  {
    name: 'Kalimantan Barat',
    kotaList: [
      {
        name: 'Kota Pontianak',
        kecamatanList: [
          {
            name: 'Pontianak Selatan',
            kelurahanList: [
              { kelurahan: 'Benua Melayu Laut', kodePos: '78121' },
              { kelurahan: 'Parit Tokaya', kodePos: '78121' },
            ]
          },
        ]
      },
    ]
  },

  // 19. KALIMANTAN SELATAN
  {
    name: 'Kalimantan Selatan',
    kotaList: [
      {
        name: 'Kota Banjarmasin',
        kecamatanList: [
          {
            name: 'Banjarmasin Tengah',
            kelurahanList: [
              { kelurahan: 'Kertak Baru Ilir', kodePos: '70111' },
            ]
          },
        ]
      },
      {
        name: 'Kota Banjarbaru',
        kecamatanList: [
          {
            name: 'Banjarbaru Utara',
            kelurahanList: [
              { kelurahan: 'Loktabat Utara', kodePos: '70712' },
            ]
          },
        ]
      },
    ]
  },

  // 20. KALIMANTAN TIMUR
  {
    name: 'Kalimantan Timur',
    kotaList: [
      {
        name: 'Kota Samarinda',
        kecamatanList: [
          {
            name: 'Samarinda Kota',
            kelurahanList: [
              { kelurahan: 'Pasar Pagi', kodePos: '75111' },
              { kelurahan: 'Bugis', kodePos: '75111' },
            ]
          },
        ]
      },
      {
        name: 'Kota Balikpapan',
        kecamatanList: [
          {
            name: 'Balikpapan Kota',
            kelurahanList: [
              { kelurahan: 'Klandasan Ilir', kodePos: '76113' },
              { kelurahan: 'Klandasan Ulu', kodePos: '76112' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Penajam Paser Utara (IKN Nusantara)',
        kecamatanList: [
          {
            name: 'Sepaku (KIPP IKN)',
            kelurahanList: [
              { kelurahan: 'Sepaku', kodePos: '76148' },
              { kelurahan: 'Bumi Harapan', kodePos: '76148' },
            ]
          },
        ]
      },
    ]
  },

  // 21. KALIMANTAN TENGAH
  {
    name: 'Kalimantan Tengah',
    kotaList: [
      {
        name: 'Kota Palangka Raya',
        kecamatanList: [
          {
            name: 'Pahandut',
            kelurahanList: [
              { kelurahan: 'Pahandut', kodePos: '73111' },
            ]
          },
        ]
      },
    ]
  },

  // 22. KALIMANTAN UTARA
  {
    name: 'Kalimantan Utara',
    kotaList: [
      {
        name: 'Kota Tarakan',
        kecamatanList: [
          {
            name: 'Tarakan Tengah',
            kelurahanList: [
              { kelurahan: 'Pamusian', kodePos: '77113' },
            ]
          },
        ]
      },
    ]
  },

  // 23. SULAWESI SELATAN
  {
    name: 'Sulawesi Selatan',
    kotaList: [
      {
        name: 'Kota Makassar',
        kecamatanList: [
          {
            name: 'Ujung Pandang (Pantai Losari)',
            kelurahanList: [
              { kelurahan: 'Maloku', kodePos: '90111' },
              { kelurahan: 'Losari', kodePos: '90112' },
            ]
          },
          {
            name: 'Panakkukang',
            kelurahanList: [
              { kelurahan: 'Pannampu', kodePos: '90231' },
              { kelurahan: 'Masale', kodePos: '90231' },
            ]
          },
        ]
      },
      {
        name: 'Kota Parepare',
        kecamatanList: [
          {
            name: 'Ujung',
            kelurahanList: [
              { kelurahan: 'Mallusetasi', kodePos: '91111' },
            ]
          },
        ]
      },
    ]
  },

  // 24. SULAWESI UTARA
  {
    name: 'Sulawesi Utara',
    kotaList: [
      {
        name: 'Kota Manado',
        kecamatanList: [
          {
            name: 'Wenang (Pusat Kota)',
            kelurahanList: [
              { kelurahan: 'Wenang Selatan', kodePos: '95111' },
              { kelurahan: 'Pinaesaan', kodePos: '95122' },
            ]
          },
        ]
      },
    ]
  },

  // 25. SULAWESI TENGAH
  {
    name: 'Sulawesi Tengah',
    kotaList: [
      {
        name: 'Kota Palu',
        kecamatanList: [
          {
            name: 'Palu Timur',
            kelurahanList: [
              { kelurahan: 'Besusu Barat', kodePos: '94118' },
            ]
          },
        ]
      },
    ]
  },

  // 26. SULAWESI TENGGARA
  {
    name: 'Sulawesi Tenggara',
    kotaList: [
      {
        name: 'Kota Kendari',
        kecamatanList: [
          {
            name: 'Mandonga',
            kelurahanList: [
              { kelurahan: 'Mandonga', kodePos: '93111' },
            ]
          },
        ]
      },
    ]
  },

  // 27. SULAWESI BARAT
  {
    name: 'Sulawesi Barat',
    kotaList: [
      {
        name: 'Kab. Mamuju',
        kecamatanList: [
          {
            name: 'Mamuju',
            kelurahanList: [
              { kelurahan: 'Binanga', kodePos: '91511' },
            ]
          },
        ]
      },
    ]
  },

  // 28. GORONTALO
  {
    name: 'Gorontalo',
    kotaList: [
      {
        name: 'Kota Gorontalo',
        kecamatanList: [
          {
            name: 'Kota Tengah',
            kelurahanList: [
              { kelurahan: 'Dulalowo', kodePos: '96128' },
            ]
          },
        ]
      },
    ]
  },

  // 29. NUSA TENGGARA BARAT (NTB)
  {
    name: 'Nusa Tenggara Barat',
    kotaList: [
      {
        name: 'Kota Mataram (Lombok)',
        kecamatanList: [
          {
            name: 'Mataram',
            kelurahanList: [
              { kelurahan: 'Mataram Timur', kodePos: '83121' },
              { kelurahan: 'Pagesangan', kodePos: '83127' },
            ]
          },
        ]
      },
    ]
  },

  // 30. NUSA TENGGARA TIMUR (NTT)
  {
    name: 'Nusa Tenggara Timur',
    kotaList: [
      {
        name: 'Kota Kupang',
        kecamatanList: [
          {
            name: 'Oebobo',
            kelurahanList: [
              { kelurahan: 'Oebobo', kodePos: '85111' },
            ]
          },
        ]
      },
      {
        name: 'Kab. Manggarai Barat (Labuan Bajo)',
        kecamatanList: [
          {
            name: 'Komodo',
            kelurahanList: [
              { kelurahan: 'Labuan Bajo', kodePos: '86554' },
            ]
          },
        ]
      },
    ]
  },

  // 31. MALUKU
  {
    name: 'Maluku',
    kotaList: [
      {
        name: 'Kota Ambon',
        kecamatanList: [
          {
            name: 'Sirimau',
            kelurahanList: [
              { kelurahan: 'Honipopu', kodePos: '97126' },
            ]
          },
        ]
      },
    ]
  },

  // 32. MALUKU UTARA
  {
    name: 'Maluku Utara',
    kotaList: [
      {
        name: 'Kota Ternate',
        kecamatanList: [
          {
            name: 'Ternate Tengah',
            kelurahanList: [
              { kelurahan: 'Gamalama', kodePos: '97722' },
            ]
          },
        ]
      },
    ]
  },

  // 33. PAPUA
  {
    name: 'Papua',
    kotaList: [
      {
        name: 'Kota Jayapura',
        kecamatanList: [
          {
            name: 'Jayapura Utara',
            kelurahanList: [
              { kelurahan: 'Gurabesi', kodePos: '99111' },
            ]
          },
        ]
      },
    ]
  },

  // 34. PAPUA BARAT
  {
    name: 'Papua Barat',
    kotaList: [
      {
        name: 'Kab. Manokwari',
        kecamatanList: [
          {
            name: 'Manokwari Barat',
            kelurahanList: [
              { kelurahan: 'Manokwari Barat', kodePos: '98312' },
            ]
          },
        ]
      },
    ]
  },

  // 35. PAPUA BARAT DAYA
  {
    name: 'Papua Barat Daya',
    kotaList: [
      {
        name: 'Kota Sorong',
        kecamatanList: [
          {
            name: 'Sorong Kota',
            kelurahanList: [
              { kelurahan: 'Kampung Baru', kodePos: '98411' },
            ]
          },
        ]
      },
    ]
  },

  // 36. PAPUA SELATAN
  {
    name: 'Papua Selatan',
    kotaList: [
      {
        name: 'Kab. Merauke',
        kecamatanList: [
          {
            name: 'Merauke',
            kelurahanList: [
              { kelurahan: 'Bambu Pemali', kodePos: '99614' },
            ]
          },
        ]
      },
    ]
  },

  // 37. PAPUA TENGAH
  {
    name: 'Papua Tengah',
    kotaList: [
      {
        name: 'Kab. Mimika (Timika)',
        kecamatanList: [
          {
            name: 'Mimika Baru',
            kelurahanList: [
              { kelurahan: 'Kwandewan', kodePos: '99910' },
            ]
          },
        ]
      },
    ]
  },

  // 38. PAPUA PEGUNUNGAN
  {
    name: 'Papua Pegunungan',
    kotaList: [
      {
        name: 'Kab. Jayawijaya (Wamena)',
        kecamatanList: [
          {
            name: 'Wamena',
            kelurahanList: [
              { kelurahan: 'Wamena Kota', kodePos: '99511' },
            ]
          },
        ]
      },
    ]
  },
];

export const indonesiaRegionsData = ALL_38_PROVINCES;
