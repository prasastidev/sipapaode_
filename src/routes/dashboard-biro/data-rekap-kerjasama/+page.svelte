<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import { PlusOutline, EditOutline, TrashBinOutline, DownloadOutline } from 'flowbite-svelte-icons';

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Data Rekap Kerjasama</Heading>
    <br/>
    <Button color="blue" class="float-right"> <PlusOutline class="inline-flex w-4 h-4 mr-2 text-white-500 dark:text-white-400" /> Add Data</Button> 
    <br/><br/><br/>
    <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
      <TableHead>
        <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Jenis</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Subjek</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Tentang</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Nomor Kerjasama</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">OPD</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Mitra</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Tgl Mulai</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Tgl Selesai</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Keterangan</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Document</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        <TableBodyRow>
          <TableBodyCell>1</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">Kesepakatan Bersama</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">Pemerintah Provinsi Sulawesi Tenggara dengan Universitas Sulawesi Tenggara</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">Pengembangan Ilmu Pengetahuan, Teknologi, Sumber Daya Alam dan Sumber Daya Manusia di Provinsi Sulawesi Tenggara</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">422.5/001/KB/I/2023</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">Biro Kesra</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">Universitas Sulawesi Tenggara</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">4 Januari 2023</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">4 Januari 2027</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces">Masih Berlaku</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces"><ButtonGroup class="*:!ring-primary-700"> <Button><DownloadOutline class="w-4 h-4 me-2" />Download</Button> </ButtonGroup></TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces"><ButtonGroup class="*:!ring-primary-700">
            <Button><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            <Button><TrashBinOutline class="w-4 h-4 me-2" />Delete</Button>
          </ButtonGroup></TableBodyCell>
        </TableBodyRow>
      
  
      </TableBody>
    </Table>

  <br/> <br/>
</div>