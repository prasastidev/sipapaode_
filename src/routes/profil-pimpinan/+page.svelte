<script>
    /** @type {import('./$types').PageData} */
    export let data;
    
    // Impor komponen yang dibutuhkan
    import { Heading } from 'flowbite-svelte';
    import { ArrowRightAltSolid, ReplySolid } from 'flowbite-svelte-icons';

    import PicProfileM from '$lib/images/ProfileM.webp';
    import PicProfileF from '$lib/images/ProfileF.webp';

   // Variabel untuk mempermudah akses data Pegawai di HTML
    // Menggunakan $: (reactive statement) agar otomatis update jika data berubah
     $: kepalaBiro = data.pegawaiByJabatan ? data.pegawaiByJabatan['Kepala Biro'] : null;



</script>

<svelte:head>
	<title>Profil Kepala Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara</title>
	<meta name="description" content="Profil Kepala Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

 <br/>
 <nav class="flex">
  <a href="/profil" style="display: flex;color: #617e97; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; text-align: center; background: white;">
    <ReplySolid class="shrink-0 h-6 w-6" /> Ke Profil Biro
  </a>
</nav>

<br/>

<div class="page-container">
  <header class="header-card">
    <div class="logo">   <img src="/LogoSultra.webp" class="card-img-top" alt="Gambar logo sultra"/></div>
    <div class="title-container">
      <h1>PROFIL KEPALA BIRO PEMERINTAHAN DAN OTONOMI DAERAH</h1>
      <h2>PROV. SULAWESI TENGGARA</h2>
    </div>
  </header>

  <nav class="nav-container">
    <a href="#profil" class="nav-button">PROFIL</a>
    <a href="#riwayatpendidikan" class="nav-button">RIWAYAT PENDIDIKAN</a>
    <a href="#riwayatpekerjaan" class="nav-button">RIWAYAT PEKERJAAN</a>
  </nav>

</div>


<div class="container">

 <Heading id="profil" tag="h4" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> PROFIL
    </Heading>
    
    {#if kepalaBiro}
    <div class="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 p-5"> 
        <div class="w-44 h-60 bg-blue-100 rounded-lg flex-shrink-0 border p-2 mb-4 md:mb-0">
            <img 
                src={kepalaBiro.URL_PhotoProfile || (kepalaBiro.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM)} 
                class="w-full h-full object-cover rounded-md" alt="Foto Kepala Biro" 
            />
        </div>
        
        <div class="flex flex-col">
            <p class="text-xl lg:text-2xl text-gray-800">
                <strong class="font-bold">{kepalaBiro.Nama}</strong>
            </p>
            
            <p class="text-base text-gray-600 mt-1">
                NIP: {kepalaBiro.NIP}
            </p>
            
            <div class="mt-6">
                <h2 class="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                    KEPALA BIRO PEMERINTAHAN DAN OTONOMI DAERAH
                </h2>
            </div>
        </div>
    </div>
{:else}
    <p class="p-5 text-gray-500">Data Kepala Biro tidak ditemukan.</p>
{/if}

    <Heading id="riwayatpendidikan" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> RIWAYAT PENDIDIKAN
    </Heading>
    <div style="padding:8px 16px;background:#f9fafb;border-radius:12px;font-size:15px;">
        -- Data Belum Diupdate --
    </div>
    <br/>

    <Heading id="riwayatpekerjaan" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> RIWAYAT PEKERJAAN
    </Heading>
   <div style="padding:8px 16px;background:#f9fafb;border-radius:12px;font-size:15px;">
         -- Data Belum Diupdate --
    </div>


<br/><br/>

</div>

<style>

/** CSS HEADER */
 /* Penataan Halaman Utama */
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family);
    padding: 0.5rem;
    
  }

  /* Kartu Header */
  .header-card {
    background-color: var(--primary-bg);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 1220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    background-color: #f7fafc;
  }

  /* Logo */
  .logo {
    width: 120px;
    height: 120px;
    background-color: var(--logo-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-text);
    margin-bottom: 1.5rem;
  }
  
  /* Kontainer Judul */
  .title-container {
    text-align: center;
    color: var(--primary-text);
  }

  .title-container h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .title-container h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0.25rem 0 0 0;
  }

  /* Kontainer Tombol Navigasi */
  .nav-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 920px; /* Sedikit lebih lebar dari header */
  }

  /* Tombol Navigasi */
  .nav-button {
    background-color: var(--primary-bg);
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

  /* Penyesuaian untuk layar lebih kecil */
  @media (max-width: 768px) {
    .header-card {
      padding: 1.5rem 1rem;
    }
    .logo {
      width: 90px;
      height: 90px;
      font-size: 1.2rem;
    }
    .title-container h1 {
      font-size: 1.25rem;
    }
    .title-container h2 {
      font-size: 1rem;
    }
    .nav-container {
      flex-direction: column;
      align-items: center;
    }
    .nav-button {
      width: 80%;
    }
  }


</style>