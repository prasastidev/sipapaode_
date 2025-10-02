<script>
    /** @type {import('./$types').PageData} */
 
    import { Heading, Alert, Fileupload, Toast, Modal, Textarea, Radio, Input, FloatingLabelInput, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Select, Label, Badge } from 'flowbite-svelte';
    import { BuildingOutline, PlusOutline, CheckPlusCircleOutline, ExclamationCircleOutline, CheckCircleSolid, EditOutline, TrashBinOutline, DownloadOutline, FilePdfOutline } from 'flowbite-svelte-icons';
    import { user } from '$lib/user';
    import { slide } from 'svelte/transition';
    import { v4 as uuidv4 } from "uuid";

    let uuid = "";
    let ModalAddData = false;
    let ModalEditData = false;
    let toastStatus = false;
    let counter = 6;

    let ConfirmDeleteModal = false;
    let selectedId, selectedMitra, selectedTentangKS = null;
   
    import { invalidateAll } from '$app/navigation';
	  import { addTableData, deleteTableData, UpdateTableDataKS } from '$lib/crudDataRekapKerjasama.js';
    import { storage, databases } from '$lib/appwrite';
  
  
   export let data=[]; 

    function formatTanggal(tanggalString) {
        // Pengaman jika tanggalnya kosong atau null
        if (!tanggalString) {
            return 'Tanggal tidak valid';
        }

        const tanggalObjek = new Date(tanggalString);

        // Opsi format tanggal
        const options = {
            day: 'numeric',    // -> 27
            month: 'long',     // -> Mei (bukan May)
            year: 'numeric'    // -> 2026
        };

        // 'id-ID' adalah kode untuk Bahasa Indonesia 🇮🇩
        return new Intl.DateTimeFormat('id-ID', options).format(tanggalObjek);
    }

   let selectTahunMulai = '';
    let tahunmulaiAKtif = [
    { value: '2018', name: '2018' },
    { value: '2019', name: '2019' },
    { value: '2020', name: '2020' },
    { value: '2021', name: '2021' },
    { value: '2022', name: '2022' },
    { value: '2023', name: '2023' },
    { value: '2024', name: '2024' },
    { value: '2025', name: '2025' },
    { value: '2026', name: '2026' },
    { value: '2027', name: '2027' },
    { value: '2028', name: '2028' },
    { value: '2029', name: '2029' },
    { value: '2030', name: '2030' }
  ]; 

   let getKategoryKS, getJenisKS, getSubjek, getTentang, getNoKS, getnamaOPD, getnamaMitra, getTahunMulai, getTanggalmulai, getTMTanpaTime;
   let getTanggalselesai, getTSTanpaTime, getKeterangan, getidData;  
  
  // Tambahkan variabel untuk loading state
    let isSubmitting = false;
    let uploadProgress = 0;

    // Fungsi untuk menampilkan progress upload (opsional)
      const showUploadProgress = (progress) => {
      uploadProgress = progress;
    // Anda bisa menampilkan progress bar di UI
};

  const addDatatoTable = async (e) => {
    if (isSubmitting) return; // Prevent double submission
    
    isSubmitting = true;
    uuid = uuidv4();   // generate id melalui uuid
    e.preventDefault();
    const formEl = e.target;
    
    try {
        // Validasi file sebelum upload
        const fileInput = document.getElementById('uploadDocKS');
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Silakan pilih file dokumen kerjasama yang akan diupload');
            return;
        }
        
        // Validasi ukuran file (contoh: maksimal 40MB)
        const maxSize = 40 * 1024 * 1024; // 40MB
        if (file.size > maxSize) {
            alert('Ukuran file terlalu besar. Maksimal 40MB');
            return;
        }
        
        // Validasi format file
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format file tidak didukung. Hanya PDF dan DOC/DOCX yang diizinkan');
            return;
        }
        
        const formData = new FormData(formEl);
        
        // Masukkan Data ke table melalui crudDataRekap
        await addTableData(
            formData.get('kategoriKS'), 
            formData.get('jenisKS'), 
            formData.get('subjekKS'), 
            formData.get('tentangKS'), 
            formData.get('No_kerjasama'), 
            formData.get('namaOPD'), 
            formData.get('namaMitra'), 
            formData.get('tahunMulai'), 
            formData.get('tanggalMulai'), 
            formData.get('tanggalSelesai'), 
            formData.get('keteranganKS'), 
            uuid
        );

        // Masukkan file ke Storage Bucket dengan error handling
        try {
            const uploadResponse = await storage.createFile('674e4b10003a83fb0a30', uuid, file);
            console.log('File berhasil diupload:', uploadResponse);
            
            // Jika semua berhasil, refresh data dan tutup modal
            await invalidateAll();
            
            // Reset form
            formEl.reset();
            
            // Notification Toast and Time
            toastStatus = true;
            counter = 6;
            timeout();
            
        } catch (fileError) {
            console.error('Error saat upload file:', fileError);
            
            // Jika upload file gagal, hapus data yang sudah tersimpan di database
            try {
                await deleteTableData(uuid);
                console.log('Data berhasil dihapus karena upload file gagal');
            } catch (deleteError) {
                console.error('Error saat menghapus data:', deleteError);
            }
            
            // Tampilkan pesan error yang user-friendly
            let errorMessage = 'Gagal mengupload file dokumen. ';
            
            if (fileError.code === 400) {
                errorMessage += 'File tidak valid atau format tidak didukung.';
            } else if (fileError.code === 401) {
                errorMessage += 'Tidak memiliki izin untuk mengupload file.';
            } else if (fileError.code === 413) {
                errorMessage += 'Ukuran file terlalu besar.';
            } else if (fileError.code === 507) {
                errorMessage += 'Penyimpanan penuh. Hubungi administrator.';
            } else {
                errorMessage += 'Terjadi kesalahan teknis. Silakan coba lagi.';
            }
            
            alert(errorMessage);
            return;
        }
        
    } catch (error) {
        console.error('Error saat menambah data:', error);
        
        // Tampilkan pesan error umum
        let errorMessage = 'Gagal menambahkan data kerjasama. ';
        
        if (error.code === 400) {
            errorMessage += 'Data yang dimasukkan tidak valid.';
        } else if (error.code === 401) {
            errorMessage += 'Tidak memiliki izin untuk menambah data.';
        } else if (error.code === 409) {
            errorMessage += 'Data dengan nomor kerjasama tersebut sudah ada.';
        } else {
            errorMessage += 'Terjadi kesalahan teknis. Silakan coba lagi.';
        }
        
        alert(errorMessage);
    } finally {
        isSubmitting = false;
        uploadProgress = 0;
    }
};
 
  
function DownloadFile(id) {
  const result = storage.getFileView('674e4b10003a83fb0a30', id);
	return result;
}

