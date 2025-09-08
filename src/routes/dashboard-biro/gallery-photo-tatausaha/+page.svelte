<script>
    /** @type {import('./$types').PageData} */
    export let data = [];
    import { Heading, Fileupload, Progressbar, Label, Button, ButtonGroup, Modal, Textarea, Toast, Alert   } from 'flowbite-svelte';
    import { UploadOutline, ZoomInOutline, TrashBinOutline, ExclamationCircleOutline, CheckCircleSolid, EditOutline } from 'flowbite-svelte-icons';
    import { storage, ID } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { sineOut } from 'svelte/easing';
    import { user } from '$lib/user';
    import { slide } from 'svelte/transition';
    import { UpdateDataProfileBidang } from '$lib/updateProfileBidang.js';
  
    let isUploadOpen = false;
    let visibleProgresBar = false;
    
    let progress = '0';
    let ConfirmDeleteModal = false;
    let selectedId = null;

     // Modal validasi upload gambar jika bukan type file gambar
   let invalidFileModal = false; // Untuk membuka/menutup modal error
   let modalErrorMessage = ''; // Untuk menyimpan pesan error

    let toastStatus = false;
    let counter = 6;

// Sesuaikan nama properti di sini
$: profileTataUsaha = data.DatasProfileBidang?.documents.find(
    (profil) => profil.namaBidang === "Tata Usaha"
);


   let ModalUpdateProfile = false;
   // Deklarasi variabel itanpa nilai awal
    let tentangText = '';
    let tupoksiText = '';
    let programPrioritasText = '';

    const maxCharsTentang = 1000; // Definisikan batas maksimal karakter
    const maxCharsTupoksi = 12000;
    const maxCharsprogramPrioritas = 12000;

    // Fungsi baru untuk membuka modal dan mengisi form
function openUpdateModal() {
  if (profileTataUsaha) {
    // Isi variabel form dengan data dari profilePemerintahan
    tentangText = profileTataUsaha.tentang;
    tupoksiText = profileTataUsaha.tupoksi;
    programPrioritasText = profileTataUsaha.programPrioritas;
    
    // Buka modal
    ModalUpdateProfile = true;
  } else {
    alert("Data profil tidak ditemukan, tidak bisa melakukan update.");
  }
}

const updateDataProfile = async (e) => {
  e.preventDefault();

  if (!profileTataUsaha) {
      alert("Error: Data profil tidak ditemukan.");
      return;
  }
  
  // Ambil ID dokumen dari profilePemerintahan
  const docId = profileTataUsaha.$id;

  // Panggil fungsi update dengan data dari variabel dan docId yang benar
  await UpdateDataProfileBidang(tentangText, tupoksiText, programPrioritasText, docId);
  
  // Refresh data di halaman
  invalidateAll();

  // Notification Toast and Time
  toastStatus = true;
  counter = 6;
  timeout();
};

function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalUpdateProfile = false;
  } 


function scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

