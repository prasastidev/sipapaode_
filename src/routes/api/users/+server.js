import { error } from '@sveltejs/kit';
import { Client, Users, ID } from 'node-appwrite';
import { 
  PUBLIC_APPWRITE_ENDPOINT,
  PUBLIC_APPWRITE_PROJECT_ID,
  PUBLIC_APPWRITE_API_KEY
} from '$env/static/public';

const client = new Client()
.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
.setProject(PUBLIC_APPWRITE_PROJECT_ID)
.setKey(PUBLIC_APPWRITE_API_KEY);

const users = new Users(client);

export async function GET() {
  try {
    const usersList = await users.list();
    return new Response(JSON.stringify({ users: usersList.users }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch users' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    console.log('Creating user with data:', data);

    if (!data.email || !data.password || !data.name) {
      throw new Error('Missing required fields');
    }

    // Create user with null phone parameter
    const newUser = await users.create(
      ID.unique(),
      data.email,
      null,  // phone parameter set to null
      data.password,
      data.name
    );
    
    // Set initial preferences after user creation
    await users.updatePrefs(newUser.$id, {
      Role: 'User'
    });
    
    console.log('User created successfully:', newUser);

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create user',
        details: error.response || {} 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
