<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { ArrowRightAltSolid } from 'flowbite-svelte-icons';

    import { Pie, Bar } from 'svelte-chartjs';
    import {
        Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement
    } from 'chart.js';

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

    function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("TablePegawai");
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

    // Variabel dasar yang berisi daftar pegawai tetap.
    $: PegawaiTetap = data.TableDataSPegawai?.documents || [];

    // Gunakan reduce untuk menghitung semua statistik dalam satu kali loop agar lebih efisien
    $: stats = PegawaiTetap.reduce((acc, pegawaiList) => {
        // Hitung Jenis Kelamin
        if (pegawaiList.Jenis_Kelamin === 'Pria') acc.gender.Pria++;
        if (pegawaiList.Jenis_Kelamin === 'Wanita') acc.gender.Wanita++;

        // Hitung Pendidikan
        const educationKey = pegawaiList.Pendidikan_Terakhir;
        // PERBAIKAN: Gunakan operator 'in' untuk memeriksa keberadaan kunci
        if (educationKey in acc.education) {
            acc.education[educationKey]++;
        }

        // Hitung Golongan
        const groupKey = pegawaiList.Golongan?.replace('Golongan ', ''); // Ambil 'IIIA' dari 'Golongan IIIA'
        // PERBAIKAN: Gunakan operator 'in' untuk memeriksa keberadaan kunci
        if (groupKey in acc.groups) {
            acc.groups[groupKey]++;
        }
        
        return acc;
    }, {
        gender: { Pria: 0, Wanita: 0 },
        education: { 'SD': 0, 'SLTP': 0, 'SLTA': 0, 'Diploma I (D1)': 0, 'Diploma I (D2)': 0, 'Diploma III (D3)': 0, 'Sarjana (S1)': 0, 'Pasca Sarjana (S2)': 0 },
        groups: { 'IA': 0, 'IB': 0, 'IC': 0, 'ID': 0, 'IIA': 0, 'IIB': 0, 'IIC': 0, 'IID': 0, 'IIIA': 0, 'IIIB': 0, 'IIIC': 0, 'IIID': 0, 'IVA': 0, 'IVB': 0, 'IVC': 0, 'IVD': 0, 'IVE': 0 }
    });


    $: TotalPegawaiTetap = PegawaiTetap.length;

    // --- 1. DATA CHART JENIS KELAMIN (PIE) ---
    $: genderData = {
        labels: ['Pria', 'Wanita'],
        datasets: [{
            data: [stats.gender.Pria, stats.gender.Wanita],
            backgroundColor: ['#3B82F6', '#F97316'],
            hoverBackgroundColor: ['#2563EB', '#EA580C'],
            borderWidth: 0,
        }],
    };
    
    // --- 2. DATA CHART PENDIDIKAN (BAR) ---
    $: educationData = {
        labels: ['SD', 'SLTP', 'SLTA', 'DIPLOMA (DI)', 'DIPLOMA (DII)', 'DIPLOMA (DIII)', 'SARJANA (SI)', 'PASCA SARJANA (SII)'],
        datasets: [{
            label: 'Jumlah Pegawai',
            data: [
                stats.education['SD'],
                stats.education['SLTP'],
                stats.education['SLTA'],
                stats.education['Diploma I (D1)'],
                stats.education['Diploma II (D2)'],
                stats.education['Diploma III (D3)'],
                stats.education['Sarjana (S1)'],
                stats.education['Pasca Sarjana (S2)']
            ],
            backgroundColor: '#3B82F6',
        }],
    };

    // --- 3. DATA CHART GOLONGAN (BAR) ---
    $: groupData = {
        labels: ['IA', 'IB', 'IC', 'ID', 'IIA', 'IIB', 'IIC', 'IID', 'IIIA', 'IIIB', 'IIIC', 'IIID', 'IVA', 'IVB', 'IVC', 'IVD', 'IVE'],
        datasets: [{
            label: 'Data Pegawai Berdasarkan Golongan',
            data: Object.values(stats.groups), // Mengambil nilai dari objek stats.groups
            backgroundColor: '#3B82F6',
        }],
    };
    
    // Opsi untuk chart (tetap sama)
    const genderOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };
    const educationOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 0 } } }, scales: { y: { beginAtZero: true, max: 16 } } };
    const groupOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 0 } } }, scales: { y: { beginAtZero: true, max: 7 } } };


    // --- FUNGSI UNTUK MENGURUTKAN DATA TABEL BERDASARKAN GOLONGAN ---
    const romanMap = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4 };

    function compareGolongan(a, b) {
        // Ekstrak bagian penting dari string 'Golongan IIIA' -> ['III', 'A']
        const partsA = a.Golongan?.replace('Golongan ', '').match(/([IVXLCDM]+)([A-E])/);
        const partsB = b.Golongan?.replace('Golongan ', '').match(/([IVXLCDM]+)([A-E])/);

        if (!partsA) return 1; // Pindahkan data tanpa golongan ke akhir
        if (!partsB) return -1;

        const romanValueA = romanMap[partsA[1]];
        const romanValueB = romanMap[partsB[1]];

        // Bandingkan berdasarkan angka romawi dulu
        if (romanValueA !== romanValueB) {
            return romanValueB - romanValueA; // Mengurutkan dari terbesar ke terkecil (IV > III)
        }

        // Jika sama, bandingkan berdasarkan huruf
        return partsB[2].localeCompare(partsA[2]); // Mengurutkan dari terbesar ke terkecil (D > C)
    }

    // Variabel reaktif baru yang berisi data pegawai tetap yang sudah diurutkan
    $: sortedPegawaiTetap = [...PegawaiTetap].sort(compareGolongan);