function showimage(id) {
    const result = storage.getFileView('68becd03000631cf9bda', id);
    return result;  
}

 // Masukkan file ke Storage Bucket
 const UploadImage = async (e) => {
    e.preventDefault();
    const formEl = e.target;
    const fileInput = document.getElementById('UploadImageTataUsaha');
    const file = fileInput.files[0];

    // Jika tidak ada file yang dipilih, hentikan fungsi
    if (!file) {
        modalErrorMessage = 'Anda belum memilih file untuk diunggah.';
        invalidFileModal = true;
        return;
    }

    // --- VALIDASI TIPE FILE DIMULAI DI SINI ---
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        // Jika ekstensi file tidak ada dalam daftar yang diizinkan
        modalErrorMessage = 'Upload gagal! Format file harus JPG, JPEG, PNG, GIF, atau WEBP.';
        invalidFileModal = true; // Tampilkan modal error
        formEl.reset(); // Bersihkan input file
        return; // Hentikan eksekusi fungsi agar tidak mengupload
    }
    // --- VALIDASI SELESAI ---

    // Jika validasi berhasil, lanjutkan proses upload
    visibleProgresBar = true;
    try {
        await storage.createFile('68becd03000631cf9bda', ID.unique(), file);
        progress = 100;
        formEl.reset();
        await invalidateAll();
    } catch (error) {
        console.error("Upload Error:", error);
        modalErrorMessage = 'Terjadi kesalahan saat mengunggah file. Silakan coba lagi.';
        invalidFileModal = true;
    } finally {
        progress = 0;
        visibleProgresBar = false;
    }
};


 function openDeleteModal(id) {
    selectedId = id;
    ConfirmDeleteModal = true;
  }
 

 const remove = async (id) => {
    // Delete File Storage
    await storage.deleteFile('68becd03000631cf9bda', id );
    ConfirmDeleteModal = false;
    await invalidateAll();
	};

  // Pagination 
  let currentPage =1; // Update this to simulate page change.
  let postsPerPage = 9;
  let allPosts = data.DatasGambarTataUsaha.files;
  let totalPosts = allPosts.length;
  let totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;
	const setCurrentPage = newPage => {
		currentPage = newPage;
  }
    
  </script>
  
  <svelte:head>
  <title>Gallery Photo Tata Usaha</title>
  <meta name="description" content="Gallery Photo - Tata Usaha Sipapaode" />
  </svelte:head>

  
  <div class="container">
    <Heading tag="h3" customSize="text-2xl text-left font-extrabold  md:text-2xl lg:text-3xl">Profile dan Photo Gallery - Sub Bagian Tata Usaha</Heading>
  <br/>

     
 <div class="flex justify-start space-x-4">
    <button on:click={() => scrollTo('updateProfile')} class="px-5 py-2.5 text-sm font-medium text-sky-700 bg-slate-100 border border-sky-700 rounded-lg focus:ring-4 focus:ring-slate-300 focus:outline-none transition-all duration-200 hover:shadow-[3px_3px_rgb(90,134,175)]">📝 Update Profile</button>
    <button on:click={() => scrollTo('uploadPhoto')} type="button" class="px-5 py-2.5 text-sm font-medium text-sky-700 bg-slate-100 border border-sky-700 rounded-lg focus:ring-4 focus:ring-slate-300 focus:outline-none transition-all duration-200 hover:shadow-[3px_3px_rgb(90,134,175)]">🖼️ Upload Photo Gallery</button>
  </div> 
  <br/>

  {#if $user.prefs['Role'] !== "PIC Tata Usaha"}
  <Alert color="yellow">
  <span class="font-medium" style="font-weight:600;">Halaman ini hanya bisa di Update oleh PIC Tata Usaha</span>
  </Alert>
  <br/>
  {/if}

   <!-- Modal Update Profile Bidang -->
     <Modal size="lg" title="Update Profile Sub Bagian Tata Usaha" bind:open={ModalUpdateProfile} autoclose={false}>
        <form class="space-y-6" on:submit|preventDefault={updateDataProfile} >
        
        <h2 style="font-size: 20px;font-weight: 600;margin-bottom: -20px;">Tentang:</h2>
         <Textarea id="Tentang" maxlength={maxCharsTentang} placeholder="Tentang*" rows="2" name="Tentang" bind:value={tentangText}  />  
         <label class="text-sm text-left" class:text-red-600={tentangText.length >= maxCharsTentang}>
        {tentangText.length} / {maxCharsTentang}</label>
       
        <h2 style="font-size: 20px;font-weight: 600;margin-bottom: -20px;">Tupoksi:</h2>
         <Textarea id="Tupoksi" maxlength={maxCharsTupoksi} placeholder="Tupoksi*" rows="8" name="Tupoksi" bind:value={tupoksiText}  />  
         <label class="text-sm text-left" class:text-red-600={tupoksiText.length >= maxCharsTupoksi}>
        {tupoksiText.length} / {maxCharsTupoksi}</label>

        <h2 style="font-size: 20px;font-weight: 600;margin-bottom: -20px;">Program Prioritas:</h2>
         <Textarea id="programPrioritas" maxlength={maxCharsprogramPrioritas} placeholder="programPrioritas*" rows="4" name="programPrioritas" bind:value={programPrioritasText}  />  
         <label class="text-sm text-left" class:text-red-600={programPrioritasText.length >= maxCharsprogramPrioritas}>
        {programPrioritasText.length} / {maxCharsprogramPrioritas}</label>
      
            <div>
              <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Profile</button>
            </div>     
          </form>  
          <svelte:fragment slot="footer">
            <Button color="alternative" on:click={()=> ModalUpdateProfile = !ModalUpdateProfile} >Batal</Button>
           <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
           <CheckCircleSolid slot="icon" class="w-5 h-5" />
           Data Profile Sub Bagian Tata Usaha berhasil diperbaharui. Form akan tutup dalam {counter}s.
           </Toast>
          </svelte:fragment>
        </Modal>

<div id="updateProfile" class="flex items-center gap-4 mb-10">
    <h4 class="text-xl font-extrabold md:text-xl lg:text-2xl">📝 Update Halaman Profile</h4>
     {#if $user.prefs['Role'] === "PIC Tata Usaha"}
    <button style="box-shadow: rgba(102, 144, 246, 0.4) 5px 7px;" on:click={openUpdateModal} class="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-2 font-semibold text-slate-800 transition duration-200 hover:shadow-md active:scale-95">
     <EditOutline class="shrink-0 h-6 w-6" /><span>EDIT</span>
    </button>
      {/if}
</div>   

<div class="mx-auto my-10 p-8 border-2 border-neutral-500 rounded-2xl font-sans">
    <div class="space-y-6">
      {#if profileTataUsaha}
        <div>
            <h2 class="inline-block text-xl font-bold text-gray-800 mb-3"><span class="pb-1 border-b-4 border-sky-600">Tentang</span></h2>
            <p class="preserve-lines text-gray-700 bg-slate-100 leading-relaxed text-justify py-1 px-2 rounded-md border border-[#d4d4f1]">{ profileTataUsaha.tentang } </p>
        </div>
        <div>
            <h2 class="inline-block text-xl font-bold text-gray-800 mb-3"><span class="pb-1 border-b-4 border-sky-600">Tupoksi</span></h2>
            <p class="preserve-lines text-gray-700 bg-slate-100 leading-relaxed text-justify py-1 px-2 rounded-md border border-[#d4d4f1]">{ profileTataUsaha.tupoksi } </p>
        </div>
         <div>
            <h2 class="inline-block text-xl font-bold text-gray-800 mb-3"> <span class="pb-1 border-b-4 border-sky-600">Program Prioritas</span></h2>
            <p class="preserve-lines text-gray-700 bg-slate-100 leading-relaxed text-justify py-1 px-2 rounded-md border border-[#d4d4f1]"> { profileTataUsaha.programPrioritas } </p>
        </div>
    {:else}
        <p class="text-center text-gray-500">
            Data profil untuk "Sub Bagian Tata Usaha" tidak ditemukan.
        </p>
    {/if}
  </div>
    
</div>

  <br/><br/> 

   <div id="uploadPhoto" class="flex items-center gap-4 mb-10">
    <h4 class="text-xl font-extrabold md:text-xl lg:text-2xl">🖼️ Upload Photo Gallery</h4>
    {#if $user.prefs['Role'] === "PIC Tata Usaha"}
    <button style="box-shadow: rgba(102, 144, 246, 0.4) 5px 7px;" on:click={() => (isUploadOpen = !isUploadOpen)} class="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-2 font-semibold text-slate-800 transition duration-200 hover:shadow-md active:scale-95">
    <EditOutline class="shrink-0 h-6 w-6" /><span>{!isUploadOpen ? 'UPLOAD PHOTO' : 'TUTUP UPLOAD PHOTO'}</span>
   </button>
    {/if}
    </div> 

     {#if isUploadOpen}
      <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
     <form class="space-y-6" on:submit|preventDefault ={UploadImage} >
     <Label class="pb-2 text-base">Upload file Photo atau Gambar (Type File diizinkan: <b>jpg</b>, <b>jpeg</b>, <b>gif</b>, <b>webp</b> dan <b>png</b>)</Label>
    <Fileupload class="mb-2" id="UploadImageTataUsaha" accept=".png, .jpg, .jpeg, .webp" required />
    <Label class="pb-2 mb-3">(Max File Size: 10 MB)</Label>
    <ButtonGroup class="*:!ring-primary-700"><Button outline color="dark" type="submit" value="submit" >
    <UploadOutline  class="w-4 h-4 me-2" />Simpan Gambar</Button> </ButtonGroup>
    </form> 
      
      <Modal bind:open={invalidFileModal} size="sm" autoclose>
            <div class="text-center">
                <ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {modalErrorMessage}
                </h3>
                <Button color="alternative" on:click={() => invalidFileModal = false}>Tutup</Button>
            </div>
        </Modal>
    <br/>
   
      {#if visibleProgresBar} 
    <Progressbar {progress} animate precision={2} labelOutside="Progress Upload Gambar" labelInside
     tweenDuration={1500} easing={sineOut}
     size="h-4"
     labelInsideClass="bg-blue-600 text-blue-100 text-sm font-medium text-center leading-none rounded-full"
     class="mb-4"
     />
     {/if}
    </div>
    {/if}
    <br/>
 
   
  {#if data.DatasGambarTataUsaha.total === 0}
  <p>Saat ini tidak terdapat Gambar pada Gallery Photo.</p>
  {:else}
  <p>Terdapat {data.DatasGambarTataUsaha.total} Gambar dalam Folder Gallery Tata Usaha</p>
{/if}
 <br/>
  <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
    {#await data.DatasGambarTataUsaha.files}
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
        <Button style="color:blue;"><a href={showimage(cetakTabel.$id)} target="_blank" style="color:blue;"><ZoomInOutline class="w-4 h-4 me-2" />Lihat</a></Button>
        <Button style="color:red;" on:click={() => openDeleteModal(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
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

     .preserve-lines {
        white-space: pre-wrap;
        font-family: inherit; /* Opsional: Agar font mengikuti style halaman */
    }
  </style>