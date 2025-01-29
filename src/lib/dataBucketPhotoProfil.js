
import { ID, Query } from 'appwrite';
import { storage} from '$lib/appwrite';


const BUCKET_ID = '67999587003989233678'; // Replace with your database ID

export async function getDataPhotoProfil() {
    return await storage.listFiles(
        BUCKET_ID,
        // Use a query to show the latest ideas first
        [Query.orderDesc('$createdAt')]
    );
}




