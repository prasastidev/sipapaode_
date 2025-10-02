// page.js
export const prerender = true;
export const ssr = false;
export const csr = true;

import { redirect } from '@sveltejs/kit';
import { getTableGalleryDokumentasi } from '$lib/crudGalleryDokumentasi';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    try {
        const { account } = await parent();
        if (!account) {
            throw redirect(303, '/');
        } 
        
        const galleryData = await getTableGalleryDokumentasi();
        
      //  console.log('Gallery data from function:', galleryData);
        
        return {
            DatasGallery: galleryData || { files: [], total: 0 }
        };
    } catch (error) {
        console.error('Error in load function:', error);
        
        // If it's a redirect, re-throw it
        if (error.status === 303) {
            throw error;
        }
        
        // For other errors, return empty data
        return {
            DatasGallery: { files: [], total: 0 }
        };
    }
}