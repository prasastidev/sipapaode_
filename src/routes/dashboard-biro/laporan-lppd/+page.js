import { redirect } from '@sveltejs/kit';
import { getTableLPPDLPKJ } from '$lib/dataLPPDLPKJ';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	}

	return {
		TableDatasLPPDLPKJ : await getTableLPPDLPKJ ()
	};	
}






