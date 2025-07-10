<script>
    /** @type {import('./$types').PageData} */
   import { Heading, StepIndicator, Indicator, Toast, Avatar, Button, Chart, Modal, Select, Fileupload, Textarea, Radio, Alert, FloatingLabelInput, Checkbox, Card, Badge, GradientButton, Tooltip } from 'flowbite-svelte';
    import { ArrowDownToBracketOutline, BuildingSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
    import TataCaraKerjasama from '$lib/documents/Peraturan-Menteri-Dalam-Negeri-No-22-Tahun-2020.pdf';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
	  import { addTableData } from '$lib/crudPengajuanKSOnline.js';
    import { v4 as uuidv4 } from "uuid";

let uuid = "";
let uuidLampiran1 = "";
let uuidLampiran2 = "";
let uuidLampiran3 = "";

   let defaultStatus = "Proses Pengajuan";
   let defaultEstimasi = "3-5 Hari";

    let ModalFormulir = false;
    let ModalProsedure = false;
    let ButtonKirimPengajuan = false;
    let toastStatus = false;
    let counter = 6;
    let isSubmitting = false; // Tambahkan state untuk loading

  export let data=[];

  let OnlineKSpemerintahdaerahkl  = data.TableDatasLayananOnline.documents[8];
  let KSAktif, KSAktifBaru, KSTelahBerakhir, KSTotal;
  
   KSAktif = data.TableDataKSAntarPemerintah_Berlaku.total;      
   KSAktifBaru = 0;
   KSTotal = data.TableDataKSAntarPemerintah.total;
   KSTelahBerakhir = KSTotal - KSAktif ;

   let selectListProvinsi = 'Sulawesi Tenggara';
let ListProvinsi = [
    { value: 'Aceh', name: 'Aceh' },
    { value: 'Bali', name: 'Bali' },
    { value: 'Banten', name: 'Banten' },
    { value: 'Bengkulu', name: 'Bengkulu' },
    { value: 'Daerah Istimewa Yogyakarta', name: 'Daerah Istimewa Yogyakarta' },
    { value: 'Daerah Khusus Ibukota Jakarta', name: 'Daerah Khusus Ibukota Jakarta' },
    { value: 'Gorontalo', name: 'Gorontalo' },
    { value: 'Jambi', name: 'Jambi' },
    { value: 'Jawa Barat', name: 'Jawa Barat' },
    { value: 'Jawa Tengah', name: 'Jawa Tengah' },
    { value: 'Jawa Timur', name: 'Jawa Timur' },
    { value: 'Kalimantan Barat', name: 'Kalimantan Barat' },
    { value: 'Kalimantan Selatan', name: 'Kalimantan Selatan' },
    { value: 'Kalimantan Tengah', name: 'Kalimantan Tengah' },
    { value: 'Kalimantan Timur', name: 'Kalimantan Timur' },
    { value: 'Kalimantan Utara', name: 'Kalimantan Utara' },
    { value: 'Kepulauan Bangka Belitung', name: 'Kepulauan Bangka Belitung' },
    { value: 'Kepulauan Riau', name: 'Kepulauan Riau' },
    { value: 'Lampung', name: 'Lampung' },
    { value: 'Maluku', name: 'Maluku' },
    { value: 'Maluku Utara', name: 'Maluku Utara' },
    { value: 'Nusa Tenggara Barat', name: 'Nusa Tenggara Barat' },
    { value: 'Nusa Tenggara Timur', name: 'Nusa Tenggara Timur' },
    { value: 'Papua', name: 'Papua' },
    { value: 'Papua Barat', name: 'Papua Barat' },
    { value: 'Papua Barat Daya', name: 'Papua Barat Daya' },
    { value: 'Papua Pegunungan', name: 'Papua Pegunungan' },
    { value: 'Papua Selatan', name: 'Papua Selatan' },
    { value: 'Papua Tengah', name: 'Papua Tengah' },
    { value: 'Riau', name: 'Riau' },
    { value: 'Sulawesi Barat', name: 'Sulawesi Barat' },
    { value: 'Sulawesi Selatan', name: 'Sulawesi Selatan' },
    { value: 'Sulawesi Tengah', name: 'Sulawesi Tengah' },
    { value: 'Sulawesi Tenggara', name: 'Sulawesi Tenggara' },
    { value: 'Sulawesi Utara', name: 'Sulawesi Utara' },
    { value: 'Sumatera Barat', name: 'Sumatera Barat' },
    { value: 'Sumatera Selatan', name: 'Sumatera Selatan' },
    { value: 'Sumatera Utara', name: 'Sumatera Utara' },
]; 

let RadioOpsiPengajuan = "Pengajuan Baru";

// Reactive statements untuk mengubah label berdasarkan pilihan
  $: labelDokumenII = RadioOpsiPengajuan === 'Pengajuan Baru' ? 'KAK' : 'Naskah KS Sebelumnya';
  
  $: labelDokumenIII = RadioOpsiPengajuan === 'Pengajuan Baru' ? 'Draf Naskah Baru' : 
                       RadioOpsiPengajuan === 'Perpanjangan' ? 'Draf Perpanjangan' : 
                       RadioOpsiPengajuan === 'Addendum' ? 'Draf Addendum' : 'Draf Naskah Baru/Perpanjangan/Addendum';

    const options = {
    series: [KSTelahBerakhir , KSAktif, KSAktifBaru],
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

  const addDataFormtoTable = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    isSubmitting = true;
    
    try {
        // Generate UUIDs untuk setiap file
        uuidLampiran1 = uuidv4();
        uuidLampiran2 = uuidv4();
        uuidLampiran3 = uuidv4();
        
        const formEl = e.target;
        const formData = new FormData(formEl);
        
        // Get file elements
        const fileLampiran1 = document.getElementById('uploadDocDraftKSI').files[0];
        const fileLampiran2 = document.getElementById('uploadDocDraftKSII').files[0];
        const fileLampiran3 = document.getElementById('uploadDocDraftKSIII').files[0];
        
        // Validasi file
        if (!fileLampiran1 || !fileLampiran2 || !fileLampiran3) {
            alert('Semua lampiran file harus diupload');
            isSubmitting = false;
            return;
        }
        
        // Upload files ke storage bucket secara paralel
        const uploadPromises = [
            storage.createFile('674fa666003b4eb41eea', uuidLampiran1, fileLampiran1),
            storage.createFile('674fa666003b4eb41eea', uuidLampiran2, fileLampiran2),
            storage.createFile('674fa666003b4eb41eea', uuidLampiran3, fileLampiran3)
        ];
        
        const uploadResults = await Promise.all(uploadPromises);
        
        console.log('Upload results:', uploadResults);
        
        // Masukkan data ke database dengan ID file yang sudah diupload
        await addTableData(
            formData.get('Kategory_KS'),
            formData.get('nama'),
            formData.get('email'),
            formData.get('ContactPerson'),
            formData.get('Instansi'),
            formData.get('Tentang'),
            formData.get('Catatan'),
            defaultStatus,
            defaultEstimasi,
            formData.get('posisi'),
            formData.get('Kota'),
            formData.get('Provinsi'),
            formData.get('OpsiPengajuan'),
            uuidLampiran1,  // ID file lampiran 1
            uuidLampiran2,  // ID file lampiran 2
            uuidLampiran3   // ID file lampiran 3
        );
        
        // Invalidate untuk refresh data
        invalidateAll();
        
        // Reset form
        formEl.reset();
        
        // Show success notification
        toastStatus = true;
        counter = 6;
        timeout();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    } finally {
        isSubmitting = false;
    }
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

  let currentStep = 1;
 // Data untuk setiap step
  const steps = [
    {
      number: 1,
      title: "Proses Pengajuan /",
      subtitle: "Submit Dokumen",
      completed: false
    },
    {
      number: 2,
      title: "Proses",
      subtitle: "Verifikasi Doc",
      completed: false
    },
    {
      number: 3,
      title: "Penandatanganan",
      subtitle: "Naskah",
      completed: false
    },
    {
      number: '',
      title: "Perbaikan",
      subtitle: "Pengajuan",
      completed: true
    }
  ];

   // Items per page options
  let itemsPerPageOptions = [
    { value: 5, name: '5 per halaman' },
    { value: 10, name: '10 per halaman' },
    { value: 20, name: '20 per halaman' },
    { value: 50, name: '50 per halaman' }
  ];

    // Pagination - menggunakan reactive statement
  let currentPage = 1;
  let postsPerPage = 5;

// Reactive statement untuk memastikan data selalu ter-update
  $: allPosts = data.TableDataKSAntarPemerintah_Berlaku?.documents || [];
  $: totalPosts = allPosts.length;
  $: totalPages = Math.ceil(totalPosts / postsPerPage);
  $: postRangeHigh = currentPage * postsPerPage;
  $: postRangeLow = postRangeHigh - postsPerPage;


	const setCurrentPage = newPage => {
    currentPage = newPage;
  }

  // Function to handle items per page change
  const changeItemsPerPage = (newItemsPerPage) => {
    postsPerPage = newItemsPerPage;
    currentPage = 1; // Reset to first page when changing items per page
  }

  // Debug log untuk melihat jumlah data
  $: console.log('Total posts:', totalPosts, 'Current data:', allPosts.length);

 // Lihat Prosedure   
 const procedure = {
    title: "Prosedur Kerjasama",
    steps: [
      {
        title: "Formulir Kerjasama",
        description: "Pemerintah Daerah dan K/L diminta untuk melengkapi Formulir Online dan Mengupload draft Kerjasama. Ini adalah langkah awal untuk memulai kerjasama dan kolaborasi."
      },
      {
        title: "Rekap Data Usulan",
        description: "Setelah Pengisian, data usulan Anda akan direkap di Administrasi Biro Pemerintahan. Pastikan semua informasi terisi dengan benar."
      },
      {
        title: "Follow Up Kerjasama",
        description: "Biro Pemerintahan yang ditunjuk akan melakukan tindak lanjut terhadap dokumen kerjasama. Proses Penelaahan lebih lanjut akan dilakukan untuk memastikan kelancaran kerjasama." 
      },
			  {
        title: "Info dan Tindak Lanjut",
        description: "Info lebih lanjut akan dikirim via email atau kontak di Formulir. Selanjutnya akan disusun PKS untuk formalitas kerjasama." 
       }
    ]
  };

</script>



<svelte:head>
	<title>Sipapaode | Kerjasama antar Pemerintah Daerah dan K/L</title>
	<meta name="description" content="Sipapaode | Kerjasama antar Pemerintah Daerah dan K/L - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/><br/> 

<Modal title="Prosedure Kerjasama" bind:open={ModalProsedure} size="md" autoclose={false}>
  <div class="procedure">
    <h1>{procedure.title}</h1>
    {#each procedure.steps as step, i}
      <div class="step">
        <div class="step-number">{i + 1}</div>
        <div class="step-content">
          <div class="step-title">{step.title}</div>
          <div class="step-description">{step.description}</div>
        </div>
      </div>
    {/each}
  </div>
  <svelte:fragment slot="footer">
    <Button color="alternative" on:click={()=> ModalProsedure = !ModalProsedure} >Tutup</Button>
  </svelte:fragment>
</Modal>

<Modal title="Formulir Permohonan dan Pengajuan Kerjasama" bind:open={ModalFormulir} size="lg"  autoclose={false}>
  <form class="space-y-6" on:submit={addDataFormtoTable} >
    <h2 style="font-weight:600;margin-bottom:8px;color:green;">Silahkan mengisi data Formulir dengan lengkap di bawah berikut:</h2>
    Pengiriman Dokumen Pengajuan Kerjasama dilakukan melalui formulir ini, Pastikan untuk mengisi setiap bagian dengan tepat. Siapkan semua dokumen yang akan dilampirkan sebelum mengirim pengajuan.
    <StepIndicator {currentStep} {steps} />
    <div class="pageFormulir" class:show={pageForm === 1}>
    <label class="text-sm">Kategori Kerjasama:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="Kategory_KS" class="p-3" value="Kerjasama Antar Pemerintah Daerah dan K/L" checked>Kerjasama Antar Pemerintah Daerah dan K/L</Radio></li>
    </ul>  <br/>
   <FloatingLabelInput style="filled" id="nama" name="nama" type="text" required>
      *Nama Lengkap:
    </FloatingLabelInput> <br/>
     <FloatingLabelInput style="filled" id="posisi" name="posisi" type="text" required>
      *Posisi:
    </FloatingLabelInput> <br/>
     <FloatingLabelInput style="filled" id="Instansi" name="Instansi" type="text" required>
      *Instansi:
    </FloatingLabelInput> <br/>
    <div style="width:100%;">
      <div style="float:left;width:48%;">
    <FloatingLabelInput style="filled" id="email" name="email" type="email" required>
      *Email:
    </FloatingLabelInput></div> 
    <div style="float:right;width:48%;">
    <FloatingLabelInput style="filled" id="ContactPerson" name="ContactPerson" type="text">
      Contact Person:
    </FloatingLabelInput> 
    </div><div style="clear:both;"></div>
    </div><br/>
    <FloatingLabelInput style="filled" id="Kota" name="Kota" type="text" required>
      *Kota/Kabupaten:
    </FloatingLabelInput><br/>
    <span style="font-size:14px;">Provinsi*</span>
    <Select class="mt-2" items={ListProvinsi} name="Provinsi" bind:value={selectListProvinsi} required />
    <br/>
    </div>
    <div class="pageFormulir" class:show={pageForm === 2}>
    <label class="text-sm" style="color:black;">Silahkan isi tentang perihal kerjasama:</label>
     <FloatingLabelInput style="filled" id="Tentang" name="Tentang" type="text" required>
      *Tentang (Perihal Kerjasama):
    </FloatingLabelInput> <br/>
    <label class="text-sm" style="color:black;">Pilih Jenis Pengajuan Kerjasama:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio bind:group={RadioOpsiPengajuan} name="OpsiPengajuan" class="p-3" value="Pengajuan Baru">Pengajuan Baru</Radio></li>
      <li class="w-full"><Radio bind:group={RadioOpsiPengajuan} name="OpsiPengajuan" class="p-3" value="Perpanjangan">Perpanjangan</Radio></li>
      <li class="w-full"><Radio bind:group={RadioOpsiPengajuan} name="OpsiPengajuan" class="p-3" value="Addendum">Perubahan / Addendum</Radio></li>
    </ul>  <br/>
    <div class="mb-6">
      <label class="text-sm" style="color:black;">*Upload Dokumen LAMPIRAN I: Surat Permohonan (.pdf)</label><br/>
      <Fileupload class="mb-2" name="UploadDokumenI" id="uploadDocDraftKSI" required />
    </div>

    <div class="mb-6">
      <label class="text-sm" style="color:black;">*Upload Dokumen LAMPIRAN II: {labelDokumenII} (.pdf)</label><br/>
      <Fileupload class="mb-2" name="UploadDokumenII" id="uploadDocDraftKSII" required />
    </div>

    <div class="mb-6">
      <label class="text-sm" style="color:black;">*Upload Dokumen LAMPIRAN III: {labelDokumenIII} (.doc)</label><br/>
      <Fileupload class="mb-2" name="UploadDokumenIII" id="uploadDocDraftKSIII" required />
    </div>
    <Textarea id="Catatan" placeholder="Catatan (Optional)" rows="2" name="Catatan" /> <br/><br/>
    <Checkbox bind:checked={ButtonKirimPengajuan} class="inline-block text-sky-700">Periksa kembali setiap bagian formulir telah di isi dengan lengkap. Semua Informasi dan Dokumen yang dilampirkan dan akan dikirim melalui Form ini telah sesuai, dan bersedia untuk menerima  konfirmasi melalui email sehubungan dengan pengajuan Kerjasama.</Checkbox>
    <br/><br/>
    <div>
      <Button 
        disabled={!ButtonKirimPengajuan || isSubmitting} 
        type="submit" 
        value="submit" 
        class="flex w-full h-10 justify-center mb-4 rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
    </Button>
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
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Kerjasama Pemprov. Sultra dengan Pemerintah Daerah dan K/L</Heading>
<br/>
<Button color="alternative" href="/kerjasama-antar-pemerintah-daerah-kl/#statistikKerjasama" class="mb-2 mr-4 text-sm md:text-base lg:text-base" style="box-shadow:rgb(102 144 246 / 40%) 4px 8px;">► Informasi Statistik Kerjasama</Button>
<Button color="alternative" href="/kerjasama-antar-pemerintah-daerah-kl/#DataKerjsamaAktif" class="mb-2 mr-4 text-sm md:text-base lg:text-base" style="box-shadow:rgb(102 144 246 / 40%) 4px 8px;">► Data Kerjasama Aktif</Button>
<Button color="alternative" href="/kerjasama-antar-pemerintah-daerah-kl/#3PengirimTerakhir" class="mb-2 mr-4 text-sm md:text-base lg:text-base" style="box-shadow:rgb(102 144 246 / 40%) 4px 8px;">► Data Pengajuan Kerjasama Saat ini</Button>
<br/><br/><br/>
  Pengajuan dokumen kerjasama antara Pemerintah Daerah dan K/L dengan Pemprov. Sultra dapat dilakukan melalui {#if OnlineKSpemerintahdaerahkl.Status_raw } <Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge> yang terdapat dibawah berikut. Pengajuan Dokumen Kerjasama juga dapat langsung diantarkan {/if} <Badge color="yellow" rounded border><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge> ke Kantor Biro Pemerintahan dan Otonomi Daerah Provinsi Sultra. <br/>
<br/>
{#if !OnlineKSpemerintahdaerahkl.Status_raw }
<Alert color="yellow">
  Sehubungan dengan Pengisian Formulir Online saat ini sedang ditutup, pengajuan dokumen Kerjasama dapat langsung diantar melalui visit kantor.
</Alert>
<br/><br/>
{/if}

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  {#if OnlineKSpemerintahdaerahkl.Status_raw }
  <div style="padding: 14px;border-radius: 16px;border: 4px solid green;"><Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge> <br/>
    <br/> Silakan mengisi formulir dibawah berikut untuk melanjutkan proses: 
    <GradientButton id="ButtonFormulir" on:click={() => (ModalFormulir = true)} outline color="redToYellow" class="inline-flex w-full h-12 mt-4">Pengisian Formulir Kerjasama</GradientButton>
    <Tooltip triggeredBy="#ButtonFormulir">Formulir Pengajuan Kerjasama melalui Online</Tooltip>
    <br/><br/><br/>
    Baca Prosedur dan Peraturan Menteri Dalam Negeri di bawah berikut.
    <br/>
    <GradientButton id="ButtonProsedur" on:click={() => (ModalProsedure = true)} outline color="redToYellow" class="inline-flex w-full h-12 mr-4 mt-4">Lihat Prosedur</GradientButton> 
    <Tooltip triggeredBy="#ButtonProsedur">Alur Prosedur</Tooltip>
    <GradientButton id="ButtonTatacara" href={ TataCaraKerjasama } outline color="redToYellow" class="inline-flex w-full h-12 mr-4 mt-4">Peraturan Menteri Dalam Negeri</GradientButton>
   <Tooltip triggeredBy="#ButtonTatacara">Peraturan Menteri Dalam Negeri Nomor 22 Tahun 2020</Tooltip>
<br/><br/>
  </div> 
   {/if} 
  <div style="padding: 14px;border-radius: 16px;border: 4px solid orange;"><Badge color="yellow" rounded border><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge> <br/>
  <br/> Silakan membawa berkas dokumen permohonan kerjasama Anda ke alamat di bawah berikut. <br/><br/>
    <div class="text-2xl font-extrabold"><BuildingSolid class="w-10 h-10 align-middle inline-flex" /> Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara <br/>
    <br/><span class="text-lg font-normal">Kompleks Bumi Praja Anduonohu, Kecamatan Poasia, <br/>Kota Kendari, Sulawesi Tenggara 93231
    </span>
    </div>
  </div>
</div>

<br/><br/><br/>
<Heading id="statistikKerjasama" tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">⮞ Data Statistik (Thn: ) </Heading>
Berikut dibawah ini adalah data Informasi Statistik tentang Kerjasama antara Pemerintah Prov. Sulawesi Tenggara dengan Pemerintah Daerah dan K/L.
<br/><br/>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    <div>
        <Card class="w-full max-w-lg">
            <div class="flex justify-between items-start w-full">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Statistik Kerjasama Antar Pemerintah dan K/L</h5>          
            </div>
          <Chart {options} class="py-6" />
          </Card>
    </div>

     <div>
        <!-- <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Aktif Baru (1 Bulan Terakhir)</h5>
			<p  id="count1" class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{KSAktifBaru}</p>
        </Card> --> <br/>
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
<br/>
<Heading id="DataKerjsamaAktif" tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">⮞ Data Kerjasama Aktif Sampai dengan Saat ini</Heading>
<br/>
{#if data.TableDataKSAntarPemerintah_Berlaku.total === 0}
<p>No TableDatas yet.</p>
{:else}
<p>Saat ini, terdapat  {data.TableDataKSAntarPemerintah_Berlaku.total} data kerjasama aktif antara Pemerintah Daerah dan K/L dengan Pemerintah Prov. Sulawesi Tenggara.</p>
{/if}
<br/>
Dibawah berikut adalah table informasi data Kerjasama Aktif antara Pemerintah Prov. Sulawesi Tenggara dengan Pemerintah Daerah dan K/L. Silahkan mencari nama mitra pada kolom pencarian yang terdapat di atas table. <br/><br/>
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

<!-- Pagination dengan Items per Page -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <!-- Items per page selector -->
        <div class="flex items-center gap-2">
            <label for="items-per-page" class="font-medium text-gray-700">Show:</label>
            <Select 
                id="items-per-page"
                items={itemsPerPageOptions} 
                bind:value={postsPerPage}
                on:change={() => changeItemsPerPage(postsPerPage)}
                class="w-auto min-w-[140px]"
            />
        </div>

        <!-- Pagination -->
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
          <li class:active={currentPage}><span>{currentPage}</span></li>
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
    </div>
     
    <span style="margin-left: 6px; margin-top: 5px;display: block;">
       Halaman {currentPage} dari {totalPages} | Menampilkan {Math.min(postRangeLow + 1, totalPosts)}-{Math.min(postRangeHigh, totalPosts)} dari {totalPosts} data
     </span>
<br/>
<section>
  <table id="TABLE_KSAPD" class="ArsipTable table-striped" style="width:100%;display:block;overflow-wrap: anywhere;background-color: white;padding: 7px;border-radius: 8px;">
    <thead style="background:#ecf4fb;">
    <tr>
    <th style="width:6%;white-space: break-spaces;" class="hidekolom">No</th>
    <th style="width:8%;white-space: break-spaces;" class="hidekolom">Jenis</th>
    <th style="width:32%;white-space: break-spaces;">Subjek</th>
    <th style="width:15%;white-space: break-spaces;" class="hidekolom">Tentang</th>
    <th style="width:15%;white-space: break-spaces;">Mitra</th>
    <th style="width:10%;white-space: break-spaces;" class="hidekolom">Tanggal Mulai</th>
    <th style="width:10%;white-space: break-spaces;" class="hidekolom">Tanggal Selesai</th>
    
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
   
    </tr>
    {/if}
    {/each}
    </tbody>
    </table> 
</section> 
<!-- Pagination bawah dengan Items per Page -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <!-- Items per page selector -->
            <div class="flex items-center gap-2">
                <label for="items-per-page-bottom" class="font-medium text-gray-700">Show:</label>
                <Select 
                    id="items-per-page-bottom"
                    items={itemsPerPageOptions} 
                    bind:value={postsPerPage}
                    on:change={() => changeItemsPerPage(postsPerPage)}
                    class="w-auto min-w-[140px]"
                />
            </div>
 
            <!-- Pagination -->
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
              <li class:active={currentPage}><span>{currentPage}</span></li>
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
        </div>
         
        <span style="margin-left: 6px; margin-top: 5px;display: block;">
           Halaman {currentPage} dari {totalPages} | Menampilkan {Math.min(postRangeLow + 1, totalPosts)}-{Math.min(postRangeHigh, totalPosts)} dari {totalPosts} data
         </span>
 <br/>
<span style="color:#a75710;"> //** Data diatas merupakan Tabel kerjasama antar Pemerintah Daerah dan K/L .</span> <br/>
<br/>
<Heading id="3PengirimTerakhir" tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">⮞ Data Pengajuan Dokumen Kerjasama Saat ini</Heading>
<br/>
Dibawah berikut adalah Tahapan Pengajuan Kerjasama dengan Pemerintah Prov. Sulawesi Tenggara.
<br/><br/>
<div class="flex justify-center w-full">
   <div class="process-flow-container">
  <div class="process-flow">
    {#each steps as step, index}
      <div class="step-wrapper">
        <!-- Circle Step -->
        <div class="step-circle" class:completed={step.completed}>
          <span class="step-number">{step.number}</span>
        </div>
        
        <!-- Step Label -->
        <div class="step-label">
          <div class="step-title">{step.title}</div>
          <div class="step-subtitle">{step.subtitle}</div>
        </div>
        
        <!-- Arrow (tidak ditampilkan untuk step terakhir) -->
        {#if index < steps.length - 1}
          <div class="arrow">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
              <path d="M0 10L50 10M45 5L50 10L45 15" stroke="#5B7FBF" stroke-width="2"/>
            </svg>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div> 
</div> <br/>Data Dibawah berikut adalah Data 10 Pengajuan Kerjasama Terakhir.
<br/><br/>
<table style="width:100%;display:block;overflow-wrap: anywhere; background: linear-gradient(147deg, rgb(255, 255, 255) 4%, rgb(229 232 235) 99%, rgb(226, 237, 255) 100%, rgb(229, 231, 235) 100%);color:#2c526f;padding: 2px;border-radius: 8px;">
  <thead>
  <tr style="border-bottom: 1px solid white;background: linear-gradient(147deg, rgba(255, 255, 255, 1) 4%, rgb(171 196 215) 99%, rgba(226, 237, 255, 1) 100%, rgba(229, 231, 235, 1) 100%);">
  <th style="width:5%;white-space: break-spaces;padding:6px;color:#94adbf;" class="hidekolom">No</th>
  <th style="width:18%;white-space: break-spaces;padding:6px;color:#94adbf;">Nama</th>
  <th style="width:10%;white-space: break-spaces;padding:6px;">Tanggal Pengajuan</th>
  <th style="width:15%;white-space: break-spaces;padding:6px;" class="hidekolom">Jenis Kerjasama</th>
  <th style="width:12%;white-space: break-spaces;padding:6px;" class="hidekolom">Kategori</th>
  <th style="width:16%;white-space: break-spaces;padding:6px;">Status Tahapan</th>
  <th style="width:14%;white-space: break-spaces;padding:6px;" class="hidekolom">Estimasi Proses</th>
  </tr>
  </thead>
  <tbody> 
    {#each data.TableDataPengajuanTerakhir.documents as cetakTabel, i}	 
  <tr style="border-bottom: 1px solid white;">
  <td class="hidekolom" style="padding:14px 6px;"><span>{i+1}</span></td>
  <td style="padding:14px 6px;display:flex;"><Avatar class="grid mr-4" border /> <span><b>{cetakTabel.Instansi}</b><br/>{cetakTabel.Nama}  </span></td>
  <td style="padding:14px 6px;"><span>{cetakTabel.$updatedAt.slice(0, 10)}</span></td>
  <td class="hidekolom" style="padding:14px 6px;"><span>{cetakTabel.OpsiPengajuan}</span></td>
  <td class="hidekolom" style="padding:14px 6px;"><span>{cetakTabel.Kategory_KS}</span></td>
  <td style="padding:14px 4px;"><Badge color={
    cetakTabel.Status === "Proses Pengajuan" ? "yellow" :
    cetakTabel.Status === "Proses Verifikasi" ? "blue" :
    cetakTabel.Status === "Penandatanganan Naskah" ? "green" :
    cetakTabel.Status === "Ditolak" ? "red" : "gray"
    } 
    border>{cetakTabel.Status}</Badge></td>
  <td class="hidekolom" style="padding:14px 6px;">{cetakTabel.Estimasi} Kerja</td>
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

 ul.paginationTable {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin: 20px 0;
 }
 
 ul.paginationTable li {
  display: inline-block;
  padding: 8px 12px;
  border: 2px solid #e0e2e7;
  border-radius: 8px;
  background: #fcfcfc;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 40px;
  text-align: center;
 }
 
 ul.paginationTable li:hover {
  background: #e6f0ff;
  border-color: #2196f3;
  transform: translateY(-1px);
 }
 
 ul.paginationTable li.active {
  background: #2196f3 !important;
  color: white;
  border-color: #2196f3;
  font-weight: bold;
 }
 
 ul.paginationTable li.active:hover {
  background: #1976d2 !important;
  border-color: #1976d2;
 }
 
 /* Responsive pagination */
 @media (max-width: 768px) {
  ul.paginationTable li {
    padding: 6px 10px;
    font-size: 14px;
    min-width: 35px;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .flex-col > * {
    width: 100%;
    justify-content: center;
  }
 }
 
 /* Search input enhancements */
 #simple-search:focus {
  outline: none;
  ring: 2px;
  ring-color: #3b82f6;
 }

  /**   Prosedure CSS   */
  
  .step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: #46e5d9;
    color: white;
    border-radius: 50%;
    font-weight: bold;
  }

  .step-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .step-title {
    font-weight: bold;
    font-size: 1.125rem;
  }

  .step-description {
    color: #4b5563;
  }   

/** Step Pengajuan */
.process-flow-container {
    width: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    background-color: #f8f9fa;
  }

  .process-flow {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 1200px;
    width: 100%;
  }

  .step-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    flex: 1;
  }

  .step-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #E8F4FD;
    border: 3px solid #90C695;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }

  .step-circle.completed {
    background-color: #90C695;
    border-color: #6B8E6B;
  }

  .step-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .step-circle.completed .step-number {
    color: white;
  }

  .step-label {
    text-align: center;
    max-width: 150px;
  }

  .step-title {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  .step-subtitle {
    font-size: 0.9rem;
    color: #666;
    text-decoration: underline;
    text-decoration-style: wavy;
    text-decoration-color: #ff6b6b;
    line-height: 1.2;
  }

  .arrow {
    position: absolute;
    top: 30px;
    right: -40px;
    z-index: 1;
  }

  .arrow svg {
    width: 60px;
    height: 20px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .process-flow-container {
      padding: 1rem;
    }
    
    .process-flow {
      flex-direction: column;
      gap: 2rem;
    }

    .step-wrapper {
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
      max-width: 400px;
    }

    .step-circle {
      margin-bottom: 0;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    .step-label {
      text-align: left;
      max-width: none;
      flex: 1;
    }

    .arrow {
      position: static;
      align-self: center;
      margin: 1rem 0;
    }

    .arrow svg {
      transform: rotate(90deg);
      width: 20px;
      height: 60px;
    }
  }

  @media (max-width: 480px) {
    .step-circle {
      width: 50px;
      height: 50px;
    }

    .step-number {
      font-size: 1.25rem;
    }

    .step-title {
      font-size: 0.9rem;
    }

    .step-subtitle {
      font-size: 0.8rem;
    }
  }

  /* Hover effects */
  .step-circle:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Animation untuk step completion */
  .step-circle {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
   

</style>