import { redirect } from '@sveltejs/kit';
import { getTableData } from '$lib/crudDataRekapKerjasama';



/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (!account) {
		throw redirect(303, '/');
	} 
		return {
			TableDatas : await getTableData ()
		};	
		
}


