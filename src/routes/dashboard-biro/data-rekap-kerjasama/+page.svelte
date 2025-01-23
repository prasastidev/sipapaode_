<script>
    /** @type {import('./$types').PageData} */
 
    import { Heading, Card, Fileupload, Toast, Modal, Textarea, Radio, Input, FloatingLabelInput, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge } from 'flowbite-svelte';
    import { PlusOutline, CheckPlusCircleOutline, ExclamationCircleOutline, CheckCircleSolid, EditOutline, TrashBinOutline, DownloadOutline, FilePdfOutline } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
    import { v4 as uuidv4 } from "uuid";

    let uuid = "";
    let ModalAddData = false;
    let ModalEditData = false;
    let toastStatus = false;
    let counter = 6;

    let ConfirmDeleteModal = false;
   
    import { invalidateAll } from '$app/navigation';
	  import { addTableData, deleteTableData, UpdateTableDataKS } from '$lib/crudDataRekapKerjasama.js';
    import { storage, databases } from '$lib/appwrite';
  
  
   export let data=[]; 

   let getKategoryKS, getJenisKS, getSubjek, getTentang, getNoKS, getnamaOPD, getnamaMitra, getTanggalmulai, getTMTanpaTime;
   let getTanggalselesai, getTSTanpaTime, getKeterangan, getidData;  
  
   const addDatatoTable = async (e) => {
    uuid = uuidv4();   // generate id melalui uuid
		e.preventDefault();
		const formEl = e.target;
        // Masukkan Data ke table melalui crudDataRekap
		const formData = new FormData(formEl);
		await addTableData(formData.get('kategoriKS'), formData.get('jenisKS'), formData.get('subjekKS'), formData.get('tentangKS'), formData.get('No_kerjasama'), formData.get('namaOPD'), formData.get('namaMitra'), formData.get('tanggalMulai'), formData.get('tanggalSelesai'), formData.get('keteranganKS'), uuid);

    // Masukkan file ke Storage Bucket
		  const promise = storage.createFile('674e4b10003a83fb0a30', uuid, document.getElementById('uploadDocKS').files[0]); 
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
    counter = 6;
    timeout();

	};

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalAddData = false;
  }  
  
function DownloadFile(id) {
  const result = storage.getFileView('674e4b10003a83fb0a30', id);
	return result;
}

  const remove = async (id) => {
		await deleteTableData(id);
    // Delete File Storage
		const result = await storage.deleteFile('674e4b10003a83fb0a30', id );
    console.log(result);
    ConfirmDeleteModal = false;
		invalidateAll();
	};


 /** Edit Run 2 function: GetDataDocumentLPPD and update*/

function getDataRekapKerjasama(id) {
const promise = databases.getDocument(
  '673dd7b2001a83873b47', 
  '673dd7dd0032f01dc205',
  id,
  []
);

promise.then(function (response) {
  ModalEditData = true;
  console.log(response); // Success
 getKategoryKS = response.kategoryKS;
 getJenisKS = response.Jenis;
 getSubjek = response.Subjek;
 getTentang = response.Tentang;
 getNoKS = response.No_kerjasama;
 getnamaOPD = response.OPD;
 getnamaMitra = response.Mitra;
 getTanggalmulai = response.tanggalMulai;
 getTMTanpaTime = getTanggalmulai.slice(0, 10);
 getTanggalselesai = response.tanggalSelesai;
 getTSTanpaTime = getTanggalselesai.slice(0, 10);
 getKeterangan = response.keteranganKS;
 getidData = response.$id;

}, function (error) {
  console.log(error); // Failure
  throw error;
});
}

