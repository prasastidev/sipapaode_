<script>
    /** @type {import('./$types').PageData} */
    import { Heading, StepIndicator, Toast, Avatar, Button, Chart, Modal, Fileupload, Textarea, Radio, Alert, FloatingLabelInput, Checkbox, Card, Indicator, Badge, GradientButton, Tooltip } from 'flowbite-svelte';
    import { ArrowDownToBracketOutline, BuildingSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
    import TataCaraKerjasama from '$lib/documents/Peraturan-Menteri-Dalam-Negeri-No-22-Tahun-2020.pdf';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
	  import { addTableData } from '$lib/crudPengajuanKSOnline.js';
    import { v4 as uuidv4 } from "uuid";

let uuid = "";

let ModalFormulir = false;
let ButtonKirimPengajuan = false;
let toastStatus = false;
let counter = 6;

export let data=[];


let OnlineKSpihakKetiga  = data.TableDatasLayananOnline.documents[9];
let KSAktif, KSAktifBaru, KSTelahBerakhir, KSTotal;
  
KSAktif = data.TableDataKSPihakKetiga_Berlaku.total;      
KSAktifBaru = 0;
KSTotal = data.TableDataKSPihakKetiga.total;
KSTelahBerakhir = KSTotal - KSAktif ;

  const options = {
    series: [ KSTelahBerakhir , KSAktif, KSAktifBaru],
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
    labels: ['Kerjasama Telah Berakhir', 'Kerjasama Aktif Masih Berlaku', 'Kerjasama Baru'],
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
          return value + ' Document KS';
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

  const addDataFormtoTable = async (e) => {
    uuid = uuidv4();   // generate id melalui uuid
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
    // Masukkan Data ke table melalui crudDataRekap
		await addTableData(formData.get('Kategory_KS'), formData.get('nama'), formData.get('email'), formData.get('ContactPerson'), formData.get('Instansi'), formData.get('Tentang'), formData.get('Catatan'), uuid);

    // Masukkan file ke Storage Bucket
		  const promise = storage.createFile('674fa666003b4eb41eea', uuid, document.getElementById('uploadDocDraftKS').files[0]); 
	    promise.then(function (response) {
       console.log(response); 
         }, function (error) {
          console.log(error); // Failure
           throw error;
          });

        invalidateAll();

		// Reset form
		formEl.reset();
     // Notification Toast and Time
      toastStatus = true;
      counter = 6;
      timeout();

	};

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalFormulir = false;
  }  


function DownloadFile(id) {
  const result = storage.getFileView('674e4b10003a83fb0a30', id);
	return result;
}

  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_KSPK");
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

   // Pagination 
   let currentPage =1; // Update this to simulate page change.
  let postsPerPage = 5;
  let allPosts = data.TableDataKSPihakKetiga_Berlaku.documents;
  let totalPosts = allPosts.length;
  let totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;
	const setCurrentPage = newPage => {
		currentPage = newPage;
  }

  let currentStep = 1;
  let steps = ['Langkah 1', 'Langkah 2'];

  let pageForm = 1;
    const nextPage = () => {
        pageForm++;
        currentStep = 2;
    }

    const prevPage = () => {
        pageForm--;
        currentStep = 1;
    }


</script>



<svelte:head>
	<title>Kerjasama dengan Pihak Ketiga</title>
	<meta name="description" content="Kerjasama dengan Pihak Ketiga" />
</svelte:head>

<br/><br/> 

<Modal title="Formulir Permohonan dan Pengajuan Kerjasama" bind:open={ModalFormulir}  autoclose={false}>
  <form class="space-y-6" on:submit={addDataFormtoTable}>
    <h2 style="font-weight:600;margin-bottom:8px;color:green;">Silahkan Isi data Formulir di bawah berikut:</h2>
    <StepIndicator {currentStep} {steps} />
    <div class="pageFormulir" class:show={pageForm === 1}>
    <label class="text-sm">Kategori Kerjasama:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="Kategory_KS" class="p-3" value="Kerjasama Pihak Ketiga / Swasta" checked>Kerjasama Pihak Ketiga / Swasta</Radio></li>
      <li class="w-full"><Radio name="Kategory_KS" class="p-3" value="Kerjasama Antar Pemerintah Daerah dan K/L" disabled>Kerjasama Antar Pemerintah Daerah dan K/L</Radio></li>
    </ul>  <br/>
    <FloatingLabelInput style="filled" id="nama" name="nama" type="text" required>
      *Nama:
    </FloatingLabelInput> <br/>
    <FloatingLabelInput style="filled" id="email" name="email" type="email" required>
      *Email:
    </FloatingLabelInput> <br/>
    <FloatingLabelInput style="filled" id="ContactPerson" name="ContactPerson" type="text">
      Contact Person:
    </FloatingLabelInput> <br/>
    <FloatingLabelInput style="filled" id="Instansi" name="Instansi" type="text" required>
      *Instansi:
    </FloatingLabelInput> 
    </div>
    <div class="pageFormulir" class:show={pageForm === 2}>
    <FloatingLabelInput style="filled" id="Tentang" name="Tentang" type="text" required>
      *Tentang (Perihal Kerjasama):
    </FloatingLabelInput> <br/>
    <div class="mb-6">
      <label for="" class="text-sm">*Upload Draft Dokumen Kerjasama:</label>
      <Fileupload class="mb-2" name="UploadDokumen" id="uploadDocDraftKS" required />
    </div>
    <Textarea id="Catatan" placeholder="Catatan (Optional)" rows="2" name="Catatan" /> <br/><br/>
    <Checkbox bind:checked={ButtonKirimPengajuan} class="inline-block">Dengan mengirim semua informasi yang dilampirkan, saya bersedia menerima konfirmasi melalui email dan contact person yang dilampirkan berhubungan dengan Pengajuan Kerjasama pada form ini.</Checkbox>
    <br/><br/>
    <div>
      <Button disabled={!ButtonKirimPengajuan} type="submit" value="submit" class="flex w-full h-10 justify-center mb-4 rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Kirim Pengajuan</Button>
    </div>  
   </div>   
   <Button color="alternative" pill on:click={prevPage} disabled={pageForm === 1}>Langkah 1</Button>
   <Button color="alternative" pill on:click={nextPage} disabled={pageForm === 2}>Langkah 2</Button>
  </form>  
  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalFormulir = !ModalFormulir} >Batal</Button>
    <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
      <CheckCircleSolid slot="icon" class="w-5 h-5" />
      Formulir Pengajuan Kerjasama Berhasil Dikirim. Form akan tutup dalam {counter}s.
    </Toast>
  </svelte:fragment>
