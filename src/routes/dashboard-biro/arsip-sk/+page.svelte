<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
  
    import { Heading, Select, Label, Tabs, TabItem, Modal, Toast, Input, Button, Textarea, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, FloatingLabelInput, Fileupload, Radio } from 'flowbite-svelte';
    import {  PaperClipOutline, FolderPlusOutline, CheckPlusCircleOutline, TrashBinOutline, CheckCircleSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
	 import { addTableArsipSK, deleteTableData } from '$lib/DokumenArsipSK.js';
    import { slide } from 'svelte/transition';
    import { v4 as uuidv4 } from "uuid";

    let uuid = "";
    let toastStatus = false;
    let counter = 7;

    let ModalArsipSK = false;

    let ConfirmDeleteModalSKGubWakil = false;
    let selectedIdSKGubWakil = null;

    let ConfirmDeleteModalSKBupatiWakil = false;
    let selectedIdSKBupatiWakil = null;

    let ConfirmDeleteModalSKDPRD = false;
    let selectedIdSKDPRD = null;

    let selectPenerbitSK = '';
    let PenerbitSK = [
    { value: 'Presiden RI', name: 'Presiden RI' },
    { value: 'Menteri Dalam Negeri RI', name: 'Menteri Dalam Negeri RI' }
  ];

  const addDataFormtoTable = async (e) => {
    uuid = uuidv4();   // generate id melalui uuid
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
    // Masukkan Data ke table melalui crudDataRekap
		await addTableArsipSK(formData.get('Penerbit'), formData.get('nomorSK'), formData.get('tanggalSK'), formData.get('tentang'), formData.get('RingkasanIsi'), formData.get('KategoriSK'), uuid);

    // Masukkan file ke Storage Bucket
		const promise = storage.createFile('675ee4440003f229a11d', uuid, document.getElementById('uploadDocSK').files[0]); 
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
    ModalArsipSK = false;
  }  

  function DownloadFile(id) {
  const result = storage.getFileDownload('675ee4440003f229a11d', id);
	return result;
}

 function openDeleteModalSKGubWakil(id) {
    selectedIdSKGubWakil = id;
    ConfirmDeleteModalSKGubWakil = true;
  }

  function openDeleteModalSKBupatiWakil(id) {
    selectedIdSKBupatiWakil = id;
    ConfirmDeleteModalSKBupatiWakil = true;
  }

  function openDeleteModalSKDPRD(id) {
    selectedIdSKDPRD = id;
    ConfirmDeleteModalSKDPRD = true;
  }

  const remove = async (id) => {
		await deleteTableData(id);
    // Delete File Storage
		const result = await storage.deleteFile('675ee4440003f229a11d', id );
    console.log(result);
		invalidateAll();
	};

    function SearchTableSKGubWakil() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_SKGubWakil");
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

    function SearchTableSKBupatiWakil() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_SKBupatiWakil");
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

    function SearchTableSKDPRD() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_SKDPRD");
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
      <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data File Dokumen SK Pemerintahan</Heading>
      <br/><br/>
      <div class="grid grid-cols-3 gap-4" style=" background: white;padding: 18px 10px;border-radius: 12px;">
        <div class="col-span-2" style="font-size:22px;margin-left:10px;">Silahkan menambahkan File Dokumen SK pada Tombol di samping berikut</div>
        <div class=""><Button style="box-shadow:rgb(102 144 246 / 40%) 5px 10px;" color="blue" class="float-right" on:click={() => (ModalArsipSK = true)}> <CheckPlusCircleOutline class="inline-flex w-6 h-6 mr-2 text-white-500 dark:text-white-400" /> Tambah Data Arsip SK</Button> </div>
       </div>
      <br/>
      <Modal title="Form Pengisian Data Arsip SK" bind:open={ModalArsipSK}  autoclose={false}>
        <form class="space-y-6" on:submit={addDataFormtoTable}>
          <Label>
            Penerbit SK:
            <Select class="mt-2" items={PenerbitSK} name="Penerbit" bind:value={selectPenerbitSK} required/>
          </Label> 
          <FloatingLabelInput style="filled" id="nomorSK" name="nomorSK" type="text" required>
            Nomor SK:
          </FloatingLabelInput>
          <div class="mb-6">
            <label for="tanggalSK" class="text-sm">Tanggal SK:</label>
            <Input style="margin-top:3px;" type="date" id="tanggalSK" placeholder="Tanggal" name="tanggalSK" required />
          </div>
          <Textarea id="tentang" placeholder="Tentang" rows="2" name="tentang" required />
          <Textarea id="RingkasanIsi" placeholder="Ringkasan Isi SK" rows="3" name="RingkasanIsi" />
          <div class="mb-6">
            <label class="text-sm">Upload Dokumen SK:</label>
            <Fileupload class="mb-2" name="UploadDokumen" id="uploadDocSK" required />
          </div> <br/>
          <label class="text-sm">Kategori SK</label>
          <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
            <li class="w-full"><Radio name="KategoriSK" class="p-3" value="Gubernur dan Wakil">Gubernur dan Wakil</Radio></li>
            <li class="w-full"><Radio name="KategoriSK" class="p-3" value="Bupati dan Wakil">Bupati / Walikota dan Wakil</Radio></li>
            <li class="w-full"><Radio name="KategoriSK" class="p-3" value="DPRD">DPRD</Radio></li>
          </ul>  
          <div>
            <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tambah Data Arsip SK</button>
          </div>     
        </form>  
        <svelte:fragment slot="footer">
          <Button color="alternative" on:click={()=> ModalArsipSK = !ModalArsipSK} >Batal</Button>
          <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
            <CheckCircleSolid slot="icon" class="w-5 h-5" />
            Data Dokumen Arsip SK telah berhasil ditambahkan. Form akan tutup dalam {counter}s.
          </Toast> 
        </svelte:fragment>
      </Modal>
      <br/>
      <Tabs tabStyle="pill">
        <TabItem open>
          <span slot="title" class="flex items-center"><FolderPlusOutline class="w-6 h-6 mr-1 text-white-800" /> Gubernur dan Wakil</span>
          <section>
              {#if data.TableDataSK_GubWakil.total === 0}
              <p>Saat ini Tidak ada Data Dokumen SK pada Tab Gubernur & Wakil Gubernur</p>
              {:else}
              <p>Terdapat {data.TableDataSK_GubWakil.total} Dokumen SK pada Tab Gubernur & Wakil Gubernur</p>
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
                    <input on:keyup={SearchTableSKGubWakil} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari SK berdasarkan Ringkasan Isi SK ..." required />
                </div>
                <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </form><br/>
                <Table id="TABLE_SKGubWakil" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
                    <TableHead>
                        <TableHeadCell style="font-size: larger;" class="py-4 content-start">No</TableHeadCell>
                        <TableHeadCell style="font-size: larger;" class="py-4 content-start">Dokumen SK</TableHeadCell>
                        <TableHeadCell style="font-size: larger;" class="py-4 content-start">Penerbit</TableHeadCell>
                        <TableHeadCell style="font-size: larger;" class="py-4 content-start">Ringkasan Isi SK</TableHeadCell>
                        <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
                      </TableHead>
                  <TableBody tableBodyClass="divide-y">
                    {#each data.TableDataSK_GubWakil.documents as cetakTabel, i}	
                    <TableBodyRow>
                      <TableBodyCell class="content-start">{i+1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#89aae4;height: 80px;"><PaperClipOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh SK</label>  
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Penerbit:</b> {cetakTabel.Penerbit} <br/><b>No. SK:</b> {cetakTabel.Nomor_SK} <br/><b>Tanggal SK:</b> {cetakTabel.TanggalSK.slice(0, 10)}<br/>
                        <br/><b>Tentang:</b><br/>{cetakTabel.Tentang}
                      </div>             
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Ringkasan Isi SK:</b><br/>{cetakTabel.Ringkasan_Isi}
                      </div>             
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><ButtonGroup class="*:!ring-primary-700">
                          <Button style="color:red;" on:click={() => openDeleteModalSKGubWakil(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                        </ButtonGroup></TableBodyCell>
                        <Modal bind:open={ConfirmDeleteModalSKGubWakil} size="xs" autoclose={false}>
                          <div class="text-center">
                            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data SK dan File Document yang Anda Pilih</h3>
                            <Button color="red" class="me-2" on:click={() => remove(selectedIdSKGubWakil)}>Ya, Hapus Sekarang</Button>
                            <Button color="alternative" on:click={()=> ConfirmDeleteModalSKGubWakil = !ConfirmDeleteModalSKGubWakil}>Tidak, Batal</Button>
                          </div>
                        </Modal>
                    </TableBodyRow>
                 {/each}
              
                  </TableBody>    
                </Table>
            </section>

        </TabItem>
        <TabItem>
          <span slot="title" class="flex items-center"><FolderPlusOutline class="w-6 h-6 mr-1 text-white-800" /> Bupati / WaliKota dan Wakil</span>
          <section>
            {#if data.TableDataSK_BupatiWakil.total === 0}
            <p>Saat ini Tidak ada Data Dokumen SK pada Tab Bupati & Wakil Bupati</p>
            {:else}
            <p>Terdapat {data.TableDataSK_BupatiWakil.total} Dokumen SK pada Tab Bupati & Wakil Bupati</p>
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
                  <input on:keyup={SearchTableSKBupatiWakil} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari SK berdasarkan Ringkasan Isi SK ..." required />
              </div>
              <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span class="sr-only">Search</span>
              </button>
          </form><br/>
              <Table id="TABLE_SKBupatiWakil" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
                <TableHead>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">No</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Dokumen SK</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Penerbit</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Ringkasan Isi SK</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
                </TableHead>
                <TableBody tableBodyClass="divide-y">
                  {#each data.TableDataSK_BupatiWakil.documents as cetakTabel, i}	
                  <TableBodyRow>
                    <TableBodyCell class="content-start">{i+1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#89aae4;height: 80px;"><PaperClipOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh SK</label>  
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Penerbit:</b> {cetakTabel.Penerbit} <br/><b>No. SK:</b> {cetakTabel.Nomor_SK} <br/><b>Tanggal SK:</b> {cetakTabel.TanggalSK.slice(0, 10)}<br/>
                        <br/><b>Tentang:</b><br/>{cetakTabel.Tentang}
                      </div>             
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Ringkasan Isi SK:</b><br/>{cetakTabel.Ringkasan_Isi}
                      </div>             
                      </TableBodyCell>
                    <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700">
                        <Button style="color:red;" on:click={() => openDeleteModalSKBupatiWakil(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                      </ButtonGroup></TableBodyCell>
                      <Modal bind:open={ConfirmDeleteModalSKBupatiWakil} size="xs" autoclose={false}>
                        <div class="text-center">
                          <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data SK dan File Document yang Anda Pilih</h3>
                          <Button color="red" class="me-2" on:click={() => remove(selectedIdSKBupatiWakil)}>Ya, Hapus Sekarang</Button>
                          <Button color="alternative" on:click={()=> ConfirmDeleteModalSKBupatiWakil = !ConfirmDeleteModalSKBupatiWakil}>Tidak, Batal</Button>
                        </div>
                      </Modal>
                  </TableBodyRow>
               {/each}
            
                </TableBody>    
              </Table>
          </section>
        </TabItem>
        <TabItem>
          <span slot="title" class="flex items-center"><FolderPlusOutline class="w-6 h-6 mr-1 text-white-800" /> DPRD </span>
          <section>
            {#if data.TableDataSK_DPRD.total === 0}
            <p>Saat ini Tidak ada Data Dokumen SK pada Tab DPRD</p>
            {:else}
            <p>Terdapat {data.TableDataSK_DPRD.total} Dokumen SK pada Tab DPRD</p>
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
                  <input on:keyup={SearchTableSKDPRD} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari SK berdasarkan Ringkasan Isi SK ..." required />
              </div>
              <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span class="sr-only">Search</span>
              </button>
          </form><br/>
              <Table id="TABLE_SKDPRD" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
                  <TableHead>
                    <TableHeadCell style="font-size: larger;" class="py-4 content-start">No</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4 content-start">Dokumen SK</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4 content-start">Penerbit</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4 content-start">Ringkasan Isi SK</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
                    </TableHead>
                <TableBody tableBodyClass="divide-y">
                  {#each data.TableDataSK_DPRD.documents as cetakTabel, i}	
                  <TableBodyRow>
                    <TableBodyCell class="content-start">{i+1}</TableBodyCell>
                    <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                        <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#89aae4;height: 80px;"><PaperClipOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh SK</label>  
                    </TableBodyCell>
                    <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Penerbit:</b> {cetakTabel.Penerbit} <br/><b>No. SK:</b> {cetakTabel.Nomor_SK} <br/><b>Tanggal SK:</b> {cetakTabel.TanggalSK.slice(0, 10)}<br/>
                      <br/><b>Tentang:</b><br/>{cetakTabel.Tentang}
                    </div>             
                    </TableBodyCell>
                    <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Ringkasan Isi SK:</b><br/>{cetakTabel.Ringkasan_Isi}
                    </div>             
                    </TableBodyCell>
                    <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700">
                        <Button style="color:red;" on:click={() => openDeleteModalSKDPRD(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                      </ButtonGroup></TableBodyCell>
                      <Modal bind:open={ConfirmDeleteModalSKDPRD} size="xs" autoclose={false}>
                        <div class="text-center">
                          <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data SK dan File Document yang Anda Pilih</h3>
                          <Button color="red" class="me-2" on:click={() => remove(selectedIdSKDPRD)}>Ya, Hapus Sekarang</Button>
                          <Button color="alternative" on:click={()=> ConfirmDeleteModalSKDPRD = !ConfirmDeleteModalSKDPRD}>Tidak, Batal</Button>
                        </div>
                      </Modal>
                  </TableBodyRow>
               {/each}
            
                </TableBody>    
              </Table>
          </section>
        </TabItem>
       </Tabs>

      <br/><br/>
  </div>