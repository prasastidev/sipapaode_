
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '674fa11f000d0adfbe25'; // Replace with your collection ID

export async function getTableData() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[Query.orderDesc('$createdAt')]
	);
}

export async function getTablePengajuanTerakhir() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[ Query.limit(3), Query.orderDesc('$createdAt') ]
	);
}


export async function addTableData(Kategory_KS, Nama, Email, ContactPerson, Instansi, Tentang, Catatan, Status, Estimasi, generateid) {
	await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, generateid, {
		Kategory_KS,
		Nama,
		Email,
		ContactPerson,
		Instansi,
		Tentang,
		Catatan,
		Status, 
		Estimasi
	});
}

export async function UpdateStatusPengajuanKS(Status, Estimasi, id) {
	await databases.updateDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id, {
		Status: Status ,
		Estimasi: Estimasi
	});
}


export async function deleteTableData(id) {
	await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}



