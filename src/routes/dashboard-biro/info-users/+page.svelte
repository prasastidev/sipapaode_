<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Heading, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline, TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
<title>Info User</title>
<meta name="description" content="Info User" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Informasi User</Heading>
  <br/>
  
  <Button color="blue" class="float-right"> <PlusOutline class="inline-flex w-4 h-4 mr-2 text-white-500 dark:text-white-400" /> Add User</Button> 
  <br/><br/>
 

  <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Email</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Role</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Tanggal Join</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
     
      <TableBodyRow>
        <TableBodyCell>1</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">----</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><ButtonGroup class="*:!ring-primary-700">
          <Button style="color:blue;"><EditOutline class="w-4 h-4 me-2" />Edit</Button>
          <Button style="color:red;"><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
        </ButtonGroup></TableBodyCell>
      </TableBodyRow>


    </TableBody>
  </Table>

<br/> <br/>
</div>