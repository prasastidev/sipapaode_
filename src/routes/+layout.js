import { appwrite } from "$lib/appwrite";

export const ssr = true;
export const prerender = true;
export const csr = true;

export const load = async () => {
  try {
    // 1. Ambil data akun lengkap dari Appwrite
    const fullAccount = await appwrite.account.get();

    // 2. Buat objek BARU yang hanya berisi data yang aman untuk ditampilkan
    const safeAccount = {
      name: fullAccount.name,
      role: fullAccount.prefs?.Role // Mengambil 'Role' dari dalam 'prefs'
      // JANGAN sertakan: $id, email, status, $createdAt, dll.
    };

    // 3. Kembalikan HANYA objek yang sudah aman
    return {
      account: safeAccount,
    };
  } catch {
    // Jika tidak ada sesi login, ini sudah benar
    return {
      account: null,
    };
  }
};