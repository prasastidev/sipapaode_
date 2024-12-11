// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = false;
export const csr = true;


import { redirect } from '@sveltejs/kit';
import { getTableDataWilayah } from '$lib/DataWilayah';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	}

	return {
		TableDatasWilayah : await getTableDataWilayah()
	};	
}






