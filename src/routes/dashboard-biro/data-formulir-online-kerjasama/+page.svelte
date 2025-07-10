<script>
    /** @type {{ data: import('./$types').PageData }} */
    export let data=[];
    
    import { Heading, Button, Avatar, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, Modal, Radio, FloatingLabelInput, Toast, Select } from 'flowbite-svelte';
    import {  BuildingOutline, TrashBinOutline, FileLinesOutline, EditOutline, CheckCircleSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
	  import { deleteTableData, UpdateStatusPengajuanKS } from '$lib/crudPengajuanKSOnline.js';
    import { user } from '$lib/user';

    let ConfirmDeleteModal = false;
    let selectedId = null;
    let selectedNama, selectedInstansi;
    let ModalEditData = false;
    let getStatusPengajuan, getEstimasi, getNama, getInstansi, getidData, getTentang;

    let toastStatus = false;
    let counter = 6;

/** Edit Run 2 function: GetDataPengajuanKS and update*/

function getDataPengajuanKS(id) {
const promise = databases.getDocument(
  '673dd7b2001a83873b47', 
  '674fa11f000d0adfbe25',
  id,
  []
);

promise.then(function (response) {
  ModalEditData = true;
  console.log(response); // Success
 getStatusPengajuan = response.Status;
 getEstimasi = response.Estimasi;
 getNama = response.Nama;
 getInstansi = response.Instansi;
 getTentang = response.Tentang;
 getidData = response.$id;

}, function (error) {
  console.log(error); // Failure
  throw error;
});
}

const updateStatusPengajuan = async (e) => {
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
		await UpdateStatusPengajuanKS(formData.get('StatusPengajuan'), formData.get('EstimasiProses'), getidData);
		invalidateAll();

		// Reset form
		formEl.reset();
     // Notification Toast and Time
     toastStatus = true;
     counter = 6;
     timeout();

	};

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalFormulir = false;
  } 


  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_KSPK");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }

function DownloadFile(id) {
  const result = storage.getFileView('674fa666003b4eb41eea', id);
	return result;
}

function openDeleteModal(id, nama, instansi) {
    selectedId = id;
    selectedNama = nama;
    selectedInstansi = instansi;
    ConfirmDeleteModal = true;
  }

const remove = async (id) => {
    try {
        // Ambil data document terlebih dahulu untuk mendapatkan ID bucket dari setiap lampiran
        const document = await databases.getDocument(
            '673dd7b2001a83873b47', 
            '674fa11f000d0adfbe25',
            id
        );
        
        // Hapus ketiga file lampiran dari storage
        const deletePromises = [];
        
        if (document.IDBucketLampiranI) {
            deletePromises.push(
                storage.deleteFile('674fa666003b4eb41eea', document.IDBucketLampiranI)
            );
        }
        
        if (document.IDBucketLampiranII) {
            deletePromises.push(
                storage.deleteFile('674fa666003b4eb41eea', document.IDBucketLampiranII)
            );
        }
        
        if (document.IDBucketLampiranIII) {
            deletePromises.push(
                storage.deleteFile('674fa666003b4eb41eea', document.IDBucketLampiranIII)
            );
        }
        
        // Jalankan semua penghapusan file secara bersamaan
        await Promise.all(deletePromises);
        
        // Setelah semua file berhasil dihapus, hapus data dari database
        await deleteTableData(id);
        
        console.log('Berhasil menghapus data dan semua lampiran');
        ConfirmDeleteModal = false;
        invalidateAll();
        
    } catch (error) {
        console.error('Error saat menghapus data:', error);
        // Anda bisa menambahkan notifikasi error ke user di sini
    }
};

  // Items per page options
  let itemsPerPageOptions = [
    { value: 5, name: '5 per halaman' },
    { value: 10, name: '10 per halaman' },
    { value: 20, name: '20 per halaman' },
    { value: 50, name: '50 per halaman' },
    { value: 100, name: '100 per halaman' }
  ];

    // Pagination - menggunakan reactive statement
  let currentPage = 1;
  let postsPerPage = 20;

  // Reactive statement untuk memastikan data selalu ter-update
  $: allPosts = data.TableDataPengajuanKSOnline?.documents || [];
  $: totalPosts = allPosts.length;
  $: totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;

  const setCurrentPage = newPage => {
    currentPage = newPage;
  }

  // Function to handle items per page change
  const changeItemsPerPage = (newItemsPerPage) => {
    postsPerPage = newItemsPerPage;
    currentPage = 1; // Reset to first page when changing items per page
  }

  // Debug log untuk melihat jumlah data
  $: console.log('Total posts:', totalPosts, 'Current data:', allPosts.length);

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Dokumen Pengajuan Kerjasama secara Online</Heading>
  <br/>
  <div class="modern-box">
    <div class="contentbox">
      <label>Dibawah berikut adalah Data Dokumen pengajuan Kerjasama dengan Pemerintah Prov. Sulawesi Tenggara yang dilakukan oleh Pihak Ketiga/Swasta ataupun Pemerintah Daerah dan K/L, melalui penginputan formulir dokumen secara Online.</label>
    </div>
  </div>
  <br/><br/>


