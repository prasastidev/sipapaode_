
<script>
  /** @type {import('./$types').PageData} */
  export let data;
import { Button, Input, Label, Radio } from 'flowbite-svelte';
  
  // Variabel untuk menyimpan file yang diunggah
  let fileKTP = null;
  let filePengesahan = null;

  // Referensi ke elemen input file yang tersembunyi
  let fileInputKTP;
  let fileInputPengesahan;

  // Variabel untuk menyimpan status seret file
  let isDraggingKTP = false;
  let isDraggingPengesahan = false;

  // Variabel untuk data form
  let formData = {
    nama: '',
    email: '',
    nik: '',
    kontak: '',
    alamat: '',
    permintaan: '',
    tujuan: '',
    infoMethod: 'lihat', // Variabel untuk grup radio pertama
    pemberianMethod: 'langsung' // Variabel BARU untuk grup radio kedua
  };

  // --- Fungsi untuk Drag and Drop ---

  function handleDragEnter(event, type) {
    event.preventDefault();
    if (type === 'ktp') isDraggingKTP = true;
    else isDraggingPengesahan = true;
  }

  function handleDragLeave(event, type) {
    event.preventDefault();
    if (type === 'ktp') isDraggingKTP = false;
    else isDraggingPengesahan = false;
  }

  function handleDragOver(event) {
    event.preventDefault(); // Diperlukan agar event 'drop' bisa berjalan
  }

  function handleDrop(event, type) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      if (type === 'ktp') {
        fileKTP = files[0];
        isDraggingKTP = false;
      } else {
        filePengesahan = files[0];
        isDraggingPengesahan = false;
      }
    }
  }
  
  // --- Fungsi untuk menangani pemilihan file dari dialog ---
  function handleFileSelect(event, type) {
    const files = event.target.files;
    if (files.length > 0) {
      if (type === 'ktp') {
        fileKTP = files[0];
      } else {
        filePengesahan = files[0];
      }
    }
  }
  
  // --- Fungsi untuk Submit Form ---

  function handleSubmit() {
    console.log("Form submitted:", formData);
    console.log("File KTP:", fileKTP);
    console.log("File Pengesahan:", filePengesahan);
    // Tambahkan logika pengiriman data ke server di sini
  }
</script>

<svelte:head>
	<title>Formulir Pengajuan Informasi oleh Publik</title>
	<meta name="description" content="Formulir Pengajuan Informasi oleh Publik - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/>
<div class="page-container">
    <header class="info-card">
        <div class="logo">
            <img src="/LogoSultra.webp" alt="Logo Sulawesi Tenggara"/>
        </div>
        <div class="title-container">
            <h1>PERMOHONAN INFORMASI PADA BIRO PEMERINTAHAN DAN OTONOMI DAERAH</h1>
            <h2>SULAWESI TENGGARA</h2>
        </div>
    </header>

</div>

