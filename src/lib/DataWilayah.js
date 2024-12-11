
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '675788570020efff440b'; // Replace with your collection ID

export async function getTableDataWilayah() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[Query.orderDesc('$createdAt')]
	);
}


export async function UpdateTableDataWilayah(J_Kecamatan, J_Kelurahan, J_Desa, Luas_Wilayah, J_Penduduk, J_Gunung, J_Pulau, Koordinat, KetMap, Situs, id) {
	await databases.updateDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id, {
		J_Kecamatan: J_Kecamatan, J_Kelurahan: J_Kelurahan, J_Desa: J_Desa, Luas_Wilayah: Luas_Wilayah, J_Penduduk: J_Penduduk, J_Gunung: J_Gunung, J_Pulau: J_Pulau, Koordinat: Koordinat, KetMap: KetMap, Situs: Situs
	});
}






