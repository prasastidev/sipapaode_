<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Heading, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
<title>Info User</title>
<meta name="description" content="Info User" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Info User</Heading>
  <br/>
  
  <Button color="blue" class="float-right"> <PlusOutline class="inline-flex w-4 h-4 mr-2 text-white-500 dark:text-white-400" /> Add User</Button> 
  <br/><br/>
  <Table hoverable={true} class="table-fixed w-max whitespace-break-spaces mt-2">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Email</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Role (Peran)</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Tanggal Join</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Aktifitas Terakhir</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">...</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      <TableBodyRow>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">Admin</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">Edit | Delete</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">Admin</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">Edit | Delete</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">Admin</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">---</TableBodyCell>
        <TableBodyCell style="font-size: larger;" class="py-2">Edit | Delete</TableBodyCell>
      </TableBodyRow>
     
    </TableBody>
  </Table>

<br/> <br/>
</div>