<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Heading, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline, TrashBinOutline, EditOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
<title>Informasi PIC</title>
<meta name="description" content="Informasi PIC" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Informasi PIC Sipapaode</Heading>
  <br/><br/>

  <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Bidang</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Deskripsi</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Email</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
     
      <TableBodyRow>
        <TableBodyCell>1</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Bagian Kerjasama</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Verifikasi data pengajuan kerjasama secara online, monitoring, dan pembaruan informasi secara berkala. <br/>Mengelola serta mendata <b>Dokumen kerjasama</b>, baik yang aktif maupun yang telah selesai, untuk memastikan semua informasi terkini dan akurat demi kelancaran proses kerjasama. <br/>Serta Mengunggah foto dokumentasi kerjasama sebagai bukti kolaborasi yang efektif dan produktif antara pihak-pihak terlibat.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>2</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Bagian Kerjasama</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">menyampaikan informasi mengenai pengiriman <b>laporan evaluasi kerjasama</b> dari pemerintah kabupaten/kota, memastikan dokumentasi yang tepat dan akurat, serta meneruskannya ke pusat sesuai dengan prosedur dan waktu yang ditentukan untuk mendukung transparansi dan akuntabilitas.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>3</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Koordinator Pemerintahan</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Mengupdate dan memelihara data informasi mengenai <b>kode wilayah pemerintahan</b>, administrasi, dan rupa bumi. Memastikan keakuratan dan konsistensi data, serta mendukung analisis dan pengambilan keputusan yang sehubungan dengan pengelolaan wilayah dan sumber daya, mendorong pelayanan publik yang efektif dan efisien.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>4</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Koordinator Pemerintahan</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Memfasilitasi penataan wilayah pemerintahan serta mendukung proses <b>pembentukan daerah otonomi baru</b>, termasuk analisis kebijakan, koordinasi antar instansi, dan penyusunan rekomendasi untuk meningkatkan efisiensi pengelolaan daerah serta pelayanan publik yang lebih baik..
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>5</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Koordinator Pemerintahan</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">memfasilitasi pelaporan <b>Standar Pelayanan Minimal (SPM)</b> secara akurat dan tepat waktu, serta memastikan pengiriman laporan ke Pusat sesuai dengan regulasi yang berlaku, guna mendukung peningkatan kualitas pelayanan dan akuntabilitas institusi.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>6</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Koordinator Otonomi Daerah</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">mendokumentasikan dan mengarsipkan <b>laporan LPPD dan LKPJ</b> dari Pemerintah Kabupaten/Kota, memastikan semua dokumen terorganisir dengan baik, serta meneruskan laporan tersebut ke instansi pusat sesuai dengan ketentuan yang berlaku untuk mendukung transparansi dan akuntabilitas.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>7</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Koordinator Otonomi Daerah</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Melakukan <b>inventarisasi</b> dan penataan urusan <b>daerah untuk Otonomi Bar</b> dengan tujuan memastikan pengelolaan yang efektif. Mencakup pengumpulan data, analisis kebijakan, serta penyusunan rekomendasi untuk pengembangan dan efektifitas pengelolaan daerah, guna mendukung implementasi otonomi yang lebih baik dan berkelanjutan.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>8</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Koordinator Otonomi Daerah</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Memfasilitasi penerbitan <b>Surat Keputusan (SK)</b> dengan kategory ditujukan kepada Gubernur, Bupati/Walikota dan Legislatif. Serta penyusunan dan pemeliharaan arsip dokumentasi sehubungan dengan SK, memastikan semua dokumen terorganisir dengan baik dan dapat diakses untuk administrasi dan audit.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>9</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">--</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Tata Usaha</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><b>Pendataan pegawai di Biro Pemerintahan</b> dan Otonomi Daerah, mengelola informasi pegawai dan keakuratan data, serta mendukung pengambilan keputusan melalui laporan yang tepat dan tepat waktu.
        </TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">---</TableBodyCell>
      </TableBodyRow>


    </TableBody>
  </Table>

<br/> <br/>
</div>