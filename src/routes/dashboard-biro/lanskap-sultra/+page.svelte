<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Modal, Button, Alert, Radio, ButtonGroup, FloatingLabelInput, Textarea, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import { EditOutline, GlobeOutline  } from 'flowbite-svelte-icons';

  import { invalidateAll } from '$app/navigation';
  import { databases } from '$lib/appwrite';
	import { UpdateTableDataWilayah } from '$lib/DataWilayah.js';


  let  getJ_Kecamatan, getKodeW, getKabKota, getJ_Kelurahan, getJ_Desa, getLuas_Wilayah, getJ_Penduduk, getJ_Gunung, getJ_Pulau, getJ_Selat, getJ_Danau, getJ_Sungai, getJ_Rawa, getKoordinat, getKetMap, getSitus, getidDoc;
  let ModalUpdateDataWilayah = false;

  /** Edit Run 2 function: GetDataDocumentLPPD and update*/

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
};



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

<Modal title="Update Data Wilayah {getKabKota}" bind:open={ModalUpdateDataWilayah } autoclose={false}>
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
  <FloatingLabelInput style="filled" id="J_Penduduk" bind:value={getJ_Penduduk} name="J_Penduduk" type="text">
    Masukan Jumlah Penduduk Terbaru {getKabKota}:
  </FloatingLabelInput> 
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
    </svelte:fragment>
</Modal>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Informasi Kode, Data Wilayah Pemerintahan, Pulau dan Rupa Bumi</Heading>
    <br/>  <br/>
    <div class="modern-box">
      <div class="contentbox">
        <label>Dibawah berikut adalah informasi Kode Data Wilayah Pemerintahan di Sulawesi Tenggara.<br/>
          Setiap Perubahan Data yang dilakukan pada Tabel di Bawah, akan mengupdate otomatis Data yang ditampilkan pada <a href="/maps-sultra/#TabelOtonomi" style="text-decoration:underline;color:blue;">halaman berikut.</a></label>
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
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Kode</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Nama</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Ibukota</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Administratif Wilayah Pemerintahan</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Rupa Bumi</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Map</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Keterangan Map</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4 content-start">Situs Pemerintahan</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
          {#each data.TableDatasWilayah.documents as cetakTabel}	
          <TableBodyRow>
            <TableBodyCell class="whitespace-break-spaces content-start"><ButtonGroup class="*:!ring-primary-700">
              <Button style="color:blue;" on:click={() => getDataWilayah(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            </ButtonGroup></TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start">{cetakTabel.KodeW}</TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces font-bold text-xl content-start">{cetakTabel.Nama}</TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start">{cetakTabel.Ibukota}</TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start"><div style="width:190px;overflow-wrap: anywhere;"><b>Luas Wilayah:</b> {cetakTabel.Luas_Wilayah} km2<br/><b>Jum. Penduduk:</b> {cetakTabel.J_Penduduk} <br/>
            <br/><b>Jumlah Kecamatan:</b> {cetakTabel.J_Kecamatan} <br/><b>Jumlah Kelurahan:</b> {cetakTabel.J_Kelurahan}<br/><b>Jumlah Desa: {cetakTabel.J_Desa}</b></div></TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start"><div style="width:170px;overflow-wrap: anywhere;"><b>Jum. Gunung:</b> {cetakTabel.J_Gunung}<br/><b>Jum. Pulau:</b> {cetakTabel.J_Pulau}<br/><b>Jum. Selat:</b> {cetakTabel.J_Selat}<br/><b>Jum. Danau:</b> {cetakTabel.J_Danau}<br/><b>Jum. Sungai:</b> {cetakTabel.J_Sungai}<br/><b>Jum. Rawa:</b> {cetakTabel.J_Rawa}</div></TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start"><div style="width:300px;">{@html cetakTabel.Map}<br/><b>Koordinat:</b> {cetakTabel.Koordinat}</div></TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start"><div style="width:200px;">{@html cetakTabel.KetMap}</div></TableBodyCell>
            <TableBodyCell class="whitespace-break-spaces content-start flex"><GlobeOutline class="w-5 h-5 mr-1 align-middle" /> {cetakTabel.Situs}</TableBodyCell>
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