<script>
    /** @type {import('./$types').PageData} */
    
    import { Heading, Fileupload, Progressbar, Label, Button, ButtonGroup } from 'flowbite-svelte';
    import { UploadOutline, ZoomInOutline, TrashBinOutline, CheckCircleSolid } from 'flowbite-svelte-icons';
    import { storage, ID } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { sineOut } from 'svelte/easing';
  
   
    let isUploadOpen = false;
    export let data = [];
    let jumlah;
    let promise;

     let progress = '0';


function showimage(id) {
    const result = storage.getFileView('67545c85000bd5d33ef2', id);
    return result;  
}

 // Masukkan file ke Storage Bucket
 const UploadImage = async (e) => {
    e.preventDefault();
		const formEl = e.target;
    await storage.createFile('67545c85000bd5d33ef2', ID.unique(), document.getElementById('UploadImageKS').files[0]); 
    progress = 100;
    // Reset form
		formEl.reset();   
    await invalidateAll();
    progress = 0;
 }
 

 const remove = async (id) => {
    // Delete File Storage
   await storage.deleteFile('67545c85000bd5d33ef2', id );
    await invalidateAll();
	};


  // Pagination 
  let currentPage =1; // Update this to simulate page change.
  let postsPerPage = 9;
  let allPosts = data.DatasGambar.files;
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
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Gallery Photo Dokumentasi Kerjasama</Heading>
    <br/>

    <Button color="dark" pill on:click={() => (isUploadOpen = !isUploadOpen)}>{!isUploadOpen ? 'Buka Upload Photo' : 'Tutup Upload Photo'} </Button> <br/><br/>

    {#if isUploadOpen}
  <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
    <form class="space-y-6" on:submit|preventDefault ={UploadImage} >
   <Label class="pb-2 text-base">Upload file Photo / Gambar</Label>
   <Fileupload class="mb-2" id="UploadImageKS" />
    <Label class="pb-2 mb-3">Jpg or Png (Max Size: 10 MB)</Label>
    <ButtonGroup class="*:!ring-primary-700"><Button outline color="dark" type="submit" value="submit" >
    <UploadOutline  class="w-4 h-4 me-2" />Simpan Gambar</Button> </ButtonGroup>
    </form> 
    <br/>
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
    </div>
    {/if}
  
  <br/> <br/>

  <Heading tag="h4" customSize="text-xl text-left font-extrabold  md:text-xl lg:text-2xl">🖼️ List Photo</Heading>
  <br/>
  {#if data.DatasGambar.total === 0}
  <p>No TableDatas yet.</p>
  {:else}
  <p>Terdapat {data.DatasGambar.total} Gambar dalam Folder Gallery Kerjasama</p>
{/if}
 <br/>
  <div style="padding:18px;border-radius:12px;border:2px solid #88888b;">
    {#await data.DatasGambar.files}
     loading...
    {:then allPosts}
    <div class="grid grid-cols-3 gap-4">
      {#each allPosts as cetakTabel,i}
      {#if i >= postRangeLow && i < postRangeHigh}
     <div style="float:left;text-align:center;">
     <img src={showimage(cetakTabel.$id)} alt="image" style="width:460px;height:240px;margin:10px;border-radius:10px;"/>
     <span style="font-size:14px;">{cetakTabel.name}</span> <br/>
      <ButtonGroup class="*:!ring-primary-700">
        <Button style="color:blue;"><a href={showimage(cetakTabel.$id)} target="_blank" style="color:blue;"><ZoomInOutline class="w-4 h-4 me-2" />Lihat</a></Button>
      <Button style="color:red;" on:click={() => remove(cetakTabel.$id)}><TrashBinOutline class="w-4 h-4 me-2" />Delete</Button>
     </ButtonGroup> 
      </div>
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