const updateDataKS = async (e) => {
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
		await UpdateTableDataKS(formData.get('kategoriKS'), formData.get('jenisKS'), formData.get('subjekKS'), formData.get('tentangKS'), formData.get('No_kerjasama'), formData.get('namaOPD'), formData.get('namaMitra'), formData.get('tanggalMulai'), formData.get('tanggalSelesai'), formData.get('keteranganKS'), getidData);
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
        td = tr[i].getElementsByTagName("td")[7];
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

  // Pagination 
  let currentPage =1; // Update this to simulate page change.
  let postsPerPage = 3;
  let allPosts = data.TableDatas.documents;
  let totalPosts = allPosts.length;
  let totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;
	const setCurrentPage = newPage => {
		currentPage = newPage;
  }

  let getKeteranganKSColor = (Keterangan) => {
		if (Keterangan == 'Masih Berlaku') return 'blue-50'
		else return 'orange-50'
	}

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Document Kerjasama - Pemerintahan Prov. Sulawesi Tenggara</Heading>
  <br/><br/>
  <div class="grid grid-cols-3 gap-4" style=" background: white;padding: 18px 10px;border-radius: 12px;">
    <div class="col-span-2" style="font-size:22px;margin-left:10px;">Silahkan menambah Data Dokumen Kerjasama pada Tombol di samping berikut</div>
    <div class=""><Button style="box-shadow:rgb(102 144 246 / 40%) 5px 10px" color="blue" class="float-right" on:click={() => (ModalAddData = true)}> <CheckPlusCircleOutline class="inline-flex w-6 h-6 mr-2 text-white-500 dark:text-white-400" /> Tambah Data Kerjasama</Button>  </div>
   </div>
  <Modal title="Form Pengisian Data Kerjasama Baru" bind:open={ModalAddData} autoclose={false}>
    <form class="space-y-6" on:submit={addDatatoTable} >
      <h2 style="font-weight:600;margin-bottom:8px;color:#5850ec;">Silahkan Isi data Kerjasama Baru pada Form di bawah berikut:</h2>
     <label class="text-sm">Kategori Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="kategoriKS" class="p-3" value="Kerjasama Pihak Ketiga / Swasta">Kerjasama Pihak Ketiga / Swasta</Radio></li>
        <li class="w-full"><Radio name="kategoriKS" class="p-3" value="Kerjasama Antar Pemerintah Daerah dan K/L">Kerjasama Antar Pemerintah Daerah dan K/L</Radio></li>
      </ul> <br/> 
      <label class="text-sm">Jenis Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="jenisKS" class="p-3" value="Nota Kesepakatan">Nota Kesepakatan</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" value="Kesepakatan Bersama">Kesepakatan Bersama</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" value="Perjanjian Kerjasama">Perjanjian Kerjasama</Radio></li>   
      </ul> 
      <FloatingLabelInput style="filled" id="subjekKS" name="subjekKS" type="text">
        Subjek:
      </FloatingLabelInput>
      <Textarea id="tentangKS" placeholder="Tentang" rows="2" name="tentangKS" />
      <FloatingLabelInput style="filled" id="No_kerjasama" name="No_kerjasama" type="text">
        Nomor Kerjasama:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaOPD" name="namaOPD" type="text">
        Nama OPD:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaMitra" name="namaMitra" type="text">
        Nama Mitra:
      </FloatingLabelInput>
      <div class="mb-6">
        <label for="tanggalMulai" class="text-sm">Tanggal Mulai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalMulai" placeholder="Tanggal" name="tanggalMulai" required />
      </div>
      <div class="mb-6">
        <label for="tanggalSelesai" class="text-sm">Tanggal Selesai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalSelesai" placeholder="Tanggal" name="tanggalSelesai" required />
      </div> 
      <div class="mb-6">
        <label class="text-sm">Upload Dokumen Kerjasama:</label>
        <Fileupload class="mb-2" name="UploadDokumen" id="uploadDocKS" />
      </div> <br/>
       
      <label class="text-sm">Keterangan:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="keteranganKS" class="p-3" value="Masih Berlaku">Masih Berlaku</Radio></li>
        <li class="w-full"><Radio name="keteranganKS" class="p-3" value="Telah Selesai">Telah Selesai</Radio></li>
      </ul>  
      <div>
        <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tambah Data</button>
      </div>     
    </form>  
    <svelte:fragment slot="footer">
      <Button color="alternative" on:click={()=> ModalAddData = !ModalAddData} >Batal</Button>
      <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Data kerjasama berhasil di tambahkan. Form akan tutup dalam {counter}s.
      </Toast>
    </svelte:fragment>
  </Modal>


  <Modal title="Form Pengeditan Data Kerjasama" bind:open={ModalEditData} autoclose={false}>
    <form class="space-y-6" on:submit={updateDataKS}>
     <label class="text-sm">Kategori Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="kategoriKS" bind:group={getKategoryKS} class="p-3" value="Kerjasama Pihak Ketiga / Swasta">Kerjasama Pihak Ketiga / Swasta</Radio></li>
        <li class="w-full"><Radio name="kategoriKS" bind:group={getKategoryKS} class="p-3" value="Kerjasama Antar Pemerintah Daerah dan K/L">Kerjasama Antar Pemerintah Daerah dan K/L</Radio></li>
      </ul> <br/> 
      <label class="text-sm">Jenis Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="jenisKS" class="p-3" bind:group={getJenisKS} value="Nota Kesepakatan">Nota Kesepakatan</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" bind:group={getJenisKS} value="Kesepakatan Bersama">Kesepakatan Bersama</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" bind:group={getJenisKS} value="Perjanjian Kerjasama">Perjanjian Kerjasama</Radio></li>   
      </ul> 
      <FloatingLabelInput style="filled" id="subjekKS" bind:value={getSubjek} name="subjekKS" type="text">
        Subjek:
      </FloatingLabelInput><br/>
      <label class="text-sm">Tentang:</label>
      <Textarea style="margin-top:3px;" id="tentangKS" placeholder="Tentang" rows="2" bind:value={getTentang} name="tentangKS" />
      <FloatingLabelInput style="filled" id="No_kerjasama" bind:value={getNoKS} name="No_kerjasama" type="text">
        Nomor Kerjasama:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaOPD" bind:value={getnamaOPD} name="namaOPD" type="text">
        Nama OPD:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaMitra" bind:value={getnamaMitra} name="namaMitra" type="text">
        Nama Mitra:
      </FloatingLabelInput>
      <div class="mb-6">
        <label for="tanggalMulai" class="text-sm">Tanggal Mulai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalMulai"  bind:value={getTMTanpaTime} placeholder="Tanggal" name="tanggalMulai" required />
      </div>
      <div class="mb-6"> 
        <label for="tanggalSelesai" class="text-sm">Tanggal Selesai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalSelesai" bind:value={getTSTanpaTime} placeholder="Tanggal" name="tanggalSelesai" required />
      </div>  <br/>
      <label class="text-sm">Keterangan:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="keteranganKS" class="p-3" bind:group={getKeterangan} value="Masih Berlaku">Masih Berlaku</Radio></li>
        <li class="w-full"><Radio name="keteranganKS" class="p-3" bind:group={getKeterangan} value="Telah Selesai">Telah Selesai</Radio></li>
      </ul>  
      <div>
        <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
      </div>     
    </form>  
    <svelte:fragment slot="footer">
      <Button color="alternative" on:click={()=> ModalEditData = !ModalEditData} >Batal</Button>
    </svelte:fragment>
  </Modal>
  <br/>

  <section>
  
    <div class="grid grid-cols-2 gap-4">
      <div><Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><label style="padding: 2px;width: 16px;height: 16px;background-color: #ebf5ff;display: block;float: left;margin-top: 7px;margin-right: 6px;border: 1px solid;"></label> Kerjasama Aktif (Masih Berlaku)</h5>
      <p id="count2" class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2"> <span>{data.TableDatasKSBerlaku.total}</span> </p>
      </Card></div> 
      <div><Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><label style="padding: 2px;width: 16px;height: 16px;background-color: #fff8f1;display: block;float: left;margin-top: 7px;margin-right: 6px;border: 1px solid;"></label> Kerjasama Telah Berakhir (Expire)</h5>
      <p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2"><span>{data.TableDatas.total - data.TableDatasKSBerlaku.total}</span></p>
      </Card></div> 
    </div>
    <br/> 
    {#if data.TableDatas.total === 0}
      <p>No TableDatas yet.</p>
    {:else}
      <p>Saat ini Terdapat {data.TableDatas.total} Data Kerjasama Terdaftar</p>
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
          <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Data berdasarkan Nama Mitra Kerjasama atau OPD ..." required />
      </div>
      <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search</span>
      </button>
  </form>
    
<br/>
    <Table id="TABLE_KSPK" shadow hoverable={false} class="whitespace-break-spaces table-auto overflow-x-auto">
      <TableHead>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">No</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Document</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Jenis</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Kategori</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Subjek</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Tentang</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Nomor Kerjasama</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">OPD & Mitra</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Tanggal</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Keterangan</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4">Tombol Aksi</TableHeadCell>
      </TableHead>
      {#await data.TableDatas.documents}
      loading...
      {:then allPosts}
      <TableBody tableBodyClass="divide-y align-top">
        {#each allPosts as cetakTabel, i}	
        {#if i >= postRangeLow && i < postRangeHigh}
        <TableBodyRow class={`bg-${getKeteranganKSColor(cetakTabel.keteranganKS)}`}>
          <TableBodyCell>{i+1}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2"> 
            <center><ButtonGroup class="*:!ring-primary-700"> 
             <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#89aae4;height: 80px;">
               <FilePdfOutline class="w-11 h-11" /> </Button> </a> </ButtonGroup> <label style="color:#89aae4;margin-top:5px;display: block;">Unduh File</label></center>
          </TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Jenis}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.kategoryKS}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Subjek}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2" style="height: 150px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 7;-webkit-box-orient: vertical;">{cetakTabel.Tentang}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.No_kerjasama}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2"><div style="width:200px;overflow-wrap: anywhere;"><b>OPD:</b> {cetakTabel.OPD}<br/><b>Mitra:</b> {cetakTabel.Mitra}</div></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2"><div style="width:180px;overflow-wrap: anywhere;"><b>Mulai:</b> {cetakTabel.tanggalMulai.slice(0, 10)}<br/><b>Selesai: </b>{cetakTabel.tanggalSelesai.slice(0, 10)}</div></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2"><Badge color={cetakTabel.keteranganKS === "Telah Selesai" ? "red" : "indigo"} border>{cetakTabel.keteranganKS}</Badge></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700">
            <Button style="color:blue;" on:click={() => getDataRekapKerjasama(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            <Button style="color:red;" on:click={() => (ConfirmDeleteModal = true)}><TrashBinOutline class="w-4 h-4 me-2" />Delete</Button>
           </ButtonGroup> 
        </TableBodyCell>
         <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
          <div class="text-center">
            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data rekap Kerjasama serta File Document</h3>
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











  
 
