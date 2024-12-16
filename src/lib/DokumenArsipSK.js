
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '675eceab003c3d151f77'; // Replace with your collection ID

export async function getTableSK_GubWakil() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
         [ 
            Query.equal('CategorySK', ['Gubernur dan Wakil']),
            Query.orderDesc('$createdAt')
          ]
    );
}

export async function getTableSK_BupatiWakil() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
         [ 
            Query.equal('CategorySK', ['Bupati dan Wakil']),
            Query.orderDesc('$createdAt')
          ]
    );
}


export async function getTableSK_DPRD() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
         [ 
            Query.equal('CategorySK', ['DPRD']),
            Query.orderDesc('$createdAt')
          ]
    );
}


export async function addTableArsipSK(Penerbit, Nomor_SK, TanggalSK, Tentang, Ringkasan_Isi, CategorySK, generateid) {
    await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, generateid, {
        Penerbit,
        Nomor_SK,
        TanggalSK,
        Tentang,
        Ringkasan_Isi,
        CategorySK
    });
}


export async function deleteTableData(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}



