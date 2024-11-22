import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();
export const storage = new Storage(client);
export  const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67384f1d0028200e3af4'); // Replace with your project ID

export const account = new Account(client);

export { ID } from 'appwrite';

export const appwrite = {
    client,
    account,
    databases,
    storage
  };