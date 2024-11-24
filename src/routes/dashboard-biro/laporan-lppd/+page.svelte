<script>
  /** @type {import('./$types').PageData} */
  export let data=[];
  import { Heading, Modal, Button, Toast, Radio, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { EditOutline } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';

  import { invalidateAll } from '$app/navigation';
  import { databases } from '$lib/appwrite';
	import { UpdateTableDataLPPD } from '$lib/dataLPPDLPKJ.js';

 

  let getNamaKabupatenKota, getidDoc;
  let ModalUpdateDataLPPD = false;
 

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
	};


</script>

<svelte:head>
<title>Laporan LPPD</title>
<meta name="description" content="Laporan LPPD" />
</svelte:head>


<Modal title="Update Data Pengiriman LPPD {getNamaKabupatenKota}" bind:open={ModalUpdateDataLPPD} autoclose={false}>
  <form class="space-y-6" on:submit={updateData} >
   <label class="text-sm">Apakah LPPD {getNamaKabupatenKota} sudah mengirim:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="SLPPD" class="p-3" value="✔️">Ya</Radio></li>
      <li class="w-full"><Radio name="SLPPD" class="p-3" value="➖">Tidak</Radio></li>
    </ul> <br/> 
    <label class="text-sm">Bagaimana Waktu Pengiriman LPPD {getNamaKabupatenKota}:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="PengirimanLPPD" class="p-3" value="🟩 Tepat Waktu">Tepat Waktu</Radio></li>
      <li class="w-full"><Radio name="PengirimanLPPD" class="p-3" value="🟥 Terlambat">Terlambat</Radio></li> 
      <li class="w-full"><Radio name="PengirimanLPPD" class="p-3" value="🟨 Tidak Mengirim">Tidak Mengirim</Radio></li> 
    </ul> <br/> 
    <label class="text-sm">Apakah LPKJ {getNamaKabupatenKota} sudah mengirim:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="SLPKJ" class="p-3" value="✔️" >Ya</Radio></li>
      <li class="w-full"><Radio name="SLPKJ" class="p-3" value="➖">Tidak</Radio></li>
    </ul> <br/> 
    <label class="text-sm">Bagaimana Waktu Pengiriman LPKJ {getNamaKabupatenKota}:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="PengirimanLKPJ" class="p-3" value="🟩 Tepat Waktu">Tepat Waktu</Radio></li>
      <li class="w-full"><Radio name="PengirimanLKPJ" class="p-3" value="🟥 Terlambat">Terlambat</Radio></li>
      <li class="w-full"><Radio name="PengirimanLKPJ" class="p-3" value="🟨 Tidak Mengirim">Tidak Mengirim</Radio></li>
     
    </ul> <br/>
    
    <div>
      <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
    </div>     
  </form> 

  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalUpdateDataLPPD = !ModalUpdateDataLPPD} >Batal</Button>
    </svelte:fragment>
</Modal>
 

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Laporan Pengiriman LPPD dan LPKJ Tahun 2024</Heading>
  <br/>

<br/> <br/>

<section>
  {#if data.TableDatasLPPDLPKJ.total === 0}
    <p>No TableDatas yet.</p>
  {:else}
    <p>{data.TableDatasLPPDLPKJ.total} Data ditemukan</p>
  {/if}
  <br/>

  <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Kabupaten / Kota</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPPD</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPKJ</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.TableDatasLPPDLPKJ.documents as cetakTabel, i}	
      <TableBodyRow>
        <TableBodyCell>{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Doc: {cetakTabel.SLPPD} <br/>Pengiriman: {cetakTabel.PengirimanLPPD}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Doc: {cetakTabel.SLPKJ}  <br/>Pengiriman: {cetakTabel.PengirimanLKPJ}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><ButtonGroup class="*:!ring-primary-700">
          <Button style="color:blue;" on:click={() => getDataDocumentLPPD(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
        </ButtonGroup></TableBodyCell>
      </TableBodyRow>
   {/each}

    </TableBody>
  </Table>
 
</section>


</div>