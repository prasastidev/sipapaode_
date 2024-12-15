
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '675e368d0035261d50ec'; // Replace with your collection ID

export async function getTableDataDokLPPD() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
         [ 
            Query.equal('Jenis_laporan', ['Laporan LPPD']),
            Query.orderDesc('$createdAt')
          ]
    );
}

export async function getTableDataDokLKPJ() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
         [ 
            Query.equal('Jenis_laporan', ['Laporan LKPJ']),
            Query.orderDesc('$createdAt')
          ]
    );
}


export async function addTableDokLPPDLKPJ(Kabupaten_Kota, Jenis_laporan, Tahun, Nama_Pengirim, Contac_Person, NIP_pengirim, Instansi_Pengirim, generateid) {
    await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, generateid, {
        Kabupaten_Kota,
        Jenis_laporan,
        Tahun,
        Nama_Pengirim,
        Contac_Person,
        NIP_pengirim,
        Instansi_Pengirim
    });
}


export async function deleteTableData(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}













