import { writable } from 'svelte/store';
import { ID } from 'appwrite';
import { goto } from '$app/navigation';
import { account } from '$lib/appwrite';
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
		await appwrite.account.deleteSession('current');
		await invalidateAll();
		store.set(null);
		await goto('/');
	}

	return {
		// Exposes the store's value with $user
		subscribe: store.subscribe,
		register,
		login,
		logout,
		init
	};
};

export const user = createUser();