function openDeleteModal(id, mitraInstansi, tentangKerjasama) {
    selectedId = id;
    selectedMitra = mitraInstansi;
    selectedTentangKS = tentangKerjasama;
    ConfirmDeleteModal = true;
  }

  const remove = async (id) => {
		await deleteTableData(id);
    // Delete File Storage
		const result = await storage.deleteFile('674e4b10003a83fb0a30', id );
    console.log(result);
    ConfirmDeleteModal = false;
		invalidateAll();
	};


 /** Edit Run 2 function: GetDataDocumentLPPD and update*/

function getDataRekapKerjasama(id) {
const promise = databases.getDocument(
  '673dd7b2001a83873b47', 
  '673dd7dd0032f01dc205',
  id,
  []
);

promise.then(function (response) {
  ModalEditData = true;
  console.log(response); // Success
 getKategoryKS = response.kategoryKS;
 getJenisKS = response.Jenis;
 getSubjek = response.Subjek;
 getTentang = response.Tentang;
 getNoKS = response.No_kerjasama;
 getnamaOPD = response.OPD;
 getnamaMitra = response.Mitra;
 getTahunMulai = response.TahunMulai;
 getTanggalmulai = response.tanggalMulai;
 getTMTanpaTime = getTanggalmulai.slice(0, 10);
 getTanggalselesai = response.tanggalSelesai;
 getTSTanpaTime = getTanggalselesai.slice(0, 10);
 getKeterangan = response.keteranganKS;
 getidData = response.$id;

}, function (error) {
  console.log(error); // Failure
  throw error;
});
}

