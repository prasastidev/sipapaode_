import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67384f1d0028200e3af4'); // Replace with your project ID

export const account = new Account(client);
export  const databases = new Databases(client);
export { ID } from 'appwrite';

export const appwrite = {
    client,
    account,
    databases,
  };