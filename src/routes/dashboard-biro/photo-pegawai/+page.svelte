<script>
    /** @type {import('./$types').PageData} */
    
    import { Heading, Fileupload, Progressbar, Label, Button, ButtonGroup, Modal, Alert  } from 'flowbite-svelte';
    import { UploadOutline, ZoomInOutline, FileCopyOutline, TrashBinOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { storage, ID } from '$lib/appwrite';
    import { user } from '$lib/user';
    import { invalidateAll } from '$app/navigation';
    import { sineOut } from 'svelte/easing';
  
   
    let isUploadOpen = false;
    let visibleProgresBar = false;
    export let data = [];
     let progress = '0';
    let ConfirmDeleteModal = false;
    let selectedId = null;

     let copiedId = null; // Untuk melacak ID gambar yang URL-nya baru saja disalin

    async function copyUrlToClipboard(id) {
        // 1. Dapatkan URL gambar dalam bentuk teks
        const urlToCopy = showimage(id).href;

        try {
            // 2. Gunakan Clipboard API untuk menyalin teks
            await navigator.clipboard.writeText(urlToCopy);

            // 3. Beri tahu pengguna bahwa penyalinan berhasil
            copiedId = id; // Set ID yang baru disalin
            
            // 4. Kembalikan teks tombol ke semula setelah 2 detik
            setTimeout(() => {
                copiedId = null;
            }, 2000);

        } catch (err) {
            console.error('Gagal menyalin URL:', err);
            // Beri tahu pengguna jika terjadi error (misalnya di koneksi http)
            alert('Gagal menyalin URL. Pastikan Anda mengakses halaman ini melalui koneksi aman (HTTPS).');
        }
    }


function showimage(id) {
    const result = storage.getFileView('67999587003989233678', id);
    return result;  
}

 // Masukkan file ke Storage Bucket
 const UploadImage = async (e) => {
   visibleProgresBar = true;
    e.preventDefault();
		const formEl = e.target;
    await storage.createFile('67999587003989233678', ID.unique(), document.getElementById('UploadPhotoPegawai').files[0]); 
    progress = 100;
    // Reset form
		formEl.reset();   
    await invalidateAll();
    progress = 0;
    visibleProgresBar = false;
 }
 
 function openDeleteModal(id) {
    selectedId = id;
    ConfirmDeleteModal = true;
  }

 const remove = async (id) => {
    // Delete File Storage
    await storage.deleteFile('67999587003989233678', id );
    ConfirmDeleteModal = false;
    await invalidateAll();
	};


  // Pagination 
  let currentPage =1; // Update this to simulate page change.
  let postsPerPage = 9;
  let allPosts = data.DatasGambarPegawai.files;
  let totalPosts = allPosts.length;
  let totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;
	const setCurrentPage = newPage => {
		currentPage = newPage;
  }
    
  </script>
  
  <svelte:head>
  <title>Info User</title>
  <meta name="description" content="Info User" />
  </svelte:head>

  
  <div class="container">
    <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Data Photo Profile Pegawai - Biro Pemerintahan dan Otonomi Daerah Sultra</Heading>
    <br/>

     {#if $user.prefs['Role'] !== "PIC Tata Usaha"}
    <Alert color="yellow">
    <span class="font-medium" style="font-weight:600;">Halaman ini hanya bisa di Update oleh PIC Tata Usaha</span>
    </Alert>
    <br/>
    {/if}

    {#if $user.prefs['Role'] === "PIC Tata Usaha"}
    <Button color="dark" pill on:click={() => (isUploadOpen = !isUploadOpen)}>{!isUploadOpen ? 'Buka Upload Photo' : 'Tutup Upload Photo'} </Button> <br/><br/>
    {/if}

    {#if isUploadOpen}
  <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
    <form class="space-y-6" on:submit|preventDefault ={UploadImage} >
   <Label class="pb-2 text-base">Upload file Photo / Gambar (Type File: JPG, JPEG or PNG)</Label>
   <Fileupload class="mb-2" id="UploadPhotoPegawai" accept=".png, .jpg, .jpeg, .webp" required />
    <Label class="pb-2 mb-3">(Max File Size: 10 MB)</Label>
    <ButtonGroup class="*:!ring-primary-700"><Button outline color="dark" type="submit" value="submit" >
    <UploadOutline  class="w-4 h-4 me-2" />Simpan Gambar</Button> </ButtonGroup>
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
    />{/if}
  
  </div>
    {/if}
    <br/>
    <center><hr style="width:80%;height:2px;background:#d6d6d6;"/></center>

    <br/><br/> 

  <Heading tag="h4" customSize="text-xl text-left font-extrabold  md:text-xl lg:text-2xl">🖼️ List Photo Profile</Heading>
  <br/>
  {#if data.DatasGambarPegawai.total === 0}
  <p>Saat ini Tidak terdapat Gambar Photo pada Gallery Photo Profile Pegawai.</p>
  {:else}
  <p>Terdapat {data.DatasGambarPegawai.total} Gambar Photo dalam Folder Photo Profile Pegawai</p>
{/if}
 <br/>
  <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
    {#await data.DatasGambarPegawai.files}
     loading...
    {:then allPosts}
    <div class="grid grid-cols-3 gap-4">
      {#each allPosts as cetakTabel,i}
      {#if i >= postRangeLow && i < postRangeHigh}
     <div style="float:left;text-align:center;">
     <img src={showimage(cetakTabel.$id)} alt="image" style="width:460px;height:240px;margin:10px;border-radius:10px;"/>
     <span style="font-size:14px;">{cetakTabel.name}</span> <br/>
     {#if $user.prefs['Role'] === "PIC Tata Usaha"}
      <ButtonGroup class="*:!ring-primary-700">
       <Button style={copiedId === cetakTabel.$id ? 'color:green;' : 'color:blue;'} on:click={() => copyUrlToClipboard(cetakTabel.$id)}>
         <FileCopyOutline class="w-6 h-6 me-2" />
{#if copiedId === cetakTabel.$id}
        URL Dicopy!
    {:else}
        Copy URL
    {/if}
</Button>
        <Button style="color:blue;"><a href={showimage(cetakTabel.$id)} target="_blank" style="color:blue;"><ZoomInOutline class="w-5 h-5 me-2" />Lihat</a></Button>
        <Button style="color:red;" on:click={() => openDeleteModal(cetakTabel.$id)} ><TrashBinOutline class="w-5 h-5 me-2" />Hapus</Button>
     </ButtonGroup> 
     {/if}
     </div>
      <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
        <div class="text-center">
          <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus Gambar yang telah Anda pilih</h3>
          <Button color="red" class="me-2" on:click={() => remove(selectedId)}>Ya, Hapus</Button>
          <Button color="alternative" on:click={()=> ConfirmDeleteModal = !ConfirmDeleteModal}>Tidak, Batal</Button>
        </div>
      </Modal>
      {/if}
     {/each}
    </div> 

    {/await}

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
    <li class:active={ currentPage }><span>{currentPage}</span></li>
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


    
  </style>