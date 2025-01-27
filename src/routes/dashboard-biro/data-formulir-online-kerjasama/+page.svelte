<script>
    /** @type {{ data: import('./$types').PageData }} */
    export let data=[];
    import { Heading, Button, Avatar, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, Modal, Radio, FloatingLabelInput } from 'flowbite-svelte';
    import {  TrashBinOutline, FileLinesOutline, EditOutline, BuildingSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
	  import { deleteTableData, UpdateStatusPengajuanKS } from '$lib/crudPengajuanKSOnline.js';

    let ConfirmDeleteModal = false;
    let ModalEditData = false;
    let getStatusPengajuan, getEstimasi, getNama, getInstansi, getidData, getTentang;

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
	};


  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_KSPK");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
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

const remove = async (id) => {
		await deleteTableData(id);
    // Delete File Storage
		const result = await storage.deleteFile('674fa666003b4eb41eea', id );
    console.log(result);
    ConfirmDeleteModal = false;
		invalidateAll();
	};

  // Pagination 
  let currentPage =1; // Update this to simulate page change.
  let postsPerPage = 5;
  let allPosts = data.TableDataPengajuanKSOnline.documents;
  let totalPosts = allPosts.length;
  let totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;
	const setCurrentPage = newPage => {
		currentPage = newPage;
  }

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Permohonan / Pengajuan Formulir Kerjasama secara Online</Heading>
  <br/>
  <div class="modern-box">
    <div class="contentbox">
      <label>Berikut dibawah ini adalah Data Informasi Pihak yang sedang melakukan Pengajuan Kerjasama Secara Online Baik Pihak Ketiga/Swasta ataupun Pemerintah Daerah dan K/L. Status Pengajuan Kerjasama akan melalui proses tahapan Verifikasi hingga penerbitan Dokumen Naskah Kerjasama.</label>
    </div>
  </div>
  <br/><br/>


<Modal title="Edit Data Proses Pengajuan Kerjasama Atas Nama {getNama}" bind:open={ModalEditData} autoclose={false}>
  <form class="space-y-6" on:submit={updateStatusPengajuan}>
    <b>Instansi:</b>  {getInstansi}  <br/>
  <b>Tentang:</b> {getTentang}  <br/> <br/>
   <label class="text-sm">Saat ini Proses Pengajuan Sedang dalam Status:</label> <br/>
   <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Proses Pengajuan">1. Proses Pengajuan</Radio></li>
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Proses Verifikasi">2. Proses Verifikasi</Radio></li>
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Penandatanganan Naskah">3. Penandatanganan Naskah</Radio></li>
      <li class="w-full"><Radio name="StatusPengajuan" bind:group={getStatusPengajuan} class="p-3" value="Ditolak">Ditolak</Radio></li>
    </ul> <br/> 
    <label class="text-sm" style="display:block;margin-bottom:-10px;">Estimasi Proses <i>(Ex: 2 Hari, 3-5 Hari)</i> </label>
    <FloatingLabelInput style="filled" bind:value={getEstimasi} name="EstimasiProses" type="text">
      Estimasi Proses:
    </FloatingLabelInput><br/>
    <div>
      <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
    </div>     
  </form>  
  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalEditData = !ModalEditData} >Batal</Button>
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
          <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari berdasarkan Nama ..." required />
      </div>
      <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search</span>
      </button>
  </form>
    
<br/>
    

<section>

  <Table id="TABLE_KSPK" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;width:140px;" class="py-3 px-2 content-start">Berkas Pengajuan Dokumen KS</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Nama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Contact</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Kategori Kerjasama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Catatan</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Status & Estimasi</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-3 px-2 content-start">Aksi</TableHeadCell>
    </TableHead>
    {#await data.TableDataPengajuanKSOnline.documents}
      loading...
     {:then allPosts}
    <TableBody tableBodyClass="divide-y">
      {#each allPosts as cetakTabel, i}	
      {#if i >= postRangeLow && i < postRangeHigh}
      <TableBodyRow>
        <TableBodyCell class="content-start">{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
         <div style="width:120px;">
          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#89aae4;height: 80px;"><FileLinesOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh berkas</label>  
         </div>
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:200px;"><Avatar class="inline-flex mb-4 mr-2 align-middle" border /> {cetakTabel.Nama} <br/><b>Tanggal Submit:</b><br/>{cetakTabel.$updatedAt.slice(0, 10)}</div></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:240px;overflow-wrap: anywhere;"><b>Instansi:</b> {cetakTabel.Instansi} <br/><b>Email:</b> {cetakTabel.Email} <br/><b>Contact:</b> {cetakTabel.ContactPerson}
        </div></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:200px;overflow-wrap:anywhere;"><b>Kategory:</b> <br/>{cetakTabel.Kategory_KS}<br/><br/><b>Tentang:</b> <br/>{cetakTabel.Tentang}</div></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:160px;overflow-wrap:anywhere;">{cetakTabel.Catatan}</div></TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:180px;">
          <Badge color={cetakTabel.Status === "Ditolak" ? "red" : "indigo"} border>{cetakTabel.Status}</Badge><br/><br/><b>Estimasi Proses: </b><br/>{cetakTabel.Estimasi}</div>
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
          <ButtonGroup class="*:!ring-primary-700">
            <Button style="color:blue;" on:click={() => getDataPengajuanKS(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            <Button style="color:red;" on:click={() => (ConfirmDeleteModal = true)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
          </ButtonGroup>
        </TableBodyCell>
        <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
          <div class="text-center">
            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data Pengajuan Kerjasama serta Serta Dokumen Berkas Pengajuan Kerjasama</h3>
            <Button color="red" class="me-2" on:click={() => remove(cetakTabel.$id)}>Ya, Hapus Sekarang</Button>
            <Button color="alternative" on:click={()=> ConfirmDeleteModal = !ConfirmDeleteModal}>Tidak, Batal</Button>
          </div>
        </Modal>
      </TableBodyRow>
      {/if}
   {/each}

    </TableBody>
    {/await} 
  </Table>
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
 
  <br/><br/>
</section>



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











  
 
