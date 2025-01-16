<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Table, TableBody, Radio , Alert, Button, Badge, Indicator, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Toast, Modal, Fileupload, Textarea, FloatingLabelInput, Checkbox, Select, Label, Card, Tooltip } from 'flowbite-svelte';
    import { ClockOutline, CheckCircleSolid, FileLinesOutline, BookSolid, ArchiveArrowDownSolid } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
	  import { addTableDokLPPDLKPJ } from '$lib/DokumenLPPDLKPJ.js';
    import { v4 as uuidv4 } from "uuid";

let uuid = "";
let ModalKirimLPPD = false;
let ButtonKirimLPPD = false;
let JenisLaporan, TahunTerbit;
let toastStatus = false;
let counter = 7;

const addDataFormtoTable = async (e) => {
    uuid = uuidv4();   // generate id melalui uuid
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
    // Masukkan Data ke table melalui crudDataRekap
		await addTableDokLPPDLKPJ(formData.get('KabKota'), formData.get('JenisDoc'), formData.get('Tahun'), formData.get('namaPengirim'), formData.get('ContactPerson'), formData.get('NIPPengirim'), formData.get('InstansiPengirim'), uuid);

    // Masukkan file ke Storage Bucket
		  const promise = storage.createFile('675e48c4001bd540c846', uuid, document.getElementById('uploadDoc').files[0]); 
	    promise.then(function (response) {
       console.log(response); 
         }, function (error) {
          console.log(error); // Failure
           throw error;
          });

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
    ModalKirimLPPD = false;
  }  
   
    let selectKabKota = '';
    let KabKotaName = [
    { value: 'Kota Kendari', name: 'Kota Kendari' },
    { value: 'Kota Baubau', name: 'Kota Baubau' },
    { value: 'Kabupaten Wakatobi', name: 'Kabupaten Wakatobi' },
    { value: 'Kabupaten Muna Barat', name: 'Kabupaten MunaBarat' },
    { value: 'Kabupaten Muna', name: 'Kabupaten Muna' },
    { value: 'Kabupaten Konawe Utara', name: 'Kabupaten Konawe Utara' },
    { value: 'Kabupaten Konawe Selatan', name: 'Kabupaten Konawe Selatan' },
    { value: 'Kabupaten Konawe Kepulauan', name: 'Kabupaten Konawe Kepulauan' },
    { value: 'Kabupaten Konawe', name: 'Kabupaten Konawe' },
    { value: 'Kabupaten Kolaka Utara', name: 'Kabupaten Kolaka Utara' },
    { value: 'Kabupaten Kolaka Timur', name: 'Kabupaten Kolaka Timur' },
    { value: 'Kabupaten Kolaka', name: 'Kabupaten Kolaka' },
    { value: 'Kabupaten Buton Utara', name: 'Kabupaten Buton Utara' },
    { value: 'Kabupaten Buton Tengah', name: 'Kabupaten Buton Tengah' },
    { value: 'Kabupaten Buton Selatan', name: 'Kabupaten Buton Selatan' },
    { value: 'Kabupaten Buton', name: 'Kabupaten Buton' },
    { value: 'Kabupaten Bombana', name: 'Kabupaten Bombana' }
  ]; 

    let TahunBerjalan = 'second';
    let OnlineLppdLkpj  = data.TableDatasLayananOnline.documents[1];

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
	<title>Laporan Penyampaian LPPD</title>
	<meta name="description" content="Sipapaode | Laporan Penyampaian LPPD" />
</svelte:head>

