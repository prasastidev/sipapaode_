<script>
    import { Heading, Fileupload, Progressbar, Label, Button, ButtonGroup, FloatingLabelInput, Textarea, Modal } from 'flowbite-svelte';
    import { UploadOutline, ZoomInOutline, TrashBinOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';  
    import { addGalleryAlbumDepan, deleteGalleryAlbumDepan } from '$lib/crudGalleryDokumentasi.js';
    import { storage, ID } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { sineOut } from 'svelte/easing';
    import { onMount } from 'svelte';
   
    let isUploadOpen = false;
    let visibleProgresBar = false;
    let progress = '0';
    let errorMessage = null;
    let ConfirmDeleteModal = false;
    let selectedId = null;
    let selectedFileId = null;
    let isLoading = true;
    let isDeleting = false;
   
    // Accept data from parent component
    export let data = [];
    
    // Pagination variables
    let currentPage = 1;
    let postsPerPage = 9;
    
    // Konstanta bucket ID
    const STORAGE_BUCKET_ID = '682972a20025d83de321';
    
    // Safe data handling
    $: {
        try {
            console.log('Data received:', data);
            if (data?.DatasGallery) {
                console.log('DatasGallery:', data.DatasGallery);
                console.log('DatasGallery keys:', Object.keys(data.DatasGallery));
            }
        } catch (e) {
            console.error('Error in data logging:', e);
        }
    }
    
    // Safe reactive statements
    $: allPosts = (() => {
        try {
            if (!data?.DatasGallery) return [];
            
            const gallery = data.DatasGallery;
            
            // Try different possible structures
            if (Array.isArray(gallery)) return gallery;
            if (gallery.files && Array.isArray(gallery.files)) return gallery.files;
            if (gallery.documents && Array.isArray(gallery.documents)) return gallery.documents;
            
            return [];
        } catch (e) {
            console.error('Error processing posts:', e);
            return [];
        }
    })();
    
    $: totalPosts = allPosts.length;
    $: totalPages = Math.ceil(totalPosts / postsPerPage);
    $: postRangeHigh = currentPage * postsPerPage;
    $: postRangeLow = postRangeHigh - postsPerPage;
    
    $: {
        if (data !== undefined) {
            isLoading = false;
        }
    }
    
    const setCurrentPage = newPage => {
        currentPage = newPage;
    }

    const addDataFormtoTable = async (e) => {
        visibleProgresBar = true; 
        e.preventDefault();

        try {
            const formEl = e.target;
            const formData = new FormData(formEl);
            const customImageId = ID.unique();
            
            console.log('Uploading with file ID:', customImageId);
            
            // Upload file to storage
            await storage.createFile(
                STORAGE_BUCKET_ID,
                customImageId,
                document.getElementById('uploadGalleryDoc').files[0]
            );
            
            const URL = `https://fra.cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${customImageId}/view?project=67384f1d0028200e3af4`;
            progress = 100;
            
            // Simpan dengan file ID yang sama dengan storage
            await addGalleryAlbumDepan(
                formData.get('Location'), 
                formData.get('Description'), 
                URL, 
                customImageId // Gunakan customImageId sebagai file ID
            );
            
            invalidateAll();

            formEl.reset();
            progress = 0;
            visibleProgresBar = false;
        } catch (error) {
            console.error("Upload error:", error);
            errorMessage = error.message;
            visibleProgresBar = false;
        }
    };

    // Function to extract file ID from URL
    function extractFileIdFromUrl(url) {
        try {
            // Pattern: /files/{fileId}/view
            const match = url.match(/\/files\/([^\/]+)\/view/);
            return match ? match[1] : null;
        } catch (e) {
            console.error('Error extracting file ID from URL:', e);
            return null;
        }
    }

    function openDeleteModal(item) {
        console.log('Opening delete modal for item:', item);
        
        const docId = item.$id || item.id;
        
        // Coba berbagai cara untuk mendapatkan file ID
        let fileId = item.fileId || item.FileId || item.file_id;
        
        // Jika tidak ada fileId, coba extract dari URL
        if (!fileId && item.URL) {
            fileId = extractFileIdFromUrl(item.URL);
        }
        
        // Fallback ke document ID jika masih tidak ada
        if (!fileId) {
            fileId = docId;
        }
        
        console.log('Document ID:', docId);
        console.log('File ID:', fileId);
        
        if (!docId) {
            alert('Tidak dapat menghapus: ID tidak valid');
            return;
        }
        
        selectedId = docId;
        selectedFileId = fileId;
        ConfirmDeleteModal = true;
    }

    const remove = async (docId, fileId) => {
        if (isDeleting) return;
        
        isDeleting = true;
        let storageDeleted = false;
        let databaseDeleted = false;
        
        try {
            console.log('🗑️ DELETE PROCESS START');
            console.log('Document ID:', docId);
            console.log('File ID:', fileId);
            console.log('Bucket ID:', STORAGE_BUCKET_ID);
            
            // STEP 1: Delete from storage first (safer approach)
            console.log('Step 1: Deleting from storage...');
            try {
                await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
                storageDeleted = true;
                console.log('✅ Storage deletion successful');
            } catch (storageError) {
                console.error('❌ Storage deletion failed:', storageError);
                
                // Jika file tidak ditemukan di storage, lanjutkan ke database
                if (storageError.code === 404 || storageError.message.includes('not found')) {
                    console.log('⚠️ File not found in storage, continuing to delete database record');
                    storageDeleted = true; // Consider it deleted since it doesn't exist
                } else {
                    // Jika error lain, stop proses
                    throw new Error(`Gagal menghapus file dari storage: ${storageError.message}`);
                }
            }
            
            // STEP 2: Delete from database (only if storage delete succeeded or file not found)
            if (storageDeleted) {
                console.log('Step 2: Deleting from database...');
                await deleteGalleryAlbumDepan(docId);
                databaseDeleted = true;
                console.log('✅ Database deletion successful');
            }
            
            // STEP 3: Close modal and refresh
            ConfirmDeleteModal = false;
            await invalidateAll();
            
            console.log('✅ Delete process completed successfully');
            
        } catch (error) {
            console.error('❌ Delete process failed:', error);
            
            let errorMessage = 'Terjadi kesalahan saat menghapus';
            
            if (error.message.includes('not found')) {
                errorMessage = 'File atau data tidak ditemukan';
            } else if (error.message.includes('permission')) {
                errorMessage = 'Tidak memiliki izin untuk menghapus';
            } else if (error.message.includes('network')) {
                errorMessage = 'Koneksi bermasalah, coba lagi';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            alert(errorMessage);
            ConfirmDeleteModal = false;
            
            // Refresh data untuk sinkronisasi
            try {
                await invalidateAll();
            } catch (refreshError) {
                console.error('Failed to refresh data:', refreshError);
            }
            
        } finally {
            isDeleting = false;
        }
    };
</script>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold md:text-3xl lg:text-4xl">Dokumentasi Photo Album Gallery (Beranda)</Heading>
    <br/>
    <div class="modern-box">
        <div class="contentbox">
            <label>Dibawah adalah Tombol untuk mengupload Dokumentasi Photo Gallery yang terdapat pada halaman Beranda. Klik Tombol [Buka Upload Photo] dan masukkan data Photo Gallery Dokumentasi.</label>
        </div>
    </div>
    <br/><br/>
  
    <Button color="dark" pill on:click={() => (isUploadOpen = !isUploadOpen)}>
        {!isUploadOpen ? 'Buka Upload Photo' : 'Tutup Upload Photo'}
    </Button>
    <br/><br/>
  
    {#if isUploadOpen}
        <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
            <form class="space-y-6" on:submit={addDataFormtoTable}>
                <Label class="text-base" style="margin-bottom: -20px;">Upload file Photo / Gambar (Type File: JPG, JPEG or PNG)</Label>
                <Fileupload class="mb-1" id="uploadGalleryDoc" accept=".png, .jpg, .jpeg, .webp" required />
                <Label class="pb-2 mb-1" style="margin-top: 10px;">(Max File Size: 10 MB)</Label>
                <FloatingLabelInput style="filled" id="Location" name="Location" type="text" required>Lokasi Photo* :</FloatingLabelInput>  
                <Textarea id="Description" placeholder="Deskripsi Photo*" rows="2" name="Description" required />  
                <ButtonGroup class="*:!ring-primary-700">
                    <Button outline color="dark" type="submit" value="submit">
                        <UploadOutline class="w-4 h-4 me-2" />Simpan Photo
                    </Button>
                </ButtonGroup>
            </form> 
            <br/>

            {#if visibleProgresBar} 
                <Progressbar
                    {progress}
                    animate
                    precision={2}
                    labelOutside="Progress Upload Gambar"
                    labelInside
                    tweenDuration={1500}
                    easing={sineOut}
                    size="h-4"
                    labelInsideClass="bg-blue-600 text-blue-100 text-sm font-medium text-center leading-none rounded-full"
                    class="mb-4"
                />
            {/if}
        </div>
    {/if}
    <br/>
    <center><hr style="width:80%;height:2px;background:#d6d6d6;"/></center>
    <br/><br/> 

    <Heading tag="h4" customSize="text-xl text-left font-extrabold md:text-xl lg:text-2xl">🖼️ List Photo</Heading>
    <br/>
    
    <!-- Debug info 
    <div style="background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; font-size: 12px;">
        <strong>Debug Info:</strong><br>
        Total Posts: {totalPosts}<br>
        Is Loading: {isLoading}<br>
        {#if allPosts.length > 0}
            First Item Keys: {Object.keys(allPosts[0]).join(', ')}<br>
            First Item URL: {allPosts[0].URL || allPosts[0].url}<br>
            Extracted File ID: {extractFileIdFromUrl(allPosts[0].URL || allPosts[0].url)}
        {/if}
    </div>
    -->
    
    {#if isLoading}
        <p>Memuat data gallery...</p>
    {:else if totalPosts === 0}
        <p>Saat ini Tidak terdapat Gambar pada Gallery Photo.</p>
    {:else}
        <p>Terdapat {totalPosts} Gambar dalam Folder Gallery Koordinator Otonomi Daerah</p>
    {/if}
    
    <br/>
    <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
        {#if isLoading}
            <p>Loading images...</p>
        {:else if allPosts.length > 0}
            <div class="grid grid-cols-3 gap-4">
                {#each allPosts as cetakTabel, i}
                    {#if i >= postRangeLow && i < postRangeHigh}
                        <div style="float:left;text-align:center;">
                            <!-- Debug info untuk setiap item -->
                            <div style="background: #ffffcc; padding: 3px; margin: 3px; font-size: 10px; border-radius: 3px;">
                                Doc ID: {cetakTabel.$id || cetakTabel.id || 'NO ID'}<br>
                                File ID from URL: {extractFileIdFromUrl(cetakTabel.URL || cetakTabel.url)}
                            </div>
                            
                            <img 
                                src={cetakTabel.URL || cetakTabel.url || ''} 
                                alt="Gallery image" 
                                style="width:460px;height:240px;margin:10px;border-radius:10px;"
                                on:error={(e) => {
                                    console.error('Image failed to load:', cetakTabel.URL || cetakTabel.url);
                                    e.target.style.border = '2px dashed #ccc';
                                    e.target.alt = 'Gambar tidak dapat dimuat';
                                }}
                            />
                            <span style="font-size:14px;">{cetakTabel.Description || cetakTabel.description || 'No description'}</span><br/>
                            
                            <ButtonGroup class="*:!ring-primary-700">
                                <Button style="color:blue;">
                                    <a href={cetakTabel.URL || cetakTabel.url || '#'} target="_blank" style="color:blue;">
                                        <ZoomInOutline class="w-4 h-4 me-2" />Lihat
                                    </a>
                                </Button>
                                <Button 
                                    style="color:red;" 
                                    on:click={() => openDeleteModal(cetakTabel)}
                                >
                                    <TrashBinOutline class="w-4 h-4 me-2" />Hapus
                                </Button>
                            </ButtonGroup>
                        </div>
                    {/if}
                {/each}
            </div>
        {:else}
            <p>Tidak ada gambar untuk ditampilkan.</p>
        {/if}
    </div>

    <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
        <div class="text-center">
            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Apakah Anda sudah memastikan akan menghapus Gambar yang telah Anda pilih?
            </h3>
            <Button 
                color="red" 
                class="me-2" 
                disabled={isDeleting}
                on:click={() => remove(selectedId, selectedFileId)}
            >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
            </Button>
            <Button 
                color="alternative" 
                disabled={isDeleting}
                on:click={() => ConfirmDeleteModal = !ConfirmDeleteModal}
            >
                Tidak, Batal
            </Button>
        </div>
    </Modal>

    <!-- Pagination -->
    {#if !isLoading && totalPages > 1}
        <br/>
        <ul class="paginationTable" style="list-style-type: none;">
            {#if currentPage > 1}
                <li on:click|preventDefault={() => setCurrentPage(1)}>pertama</li>
                <li on:click|preventDefault={() => setCurrentPage(currentPage - 1)}><span>&#8678;</span></li>
            {/if}
            
            {#each [3,2,1] as i}
                {#if currentPage - i > 0}
                    <li on:click|preventDefault={() => setCurrentPage(currentPage - i)}>{currentPage - i}</li>
                {/if}
            {/each}
            
            <li class:active={currentPage}><span>{currentPage}</span></li>
            
            {#each Array(3) as _, i}
                {#if currentPage + (i+1) <= totalPages}
                    <li on:click|preventDefault={() => setCurrentPage(currentPage + (i+1))}>{currentPage + (i+1)}</li>
                {/if}
            {/each}
            
            {#if currentPage < totalPages}
                <li on:click|preventDefault={() => setCurrentPage(currentPage + 1)}><span>&#8680;</span></li>
                <li on:click|preventDefault={() => setCurrentPage(totalPages)}>terakhir</li>
            {/if}
        </ul>
        <span style="margin-left: 6px; margin-top: 5px;display: block;">Halaman Aktif Page: {currentPage}</span>
    {/if}
</div>

<style>
    ul.paginationTable li {
        display: inline-block;
        padding: 4px 10px;
        border: 2px solid #e0e2e7;
        margin: 3px;
        border-radius: 8px;
        background: #fcfcfc;
        cursor: pointer;
    }  
  
    ul.paginationTable li.active {
        background: #8eb5ea !important;
        color: white;
    }

    .modern-box {
        position: relative;
        display: inline-block;
        padding: 12px;
    }
    
    .modern-box::before,
    .modern-box::after,
    .contentbox::before,
    .contentbox::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 4px solid #c7c7e7;
    }
    
    .modern-box::before {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
    }
    
    .modern-box::after {
        top: 0;
        right: 0;
        border-left: none;
        border-bottom: none;
    }
  
    .contentbox {
        background: white;
        padding: 6px 12px;
        border-radius: 8px;
    }
    
    .contentbox::before {
        bottom: 0;
        left: 0;
        border-right: none;
        border-top: none;
    }
    
    .contentbox::after {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
    }
    
    .contentbox label {
        font-size: 0.94rem;
        margin: 0;
        padding: 0;
    }
</style>