const updateDataKS = async (e) => {
		e.preventDefault();
		const formEl = e.target;
		const formData = new FormData(formEl);
		await UpdateTableDataKS(formData.get('kategoriKS'), formData.get('jenisKS'), formData.get('subjekKS'), formData.get('tentangKS'), formData.get('No_kerjasama'), formData.get('namaOPD'), formData.get('namaMitra'), formData.get('tahunMulai'), formData.get('tanggalMulai'), formData.get('tanggalSelesai'), formData.get('keteranganKS'), getidData);
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
    ModalAddData = false;
    ModalEditData = false;
  } 



  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TABLE_KSPK");
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

  // Items per page options
  let itemsPerPageOptions = [
    { value: 5, name: '5 per halaman' },
    { value: 10, name: '10 per halaman' },
    { value: 20, name: '20 per halaman' },
    { value: 50, name: '50 per halaman' },
    { value: 100, name: '100 per halaman' }
  ];

    // Pagination - menggunakan reactive statement
  let currentPage = 1;
  let postsPerPage = 20;


    // Reactive statement untuk memastikan data selalu ter-update
  $: allPosts = data.TableDatas?.documents || [];
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


  let getKeteranganKSColor = (Keterangan) => {
		if (Keterangan == 'Masih Berlaku') return 'blue-50'
		else return 'orange-50'
	}

  let selectedYear = 'all';

    // Update filter untuk tahun
$: filteredData = selectedYear === 'all' 
    ? allPosts 
    : allPosts.filter(item => item.TahunMulai === selectedYear);

