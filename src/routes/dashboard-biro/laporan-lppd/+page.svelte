<script>
  /** @type {import('./$types').PageData} */
  export let data=[];
  import { Heading, Modal, Toast, Button, Radio, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { EditOutline, InfoCircleSolid, FileLinesOutline, ClockOutline, CheckCircleSolid } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';
  import { invalidateAll } from '$app/navigation';
  import { databases } from '$lib/appwrite';
	import { UpdateTableDataLPPD } from '$lib/dataLPPDLPKJ.js';
  import { user } from '$lib/user';


  let getNamaKabupatenKota, getidDoc, getSLPPD, getSLPKJ, getKirimLPPD, getKirimLKPJ;
  let ModalUpdateDataLPPD = false;
  let toastStatus = false;
  let counter = 7;
 

/** Edit Run 2 function: GetDataDocumentLPPD and update*/

function getDataDocumentLPPD(id) {

	const promise = databases.getDocument(
		'673dd7b2001a83873b47', 
    '67418dd9001042dd5d75',
    id,
		[]
	);

	promise.then(function (response) {
    ModalUpdateDataLPPD = true;
    console.log(response); // Success
	getNamaKabupatenKota = response.Kabupaten_Kota;
  getSLPPD = response.SLPPD;
  getSLPKJ = response.SLPKJ;
  getKirimLPPD = response.PengirimanLPPD;
  getKirimLKPJ = response.PengirimanLKPJ;
	getidDoc = response.$id;

}, function (error) {
    console.log(error); // Failure
    throw error;
});
}

const updateData = async (e) => {
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
		await UpdateTableDataLPPD(formData.get('SLPPD'), formData.get('PengirimanLPPD'), formData.get('SLPKJ'), formData.get('PengirimanLKPJ'), getidDoc);
		invalidateAll();

		// Reset form
		formEl.reset();
     // Notification Toast and Time
     toastStatus = true;
     counter = 7;
     timeout();
	};

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalUpdateDataLPPD = false;
  }  

  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_LapLPPD");
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

</script>

<svelte:head>
<title>Laporan LPPD</title>
<meta name="description" content="Laporan LPPD" />
</svelte:head>


<Modal title="Update Data Pengiriman LPPD {getNamaKabupatenKota}" bind:open={ModalUpdateDataLPPD} autoclose={false}>
  <form class="space-y-6" on:submit={updateData} >
   <label class="text-sm">Apakah LPPD {getNamaKabupatenKota} sudah mengirim:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="SLPPD" class="p-3" bind:group={getSLPPD} value="✔️">Ya</Radio></li>
      <li class="w-full"><Radio name="SLPPD" class="p-3" bind:group={getSLPPD} value="➖">Belum</Radio></li>
    </ul> <br/> 
    <label class="text-sm">Bagaimana Waktu Pengiriman LPPD {getNamaKabupatenKota}:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="PengirimanLPPD" bind:group={getKirimLPPD} class="p-3" value="🟩 Tepat Waktu">Tepat Waktu</Radio></li>
      <li class="w-full"><Radio name="PengirimanLPPD" bind:group={getKirimLPPD} class="p-3" value="🟥 Terlambat">Terlambat</Radio></li> 
      <li class="w-full"><Radio name="PengirimanLPPD" bind:group={getKirimLPPD} class="p-3" value="🟨 Belum Mengirim">Belum Mengirim</Radio></li> 
    </ul> <br/> 
    <label class="text-sm">Apakah LKPJ {getNamaKabupatenKota} sudah mengirim:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="SLPKJ" bind:group={getSLPKJ} class="p-3" value="✔️" >Ya</Radio></li>
      <li class="w-full"><Radio name="SLPKJ" bind:group={getSLPKJ} class="p-3" value="➖">Belum</Radio></li>
    </ul> <br/> 
    <label class="text-sm">Bagaimana Waktu Pengiriman LKPJ {getNamaKabupatenKota}:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="PengirimanLKPJ" bind:group={getKirimLKPJ} class="p-3" value="🟩 Tepat Waktu">Tepat Waktu</Radio></li>
      <li class="w-full"><Radio name="PengirimanLKPJ" bind:group={getKirimLKPJ} class="p-3" value="🟥 Terlambat">Terlambat</Radio></li>
      <li class="w-full"><Radio name="PengirimanLKPJ" bind:group={getKirimLKPJ} class="p-3" value="🟨 Belum Mengirim">Belum Mengirim</Radio></li>
     
    </ul> <br/>
    
    <div>
      <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
    </div>     
  </form> 

  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalUpdateDataLPPD = !ModalUpdateDataLPPD} >Batal</Button>
    <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
      <CheckCircleSolid slot="icon" class="w-5 h-5" />
      Data telah berhasil di update. Form akan tutup dalam {counter}s.
    </Toast> 
  </svelte:fragment>
</Modal>
 

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Update Checklist Laporan LPPD dan LKPJ Tahun 2024</Heading>
  <br/><br/>
  <div class="modern-box">
    <div class="contentbox">
      <label>Berikut adalah pembaruan Checklist pengiriman Laporan LPPD dan LKPJ oleh Pemerintah Kabupaten/Kota Provinsi Sulawesi Tenggara. Setiap perubahan data pada halaman ini akan terupdate secara otomatis di halaman publik untuk <a href="/penyampaian-lppd" class="font-semibold underline text-blue-400 hover:text-blue-600 dark:hover:text-yellow-900">Pengiriman LPPD dan LKPJ</a>.</label>
    </div>
  </div>
  <br/><br/><br/>

<section>

  <form class="flex items-center w-full mx-auto" style="width:100%;">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Nama Kabupaten / Kota ..." required />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>
<br/>

  <Table id="TABLE_LapLPPD" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Kabupaten / Kota</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPPD</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LKPJ</TableHeadCell>
      {#if $user.prefs['Role'] === "PIC Otonomi"}
      <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
      {/if}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.TableDatasLPPDLPKJ.documents as cetakTabel, i}	
      <TableBodyRow>
        <TableBodyCell>{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><FileLinesOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Document: {cetakTabel.SLPPD} <br/><ClockOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Pengiriman: {cetakTabel.PengirimanLPPD}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><FileLinesOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Document: {cetakTabel.SLPKJ}  <br/><ClockOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Pengiriman: {cetakTabel.PengirimanLKPJ}</TableBodyCell>
        {#if $user.prefs['Role'] === "PIC Otonomi"}
        <TableBodyCell class="whitespace-break-spaces"><ButtonGroup class="*:!ring-primary-700">
          <Button style="color:blue;" on:click={() => getDataDocumentLPPD(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
        </ButtonGroup></TableBodyCell>
        {/if}
      </TableBodyRow>
   {/each}

    </TableBody>
  </Table>
  <br/>
  {#if data.TableDatasLPPDLPKJ.total === 0}
  <p>No TableDatas yet.</p>
  {:else}
  <p>{data.TableDatasLPPDLPKJ.total} Kab/Kota Prov. Sulawesi Tenggara</p>
   {/if}
 
</section>


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