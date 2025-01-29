
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '6798709400064d912ec1'; // Replace with your collection ID

export async function getTableDataPegawai() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
        [Query.orderDesc('$createdAt')]
    );
}

export async function getTableDataStatusPegawai() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[ 
          Query.equal('Jenis_Pegawai', ['Pegawai']),
          Query.orderDesc('$createdAt')
        ]
	);
}

export async function getTableDataStatusHonorer() {
	return await databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[ 
          Query.equal('Jenis_Pegawai', ['Honorer']),
          Query.orderDesc('$createdAt')
        ]
	);
}



export async function addTableDataPegawai(Nama, URL_PhotoProfile, NIP, Golongan, Jabatan, Tanggal_lahir, Jenis_Kelamin, Pendidikan_Terakhir, Jenis_Pegawai) {
    await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, ID.unique(), {
        Nama,
        URL_PhotoProfile,
        NIP,
        Golongan,
        Jabatan,
        Tanggal_lahir,
        Jenis_Kelamin,
        Pendidikan_Terakhir, 
        Jenis_Pegawai
    });
}

export async function UpdatePegawai(Nama, URL_PhotoProfile, NIP, Golongan, Jabatan, Tanggal_lahir, Jenis_Kelamin, Pendidikan_Terakhir, Jenis_Pegawai, id) {
    await databases.updateDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id, {
        Nama: Nama,
        URL_PhotoProfile : URL_PhotoProfile,
        NIP: NIP,
        Golongan: Golongan,
        Jabatan: Jabatan,
        Tanggal_lahir: Tanggal_lahir,
        Jenis_Kelamin: Jenis_Kelamin,
        Pendidikan_Terakhir: Pendidikan_Terakhir,
        Jenis_Pegawai: Jenis_Pegawai
    });
}


export async function deleteTableData(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}



