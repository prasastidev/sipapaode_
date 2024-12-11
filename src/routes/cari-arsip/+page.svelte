<script>
import { FileDocOutline } from 'flowbite-svelte-icons';
import { Heading } from 'flowbite-svelte';

function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_Arsip");
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
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<br/><br/><br/>

<div class="text-column">
	<Heading tag="h3" class="mb-4" customSize="text-3xl text-center font-extrabold  md:text-3xl lg:text-4xl">ARSIP LAPORAN</Heading> 
    <p>
		Dibawah berikut adalah arsip laporan, silahkan cari arsip laporan melalui kolom pencarian. Dan menekan Download untuk mengunduh file.
	</p> <br/>

    <form class="flex items-center max-w-3xl mx-auto" style="width:100%;">   
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                </svg>
            </div>
            <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Arsip Laporan ..." required />
        </div>
        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
        </button>
    </form>
    
<br/>
	
	

    <table id="TABLE_Arsip" class="ArsipTable table-striped" style="width:100%;white-space: nowrap;display: block;background-color: white;padding: 7px;border-radius: 8px;">
        <thead style="background:#ecf4fb;">
        <tr>
        <th style="width:20%;">Tanggal Upload</th>
        <th style="width:60%;">Nama Laporan</th>
        <th style="width:35%;">Unduh</th>
        </tr>
        </thead>
        <tbody>  
        <tr>
        <td data-header="Tanggal Upload">
        <label style="font-size:15px;">24 Sep, 2024 </label>
        </td>
        <td data-header="Nama Laporan">
        <h3 class="font-semibold">RENSTRA BIRO PEMERINTAHAN TAHUN 2022 </h3>
        <span>Penerbit: Biro Pemerintah</span>
        </td>
        <td data-header="Unduh" style="color:#3f83f8;"> 
         <FileDocOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />Download
        </td>
        </tr>
        
        <tr>
        <td data-header="Tanggal Upload">
        <label style="font-size:15px;">24 Sep, 2024 </label>
        </td>
        <td data-header="Nama Laporan">
        <h3 class="font-semibold">LKJIP TAHUN 2021 BIRO PEMERINTAHAN TAHUN 2023 </h3>
        <span>Penerbit: Biro Pemerintah</span>
        </td>
        <td data-header="Unduh" style="color:#3f83f8;"> 
         <FileDocOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />Download
        </td>
        </tr>
        
        <tr>
        <td data-header="Tanggal Upload">
        <label style="font-size:15px;">24 Sep, 2024 </label>
        </td>
        <td data-header="Nama Laporan">
        <h3 class="font-semibold">LKJIP TAHUN 2021 BIRO PEMERINTAHAN TAHUN 2023</h3>
        <span>Penerbit: Biro Pemerintah</span>
        </td>
        <td data-header="Unduh" style="color:#3f83f8;"> 
        <FileDocOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />Download
        </td>
        </tr>
        
        <tr>
        <td data-header="Tanggal Upload">
        <label style="font-size:15px;">24 Sep, 2024 </label>
        </td>
        <td data-header="Nama Laporan">
        <h3 class="font-semibold">LPPD TAHUN 2023</h3>
        <span>Penerbit: Biro Pemerintah</span>
        </td>
        <td data-header="Unduh" style="color:#3f83f8;"> 
         <FileDocOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />Download
        </td>
        </tr>
        </tbody>
        </table>
        <p>
            The page you're looking at is purely static HTML
        </p>
    
	
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
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

</style>