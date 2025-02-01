import { Client, Users } from 'node-appwrite';
import { json } from '@sveltejs/kit';
import { 
  PUBLIC_APPWRITE_ENDPOINT,
  PUBLIC_APPWRITE_PROJECT_ID,
  PUBLIC_APPWRITE_API_KEY
} from '$env/static/public';


// Initialize Appwrite client
const client = new Client()
.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
.setProject(PUBLIC_APPWRITE_PROJECT_ID)
.setKey(PUBLIC_APPWRITE_API_KEY);

const users = new Users(client);


// Handler untuk DELETE request
export async function DELETE({ params }) {
    try {
      await users.delete(params.userId);
      return new Response();
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  }
  
  // Handler untuk PATCH request
  export async function PATCH({ request, params }) {
    try {
      const data = await request.json();
      
      await users.updateName(params.userId, data.name);
      await users.updateEmail(params.userId, data.email);
      
      return new Response(null, { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500 }
      );
    }
  }