// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const ssr = false;
export const prerender = true;
export const csr = true;

import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';
import { getTableTextInfo } from '$lib/textInfoBanner';
import { getTableDataWilayah } from '$lib/DataWilayah';
import { getTableGalleryFront } from '$lib/crudGalleryDokumentasi';
import { getTableDataPegawai } from '$lib/dataPegawai.js';

export async function load() {
    
    // 1. Mulai SEMUA permintaan data secara bersamaan
    const [
        TableDatasLayananOnline,
        TableDatasTextInfo,
        TableDatasWilayah,
        TableDatasGallery,
        allPegawaiData // Data pegawai juga diambil secara paralel
    ] = await Promise.all([
        getTableLayananOnline(),
        getTableTextInfo(),
        getTableDataWilayah(),
        getTableGalleryFront(),
        getTableDataPegawai()
    ]);

    // 2. Proses data pegawai SETELAH datanya diterima
    const documents = allPegawaiData.documents || [];
    const pegawaiByJabatan = {};
    for (const pegawai of documents) {
        if (pegawai.jabatanOrganisasi) {
            pegawaiByJabatan[pegawai.jabatanOrganisasi] = pegawai;
        }
    }

    // 3. Kembalikan semua data yang sudah terkumpul
    return {
        TableDatasLayananOnline,
        TableDatasTextInfo,
        TableDatasWilayah,
        TableDatasGallery,
        pegawaiByJabatan
    };
}