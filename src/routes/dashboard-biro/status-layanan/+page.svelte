<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Toggle, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import { ArrowRightAltSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';
    import { Popover } from 'flowbite-svelte';
    import { databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { ID, Query } from 'appwrite';




function UpdateLayananOnline(Status_raw, id) {
  Status_raw = !Status_raw;
  const promise = databases.updateDocument('673dd7b2001a83873b47', '6742979f00204341e7dd', id, {
		Status_raw: Status_raw
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
	<title>Fitur Layanan</title>
	<meta name="description" content="Fitur" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Status Jenis Layanan Online</Heading>
    <br/>

   <label style="font-size:large;padding:6px 10px;font-size:22px;font-weight:600;"><ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Bagian Kerjasama </label>
    <button id="cekonlineKS" class="inline-flex -ml-3 items-center text-sm font-light text-gray-500 dark:text-gray-400"><ExclamationCircleSolid class="w-5 h-5" />
    </button>
  <Popover triggeredBy="#cekonlineKS" class="w-96 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400" placement="right">
   <div class="p-3 space-y-2">Aktivasi Layanan Online Bagian Kerjasama terdapat pada Nomor: 8, 9, dan 10</div>
  </Popover>
   <br/>
   <label style="font-size:large;padding:6px 10px;font-size:22px;font-weight:600;"><ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Koord. Pemerintahan </label>
   <button id="cekonlineKP" class="inline-flex -ml-3 items-center text-sm font-light text-gray-500 dark:text-gray-400"><ExclamationCircleSolid class="w-5 h-5" />
   </button>
 <Popover triggeredBy="#cekonlineKP" class="w-96 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400" placement="right">
  <div class="p-3 space-y-2">Aktivasi Layanan Online Koordinator Pemerintahan terdapat pada Nomor: 4, 5, 6, dan 7</div>
 </Popover>
   <br/>
   <label style="font-size:large;padding:6px 10px;font-size:22px;font-weight:600;"><ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Koord. Otonomi Daerah </label>
   <button id="cekonlineKOD" class="inline-flex -ml-3 items-center text-sm font-light text-gray-500 dark:text-gray-400"><ExclamationCircleSolid class="w-5 h-5" />
   </button>
 <Popover triggeredBy="#cekonlineKOD" class="w-96 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400" placement="right">
  <div class="p-3 space-y-2">Aktivasi Layanan Online Koordinator Otonomi Daerah terdapat pada Nomor: 1, 2, dan 3</div>
 </Popover>
   <br/>
   <br/>
  
<section>

<br/>
{#if data.TableDatasLayananOnline.documents.length > 0}
<Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
  <TableHead>
    <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
    <TableHeadCell style="font-size: larger;" class="py-4">Layanan Online</TableHeadCell>
    <TableHeadCell style="font-size: larger;" class="py-4">Status</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each data.TableDatasLayananOnline.documents as cetakTabel, i}	
    <TableBodyRow>
      <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces"><span class="Bulat">{i+1}</span></TableBodyCell>
      <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{cetakTabel.Jenis_layanan}</TableBodyCell>
      <TableBodyCell class="py-3 whitespace-break-spaces"><Toggle color="green" bind:checked={cetakTabel.Status_raw} on:click={UpdateLayananOnline(cetakTabel.Status_raw, cetakTabel.$id )}>Via Online {cetakTabel.Status_raw ? 'Aktiv' : 'Tidak Aktiv'}</Toggle> </TableBodyCell>

    </TableBodyRow>
 {/each}

  </TableBody>
</Table>
{:else}
<p class="alert alert-danger">No Data found</p>
{/if}
 
</section>
<br/>


</div>


<style>
  .Bulat {
    background: #86bcea;
    border-radius: 3em;
    -moz-border-radius: 3em;
    -webkit-border-radius: 3em;
    color: #ffffff;
    height: 1.8em;
    width: 1.8em;
    display: inline-block;
    font-size: 14px;
    line-height: 2em;
    text-align: center;
  }
</style>