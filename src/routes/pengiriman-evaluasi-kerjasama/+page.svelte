<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Table, TableBody, Radio , Badge, Indicator, Alert, Button, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { ClockOutline, FileLinesOutline, InfoCircleSolid, ArchiveArrowDownSolid } from 'flowbite-svelte-icons';
    
    let TahunBerjalan = 'second';
    let OnlineEvaluasiKS  = data.TableDatasLayananOnline.documents[7];

    function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_evaluasiKS");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }

</script>

<svelte:head>
	<title>Laporan Penyampaian LPPD</title>
	<meta name="description" content="Laporan Penyampaian LPPD" />
</svelte:head>

<br/><br/>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Laporan Pengiriman Evaluasi Kerjasama</Heading>
<br/><br/>
{#if OnlineEvaluasiKS.Status_raw }
<Alert color="blue" border>
  <div class="flex items-center gap-3">
    <InfoCircleSolid class="w-6 h-6" />
    <span class="text-xl font-bold">Formulir (Online) Pengiriman Laporan Evaluasi Kerjasama <Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Via Online</Badge></span>
  </div>
  <p class="mt-2 mb-4 text-base">
    Pengiriman laporan Evaluasi Kerjasama dilakukan setiap Semester dalam 1 tahun.
    Pengiriman Laporan Evaluasi Kerjasama Semester 1 dilakukan di bulan Juni dan Pengiriman Laporan Evaluasi Kerjasama Semester 2 dilakukan di bulan December.
    Laporan Pengiriman Evaluasi Kerjasama akan di update pada tabel dibawah halaman ini.
  </p>
  <div class="flex gap-2">
    <Button size="sm" color="blue" class="mr-4"><ArchiveArrowDownSolid class="w-5 h-5 me-2" />Submit Laporan Evaluasi Kerjasama</Button>
  </div>
</Alert>
<br/><br/>
{/if}
<div class="flex gap-3">Pilih Tahun Berjalan: &nbsp;
    <Radio bind:group={TahunBerjalan} value="second">2024</Radio>
  </div>
 <br/>


<section>
 
 {#if data.TableDatasEvaluasiKS.total === 0}
    <p>No TableDatas yet.</p>
  {:else}
    <p>{data.TableDatasEvaluasiKS.total} Data ditemukan</p>
  {/if}
  <br/>

  <form class="flex items-center w-full mx-auto" style="width:100%;">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Nama Kabupaten / Kota ..." required />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>
<br/>

  <Table id="TABLE_evaluasiKS" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Kabupaten / Kota</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Semester I</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Semester II</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each data.TableDatasEvaluasiKS.documents as cetakTabel, i}	
      <TableBodyRow>
        <TableBodyCell>{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.SemesterI}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.SemesterII}</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
 
<br/>
<Alert color="yellow">
  <span class="font-medium"> Catatan!</span>
  Data diatas akan terupdate setelah Kabupaten / Kota melakukan pengiriman laporan Evaluasi Kerjama pada formulir yang disediakan via Online. <br/>
  Data diverifikasi oleh Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara, Bagian Kerjasama, Sub. Evaluasi Kerjasama
</Alert>

</section>
<br/><br/><br/>
</div>