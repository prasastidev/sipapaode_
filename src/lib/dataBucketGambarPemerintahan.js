
import { ID, Query } from 'appwrite';
import { storage} from '$lib/appwrite';


const BUCKET_ID = '6791fea50005705fec23'; // Replace with your database ID

export async function getDataPhotoPemerintahan() {
    return await storage.listFiles(
        BUCKET_ID,
        // Use a query to show the latest ideas first
        [Query.orderDesc('$createdAt')]
    );
}

export async function deleteDataPhotoPemerintahan(id) {
    await storage.deleteFile(BUCKET_ID, id);
}



