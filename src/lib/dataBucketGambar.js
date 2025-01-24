
import { ID, Query } from 'appwrite';
import { storage} from '$lib/appwrite';


const BUCKET_ID = '67545c85000bd5d33ef2'; // Replace with your database ID

export async function getDataPhotoKerjaSama() {
	return await storage.listFiles(
		BUCKET_ID,
		// Use a query to show the latest ideas first
		[Query.orderDesc('$createdAt')]
	);
}

export async function getDataPhotoKSGallery() {
	return await storage.listFiles(
		BUCKET_ID,
		// Use a query to show the latest ideas first
		[ Query.limit(18), Query.orderDesc('$createdAt') ]
	);
}

export async function deleteDataPhotoKS(id) {
	await storage.deleteFile(BUCKET_ID, id);
}



