<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Chart, Card } from 'flowbite-svelte';
    import { ArrowDownToBracketOutline } from 'flowbite-svelte-icons';
  
    const options = {
    series: [52.8, 36.8, 10.4],
    colors: ['#1C64F2', '#16BDCA', '#9061F9'],
    chart: {
      height: 420,
      width: '100%',
      type: 'pie'
    },
    stroke: {
      colors: ['white'],
      lineCap: ''
    },
    plotOptions: {
      pie: {
        labels: {
          show: true
        },
        size: '100%',
        dataLabels: {
          offset: -25
        }
      }
    },
    labels: ['Kerjasama Telah Berakhir', 'Kerjasama Aktif', 'Kerjasama Baru'],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  };

  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_KSLN");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
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
	<title>Kerjasama dengan pihak asing / luar negeri</title>
	<meta name="description" content="Kerjasama dengan pihak asing / luar negeri" />
</svelte:head>

<br/><br/> 

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Kerjasama Dengan Pihak Asing / Luar Negeri</Heading>
<br/>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Statistik</Heading>
<br/>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    <div>
        <Card class="w-full max-w-lg">
            <div class="flex justify-between items-start w-full">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Statistik</h5>          
            </div>
          <Chart {options} class="py-6" />
          </Card>
    </div>

     <div>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Baru (2 Bulan Terakhir)</h5>
			<p  id="count1" class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">111.222</p>
        </Card> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Aktif Hingga Saat ini</h5>
			<p  id="count2" class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">111.222</p>
        </Card> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Telah Berakhir</h5>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">111.222</p>
        </Card> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Kerjasama</h5>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">111.222</p>
        </Card> <br/>
    </div>
</div> <br/><br/>

<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Data Kerjasama dengan Pihak Asing / Luar Negeri</Heading>
<br/>Silahkan Cari Nama Mitra pada Kolom Pencarian di Bawah berikut : <br/><br/>
<form class="flex items-center w-full mx-auto" style="width:100%;">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Nama Mitra Kerjasama ..." required />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>

<br/>

<table id="TABLE_KSLN" class="ArsipTable table-striped" style="width:100%;display: block;background-color: white;padding: 7px;border-radius: 8px;">
    <thead style="background:#ecf4fb;">
    <tr>
    <th style="width:2%;white-space: break-spaces;">No</th>
    <th style="width:3%;white-space: break-spaces;">Jenis Kerjasama</th>
    <th style="width:40%;white-space: break-spaces;">Subjek</th>
    <th style="width:15%;white-space: break-spaces;">Hal</th>
    <th style="width:15%;white-space: break-spaces;">Mitra</th>
    <th style="width:10%;white-space: break-spaces;">Tanggal Mulai</th>
    <th style="width:10%;white-space: break-spaces;">Tanggal Selesai</th>
    <th style="width:5%;white-space: break-spaces;">Doc</th>
    </tr>
    </thead>
    <tbody>  
    <tr>
    <td>1</td>
    <td>PKS</td>
    <td>
    Peraturan Presiden No. 38 Tahun 2015 tentang Kerjasama Pemerintah dengan Badan Usaha dalam Penyediaan Infrastruktur
    </td>
    <td>Tentang sdfskjdfksjk sdjfksj dfkjksdjfkjsdf </td>
    <td>PT Antara Jaya</td>
    <td>20 December 2021</td>
    <td>22 December 2021</td>
    <td style="color:#3f83f8;"> 
     <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> 
    </td>
    </tr>
    <tr>
    <td>2</td>
    <td>PKS</td>
    <td>Peraturan Presiden No. 38 Tahun 2015 tentang Kerjasama Pemerintah dengan Badan Usaha dalam Penyediaan Infrastruktur
    </td>
    <td>Tentang sdfskjdfksjk sdjfksj dfkjksdjfkjsdf </td>
    <td>PT Samdoria</td>
    <td>20 December 2021</td>
    <td>22 December 2021</td>
    <td style="color:#3f83f8;"> 
     <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> 
    </td>
    </tr>
    <tr>
    <td>3</td>
    <td>PKS</td>
    <td>Peraturan Presiden No. 38 Tahun 2015 tentang Kerjasama Pemerintah dengan Badan Usaha dalam Penyediaan Infrastruktur
    </td>
    <td>Tentang sdfskjdfksjk sdjfksj dfkjksdjfkjsdf </td>
    <td>Akademi Pemasyarakatan</td>
    <td>20 December 2021</td>
    <td>22 December 2021</td>
    <td style="color:#3f83f8;"> 
    <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> 
    </td></tr>

    </tbody>
    </table>
  <br/> Total Entries: 3 Baris <br/><br/>
  <span style="color:#a75710;"> //** Data diatas merupakan Tabel kerjasama dengan Pihak Asing / Luar Negeri .</span> <br/><br/>
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