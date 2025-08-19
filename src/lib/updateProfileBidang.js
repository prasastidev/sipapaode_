import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '68a02805001f4447ed24'; // Replace with your collection ID

export async function getDataProfileBidang() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
        [Query.orderDesc('$createdAt')]
    );
}


export async function UpdateDataProfileBidang(tentang, tupoksi, programPrioritas, id) {
    await databases.updateDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id, {
        tentang: tentang, tupoksi: tupoksi, programPrioritas: programPrioritas
    });
}






