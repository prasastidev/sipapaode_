
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '673dd7dd0032f01dc205'; // Replace with your collection ID

export async function getTableDatakerjaSamaAP() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[ Query.equal('kategoryKS', ['Kerjasama Antar Pemerintah Daerah dan K/L']),
          Query.orderDesc('$createdAt')
        ]
	);
}

export async function getTableDatakerjaSamaAP_Berlaku() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[ Query.equal('kategoryKS', ['Kerjasama Antar Pemerintah Daerah dan K/L']), 
          Query.equal('keteranganKS', ['Masih Berlaku']),
          Query.orderDesc('$createdAt')
        ]
	);
}











