<script>
    /** @type {import('./$types').PageData} */

    import { Heading, Button, Chart, Modal, Textarea, Radio, Alert, FloatingLabelInput, Card,Indicator, Badge, GradientButton, Tooltip } from 'flowbite-svelte';
    import { ArrowDownToBracketOutline, BuildingSolid } from 'flowbite-svelte-icons';
    import TataCaraKerjasama from '$lib/documents/Peraturan-Menteri-Dalam-Negeri-No-22-Tahun-2020.pdf';
  
    let ModalFormulir = false;

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
      table = document.getElementById("TABLE_KSAPD");
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

export let data=[];

let OnlineKSpemerintahdaerahkl  = data.TableDatasLayananOnline.documents[8];

</script>



<svelte:head>
	<title>Kerjasama antar Pemerintah Daerah dan K/L</title>
	<meta name="description" content="Kerjasama antar Pemerintah Daerah dan K/L" />
</svelte:head>

<br/><br/> 

<Modal title="Formulir Permohonan dan Pengajuan Kerjasama" bind:open={ModalFormulir}  autoclose={false}>
  <form class="space-y-6" method="post" >
    <h2 style="font-weight:600;margin-bottom:8px;color:green;">Silahkan Isi data Formulir di bawah berikut:</h2>
   <label class="text-sm">Kategori Kerjasama:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="kategoriKS" class="p-3" value="Kerjasama Pihak Ketiga / Swasta" disabled>Kerjasama Pihak Ketiga / Swasta</Radio></li>
      <li class="w-full"><Radio name="kategoriKS" class="p-3" value="Kerjasama Antar Pemerintah Daerah dan K/L" checked>Kerjasama Antar Pemerintah Daerah dan K/L</Radio></li>
      <li class="w-full"><Radio name="kategoriKS" class="p-3" value="Kerjasama dengan Pihak Asing / Luar Negeri" disabled>Kerjasama dengan Pihak Asing / Luar Negeri</Radio></li>
    </ul>  
    <FloatingLabelInput style="filled" id="namaOPD" name="namaOPD" type="text">
      Nama:
    </FloatingLabelInput>
    <FloatingLabelInput style="filled" id="subjekKS" name="subjekKS" type="email">
      Email:
    </FloatingLabelInput>
    <FloatingLabelInput style="filled" id="subjekKS" name="subjekKS" type="text">
      Contact Person:
    </FloatingLabelInput>
    <FloatingLabelInput style="filled" id="No_kerjasama" name="No_kerjasama" type="text">
      Instansi:
    </FloatingLabelInput>
    <FloatingLabelInput style="filled" id="namaOPD" name="namaOPD" type="text">
      Tentang:
    </FloatingLabelInput>
    <Textarea id="tentangKS" placeholder="Catatan" rows="2" name="tentangKS" />
    <div>
      <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Kirim Permohonan</button>
    </div>     
  </form>  
  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalFormulir = !ModalFormulir} >Batal</Button>
  </svelte:fragment>
</Modal>


