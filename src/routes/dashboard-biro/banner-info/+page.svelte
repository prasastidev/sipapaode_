<script>
  /** @type {import('./$types').PageData} */
  export let data=[];
  import { Heading, Toggle, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline, TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';
  import { databases } from '$lib/appwrite';
  import { invalidateAll } from '$app/navigation';


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
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Banner Info</Heading>
    <br/>


  <section>

    <br/>
    {#if data.TableDatasTextInfo.documents.length > 0}
    <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
      <TableHead>
        <TableHeadCell style="font-size: larger;" class="py-4">Text Info</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Edit Text</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Status</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each data.TableDatasTextInfo.documents as cetakTabel, i}	
        <TableBodyRow>
          <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{cetakTabel.Text_Banner}</TableBodyCell>
          <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces"><span style="border-bottom:2px solid blue;color:blue;cursor:pointer;font-size:smaller;">Edit</span></TableBodyCell>
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