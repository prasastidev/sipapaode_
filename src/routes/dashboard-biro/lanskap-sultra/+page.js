import { redirect } from '@sveltejs/kit';
import { getTableDataWilayah } from '$lib/Datawilayah';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	}

	return {
		TableDatasWilayah : await getTableDataWilayah ()
	};	
}






