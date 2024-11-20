<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { Heading, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { PlusOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
<title>Laporan LPPD</title>
<meta name="description" content="Laporan LPPD" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Laporan LPPD dan LPKJ</Heading>
  <br/>
  

  <Table shadow hoverable={true} class="whitespace-break-spaces">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Kabupaten / Kota</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPPD</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPKJ</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Status</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      <TableBodyRow>
        <TableBodyCell>1</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Bombana</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>2</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>3</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton Selatan</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>4</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton Tengah</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>5</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Buton Utara</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>6</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Kolaka</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>7</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Kolaka Timur</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>8</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Kolaka Utara</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>9</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>➖</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>10</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe Kepulauan</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>11</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe Selatan</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>12</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Konawe Utara</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>13</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Muna</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>14</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Muna Barat</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>15</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kabupaten Wakatobi</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>16</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kota Baubau</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>17</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kota Kendari</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>✔️</TableBodyCell>
        <TableBodyCell>Edit</TableBodyCell>
      </TableBodyRow>

    </TableBody>
  </Table>
<br/> <br/>
</div>