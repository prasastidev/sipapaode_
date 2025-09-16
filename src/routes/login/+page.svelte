<script>
  // Komponen dari Flowbite Svelte
  import { Button, Label, Input } from 'flowbite-svelte';
  
  // Aset gambar (logo dan gambar latar)
  import ImagelogoSipapaOde from '$lib/images/SipapaOde-logo.webp';
  // GANTI URL INI dengan path ke gambar gedung Anda
  import ImageGedung from '$lib/images/Gedung-Kantor.png'; 

  import { user } from '$lib/user';

  // Fungsi login tetap sama
  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await user.login(formData.get('email'), formData.get('password'));
  };
</script>

<svelte:head>
  <title>Login Sipapaode</title>
  <meta name="description" content="Login Sipapaode - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<main class="flex items-center justify-center min-h-screen p-2">
  
  <div class="flex w-full shadow-2xl rounded-2xl overflow-hidden bg-gray-100 gap-2">
    
    <div class="relative hidden md:block w-1/2 bg-blue-100 p-6">
      <img src={ImageGedung} alt="Biro Pemerintahan dan Otonomi Daerah" class="w-full h-full object-cover rounded-xl shadow-md"  style="object-fit: fill;">
      
      </div>
    
    <div class="w-full md:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
      
      <div class="text-center mb-8">
        <img class="mx-auto w-24 h-20 mb-4" src={ImagelogoSipapaOde} alt="Logo Sipapaode">
        <h2 class="text-2xl font-bold text-gray-800">Login Ke Dashboard Anda</h2>
      </div>
      
      <form class="space-y-6" on:submit={login}>
        <div>
          <Label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email address</Label>
          <Input type="email" id="email" name="email" placeholder="nama@email.com" required />
        </div>
        
        <div>
          <Label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</Label>
          <Input type="password" id="password" name="password" placeholder="••••••••" required />
        </div>
        
        <Button type="submit" class="w-full" color="purple">Log In</Button>
      </form>
      
      <p class="mt-8 text-center text-sm text-gray-600">
        Tidak Punya Akun? <a href="#" class="font-semibold text-purple-600 hover:text-purple-500">Registrasi</a>
      </p>
      
    </div>
  </div>
  
</main>