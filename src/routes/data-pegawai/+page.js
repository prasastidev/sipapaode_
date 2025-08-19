export const prerender = true;
export const ssr = true;
export const csr = true;

import {  getTableDataPegawai, getDataByField } from '$lib/dataPegawai.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
     const queries = [
        ['Jenis_Pegawai', 'Pegawai'],
        ['Jenis_Pegawai', 'PHT'],
        ['Jenis_Kelamin', 'Pria'],
        ['Jenis_Kelamin', 'Wanita'],
         ['Pendidikan_Terakhir', 'SD'],
        ['Pendidikan_Terakhir', 'SLTP'],
        ['Pendidikan_Terakhir', 'SLTA'],
        ['Pendidikan_Terakhir', 'Diploma I (D1)'],
        ['Pendidikan_Terakhir', 'Diploma II (D2)'],
        ['Pendidikan_Terakhir', 'Diploma III (D3)'],
        ['Pendidikan_Terakhir', 'Sarjana (S1)'],
        ['Pendidikan_Terakhir', 'Pasca Sarjana (S2)'],
        ['Golongan', 'Golongan IA'],
        ['Golongan', 'Golongan IB'],
        ['Golongan', 'Golongan IC'],
        ['Golongan', 'Golongan ID'],
        ['Golongan', 'Golongan IIA'],
        ['Golongan', 'Golongan IIB'],
        ['Golongan', 'Golongan IIC'],
        ['Golongan', 'Golongan IID'],
        ['Golongan', 'Golongan IIIA'],
        ['Golongan', 'Golongan IIIB'],
        ['Golongan', 'Golongan IIIC'],
        ['Golongan', 'Golongan IIID'],
        ['Golongan', 'Golongan IVA'],
        ['Golongan', 'Golongan IVB'],
        ['Golongan', 'Golongan IVC'],
        ['Golongan', 'Golongan IVD'],
        ['Golongan', 'Golongan IVE'],
    ];

    // Eksekusi semua query secara parallel
    const [allPegawai, ...results] = await Promise.all([
        getTableDataPegawai(),
        ...queries.map(([field, value]) => getDataByField(field, value))
    ]);

    // Mapping hasil ke struktur yang diharapkan
    const keys = [
        'TableDataSPegawai', 'TableDataSHonorer', 'TableDataPria', 'TableDataWanita',
        'TableDataSD', 'TableDataSLTP', 'TableDataSLTA', 'TableDataDI', 'TableDataDII', 'TableDataDIII', 'TableDataSarjana', 'TableDataPascaSarjana',
        'TableDataGolIA', 'TableDataGolIB', 'TableDataGolIC', 'TableDataGolID',
        'TableDataGolIIA', 'TableDataGolIIB', 'TableDataGolIIC', 'TableDataGolIID',
        'TableDataGolIIIA', 'TableDataGolIIIB', 'TableDataGolIIIC', 'TableDataGolIIID',
        'TableDataGolIVA', 'TableDataGolIVB', 'TableDataGolIVC', 'TableDataGolIVD', 'TableDataGolIVE'
    ];

    const data = { TableDataPegawai: allPegawai };
    keys.forEach((key, index) => {
        data[key] = results[index];
    });

    return data;
}