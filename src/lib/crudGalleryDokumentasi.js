
import { ID, Query } from 'appwrite';
import { databases} from '$lib/appwrite';


const IDEAS_DATABASE_ID = '673dd7b2001a83873b47'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '6828d8e40005b0bac665'; // Replace with your collection ID


export async function getTableGalleryDokumentasi() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        // Use a query to show the latest ideas first
         [ 
            Query.limit(18), Query.orderDesc('$createdAt')
          ]
    );
}

export async function addGalleryAlbumDepan(Title, Description, URL, ImageId) {
    await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, ID.unique(), {
        Title,
        Description,
        URL,
        ImageId
    });
}


export async function deleteGalleryAlbumDepan(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}



