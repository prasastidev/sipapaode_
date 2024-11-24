import { getTableLPPDLPKJ } from '$lib/dataLPPDLPKJ';

export async function load() {
	return {
        TableDatasLPPDLPKJ : await getTableLPPDLPKJ()
	};
}