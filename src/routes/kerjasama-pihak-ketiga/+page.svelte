<script>
    /** @type {import('./$types').PageData} */
    import { Heading, StepIndicator, Indicator, Toast, Avatar, Button, Chart, Modal, Select, Fileupload, Textarea, Radio, Alert, FloatingLabelInput, Checkbox, Card, Badge, GradientButton, Tooltip } from 'flowbite-svelte';
    import { BuildingOutline, BuildingSolid, CheckCircleSolid, ArrowRightAltSolid } from 'flowbite-svelte-icons';
    import TataCaraKerjasama from '$lib/documents/Peraturan-Menteri-Dalam-Negeri-No-22-Tahun-2020.pdf';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
    import { addTableData } from '$lib/crudPengajuanKSOnline.js';
    import { v4 as uuidv4 } from "uuid";

    // Fungsi untuk memformat tanggal
	function formatTanggal(tanggalString) {
		// Pengaman jika tanggalnya kosong atau null
		if (!tanggalString) {
			return 'Tanggal tidak valid';
		}

		const tanggalObjek = new Date(tanggalString);

		// Opsi format tanggal
		const options = {
			day: 'numeric', // -> 27
			month: 'long', // -> Mei (bukan May)
			year: 'numeric' // -> 2026
		};

		// 'id-ID' adalah kode untuk Bahasa Indonesia 🇮🇩
		return new Intl.DateTimeFormat('id-ID', options).format(tanggalObjek);
	}

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

let OnlineKSpihakKetiga  = data.TableDatasLayananOnline.documents[9];
let KSAktif, KSAktifBaru, KSTelahBerakhir, KSTotal;
  
KSAktif = data.TableDataKSPihakKetiga_Berlaku.total;      
KSAktifBaru = 0;
KSTotal = data.TableDataKSPihakKetiga.total;
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
  $: allPosts = data.TableDataKSPihakKetiga_Berlaku?.documents || [];
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
    title: "Prosedur Kerjasama dengan Instansi Pihak Ketiga / Swasta",
    steps: [
        {
            title: "Pengisian Formulir & Unggah Dokumen 📝",
            description: "Langkah pertama adalah mengisi formulir pengajuan secara online dan mengunggah dokumen proposal Anda. Pastikan semua data yang dimasukkan sudah benar dan lengkap untuk mempercepat proses."
        },
        {
            title: "Verifikasi & Administrasi Usulan 📂",
            description: "Setelah formulir diterima, tim kami di Biro Pemerintahan akan merekapitulasi dan memverifikasi kelengkapan administrasi usulan Anda. Sistem akan secara otomatis memeriksa data yang masuk."
        },
        {
            title: "Penelaahan dan Tindak Lanjut 🔍",
            description: "Dokumen Anda akan diteruskan kepada tim terkait untuk ditelaah lebih lanjut. Pada tahap ini, kami akan menganalisis kelayakan dan potensi kerja sama yang diajukan." 
        },
        {
            title: "Informasi Hasil & Perjanjian Kerja Sama (PKS) 🤝",
            description: "Anda akan menerima informasi mengenai status pengajuan Anda melalui email atau kontak yang terdaftar. Jika usulan disetujui, langkah selanjutnya adalah penyusunan Perjanjian Kerja Sama (PKS) untuk meresmikan kolaborasi." 
        }
    ]
};
</script>



<svelte:head>
	<title>Sipapaode | Kerjasama dengan Pihak Ketiga</title>
	<meta name="description" content="Sipapaode | Kerjasama dengan Pihak Ketiga - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/>
<div class="page-container">
    <header class="info-card">
        <div class="logo">
            <img src="/LogoSultra.webp" alt="Logo Sulawesi Tenggara"/>
        </div>
        <div class="title-container">
            <h1>INFORMASI KERJASAMA PEMPROV. SULAWESI TENGGARA DENGAN</h1>
            <h2>INSTANSI PIHAK KETIGA / SWASTA</h2>
        </div>
    </header>

    <nav class="nav-container">
        <a href="/kerjasama-pihak-ketiga/#pengajuan" class="nav-button">PENGAJUAN KERJASAMA</a>
        <a href="/kerjasama-pihak-ketiga/#statistik" class="nav-button">DATA STATISTIK</a>
        <a href="/kerjasama-pihak-ketiga/#data_kerjasama" class="nav-button">DATA KERJASAMA</a>
    </nav>
</div>