// Update years untuk filter options
$: years = [...new Set(allPosts.map(item => item.TahunMulai))].sort((a, b) => b - a);

  
</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Manajemen Arsip Dokumen Kerjasama Provinsi Sulawesi Tenggara</Heading>
  <br/>

    {#if $user.prefs['Role'] !== "PIC Kerjasama"}
    <Alert color="yellow">
    <span class="font-medium" style="font-weight:600;">Halaman ini hanya bisa di Update oleh PIC Kerjasama</span>
    </Alert>
    <br/>
    {/if}
  
  {#if $user.prefs['Role'] === "PIC Kerjasama"}
  <div class="grid grid-cols-3 gap-4" style=" background: white;padding: 18px 10px;border-radius: 12px;border:1px solid rgb(203, 213, 225);">
    <div class="col-span-2" style="font-size:22px;margin-left:10px;">Klik tombol di samping untuk menambah Data Kerjasama Baru</div>
    <div class=""><Button style="box-shadow:rgb(102 144 246 / 40%) 5px 10px" color="blue" class="float-right" on:click={() => (ModalAddData = true)}> <CheckPlusCircleOutline class="inline-flex w-6 h-6 mr-2 text-white-500 dark:text-white-400" /> Tambah Data Kerjasama</Button>  </div>
   </div>
   {/if}
   <br/>

  <Modal size="lg" title="Form Pengisian Data Kerjasama Baru" bind:open={ModalAddData} autoclose={false}>
    <form class="space-y-6" on:submit={addDatatoTable} >
      <h2 style="font-weight:600;margin-bottom:8px;color:#5850ec;">Silahkan Isi data Kerjasama Baru pada Form di bawah berikut:</h2>
     <label class="text-sm">Kategori Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="kategoriKS" class="p-3" value="Kerjasama Pihak Ketiga / Swasta">Kerjasama Pihak Ketiga / Swasta</Radio></li>
        <li class="w-full"><Radio name="kategoriKS" class="p-3" value="Kerjasama Antar Pemerintah Daerah dan K/L">Kerjasama Antar Pemerintah Daerah dan K/L</Radio></li>
      </ul> <br/> 
      <label class="text-sm">Jenis Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="jenisKS" class="p-3" value="Nota Kesepakatan">Nota Kesepakatan</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" value="Kesepakatan Bersama">Kesepakatan Bersama</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" value="Perjanjian Kerjasama">Perjanjian Kerjasama</Radio></li>
      </ul> 
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="jenisKS" class="p-3" value="Perjanjian Kerjasama (Addendum)">Perjanjian Kerjasama (Addendum)</Radio></li> 
      </ul> 
      <FloatingLabelInput style="filled" id="subjekKS" name="subjekKS" type="text">
        Subjek:
      </FloatingLabelInput>
      <Textarea id="tentangKS" placeholder="Tentang" rows="2" name="tentangKS" />
      <FloatingLabelInput style="filled" id="No_kerjasama" name="No_kerjasama" type="text">
        Nomor Kerjasama:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaOPD" name="namaOPD" type="text">
        Nama OPD:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaMitra" name="namaMitra" type="text">
        Nama Mitra:
      </FloatingLabelInput>
      <Label>Tahun Mulai:
        <Select class="mt-2" items={tahunmulaiAKtif} name="tahunMulai" bind:value={selectTahunMulai} />
         </Label>  
      <div class="mb-6">
        <label for="tanggalMulai" class="text-sm">Tanggal Mulai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalMulai" placeholder="Tanggal" name="tanggalMulai" required />
      </div>
      <div class="mb-6">
        <label for="tanggalSelesai" class="text-sm">Tanggal Selesai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalSelesai" placeholder="Tanggal" name="tanggalSelesai" required />
      </div> 
      <div class="mb-6">
        <label class="text-sm">Upload Dokumen Kerjasama:</label>
        <Fileupload class="mb-2" name="UploadDokumen" id="uploadDocKS" />
      </div> <br/>
       
      <label class="text-sm">Keterangan:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="keteranganKS" class="p-3" value="Masih Berlaku">Masih Berlaku</Radio></li>
        <li class="w-full"><Radio name="keteranganKS" class="p-3" value="Telah Selesai">Telah Selesai</Radio></li>
      </ul>  
      <div>
    <button 
        type="submit" 
        value="submit" 
        disabled={isSubmitting}
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {#if isSubmitting}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Mengirim Data...
        {:else}
            Tambah Data
        {/if}
    </button>
</div>    
    </form>  
    <svelte:fragment slot="footer">
      <Button color="alternative" on:click={()=> ModalAddData = !ModalAddData} >Batal</Button>
      <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Data kerjasama berhasil di tambahkan. Form akan tutup dalam {counter}s.
      </Toast>
    </svelte:fragment>
  </Modal>


  <Modal title="Form Pengeditan Data Kerjasama" bind:open={ModalEditData} autoclose={false}>
    <form class="space-y-6" on:submit={updateDataKS}>
     <label class="text-sm">Kategori Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="kategoriKS" bind:group={getKategoryKS} class="p-3" value="Kerjasama Pihak Ketiga / Swasta">Kerjasama Pihak Ketiga / Swasta</Radio></li>
        <li class="w-full"><Radio name="kategoriKS" bind:group={getKategoryKS} class="p-3" value="Kerjasama Antar Pemerintah Daerah dan K/L">Kerjasama Antar Pemerintah Daerah dan K/L</Radio></li>
      </ul> <br/> 
      <label class="text-sm">Jenis Kerjasama:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="jenisKS" class="p-3" bind:group={getJenisKS} value="Nota Kesepakatan">Nota Kesepakatan</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" bind:group={getJenisKS} value="Kesepakatan Bersama">Kesepakatan Bersama</Radio></li>
        <li class="w-full"><Radio name="jenisKS" class="p-3" bind:group={getJenisKS} value="Perjanjian Kerjasama">Perjanjian Kerjasama</Radio></li>   
      </ul> 
       <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="jenisKS" class="p-3" bind:group={getJenisKS} value="Perjanjian Kerjasama (Addendum)">Perjanjian Kerjasama (Addendum)</Radio></li>    
      </ul>  
      <FloatingLabelInput style="filled" id="subjekKS" bind:value={getSubjek} name="subjekKS" type="text">
        Subjek:
      </FloatingLabelInput><br/>
      <label class="text-sm">Tentang:</label>
      <Textarea style="margin-top:3px;" id="tentangKS" placeholder="Tentang" rows="2" bind:value={getTentang} name="tentangKS" />
      <FloatingLabelInput style="filled" id="No_kerjasama" bind:value={getNoKS} name="No_kerjasama" type="text">
        Nomor Kerjasama:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaOPD" bind:value={getnamaOPD} name="namaOPD" type="text">
        Nama OPD:
      </FloatingLabelInput>
      <FloatingLabelInput style="filled" id="namaMitra" bind:value={getnamaMitra} name="namaMitra" type="text">
        Nama Mitra:
      </FloatingLabelInput>
      <Label>Tahun Mulai:
        <Select class="mt-2" items={tahunmulaiAKtif} name="tahunMulai" bind:value={getTahunMulai} />
         </Label> 
      <div class="mb-6">
        <label for="tanggalMulai" class="text-sm">Tanggal Mulai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalMulai"  bind:value={getTMTanpaTime} placeholder="Tanggal" name="tanggalMulai" required />
      </div>
      <div class="mb-6"> 
        <label for="tanggalSelesai" class="text-sm">Tanggal Selesai:</label>
        <Input style="margin-top:3px;" type="date" id="tanggalSelesai" bind:value={getTSTanpaTime} placeholder="Tanggal" name="tanggalSelesai" required />
      </div>  <br/>
      <label class="text-sm">Keterangan:</label>
      <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="keteranganKS" class="p-3" bind:group={getKeterangan} value="Masih Berlaku">Masih Berlaku</Radio></li>
        <li class="w-full"><Radio name="keteranganKS" class="p-3" bind:group={getKeterangan} value="Telah Selesai">Telah Selesai</Radio></li>
      </ul>  
      <div>
        <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
      </div>     
    </form>  
    <svelte:fragment slot="footer">
      <Button color="alternative" on:click={()=> ModalEditData = !ModalEditData} >Batal</Button>
      <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Data kerjasama berhasil di Perbaharui. Form akan tutup dalam {counter}s.
      </Toast>
    </svelte:fragment>
  </Modal>
 
  <section>

     <div class="flex items-center justify-center gap-2 p-2">
     <div class="flex w-full items-center justify-between rounded-xl border-2 border-slate-300 bg-white p-4 shadow-lg">
      <p class="text-xl font-semibold text-gray-700">Total Kerjasama Aktif:</p>
      <div class="flex h-12 w-16 items-center justify-center rounded-lg bg-blue-100">
      <span class="text-3xl font-bold text-blue-400">{data.TableDatasKSBerlaku.total}</span>
      </div>
     </div>
      <div class="flex w-full items-center justify-between rounded-xl border-2 border-slate-300 bg-white p-4 shadow-lg">
       <p class="text-xl font-semibold text-gray-700">Total Kerjasama Telah Selesai:</p>
        <div class="flex h-12 w-16 items-center justify-center rounded-lg bg-blue-100">
       <span class="text-3xl font-bold text-blue-400">{data.TableDatas.total - data.TableDatasKSBerlaku.total}</span>
       </div>
      </div>
    </div>
  
    <br/> 
    {#if data.TableDatas.total === 0}
      <p>No TableDatas yet.</p>
    {:else}
    <p>Terdapat {data.TableDatas.total} Data Kerjasama Terdaftar</p> 
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
          <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Data berdasarkan Nama Mitra atau Judul Kerjasama ..." required />
      </div>
      <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search</span>
      </button>
  </form>
    
<br/>
<div class="mb-2">
  <label class="mr-2 font-medium">Tahun:</label>
  <select 
    bind:value={selectedYear}
    class="px-3 py-2 border rounded-md bg-white"
  >
    <option value="all">All Years</option>
    {#each years as year}
      <option value={year}>{year}</option>
    {/each}
  </select>
</div>

<!-- Pagination dengan Items per Page -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
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

    <Table id="TABLE_KSPK" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
      <TableHead>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4 content-start">No</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4 content-start">Nama Mitra Instansi</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4 content-start">Detail</TableHeadCell>
         <TableHeadCell style="font-size: larger;" class="py-4 px-4 content-start">Unduh File Dokumen</TableHeadCell>
        <TableHeadCell style="font-size: larger;" class="py-4 px-4 content-start">Tahun Mulai</TableHeadCell>
        {#if $user.prefs['Role'] === "PIC Kerjasama"}
        <TableHeadCell style="font-size: larger;" class="py-4 px-4 content-start">Tombol Aksi</TableHeadCell>
        {/if}
      </TableHead>
      {#await data.TableDatas.documents}
      loading...
      {:then allPosts }
      <TableBody tableBodyClass="divide-y align-top">
        {#each filteredData as cetakTabel, i}	
        {#if i >= postRangeLow && i < postRangeHigh}
        <TableBodyRow class="bg-white hover:bg-slate-50 transition-colors">
          <TableBodyCell>{i+1}</TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2">
           <div style="width: 280px; overflow-wrap: anywhere;">
            <div class="flex items-center"><BuildingOutline class="w-14 h-14 mr-2 text-gray-500 shrink-0" />
             <span class="font-bold" style="font-size:16px;">{cetakTabel.Mitra}</span>
            </div>
           <p class="text-sm text-gray-700"><b class="font-semibold">Judul Kerjasama:</b><br />{cetakTabel.Subjek}</p>
           <p class="text-sm text-gray-700"><b class="font-semibold">Tanggal Mulai:</b><br />{formatTanggal(cetakTabel.tanggalMulai.slice(0, 10))}</p>
           <p class="text-sm text-gray-700"><b class="font-semibold">Tanggal Selesai:</b><br />{formatTanggal(cetakTabel.tanggalSelesai.slice(0, 10))}</p>
           <p class="text-sm text-gray-700"><b class="font-semibold">Status:</b><br /><Badge color={cetakTabel.keteranganKS === "Telah Selesai" ? "red" : "indigo"} border>{cetakTabel.keteranganKS}</Badge></p>
           <br/>
          </div>
         </TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
          <div style="width:320px;margin-bottom:6px;">
            <p class="text-sm text-gray-700"><b class="font-semibold">Jenis Kerjasama:</b><br />{cetakTabel.Jenis}</p> 
            <p class="text-sm text-gray-700"><b class="font-semibold">Tentang:</b><br />{cetakTabel.Tentang}</p>
            <p class="text-sm text-gray-700"><b class="font-semibold">Kategori:</b><br />{cetakTabel.kategoryKS}</p>
            <p class="text-sm text-gray-700"><b class="font-semibold">OPD:</b><br />{cetakTabel.OPD}</p>
            <br/>
          </div>
          </TableBodyCell>
           <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
            <div style="width:250px;margin-bottom:6px;"> 
            <ButtonGroup class="*:!ring-primary-700"> 
             <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#ff6767;height: 80px;">
               <FilePdfOutline class="w-11 h-11" /> </Button> </a> </ButtonGroup> <label style="color:#89aae4;margin-top:5px;display: block;">Unduh File</label>
             <p class="text-sm text-gray-700"><b class="font-semibold">Nomor Kerjasama:</b><br />{cetakTabel.No_kerjasama}</p>
           
            </div>
            </TableBodyCell>
          <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><span style="padding: 4px 8px;border-radius: 6px;background: #a3e1ff;">{cetakTabel.TahunMulai}</span></TableBodyCell>
          {#if $user.prefs['Role'] === "PIC Kerjasama"}
          <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><ButtonGroup class="*:!ring-primary-700">
            <Button style="color:blue;" on:click={() => getDataRekapKerjasama(cetakTabel.$id)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
            <Button style="color:red;" on:click={() => openDeleteModal(cetakTabel.$id, cetakTabel.Mitra, cetakTabel.Tentang) }><TrashBinOutline class="w-4 h-4 me-2" />Delete</Button>
           </ButtonGroup> 
        </TableBodyCell>
          {/if}
         <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
          <div class="text-center">
            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data Dokumen Kerjasama dengan Instansi <b>{selectedMitra}</b> tentang <b>{selectedTentangKS}</b></h3>
            <Button color="red" class="me-2" on:click={() => remove(selectedId)}>Ya, Hapus Sekarang</Button>
            <Button color="alternative" on:click={()=> ConfirmDeleteModal = !ConfirmDeleteModal}>Tidak, Batal</Button>
          </div>
        </Modal>
        </TableBodyRow>
        {/if}
     {/each}
  
      </TableBody>
      {/await} 
    </Table>

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
       
        <br/><br/>     
   
</section>


</div>

<style>
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

</style>











  
 