<Modal title="Edit Data Proses Pengajuan Kerjasama Atas Nama {getNama}" bind:open={ModalEditData} autoclose={false}>
  <form class="space-y-6" on:submit={updateStatusPengajuan}>
    <b>Instansi:</b>  {getInstansi}  <br/>
  <b>Tentang:</b> {getTentang}  <br/> <br/>
   <label class="text-sm" style="color:black;">Saat ini Proses Pengajuan Sedang dalam Status:</label> <br/>
   <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Proses Pengajuan">1. Proses Pengajuan</Radio></li>
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Proses Verifikasi">2. Proses Verifikasi</Radio></li>
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Penandatanganan Naskah">3. Penandatanganan Naskah</Radio></li>
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Perbaikan Pengajuan">Perbaikan Pengajuan</Radio></li>
    </ul> <br/> 
    <label class="text-sm" style="display:block;margin-bottom:-10px;color:black;">Masukan Estimasi Proses dari proses pengajuan saat ini. <i>(Ex: 2 Hari, 3-5 Hari)</i> </label>
    <FloatingLabelInput style="filled" bind:value={getEstimasi} name="EstimasiProses" type="text">
      Estimasi Proses:
    </FloatingLabelInput><br/>
    <div>
      <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
    </div>     
  </form>  
  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalEditData = !ModalEditData} >Batal</Button>
    <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
      <CheckCircleSolid slot="icon" class="w-5 h-5" />
      Data Pengajuan Kerjasama berhasil di Perbaharui. Form akan tutup dalam {counter}s.
    </Toast>
  </svelte:fragment>
</Modal>

