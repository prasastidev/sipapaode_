<script>
  // Navigasi SvelteKit
  import { goto } from '$app/navigation';
  
  // Komponen dari Flowbite Svelte
  import { Button, Label, Input, Spinner } from 'flowbite-svelte';
  
  // Aset gambar
  import ImagelogoSipapaOde from '$lib/images/SipapaOde-logo.webp';
  import ImageGedung from '$lib/images/Gedung-Kantor.png'; 

  // User store
  import { user } from '$lib/user';

  // State untuk menangani proses login
  let isLoading = false;
  let errorMessage = '';

  const login = async (e) => {
    e.preventDefault();
    isLoading = true; // Mulai loading
    errorMessage = ''; // Hapus pesan error sebelumnya

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // Tunggu proses login selesai
      await user.login(email, password);
      
      // Jika berhasil, langsung redirect ke dashboard
      goto('/dashboard-biro', { replaceState: true });

    } catch (error) {
      // Jika gagal, tampilkan pesan error
      console.error('Login Gagal:', error);
      errorMessage = 'Email atau password yang Anda masukkan salah.';
    } finally {
      // Selesai loading
      isLoading = false;
    }
  };
</script>

<svelte:head>
  <title>Login Sipapaode</title>
  <meta name="description" content="Login Sipapaode - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<main class="flex items-center justify-center min-h-screen p-2">
  
  <div class="flex w-full shadow-2xl rounded-2xl overflow-hidden bg-gray-100 gap-2">
    
    <div class="relative hidden md:block w-1/2 bg-blue-100 p-6">
      <img src={ImageGedung} alt="Biro Pemerintahan dan Otonomi Daerah" class="w-full h-full object-cover rounded-xl shadow-md" style="object-fit: fill;">
    </div>
    
    <div class="w-full md:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
      
      <div class="text-center mb-8">
        <img class="mx-auto w-24 h-20 mb-4" src={ImagelogoSipapaOde} alt="Logo Sipapaode">
        <h2 class="text-2xl font-bold text-gray-800">Login Ke Dashboard Anda</h2>
      </div>
      
      <form class="space-y-6" on:submit={login}>
        <div>
          <Label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email address</Label>
          <Input type="email" id="email" name="email" placeholder="nama@email.com" required disabled={isLoading} />
        </div>
        
        <div>
          <Label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</Label>
          <Input type="password" id="password" name="password" placeholder="••••••••" required disabled={isLoading} />
        </div>
        
        {#if errorMessage}
          <p class="text-sm text-red-600 text-center">{errorMessage}</p>
        {/if}

        <Button type="submit" class="w-full" color="purple" disabled={isLoading}>
          {#if isLoading}
            <Spinner class="mr-3" size="4" color="white" />
            <span>Memproses...</span>
          {:else}
            Log In
          {/if}
        </Button>
      </form>
      
      <p class="mt-8 text-center text-sm text-gray-600">
        Tidak Punya Akun? <a href="#" class="font-semibold text-purple-600 hover:text-purple-500">Registrasi</a>
      </p>
      
    </div>
  </div>
  
</main>