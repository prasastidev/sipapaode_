
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const ssr = false;
export const prerender = true;
export const csr = true;


import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';
import { getTableTextInfo } from '$lib/textInfoBanner';
import { getTableDataWilayah } from '$lib/DataWilayah';




export async function load() {
	return {
        TableDatasLayananOnline : await getTableLayananOnline(),
		TableDatasTextInfo : await getTableTextInfo (),
		TableDatasWilayah : await getTableDataWilayah()
	};
}





	










