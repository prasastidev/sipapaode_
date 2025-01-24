// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export const ssr = true;
export const csr = true;

import { getDataPhotoKSGallery } from '$lib/dataBucketGambar';
import { getDataPhotoOtonomiGallery } from '$lib/dataBucketGambarOtonomi';
import { getDataPhotoPemerintahanGallery } from '$lib/dataBucketGambarPemerintahan';


export async function load() {
	return {
        DatasGambarKS : await getDataPhotoKSGallery(),
		DatasGambarOtonomi : await getDataPhotoOtonomiGallery(),
		DatasGambarPemerintahan : await getDataPhotoPemerintahanGallery()
	};
}