<Modal title="Prosedure Kerjasama" bind:open={ModalProsedure} size="xl" autoclose={false}>
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

<Modal title="Formulir Permohonan dan Pengajuan Kerjasama" bind:open={ModalFormulir} size="xl" autoclose={false}>
  <form class="space-y-6" on:submit={addDataFormtoTable}>
    <h2 style="font-weight:600;margin-bottom:8px;color:green;">Silahkan mengisi data Formulir dengan lengkap di bawah berikut:</h2>
    Pengiriman Dokumen Pengajuan Kerjasama dilakukan melalui formulir ini, Pastikan untuk mengisi setiap bagian dengan tepat. Siapkan semua dokumen yang akan dilampirkan sebelum mengirim pengajuan.
    <StepIndicator {currentStep} {steps} />
    <div class="pageFormulir" class:show={pageForm === 1}>
    <label class="text-sm">Kategori Kerjasama:</label>
    <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio name="Kategory_KS" class="p-3" value="Kerjasama Pihak Ketiga / Swasta" checked>Kerjasama Pihak Ketiga / Swasta</Radio></li>
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
 <Heading id="pengajuan" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> PENGAJUAN KERJASAMA
  </Heading>
  <!-- <br/>
  Pengajuan dokumen kerjasama antara Pihak Ketiga/Swasta dengan Pemprov. Sultra dapat dilakukan melalui {#if OnlineKSpihakKetiga.Status_raw } <Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge> yang terdapat dibawah berikut. Pengajuan Dokumen Kerjasama juga dapat langsung diantarkan {/if} <Badge color="yellow" rounded border><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge> ke Kantor Biro Pemerintahan dan Otonomi Daerah Provinsi Sultra. <br/>
<br/> 
  -->
<p>
Bagi Pihak Ketiga/Swasta yang ingin mengajukan dokumen kerja sama dengan Pemprov Sultra, kami menyediakan dua metode. {#if OnlineKSpihakKetiga.Status_raw } Anda dapat menggunakan layanan <Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge> yang tersedia di bawah ini. Sebagai alternatif, {/if} pengajuan juga dapat dilakukan dengan <Badge color="yellow" rounded border><Indicator color="yellow" size="xs" class="me-1" />Kunjungan Langsung</Badge> ke Kantor Biro Pemerintahan dan Otonomi Daerah Provinsi Sultra.
</p> <br/>
{#if !OnlineKSpihakKetiga.Status_raw }
<Alert color="yellow">
  Sehubungan dengan Pengisian Formulir Online saat ini sedang ditutup, pengajuan dokumen Kerjasama dapat langsung diantar melalui visit kantor.
</Alert>
<br/><br/>
{/if}

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  {#if OnlineKSpihakKetiga.Status_raw }
  <div style="padding: 14px;border-radius: 16px;border: 4px solid green;"><Badge color="green" rounded border><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge> <br/>
    <br/> Silakan mengisi formulir dibawah berikut untuk melanjutkan proses: 

    <div class="w-full p-8 rounded-2xl shadow-lg border border-gray-200">
      <div on:click={() => (ModalFormulir = true)} class="flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
          <div  class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,2H14.82A3,3,0,0,0,9.18,2H5A3,3,0,0,0,2,5V20a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM12,4a1,1,0,0,1,1,1,1,1,0,0,1-1,1,1,1,0,0,1-1-1A1,1,0,0,1,12,4Zm7,16a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H7V6A1,1,0,0,0,8,7h8a1,1,0,0,0,1-1V4h2a1,1,0,0,1,1,1V20Z"/>
                    <path d="M8 12h8v2H8zM8 16h8v2H8zM8 8h8v2H8z"/>
                </svg>
            </div>
            <div>
                <h2 class="text-xl md:text-2xl font-extrabold">
                    <span class="block">Formulir Submit Dokumen</span>
                    <span class="block">Pengajuan Kerjasama</span>
                </h2>
            </div>
        </div>

        <div class="space-y-4">
            <a href="#" on:click={() => (ModalProsedure = true)} class="block text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                Baca Prosedur Kerjasama
            </a>   
            <a href={ TataCaraKerjasama } class="block text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                Baca Permendagri Tentang Kerjasama
            </a>  
             <a href="/tracking-pengajuan-kerjasama" class="block text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                Tracking Status Pengajuan Kerjasama
            </a>    
        </div>
    </div>

  </div>
  {/if}
  <div style="padding: 14px;border-radius: 16px;border: 4px solid orange;"><Badge color="yellow" rounded border><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge> <br/>
  <br/> Silakan membawa berkas dokumen permohonan kerjasama Anda ke alamat di bawah berikut. <br/><br/>
    <div class="text-2xl font-extrabold"><BuildingSolid class="w-10 h-10 align-middle inline-flex" /> Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara <br/>
    <br/><span class="text-lg font-normal">Kompleks Bumi Praja Anduonohu, Kecamatan Poasia, <br/>Kota Kendari, Sulawesi Tenggara 93231
    </span>
    </div>
  </div>
</div>
<br/><br/><br/>

 <Heading id="statistik" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> DATA STATISTIK
  </Heading>
Berikut dibawah ini adalah data Informasi Statistik tentang Kerjasama antara Pemerintah Prov. Sulawesi Tenggara dengan Instansi Pihak Ketiga/Swasta.
<br/><br/>
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
			<p class="font-semibold text-xl md:text-2xl lg:text-3xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2" style="background: aliceblue;width: fit-content;padding:2px 6px;border-radius: 6px;">{KSAktif}</p>
        </Card> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kerjasama Telah Berakhir</h5>
			<p class="font-semibold text-xl md:text-2xl lg:text-3xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2" style="background: aliceblue;width: fit-content;padding:2px 6px;border-radius: 6px;">{KSTelahBerakhir}</p>
        </Card> <br/>
        <Card class="w-full max-w-lg"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Kerjasama Aktif dan Berakhir</h5>
			<p class="font-semibold text-xl md:text-2xl lg:text-3xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2" style="background: aliceblue;width: fit-content;padding:2px 6px;border-radius: 6px;">{KSTotal}</p>
        </Card> <br/>
    </div>
</div> <br/><br/>

</div>
<br/>
<Heading id="data_kerjasama" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> DATA KERJASAMA SEDANG BERLANGSUNG DENGAN PIHAK KETIGA SAAT INI
  </Heading>

{#if data.TableDataKSPihakKetiga_Berlaku.total === 0}
<p>No TableDatas yet.</p>
{:else}
<p>Saat ini, terdapat {data.TableDataKSPihakKetiga_Berlaku.total} data kerjasama aktif antara Instansi Pihak Ketiga/Swasta dengan Pemerintah Prov. Sulawesi Tenggara. </p>
{/if}
<br/>
Dibawah berikut adalah table informasi data Kerjasama Aktif antara Pemerintah Prov. Sulawesi Tenggara dengan Instansi Pihak Ketiga/Swasta. Silahkan mencari nama mitra pada kolom pencarian yang terdapat di atas table. <br/><br/>
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

  <table id="TABLE_KSPK" class="ArsipTable table-striped" style="width:100%;display:block;overflow-wrap: anywhere;background-color: white;padding: 7px;border-radius: 8px;">
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
    <td class="hidekolom">{formatTanggal(cetakTabel.tanggalMulai.slice(0, 10))}</td>
    <td class="hidekolom">{formatTanggal(cetakTabel.tanggalSelesai.slice(0, 10))}</td>
    
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
<span style="color:#a75710;"> //** Data diatas merupakan Tabel kerjasama dengan Pihak Ketiga / Swasta .</span> <br/>

<br/>
<br/>

<style>

  /** CSS HEADER TETAP SAMA */
    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
    }
    .info-card {
        border-radius: 20px;
        padding: 0.8rem 1.2rem;
        width: 100%;
        max-width: 1220px;
        display: flex;
        align-items: center;
        gap: 2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 1.5rem;
        background-color: #f7fafc;
    }
    .logo {
        width: 90px;
        height: 90px;
        background-color: white;
        border-radius: 50%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .title-container h1, .title-container h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
        line-height: 1.3;
    }
    .nav-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        max-width: 900px;
    }
    .nav-button {
        color: var(--primary-text);
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.9rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        text-align: center;
        background: #f7fafc;
    }
    .nav-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background: #f1f9ff;
    }
    @media (max-width: 768px) {
        .info-card {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
        }
        .title-container h1, .title-container h2 {
            font-size: 1.2rem;
        }
        .nav-container {
            gap: 0.75rem;
        }
        .nav-button {
            width: 48%;
            padding: 0.75rem 0.5rem;
        }
    }

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


  /* Styling untuk multi-step form */
  .pageFormulir { display: none; }
  .pageFormulir.show { display: block; }
   
    
</style>