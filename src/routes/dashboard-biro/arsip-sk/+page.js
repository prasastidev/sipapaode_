// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = false;
export const csr = true;

import { redirect } from '@sveltejs/kit';
import {getTableSK_GubWakil} from '$lib/DokumenArsipSK';  
import {getTableSK_BupatiWakil} from '$lib/DokumenArsipSK'; 
import {getTableSK_DPRD} from '$lib/DokumenArsipSK';    



/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	}

	return {
		TableDataSK_GubWakil : await getTableSK_GubWakil (),
        TableDataSK_BupatiWakil : await getTableSK_BupatiWakil (),
        TableDataSK_DPRD : await getTableSK_DPRD ()
	};	
}






