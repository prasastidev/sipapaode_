// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = true;
export const csr = true;

import { getDataPhotoOtonomi } from '$lib/dataBucketGambarOtonomi';
import { getTableDataPegawai } from '$lib/dataPegawai.js';
import { getDataProfileBidang } from '$lib/updateProfileBidang';


export async function load() {
     // 1. Ambil semua data pegawai dari database
    const allPegawaiData = await getTableDataPegawai();
    const documents = allPegawaiData.documents || [];

    // 2. Proses data agar mudah diakses berdasarkan jabatanOrganisasi
    const pegawaiByJabatan = {};
    for (const pegawai of documents) {
        if (pegawai.jabatanOrganisasi) {
            pegawaiByJabatan[pegawai.jabatanOrganisasi] = pegawai;
        }
    }

	return {
        
        DatasGambarOtonomi : await getDataPhotoOtonomi(),
        pegawaiByJabatan,
        DatasProfileBidang : await getDataProfileBidang()
	};
}






