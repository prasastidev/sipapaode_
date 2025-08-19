
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
	 // 1. Ambil semua data pegawai dari database
    const allPegawaiData = await getTableDataPegawai();
    const documents = allPegawaiData.documents || [];

    const pegawaiByJabatan = {};
    for (const pegawai of documents) {
        if (pegawai.jabatanOrganisasi) {
            pegawaiByJabatan[pegawai.jabatanOrganisasi] = pegawai;
        }
    }

	return {
        TableDatasLayananOnline : await getTableLayananOnline(),
		TableDatasTextInfo : await getTableTextInfo (),
		TableDatasWilayah : await getTableDataWilayah(),
		TableDatasGallery : await getTableGalleryFront(),
		pegawaiByJabatan
	};
}





	










