import { getTableEvaluasiKS } from '$lib/PengirimanEvaluasiKS';
import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';

export async function load() {
	return {
        TableDatasEvaluasiKS : await getTableEvaluasiKS(),
		TableDatasLayananOnline : await getTableLayananOnline()
	};
}