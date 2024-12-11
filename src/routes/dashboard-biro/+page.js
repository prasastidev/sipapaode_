import { redirect } from '@sveltejs/kit';
import { getTableDataWilayah } from '$lib/DataWilayah';

// Turn off SSR globally, turning the project into a static site
export const ssr = true;
export const prerender = true;
export const csr = true;


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




