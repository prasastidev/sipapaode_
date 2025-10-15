<script>
  /** @type {{ data: import('./$types').PageData }} */
   import { onMount } from 'svelte';
  // export let data=[];

  import { Heading, Button, Avatar, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Popover, Modal, Radio, FloatingLabelInput, Input, Select, Label, Toast, Checkbox, Alert } from 'flowbite-svelte';
  import {  TrashBinOutline, CheckCircleSolid, FileLinesOutline, CheckPlusCircleOutline, EditOutline, BuildingSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
  import { storage, databases } from '$lib/appwrite';
  import { invalidateAll } from '$app/navigation';
  import { user } from '$lib/user';
  import { addTableDataPegawai, UpdatePegawai, deleteTableData, getTableDataPegawai } from '$lib/dataPegawai.js';
  import { slide } from 'svelte/transition';

  let allPosts = [];
  let totalPosts = 0;

  let ModalAddDataPegawai = false;
  let ModalEditData = false;
  let ModalStatistic = false;
  let toastStatus = false;
  let counter = 6;

  let tanggalLahirTidakDiketahui = false;

  let getnamaPegawai, getURLPhotoProfile, getNIPPegawai, getGolPegawai, getJabPegawai, getTanggalLahir, getJKPegawai, getPTPegawai, getjenisPegawai, getidData;

  let ConfirmDeleteModal = false;
  let selectedId = null;
  let selectedNama;

  let selectPendidikanTerakhir = '';
  let PendidikanTerakhir = [
   { value: 'SD', name: 'SD' },
    { value: 'SLTP', name: 'SLTP' },
    { value: 'SLTA', name: 'SLTA' },
    { value: 'Diploma I (D1)', name: 'Diploma I (D1)' },
    { value: 'Diploma II (D2)', name: 'Diploma III (D2)' },
    { value: 'Diploma III (D3)', name: 'Diploma III (D3)' },
    { value: 'Sarjana (S1)', name: 'Sarjana (S1)' },
    { value: 'Pasca Sarjana (S2)', name: 'Pasca Sarjana (S2)' }
  ]; 

  let selectGolongan = '';
  let Golongan = [
    { value: 'Golongan IA', name: 'Golongan IA' },
    { value: 'Golongan IB', name: 'Golongan IB' },
    { value: 'Golongan IC', name: 'Golongan IC' },
    { value: 'Golongan ID', name: 'Golongan ID' },
    { value: 'Golongan IIA', name: 'Golongan IIA' },
    { value: 'Golongan IIB', name: 'Golongan IIB' },
    { value: 'Golongan IIC', name: 'Golongan IIC' },
    { value: 'Golongan IID', name: 'Golongan IID' },
    { value: 'Golongan IIIA', name: 'Golongan IIIA' },
    { value: 'Golongan IIIB', name: 'Golongan IIIB' },
    { value: 'Golongan IIIC', name: 'Golongan IIIC' },
    { value: 'Golongan IIID', name: 'Golongan IIID' },
    { value: 'Golongan IVA', name: 'Golongan IVA' },
    { value: 'Golongan IVB', name: 'Golongan IVB' },
    { value: 'Golongan IVC', name: 'Golongan IVC' },
    { value: 'Golongan IVD', name: 'Golongan IVD' },
    { value: 'Golongan IVE', name: 'Golongan IVE' },
  ]; 

  let selectJabatan = '';
  let Jabatan = [
    { value: 'KARO PEMERINTAHAN & OTDA', name: 'KARO PEMERINTAHAN & OTDA' },
    { value: 'ANALISIS KEBIJAKAN AHLI MADYA', name: 'ANALISIS KEBIJAKAN AHLI MADYA' },
    { value: 'KABAG KERJASAMA', name: 'KABAG KERJASAMA' },
    { value: 'ANALISIS KEBIJAKAN AHLI MUDA', name: 'ANALISIS KEBIJAKAN AHLI MUDA' },
    { value: 'ANALISIS KEBIJAKAN AHLI PERTAMA', name: 'ANALISIS KEBIJAKAN AHLI PERTAMA' },
    { value: 'KASUBAG TATA USAHA BIRO', name: 'KASUBAG TATA USAHA BIRO' },
    { value: 'PENELAAH TEKNIS KEBIJAKAN', name: 'PENELAAH TEKNIS KEBIJAKAN' },
    { value: 'PENATA KELOLA PEMERINTAHAN', name: 'PENATA KELOLA PEMERINTAHAN' },
    { value: 'PENATA LAYANAN OPERASIONAL', name: 'PENATA LAYANAN OPERASIONAL' },
    { value: 'PENGOLAH DATA DAN INFORMASI', name: 'PENGOLAH DATA DAN INFORMASI' },
    { value: 'PENGADMINISTRASI PERKANTORAN', name: 'PENGADMINISTRASI PERKANTORAN' },
    { value: 'PRANATA KEWILAYAHAN', name: 'PRANATA KEWILAYAHAN' },
    { value: 'FASILITATOR PEMERINTAHAN', name: 'FASILITATOR PEMERINTAHAN' }
  ]; 

  // DAFTAR BARU: 14 Jabatan Organisasi
let selectJabatanOrganisasi = '';
const semuaJabatanOrganisasi = [
   
    { value: 'TIDAK_DITAMPILKAN', name: '--- Tidak Ditampilkan ---' }, 
    { value: 'Kepala Biro', name: 'Kepala Biro' },
    { value: 'Kepala Bidang Tata Usaha', name: 'Kepala Bidang Tata Usaha' },
    { value: 'Kepala Bidang Kerjasama', name: 'Kepala Bidang Kerjasama' },
    { value: 'Kepala Bidang Koordinator Pemerintahan', name: 'Kepala Bidang Koordinator Pemerintahan' },
    { value: 'Kepala Bidang Koordinator Otonomi Daerah', name: 'Kepala Bidang Koordinator Otonomi Daerah' },
    { value: 'Staff I Bidang Kerjasama', name: 'Staff I Bidang Kerjasama' },
    { value: 'Staff II Bidang Kerjasama', name: 'Staff II Bidang Kerjasama' },
    { value: 'Staff III Bidang Kerjasama', name: 'Staff III Bidang Kerjasama' },
    { value: 'Staff I Bidang Koordinator Pemerintahan', name: 'Staff I Bidang Koordinator Pemerintahan' },
    { value: 'Staff II Bidang Koordinator Pemerintahan', name: 'Staff II Bidang Koordinator Pemerintahan' },
    { value: 'Staff III Bidang Koordinator Pemerintahan', name: 'Staff III Bidang Koordinator Pemerintahan' },
    { value: 'Staff I Bidang Koordinator Otonomi Daerah', name: 'Staff I Bidang Koordinator Otonomi Daerah' },
    { value: 'Staff II Bidang Koordinator Otonomi Daerah', name: 'Staff II Bidang Koordinator Otonomi Daerah' },
    { value: 'Staff III Bidang Koordinator Otonomi Daerah', name: 'Staff III Bidang Koordinator Otonomi Daerah' },
];

// VARIABEL BARU
let jabatanOrganisasiTersedia = [];
let getJabatanOrganisasi = '';

  // Items per page options
  let itemsPerPageOptions = [
    { value: 10, name: '10 per halaman' },
    { value: 20, name: '20 per halaman' },
    { value: 50, name: '50 per halaman' },
    { value: 100, name: '100 per halaman' }
  ];


  const addDatatoTable = async (e) => {
    e.preventDefault();
    const formEl = e.target;
    const formData = new FormData(formEl);

    // Cek checkbox dan tentukan nilai tanggal lahir
    const tanggalLahirValue = tanggalLahirTidakDiketahui ? null : formData.get('tanggalLahir');
    // Masukkan Data ke table melalui dataPegawai
   
    await addTableDataPegawai(formData.get('namaPegawai'), formData.get('URLPhotoProfile'), formData.get('NIPPegawai'), formData.get('GolPegawai'), formData.get('JabPegawai'), tanggalLahirValue, formData.get('JKPegawai'), formData.get('PTPegawai'), formData.get('jenisPegawai'), formData.get('JabOrganisasiPegawai'));

    // GANTI invalidateAll() dengan refreshData()
    await refreshData(); 

    // Reset form
    formEl.reset();
    tanggalLahirTidakDiketahui = false; // <-- Reset juga status checkbox
    selectJabatanOrganisasi = '';
    // Notification Toast and Time
    toastStatus = true;
    counter = 6;
    timeout();
  };

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalAddDataPegawai = false;
    ModalEditData = false;
  } 

  /** Edit Run 2 function: getDataPegawai and update*/
  function getDataPegawai(id) {
    const promise = databases.getDocument(
      '673dd7b2001a83873b47', 
      '6798709400064d912ec1',
      id,
      []
    );

    promise.then(function (response) {
      ModalEditData = true;
      console.log(response); // Success
      getnamaPegawai = response.Nama;
      getURLPhotoProfile = response.URL_PhotoProfile;
      getNIPPegawai = response.NIP;
      // --- KOREKSI NAMA FIELD DI SINI ---
        getGolPegawai = response.Golongan;
        getJabPegawai = response.Jabatan;
        getTanggalLahir = response.Tanggal_lahir ? response.Tanggal_lahir.slice(0, 10) : '';
        getJKPegawai = response.Jenis_Kelamin;
        getPTPegawai = response.Pendidikan_Terakhir;
        getjenisPegawai = response.Jenis_Pegawai;
      getidData = response.$id;
      getJabatanOrganisasi = response.jabatanOrganisasi;

      // Ambil semua jabatan yang sudah diambil KECUALI jabatan milik pegawai ini
        const jabatanSudahDiambilLainnya = allPosts
            .map(p => p.jabatanOrganisasi)
            .filter(Boolean)
            .filter(j => j !== response.jabatanOrganisasi);

        // MODIFIKASI  FILTER UNTUK EDIT
        jabatanOrganisasiTersedia = semuaJabatanOrganisasi.filter(j => 
            !jabatanSudahDiambilLainnya.includes(j.value) ||
            j.value === response.jabatanOrganisasi ||
            // MODIFIKASI PENGECEKAN VALUE
            j.value === 'TIDAK_DITAMPILKAN' 
        );

    }, function (error) {
      console.log(error); // Failure
      throw error;
    });
  }

  const updateDataPegawai = async (e) => {
    e.preventDefault();
    const formEl = e.target;
    const formData = new FormData(formEl);
   // Jika input tanggal kosong (bernilai ''), kirim null ke database.
    const tanggalLahirValue = formData.get('tanggalLahir') === '' ? null : formData.get('tanggalLahir');

    await UpdatePegawai(formData.get('namaPegawai'), formData.get('URLPhotoProfile'), formData.get('NIPPegawai'), formData.get('GolPegawai'), formData.get('JabPegawai'), tanggalLahirValue, formData.get('JKPegawai'), formData.get('PTPegawai'), formData.get('jenisPegawai'), formData.get('JabOrganisasiPegawai'), getidData);
     await refreshData(); 
    // Reset form
    formEl.reset();
    // Notification Toast and Time
    toastStatus = true;
    counter = 6;
    timeout();
  };

  function openDeleteModal(id, nama) {
    selectedId = id;
    selectedNama = nama;
    ConfirmDeleteModal = true;
  }

  const remove = async (id) => {
    await deleteTableData(id);
     await refreshData();
     //  tambahan untuk pagination
    if (postRangeLow >= totalPosts && currentPage > 1) {
        currentPage = currentPage - 1;
    }

    ConfirmDeleteModal = false;
  };

  function SearchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("simple-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("TABLE_Pegawai");
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

  // Pagination - menggunakan reactive statement
  let currentPage = 1;
  let postsPerPage = 50;

  // Reactive statement untuk memastikan data selalu ter-update
  // $: allPosts = data.TableDataPegawai?.documents || [];
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

// Filter jabatan yang tersedia
$: {
    if (allPosts) {
        const jabatanSudahDiambil = allPosts.map(p => p.jabatanOrganisasi).filter(Boolean);
        
        jabatanOrganisasiTersedia = semuaJabatanOrganisasi.filter(j => 
            // MODIFIKASI PENGECEKAN VALUE
            !jabatanSudahDiambil.includes(j.value) || j.value === 'TIDAK_DITAMPILKAN' 
        );
    }
}



// Chart Data Statistic 
let TotalDataPegawai =  0;
let TotalPegawaiTetap =  0;
let TotalPHT =  0;
let TotalPegawaiPria =  0;
let TotalPegawaiWanita =  0;
let TotalPegawaiSD = 0;
let TotalPegawaiSLTP = 0;
let TotalPegawaiSLTA =  0;
let TotalPegawaiDI =  0;
let TotalPegawaiDII =  0;
let TotalPegawaiDIII =  0;
let TotalPegawaiSarjana =  0;
let TotalPegawaiPascaSarjana =  0;
let TotalPegawaiGolIA =  0;
let TotalPegawaiGolIB =  0;
let TotalPegawaiGolIC = 0;
let TotalPegawaiGolID =  0;
let TotalPegawaiGolIIA =  0;
let TotalPegawaiGolIIB =  0;
let TotalPegawaiGolIIC =  0;
let TotalPegawaiGolIID =  0;
let TotalPegawaiGolIIIA = 0;
let TotalPegawaiGolIIIB =  0;
let TotalPegawaiGolIIIC =  0;
let TotalPegawaiGolIIID =  0;
let TotalPegawaiGolIVA =  0;
let TotalPegawaiGolIVB =  0;
let TotalPegawaiGolIVC =  0;
let TotalPegawaiGolIVD = 0;
let TotalPegawaiGolIVE =  0;

// FUNGSI BARU UNTUK MENGHITUNG STATISTIK
function updateStatistics(posts) {
    TotalDataPegawai = posts.length;
    TotalPegawaiTetap = posts.filter(p => p.Jenis_Pegawai === 'Pegawai').length;
    TotalPHT = posts.filter(p => p.Jenis_Pegawai === 'PHT').length;
    TotalPegawaiPria = posts.filter(p => p.Jenis_Kelamin === 'Pria').length;
    TotalPegawaiWanita = posts.filter(p => p.Jenis_Kelamin === 'Wanita').length;
    
    // (Lanjutkan pola ini untuk semua kategori lainnya: Pendidikan dan Golongan)
    TotalPegawaiSD = posts.filter(p => p.Pendidikan_Terakhir === 'SD').length;
    TotalPegawaiSLTP = posts.filter(p => p.Pendidikan_Terakhir === 'SLTP').length;
    TotalPegawaiSLTA = posts.filter(p => p.Pendidikan_Terakhir === 'SLTA').length;
    TotalPegawaiDI = posts.filter(p => p.Pendidikan_Terakhir === 'Diploma III (D1)').length;
    TotalPegawaiDII = posts.filter(p => p.Pendidikan_Terakhir === 'Diploma III (D2)').length;
   TotalPegawaiDIII = posts.filter(p => p.Pendidikan_Terakhir === 'Diploma III (D3)').length;
    TotalPegawaiSarjana = posts.filter(p => p.Pendidikan_Terakhir === 'Sarjana (S1)').length;
    TotalPegawaiPascaSarjana = posts.filter(p => p.Pendidikan_Terakhir === 'Pasca Sarjana (S2)').length;
    TotalPegawaiGolIA = posts.filter(p => p.Golongan === 'Golongan IA').length;
    TotalPegawaiGolIB = posts.filter(p => p.Golongan === 'Golongan IB').length;
    TotalPegawaiGolIC = posts.filter(p => p.Golongan === 'Golongan IC').length;
    TotalPegawaiGolID = posts.filter(p => p.Golongan === 'Golongan ID').length;
   TotalPegawaiGolIIA = posts.filter(p => p.Golongan === 'Golongan IIA').length;
    TotalPegawaiGolIIB = posts.filter(p => p.Golongan === 'Golongan IIB').length;
    TotalPegawaiGolIIC = posts.filter(p => p.Golongan === 'Golongan IIC').length;
    TotalPegawaiGolIID= posts.filter(p => p.Golongan === 'Golongan IID').length;
    TotalPegawaiGolIIIA = posts.filter(p => p.Golongan === 'Golongan IIIA').length;
    TotalPegawaiGolIIIB = posts.filter(p => p.Golongan === 'Golongan IIIB').length;
    TotalPegawaiGolIIIC = posts.filter(p => p.Golongan === 'Golongan IIIC').length;
   TotalPegawaiGolIIID = posts.filter(p => p.Golongan === 'Golongan IIID').length;
    TotalPegawaiGolIVA = posts.filter(p => p.Golongan === 'Golongan IVA').length;
    TotalPegawaiGolIVB = posts.filter(p => p.Golongan === 'Golongan IVB').length;
    TotalPegawaiGolIVC = posts.filter(p => p.Golongan === 'Golongan IVC').length;
    TotalPegawaiGolIVD = posts.filter(p => p.Golongan === 'Golongan IVD').length;
    TotalPegawaiGolIVE = posts.filter(p => p.Golongan === 'Golongan IVE').length;
    
    // Setelah menghitung, update data untuk chart
    genderData[0].count = TotalPegawaiPria;
    genderData[1].count = TotalPegawaiWanita;
    // Lanjutkan untuk educationData dan golonganData
    educationData[0].count = TotalPegawaiSD;
    educationData[1].count = TotalPegawaiSLTP;
    educationData[2].count = TotalPegawaiSLTA;
    educationData[3].count = TotalPegawaiDI;
    educationData[4].count = TotalPegawaiDII;
    educationData[5].count = TotalPegawaiDIII;
    educationData[6].count = TotalPegawaiSarjana;
    educationData[7].count = TotalPegawaiPascaSarjana;

    golonganData[0].count = TotalPegawaiGolIA;
    golonganData[1].count = TotalPegawaiGolIB;
    golonganData[2].count = TotalPegawaiGolIC;
    golonganData[3].count =  TotalPegawaiGolID;
    golonganData[4].count = TotalPegawaiGolIIA;
    golonganData[5].count =  TotalPegawaiGolIIB;
    golonganData[6].count = TotalPegawaiGolIIC;
    golonganData[7].count = TotalPegawaiGolIID;
    golonganData[8].count = TotalPegawaiGolIIIA;
    golonganData[9].count = TotalPegawaiGolIIIB;
    golonganData[10].count = TotalPegawaiGolIIIC;
    golonganData[11].count = TotalPegawaiGolIIID;
    golonganData[12].count = TotalPegawaiGolIVA;
    golonganData[13].count = TotalPegawaiGolIVB;
    golonganData[14].count = TotalPegawaiGolIVC;
     golonganData[15].count =  TotalPegawaiGolIVD;
      golonganData[16].count = TotalPegawaiGolIVE;
}

let genderChartCanvas;
let educationChartCanvas;
let golonganChartCanvas;

// Data statistik jenis kelamin
const genderData = [
  { gender: 'Pria', count: TotalPegawaiPria },
  { gender: 'Wanita', count: TotalPegawaiWanita }
];

// Data pendidikan terakhir
const educationData = [
   { education: 'SD', count: TotalPegawaiSD },
  { education: 'SLTP', count: TotalPegawaiSLTP },
  { education: 'SLTA', count: TotalPegawaiSLTA },
  { education: 'Diploma I (DI)', count: TotalPegawaiDI },
  { education: 'Diploma II (DII)', count: TotalPegawaiDII },
  { education: 'Diploma III (DIII)', count: TotalPegawaiDIII },
  { education: 'Sarjana (S1)', count: TotalPegawaiSarjana },
  { education: 'Pasca Sarjana (S2)', count: TotalPegawaiPascaSarjana }
];

// Data golongan
const golonganData = [
  { golongan: 'Gol IA', count: TotalPegawaiGolIA },
  { golongan: 'Gol IB', count: TotalPegawaiGolIB },
  { golongan: 'Gol IC', count: TotalPegawaiGolIC },
  { golongan: 'Gol ID', count: TotalPegawaiGolID },
  { golongan: 'Gol IIA', count: TotalPegawaiGolIIA},
  { golongan: 'Gol IIB', count: TotalPegawaiGolIIB },
  { golongan: 'Gol IIC', count: TotalPegawaiGolIIC},
  { golongan: 'Gol IID', count: TotalPegawaiGolIID },
  { golongan: 'Gol IIIA', count: TotalPegawaiGolIIIA },
  { golongan: 'Gol IIIB', count: TotalPegawaiGolIIIB },
  { golongan: 'Gol IIIC', count: TotalPegawaiGolIIIC },
  { golongan: 'Gol IIID', count: TotalPegawaiGolIIID },
  { golongan: 'Gol IVA', count: TotalPegawaiGolIVA },
  { golongan: 'Gol IVB', count: TotalPegawaiGolIVB },
  { golongan: 'Gol IVC', count: TotalPegawaiGolIVC },
  { golongan: 'Gol IVD', count: TotalPegawaiGolIVD },
  { golongan: 'Gol IVE', count: TotalPegawaiGolIVE }
];

  async function refreshData() {
    try {
        const pegawaiData = await getTableDataPegawai();
        allPosts = pegawaiData.documents || [];
        totalPosts = allPosts.length;

        // PANGGIL FUNGSI UPDATE STATISTIK DI SINI
        updateStatistics(allPosts);
        
    } catch (error) {
        console.error("Gagal memuat data pegawai:", error);
        allPosts = [];
        totalPosts = 0;
    }
}

onMount(() => {
    refreshData();
});



function getPercentage(count, total) {
  return ((count / total) * 100).toFixed(1);
}

// Fungsi untuk membuat pie chart jenis kelamin
function createGenderChart() {
  if (!genderChartCanvas) return;

  const genderTotal = genderData.reduce((sum, item) => sum + item.count, 0);

  // Jika total 0, jangan gambar chart untuk menghindari error
    if (genderTotal === 0) return; 

  
  const ctx = genderChartCanvas.getContext('2d');
  const centerX = genderChartCanvas.width / 2;
  const centerY = genderChartCanvas.height / 2;
  const radius = Math.min(centerX, centerY) - 50;
  
  // Clear canvas
  ctx.clearRect(0, 0, genderChartCanvas.width, genderChartCanvas.height);
  
  // Warna untuk setiap segmen
  const colors = ['#4472C4', '#E58B47'];
  
  let startAngle = 0;
  
  // Gambar pie chart
  genderData.forEach((item, index) => {
    const sliceAngle = (item.count / genderTotal) * 2 * Math.PI;
    
    // Gambar slice
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = colors[index];
    ctx.fill();
    
    // Gambar border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    startAngle += sliceAngle;
  });
  
  // Gambar legend
  const legendX = centerX - 60;
  const legendY = centerY + radius + 20;
  
  genderData.forEach((item, index) => {
    const x = legendX + (index * 80);
    
    // Kotak warna
    ctx.fillStyle = colors[index];
    ctx.fillRect(x, legendY, 12, 12);
    
    // Text
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(item.gender, x + 18, legendY + 10);
  });
}

// Fungsi untuk membuat bar chart pendidikan
function createEducationChart() {
  if (!educationChartCanvas) return;

   const educationTotal = educationData.reduce((sum, item) => sum + item.count, 0);
    if (educationTotal === 0) return;
  
  const ctx = educationChartCanvas.getContext('2d');
  const width = educationChartCanvas.width;
  const height = educationChartCanvas.height;
  const padding = 60;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Warna untuk setiap bar
  const colors = ['#4472C4', '#E58B47', '#A5A5A5', '#FFC000', '#5B9BD5'];
  
  // Cari nilai maksimum untuk scaling
  const maxValue = Math.max(...educationData.map(item => item.count));
  const scale = chartHeight / (maxValue + 2);
  
  // Lebar bar
  const barWidth = chartWidth / educationData.length * 0.8;
  const barSpacing = chartWidth / educationData.length;
  
  // Gambar grid lines
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= maxValue + 2; i += 2) {
    const y = height - padding - (i * scale);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }
  
  // Gambar bars
  educationData.forEach((item, index) => {
    const barHeight = item.count * scale;
    const x = padding + (index * barSpacing) + (barSpacing - barWidth) / 2;
    const y = height - padding - barHeight;
    
    // Gambar bar
    ctx.fillStyle = colors[index];
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Gambar label di atas bar
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(item.count.toString(), x + barWidth / 2, y - 5);
  });
  
  // Gambar Y-axis labels
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px Arial';
  ctx.textAlign = 'right';
  for (let i = 0; i <= maxValue + 2; i += 2) {
    const y = height - padding - (i * scale);
    ctx.fillText(i.toString(), padding - 10, y + 4);
  }
  
  // Gambar legend
  const legendStartX = padding;
  const legendY = height - 30;
  const legendItemWidth = 100;
  
  educationData.forEach((item, index) => {
    const x = legendStartX + (index * legendItemWidth);
    
    // Kotak warna
    ctx.fillStyle = colors[index];
    ctx.fillRect(x, legendY, 12, 12);
    
    // Text
    ctx.fillStyle = '#374151';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(item.education, x + 18, legendY + 10);
  });
}

