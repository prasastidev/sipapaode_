// +page.js - Versi dengan multiple queries parallel
export const prerender = true;
export const ssr = false;
export const csr = true;

import { redirect } from '@sveltejs/kit';
import { getTableDataPegawai, getDataByField } from '$lib/dataPegawai';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    const { account } = await parent();
    if (!account) {
        throw redirect(303, '/');
    }

    // Definisikan semua query yang diperlukan
    const queries = [
        ['Jenis_Pegawai', 'Pegawai'],
        ['Jenis_Pegawai', 'PHT'],
        ['Jenis_Kelamin', 'Pria'],
        ['Jenis_Kelamin', 'Wanita'],
        ['Pendidikan_Terakhir', 'SLTP'],
        ['Pendidikan_Terakhir', 'SLTA'],
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
        'TableDataSLTP', 'TableDataSLTA', 'TableDataDIII', 'TableDataSarjana', 'TableDataPascaSarjana',
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