import { getTableLayananOnline } from '$lib/aktivasiLayananOnline';


export async function load() {
	return {
        TableDatasLayananOnline : await getTableLayananOnline()
	};
}