// Fungsi untuk membuat bar chart golongan
function createGolonganChart() {
  if (!golonganChartCanvas) return;

    const golonganTotal = golonganData.reduce((sum, item) => sum + item.count, 0);
    if (golonganTotal === 0) return;
  
  const ctx = golonganChartCanvas.getContext('2d');
  const width = golonganChartCanvas.width;
  const height = golonganChartCanvas.height;
  const padding = 60;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Warna untuk setiap bar (berbagai warna)
  const colors = [
    '#4472C4', '#E58B47', '#A5A5A5', '#FFC000', '#5B9BD5',
    '#70AD47', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE',
    '#85C1E9', '#F8C471', '#82E0AA', '#F1948A', '#D2B4DE'
  ];
  
  // Filter data yang memiliki count > 0
  const filteredData = golonganData.filter(item => item.count > 0);
  
  if (filteredData.length === 0) return;
  
  // Cari nilai maksimum untuk scaling
  const maxValue = Math.max(...filteredData.map(item => item.count));
  const scale = chartHeight / (maxValue + 1);
  
  // Lebar bar
  const barWidth = chartWidth / filteredData.length * 0.8;
  const barSpacing = chartWidth / filteredData.length;
  
  // Gambar grid lines
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= maxValue + 1; i += 1) {
    const y = height - padding - (i * scale);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }
  
  // Gambar bars
  filteredData.forEach((item, index) => {
    const barHeight = item.count * scale;
    const x = padding + (index * barSpacing) + (barSpacing - barWidth) / 2;
    const y = height - padding - barHeight;
    
    // Gambar bar
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Gambar label di atas bar
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(item.count.toString(), x + barWidth / 2, y - 5);
  });
  
  // Gambar Y-axis labels
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px Arial';
  ctx.textAlign = 'right';
  for (let i = 0; i <= maxValue + 1; i += 1) {
    const y = height - padding - (i * scale);
    ctx.fillText(i.toString(), padding - 10, y + 4);
  }
  
  // Gambar legend dalam dua baris
  const legendStartX = padding;
  const legendY1 = height - 50;
  const legendY2 = height - 30;
  const legendItemWidth = 50;
  const itemsPerRow = Math.ceil(filteredData.length / 2);
  
  filteredData.forEach((item, index) => {
    const row = Math.floor(index / itemsPerRow);
    const col = index % itemsPerRow;
    const x = legendStartX + (col * legendItemWidth);
    const y = row === 0 ? legendY1 : legendY2;
    
    // Kotak warna
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(x, y, 10, 10);
    
    // Text
    ctx.fillStyle = '#374151';
    ctx.font = '9px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(item.golongan, x + 15, y + 8);
  });
}

