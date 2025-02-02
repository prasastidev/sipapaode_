import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { account, ID } from '$lib/appwrite.js';
import { invalidateAll } from '$app/navigation';

// Avoid auth calls in server-side, so that a user is not shared between requests
const isBrowser = typeof window !== 'undefined';

const createUser = () => {
	const store = writable(null);

	async function init() {
		if (!isBrowser) return;
		try {
			store.set(await account.get());
			
		} catch (e) {
			store.set(null);
		}
	}

	init();

	async function register(email, password, name) {
		if (!isBrowser) return;
		await account.create(ID.unique(), email, password, name);
		await login(email, password);
	}

	async function login(email, password) {
		if (!isBrowser) return;
		await account.createEmailPasswordSession(email, password);
		await init();
		await invalidateAll();
		goto('/dashboard-biro'); // Redirect to home page after login
		
	}

	async function logout() {
		await account.deleteSession('current');
		store.set(null);
		await invalidateAll();	
		goto('/');
		window.location.reload();
	}

	async function changePassword(oldPassword, newPassword) {
		if (!isBrowser) return;
		try {
		  await account.updatePassword(newPassword, oldPassword);
		  return { success: true, message: 'Password berhasil diubah' };
		} catch (error) {
		  return { 
			success: false, 
			message: error.message || 'Gagal mengubah password'
		  };
		}
	  }
	

	return {
		// Exposes the store's value with $user
		subscribe: store.subscribe,
		register,
		login,
		logout,
		changePassword,
		init
	};
};

export const user = createUser();
