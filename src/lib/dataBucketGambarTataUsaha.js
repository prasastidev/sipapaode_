
import { ID, Query } from 'appwrite';
import { storage} from '$lib/appwrite';


const BUCKET_ID = '68becd03000631cf9bda'; // Replace with your database ID

export async function getDataPhotoTataUsaha() {
    return await storage.listFiles(
        BUCKET_ID,
        // Use a query to show the latest ideas first
        [Query.orderDesc('$createdAt')]
    );
}

export async function getDataPhotoTataUsahaGallery() {
    return await storage.listFiles(
        BUCKET_ID,
        // Use a query to show the latest ideas first
        [ Query.limit(18), Query.orderDesc('$createdAt') ]
    );
}

export async function deleteDataPhotoTataUsaha(id) {
    await storage.deleteFile(BUCKET_ID, id);
}