// Fungsi untuk merender semua chart
function renderAllCharts() {
  // Tambahkan delay kecil untuk memastikan DOM sudah ready
  setTimeout(() => {
    if (genderChartCanvas) {
      genderChartCanvas.width = 350;
      genderChartCanvas.height = 280;
      createGenderChart();
    }
    
    if (educationChartCanvas) {
      educationChartCanvas.width = 500;
      educationChartCanvas.height = 300;
      createEducationChart();
    }
    
    if (golonganChartCanvas) {
      golonganChartCanvas.width = 900;
      golonganChartCanvas.height = 350;
      createGolonganChart();
    }
  }, 100);
}

// Reactive statement untuk merender chart ketika modal dibuka
$: if (ModalStatistic) {
  renderAllCharts();
}

onMount(() => {
  // Hapus inisialisasi chart dari onMount karena akan dijalankan via reactive statement
});
</script>

<svelte:head>
    <title>Data Pegawai Biro</title>
    <meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Informasi Data Pegawai Biro Pemerintahan & Otonomi Daerah - Prov. Sultra</Heading>
    <br/>

      {#if $user.prefs['Role'] !== "PIC Tata Usaha"}
    <Alert color="yellow">
    <span class="font-medium" style="font-weight:600;">Halaman ini hanya bisa di Update oleh PIC Tata Usaha</span>
    </Alert>
    <br/>
    {/if}

     {#if $user.prefs['Role'] === "PIC Tata Usaha"}
    <div class="grid grid-cols-3 gap-4" style=" background:white;padding: 18px 10px;border-radius: 12px;border:1px solid #cbd5e1;">
      <div class="col-span-2" style="font-size:22px;margin-left:10px;">Klik tombol di samping untuk menambah Data Pegawai Baru</div>
      <div class=""><Button style="box-shadow:rgb(102 144 246 / 40%) 5px 10px" color="blue" class="float-right" on:click={() => (ModalAddDataPegawai = true)}> <CheckPlusCircleOutline class="inline-flex w-6 h-6 mr-2 text-white-500 dark:text-white-400" /> Tambah Data Pegawai</Button>  </div>
     </div>
     <br/>
     {/if}

    <div class="flex items-center justify-center gap-2 p-2">
     <div class="flex w-full items-center justify-between rounded-xl border-2 border-slate-300 bg-white p-4 shadow-lg">
      <p class="text-xl font-semibold text-gray-700">Total Pegawai Tetap:</p>
      <div class="flex h-12 w-16 items-center justify-center rounded-lg bg-blue-100">
      <span class="text-3xl font-bold text-blue-400">{ TotalPegawaiTetap }</span>
      </div>
     </div>
      <div class="flex w-full items-center justify-between rounded-xl border-2 border-slate-300 bg-white p-4 shadow-lg">
       <p class="text-xl font-semibold text-gray-700">Total Pegawai Honorer:</p>
        <div class="flex h-12 w-16 items-center justify-center rounded-lg bg-blue-100">
       <span class="text-3xl font-bold text-blue-400">{ TotalPHT }</span>
       </div>
      </div>
    </div>
     
     <!-- Modal Add Data Pegawai -->
     <Modal size="lg" title="Form Data Pegawai Baru" bind:open={ModalAddDataPegawai} autoclose={false}>
        <form class="space-y-6" on:submit={addDatatoTable} >
         <h2 style="font-weight:600;margin-bottom:8px;color:#5850ec;">Silahkan mengisi Data Pegawai Baru pada Form di bawah berikut:</h2>
         <FloatingLabelInput style="filled" id="namaPegawai" name="namaPegawai" type="text">
          Nama Pegawai:
        </FloatingLabelInput>
        <div class="grid grid-cols-8 gap-4" style=" background: white;border-radius: 12px;">
          <div style="font-size:54px;margin-right:2px; margin-top:-14px;">🖼️</div>
          <div class="col-span-7"> <FloatingLabelInput style="filled" id="URLPhotoProfile" name="URLPhotoProfile" type="text">
            Paste URL Gambar dari Browse Photo Pegawai </FloatingLabelInput>  </div>
         </div>
        <FloatingLabelInput style="filled" id="NIPPegawai" name="NIPPegawai" type="text">
          NIP Pegawai:
        </FloatingLabelInput>
        <Label>Golongan:
        <Select class="mt-2" items={Golongan} name="GolPegawai" bind:value={selectGolongan} />
         </Label>  
         <Label>Jabatan:
         <Select class="mt-2" items={Jabatan} name="JabPegawai" bind:value={selectJabatan} />
         </Label>
         <Label>Jabatan Struktur Organisasi:
        <Select class="mt-2" items={jabatanOrganisasiTersedia} name="JabOrganisasiPegawai" bind:value={selectJabatanOrganisasi} />
        </Label>
        <div class="mb-6">
          <label for="tanggalLahir" class="text-sm">Tanggal Lahir Pegawai:</label>
          <Input style="margin-top:3px;" type="date" id="tanggalLahir" placeholder="Tanggal Lahir" name="tanggalLahir" disabled={tanggalLahirTidakDiketahui} />
        </div>
        <div class="flex items-center gap-2 mb-4"><Checkbox bind:checked={tanggalLahirTidakDiketahui}>
        Tanggal lahir tidak diketahui
        </Checkbox>
      </div>
        <br/>
        <label class="text-sm">Jenis Kelamin:</label>
          <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
          <li class="w-full"><Radio name="JKPegawai" class="p-3" value="Pria">Pria</Radio></li>
          <li class="w-full"><Radio name="JKPegawai" class="p-3" value="Wanita">Wanita</Radio></li>
          </ul> 
         <Label>
          Pendidikan Terakhir Pegawai:
          <Select class="mt-2" items={PendidikanTerakhir} name="PTPegawai" bind:value={selectPendidikanTerakhir} />
          </Label><br/>   
          <label class="text-sm">Status Pegawai:</label>
            <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
             <li class="w-full"><Radio name="jenisPegawai" class="p-3" value="Pegawai">Pegawai</Radio></li>
             <li class="w-full"><Radio name="jenisPegawai" class="p-3" value="PHT">PHT</Radio></li>
            </ul> 
            <div>
              <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tambah Data Pegawai</button>
            </div>     
          </form>  
          <svelte:fragment slot="footer">
            <Button color="alternative" on:click={()=> ModalAddDataPegawai = !ModalAddDataPegawai} >Batal</Button>
            <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
                <CheckCircleSolid slot="icon" class="w-5 h-5" />
                Data Pegawai berhasil ditambah. Form akan tutup dalam {counter}s.
              </Toast>
          </svelte:fragment>
        </Modal>
        
    <!-- Modal Edit Data Pegawai -->
    <Modal size="lg" title="Form Pengeditan Data Pegawai" bind:open={ModalEditData} autoclose={false}>
      <form class="space-y-6" on:submit={updateDataPegawai}>
       <FloatingLabelInput style="filled" id="namaPegawai" bind:value={getnamaPegawai} name="namaPegawai" type="text">
       Nama Pegawai:
       </FloatingLabelInput>
       <div class="grid grid-cols-8 gap-4" style="background: white;border-radius: 12px;">
        <div style="font-size:54px;margin-right:2px; margin-top:-14px;">🖼️</div>
        <div class="col-span-7"> <FloatingLabelInput style="filled" id="URLPhotoProfile" bind:value={getURLPhotoProfile} name="URLPhotoProfile" type="text">
          Paste URL Gambar dari Browse Photo Pegawai </FloatingLabelInput>  </div>
        </div>
       <FloatingLabelInput style="filled" id="NIPPegawai" bind:value={getNIPPegawai} name="NIPPegawai" type="text">
       NIP Pegawai:
       </FloatingLabelInput>
       <Label>Golongan:
       <Select class="mt-2" items={Golongan} name="GolPegawai" bind:value={getGolPegawai} />
       </Label>  
        <Label>Jabatan:
        <Select class="mt-2" items={Jabatan} name="JabPegawai" bind:value={getJabPegawai} />
        </Label>
        <Label>Jabatan Struktur Organisasi:
        <Select class="mt-2" items={jabatanOrganisasiTersedia} name="JabOrganisasiPegawai" bind:value={getJabatanOrganisasi} />
        </Label>
        <div class="mb-6">
        <label for="tanggalLahir" class="text-sm">Tanggal Lahir Pegawai:</label>
       <Input style="margin-top:3px;" type="date" id="tanggalLahir" bind:value={getTanggalLahir} placeholder="Tanggal Lahir" name="tanggalLahir" />
        </div><br/>
       <label class="text-sm">Jenis Kelamin:</label>
       <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="JKPegawai" bind:group={getJKPegawai} class="p-3" value="Pria">Pria</Radio></li>
        <li class="w-full"><Radio name="JKPegawai" bind:group={getJKPegawai} class="p-3" value="Wanita">Wanita</Radio></li>
        </ul> 
        <Label>
        Pendidikan Terakhir Pegawai:
        <Select class="mt-2" items={PendidikanTerakhir} name="PTPegawai" bind:value={getPTPegawai} />
        </Label><br/>   
        <label class="text-sm">Status Pegawai:</label>
        <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
        <li class="w-full"><Radio name="jenisPegawai" bind:group={getjenisPegawai} class="p-3" value="Pegawai">Pegawai</Radio></li>
        <li class="w-full"><Radio name="jenisPegawai" bind:group={getjenisPegawai} class="p-3" value="PHT">PHT</Radio></li>
        </ul> 
        <div>
        <button type="submit" value="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Data</button>
        </div>     
          </form>  
          <svelte:fragment slot="footer">
            <Button color="alternative" on:click={()=> ModalEditData = !ModalEditData} >Batal</Button>
            <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
              <CheckCircleSolid slot="icon" class="w-5 h-5" />
              Data Pegawai berhasil diupdate. Form akan tutup dalam {counter}s.
            </Toast>
          </svelte:fragment>
        </Modal>

    <br/>
    {#if totalPosts === 0}
     <p>Saat ini Tidak Terdapat Data Pegawai Pada Tabel</p>
     {:else}
    <p>Terdapat <strong>{totalPosts}</strong> Data Pegawai Pada Biro Pemerintahan dan Otonomi Daerah Sultra / <strong style="border-bottom: 2px dotted;color:#4b4bdb;cursor: pointer;" on:click={() => (ModalStatistic = true)}>Lihat Statistik Data Pegawai</strong></p>
     {/if}
     <br/>

      <Modal size="xl" title="Statistik Pegawai di Biro Pemerintahan & Otonomi Daerah Sulawesi Tenggara" bind:open={ModalStatistic} autoclose outsideclose>
          Jumlah Total Pegawai Keseluruhan adalah { TotalDataPegawai }  <br/>
          Jumlah Total Pegawai Tetap adalah { TotalPegawaiTetap }  <br/>
          Jumlah Total Pegawai Honorer adalah { TotalPHT } <br/>
					<br/>
				<div>
          <div class="top-charts">
           <!-- Pie Chart Jenis Kelamin -->
            <div class="chart-section">
            <h3>Statistik Berdasarkan Jenis Kelamin</h3>
              <div class="chart-container">
               <canvas bind:this={genderChartCanvas}></canvas>
              </div>
                	<div style="margin-top: 20px;display: flex;flex-direction: column;gap: 10px;font-size:14px;">
		               <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			             <span class="stat-label" style="font-weight: 600;color: #374151;">Pria:</span>
			             <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiPria } </span>
		               </div>
		               <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			              <span class="stat-label" style="font-weight: 600;color: #374151;">Wanita:</span>
			              <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiWanita } </span>
		                </div>
	                </div>
             </div>
    
          <!-- Bar Chart Pendidikan -->
           <div class="chart-section">
           <h3>Statistik Berdasarkan Pendidikan Terakhir</h3>
           <div class="chart-container">
           <canvas bind:this={educationChartCanvas}></canvas>
           </div>
               <div style="margin-top: 20px;display: flex;flex-direction: row;gap: 8px;font-size:14px;">
		               <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			             <span class="stat-label" style="font-weight: 600;color: #374151;">SD:</span>
			             <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiSD } </span>
		               </div>
                  <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			             <span class="stat-label" style="font-weight: 600;color: #374151;">SLTP:</span>
			             <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiSLTP } </span>
		               </div>
		               <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			              <span class="stat-label" style="font-weight: 600;color: #374151;">SLTA:</span>
			              <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiSLTA } </span>
		                </div>
                    <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			              <span class="stat-label" style="font-weight: 600;color: #374151;">Diploma I (DI):</span>
			              <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiDI } </span>
		                </div>
                    <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			              <span class="stat-label" style="font-weight: 600;color: #374151;">Diploma II (DII):</span>
			              <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiDII } </span>
		                </div>
                    <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			              <span class="stat-label" style="font-weight: 600;color: #374151;">Diploma III (DIII):</span>
			              <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiDIII } </span>
		                </div>
                    <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			              <span class="stat-label" style="font-weight: 600;color: #374151;">Sarjana (SI):</span>
			              <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiSarjana } </span>
		                </div>
                    <div class="stat-item" style="display: flex;justify-content: space-between;align-items: center;padding: 10px 15px;background: #f8fafc;border-radius: 8px;border-left: 4px solid #3b82f6;">
			              <span class="stat-label" style="font-weight: 600;color: #374151;">Pasca Sarjana (SII):</span>
			              <span class="stat-value" style="font-weight: bold;color: #1f2937;">{ TotalPegawaiPascaSarjana } </span>
		                </div>
	                </div>
           </div>
            </div>
  
           <!-- Bar Chart Golongan -->
           <div class="chart-section full-width">
          <h3>Statistik Berdasarkan Golongan</h3>
          <div class="chart-container">
          <canvas bind:this={golonganChartCanvas} width="1100" height="400" style="width:1100px;height:340px;"></canvas>
          </div>
          </div>
      </div>
					<svelte:fragment slot="footer">
					  <Button>Tutup</Button>
					</svelte:fragment>
				  </Modal>

    <!-- Search Form -->
    <form class="flex items-center w-full mx-auto" style="width:100%;">   
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                </svg>
            </div>
            <input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari berdasarkan Nama pada Tabel yang tampil ..." required />
        </div>
        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
        </button>
    </form>

    <!-- Pagination dengan Items per Page -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
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

    <section>
       <br/>
        <Table id="TABLE_Pegawai" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
        <TableHead>
        <TableHeadCell style="font-size: larger; width: 8%;" class="py-4 content-start">No</TableHeadCell>
        <TableHeadCell style="font-size: larger; width: 35%;" class="py-4 content-start">Nama</TableHeadCell>
        <TableHeadCell style="font-size: larger; width: 47%;" class="py-4 content-start">Detail</TableHeadCell>
        {#if $user.prefs['Role'] === "PIC Tata Usaha"}
        <TableHeadCell style="font-size: larger; width: 10%;" class="py-4 content-start">Tombol Tindakan</TableHeadCell>
        {/if}
         </TableHead>
         
          <TableBody tableBodyClass="divide-y">
             {#each allPosts as cetakTabel, i}	
             {#if i >= postRangeLow && i < postRangeHigh}
             <TableBodyRow class="hover:bg-blue-100">
             <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">{i+1}</TableBodyCell>
              <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">
                  <div style="width:160px;">
                      <Avatar src={cetakTabel.URL_PhotoProfile || undefined } class="align-middle" border rounded size="lg" /> 
                      <br/>{cetakTabel.Nama} 
                     <br/><br/><b>Tanggal Lahir:</b> {cetakTabel.Tanggal_lahir ? cetakTabel.Tanggal_lahir.slice(0, 10) : 'Tidak diketahui'}
                      <br/><br/><b>Gender:</b><br/>{cetakTabel.Jenis_Kelamin}
                  </div> 
              </TableBodyCell>
              <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">
                  <div style="width:180px;">
                      <b>NIP:</b><br/>{cetakTabel.NIP}<br/>
                      <br/><b>Golongan:</b><br/>{cetakTabel.Golongan}<br/>
                      <br/><b>Jabatan:</b><br/>{cetakTabel.Jabatan}<br/>
                       <br/><b>Jabatan Struktur Organisasi:</b>
                              <br/>{#if cetakTabel.jabatanOrganisasi === 'TIDAK_DITAMPILKAN'}
                              Tidak Ditampilkan
                               {:else}
                               {cetakTabel.jabatanOrganisasi || 'Belum Diatur'}
                              {/if}
                      <br/><br/><b>Pendidikan Terakhir:</b><br/>{cetakTabel.Pendidikan_Terakhir}  
                      <br/><br/><b>Status Pegawai:</b><br/>{cetakTabel.Jenis_Pegawai}
                  </div>
              </TableBodyCell>
              {#if $user.prefs['Role'] === "PIC Tata Usaha"}
              <TableBodyCell style="font-size: larger;" class="py-4 whitespace-break-spaces content-start">
                <ButtonGroup class="*:!ring-primary-700">
                  <Button id="EditTombol" style="color:blue;" on:click={() => getDataPegawai(cetakTabel.$id)}>
                    <EditOutline class="w-6 h-6 me-2" />
                  </Button>
                   <Button id="DeleteTombol" style="color:red;" on:click={() => openDeleteModal(cetakTabel.$id, cetakTabel.Nama)}>
                      <TrashBinOutline class="w-6 h-6 me-2" />
                  </Button>
                </ButtonGroup> 
                <Popover triggeredBy="#EditTombol" class="w-18 h-14 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom">
                  Edit
                 </Popover> 
                 <Popover triggeredBy="#DeleteTombol" class="w-18 h-14 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom">
                  Delete
                 </Popover>   
             </TableBodyCell>  
             {/if}
             </TableBodyRow>
             {/if}
             {/each}
          </TableBody>
        </Table>
        
        <!-- Modal Delete -->
        <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
          <div class="text-center">
            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data Pegawai ini dengan a.n {selectedNama}?</h3>
            <Button color="red" class="me-2" on:click={() => remove(selectedId)}>Ya, Hapus Sekarang</Button>
            <Button color="alternative" on:click={()=> ConfirmDeleteModal = !ConfirmDeleteModal}>Tidak, Batal</Button>
          </div>
        </Modal>
        
        <br/>
        
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
 
 /* Table responsive */
 @media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  /* Responsive table column widths for mobile */
  .table-responsive th:nth-child(1) { width: 10%; } /* No */
  .table-responsive th:nth-child(2) { width: 40%; } /* Nama */
  .table-responsive th:nth-child(3) { width: 35%; } /* Detail */
  .table-responsive th:nth-child(4) { width: 15%; } /* Tombol */
 }

 /* Modal Chart */
 .top-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
  }
  
  .chart-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #90EE90;
  }
  
  .full-width {
    grid-column: 1 / -1;
  }
  
  .chart-section h3 {
    margin: 0 0 20px 0;
    color: #1f2937;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  
  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .education-label {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    color: #6b7280;
  }
  
  canvas {
    max-width: 100%;
    height: auto;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .top-charts {
      grid-template-columns: 1fr;
    }
    
    .container {
      padding: 15px;
    }
    
    .chart-section {
      padding: 20px;
    }
  }
 </style>