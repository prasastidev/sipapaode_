<script>
    /** @type {{ data: import('./$types').PageData }} */
    export let data=[];
    import { Heading, Button, Avatar, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, Modal, Radio, FloatingLabelInput, Input, Select, Label, Toast } from 'flowbite-svelte';
    import {  TrashBinOutline, CheckCircleSolid, FileLinesOutline, CheckPlusCircleOutline, EditOutline, BuildingSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { addTableDataPegawai, UpdatePegawai, deleteTableData } from '$lib/dataPegawai.js';
    import { slide } from 'svelte/transition';


    let ModalAddDataPegawai = false;
    let ModalEditData = false;
    let toastStatus = false;
    let counter = 6;

    let getnamaPegawai, getURLPhotoProfile, getNIPPegawai, getGolPegawai, getJabPegawai, getTanggalLahir, getJKPegawai, getPTPegawai, getjenisPegawai, getidData;

    let ConfirmDeleteModal = false;

    let selectPendidikanTerakhir = '';
    let PendidikanTerakhir = [
    { value: 'SLTP', name: 'SLTP' },
    { value: 'SLTA', name: 'SLTA' },
    { value: 'Diploma III (D3)', name: 'Diploma III (D3)' },
    { value: 'Sarjana (S1)', name: 'Sarjana (S1)' },
    { value: 'Pasca Sarjana (S2)', name: 'Pasca Sarjana (S2)' }
  ]; 

  let selectGolongan = '';
    let Golongan = [
    { value: 'Golongan IA', name: 'Golongan IA' },
    { value: 'Golongan IB', name: 'Golongan IB' },
    { value: 'Golongan IC', name: 'Golongan IC' },
    { value: 'Golongan ID', name: 'Golongan ID' },
    { value: 'Golongan IIA', name: 'Golongan IIA' },
    { value: 'Golongan IIB', name: 'Golongan IIB' },
    { value: 'Golongan IIC', name: 'Golongan IIC' },
    { value: 'Golongan IID', name: 'Golongan IID' },
    { value: 'Golongan IIIA', name: 'Golongan IIIA' },
    { value: 'Golongan IIIB', name: 'Golongan IIIB' },
    { value: 'Golongan IIIC', name: 'Golongan IIIC' },
    { value: 'Golongan IIID', name: 'Golongan IIID' },
    { value: 'Golongan IVA', name: 'Golongan IVA' },
    { value: 'Golongan IVB', name: 'Golongan IVB' },
    { value: 'Golongan IVC', name: 'Golongan IVC' },
    { value: 'Golongan IVD', name: 'Golongan IVD' },
    { value: 'Golongan IVE', name: 'Golongan IVE' },
  ]; 

  let selectJabatan = '';
    let Jabatan = [
    { value: 'Kepala Biro', name: 'Kepala Biro' },
    { value: 'Kasubag. Tata Usaha', name: 'Kasubag. Tata Usaha' },
    { value: 'Kabag. Kerjasama', name: 'Kabag. Kerjasama' },
    { value: 'Kabag. Koordinator Pemerintahan', name: 'Kabag. Koordinator Pemerintahan' },
    { value: 'Kabag. Koordinator Otonomi Daerah', name: 'Kabag. Koordinator Otonomi Daerah' },
    { value: 'Staff', name: 'Staff' }
  ]; 


  const addDatatoTable = async (e) => {
	e.preventDefault();
	const formEl = e.target;
       // Masukkan Data ke table melalui dataPegawai
	const formData = new FormData(formEl);
	await addTableDataPegawai(formData.get('namaPegawai'), formData.get('URLPhotoProfile'), formData.get('NIPPegawai'), formData.get('GolPegawai'), formData.get('JabPegawai'), formData.get('tanggalLahir'), formData.get('JKPegawai'), formData.get('PTPegawai'), formData.get('jenisPegawai'));

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
    ModalAddDataPegawai = false;
  } 


/** Edit Run 2 function: getDataPegawai and update*/

function getDataPegawai(id) {
const promise = databases.getDocument(
  '673dd7b2001a83873b47', 
  '6798709400064d912ec1',
  id,
  []
);

promise.then(function (response) {
 ModalEditData = true;
 console.log(response); // Success
 getnamaPegawai = response.Nama;
 getURLPhotoProfile = response.URL_PhotoProfile;
 getNIPPegawai = response.NIP;
 getGolPegawai = response.Golongan;
 getJabPegawai = response.Jabatan;
 getTanggalLahir = response.Tanggal_lahir.slice(0, 10);
 getJKPegawai = response.Jenis_Kelamin;
 getPTPegawai = response.Pendidikan_Terakhir;
 getjenisPegawai = response.Jenis_Pegawai;
 getidData = response.$id;

}, function (error) {
  console.log(error); // Failure
  throw error;
});
}

const updateDataPegawai = async (e) => {
  e.preventDefault();
   const formEl = e.target;
   const formData = new FormData(formEl);
   await UpdatePegawai(formData.get('namaPegawai'), formData.get('URLPhotoProfile'), formData.get('NIPPegawai'), formData.get('GolPegawai'), formData.get('JabPegawai'), formData.get('tanggalLahir'), formData.get('JKPegawai'), formData.get('PTPegawai'), formData.get('jenisPegawai'), getidData);
   invalidateAll();
    // Reset form
    formEl.reset();
  };

  const remove = async (id) => {
	await deleteTableData(id);
      invalidateAll();
      ConfirmDeleteModal = false;
  };

    function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_Pegawai");
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

 // Pagination 
 let currentPage =1; // Update this to simulate page change.
 let postsPerPage = 5;
 let allPosts = data.TableDataPegawai.documents;
 let totalPosts = allPosts.length;
 let totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;
  const setCurrentPage = newPage => {
	currentPage = newPage;
  }

</script>
  
  
<svelte:head>
      <title>Data Pegawai Biro</title>
      <meta name="description" content="Dashboard Biro" />
</svelte:head>
  
<div class="container">
      <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Pegawai Biro Pemerintahan - Sultra</Heading>
      <br/><br/>
      <div class="grid grid-cols-3 gap-4" style=" background: white;padding: 18px 10px;border-radius: 12px;">
        <div class="col-span-2" style="font-size:22px;margin-left:10px;">Silahkan menambah Data Pegawai pada Tombol di samping berikut</div>
        <div class=""><Button style="box-shadow:rgb(102 144 246 / 40%) 5px 10px" color="blue" class="float-right" on:click={() => (ModalAddDataPegawai = true)}> <CheckPlusCircleOutline class="inline-flex w-6 h-6 mr-2 text-white-500 dark:text-white-400" /> Tambah Data Pegawai</Button>  </div>
       </div>
       <Modal title="Form Data Pegawai Baru" bind:open={ModalAddDataPegawai} autoclose={false}>
          <form class="space-y-6" on:submit={addDatatoTable} >
           <h2 style="font-weight:600;margin-bottom:8px;color:#5850ec;">Silahkan mengisi Data Pegawai Baru pada Form di bawah berikut:</h2>
           <FloatingLabelInput style="filled" id="namaPegawai" name="namaPegawai" type="text">
            Nama Pegawai:
          </FloatingLabelInput>
          <div class="grid grid-cols-8 gap-4" style=" background: white;border-radius: 12px;">
            <div style="font-size:54px;margin-right:2px; margin-top:-14px;">🖼️</div>
            <div class="col-span-7"> <FloatingLabelInput style="filled" id="URLPhotoProfile" name="URLPhotoProfile" type="text">
              Enter URL Photo Profile: </FloatingLabelInput>  </div>
           </div>
          <FloatingLabelInput style="filled" id="NIPPegawai" name="NIPPegawai" type="text">
            NIP Pegawai:
          </FloatingLabelInput>
          <Label>Golongan:
          <Select class="mt-2" items={Golongan} name="GolPegawai" bind:value={selectGolongan} />
           </Label>  
           <Label>Jabatan:
           <Select class="mt-2" items={Jabatan} name="JabPegawai" bind:value={selectJabatan} />
           </Label>
          <div class="mb-6">
            <label for="tanggalLahir" class="text-sm">Tanggal Lahir Pegawai:</label>
            <Input style="margin-top:3px;" type="date" id="tanggalLahir" placeholder="Tanggal Lahir" name="tanggalLahir" />
          </div><br/>
          <label class="text-sm">Jenis Kelamin:</label>
            <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
            <li class="w-full"><Radio name="JKPegawai" class="p-3" value="Pria">Pria</Radio></li>
            <li class="w-full"><Radio name="JKPegawai" class="p-3" value="Wanita">Wanita</Radio></li>
            </ul> 
           <Label>
            Pendidikan Terakhir Pegawai:
            <Select class="mt-2" items={PendidikanTerakhir} name="PTPegawai" bind:value={selectPendidikanTerakhir} />
            </Label><br/>   
            <label class="text-sm">Status Pegawai:</label>
              <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
               <li class="w-full"><Radio name="jenisPegawai" class="p-3" value="Pegawai">Pegawai</Radio></li>
               <li class="w-full"><Radio name="jenisPegawai" class="p-3" value="Honorer">Honorer</Radio></li>
              </ul> 
              <div>
                <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tambah Data Pegawai</button>
              </div>     
            </form>  
            <svelte:fragment slot="footer">
              <Button color="alternative" on:click={()=> ModalAddDataPegawai = !ModalAddDataPegawai} >Batal</Button>
              <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
                  <CheckCircleSolid slot="icon" class="w-5 h-5" />
                  Data Pegawai berhasil ditambah. Form akan tutup dalam {counter}s.
                </Toast>
            </svelte:fragment>
          </Modal>
          
      <Modal title="Form Pengeditan Data Kerjasama" bind:open={ModalEditData} autoclose={false}>
        <form class="space-y-6" on:submit={updateDataPegawai}>
         <FloatingLabelInput style="filled" id="namaPegawai" bind:value={getnamaPegawai} name="namaPegawai" type="text">
         Nama Pegawai:
         </FloatingLabelInput>
         <div class="grid grid-cols-8 gap-4" style=" background: white;border-radius: 12px;">
          <div style="font-size:54px;margin-right:2px; margin-top:-14px;">🖼️</div>
          <div class="col-span-7"> <FloatingLabelInput style="filled" id="URLPhotoProfile" bind:value={getURLPhotoProfile} name="URLPhotoProfile" type="text">
            Enter URL Photo Profile: </FloatingLabelInput>  </div>
          </div>
         <FloatingLabelInput style="filled" id="NIPPegawai" bind:value={getNIPPegawai} name="NIPPegawai" type="text">
         NIP Pegawai:
         </FloatingLabelInput>
         <Label>Golongan:
         <Select class="mt-2" items={Golongan} name="GolPegawai" bind:value={getGolPegawai} />
         </Label>  
          <Label>Jabatan:
          <Select class="mt-2" items={Jabatan} name="JabPegawai" bind:value={getJabPegawai} />
          </Label>
          <div class="mb-6">
          <label for="tanggalLahir" class="text-sm">Tanggal Lahir Pegawai:</label>
         <Input style="margin-top:3px;" type="date" id="tanggalLahir" bind:value={getTanggalLahir} placeholder="Tanggal Lahir" name="tanggalLahir" />
          </div><br/>
         <label class="text-sm">Jenis Kelamin:</label>
         <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
          <li class="w-full"><Radio name="JKPegawai" bind:group={getJKPegawai} class="p-3" value="Pria">Pria</Radio></li>
          <li class="w-full"><Radio name="JKPegawai" bind:group={getJKPegawai} class="p-3" value="Wanita">Wanita</Radio></li>
          </ul> 
          <Label>
          Pendidikan Terakhir Pegawai:
          <Select class="mt-2" items={PendidikanTerakhir} name="PTPegawai" bind:value={getPTPegawai} />
          </Label><br/>   
          <label class="text-sm">Status Pegawai:</label>
          <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
          <li class="w-full"><Radio name="jenisPegawai" bind:group={getjenisPegawai} class="p-3" value="Pegawai">Pegawai</Radio></li>
          <li class="w-full"><Radio name="jenisPegawai" bind:group={getjenisPegawai} class="p-3" value="Honorer">Honorer</Radio></li>
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

      <br/>
  {#if data.TableDataPegawai.total === 0}
   <p>Saat ini Tidak Terdapat Data Pegawai Pada Tabel</p>
   {:else}
   <p>Terdapat {data.TableDataPegawai.total} Data Pegawai Pada Tabel</p>
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
    

  <section>
     <br/>
      <Table id="TABLE_Pegawai" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
      <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">Nama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">Golongan</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">Tanggal Lahir</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">Jenis Kelamin</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">Pendidikan Terakhir</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">Jenis Pegawai</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
       </TableHead>
       {#await data.TableDataPegawai.documents}
       loading...
      {:then allPosts}
        <TableBody tableBodyClass="divide-y">
           {#each allPosts as cetakTabel, i}	
           {#if i >= postRangeLow && i < postRangeHigh}
           <TableBodyRow>
           <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">{i+1}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start"><div style="width:160px;"><Avatar src={cetakTabel.URL_PhotoProfile || undefined } class="align-middle" border rounded size="lg" /> <br/>{cetakTabel.Nama} <br/><b>NIP:</b> {cetakTabel.NIP}</div> </TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start"><div style="width:180px;"><b>Golongan:</b><br/>{cetakTabel.Golongan}<br/><br/><b>Jabatan:</b><br/>{cetakTabel.Jabatan}</div></TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">{cetakTabel.Tanggal_lahir.slice(0, 10)}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">{cetakTabel.Jenis_Kelamin}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">{cetakTabel.Pendidikan_Terakhir}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">{cetakTabel.Jenis_Pegawai} </TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">
              <ButtonGroup class="*:!ring-primary-700">
                <Button style="color:blue;" on:click={() => getDataPegawai(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
                 <Button style="color:red;" on:click={() => (ConfirmDeleteModal = true)}><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                  </ButtonGroup>
               </TableBodyCell>  
               <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
                  <div class="text-center">
                    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data Pegawai ini</h3>
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

</style>
     
  
     

  
     
  
  
  