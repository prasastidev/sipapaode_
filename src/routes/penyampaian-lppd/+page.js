import { getTableLPPDLPKJ } from '$lib/dataLPPDLPKJ';
import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';

export async function load() {
	return {
        TableDatasLPPDLPKJ : await getTableLPPDLPKJ(),
		TableDatasLayananOnline : await getTableLayananOnline()
	};
}