import { redirect } from "@sveltejs/kit";

// Halaman ini tidak bisa di-prerender karena bergantung pada status login pengguna
export const ssr = true;
export const csr = true;

export const load = async ({ parent }) => {
  // Mengambil data sesi dari layout utama
  const { account } = await parent();

  // Jika pengguna sudah login (ada data 'account'), alihkan ke dashboard
  if (account) {
    throw redirect(303, "/dashboard-biro");
  }
};