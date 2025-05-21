<script>
    import { Heading, Fileupload, Progressbar, Label, Button, ButtonGroup, FloatingLabelInput, Textarea } from 'flowbite-svelte';
    import { UploadOutline, ZoomInOutline } from 'flowbite-svelte-icons';
    import { addGalleryAlbumDepan } from '$lib/crudGalleryDokumentasi.js';
    import { storage, ID } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { sineOut } from 'svelte/easing';
    import { onMount } from 'svelte';
   
    let isUploadOpen = false;
    let visibleProgresBar = false;
    let progress = '0';
    let errorMessage = null;
    let debugInfo = ""; // For debugging
    
    // Accept data from parent component
    export let data;
    
    // Initialize local variables to handle data safely
    let filesArray = [];
    let totalFiles = 0;
    
    onMount(() => {
        // Debug the data structure
        debugInfo = `Data type: ${typeof data}, Has DatasGallery: ${!!data?.DatasGallery}, Files type: ${typeof data?.DatasGallery?.files}`;
        
        try {
            // Try to safely extract the files
            if (data && data.DatasGallery && data.DatasGallery.files) {
                if (Array.isArray(data.DatasGallery.files)) {
                    filesArray = [...data.DatasGallery.files];
                    totalFiles = filesArray.length;
                    debugInfo += `, Extracted ${totalFiles} files`;
                } else if (typeof data.DatasGallery.files === 'object') {
                    // Handle case if files is a promise or other object
                    debugInfo += ", Files is an object but not an array";
                }
            } else if (data && data.DatasGallery && data.DatasGallery.total !== undefined) {
                totalFiles = data.DatasGallery.total;
                debugInfo += `, Only got total: ${totalFiles}`;
            }
        } catch (err) {
            debugInfo += `, Error: ${err.message}`;
            console.error("Error processing data:", err);
        }
    });

    const addDataFormtoTable = async (e) => {
        visibleProgresBar = true; 
        e.preventDefault();

        try {
            const formEl = e.target;
            const formData = new FormData(formEl);
            const customImageId = ID.unique();
            
            // Upload file to storage
            await storage.createFile(
                '682972a20025d83de321',
                customImageId,
                document.getElementById('uploadGalleryDoc').files[0]
            );
            
            const URL = `https://fra.cloud.appwrite.io/v1/storage/buckets/682972a20025d83de321/files/${customImageId}/view?project=67384f1d0028200e3af4`;
            progress = 100;
            
            await addGalleryAlbumDepan(formData.get('Title'), formData.get('Description'), URL, customImageId);
            invalidateAll();

            formEl.reset();
            progress = 0;
            visibleProgresBar = false;
        } catch (error) {
            console.error("Error:", error);
            errorMessage = error.message;
            visibleProgresBar = false;
        }
    };

    // Pagination
    let currentPage = 1;
    let postsPerPage = 9;
    $: totalPages = Math.ceil(totalFiles / postsPerPage) || 1;
    $: postRangeHigh = currentPage * postsPerPage;
    $: postRangeLow = postRangeHigh - postsPerPage;
    const setCurrentPage = newPage => {
        currentPage = newPage;
    }

    // Force display of visible images
    $: visibleImages = filesArray.slice(postRangeLow, postRangeHigh);
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
                <FloatingLabelInput style="filled" id="Title" name="Title" type="text" required>Lokasi Photo* :</FloatingLabelInput>  
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
    
    <!-- Debug info for development - remove in production -->
    <div style="background-color: #f0f0f0; padding: 10px; margin-bottom: 10px; font-family: monospace; font-size: 12px;">
        Debug: {debugInfo}
    </div>
    
    {#if errorMessage}
        <div style="color: red; padding: 10px; background-color: #ffeeee; border-radius: 5px; margin-bottom: 15px;">
            <p>Error: {errorMessage}</p>
        </div>
    {/if}
    
    {#if totalFiles === 0}
        <p>Saat ini Tidak terdapat Gambar pada Gallery Photo.</p>
    {:else}
        <p>Terdapat {totalFiles} Gambar dalam Folder Gallery Koordinator Otonomi Daerah</p>
    {/if} 
    
    <br/>

    <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
        {#if filesArray.length > 0}
            <div class="grid grid-cols-3 gap-4">
                {#each visibleImages as item}
                    <div style="float:left;text-align:center;">
                        <img 
                            src={item.URL || item.url || ''} 
                            alt="image" 
                            style="width:460px;height:240px;margin:10px;border-radius:10px;"
                            onerror="this.onerror=null; this.src='https://via.placeholder.com/460x240?text=Image+Not+Found';"
                        />
                        <span style="font-size:14px;">
                            {item.Description || item.description || 'No description'}
                        </span>
                        <br/>
                        <ButtonGroup class="*:!ring-primary-700">
                            <Button style="color:blue;">
                                <a href={item.URL || item.url || '#'} target="_blank" style="color:blue;">
                                    <ZoomInOutline class="w-4 h-4 me-2" />Lihat
                                </a>
                            </Button>
                        </ButtonGroup> 
                    </div>
                {/each}
            </div>
        {:else}
            <!-- Show a more detailed loading message -->
            <div>
               
               
            </div>
        {/if}
    </div>
    <br/>
    <ul class="paginationTable" style="list-style-type: none;">
        {#if currentPage > 1}
            <li on:click|preventDefault={() => setCurrentPage(1)}>pertama</li>
            <li on:click|preventDefault={() => setCurrentPage(currentPage - 1)}> <span>&#8678;</span> </li>
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
            <li on:click|preventDefault={() => setCurrentPage(currentPage + 1)}> <span>&#8680;</span> </li>
            <li on:click|preventDefault={() => setCurrentPage(totalPages)}>terakhir</li>
        {/if}
    </ul> 
           
    <span style="margin-left: 6px; margin-top: 5px;display: block;">Halaman Aktif Page: {currentPage} </span>
</div>

<style>
    ul.paginationTable li {
        display: inline-block;
        padding: 4px 10px;
        border: 2px solid #e0e2e7;
        margin: 3px;
        border-radius: 8px;
        background: #fcfcfc;
        cursor:pointer;
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