import { appwrite } from "$lib/appwrite";

// Turn off SSR globally, turning the project into a static site
export const ssr = true;
export const prerender = true;
export const csr = true;

export const load = async () => {
  try {
    return {
      account: await appwrite.account.get(),
    };
  } catch {
    return {
      account: null,
    };
  }
};