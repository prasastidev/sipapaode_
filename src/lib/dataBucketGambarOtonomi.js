
import { ID, Query } from 'appwrite';
import { storage} from '$lib/appwrite';


const BUCKET_ID = '67920a70002df0712bce'; // Replace with your database ID

export async function getDataPhotoOtonomi() {
    return await storage.listFiles(
        BUCKET_ID,
        // Use a query to show the latest ideas first
        [Query.orderDesc('$createdAt')]
    );
}

export async function deleteDataPhotoOtonomi(id) {
    await storage.deleteFile(BUCKET_ID, id);
}



