
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '673dd7dd0032f01dc205'; // Replace with your collection ID

export async function getTableData() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[Query.orderDesc('$createdAt')]
	);
}

export async function getTableDataKS_Berlaku() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[ 
          Query.equal('keteranganKS', ['Masih Berlaku']),
          Query.orderDesc('$createdAt')
        ]
	);
}


export async function addTableData(kategoryKS, Jenis, Subjek, Tentang, No_kerjasama, OPD, Mitra, TahunMulai, tanggalMulai, tanggalSelesai, keteranganKS, generateid) {
	await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, generateid, {
		kategoryKS,
		Jenis,
		Subjek,
		Tentang,
		No_kerjasama,
		OPD,
		Mitra,
		TahunMulai,
		tanggalMulai,
		tanggalSelesai,
		keteranganKS
	});
}

export async function UpdateTableDataKS(kategoryKS, Jenis, Subjek, Tentang, No_kerjasama, OPD, Mitra, TahunMulai, tanggalMulai, tanggalSelesai, keteranganKS, id) {
	await databases.updateDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id, {
		kategoryKS: kategoryKS ,
		Jenis: Jenis,
		Subjek: Subjek,
		Tentang: Tentang,
		No_kerjasama: No_kerjasama,
		OPD: OPD,
		Mitra: Mitra,
		TahunMulai: TahunMulai,
		tanggalMulai: tanggalMulai,
		tanggalSelesai: tanggalSelesai,
		keteranganKS: keteranganKS
	});
}


export async function deleteTableData(id) {
	await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}



