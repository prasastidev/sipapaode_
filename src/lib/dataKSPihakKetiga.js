
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '673dd7dd0032f01dc205'; // Replace with your collection ID


export async function getTableDatakerjaSamaPK() {
	const allDocuments = [];
	let offset = 0;
	const limit = 100; // Maksimum yang diizinkan Appwrite
	let hasMore = true;

	while (hasMore) {
		const response = await databases.listDocuments(
			IDEAS_DATABASE_ID,
			IDEAS_COLLECTION_ID,
			[   
				Query.equal('kategoryKS', ['Kerjasama Pihak Ketiga / Swasta']),
				Query.orderDesc('$createdAt'),
				Query.limit(limit),
				Query.offset(offset)
			]
		);

		allDocuments.push(...response.documents);
		
		// Cek apakah masih ada data lagi
		hasMore = response.documents.length === limit;
		offset += limit;
	}

	return {
		documents: allDocuments,
		total: allDocuments.length
	};
}

/**  export async function getTableDatakerjaSamaPK_Berlaku() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[ Query.equal('kategoryKS', ['Kerjasama Pihak Ketiga / Swasta']), 
          Query.equal('keteranganKS', ['Masih Berlaku']),
          Query.orderDesc('$createdAt')
        ]
	);
}
**/

export async function getTableDatakerjaSamaPK_Berlaku() {
	const allDocuments = [];
	let offset = 0;
	const limit = 100; // Maksimum yang diizinkan Appwrite
	let hasMore = true;

	while (hasMore) {
		const response = await databases.listDocuments(
			IDEAS_DATABASE_ID,
			IDEAS_COLLECTION_ID,
			[   
				Query.equal('kategoryKS', ['Kerjasama Pihak Ketiga / Swasta']),
				Query.equal('keteranganKS', ['Masih Berlaku']),
				Query.orderDesc('$createdAt'),
				Query.limit(limit),
				Query.offset(offset)
			]
		);

		allDocuments.push(...response.documents);
		
		// Cek apakah masih ada data lagi
		hasMore = response.documents.length === limit;
		offset += limit;
	}

	return {
		documents: allDocuments,
		total: allDocuments.length
	};
}











