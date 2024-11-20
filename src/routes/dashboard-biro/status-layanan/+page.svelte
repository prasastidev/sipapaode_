<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Toggle, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import { ArrowRightAltSolid } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>Fitur Layanan</title>
	<meta name="description" content="Fitur" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Status Jenis Layanan Online</Heading>
    <br/>


    <Table>
        <TableHead>
          <TableHeadCell colspan="2" style="font-size: large;" class="py-4">
            <ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Bagian Kerjasama</TableHeadCell>
         </TableHead>
        <TableBody tableBodyClass="divide-y">
          <TableBodyRow>
            <TableBodyCell style="font-size: larger;" class="py-2">Fasilitas Kerjasama dengan Pihak Ketiga / Swasta</TableBodyCell>
            <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle> </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell style="font-size: larger;" class="py-2">Fasilitas Kerjasama antar Pemerintah Daerah dan K/L</TableBodyCell>
            <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle> </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell style="font-size: larger;" class="py-2">Fasilitas Kerjasama dengan Pihak Asing / Luar Negeri</TableBodyCell>
            <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle> </TableBodyCell>
          </TableBodyRow>
           </TableBody>
           <TableHead>
            <TableHeadCell colspan="2" style="font-size: large;" class="py-4">
               <ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" />Koord. Pemerintahan</TableHeadCell>
           </TableHead>
          <TableBody tableBodyClass="divide-y">
            <TableBodyRow>
              <TableBodyCell style="font-size: larger;" class="py-2">Fasilitas Penataan Wilayah Pemerintahan (HUT RI, HUT SULTRA)</TableBodyCell>
              <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green">Via Online</Toggle></TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell style="font-size: larger;" class="py-2">Fasilitas Penegasan Batas Daerah</TableBodyCell>
              <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle></TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell style="font-size: larger;" class="py-2">Pembentukan Daerah Otonomi Baru</TableBodyCell>
              <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green">Via Online</Toggle></TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
                <TableBodyCell style="font-size: larger;" class="py-2">Informasi Kode, Data Wilayah Pemerintahan, Pulau dan Rupa Bumi</TableBodyCell>
                <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle></TableBodyCell>
              </TableBodyRow>
        </TableBody>
        <TableHead>
            <TableHeadCell colspan="2" style="font-size: large;" class="py-4">
            <ArrowRightAltSolid class="inline-flex w-6 h-6 mr-4 text-gray-500 dark:text-gray-400" /> Koord. Otonomi Daerah</TableHeadCell>
           </TableHead>
          <TableBody tableBodyClass="divide-y">
            <TableBodyRow>
              <TableBodyCell style="font-size: larger;" class="py-2">Penerbitan Surat & SK Gubernur Pejabat Negara & Legistlatif</TableBodyCell>
              <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle></TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell style="font-size: larger;" class="py-2">Laporan dan Evaluasi: LPKJ, LPPD & LPJ</TableBodyCell>
              <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle></TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell style="font-size: larger;" class="py-2">Inventarisasi Penataan Urusan Daerah Otonomi Baru</TableBodyCell>
              <TableBodyCell class="inline-flex py-3 float-right"><Toggle color="green" checked>Via Online</Toggle></TableBodyCell>
            </TableBodyRow>
        </TableBody>
             
      </Table>

  <br/> <br/>
</div>