// $lib/dataPegawai.js
import { ID, Query } from 'appwrite';
import { databases } from '$lib/appwrite';

const IDEAS_DATABASE_ID = '673dd7b2001a83873b47';
const IDEAS_COLLECTION_ID = '6798709400064d912ec1';

// Function untuk mendapatkan data pegawai berdasarkan status
export async function getTableDataStatusPegawai() {
    return await getTableData([Query.equal('Jenis_Pegawai', ['Pegawai'])]);
}

export async function getTableDataStatusHonorer() {
    return await getTableData([Query.equal('Jenis_Pegawai', ['PHT'])]);
}

// Function utama untuk query dengan parameter fleksibel
export async function getTableData(filters = [], orderBy = '$createdAt', orderDirection = 'desc', limit = 200) {
    const queries = [];
    
    // Tambahkan filter jika ada
    if (filters.length > 0) {
        queries.push(...filters);
    }
    
    // Tambahkan ordering
    if (orderDirection === 'desc') {
        queries.push(Query.orderDesc(orderBy));
    } else {
        queries.push(Query.orderAsc(orderBy));
    }
    
    // Tambahkan limit
    if (limit) {
        queries.push(Query.limit(limit));
    }
    
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        queries
    );
}

// Function untuk mendapatkan semua data pegawai
export async function getTableDataPegawai() {
    return await getTableData([], '$createdAt', 'asc', 200);
}

// Function untuk mendapatkan data berdasarkan field tertentu
export async function getDataByField(field, value) {
    return await getTableData([Query.equal(field, [value])]);
}

// Function untuk mendapatkan semua data dengan client-side filtering (lebih efisien)
export async function getAllPegawaiData() {
    const allData = await getTableDataPegawai();
    const documents = allData.documents;
    
    // Group data berdasarkan berbagai kriteria
    const grouped = {
        // Status Pegawai
        pegawai: documents.filter(doc => doc.Jenis_Pegawai === 'Pegawai'),
        honorer: documents.filter(doc => doc.Jenis_Pegawai === 'PHT'),
        
        // Jenis Kelamin
        pria: documents.filter(doc => doc.Jenis_Kelamin === 'Pria'),
        wanita: documents.filter(doc => doc.Jenis_Kelamin === 'Wanita'),
        
        // Pendidikan
        sltp: documents.filter(doc => doc.Pendidikan_Terakhir === 'SLTP'),
        slta: documents.filter(doc => doc.Pendidikan_Terakhir === 'SLTA'),
        diii: documents.filter(doc => doc.Pendidikan_Terakhir === 'Diploma III (D3)'),
        sarjana: documents.filter(doc => doc.Pendidikan_Terakhir === 'Sarjana (S1)'),
        pascaSarjana: documents.filter(doc => doc.Pendidikan_Terakhir === 'Pasca Sarjana (S2)'),
        
        // Golongan
        golIA: documents.filter(doc => doc.Golongan === 'Golongan IA'),
        golIB: documents.filter(doc => doc.Golongan === 'Golongan IB'),
        golIC: documents.filter(doc => doc.Golongan === 'Golongan IC'),
        golID: documents.filter(doc => doc.Golongan === 'Golongan ID'),
        golIIA: documents.filter(doc => doc.Golongan === 'Golongan IIA'),
        golIIB: documents.filter(doc => doc.Golongan === 'Golongan IIB'),
        golIIC: documents.filter(doc => doc.Golongan === 'Golongan IIC'),
        golIID: documents.filter(doc => doc.Golongan === 'Golongan IID'),
        golIIIA: documents.filter(doc => doc.Golongan === 'Golongan IIIA'),
        golIIIB: documents.filter(doc => doc.Golongan === 'Golongan IIIB'),
        golIIIC: documents.filter(doc => doc.Golongan === 'Golongan IIIC'),
        golIIID: documents.filter(doc => doc.Golongan === 'Golongan IIID'),
        golIVA: documents.filter(doc => doc.Golongan === 'Golongan IVA'),
        golIVB: documents.filter(doc => doc.Golongan === 'Golongan IVB'),
        golIVC: documents.filter(doc => doc.Golongan === 'Golongan IVC'),
        golIVD: documents.filter(doc => doc.Golongan === 'Golongan IVD'),
        golIVE: documents.filter(doc => doc.Golongan === 'Golongan IVE'),
    };
    
    return {
        all: allData,
        grouped
    };
}

// CRUD Functions (tetap sama)
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