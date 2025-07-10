import { ID, Query } from 'appwrite';
import { databases } from '$lib/appwrite';

const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '673dd7dd0032f01dc205'; // Replace with your collection ID

export async function getTableData() {
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

export async function getTableDataKS_Berlaku() {
    const allDocuments = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
        const response = await databases.listDocuments(
            IDEAS_DATABASE_ID,
            IDEAS_COLLECTION_ID,
            [
                Query.equal('keteranganKS', ['Masih Berlaku']),
                Query.orderDesc('$createdAt'),
                Query.limit(limit),
                Query.offset(offset)
            ]
        );

        allDocuments.push(...response.documents);
        
        hasMore = response.documents.length === limit;
        offset += limit;
    }

    return {
        documents: allDocuments,
        total: allDocuments.length
    };
}

// Tambahkan fungsi untuk pagination server-side (lebih efisien untuk UI)
export async function getTableDataPaginated(page = 1, pageSize = 50, filters = {}) {
    try {
        const offset = (page - 1) * pageSize;
        
        let queries = [
            Query.orderDesc('$createdAt'),
            Query.limit(pageSize),
            Query.offset(offset)
        ];

        // Tambahkan filter jika ada
        if (filters.tahun && filters.tahun !== 'all') {
            queries.push(Query.equal('TahunMulai', [filters.tahun]));
        }
        
        if (filters.keterangan) {
            queries.push(Query.equal('keteranganKS', [filters.keterangan]));
        }

        const response = await databases.listDocuments(
            IDEAS_DATABASE_ID,
            IDEAS_COLLECTION_ID,
            queries
        );

        return {
            documents: response.documents,
            total: response.total,
            page,
            pageSize,
            hasMore: offset + pageSize < response.total
        };
    } catch (error) {
        console.error('Error fetching paginated data:', error);
        throw error;
    }
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
        kategoryKS: kategoryKS,
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