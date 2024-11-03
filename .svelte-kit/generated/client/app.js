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
	() => import('./nodes/19')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/cari-arsip": [4],
		"/daftar-informasi-publik": [5],
		"/dashboard-biro": [6,[2]],
		"/dashboard-biro/kerjasama": [7,[2]],
		"/dashboard-biro/otonomi-daerah": [8,[2]],
		"/dashboard-biro/pemerintahan": [9,[2]],
		"/formulir-pengajuan-informasi-publik": [10],
		"/gallery": [11],
		"/kerjasama": [~12],
		"/login": [13],
		"/maps-sultra": [14],
		"/penyampaian-lppd": [15],
		"/profil-pimpinan": [17],
		"/profil": [16],
		"/sverdle": [~18],
		"/sverdle/how-to-play": [19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';
