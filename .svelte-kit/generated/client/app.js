export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/cari-arsip": [4],
		"/coming-soon": [5],
		"/daftar-informasi-publik": [6],
		"/dashboard-biro": [7,[2]],
		"/dashboard-biro/banner-info": [8,[2]],
		"/dashboard-biro/info-users": [9,[2]],
		"/dashboard-biro/kerjasama": [10,[2]],
		"/dashboard-biro/lanskap-sultra": [11,[2]],
		"/dashboard-biro/laporan-lppd": [12,[2]],
		"/dashboard-biro/otonomi-daerah": [13,[2]],
		"/dashboard-biro/pemerintahan": [14,[2]],
		"/formulir-pengajuan-informasi-publik": [15],
		"/gallery": [16],
		"/kerjasama-antar-pemerintah-daerah-kl": [18],
		"/kerjasama-luar-negeri": [19],
		"/kerjasama-pihak-ketiga": [20],
		"/kerjasama": [~17],
		"/login": [21],
		"/maps-sultra": [22],
		"/penyampaian-lppd": [23],
		"/profil-pimpinan": [25],
		"/profil": [24],
		"/regulasi-produk": [26],
		"/sverdle": [~27],
		"/sverdle/how-to-play": [28]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';