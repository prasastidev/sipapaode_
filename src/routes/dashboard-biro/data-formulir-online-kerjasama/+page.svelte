<script>
    /** @type {{ data: import('./$types').PageData }} */
 
    import { Heading, Button, Avatar, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {  TrashBinOutline, DownloadOutline, EyeOutline, BuildingOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
	  import { deleteTableData } from '$lib/crudPengajuanKSOnline.js';
   
    

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

export let data=[];

function DownloadFile(id) {
  const result = storage.getFileView('674fa666003b4eb41eea', id);
	return result;
}

const remove = async (id) => {
		await deleteTableData(id);
    // Delete File Storage
		const result = await storage.deleteFile('674fa666003b4eb41eea', id );
    console.log(result);
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
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Formulir Permohonan / Pengajuan Kerjasama secara Online</Heading>
  <br/>
 
<br/> <br/>


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


Dibawah berikut adalah Data Pengajuan Kerjasama secara online.  <br/>
{#if data.TableDataPengajuanKSOnline.total === 0}
<p>Saat ini Tidak ada Data Formulir Pengajuan Kerjasama secara Online</p>
{:else}
<p>Terdapat {data.TableDataPengajuanKSOnline.total} Data Pengajuan Kerjasama secara Online</p>
 {/if}
 <br/>

  <Table id="TABLE_KSPK" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Tanggal Submit</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Kategori Kerjasama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Email</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Contact Person</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Instansi</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Tentang</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Catatan</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Draft Dokumen KS</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
    </TableHead>
    {#await data.TableDataPengajuanKSOnline.documents}
      loading...
     {:then allPosts}
    <TableBody tableBodyClass="divide-y">
      {#each allPosts as cetakTabel, i}	
      {#if i >= postRangeLow && i < postRangeHigh}
      <TableBodyRow>
        <TableBodyCell>{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2"><Avatar class="inline-flex" border /> {cetakTabel.Nama}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.$updatedAt.slice(0, 10)}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Kategory_KS}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Email}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.ContactPerson}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2"><BuildingOutline class="w-4 h-4 infline-flex me-2" /> {cetakTabel.Instansi}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Tentang}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Catatan}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:green;"><EyeOutline class="w-4 h-4 me-2" />Berkas Pengajuan Kerjasama</Button></a> </ButtonGroup></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700">
            <Button style="color:red;" on:click={() => remove(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
          </ButtonGroup></TableBodyCell>
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
	
</style>











  
 
