// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = true;
export const csr = true;


import { getTableEvaluasiKS } from '$lib/PengirimanEvaluasiKS';
import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';

export async function load() {
	return {
        TableDatasEvaluasiKS : await getTableEvaluasiKS(),
		TableDatasLayananOnline : await getTableLayananOnline()
	};
}