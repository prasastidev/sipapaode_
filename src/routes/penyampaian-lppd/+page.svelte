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
    <Radio bind:group={TahunBerjalan} value="first">2023</Radio>
    <Radio bind:group={TahunBerjalan} value="second">2024</Radio>
  </div>
  <br/>
<Table shadow hoverable={true} class="whitespace-break-spaces">
    <TableHead>
      <TableHeadCell class="py-5">No</TableHeadCell>
      <TableHeadCell class="py-5">Kabupaten / Kota</TableHeadCell>
      <TableHeadCell class="py-5">LPPD</TableHeadCell>
      <TableHeadCell class="py-5">LPKJ</TableHeadCell>
      <TableHeadCell class="py-5">Status</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      <TableBodyRow>
        <TableBodyCell>1</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Bombana</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>2</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>3</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton Selatan</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>🟨 Progress (60%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>4</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton Tengah</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>🟥 Progress (10%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>5</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton Utara</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>6</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Kolaka</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>🟨 Progress (70%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>7</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Kolaka Timur</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>🟨 Done (50%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>8</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Kolaka Utara</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟥 Progress (20%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>9</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>🟥 Progress (40%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>10</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe Kepulauan</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>11</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe Selatan</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>12</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe Utara</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>13</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Muna</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>14</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Muna Barat</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>15</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Wakatobi</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>16</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kota Baubau</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>17</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kota Kendari</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>🟩 Done (100%)</TableBodyCell>
      </TableBodyRow>

    </TableBody>
  </Table>
<br/><br/><br/>

</div>