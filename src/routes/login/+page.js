// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = false;
export const csr = true;

import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
  // Gets the data returned from the root layout
  const { account } = await parent();
  if (account) {
    redirect(303, "/dashboard-biro");
  }
};