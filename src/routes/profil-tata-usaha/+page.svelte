<script>
    /** @type {import('./$types').PageData} */
    export let data;

    // Pastikan DUA impor ini ada di bagian atas
    import { onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation';
    
    // Impor komponen yang dibutuhkan
    import { Heading, Button, ButtonGroup, Modal, Tabs, TabItem } from 'flowbite-svelte';
    import { ArrowRightAltSolid, ZoomInOutline, ReplySolid } from 'flowbite-svelte-icons';
    import { storage } from '$lib/appwrite';
    import PicProfileM from '$lib/images/ProfileM.webp';
    import PicProfileF from '$lib/images/ProfileF.webp';

    // Sesuaikan nama properti di sini
$: profileTataUsaha = data.DatasProfileBidang?.documents.find(
    (profil) => profil.namaBidang === "Tata Usaha"
);

    // --- State untuk Galeri dan Pagination ---
    let currentPage = 1;
    let itemsPerPage = 6;

    // --- State untuk Modal Preview Gambar ---
    let showImageModal = false;
    let selectedImageUrl = '';
    let selectedImageName = '';

    // --- State untuk debugging ---
    let imageLoadErrors = new Set();

    /** 
    // --- Reactive statements dengan debugging ---
    $: {
        console.log('Raw data received:', data);
        console.log('DatasGambarPemerintahan structure:', data.DatasGambarPemerintahan);
        if (data.DatasGambarPemerintahan) {
            console.log('Files array:', data.DatasGambarPemerintahan.files);
            console.log('Documents array:', data.DatasGambarPemerintahan.documents);
        }
    }
    **/

    // Perbaiki struktur data - coba beberapa kemungkinan struktur
    $: allImages = data.DatasGambarTataUsaha?.files || 
                   data.DatasGambarTataUsaha?.documents || 
                   (Array.isArray(data.DatasGambarTataUsaha) ? data.DatasGambarTataUsaha : []);
    
    /** 
    $: {
        console.log('All images processed:', allImages);
        console.log('Total images found:', allImages.length);
    }
    **/


    $: totalImages = allImages.length;
    $: totalPages = Math.ceil(totalImages / itemsPerPage);
    $: paginatedImages = allImages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    $: subBagianTataUsaha = data.pegawaiByJabatan ? data.pegawaiByJabatan['Kepala Bidang Tata Usaha'] : null;

    // Fungsi untuk mendapatkan URL gambar dari Appwrite Storage dengan error handling
    function getImageView(fileId) {
        if (!fileId) {
            console.error('File ID is missing');
            return '/placeholder-image.jpg';
        }
        
        try {
            const bucketId = '68becd03000631cf9bda';
            const result = storage.getFileView(bucketId, fileId);
            const url = result.href || result.toString();
          //  console.log(`Generated URL for ${fileId}:`, url);
            return url;
        } catch (error) {
            console.error('Error getting image view for fileId:', fileId, error);
            return '/placeholder-image.jpg';
        }
    }

    // Alternatif menggunakan preview untuk performa lebih baik
    function getImagePreview(fileId, width = 400, height = 300) {
        if (!fileId) {
            console.error('File ID is missing for preview');
            return '/placeholder-image.jpg';
        }
        
        try {
            const bucketId = '68becd03000631cf9bda';
            const result = storage.getFilePreview(bucketId, fileId, width, height);
            const url = result.href || result.toString();
         //   console.log(`Generated preview URL for ${fileId}:`, url);
            return url;
        } catch (error) {
            console.error('Error getting image preview for fileId:', fileId, error);
            return '/placeholder-image.jpg';
        }
    }

    // Fungsi untuk membuka modal preview
    function openImagePreview(fileId, fileName) {
        if (!fileId) {
            console.error('Cannot open preview: File ID is missing');
            return;
        }
        
        selectedImageUrl = getImageView(fileId);
        selectedImageName = fileName || 'Untitled Image';
        showImageModal = true;
      //  console.log('Opening modal for:', fileName, 'with URL:', selectedImageUrl);
    }

    // Handle image load errors
    function handleImageError(event, fileId, fileName) {
        console.error('Failed to load image:', fileName, 'with fileId:', fileId);
        imageLoadErrors.add(fileId);
        
        // Set placeholder image
        event.target.src = '/placeholder-image.jpg';
        
        // Alternatively, you could try different URL generation methods
        // event.target.src = getImagePreview(fileId);
    }

    // Handle image load success
    function handleImageLoad(event, fileId, fileName) {
      //  console.log('Successfully loaded image:', fileName);
        imageLoadErrors.delete(fileId);
    }

    // Fungsi ini akan berjalan setiap kali komponen dimuat untuk memastikan data selalu baru.
    onMount(async () => {
      //  console.log('Component mounted, invalidating data...');
        await invalidateAll();
        
        // Debug: Test storage connection
        /**
        try {
            const bucketId = '6791fea50005705fec23';
            const testFiles = await storage.listFiles(bucketId);
            console.log('Direct storage test result:', testFiles);
        } catch (error) {
            console.error('Storage connection test failed:', error);
        }
        **/
    });
</script>

<svelte:head>
    <title>Profil Bidang Tata Usaha</title>
    <meta name="description" content="Profil Bidang Tata Usaha Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
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
        <div class="logo">
            <img src="/LogoSultra.webp" class="card-img-top" alt="Gambar logo sultra"/>
        </div>
        <div class="title-container">
            <h1>PROFIL BIDANG SUB BAGIAN TATA USAHA</h1>
            <h2>BIRO PEMERINTAHAN DAN OTONOMI DAERAH PROV. SULAWESI TENGGARA</h2>
        </div>
    </header>
    <nav class="nav-container">
        <a href="#tentang" class="nav-button">TENTANG</a>
        <a href="#kepalaBidang" class="nav-button">KEPALA BIDANG</a>
        <a href="#tupoksi" class="nav-button">TUPOKSI DAN PROGRAM PRIORITAS</a>
        <a href="#gallery" class="nav-button">GALERI FOTO</a>
    </nav>
</div>

<div class="container">
    <Heading id="tentang" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> TENTANG
    </Heading>
   {#if profileTataUsaha}
     <div class="preserve-lines" style="padding:8px 16px;background:#f9fafb;border-radius:12px;font-size:15px;">
        { profileTataUsaha.tentang }     
    </div>
    {:else}
        <p class="text-center text-gray-500">
            Data profil untuk "Tata Usaha" tidak ditemukan.
        </p>
    {/if}

    <Heading id="kepalaBidang" tag="h4" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> KEPALA BIDANG
    </Heading>
    
    {#if subBagianTataUsaha}
    <div class="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 p-5"> 
        <div class="w-44 h-60 bg-blue-100 rounded-lg flex-shrink-0 border p-2 mb-4 md:mb-0">
           <img src={subBagianTataUsaha.URL_PhotoProfile || (subBagianTataUsaha.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM)} 
                class="w-full h-full object-cover rounded-md" alt="Foto Kepala Biro" 
            />
        </div>
        
         <div class="flex flex-col">
            <p class="text-xl lg:text-2xl text-gray-800"> <strong class="font-bold">{subBagianTataUsaha.Nama}</strong>
            </p>
            
            <p class="text-base text-gray-600 mt-1"> NIP: {subBagianTataUsaha.NIP}
            </p>
            
            <div class="mt-6">
                <h2 class="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                     KEPALA BIDANG SUB BAGIAN TATA USAHA
                </h2>
            </div>
        </div>
    </div>
     {:else}
      <p class="p-5 text-gray-500">Data Kepala Bidang tidak ditemukan.</p>
       {/if}

    <Heading id="tupoksi" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> TUPOKSI DAN PROGRAM PRIORITAS
    </Heading>
     {#if profileTataUsaha}
    <Tabs class="mt-4">
    <TabItem open title="Tupoksi">
      <p class="preserve-lines text-2sm text-gray-500 dark:text-gray-400">  
         { profileTataUsaha.tupoksi }
      </p>
    </TabItem>
    <TabItem title="Program Prioritas">
      <p class="preserve-lines text-2sm text-gray-500 dark:text-gray-400">
       { profileTataUsaha.programPrioritas }
      </p>
    </TabItem>
  </Tabs> 
     {:else}
        <p class="text-center text-gray-500">
            Data profil untuk "Tata Usaha" tidak ditemukan.
        </p>
    {/if}
    <br/>
    <br/>

    <Heading id="gallery" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> GALERI FOTO KEGIATAN
    </Heading>
    
    
    {#if totalImages === 0}
        <div class="no-images-container">
            <p class="text-gray-600 text-lg">Saat ini tidak terdapat gambar pada Galeri Foto Bidang Tata Usaha.</p>
            <p class="text-sm text-gray-500 mt-2">Periksa koneksi storage atau pastikan gambar telah diupload.</p>
        </div>
    {:else}
        <p class="mb-4 text-gray-700">Menampilkan {paginatedImages.length} dari {totalImages} gambar foto kegiatan Bidang Tata Usaha.</p>
        
        <div class="gallery-container">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each paginatedImages as image, index (image.$id || image.id || index)}
                    {@const fileId = image.$id || image.id}
                    {@const fileName = image.name || `Image ${index + 1}`}
                    
                    <div class="gallery-card">
                        <button on:click={() => openImagePreview(fileId, fileName)} class="image-wrapper">
                            <img 
                                src={getImagePreview(fileId, 400, 300)}
                                alt={fileName}
                                class="gallery-image"
                                loading="lazy"
                                on:error={(e) => handleImageError(e, fileId, fileName)}
                                on:load={(e) => handleImageLoad(e, fileId, fileName)}
                            />
                            <div class="overlay">
                                <ZoomInOutline class="w-8 h-8 text-white"/>
                            </div>
                            
                            <!-- Loading indicator -->
                            <div class="loading-indicator">
                                <div class="loading-spinner"></div>
                            </div>
                        </button>
                        <div class="card-footer">
                            <p class="image-name" title={fileName}>{fileName}</p>
                            <div class="card-actions">
                                <a href={getImageView(fileId)} target="_blank" rel="noopener noreferrer" class="view-link">
                                    Lihat Ukuran Penuh
                                </a>
                                {#if imageLoadErrors.has(fileId)}
                                    <span class="error-badge">Error Loading</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            {#if totalPages > 1}
                <nav class="pagination-nav">
                    <ButtonGroup>
                        <Button 
                            on:click={() => currentPage = Math.max(1, currentPage - 1)} 
                            disabled={currentPage === 1}
                            size="sm"
                        >
                            Sebelumnya
                        </Button>
                        <Button disabled class="page-info-button">
                            Halaman {currentPage} dari {totalPages}
                        </Button>
                        <Button 
                            on:click={() => currentPage = Math.min(totalPages, currentPage + 1)} 
                            disabled={currentPage === totalPages}
                            size="sm"
                        >
                            Berikutnya
                        </Button>
                    </ButtonGroup>
                </nav>
            {/if}
        </div>
    {/if}

    <br/><br/>
</div>

<!-- Modal untuk preview gambar dengan error handling -->
<Modal title={selectedImageName} bind:open={showImageModal} size="5xl" autoclose>
    <div class="flex justify-center bg-gray-100 p-4 rounded-lg">
        {#if selectedImageUrl}
            <img 
                src={selectedImageUrl} 
                alt={selectedImageName} 
                class="max-w-full max-h-[70vh] object-contain"
                on:error={(e) => {
                    console.error('Modal image failed to load');
                    e.target.src = '/placeholder-image.jpg';
                }}
            />
        {:else}
            <div class="flex items-center justify-center h-64 text-gray-500">
                <p>Tidak dapat memuat gambar</p>
            </div>
        {/if}
    </div>
</Modal>

<style>
    /* CSS HEADER */
    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: var(--font-family);
        padding: 0.5rem;
    }

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

    .nav-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        max-width: 920px;
    }

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

     .preserve-lines {
        white-space: pre-wrap;
        font-family: inherit; /* Opsional: Agar font mengikuti style halaman */
    }

    /* CSS GALERI DENGAN PERBAIKAN */
    .gallery-container {
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        background-color: #f9fafb;
        margin-top: 1rem;
    }

    .gallery-card {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease;
    }

    .gallery-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
    }

    .image-wrapper {
        position: relative;
        width: 100%;
        padding-top: 66.66%; /* Aspect ratio 3:2 */
        cursor: pointer;
        overflow: hidden;
        background-color: #f3f4f6;
        border: none;
        outline: none;
    }

    .gallery-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease, opacity 0.3s ease;
        background-color: #f3f4f6;
    }

    /* Loading state */
    .gallery-image[src=""], 
    .gallery-image:not([src]) {
        opacity: 0;
    }

    /* Loaded state */
    .gallery-image[src]:not([src=""]) {
        opacity: 1;
    }

    /* Placeholder untuk gambar yang gagal dimuat */
    .gallery-image[src="/placeholder-image.jpg"] {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Cg transform='translate(100,100)'%3E%3Ccircle r='40' fill='%23d1d5db'/%3E%3Cpath d='M-20,-10 L20,-10 L15,15 L-15,15 Z' fill='%236b7280'/%3E%3Ccircle cx='-10' cy='-5' r='3' fill='%23f3f4f6'/%3E%3C/g%3E%3Ctext x='100' y='160' text-anchor='middle' fill='%236b7280' font-size='14' font-family='Arial'%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .loading-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .gallery-image[src]:not([src=""]) + .overlay + .loading-indicator {
        opacity: 0;
    }

    .loading-spinner {
        width: 24px;
        height: 24px;
        border: 2px solid #d1d5db;
        border-top: 2px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-wrapper:hover .gallery-image {
        transform: scale(1.05);
    }

    .image-wrapper:hover .overlay {
        opacity: 1;
    }

    .card-footer {
        padding: 1rem;
        text-align: center;
        border-top: 1px solid #f3f4f6;
    }
    
    .image-name {
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.9rem;
    }

    .card-actions {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .view-link {
        font-size: 0.875rem;
        color: #3b82f6;
        text-decoration: none;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }

    .view-link:hover {
        text-decoration: underline;
        background-color: #eff6ff;
    }

    .error-badge {
        font-size: 0.75rem;
        color: #dc2626;
        background-color: #fef2f2;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #fecaca;
    }

    .pagination-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }

    .page-info-button {
        font-weight: 500;
        color: #4b5563 !important;
        background-color: #f9fafb !important;
        cursor: default;
    }

    .no-images-container {
        text-align: center;
        padding: 3rem 1rem;
        background-color: #f9fafb;
        border-radius: 12px;
        border: 2px dashed #d1d5db;
    }

    /* Debug info - hapus setelah selesai */
    .debug-info {
        font-size: 12px;
        max-height: 200px;
        overflow-y: auto;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .gallery-container {
            padding: 1rem;
        }
        
        .image-name {
            font-size: 0.8rem;
        }
        
        .card-actions {
            flex-direction: column;
            gap: 0.25rem;
        }
    }
</style>