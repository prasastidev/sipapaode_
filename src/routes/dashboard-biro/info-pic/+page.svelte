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
      deskripsi: '<b>Mengelola Dashboard Bagian Kerjasama:</b> Data pengajuan kerjasama secara online, Data File Dokumen Kerjasama, Gallery Photo Dokumentasi Kerjasama.',
      email: 'biropem.bagks@gmail.com',
      pic: 'PIC Kerjasama'
    },
    {
      no: 2,
      nama: 'HERLINA UDDIN, S.STP. M.Si',
      bidang: 'Bidang Bagian Kerjasama',
      deskripsi: '<b>Mengelola Dashboard Bagian Kerjasama:</b> Arsip Database Laporan Evaluasi Kerjasama per Semester, Gallery Photo Dokumentasi Kerjasama',
      email: '--',
      pic: 'PIC Kerjasama'
    },
    {
      no: 3,
      nama: 'MOH. ARIEF BUDIMAN, SE.',
      bidang: 'Bidang Koordinator Pemerintahan',
      deskripsi: '<b>Mengelola Dashboard Koord. Pemerintahan:</b> Kode Data Wilayah Pemerintahan, Pulau dan Rupa Bumi, Gallery Photo Dokumentasi Pemerintahan.',
      email: 'bobexlbudiman@gmail.com',
      pic: 'PIC Pemerintahan'
    },
    {
      no: 4,
      nama: '--',
      bidang: 'Bidang Koordinator Pemerintahan',
      deskripsi: '<b>Mengelola Dashboard Koord. Pemerintahan:</b> ',
      email: '--',
      pic: 'PIC Pemerintahan'
    },
    {
      no: 5,
      nama: 'RISKY TAHIR, S.Ip.',
      bidang: 'Bidang Koordinator Otonomi Daerah',
      deskripsi: '<b>Mengelola Dashboard Koord. Otonomi Daerah:</b> Arsip Dokumen LPPD dan LKPJ, Gallery Photo Dokumentasi Otonomi Daerah.',
      email: 'biropemerintahanlppd@gmail.com',
      pic: 'PIC Otonomi'
    },
    {
      no: 6,
      nama: 'RESYA SAPUTRA, S.STP., M.Si.',
      bidang: 'Bidang Koordinator Otonomi Daerah',
      deskripsi: '<b>Mengelola Dashboard Koord. Otonomi Daerah:</b> Arsip Data Dokumen SK, Gallery Photo Dokumentasi Otonomi Daerah.',
      email: '',
      pic: 'PIC Otonomi'
    },
    {
      no: 7,
      nama: 'IRMA FITAYANTI BASO, S.Kom',
      bidang: 'Tata Usaha',
      deskripsi: '<b>Mengelola Dashboard Tata Usaha:</b> Data Pegawai, Photo Profil Pegawai.',
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
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Pengelola Data dan Informasi Web Biro Pemerintahan dan Otonomi Daerah Sultra (Sipapaode)</Heading>
  <br/><br/>

  <div class="modern-box">
    <div class="contentbox">
      <label>Berikut di Bawah ini adalah daftar Nama pengelola data dan Informasi Web Biro Pemerintahan dan Otonomi daerah Sulawesi Tenggara, dalam melakukan proses update data dan pembaruan data, Baik penambahan data, pengupdate-an data ataupun penghapusan data.</label>
    </div>
  </div>
  <br/><br/><br/>
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
      <TableHeadCell style="font-size: larger;" class="py-4">Deskripsi</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Email</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each filteredData as row}
      <TableBodyRow>
        <TableBodyCell>{row.no}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{row.nama}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{row.bidang}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{@html row.deskripsi}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><div style="width:140px;overflow-wrap: anywhere;">{row.email} <br/><Badge border color="indigo">{row.pic}</Badge></div></TableBodyCell>
      </TableBodyRow>
      {/each}

    </TableBody>
  </Table>


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