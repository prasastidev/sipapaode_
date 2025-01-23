<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Modal, Tabs, TabItem, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {  TrashBinOutline, FilePdfOutline, EyeOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
	 import { deleteTableData } from '$lib/DokumenLPPDLKPJ.js';

   let ConfirmDeleteModalLPPD = false;
   let ConfirmDeleteModalLKPJ = false;


  function DownloadFile(id) {
  const result = storage.getFileDownload('675e48c4001bd540c846', id);
	return result;
}

  const remove = async (id) => {
		await deleteTableData(id);
    // Delete File Storage
		const result = await storage.deleteFile('675e48c4001bd540c846', id );
    console.log(result);
		invalidateAll();
	};

  function SearchTableLPPD() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_LPPD");
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

    function SearchTableLKPJ() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_LKPJ");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
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

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Document LPPD & LKPJ Kabupaten/Kota - Sulawesi Tenggara</Heading>
    <br/><br/>
    <div class="modern-box">
      <div class="contentbox">
        <label>Dibawah Berikut adalah Data Dokumen LPPD dan LKPJ oleh Pemerintah Daerah Kab/Kota Prov. Sulawesi Tenggara.</label>
      </div>
    </div>
    <br/><br/>
    <Tabs tabStyle="pill">
        <TabItem open>
          <span slot="title">DOKUMEN LPPD</span>
          <section>
            Dibawah berikut adalah Data Dokumen Pengiriman LPPD.  <br/>
              {#if data.TableDataDokLPPD.total === 0}
              <p>Saat ini Tidak ada Data Dokumen Pengiriman LPPD</p>
              {:else}
              <p>Terdapat {data.TableDataDokLPPD.total} Dokumen Pengiriman LPPD</p>
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
                     <input on:keyup={SearchTableLPPD} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Dokumen LPPD berdasarkan Judul ..." required />
                 </div>
                 <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                     </svg>
                     <span class="sr-only">Search</span>
                 </button>
             </form><br/>
              
                <Table id="TABLE_LPPD" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
                  <TableHead>
                    <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">File Dokumen</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Judul</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Nama Kab/Kota (Tahun)</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Pengirim / Tanggal Submit</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
                  </TableHead>
                  <TableBody tableBodyClass="divide-y">
                    {#each data.TableDataDokLPPD.documents as cetakTabel, i}	
                    <TableBodyRow>
                      <TableBodyCell class="content-start">{i+1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                      <center><ButtonGroup class="*:!ring-primary-700"><a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#89aae4;height: 80px;">
                      <FilePdfOutline class="w-11 h-11" /> </Button> </a> </ButtonGroup> <label style="color:#89aae4;margin-top:5px;display: block;">Unduh File</label>
                      </center>
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:240px;font-weight:600;">{cetakTabel.Jenis_laporan} {cetakTabel.Kabupaten_Kota} Tahun {cetakTabel.Tahun} </div></TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">{cetakTabel.Kabupaten_Kota}<br/><br/>Tahun: {cetakTabel.Tahun}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:260px;"><b>Nama Pengirim:</b> {cetakTabel.Nama_Pengirim} <br/><b>NIP Pengirim:</b> {cetakTabel.NIP_pengirim} <br/><b>Instansi Pengirim:</b> {cetakTabel.Instansi_Pengirim} <br/><b>Contac Person:</b> {cetakTabel.Contac_Person} <br/><br/><b>Tanggal Submit:</b><br/>{cetakTabel.$updatedAt.slice(0, 10)} </div>
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                        <center><ButtonGroup class="*:!ring-primary-700">
                          <Button style="color:red;" on:click={() => (ConfirmDeleteModalLPPD = true)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                        </ButtonGroup></center></TableBodyCell>
                        <Modal bind:open={ConfirmDeleteModalLPPD} size="xs" autoclose={false}>
                          <div class="text-center">
                            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data LPPD dan File Document yang Anda Pilih</h3>
                            <Button color="red" class="me-2" on:click={() => remove(cetakTabel.$id)}>Ya, Hapus Sekarang</Button>
                            <Button color="alternative" on:click={()=> ConfirmDeleteModalLPPD = !ConfirmDeleteModalLPPD}>Tidak, Batal</Button>
                          </div>
                        </Modal>
                    </TableBodyRow>
                 {/each}
              
                  </TableBody>    
                </Table>
            </section>
        </TabItem>
        <TabItem>
          <span slot="title">DOKUMEN LKPJ</span>
          <section>
            Dibawah berikut adalah Data Dokumen Pengiriman LKPJ.  <br/>
              {#if data.TableDataDokLKPJ.total === 0}
              <p>Saat ini Tidak ada Data Dokumen Pengiriman LKPJ</p>
              {:else}
              <p>Terdapat {data.TableDataDokLKPJ.total} Dokumen Pengiriman LKPJ</p>
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
                     <input on:keyup={SearchTableLKPJ} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Dokumen LKPJ berdasarkan Judul ..." required />
                 </div>
                 <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                     </svg>
                     <span class="sr-only">Search</span>
                 </button>
             </form><br/>
              
                <Table id="TABLE_LKPJ" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
                  <TableHead>
                    <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">File Dokumen</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Judul</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Nama Kab/Kota (Tahun)</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Pengirim / Tanggal Submit</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
                  </TableHead>
                  <TableBody tableBodyClass="divide-y">
                    {#each data.TableDataDokLKPJ.documents as cetakTabel, i}	
                    <TableBodyRow>
                      <TableBodyCell class="content-start">{i+1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                        <center><ButtonGroup class="*:!ring-primary-700"><a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#89aae4;height: 80px;">
                          <FilePdfOutline class="w-11 h-11" /> </Button> </a> </ButtonGroup> <label style="color:#89aae4;margin-top:5px;display: block;">Unduh File</label>
                        </center>
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:240px;font-weight:600;">{cetakTabel.Jenis_laporan} {cetakTabel.Kabupaten_Kota} Tahun {cetakTabel.Tahun} </div></TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">{cetakTabel.Kabupaten_Kota}<br/><br/>Tahun: {cetakTabel.Tahun}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:260px;"><b>Nama Pengirim:</b> {cetakTabel.Nama_Pengirim} <br/><b>NIP Pengirim:</b> {cetakTabel.NIP_pengirim} <br/><b>Instansi Pengirim:</b> {cetakTabel.Instansi_Pengirim} <br/><b>Contac Person:</b> {cetakTabel.Contac_Person} <br/><br/><b>Tanggal Submit:</b><br/>{cetakTabel.$updatedAt.slice(0, 10)} </div>
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><ButtonGroup class="*:!ring-primary-700">
                          <Button style="color:red;" on:click={() => (ConfirmDeleteModalLKPJ = true)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                        </ButtonGroup></TableBodyCell>
                        <Modal bind:open={ConfirmDeleteModalLKPJ} size="xs" autoclose={false}>
                          <div class="text-center">
                            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data LPPD dan File Document yang Anda Pilih</h3>
                            <Button color="red" class="me-2" on:click={() => remove(cetakTabel.$id)}>Ya, Hapus Sekarang</Button>
                            <Button color="alternative" on:click={()=> ConfirmDeleteModalLKPJ = !ConfirmDeleteModalLKPJ}>Tidak, Batal</Button>
                          </div>
                        </Modal>
                    </TableBodyRow>
                 {/each}
              
                  </TableBody>    
                </Table>
            </section>
        </TabItem>
      </Tabs>

  <br/> <br/>
</div>

<style>
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