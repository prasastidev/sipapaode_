<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Heading, Badge, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline, TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';
  const tableData = [
    {
      no: 1,
      nama: 'SUSI HASMIATI, S.STP. MM.',
      bidang: 'Bidang Bagian Kerjasama',
      email: 'biropem.bagks@gmail.com',
      pic: 'PIC Kerjasama'
    },
    {
      no: 2,
      nama: 'HERLINA UDDIN, S.STP. M.Si',
      bidang: 'Bidang Bagian Kerjasama',
      email: '--',
      pic: 'PIC Kerjasama'
    },
    {
      no: 3,
      nama: 'MOH. ARIEF BUDIMAN, SE.',
      bidang: 'Bidang Koordinator Pemerintahan',
      email: 'bobexlbudiman@gmail.com',
      pic: 'PIC Pemerintahan'
    },
    {
      no: 4,
      nama: 'RISKY TAHIR, S.Ip.',
      bidang: 'Bidang Koordinator Otonomi Daerah',
      email: 'biropemerintahanlppd@gmail.com',
      pic: 'PIC Otonomi'
    },
    {
      no: 5,
      nama: 'RESYA SAPUTRA, S.STP., M.Si.',
      bidang: 'Bidang Koordinator Otonomi Daerah',
      email: 'resasaputra9@gmail.com',
      pic: 'PIC Otonomi'
    },
    {
      no: 6,
      nama: 'IRMA FITAYANTI BASO, S.Kom',
      bidang: 'Tata Usaha',
      email: 'oci25ocioci@gmail.com',
      pic: 'PIC Tata Usaha'
    }
  ];

  const uniqueBidang = [...new Set(tableData.map(item => item.bidang))];
  let selectedBidang = '';
  
  $: filteredData = selectedBidang 
    ? tableData.filter(item => item.bidang === selectedBidang)
    : tableData;

</script>

<svelte:head>
<title>Informasi PIC</title>
<meta name="description" content="Informasi PIC" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Daftar Informasi User PIC - Biro Pemerintahan dan Otonomi Daerah</Heading>
  <br/><br/>

   <!-- Filter Buttons -->
   <div class="mb-4 flex gap-2">
    <button 
      class="px-4 py-2 rounded {!selectedBidang ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
      on:click={() => selectedBidang = ''}>
      All
    </button>
    {#each uniqueBidang as bidang}
      <button 
        class="px-4 py-2 rounded {selectedBidang === bidang ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
        on:click={() => selectedBidang = bidang}>
        {bidang}
      </button>
    {/each}
  </div>


  <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Bidang</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Email</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each filteredData as row}
      <TableBodyRow>
        <TableBodyCell>{row.no}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{row.nama}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{row.bidang}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><div style="width:140px;overflow-wrap: anywhere;">{row.email} <br/><Badge border color="indigo">{row.pic}</Badge></div></TableBodyCell>
      </TableBodyRow>
      {/each}

    </TableBody>
  </Table>


<br/> <br/>
</div>


<style>

</style>