</Modal>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Kerjasama Daerah dengan Pihak Ketiga / Swasta</Heading>
<br/>
<Button color="alternative" href="/kerjasama-pihak-ketiga/#statistikKerjasama" class="mb-2">Lihat Statistik Kerjasama</Button>
<Button color="alternative" href="/kerjasama-pihak-ketiga/#3PengirimTerakhir" class="mb-2">Lihat Aktivitas Pengiriman Terakhir</Button>
<Button color="alternative" href="/kerjasama-pihak-ketiga/#DataKerjsamaAktif" class="mb-2">Lihat Data Kerjasama Aktif</Button>
  <br/><br/>
Pengajuan permohonan kerjasama dengan pihak ketiga /swasta dapat dilakukan baik melalui <Badge color="yellow" rounded><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge> kantor biro pemerintahan dan otonomi daerah Sulawesi tenggara   {#if OnlineKSpihakKetiga.Status_raw }ataupun melalui online <Badge color="green" rounded><Indicator color="green" size="xs" class="me-1" />Via Online</Badge>{/if} dengan mengisi formulir pada link di bawah berikut.
<br/><br/>
{#if !OnlineKSpihakKetiga.Status_raw }
<Alert color="yellow">
  <span class="font-medium"> Mohon maaf!</span>
  sehubungan dengan padatnya formulir pengajuan Kerjasama melalui online, dan untuk menjaga status server tetap stabil, maka Pengajuan Kerjasama saat ini dapat dilakukan melalui via kantor. Terimakasih atas perhatiannya..
</Alert>
<br/><br/>
{/if}

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  {#if OnlineKSpihakKetiga.Status_raw }
  <div style="padding: 14px;border-radius: 16px;border: 4px solid green;"><Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Via Online</Badge> <br/>
    <br/> Isi melalui Formulir dibawah berikut: 
    <GradientButton id="ButtonFormulir" on:click={() => (ModalFormulir = true)} outline color="redToYellow" class="inline-flex w-full h-12 mt-4">Formulir</GradientButton>
    <Tooltip triggeredBy="#ButtonFormulir">Formulir Pengajuan Kerjasama melalui Online</Tooltip>
    <br/><br/><br/>
    Lihat Prosedur Kerjasama hingga Approval, dapat dilihat pada link berikut:
    <br/>
    <GradientButton id="ButtonProsedur" href={ TataCaraKerjasama } outline color="redToYellow" class="inline-flex w-full h-12 mr-4 mt-4">Baca Prosedur</GradientButton> 
    <Tooltip triggeredBy="#ButtonProsedur">Gambar Alur Prosedur</Tooltip>
    <GradientButton id="ButtonTatacara" href={ TataCaraKerjasama } outline color="redToYellow" class="inline-flex w-full h-12 mr-4 mt-4">Tata Cara Kerjasama</GradientButton>
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

Dibawah berikut adalah Statistik dan Data Kerjasama saat ini, antara Daerah dengan pihak Ketiga / Swasta
<br/><br/>
<Heading id="statistikKerjasama" tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Statistik </Heading>
<br/>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    <div>
        <Card class="w-full max-w-lg">
            <div class="flex justify-between items-start w-full">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Statistik Kerjasama Pihak Ketiga / Swasta </h5>          
            </div>
          <Chart {options} class="py-6" />
          </Card>
    </div>

     <div>
        <!-- <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Aktif Baru (1 Bulan Terakhir)</h5>
			<p  id="count1" class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{KSAktifBaru}</p>
        </Card>  --> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Aktif Masih Berlaku</h5>
			<p  id="count2" class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{KSAktif}</p>
        </Card> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Telah Berakhir</h5>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{KSTelahBerakhir}</p>
        </Card> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Kerjasama Aktif dan Berakhir</h5>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{KSTotal}</p>
        </Card> <br/>
    </div>
</div> <br/><br/>

</div>

<Heading  id="DataKerjsamaAktif" tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Data Kerjasama dengan Pihak Ketiga / Swasta (Aktif)</Heading>
<br/>
{#if data.TableDataKSPihakKetiga_Berlaku.total === 0}
<p>No TableDatas yet.</p>
{:else}
<p>{data.TableDataKSPihakKetiga_Berlaku.total} Data Kerjasama Aktif ditemukan</p>
{/if}

<br/>Silahkan Cari Nama Mitra Kerjasama pada Kolom Pencarian di Bawah berikut : <br/><br/>
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
  

<section>

  <table id="TABLE_KSPK" class="ArsipTable table-striped" style="width:100%;display:block;overflow-wrap: anywhere;background-color: white;padding: 7px;border-radius: 8px;">
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
    {#each allPosts as cetakTabel, i}	
    {#if i >= postRangeLow && i < postRangeHigh}
    <tr>
    <td class="hidekolom">{i+1}</td>
    <td class="hidekolom">{cetakTabel.Jenis}</td>
    <td>{cetakTabel.Subjek}</td>
    <td class="hidekolom">{cetakTabel.Tentang}</td>
    <td>{cetakTabel.Mitra}</td>
    <td class="hidekolom">{cetakTabel.tanggalMulai.slice(0, 10)}</td>
    <td class="hidekolom">{cetakTabel.tanggalSelesai.slice(0, 10)}</td>
    <td style="color:#3f83f8;"> 
      <a href={DownloadFile(cetakTabel.$id)} target="_blank"><ArrowDownToBracketOutline class="flex w-6 h-6 inline-flex items-baseline text-blue-500 dark:text-blue-500" /> </a>
    </td>
    </tr>
    {/if}
    {/each}
    </tbody>
    </table> <br/>
   
</section> 
<ul class="paginationTable" style="list-style-type: none;">
	{#if currentPage > 1}
	  <li on:click|preventDefault={() => setCurrentPage(1)}>pertama</li>
	 <li on:click|preventDefault={() => setCurrentPage(currentPage - 1)}> <span>&#8678;</span> </li>
	{/if}
  {#each [3,2,1] as i}
    {#if currentPage - i > 0}
      <li on:click|preventDefault={() => setCurrentPage(currentPage - i)}>{currentPage - i}</li>
    {/if}
  {/each}
  <li class:active={ currentPage }><span>{currentPage}</span></li>
  {#each Array(3) as _, i}
    {#if currentPage + (i+1) <= totalPages}
      <li on:click|preventDefault={() => setCurrentPage(currentPage + (i+1))}>{currentPage + (i+1)}</li>
    {/if}
  {/each}
  {#if currentPage < totalPages}
	  <li on:click|preventDefault={() => setCurrentPage(currentPage + 1)}> <span>&#8680;</span> </li>
    <li on:click|preventDefault={() => setCurrentPage(totalPages)}>terakhir</li>
  {/if}
 </ul> 
 
 <span style="margin-left: 6px; margin-top: 5px;display: block;">Halaman Aktif Page: {currentPage} </span>
 <br/>
<span style="color:#a75710;"> //** Data diatas merupakan Tabel kerjasama dengan Pihak Ketiga / Swasta .</span> <br/>

<br/>
<Heading id="3PengirimTerakhir" tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Aktifitas Pengiriman Terakhir</Heading>
<br/>
3 Aktivitas Pengiriman Terakhir
<br/><br/> 
<table style="width:100%;display:block;overflow-wrap: anywhere; background: linear-gradient(147deg, rgba(255,255,255,1) 4%, rgba(44,82,111,1) 99%, rgba(226,237,255,1) 100%, rgba(229,231,235,1) 100%);color:white;padding: 2px;border-radius: 8px;">
  <thead>
  <tr style="border-bottom: 1px solid white;background: linear-gradient(147deg, rgba(255,255,255,1) 4%, rgba(44,82,111,1) 99%, rgba(226,237,255,1) 100%, rgba(229,231,235,1) 100%);">
  <th style="width:5%;white-space: break-spaces;padding:6px;color:#94adbf;" class="hidekolom">No</th>
  <th style="width:18%;white-space: break-spaces;padding:6px;color:#94adbf;" class="hidekolom">Nama</th>
  <th style="width:12%;white-space: break-spaces;padding:6px;" class="hidekolom">Tanggal Kirim</th>
  <th style="width:25%;white-space: break-spaces;padding:6px;">Instansi</th>
  <th style="width:16%;white-space: break-spaces;padding:6px;">Status</th>
  <th style="width:14%;white-space: break-spaces;padding:6px;" class="hidekolom">Verifikasi Estimasi</th>
  </tr>
  </thead>
  <tbody> 
    {#each data.TableDataPengajuanTerakhir.documents as cetakTabel, i}	 
  <tr style="border-bottom: 1px solid white;">
  <td class="hidekolom" style="padding:4px;"><span>{i+1}</span></td>
  <td class="hidekolom" style="padding:4px;"><span><Avatar class="inline-flex" border /> {cetakTabel.Nama}</span></td>
  <td class="hidekolom" style="padding:4px;"><span> {cetakTabel.$updatedAt.slice(0, 10)}</span></td>
  <td style="padding:4px;"><span>{cetakTabel.Instansi}</span></td>
  <td style="padding:4px;"><Badge color="indigo">Proses Pengajuan</Badge></td>
  <td class="hidekolom" style="padding:4px;">3-5 hari Kerja</td>
  </tr>
  {/each}

  </tbody>
  </table> <br/><br/><br/>

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
    
    .table-striped tr:nth-child(even) {
      background-color: #f2f2f2;
    }

	@media screen and (max-width:767px) {
		.hidekolom {
			display:none;
		}
	}

  ul.paginationTable li {
    display: inline-block;
    padding: 4px 10px;
    border: 2px solid #e0e2e7;
    margin: 3px;
    border-radius: 8px;
    background: #fcfcfc;
    cursor:pointer;
	}  

  ul.paginationTable li.active {
    background: #8eb5ea !important;
    color: white;
		}
  
  .pageFormulir { display: none; }
  .pageFormulir.show { display: block; }

    
</style>