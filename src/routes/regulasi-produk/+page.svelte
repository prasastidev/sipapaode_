<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading } from 'flowbite-svelte';
    import { ArrowDownToBracketOutline } from 'flowbite-svelte-icons';

    function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_regulasi");
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

<br/>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Regulasi - Produk Hukum</Heading>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Biro Pemerintahan dan Otonomi Daerah<br/>
Sulawesi Tenggara <br/>Tahun 2024</Heading>
<br/><br/>

    <form class="flex items-center w-full mx-auto" style="width:100%;">   
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                </svg>
            </div>
            <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Judul Regulasi (Produk Hukum) ..." required />
        </div>
        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
        </button>
    </form>

<br/>
<table id="TABLE_regulasi" class="ArsipTable table-striped" style="width:100%;display: block;background-color: white;padding: 7px;border-radius: 8px;">
    <thead style="background:#ecf4fb;">
    <tr>
    <th style="width:5%;white-space: break-spaces;">No</th>
    <th style="width:45%;white-space: break-spaces;">Judul</th>
    <th style="width:15%;white-space: break-spaces;">Kategori</th>
    <th style="width:17%;white-space: break-spaces;">Tanggal</th>
    <th style="width:18%;white-space: break-spaces;">Lampiran</th>
    </tr>
    </thead>
    <tbody>  
    <tr>
    <td data-header="Tanggal Upload">1</td>
    <td data-header="Nama Laporan">
    Peraturan Presiden No. 38 Tahun 2015 tentang Kerjasama Pemerintah dengan Badan Usaha dalam Penyediaan Infrastruktur
    </td>
    <td>Peraturan Presiden</td>
    <td>20 December 2021</td>
    <td data-header="Unduh" style="color:#3f83f8;"> 
     <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> Download
    </td>
    </tr>
    <tr>
    <td data-header="Tanggal Upload">2</td>
    <td data-header="Nama Laporan">
    Peraturan Pemerintah No. 28 Tahun 2018 tentang Kerja Sama Daerah
    <td>Peraturan Pemerintah</td>
    <td>14 December 2021</td>
    <td data-header="Unduh" style="color:#3f83f8;"> 
     <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> Download
    </td>
    </tr>
    <tr>
    <td data-header="Tanggal Upload">3</td>
    <td data-header="Nama Laporan">
    Peraturan Pemerintah No.13 Tahun 2019 tentang Laporan dan Evaluasi Penyelenggaraan Pemerintahan Daerah
    </td>
    <td>Peraturan Pemerintah</td>
    <td>13 December 2021</td>
    <td data-header="Unduh" style="color:#3f83f8;"> 
    <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> Download
    </td>
    </tr>
    <tr>
    <td data-header="Tanggal Upload">4</td>
    <td data-header="Nama Laporan">
    Undang-Undang No. 9 Tahun 2015 tentang Perubahan Kedua atas Undang-Undang No. 23 Tahun 2014 tentang Pemerintahan Daerah
    </td>
    <td>Undang-Undang</td>
    <td>28 December 2021</td>
    <td data-header="Unduh" style="color:#3f83f8;"> 
     <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> Download
    </td>
    </tr>
    </tbody>
    </table>
<br/>Total Entries: 4 Baris<br/><br/>
</div>

<style>
    table {
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #ddd;
    }
    
    th, td {
      text-align: left;
      padding: 16px;
      vertical-align: top;
    }
    
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    
</style>