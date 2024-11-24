<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Toggle, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import { ArrowRightAltSolid } from 'flowbite-svelte-icons';
    import { databases } from '$lib/appwrite';

	
	function onClick(event, country) {
		data.TableDatasLayananOnline.documents = data.TableDatasLayananOnline.documents.map(cetakTabel => {
			if (cetakTabel.Jenis_layanan ===  country.Jenis_layanan) {
				cetakTabel.Status_raw = event.target.checked ? '1' : '0';
			}
			return cetakTabel;
		})
	}
	
  
</script>

<svelte:head>
	<title>Fitur Layanan</title>
	<meta name="description" content="Fitur" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Status Jenis Layanan Online</Heading>
    <br/>

   <label style="font-size:large;padding:6px 10px;font-size:22px;font-weight:600;"><ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Bagian Kerjasama </label><br/>
   <label style="font-size:large;padding:6px 10px;font-size:22px;font-weight:600;"><ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Koord. Pemerintahan </label><br/>
   <label style="font-size:large;padding:6px 10px;font-size:22px;font-weight:600;"><ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Koord. Otonomi Daerah </label><br/>
   <br/>
  
<section>
  {#if data.TableDatasLayananOnline.total === 0}
    <p>No TableDatas yet.</p>
  {:else}
    <p>{data.TableDatasLayananOnline.total} Data ditemukan</p>
  {/if}
  <br/>

  <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Layanan Online</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Status</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Status Raw</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.TableDatasLayananOnline.documents as cetakTabel, i}	
      <TableBodyRow>
        <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{i+1}</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{cetakTabel.Jenis_layanan}</TableBodyCell>
        <TableBodyCell class="py-3 whitespace-break-spaces"><Toggle color="green" checked={cetakTabel.Status_raw === '1'} on:click={(e) => onClick(e, cetakTabel)}>Via Online</Toggle> </TableBodyCell>
        <TableBodyCell class="py-3 whitespace-break-spaces">{cetakTabel.Status_raw}</TableBodyCell>
      </TableBodyRow>
   {/each}

    </TableBody>
  </Table>
 
</section>
<br/>


</div>