<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte';
    import { ClockOutline, FileLinesOutline } from 'flowbite-svelte-icons';



    function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_LapLPPD");
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
	<title>Laporan Penyampaian LPPD LKPJ</title>
	<meta name="description" content="Sipapaode | Laporan Penyampaian LPPD LKPJ - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>


<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Informasi Pengiriman Laporan LPPD dan LKPJ Akhir Tahun Kabupaten/Kota Sulawesi Tenggara</Heading>
<br/>

<p>
  Dokumen Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) dan Dokumen Laporan Keterangan Pertanggungjawaban (LKPJ) Kabupaten/Kota se-Provinsi Sulawesi Tenggara merupakan kewajiban tahunan sesuai amanat peraturan perundang-undangan. Pengiriman dokumen-dokumen penting ini wajib dilaksanakan setiap akhir tahun anggaran dan ditujukan langsung ke Kantor Biro Pemerintahan dan Otonomi Daerah Provinsi Sulawesi Tenggara.
</p>
<br/>
<p>
  Kelengkapan dan ketepatan waktu penyampaian laporan sangat krusial karena akan menjadi dasar bagi Pemerintah Provinsi untuk melaksanakan evaluasi kinerja penyelenggaraan pemerintahan daerah di seluruh kabupaten/kota. Oleh karena itu, di bawah ini telah disajikan Laporan Checklist Pembaruan (Update) dan Status Pengiriman Dokumen LPPD dan LKPJ Akhir Tahun yang dapat digunakan oleh Pemerintah Kabupaten/Kota se-Provinsi Sulawesi Tenggara sebagai alat monitoring dan konfirmasi. 
</p>

<section>
  {#if data.TableDatasLPPDLPKJ.total === 0}
    <p>No TableDatas yet.</p>
  {:else}
    <p>{data.TableDatasLPPDLPKJ.total} Kab/Kota Prov. Sulawesi Tenggara</p>
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

  <Table id="TABLE_LapLPPD" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
    <TableHead>
      <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">Kabupaten / Kota</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LPPD</TableHeadCell>
      <TableHeadCell style="font-size: larger;" class="py-4">LKPJ</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.TableDatasLPPDLPKJ.documents as cetakTabel, i}	
      <TableBodyRow>
        <TableBodyCell>{i+1}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><FileLinesOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Document: {cetakTabel.SLPPD} <br/><ClockOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Pengiriman: {cetakTabel.PengirimanLPPD}</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><FileLinesOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Document: {cetakTabel.SLPKJ}  <br/><ClockOutline style="display:inline-flex;vertical-align:sub;" class="w-5 h-5" /> Pengiriman: {cetakTabel.PengirimanLKPJ}</TableBodyCell>
      </TableBodyRow>
   {/each}

    </TableBody>
  </Table>
 
<br/>


</section>
<br/><br/><br/>
</div>