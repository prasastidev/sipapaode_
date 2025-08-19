// src/hooks.client.js
import { error } from '@sveltejs/kit';

export async function handleError({ error, event }) {
  // Check if it's a network error
  if (error?.code === 'NETWORK_ERROR' || 
      error?.message?.includes('fetch') || 
      !navigator.onLine) {
    return {
      message: 'Periksa koneksi internet Anda',
      code: 'NETWORK_ERROR'
    };
  }
  
  return {
    message: 'Terjadi kesalahan internal'
  };
}