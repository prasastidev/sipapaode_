import { redirect } from '@sveltejs/kit';
import { getTableData } from '$lib/crudPengajuanKSOnline';



/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	}

	return {
		TableDataPengajuanKSOnline : await getTableData ()
	};	
}






