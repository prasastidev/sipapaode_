<script>
    /** @type {{ data: import('./$types').PageData }} */
 
    import { Heading, Fileupload, Toast, Modal, Textarea, Radio, Input, FloatingLabelInput, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { PlusOutline, CheckCircleSolid, EditOutline, TrashBinOutline, DownloadOutline } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
    let ModalAddData = false;
    let toastStatus = false;
    let counter = 8;
   
    import { invalidateAll } from '$app/navigation';
	  import { addTableData, deleteTableData } from '$lib/crudDataRekapKerjasama.js';
    import { storage, databases } from '$lib/appwrite';
    import { ID, Client, Databases, Query } from 'appwrite';
  
  
   export let data; 
    

   const addDatatoTable = async (e) => {
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
		await addTableData(formData.get('kategoriKS'), formData.get('jenisKS'), formData.get('subjekKS'), formData.get('tentangKS'), formData.get('No_kerjasama'), formData.get('namaOPD'), formData.get('namaMitra'), formData.get('tanggalMulai'), formData.get('tanggalSelesai'), formData.get('keteranganKS'));
		invalidateAll();

		// Reset form
		formEl.reset();
    // Notification Toast and Time
    toastStatus = true;
    counter = 8;
    timeout();

	};

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalAddData = false;
  }   

  const remove = async (id) => {
		await deleteTableData(id);
		invalidateAll();
	};

  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_KSPK");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[6];
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
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Rekap Kerjasama</Heading>
  <br/>
  <Button color="blue" class="float-right" on:click={() => (ModalAddData = true)}> <PlusOutline class="inline-flex w-4 h-4 mr-2 text-white-500 dark:text-white-400" /> Add Data</Button> 
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
        <label for="" class="text-sm">Upload Dokumen Kerjasama:</label>
        <Fileupload class="mb-2" name="UploadDokumen" />
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
      <Toast class="max-w-lg" color="blue" transition={slide} bind:toastStatus>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Data berhasil kerjasama berhasil di tambahkan. Form akan tutup dalam {counter}s.
      </Toast>
    </svelte:fragment>
  </Modal>

<br/> <br/>


  <section>
    {#if data.TableDatas.total === 0}
      <p>No TableDatas yet.</p>
    {:else}
      <p>{data.TableDatas.total} Data ditemukan</p>
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
          <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari berdasarkan Nama Mitra Kerjasama ..." required />
      </div>
      <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search</span>
      </button>
  </form>
    
<br/>
    <Table id="TABLE_KSPK" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
      <TableHead>
        <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Jenis</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Subjek</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Tentang</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Nomor Kerjasama</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">OPD</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Mitra</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Tgl Mulai</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Tgl Selesai</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Keterangan</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Document</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each data.TableDatas.documents as cetakTabel, i}	
        <TableBodyRow>
          <TableBodyCell>{i+1}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Jenis}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Subjek}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.No_kerjasama}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Tentang}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.OPD}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Mitra}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.tanggalMulai}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.tanggalSelesai}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">{cetakTabel.keteranganKS}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces"><ButtonGroup class="*:!ring-primary-700"> <Button style="color:green;"><DownloadOutline class="w-4 h-4 me-2" />Download</Button> </ButtonGroup></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces"><ButtonGroup class="*:!ring-primary-700">
            <Button style="color:blue;"><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            <Button style="color:red;" on:click={() => remove(cetakTabel.$id)}><TrashBinOutline class="w-4 h-4 me-2" />Delete</Button>
          </ButtonGroup></TableBodyCell>
        </TableBodyRow>
     {/each}
  
      </TableBody>
    </Table>
   
</section>


</div>











  
 
