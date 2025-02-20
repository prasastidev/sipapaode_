// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = false;
export const csr = true;


import { getTableDataWilayah } from '$lib/DataWilayah';


export async function load() {
	return {
        TableDatasWilayah : await getTableDataWilayah()
	};
}



