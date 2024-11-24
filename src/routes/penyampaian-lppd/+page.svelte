<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { Radio } from 'flowbite-svelte';
    let TahunBerjalan = 'second';

</script>

<svelte:head>
	<title>Laporan Penyampaian LPPD</title>
	<meta name="description" content="Laporan Penyampaian LPPD" />
</svelte:head>

<br/><br/>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Laporan Penyampaian LPPD / LPKJ</Heading>
<br/>
<div class="flex gap-3">Pilih Tahun Berjalan: &nbsp;
    <Radio bind:group={TahunBerjalan} value="second">2024</Radio>
  </div>
  <br/><br/>


<section>
  {#if data.TableDatasLPPDLPKJ.total === 0}
    <p>No TableDatas yet.</p>
  {:else}
    <p>{data.TableDatasLPPDLPKJ.total} Data ditemukan</p>
  {/if}
  <br/>

  <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Kabupaten / Kota</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPPD</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPKJ</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.TableDatasLPPDLPKJ.documents as cetakTabel, i}	
      <TableBodyRow>
        <TableBodyCell>{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Doc: {cetakTabel.SLPPD} <br/>Pengiriman: {cetakTabel.PengirimanLPPD}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Doc: {cetakTabel.SLPKJ}  <br/>Pengiriman: {cetakTabel.PengirimanLKPJ}</TableBodyCell>
      </TableBodyRow>
   {/each}

    </TableBody>
  </Table>
 
</section>
<br/><br/><br/>
</div>