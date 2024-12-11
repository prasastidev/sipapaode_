import { redirect } from '@sveltejs/kit';
import { getTableTextInfo } from '$lib/textInfoBanner';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	}

	return {
		TableDatasTextInfo : await getTableTextInfo ()
	};	
}