{#if data.TableDataPengajuanKSOnline.total === 0}
<p>Saat ini Tidak ada Data Formulir Pengajuan Kerjasama secara Online</p>
{:else}
<p>Terdapat {data.TableDataPengajuanKSOnline.total} Data Pengajuan Kerjasama secara Online</p>
 {/if}
 <br/>

    <form class="flex items-center w-full mx-auto" style="width:100%;">   
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
              </svg>
          </div>
          <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari berdasarkan Instansi ..." required />
      </div>
      <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search</span>
      </button>
  </form>
    
<br/>
   
 <!-- Pagination dengan Items per Page -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <!-- Items per page selector -->
        <div class="flex items-center gap-2">
            <label for="items-per-page" class="font-medium text-gray-700">Show:</label>
            <Select 
                id="items-per-page"
                items={itemsPerPageOptions} 
                bind:value={postsPerPage}
                on:change={() => changeItemsPerPage(postsPerPage)}
                class="w-auto min-w-[140px]"
            />
        </div>

        <!-- Pagination -->
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
    </div>
     
    <span style="margin-left: 6px; margin-top: 5px;display: block;">
       Halaman {currentPage} dari {totalPages} | Menampilkan {Math.min(postRangeLow + 1, totalPosts)}-{Math.min(postRangeHigh, totalPosts)} dari {totalPosts} data
     </span>
<br/>
<section>
  <Table id="TABLE_KSPK" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Instansi</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Tanggal Pengajuan</TableHeadCell>
      <TableHeadCell style="font-size: larger;width:140px;" class="py-3 px-2 content-start">Berkas Lampiran I (surat permohonan)</TableHeadCell>
      <TableHeadCell style="font-size: larger;width:140px;" class="py-3 px-2 content-start">Berkas Lampiran II (kak/naskah ks sebelumnya)</TableHeadCell>
             <TableHeadCell style="font-size: larger;width:140px;" class="py-3 px-2 content-start">Berkas Lampiran III (naskah ks baru)</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Detail Pengirim</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Detail Kerjasama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Catatan Pengirim</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Status & Estimasi</TableHeadCell>
      {#if $user.prefs['Role'] === "PIC Kerjasama"}
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Aksi</TableHeadCell>
      {/if}
    </TableHead>
    {#await data.TableDataPengajuanKSOnline.documents}
      loading...
     {:then allPosts}
    <TableBody tableBodyClass="divide-y">
      {#each allPosts as cetakTabel, i}	
      {#if i >= postRangeLow && i < postRangeHigh}
      <TableBodyRow class="hover:bg-blue-100">
        <TableBodyCell class="content-start">{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start flex"><BuildingOutline class="w-14 h-14" style="color:#717b91;" /><span><b>{cetakTabel.Instansi}</b> </span></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">{cetakTabel.$updatedAt.slice(0, 10)}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
         <div style="width:120px;">
          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.IDBucketLampiranI)} target="_blank"><Button style="color:#89aae4;height: 80px;"><FileLinesOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh berkas Lampiran I</label>  
         </div>
        </TableBodyCell>
         <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
         <div style="width:120px;">
          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.IDBucketLampiranII)} target="_blank"><Button style="color:#89aae4;height: 80px;"><FileLinesOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh berkas Lampiran II</label>  
         </div>
        </TableBodyCell>
         <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
         <div style="width:120px;">
          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.IDBucketLampiranIII)} target="_blank"><Button style="color:#89aae4;height: 80px;"><FileLinesOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh berkas Lampiran III</label>  
         </div>
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:240px;overflow-wrap: anywhere;"><b>▸ Nama:</b> {cetakTabel.Nama} <br/><b>▸ Posisi:</b> {cetakTabel.Posisi} <br/><b>▸ Email:</b> {cetakTabel.Email} <br/><b>▸ Contact:</b> {cetakTabel.ContactPerson} <br/><b>▸ Kota:</b> {cetakTabel.Kota} <br/><b>▸ Provinsi:</b> {cetakTabel.Provinsi}
        </div></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:200px;overflow-wrap:anywhere;"><b>▸ Kategory:</b> <br/>{cetakTabel.Kategory_KS}<br/><b>▸ Jenis Pengajuan Kerjasama:</b> <br/>{cetakTabel.OpsiPengajuan}<br/><b>▸ Tentang:</b> <br/>{cetakTabel.Tentang}</div></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:160px;overflow-wrap:anywhere;">{cetakTabel.Catatan}</div></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:180px;">
          <Badge color={
           cetakTabel.Status === "Proses Pengajuan" ? "yellow" :
           cetakTabel.Status === "Proses Verifikasi" ? "blue" :
           cetakTabel.Status === "Penandatanganan Naskah" ? "green" :
           cetakTabel.Status === "Perbaikan Pengajuan" ? "red" : "gray"
            } 
          border>{cetakTabel.Status}</Badge><br/><br/><b>Estimasi Proses: </b><br/>{cetakTabel.Estimasi}</div>
        </TableBodyCell>
        {#if $user.prefs['Role'] === "PIC Kerjasama"}
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
          <ButtonGroup class="*:!ring-primary-700">
            <Button style="color:blue;" on:click={() => getDataPengajuanKS(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            <Button style="color:red;"on:click={() => openDeleteModal(cetakTabel.$id, cetakTabel.Nama, cetakTabel.Instansi)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
          </ButtonGroup>
        </TableBodyCell>
        {/if}
        <Modal bind:open={ConfirmDeleteModal} size="md" autoclose={false}>
          <div class="text-center">
            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data Pengajuan Kerjasama serta Serta Dokumen Berkas Pengajuan Kerjasama a.n <b>{selectedNama}</b> dari <b>{selectedInstansi}</b></h3>
            <Button color="red" class="me-2" on:click={() => remove(selectedId)}>Ya, Hapus Sekarang</Button>
            <Button color="alternative" on:click={()=> ConfirmDeleteModal = !ConfirmDeleteModal}>Tidak, Batal</Button>
          </div>
        </Modal>
      </TableBodyRow>
      {/if}
   {/each}

    </TableBody>
    {/await} 
  </Table>

   <!-- Pagination bawah dengan Items per Page -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <!-- Items per page selector -->
            <div class="flex items-center gap-2">
                <label for="items-per-page-bottom" class="font-medium text-gray-700">Show:</label>
                <Select 
                    id="items-per-page-bottom"
                    items={itemsPerPageOptions} 
                    bind:value={postsPerPage}
                    on:change={() => changeItemsPerPage(postsPerPage)}
                    class="w-auto min-w-[140px]"
                />
            </div>
 
            <!-- Pagination -->
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
        </div>
         
        <span style="margin-left: 6px; margin-top: 5px;display: block;">
           Halaman {currentPage} dari {totalPages} | Menampilkan {Math.min(postRangeLow + 1, totalPosts)}-{Math.min(postRangeHigh, totalPosts)} dari {totalPosts} data
         </span>
       
        <br/><br/>     
 
  <br/><br/>
</section>



</div>

<style>
 ul.paginationTable {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin: 20px 0;
 }
 
 ul.paginationTable li {
  display: inline-block;
  padding: 8px 12px;
  border: 2px solid #e0e2e7;
  border-radius: 8px;
  background: #fcfcfc;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 40px;
  text-align: center;
 }
 
 ul.paginationTable li:hover {
  background: #e6f0ff;
  border-color: #2196f3;
  transform: translateY(-1px);
 }
 
 ul.paginationTable li.active {
  background: #2196f3 !important;
  color: white;
  border-color: #2196f3;
  font-weight: bold;
 }
 
 ul.paginationTable li.active:hover {
  background: #1976d2 !important;
  border-color: #1976d2;
 }
 
 /* Responsive pagination */
 @media (max-width: 768px) {
  ul.paginationTable li {
    padding: 6px 10px;
    font-size: 14px;
    min-width: 35px;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .flex-col > * {
    width: 100%;
    justify-content: center;
  }
 }
 
 /* Search input enhancements */
 #simple-search:focus {
  outline: none;
  ring: 2px;
  ring-color: #3b82f6;
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
  
  /* Top left corner */
  .modern-box::before {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }
  
  /* Top right corner */
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
  
  /* Bottom left corner */
  .contentbox::before {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
  }
  
  /* Bottom right corner */
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











  
 
