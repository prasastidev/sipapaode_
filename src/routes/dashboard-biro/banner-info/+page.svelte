<script>
  /** @type {import('./$types').PageData} */
  export let data=[];

  import { Heading, Modal, Toast, Popover, Toggle, Button, Textarea, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import {  EditOutline, CheckCircleSolid, InfoCircleOutline } from 'flowbite-svelte-icons';
  import { databases } from '$lib/appwrite';
  import { UpdateTableTextInfo } from '$lib/textInfoBanner.js';
  import { invalidateAll } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import ScreenInfo from '$lib/images/ScreenshotInfo.png';

  let ModalEditTextBanner = false;
  let toastStatus = false;
  let counter = 8;

  let getTextBanner, getidDoc;

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalEditTextBanner = false;
  }

  /** Edit Run 2 function: GetDataDocumentLPPD and update*/

function getDataTextBanner(id) {

  const promise = databases.getDocument(
  '673dd7b2001a83873b47', 
  '674d7bb900325147396c',
  id,
  []
);

promise.then(function (response) {
  ModalEditTextBanner = true;
  console.log(response); // Success
getTextBanner = response.Text_Banner;
getidDoc = response.$id;

}, function (error) {
  console.log(error); // Failure
  throw error;
});
}

const updateDataText = async (e) => {
  e.preventDefault();
  const formEl = e.target;
  const formData = new FormData(formEl);
  await  UpdateTableTextInfo(formData.get('infoTextbanner'), getidDoc);
  invalidateAll();

  // Reset form
  formEl.reset();
   // Notification Toast and Time
    toastStatus = true;
    counter = 8;
    timeout();
};

   


function upadateAktivasiBanner(Status_banner, id) {
    Status_banner = !Status_banner;
    const promise = databases.updateDocument('673dd7b2001a83873b47', '674d7bb900325147396c', id, {
      Status_banner: Status_banner
	});
  invalidateAll();

  promise.then(function (response) {
    console.log(response); // Success

}, function (error) {
    console.log(error); // Failure
    throw error;
});

}

</script>


<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Info Pengumuman Pada Halaman Beranda</Heading>
    <br/>
    <div class="modern-box">
      <div class="contentbox">
        <label>Berikut di bawah ini adalah halaman untuk melakukan perubahan informasi serta menampilkan (enable) ataupun tidak menampilkan (disable) Info Pengumuman yang terdapat pada halaman Beranda.</label>
      </div>
    </div>
    <br/> <br/>
    Contoh Tampilan pada halaman Beranda:<br/> <br/>
    <img src={ScreenInfo} alt="screen info" style="width:100%;height:100%;" />
    <br/><br/>

    <Modal title="Edit Text Info Banner" bind:open={ModalEditTextBanner} autoclose={false}>
      <form class="space-y-6" on:submit={updateDataText}>
        <div class="mb-6">
          <label class="text-sm">Masukan Text Info Banner (max: 150):</label> <br/>  <br/>
          <Textarea id="infoTextbanner" bind:value={getTextBanner} rows="3" name="infoTextbanner" maxlength="250" />
        </div>
        <div>
          <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Text Banner</button>
        </div>     
      </form> 
    
      <svelte:fragment slot="footer">
        <Button color="alternative" on:click={()=> ModalEditTextBanner = !ModalEditTextBanner} >Batal</Button>
        </svelte:fragment>
        <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
          <CheckCircleSolid slot="icon" class="w-8 h-8" />
          Text Banner berhasil di Update. Form akan tutup dalam {counter}s.
        </Toast>
    </Modal>

  <section>
    <span style="color:blue;font-size:16px;">Silahkan melakukan perubahan informasi serta mengaktifkan (enable) ataupun menonaktifkan (disable) info pengumuman pada Tabel di bawah ini:</span>
    <br/> <br/> 
    {#if data.TableDatasTextInfo.documents.length > 0}
    <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto border-4 border-red-500">
      <TableHead>
        <TableHeadCell style="font-size: larger;" class="py-4">Lokasi</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Text Info Pengumuman</TableHeadCell>
        <TableHeadCell style="font-size: larger;display:flex;" class="py-4">Edit Text <button id="InfoEditText">
			<InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /> </button></TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Status Aktif <button id="InfoStatusAktif">
			<InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /> </button></TableHeadCell>
      </TableHead>
      <Popover triggeredBy="#InfoEditText" class="w-40 md:w-64 lg:w-64 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="left-start">
		<div class="p-3 space-y-2" style="z-index:100;">
		  Tekan tombol Edit dibawah untuk melakukan perubahan Text Info Pengumuman
		</div>
	  </Popover>
     <Popover triggeredBy="#InfoStatusAktif" class="w-40 md:w-64 lg:w-64 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="left-start">
		<div class="p-3 space-y-2" style="z-index:100;">
		  Tekan tombol Toggle dibawah untuk melakukan enable atau disable Info Pengumuman.
		</div>
	  </Popover>
      <TableBody tableBodyClass="divide-y">
        {#each data.TableDatasTextInfo.documents as cetakTabel, i}	
        <TableBodyRow>
          <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{cetakTabel.Lokasi}</TableBodyCell>
          <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{cetakTabel.Text_Banner}</TableBodyCell>
          <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
            <ButtonGroup class="*:!ring-primary-700">
              <Button style="color:blue;" on:click={() => getDataTextBanner(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            </ButtonGroup>
          </TableBodyCell>
          <TableBodyCell class="py-3 whitespace-break-spaces"><Toggle color="green" bind:checked={cetakTabel.Status_banner} on:click={upadateAktivasiBanner(cetakTabel.Status_banner, cetakTabel.$id )} >{cetakTabel.Status_banner ? 'Active' : 'Tidak Active'}</Toggle> </TableBodyCell>
    
        </TableBodyRow>
     {/each}
    
      </TableBody>
    </Table> 
    
    {:else}
    <p class="alert alert-danger">No Data found</p>
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