<main class="bg-slate-50 dark:bg-gray-900 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
  <div class="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 border-t-4 border-blue-600">
    <h1 class="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
      FORMULIR PERMOHONAN INFORMASI PADA BIRO PEMERINTAHAN DAN OTONOMI DAERAH PROV. SULAWESI TENGGARA
    </h1>

   <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- Input fields (Nama, Email, etc.) -->
      <div>
        <Label for="nama" class="mb-2">Nama Lengkap (Sesuai KTP)</Label>
        <Input type="text" id="nama" bind:value={formData.nama} placeholder="Masukkan nama lengkap" required />
      </div>
      <div>
        <Label for="email" class="mb-2">Email</Label>
        <Input type="email" id="email" bind:value={formData.email} placeholder="nama@email.com" required />
      </div>
      <div>
        <Label for="nik" class="mb-2">Nomor Induk Kependudukan</Label>
        <Input type="text" id="nik" bind:value={formData.nik} placeholder="Masukkan NIK" required />
      </div>
      <div>
        <Label for="kontak" class="mb-2">Nomor Kontak</Label>
        <Input type="text" id="kontak" bind:value={formData.kontak} placeholder="Masukkan nomor kontak" required />
      </div>
      <div>
        <Label for="alamat" class="mb-2">Alamat</Label>
        <Input type="text" id="alamat" bind:value={formData.alamat} placeholder="Masukkan alamat lengkap" required />
      </div>
      <div>
        <Label for="permintaan" class="mb-2">Permintaan Informasi</Label>
        <Input type="text" id="permintaan" bind:value={formData.permintaan} placeholder="Jelaskan informasi yang diminta" required />
      </div>
      <div>
        <Label for="tujuan" class="mb-2">Tujuan</Label>
        <Input type="text" id="tujuan" bind:value={formData.tujuan} placeholder="Jelaskan tujuan permintaan informasi" required />
      </div>

      <!-- Unggah KTP (Drag & Drop + Click) -->
      <div>
        <Label class="mb-2">Unggah KTP</Label>
        <div
          class="flex items-center justify-center w-full text-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors {isDraggingKTP ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}"
          on:dragenter={(e) => handleDragEnter(e, 'ktp')}
          on:dragleave={(e) => handleDragLeave(e, 'ktp')}
          on:dragover={handleDragOver}
          on:drop={(e) => handleDrop(e, 'ktp')}
          on:click={() => fileInputKTP.click()}
          role="button"
          tabindex="0"
        >
          <input type="file" bind:this={fileInputKTP} class="hidden" on:change={(e) => handleFileSelect(e, 'ktp')} accept="image/*,application/pdf" />
          {#if fileKTP}
            <p class="text-gray-700 dark:text-gray-300">File terpilih: <span class="font-semibold">{fileKTP.name}</span></p>
          {:else}
            <p class="text-gray-500 dark:text-gray-400">Klik untuk memilih atau seret file ke sini <br> (Gambar atau PDF)</p>
          {/if}
        </div>
      </div>
      
      <!-- Unggah Lembar Pengesahan (Drag & Drop + Click) -->
      <div>
        <Label class="mb-2">Lembar Pengesahan Badan Hukum (jika kelompok pemohon / organisasi)</Label>
         <div
          class="flex items-center justify-center w-full text-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors {isDraggingPengesahan ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}"
          on:dragenter={(e) => handleDragEnter(e, 'pengesahan')}
          on:dragleave={(e) => handleDragLeave(e, 'pengesahan')}
          on:dragover={handleDragOver}
          on:drop={(e) => handleDrop(e, 'pengesahan')}
          on:click={() => fileInputPengesahan.click()}
          role="button"
          tabindex="0"
        >
          <input type="file" bind:this={fileInputPengesahan} class="hidden" on:change={(e) => handleFileSelect(e, 'pengesahan')} accept="image/*,application/pdf" />
          {#if filePengesahan}
            <p class="text-gray-700 dark:text-gray-300">File terpilih: <span class="font-semibold">{filePengesahan.name}</span></p>
          {:else}
            <p class="text-gray-500 dark:text-gray-400">Klik untuk memilih atau seret file ke sini <br> (Gambar atau PDF)</p>
          {/if}
        </div>
      </div>

      <!-- Cara Mendapatkan Informasi -->
      <div class="flex flex-col gap-2">
        <Label>Cara Mendapatkan Informasi</Label>
        <Radio name="info-method" bind:group={formData.infoMethod} value="lihat">Lihat/Baca/Dengar/Catat</Radio>
        <Radio name="info-method" bind:group={formData.infoMethod} value="salinan">Salinan / Informasi</Radio>
      </div>
      
      <!-- Cara Pemberian Informasi -->
      <div class="flex flex-col gap-2">
        <Label>Cara Pemberian Informasi</Label>
        <Radio name="pemberian-method" bind:group={formData.pemberianMethod} value="langsung">Langsung</Radio>
        <Radio name="pemberian-method" bind:group={formData.pemberianMethod} value="email">Email</Radio>
      </div>
      
      <!-- Tombol Kirim -->
      <div class="flex justify-end">
        <Button type="submit" size="lg">Kirim</Button>
      </div>
    </form>
  </div>
</main>

<style>
     /** CSS HEADER TETAP SAMA */
    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
    }
    .info-card {
        border-radius: 20px;
        padding: 0.8rem 1.2rem;
        width: 100%;
        max-width: 1220px;
        display: flex;
        align-items: center;
        gap: 2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 1.5rem;
        background-color: #f7fafc;
    }
    .logo {
        width: 90px;
        height: 90px;
        background-color: white;
        border-radius: 50%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .title-container h1, .title-container h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
        line-height: 1.3;
    }
    .nav-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        max-width: 900px;
    }
    .nav-button {
        color: var(--primary-text);
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.9rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        text-align: center;
        background: #f7fafc;
    }
    .nav-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background: #f1f9ff;
    }
    @media (max-width: 768px) {
        .info-card {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
        }
        .title-container h1, .title-container h2 {
            font-size: 1.2rem;
        }
        .nav-container {
            gap: 0.75rem;
        }
        .nav-button {
            width: 48%;
            padding: 0.75rem 0.5rem;
        }
    }
</style>