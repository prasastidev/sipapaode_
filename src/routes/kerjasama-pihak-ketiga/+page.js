// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = false;
export const csr = true;


import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';
import { getTableDatakerjaSamaPK } from '$lib/dataKSPihakKetiga';
import { getTableDatakerjaSamaPK_Berlaku } from '$lib/dataKSPihakKetiga';
import { getTablePengajuanTerakhir} from '$lib/crudPengajuanKSOnline';


export async function load() {
	return {
        TableDatasLayananOnline : await getTableLayananOnline(),
		TableDataKSPihakKetiga : await getTableDatakerjaSamaPK(),
		TableDataKSPihakKetiga_Berlaku : await getTableDatakerjaSamaPK_Berlaku(),
		TableDataPengajuanTerakhir : await getTablePengajuanTerakhir ()
	};
}



