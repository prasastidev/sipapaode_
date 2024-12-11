
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '67525d74001334260b16'; // Replace with your collection ID

export async function getTableEvaluasiKS() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[Query.orderDesc('$createdAt')]
	);
}


export async function UpdateTableEvaluasiKS(SemesterI, SemesterII, id) {
	await databases.updateDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id, {
		SemesterI: SemesterI, SemesterII: SemesterII
	});
}






