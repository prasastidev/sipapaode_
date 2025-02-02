<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Heading, Badge, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline, TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';
  const tableData = [
    {
      no: 1,
      nama: 'Susi Hasniati',
      bidang: 'Bagian Kerjasama',
      deskripsi: 'Verifikasi data pengajuan kerjasama secara online, monitoring, dan pembaruan informasi secara berkala. <br/>Mengelola serta mendata <b>Dokumen kerjasama</b>, baik yang aktif maupun yang telah selesai, untuk memastikan semua informasi terkini dan akurat demi kelancaran proses kerjasama. <br/>Serta Mengunggah foto dokumentasi kerjasama sebagai bukti kolaborasi yang efektif dan produktif antara pihak-pihak terlibat.',
      email: 'biropem.bagks@gmail.com',
      pic: 'PIC Kerjasama'
    },
    {
      no: 2,
      nama: '--',
      bidang: 'Bagian Kerjasama',
      deskripsi: 'menyampaikan informasi mengenai pengiriman <b>laporan evaluasi kerjasama</b> dari pemerintah kabupaten/kota, memastikan dokumentasi yang tepat dan akurat, serta meneruskannya ke pusat sesuai dengan prosedur dan waktu yang ditentukan untuk mendukung transparansi dan akuntabilitas.',
      email: '--',
      pic: 'PIC Kerjasama'
    },
    {
      no: 3,
      nama: 'M. Arief Budiman',
      bidang: 'Koordinator Pemerintahan',
      deskripsi: 'Mengupdate dan memelihara data informasi mengenai <b>kode wilayah pemerintahan</b>, administrasi, dan rupa bumi. Memastikan keakuratan dan konsistensi data, serta mendukung analisis dan pengambilan keputusan yang sehubungan dengan pengelolaan wilayah dan sumber daya, mendorong pelayanan publik yang efektif dan efisien.',
      email: 'bobexlbudiman@gmail.com',
      pic: 'PIC Pemerintahan'
    },
    {
      no: 4,
      nama: 'M. Arief Budiman',
      bidang: 'Koordinator Pemerintahan',
      deskripsi: 'Memfasilitasi penataan wilayah pemerintahan serta mendukung proses <b>pembentukan daerah otonomi baru</b>, termasuk analisis kebijakan, koordinasi antar instansi, dan penyusunan rekomendasi untuk meningkatkan efisiensi pengelolaan daerah serta pelayanan publik yang lebih baik.',
      email: 'bobexlbudiman@gmail.com',
      pic: 'PIC Pemerintahan'
    },
    {
      no: 5,
      nama: '--',
      bidang: 'Koordinator Pemerintahan',
      deskripsi: 'memfasilitasi pelaporan <b>Standar Pelayanan Minimal (SPM)</b> secara akurat dan tepat waktu, serta memastikan pengiriman laporan ke Pusat sesuai dengan regulasi yang berlaku, guna mendukung peningkatan kualitas pelayanan dan akuntabilitas institusi.',
      email: '--',
      pic: 'PIC Pemerintahan'
    },
    {
      no: 6,
      nama: 'Rizky Tahir',
      bidang: 'Koordinator Otonomi Daerah',
      deskripsi: 'mendokumentasikan dan mengarsipkan <b>laporan LPPD dan LKPJ</b> dari Pemerintah Kabupaten/Kota, memastikan semua dokumen terorganisir dengan baik, serta meneruskan laporan tersebut ke instansi pusat sesuai dengan ketentuan yang berlaku untuk mendukung transparansi dan akuntabilitas.',
      email: 'biropemerintahanlppd@gmail.com',
      pic: 'PIC Otonomi'
    },
    {
      no: 7,
      nama: '',
      bidang: 'Koordinator Otonomi Daerah',
      deskripsi: 'Melakukan <b>inventarisasi</b> dan penataan urusan <b>daerah untuk Otonomi Baru</b> dengan tujuan memastikan pengelolaan yang efektif. Mencakup pengumpulan data, analisis kebijakan, serta penyusunan rekomendasi untuk pengembangan dan efektifitas pengelolaan daerah, guna mendukung implementasi otonomi yang lebih baik dan berkelanjutan.',
      email: '',
      pic: 'PIC Otonomi'
    },
    {
      no: 8,
      nama: '',
      bidang: 'Koordinator Otonomi Daerah',
      deskripsi: 'Memfasilitasi penerbitan <b>Surat Keputusan (SK)</b> dengan kategory ditujukan kepada Gubernur, Bupati/Walikota dan Legislatif. Serta penyusunan dan pemeliharaan arsip dokumentasi sehubungan dengan SK, memastikan semua dokumen terorganisir dengan baik dan dapat diakses untuk administrasi dan audit.',
      email: '',
      pic: 'PIC Otonomi'
    },
    {
      no: 9,
      nama: 'Irma Fitayanti, S.Kom',
      bidang: 'Tata Usaha',
      deskripsi: 'Pendataan pegawai di Biro Pemerintahan</b> dan Otonomi Daerah, mengelola informasi pegawai dan keakuratan data, serta mendukung pengambilan keputusan melalui laporan yang tepat dan tepat waktu.',
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
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Informasi PIC Sipapaode</Heading>
  <br/><br/>

  <div class="modern-box">
    <div class="contentbox">
      <label>Berikut adalah informasi daftar PIC (Pengelola Informasi, Layanan, dan Data Sipapaode) di Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara, berdasarkan SK yang telah ditunjuk.</label>
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