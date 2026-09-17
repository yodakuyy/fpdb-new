// Master Data Region Service for Indonesia (38 Provinsi)
// Fully self-contained, instant zero-latency, 100% offline-ready & reliable.

import { ALL_38_PROVINCES } from '../data/indonesiaRegions';
import type { PostalItem } from '../data/indonesiaRegions';

export interface RegionOption {
  id: string;
  name: string;
}

// 1. Ambil Semua 38 Provinsi
export function getAllProvinces(): string[] {
  return ALL_38_PROVINCES.map(p => p.name);
}

// 2. Ambil Kota / Kabupaten Berdasarkan Provinsi
export function getCitiesByProvince(provinceName: string): string[] {
  const prov = ALL_38_PROVINCES.find(
    p => p.name.toLowerCase() === provinceName.toLowerCase() ||
         provinceName.toLowerCase().includes(p.name.toLowerCase()) ||
         p.name.toLowerCase().includes(provinceName.toLowerCase())
  );
  if (!prov || !prov.kotaList) return [];
  return prov.kotaList.map(k => k.name);
}

// 3. Ambil Kecamatan Berdasarkan Provinsi & Kota
export function getDistrictsByCity(provinceName: string, cityName: string): string[] {
  const prov = ALL_38_PROVINCES.find(
    p => p.name.toLowerCase() === provinceName.toLowerCase() ||
         provinceName.toLowerCase().includes(p.name.toLowerCase()) ||
         p.name.toLowerCase().includes(provinceName.toLowerCase())
  );
  if (!prov) return [];

  const kota = prov.kotaList.find(
    k => k.name.toLowerCase() === cityName.toLowerCase() ||
         cityName.toLowerCase().includes(k.name.toLowerCase()) ||
         k.name.toLowerCase().includes(cityName.toLowerCase())
  );
  if (!kota || !kota.kecamatanList) return [];
  return kota.kecamatanList.map(kec => kec.name);
}

// 4. Ambil Kelurahan Berdasarkan Provinsi, Kota, & Kecamatan
export function getVillagesByDistrict(provinceName: string, cityName: string, districtName: string): PostalItem[] {
  const prov = ALL_38_PROVINCES.find(
    p => p.name.toLowerCase() === provinceName.toLowerCase() ||
         provinceName.toLowerCase().includes(p.name.toLowerCase()) ||
         p.name.toLowerCase().includes(provinceName.toLowerCase())
  );
  if (!prov) return [];

  const kota = prov.kotaList.find(
    k => k.name.toLowerCase() === cityName.toLowerCase() ||
         cityName.toLowerCase().includes(k.name.toLowerCase()) ||
         k.name.toLowerCase().includes(cityName.toLowerCase())
  );
  if (!kota) return [];

  const kec = kota.kecamatanList.find(
    d => d.name.toLowerCase() === districtName.toLowerCase() ||
         districtName.toLowerCase().includes(d.name.toLowerCase()) ||
         d.name.toLowerCase().includes(districtName.toLowerCase())
  );
  if (!kec || !kec.kelurahanList) return [];
  return kec.kelurahanList;
}

// 5. Cari Kode Pos Berdasarkan Kelurahan & Kecamatan
export function findPostalCode(provinceName: string, cityName: string, districtName: string, villageName: string): string {
  const villages = getVillagesByDistrict(provinceName, cityName, districtName);
  const found = villages.find(v => v.kelurahan.toLowerCase() === villageName.toLowerCase());
  if (found) return found.kodePos;

  // Global search fallback across dataset
  for (const prov of ALL_38_PROVINCES) {
    for (const kota of prov.kotaList) {
      for (const kec of kota.kecamatanList) {
        const item = kec.kelurahanList.find(v => v.kelurahan.toLowerCase() === villageName.toLowerCase());
        if (item) return item.kodePos;
      }
    }
  }

  return '';
}

// Formatter Title Case
export function formatTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word === 'dki') return 'DKI';
      if (word === 'di') return 'DI';
      if (word === 'ikn') return 'IKN';
      if (word === 'kiic') return 'KIIC';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
