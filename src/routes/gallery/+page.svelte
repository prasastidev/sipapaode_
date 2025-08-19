<script>
    /** @type {import('./$types').PageData} */
  
    import { Heading} from 'flowbite-svelte';
   



</script>

<svelte:head>
	<title>Gallery Foto dan Kegiatan</title>
	<meta name="description" content="Gallery Foto & Kegiatan - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>




<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Gallery Foto & Kegiatan</Heading>
    <br/><br/>
    <div class="card-gallery">

  <a href="/profil-bidang-kerjasama#gallery"><div class="card-wrapper">
    <div class="card-shadow"></div>
    <div class="card-content">
      <div class="image-placeholder">
        <span>👥</span>
      </div>
      <div class="card-title">
        <p>Gallery Photo Bidang</p>
        <p>Bagian Kerjasama</p>
      </div>
    </div>
  </div></a>

   <a href="/profil-bidang-pemerintahan#gallery"><div class="card-wrapper">
    <div class="card-shadow"></div>
    <div class="card-content">
      <div class="image-placeholder">
        <span>🗺️</span>
      </div>
      <div class="card-title">
        <p>Gallery Photo Bidang</p>
        <p>Koordinator Pemerintahan</p>
      </div>
    </div>
  </div></a>

  <a href="/profil-bidang-otonomi#gallery"><div class="card-wrapper">
    <div class="card-shadow"></div>
    <div class="card-content">
      <div class="image-placeholder">
        <span>🏦</span>
      </div>
      <div class="card-title">
        <p>Gallery Photo Bidang</p>
        <p>Koordinator Otonomi Daerah</p>
      </div>
    </div>
  </div></a>

</div>
    
    
    
   <br/>
    <br/>

    <br/>
</div>


<style>
  /* Variabel Warna */
  :root {
    --card-bg: #ccdef0;       
    --shadow-bg: #d4ddea;      /* Warna bayangan sedikit lebih gelap */
    --image-bg: #f0f4fa;       /* Biru sangat terang untuk area gambar */
    --text-color: #1f2937;     /* Hitam keabuan untuk teks */
    --font-family: Arial, Helvetica, sans-serif;
  }
  
  /* Mengatur agar komponen berada di tengah Playground */
  :global(body) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    background-color: #ffffff;
    font-family: var(--font-family);
  }

  /* Wadah untuk semua kartu */
  .card-gallery {
    display: flex;
    flex-wrap: wrap; /* Kartu akan turun ke bawah di layar kecil */
    justify-content: center;
    gap: 6rem; /* Jarak antar kartu */
    padding: 2rem;
  }

  /* Pembungkus untuk setiap kartu (mengatur posisi relatif) */
  .card-wrapper {
    position: relative;
    width: 280px;
    height: 320px;
  }

  /* Lapisan Bayangan di Belakang */
  .card-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--shadow-bg);
    border-radius: 28px; /* Sudut tumpul */
    transform: rotate(5deg); /* Memberi efek miring */
    transition: transform 0.3s ease;
  }

  /* Konten Kartu Utama */
  .card-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--card-bg);
    border-radius: 28px;
    padding: 1.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  /* Efek saat mouse di atas kartu */
  .card-wrapper:hover .card-content {
    transform: translate(-8px, -8px);
  }
  .card-wrapper:hover .card-shadow {
    transform: rotate(0deg);
  }

  /* Placeholder untuk Gambar */
  .image-placeholder {
    width: 100%;
    height: 150px;
    background-color: var(--image-bg);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a0aec0; /* Warna teks placeholder */
    font-size: 1.2rem;
    margin-bottom: 1.5rem;

  }

  .image-placeholder span {
  font-size: 4rem; 
  line-height: 1;  
}

  /* Judul di dalam kartu */
  .card-title {
    color: var(--text-color);
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.4;
  }

  .card-title p {
    margin: 0;
    font-weight: 600;
  }
</style>