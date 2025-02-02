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
  
  export async function PATCH({ request, params }) {
    try {
      const data = await request.json();
      console.log('Update data received:', { 
        ...data, 
        password: data.password ? '[REDACTED]' : undefined 
      });
  
      const updatePromises = [];
  
      // Only attempt to update fields that were actually sent
      if (data.name) {
        updatePromises.push(
          users.updateName(params.userId, data.name)
            .catch(error => {
              console.error('Error updating name:', error);
              throw new Error(`Failed to update name: ${error.message}`);
            })
        );
      }
  
      if (data.email) {
        updatePromises.push(
          users.updateEmail(params.userId, data.email)
            .catch(error => {
              console.error('Error updating email:', error);
              throw new Error(`Failed to update email: ${error.message}`);
            })
        );
      }
  
      if (data.password && data.password.trim() !== '') {
        updatePromises.push(
          users.updatePassword(params.userId, data.password)
            .catch(error => {
              console.error('Error updating password:', error);
              throw new Error(`Failed to update password: ${error.message}`);
            })
        );
      }
  
      // Wait for all updates to complete
      await Promise.all(updatePromises);
  
      return new Response(
        JSON.stringify({ message: 'User updated successfully' }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (error) {
      console.error('Update failed:', {
        message: error.message,
        stack: error.stack,
      });
  
      return new Response(
        JSON.stringify({ 
          error: 'Failed to update user', 
          details: error.message 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }