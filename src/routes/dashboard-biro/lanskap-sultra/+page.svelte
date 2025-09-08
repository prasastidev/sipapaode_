<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Modal, Button, Alert, Radio, ButtonGroup, FloatingLabelInput, Textarea, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Toast } from 'flowbite-svelte';
    import { EditOutline, GlobeOutline, CheckCircleSolid  } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
    import { user } from '$lib/user';

  import { invalidateAll } from '$app/navigation';
  import { databases } from '$lib/appwrite';
	import { UpdateTableDataWilayah } from '$lib/DataWilayah.js';


  let  getJ_Kecamatan, getKodeW, getKabKota, getJ_Kelurahan, getJ_Desa, getLuas_Wilayah, getJ_Penduduk, getJ_Gunung, getJ_Pulau, getJ_Selat, getJ_Danau, getJ_Sungai, getJ_Rawa, getKoordinat, getKetMap, getSitus, getidDoc;
  let ModalUpdateDataWilayah = false;

  let toastStatus = false;
  let counter = 6;

  /** Edit Run 2 function */

function getDataWilayah(id) {

   const promise = databases.getDocument(
       '673dd7b2001a83873b47', 
       '675788570020efff440b',
       id,
       []
     );

   promise.then(function (response) {
   ModalUpdateDataWilayah  = true;
   console.log(response); // Success
   getKabKota = response.Nama;
   getKodeW = response.KodeW;
   getJ_Kecamatan = response.J_Kecamatan;
   getJ_Kelurahan = response.J_Kelurahan;
   getJ_Desa = response.J_Desa;
   getLuas_Wilayah = response.Luas_Wilayah;
   getJ_Penduduk= response.J_Penduduk;
   getJ_Gunung= response.J_Gunung;
   getJ_Pulau= response.J_Pulau;
   getJ_Selat= response.J_Selat;
   getJ_Danau= response.J_Danau;
   getJ_Sungai= response.J_Sungai;
   getJ_Rawa= response.J_Rawa;
   getKoordinat= response.Koordinat;
   getKetMap= response.KetMap;
   getSitus= response.Situs;
   getidDoc = response.$id;

   }, function (error) {
  console.log(error); // Failure
  throw error;
    });
  }

const updateDataWilayah = async (e) => {
  e.preventDefault();
  const formEl = e.target;
  const formData = new FormData(formEl);
  await UpdateTableDataWilayah(formData.get('J_Kecamatan'), formData.get('J_Kelurahan'), formData.get('J_Desa'), formData.get('Luas_Wilayah'), formData.get('J_Penduduk'), formData.get('J_Gunung'), formData.get('J_Pulau'), formData.get('J_Selat'), formData.get('J_Danau'), formData.get('J_Sungai'), formData.get('J_Rawa'), formData.get('Koordinat'), formData.get('KetMap'), formData.get('Situs'), getidDoc);
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
    ModalUpdateDataWilayah = false;
  } 

  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TableDataWilayah");
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

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<Modal size="lg" title="Update Data Wilayah {getKabKota}" bind:open={ModalUpdateDataWilayah } autoclose={false}>
  <form class="space-y-6" on:submit={updateDataWilayah} >
    Nama Kab/Kota : {getKabKota} <br/>
    Kode Wilayah: { getKodeW } <br/>
    <h4 style="font-weight:600;">&#10149; Administrasi Wilayah Pemerintahan</h4> 
   <FloatingLabelInput style="filled" id="J_Kecamatan" bind:value={getJ_Kecamatan} name="J_Kecamatan" type="text">
    Masukan Data Jumlah Kecamatan Terbaru {getKabKota}:
  </FloatingLabelInput> 
  <FloatingLabelInput style="filled" id="J_Kelurahan" bind:value={getJ_Kelurahan} name="J_Kelurahan" type="text">
    Masukan Data Jumlah Kelurahan Terbaru {getKabKota}:
  </FloatingLabelInput> 
  <FloatingLabelInput style="filled" id="J_Desa" bind:value={getJ_Desa} name="J_Desa" type="text">
    Masukan Data Jumlah Desa Terbaru:
  </FloatingLabelInput> 
  <FloatingLabelInput style="filled" id="Luas_Wilayah" bind:value={getLuas_Wilayah} name="Luas_Wilayah" type="text">
    Masukan Luas Wilayah Terbaru {getKabKota}:
  </FloatingLabelInput> 
  <label style="font-size:14px;color:red;">Contoh: 12345.67 (gunakan titik untuk desimal, bukan koma)</label>
  <FloatingLabelInput style="filled" id="J_Penduduk" bind:value={getJ_Penduduk} name="J_Penduduk" type="text">
    Masukan Jumlah Penduduk Terbaru {getKabKota}:
  </FloatingLabelInput> 
    <label style="font-size:14px;color:red;">Ketik angka saja, tanpa titik atau koma. Contoh: 1500000.</label>
  <br/><h4 style="font-weight:600;">&#10149; Rupa Bumi</h4>
  <FloatingLabelInput style="filled" id="	J_Gunung" bind:value={getJ_Gunung} name="J_Gunung" type="text">
    Masukan Jumlah Gunung {getKabKota}:
  </FloatingLabelInput> 
  <FloatingLabelInput style="filled" id="J_Pulau" bind:value={getJ_Pulau} name="J_Pulau" type="text">
    Masukan Jumlah Pulau {getKabKota}:
  </FloatingLabelInput>
  <FloatingLabelInput style="filled" id="J_Selat" bind:value={getJ_Selat} name="J_Selat" type="text">
    Masukan Jumlah Selat {getKabKota}:
  </FloatingLabelInput>
  <FloatingLabelInput style="filled" id="J_Danau" bind:value={getJ_Danau} name="J_Danau" type="text">
    Masukan Jumlah Danau {getKabKota}:
  </FloatingLabelInput>
  <FloatingLabelInput style="filled" id="J_Sungai" bind:value={getJ_Sungai} name="J_Sungai" type="text">
    Masukan Jumlah Sungai {getKabKota}:
  </FloatingLabelInput>
  <FloatingLabelInput style="filled" id="J_Rawa" bind:value={getJ_Rawa} name="J_Rawa" type="text">
    Masukan Jumlah Rawa {getKabKota}:
  </FloatingLabelInput> <br/>
  <h4 style="font-weight:600;">&#10149; Map (Peta) dan Koordinat</h4>
  <FloatingLabelInput style="filled" id="Koordinat" bind:value={getKoordinat} name="Koordinat" type="text">
    Masukan Titik Koordinat {getKabKota}:
  </FloatingLabelInput><br/>
  <label class="text-xs">Masukan Keterangan Peta (Map) {getKabKota}: </label> 
  <Textarea id="KetMap" bind:value={getKetMap} rows="5" name="KetMap" />
  <FloatingLabelInput style="filled" id="Situs" bind:value={getSitus} name="Situs" type="text">
    Masukan Situs {getKabKota}:
  </FloatingLabelInput>
    <div>
      <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
    </div>     
  </form> 
  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalUpdateDataWilayah = !ModalUpdateDataWilayah} >Batal</Button>
    <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
      <CheckCircleSolid slot="icon" class="w-5 h-5" />
      Update Data Informasi Pemerintahan dan Wilayah berhasil diperbaharui. Form akan tutup dalam {counter}s.
    </Toast>
  </svelte:fragment>
</Modal>

<div class="container">
    <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Data Wilayah Pemerintahan, Kode, Pulau dan Rupa Bumi</Heading>
    
    <br/>  
     {#if $user.prefs['Role'] !== "PIC Pemerintahan"}
  <Alert color="yellow">
  <span class="font-medium" style="font-weight:600;">Halaman ini hanya bisa di Update oleh PIC Pemerintahan</span>
  </Alert>
  <br/>
  {/if}
   
    <section>

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
    </form> <br/>
    
      <Table id="TableDataWilayah" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto align-top">
        <TableHead>
          {#if $user.prefs['Role'] === "PIC Pemerintahan"}
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
          {/if}
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Kode</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Map</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Administratif Wilayah Pemerintahan</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Rupa Bumi</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
          {#each data.TableDatasWilayah.documents as cetakTabel}	
          <TableBodyRow>
            {#if $user.prefs['Role'] === "PIC Pemerintahan"}
            <TableBodyCell class="whitespace-break-spaces content-start"><ButtonGroup class="*:!ring-primary-700">
              <Button style="color:blue;box-shadow: rgba(102, 144, 246, 0.4) 5px 7px;" on:click={() => getDataWilayah(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            </ButtonGroup></TableBodyCell>
            {/if}
            <TableBodyCell class="whitespace-break-spaces content-start">
            <div class="font-sans mx-auto">
             <div class="flex items-center gap-4">
             <div class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-md">{cetakTabel.KodeW}</div>
              <h1 class="text-3xl font-bold text-gray-800">{cetakTabel.Nama}</h1>
              </div>
             <p class="text-lg text-gray-700">
              Ibukota: <strong class="font-semibold text-gray-900 underline decoration-red-500 decoration-dotted">{cetakTabel.Ibukota}</strong>
              </p>
              <p class="text-lg text-gray-700 mb-2">
              <b>Situs Portal:</b> <a href={cetakTabel.Situs} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">{cetakTabel.Situs}</a>
              </p>
               <div class="w-full h-80 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center">
               <p class="text-gray-500">{@html cetakTabel.Map} </p>
               </div>
               <p class="text-lg text-gray-700 mt-1">
               <b>Koordinat:</b><br/>{cetakTabel.Koordinat}
               </p>
              </div>
            </TableBodyCell>
             <TableBodyCell class="whitespace-break-spaces content-start">
            <div class="font-sans mx-auto" style="width:250px;overflow-wrap: anywhere;">
               <p class="mt-2 text-lg text-gray-700">
                <b>Keterangan:</b> <br/>{@html cetakTabel.KetMap}
              </p>
              </div>
            </TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start text-lg text-gray-700"><div style="width:190px;overflow-wrap: anywhere;">
            <b>Luas Wilayah:</b><br/>{cetakTabel.Luas_Wilayah} km2<br/><br/><b>Jum. Penduduk:</b><br/>{cetakTabel.J_Penduduk}<br/>
            <br/><b>Jumlah Kecamatan:</b><br/>{cetakTabel.J_Kecamatan}<br/><br/><b>Jumlah Kelurahan:</b><br/>{cetakTabel.J_Kelurahan}<br/><br/><b>Jumlah Desa:</b><br/>{cetakTabel.J_Desa}</div><br/></TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start text-lg text-gray-700"><div style="width:160px;overflow-wrap: anywhere;">
            <b>Jumlah Gunung:</b><br/>{cetakTabel.J_Gunung}<br/><br/><b>Jumlah Pulau:</b><br/>{cetakTabel.J_Pulau}<br/><br/><b>Jumlah Selat:</b><br/>{cetakTabel.J_Selat}<br/><br/><b>Jumlah Danau:</b><br/>{cetakTabel.J_Danau}<br/><br/><b>Jumlah Sungai:</b><br/>{cetakTabel.J_Sungai}<br/><br/><b>Jumlah Rawa:</b><br/>{cetakTabel.J_Rawa}</div><br/></TableBodyCell>
          </TableBodyRow>
       {/each}
    
        </TableBody>
      </Table>
      <br/>
      {#if data.TableDatasWilayah.total === 0}
      <p>No TableDatas yet.</p>
      {:else}
      <p>{data.TableDatasWilayah.total} Data ditemukan</p>
       {/if}
     
    </section>

  <br/> <br/>
</div>

<style>

</style>