<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Kerjasama antar Pemerintah Daerah dan K/L</Heading>
<br/>
Pengajuan permohonan kerjasama antar Pemerintah Daerah dan K/L dapat dilakukan baik melalui <Badge color="yellow" rounded><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge> kantor biro pemerintahan dan otonomi daerah Sulawesi tenggara  {#if OnlineKSpemerintahdaerahkl.Status_raw } ataupun melalui online <Badge color="green" rounded><Indicator color="green" size="xs" class="me-1" />Via Online</Badge>  {/if} dengan mengisi formulir pada link di bawah berikut.
<br/><br/>
{#if !OnlineKSpemerintahdaerahkl.Status_raw }
<Alert color="yellow">
  <span class="font-medium"> Mohon maaf!</span>
  sehubungan dengan padatnya formulir pengajuan Kerjasama melalui online, dan untuk menjaga status server tetap stabil, maka Pengajuan Kerjasama saat ini dapat dilakukan melalui via kantor. Terimakasih atas perhatiannya..
</Alert>
<br/><br/>
{/if}

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  {#if OnlineKSpemerintahdaerahkl.Status_raw }
  <div style="padding: 14px;border-radius: 16px;border: 4px solid green;"><Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Via Online</Badge> <br/>
    <br/> Isi melalui Formulir dibawah berikut: 
    <GradientButton id="ButtonFormulir" on:click={() => (ModalFormulir = true)} outline color="redToYellow" class="inline-flex w-64 h-12 mt-4">Formulir</GradientButton>
    <Tooltip triggeredBy="#ButtonFormulir">Formulir Pengajuan Kerjasama melalui Online</Tooltip>
    <br/><br/><br/>
    Lihat Prosedur Kerjasama hingga Approval, dapat dilihat pada link berikut:
    <br/>
    <GradientButton id="ButtonProsedur" href={ TataCaraKerjasama } outline color="redToYellow" class="inline-flex w-64 h-12 mr-4 mt-4">Baca Prosedur</GradientButton> 
    <Tooltip triggeredBy="#ButtonProsedur">Gambar Alur Prosedur</Tooltip>
    <GradientButton id="ButtonTatacara" href={ TataCaraKerjasama } outline color="redToYellow" class="inline-flex w-64 h-12 mr-4 mt-4">Tata Cara Kerjasama</GradientButton>
   <Tooltip triggeredBy="#ButtonTatacara">Peraturan Menteri Dalam Negeri Nomor 22 Tahun 2020</Tooltip>
<br/><br/>
  </div> 
   {/if} 
  <div style="padding: 14px;border-radius: 16px;border: 4px solid orange;"><Badge color="yellow" rounded border><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge> <br/>
  <br/> Silahkan Membawa berkas permohonan kerjasama Anda pada alamat di bawah berikut: <br/><br/>
    <div class="text-2xl font-extrabold"><BuildingSolid class="w-10 h-10 align-middle inline-flex" /> Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara <br/>
    <span class="text-lg font-normal">Kompleks Bumi Praja Anduonohu, Kecamatan Poasia, <br/>Kota Kendari, Sulawesi Tenggara 93231
    <br/>Email: </span>
    </div>
  </div>
</div>

<br/><br/>
Dibawah berikut adalah Statistik dan Data Kerjasama saat ini, antar Pemerintah Daerah dan K/L.
<br/><br/>
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

<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Data Kerjasama antar Pemerintah Daerah dan K/L</Heading>
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

<table id="TABLE_KSAPD" class="ArsipTable table-striped" style="width:100%;display:block;overflow-wrap: anywhere;background-color: white;padding: 7px;border-radius: 8px;">
    <thead style="background:#ecf4fb;">
    <tr>
    <th style="width:6%;white-space: break-spaces;" class="hidekolom">No</th>
    <th style="width:8%;white-space: break-spaces;" class="hidekolom">Jenis</th>
    <th style="width:32%;white-space: break-spaces;">Subjek</th>
    <th style="width:15%;white-space: break-spaces;" class="hidekolom">Hal</th>
    <th style="width:15%;white-space: break-spaces;">Mitra</th>
    <th style="width:10%;white-space: break-spaces;" class="hidekolom">Tanggal Mulai</th>
    <th style="width:10%;white-space: break-spaces;" class="hidekolom">Tanggal Selesai</th>
    <th style="width:4%;white-space: break-spaces;">Doc</th>
    </tr>
    </thead>
    <tbody>  
    <tr>
    <td class="hidekolom">1</td>
    <td class="hidekolom">PKS</td>
    <td>
    Peraturan Presiden No. 38 Tahun 2015 tentang Kerjasama Pemerintah dengan Badan Usaha dalam Penyediaan Infrastruktur
    </td>
    <td class="hidekolom">Tentang sdfskjdfksjk sdjfksj dfkjksdjfkjsdf </td>
    <td>PT Antara Jaya</td>
    <td class="hidekolom">20 December 2021</td>
    <td class="hidekolom">22 December 2021</td>
    <td style="color:#3f83f8;"> 
     <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> 
    </td>
    </tr>
    <tr>
    <td class="hidekolom">2</td>
    <td class="hidekolom">PKS</td>
    <td>Peraturan Presiden No. 38 Tahun 2015 tentang Kerjasama Pemerintah dengan Badan Usaha dalam Penyediaan Infrastruktur
    </td>
    <td class="hidekolom">Tentang sdfskjdfksjk sdjfksj dfkjksdjfkjsdf </td>
    <td>PT Samdoria</td>
    <td class="hidekolom">20 December 2021</td>
    <td class="hidekolom">22 December 2021</td>
    <td style="color:#3f83f8;"> 
     <ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> 
    </td>
    </tr>

    </tbody>
    </table>
  <br/> Total Entries: 2 Baris <br/><br/>
  <span style="color:#a75710;"> //** Data diatas merupakan Tabel kerjasama antar Pemerintah Daerah dan K/L .</span> <br/><br/>
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

    @media screen and (max-width:767px) {
		.hidekolom {
			display:none;
		}
	}
    
</style>