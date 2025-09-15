
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = 'data_pengajuan_permohonan_informasi_'; // Replace with your collection ID


export async function getTableDataPermohonanInformasi() {
    const allDocuments = [];
    let offset = 0;
    const limit = 100; // Maksimum yang diizinkan Appwrite
    let hasMore = true;

    while (hasMore) {
        const response = await databases.listDocuments(
            IDEAS_DATABASE_ID,
            IDEAS_COLLECTION_ID,
            [
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



export async function addTableDataPermohonan(NamaLengkap, NIK, Email, NoContact, Alamat, PermintaanInformasi, TujuanPengajuan, CaraMendapatkan, CaraPemberian, Status, IDBucketLampiranKTP, IDBucketLampiranPengesahan  ) {
    await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, ID.unique(), {
        NamaLengkap,
        NIK,
        Email,
        NoContact,
        Alamat,
        PermintaanInformasi,
        TujuanPengajuan,
        CaraMendapatkan,
        CaraPemberian,
        Status, 
        IDBucketLampiranKTP,
        IDBucketLampiranPengesahan
    });
}

export async function UpdateStatusPermohonanInformasi(Status, id) {
    await databases.updateDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id, {
        Status: Status 
    });
}


export async function deleteTableData(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}