<br/><br/>
<Modal title="Formulir Pengiriman Dokumen LPPD dan LKPJ Kabupaten / Kota" bind:open={ModalKirimLPPD}  autoclose={false}>
  <form class="space-y-6" on:submit={addDataFormtoTable}>
    <Label>
      Pilih Nama Kabupaten / Kota
      <Select class="mt-2" items={KabKotaName} name="KabKota" bind:value={selectKabKota} required />
    </Label>
    <br/>
    <label class="text-sm">Pilih Jenis Dokumen yang akan di Upload:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="JenisDoc" class="p-3" value="Laporan LPPD" bind:group={JenisLaporan} checked>Laporan LPPD</Radio></li>
      <li class="w-full"><Radio name="JenisDoc" class="p-3" value="Laporan LKPJ" bind:group={JenisLaporan}>Laporan LKPJ</Radio></li>
    </ul> <br/>
    <label class="text-sm">Tahun:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="Tahun" class="p-3" value="2024" bind:group={TahunTerbit} checked>2024</Radio></li>
      <li class="w-full"><Radio name="Tahun" class="p-3" value="2025" bind:group={TahunTerbit} disabled>2025</Radio></li>
      <li class="w-full"><Radio name="Tahun" class="p-3" value="2025" bind:group={TahunTerbit} disabled>2026</Radio></li>
    </ul> 
    <FloatingLabelInput style="filled" id="nama" name="namaPengirim" type="text" required>
      *Nama Pengirim:
    </FloatingLabelInput> 
    <FloatingLabelInput style="filled" id="ContactPerson" name="ContactPerson" type="text" required>
      Contact Person:
    </FloatingLabelInput> 
    <FloatingLabelInput style="filled" id="Instansi" name="NIPPengirim" type="text" required>
      *NIP Pengirim:
    </FloatingLabelInput> 
    <FloatingLabelInput style="filled" id="Instansi" name="InstansiPengirim" type="text" required>
      *Instansi Pengirim:
    </FloatingLabelInput> 
    <div class="mb-6">
      <label for="" class="text-sm">*Upload {JenisLaporan}:</label>
      <Fileupload class="mb-2" name="UploadDokumen" id="uploadDoc" required />
    </div>
    <Checkbox bind:checked={ButtonKirimLPPD} class="inline-block">Dengan ini menyatakan telah mengirim <b>{JenisLaporan} {selectKabKota} Tahun {TahunTerbit}</b>, sesuai dengan informasi dan Data-data yang diisi pada Formulir diatas. Dan bersedia untuk dikonfirmasi Kembali jika terdapat data Dokumen {JenisLaporan} yang tidak lengkap.</Checkbox>
    <br/>
    <div>
      <Button disabled={!ButtonKirimLPPD} type="submit" value="submit" class="flex w-full h-10 justify-center mb-4 rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Kirim {JenisLaporan}</Button>
    </div>  
  </form>  
  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalKirimLPPD = !ModalKirimLPPD} >Batal</Button>
    <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
      <CheckCircleSolid slot="icon" class="w-5 h-5" />
      Data Dokumen Anda telah berhasil terkirim. Form akan tutup dalam {counter}s.
    </Toast> 
  </svelte:fragment>
</Modal>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Laporan Penyampaian LPPD & LKPJ</Heading>
<br/><br/>
{#if OnlineLppdLkpj.Status_raw }
<Alert color="blue" border>
  <div class="flex items-center gap-3">
    <BookSolid class="w-6 h-6" />
    <span class="text-xl font-bold">Formulir (Online) Pengiriman Pengiriman LPPD & LKPJ <Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Via Online</Badge></span>
  </div>
  <p class="mt-2 mb-4 text-base">
    Dibawah berikut adalah Formulir Penyampain LPPD dan LKPJ Tahun berjalan.
    Pengiriman Dokumen LPPD dan LKPJ tahun 2024 dimulai tanggal 01 Januari 2025 sampai dengan tanggal 31 Maret 2025. 
    Dokumen LPPD dan LKPJ yang telah dikirim akan di update pada tabel di bawah halaman ini.
  </p>
  <div class="flex gap-2">
    <Button size="sm" on:click={() => (ModalKirimLPPD = true)} color="blue" class="mr-4"><ArchiveArrowDownSolid class="w-5 h-5 me-2" />Kirim LPPD dan LKPJ</Button>
  </div>
</Alert>
<br/><br/>
{/if}
<div class="flex gap-3">Pilih Tahun Berjalan: &nbsp;
    <Radio bind:group={TahunBerjalan} value="second">2024</Radio>
  </div>
 <br/>


<section>
  {#if data.TableDatasLPPDLPKJ.total === 0}
    <p>No TableDatas yet.</p>
  {:else}
    <p>{data.TableDatasLPPDLPKJ.total} Data ditemukan</p>
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
        <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Nama Kabupaten / Kota ..." required />
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
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.TableDatasLPPDLPKJ.documents as cetakTabel, i}	
      <TableBodyRow>
        <TableBodyCell>{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><FileLinesOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Document: {cetakTabel.SLPPD} <br/><ClockOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Pengiriman: {cetakTabel.PengirimanLPPD}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><FileLinesOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Document: {cetakTabel.SLPKJ}  <br/><ClockOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Pengiriman: {cetakTabel.PengirimanLKPJ}</TableBodyCell>
      </TableBodyRow>
   {/each}

    </TableBody>
  </Table>
 
<br/>
<Alert color="yellow">
  <span class="font-medium"> Catatan!</span>
  Data diatas akan terupdate setelah Kabupaten / Kota melakukan pengiriman Dokumen LPPD dan LKPJ pada form yang telah disediakan. <br/>
  Data diverifikasi oleh Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara, Bidang Koordinator Otonomi Daerah. Sub LPPD & LKPJ
</Alert>

</section>
<br/><br/><br/>
</div>