</script>

<svelte:head>
    <title>Data Pegawai</title>
    <meta name="description" content="Data Pegawai - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/>
<div class="page-container">
    <header class="info-card">
        <div class="logo">
            <img src="/LogoSultra.webp" alt="Logo Sulawesi Tenggara"/>
        </div>
        <div class="title-container">
            <h1>INFOGRAFIS DATA PEGAWAI DI BIRO PEMERINTAHAN DAN OTONOMI DAERAH</h1>
            <h2>SULAWESI TENGGARA</h2>
        </div>
    </header>

    <nav class="nav-container">
        <a href="/data-pegawai/#infografis" class="nav-button">INFOGRAFIS</a>
        <a href="/data-pegawai/#data-pegawai" class="nav-button">DATA PEGAWAI</a>
    </nav>
</div>

<div class="container mx-auto px-4">
     <Heading id="infografis" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> INFOGRAFIS PEGAWAI
    </Heading>

    <div class="bg-slate-50 min-h-screen p-4 sm:p-6 md:p-8 font-sans" style="border-radius:14px;">
        
        <div class="w-full max-w-2xl bg-white border-2 border-green-500 rounded-xl shadow-sm p-4 sm:p-6 mx-auto">
            <div class="flex items-center justify-between space-x-4">  
                <div>
                    <h1 class="text-sm sm:text-base font-semibold text-gray-800 tracking-wide uppercase">
                        Total Pegawai Biro Pemerintahan dan Otonomi
                    </h1>
                    <p class="text-xs sm:text-sm text-gray-600 tracking-wide uppercase">
                        Daerah Prov. Sulawesi Tenggara
                    </p>
                </div>
                
                <div>
                    <span class="text-4xl sm:text-6xl font-bold text-gray-900">
                        { TotalPegawaiTetap }
                    </span>
                </div>
            </div>
        </div>
        <br/>
        
        <main class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-2xl shadow-md border border-green-300">
                <h2 class="text-center text-xl font-semibold text-gray-700 mb-6">
                    Data Pegawai Berdasarkan Jenis Kelamin
                </h2>
                <div class="h-64 flex flex-col sm:flex-row items-center justify-center gap-8">
                    <div class="relative w-full h-full max-w-[250px] sm:max-w-none">
                        <Pie data={genderData} options={genderOptions} />
                    </div>
                    <div class="flex flex-row sm:flex-col gap-4 sm:gap-2 text-sm self-center sm:self-end">
                        <div class="flex items-center gap-2">
                            <span class="w-4 h-4 bg-blue-500"></span>
                            <span>Pria</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-4 h-4 bg-orange-500"></span>
                            <span>Wanita</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-md border border-green-300">
                <h2 class="text-center text-xl font-semibold text-gray-700 mb-6">
                    Data Pegawai Berdasarkan Jenjang Pendidikan
                </h2>
                <div class="h-80 relative">
                    <Bar data={educationData} options={educationOptions} />
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-md border border-green-300 lg:col-span-2">
                <h2 class="text-center text-xl font-semibold text-gray-700 mb-6">
                    Data Pegawai Berdasarkan Golongan
                </h2>
                <div class="h-80 relative">
                    <Bar data={groupData} options={groupOptions} />
                </div>
            </div>
        </main>
    </div>

    <br/>

    <Heading id="data-pegawai" tag="h3" class="mb-4 mt-14 flex items-center gap-2" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl" style="color:#1f4d8c;">
        <ArrowRightAltSolid class="-ml-3 h-7 w-7 md:h-8 md:w-8 lg:h-8 lg:w-8" /> DATA PEGAWAI
    </Heading>
    
    <form class="flex items-center w-full mx-auto" style="width:100%;">   
		<label for="simple-search" class="sr-only">Search</label>
		<div class="relative w-full">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
				</svg>
			</div>
			<input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Berdasarkan Nama Pegawai ..." required />
		</div>
		<button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			</svg>
			<span class="sr-only">Search</span>
		</button>
	</form>
     <br/>
   <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <Table hoverable={true} id="TablePegawai">
        <TableHead>
            <TableHeadCell>No.</TableHeadCell>
            <TableHeadCell>Nama Lengkap</TableHeadCell>
             <TableHeadCell>NIP</TableHeadCell>
            <TableHeadCell>Jabatan</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
            {#if sortedPegawaiTetap && sortedPegawaiTetap.length > 0}
                {#each sortedPegawaiTetap as pegawai, i}
                    <TableBodyRow>
                        <TableBodyCell>{i + 1}</TableBodyCell>
                        <TableBodyCell class="font-medium text-gray-900 whitespace-nowrap">{pegawai.Nama || '-'}</TableBodyCell>
                        <TableBodyCell>{pegawai.NIP || '-'}</TableBodyCell>
                        <TableBodyCell>{pegawai.Jabatan || '-'}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            {:else}
                <TableBodyRow>
                    <TableBodyCell colspan="5" class="text-center">
                        Data pegawai tetap tidak ditemukan.
                    </TableBodyCell>
                </TableBodyRow>
            {/if}
        </TableBody>
    </Table>
  </div>
</div>

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
</style>