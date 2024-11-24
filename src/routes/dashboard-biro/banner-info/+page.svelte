<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Heading, Toggle, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline, TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';

</script>


<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Banner Info</Heading>
    <br/>



    <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
      <TableHead>
        <TableHeadCell style="font-size: larger;" class="py-4">Gambar</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Text Pengumuman</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Status</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
       
        <TableBodyRow>
          <TableBodyCell class="whitespace-break-spaces">--  <span>Edit</span></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">--- <span>Edit</span></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces"><Toggle color="green" checked>Active</Toggle></TableBodyCell>
        
        </TableBodyRow>
  
  
      </TableBody>
    </Table>

  <br/> <br/>
</div>