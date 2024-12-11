// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = false;
export const csr = true;


import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';
import { getTableDatakerjaSamaAP } from '$lib/dataKSAntarPemerintah';
import { getTableDatakerjaSamaAP_Berlaku } from '$lib/dataKSAntarPemerintah';

export async function load() {
	return {
        TableDatasLayananOnline : await getTableLayananOnline(),
		TableDataKSAntarPemerintah : await getTableDatakerjaSamaAP(),
		TableDataKSAntarPemerintah_Berlaku : await getTableDatakerjaSamaAP_Berlaku()
	};
}





