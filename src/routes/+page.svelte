<script>
	import { Tabs, TabItem, Heading, Mark, Span, Marquee, Button, Modal, Popover, Avatar, Timeline, TimelineItem, Chart, Card, Indicator, Badge, CloseButton, AccordionItem, Accordion, Tooltip, Video} from 'flowbite-svelte';
	import { onMount, onDestroy } from 'svelte';
	import ApexCharts from 'apexcharts';
	let clickOutsideModal = false;
	import { cascade } from 'svelte-typewriter';
	import {slide } from 'svelte/transition';
	import { BriefcaseSolid, InfoCircleSolid, ClockOutline, DrawSquareSolid, NewspaperSolid, BuildingSolid, ProfileCardSolid, ArrowRightOutline, CalendarWeekSolid, ImageSolid, RectangleListOutline, DrawSquareOutline, InfoCircleOutline, FileCheckOutline, UserHeadsetOutline } from 'flowbite-svelte-icons';
	import ImageKSwasta from '$lib/images/Kerjasama-Pihak-Swasta.webp';
	import ImageKAinstansi from '$lib/images/Kerjasama-Antar-Instansipemerintah.webp';
	import ImageKLuarNegeri from '$lib/images/Kerjasama-Luar-Negeri.webp';
	import PenataanWilayahimg from '$lib/images/Penataan-wilayah.webp';
	import KodeWilayahimg from '$lib/images/Kode-Wilayah.webp';
	import Otonomiimg from '$lib/images/otonomi.webp';
	import regionimg from '$lib/images/region.webp';
	import laporanimg from '$lib/images/laporan.webp';
	import Inventarisasiotonomi from '$lib/images/inventarisasi-otonomi-baru.webp';
	import videoURL from '$lib/videos/Sipapaode-Sultra.mp4';
	import penerbitanSKimg from '$lib/images/SK.webp';
	import ImagelogoSultra from '$lib/images/Sultra-Logo.webp';
	import UlaSiolaLogo from '$lib/images/Ula-Siola.webp';
	import SILPPDLogo from '$lib/images/SILPPD.webp';
	import laporLogo from '$lib/images/Lapor.webp';
	import sultraprovLogo from '$lib/images/Sultraprov.webp';
	import PicProfileM from '$lib/images/ProfileM.webp';
	import PicProfileF from '$lib/images/ProfileF.webp';
	import PicKabagKS from '$lib/images/Hidayat.webp';
	import PicTU from '$lib/images/Irma-Fitayanti.webp';
	import Berakhlak from '$lib/images/Berakhlak.webp';
	import Karo from '$lib/images/Karo.webp';
	import { databases } from '$lib/appwrite';
	import { fly } from 'svelte/transition';
	import LogoBombana from '$lib/images/Kabupaten Bombana.png';
	import LogoWakatobi from '$lib/images/Kabupaten Wakatobi.png';
	import LogoKendari from '$lib/images/Kota Kendari.png';
	import LogoKonawe from '$lib/images/Kabupaten Konawe.png';
	import LogoKonaweUtara from '$lib/images/Kabupaten Konawe Utara.png';

	
	// In this locale "," is the decimal separator and "." is the group separator
	const locale = 'id-ID'
	const numDecimals = 2;
	const formatter = new Intl.NumberFormat(locale, {maximumFractionDigits: numDecimals});

	
	let ModalmapBombana, ModalmapWakatobi, ModalmapKendari, ModalmapKonawe, ModalmapKonaweUtara = false;
	
	let visibleBombana = false;
	let visibleWakatobi = false;
	let visibleKendari = false;
	let visibleKonawe = false;
	let visibleKonaweUtara = false;
	let closeBombana, closeWakatobi, closeKendari, closeKonawe, closeKonaweUtara;

	function onWindowClick(e) {
		if (closeBombana.contains(e.target) == false)
		visibleBombana = false;
		if (closeWakatobi.contains(e.target) == false)
		visibleWakatobi = false;
		if (closeKendari.contains(e.target) == false)
		visibleKendari = false;
		if (closeKonawe.contains(e.target) == false)
		visibleKonawe = false;
		if (closeKonaweUtara.contains(e.target) == false)
		visibleKonaweUtara = false;
	}

export let data=[];

let OnlineKSpihakKetiga  = data.TableDatasLayananOnline.documents[9];
let OnlineKSpemerintahdaerahkl  = data.TableDatasLayananOnline.documents[8];
let OnlineLaporanEvaluasiKS  = data.TableDatasLayananOnline.documents[7];
let DaerahOB  = data.TableDatasLayananOnline.documents[6];
let infoKDW  = data.TableDatasLayananOnline.documents[5];
let penataanWP  = data.TableDatasLayananOnline.documents[4];
let standarPM  = data.TableDatasLayananOnline.documents[3];
let penerbitanSKgub  = data.TableDatasLayananOnline.documents[2];
let lppdLKPJ  = data.TableDatasLayananOnline.documents[1];
let InventarisasiPOB  = data.TableDatasLayananOnline.documents[0];
let BannerInfo  = data.TableDatasTextInfo.documents[0];

let DataBombana  = data.TableDatasWilayah.documents[16];
let DataWakatobi  = data.TableDatasWilayah.documents[2];
let DataKotaKendari  = data.TableDatasWilayah.documents[0];
let DataKonawe = data.TableDatasWilayah.documents[8];
let DataKonaweUtara  = data.TableDatasWilayah.documents[5];

let DataLW = [
          { x: 'Kab. Bombana', y: DataBombana.Luas_Wilayah },
		  { x: 'Kab. Wakatobi', y: DataWakatobi.Luas_Wilayah },
		  { x: 'Kota Kendari', y: DataKotaKendari.Luas_Wilayah },
		  { x: 'Kab. Konawe', y: DataKonawe.Luas_Wilayah },
		  { x: 'Kab. Konawe Utara', y: DataKonaweUtara.Luas_Wilayah }
        ];
	
let DataJP = [
          { x: 'Kab. Bombana', y: DataBombana.J_Penduduk },
		  { x: 'Kab. Wakatobi', y: DataWakatobi.J_Penduduk },
		  { x: 'Kota Kendari', y: DataKotaKendari.J_Penduduk },
		  { x: 'Kab. Konawe', y: DataKonawe.J_Penduduk },
		  { x: 'Kab. Konawe Utara', y: DataKonaweUtara.J_Penduduk }
        ];

	let chart;
	let chartElement;
	let selectedData = DataJP;
	let currentDataName = 'Jumlah Penduduk';
	let colorChart = '#1A56DB';

/** Chart Data **/
	const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name:  currentDataName,
        color: colorChart,
        data: selectedData 
      }  
    ],
    chart: {
      type: 'bar',
      height: '320px',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadiusApplication: 'end',
        borderRadius: 8
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1
        }
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    fill: {
      opacity: 1
    }
  };
 /** End Chart **/

    // Function to update chart data
	function updateChartData(newData, dataName, colorChartdata) {
		selectedData = newData;
		currentDataName = dataName;
		colorChart = colorChartdata;
		
		// Update the series data
		chart.updateSeries([{
			name: dataName,
			data: newData,
			color: colorChartdata
		}]);
	}

	onMount(() => {
    // Create the chart when the component mounts
    if (typeof window !== 'undefined') {
      chart = new ApexCharts(chartElement, {
        ...options,
        series: [{
          name: currentDataName,
          data: selectedData
        }]
      });
      chart.render();
    }
  });

	onDestroy(() => {
		// Destroy the chart when the component is destroyed
		if (chart) {
			chart.destroy();
		}
	});

  
function ReadMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("ReadMore");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "[+] Lihat Lebih Banyak"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "[-] Lihat Lebih Sedikit"; 
    moreText.style.display = "inline"; 
  }
}


// Ambil data gallery
$: quotes = data.TableDatasGallery?.documents || [];

  let currentIndex = 0;

function nextQuote() {
  currentIndex = (currentIndex + 1) % quotes.length;
}

function prevQuote() {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
}


// Variabel untuk mempermudah akses data Pegawai di HTML
    // Menggunakan $: (reactive statement) agar otomatis update jika data berubah
    $: pegawai = data.pegawaiByJabatan || {};

    // Pejabat Utama
    $: kepalaBiro = pegawai['Kepala Biro'];
    $: kabidTU = pegawai['Kepala Bidang Tata Usaha']; // Sesuai nama jabatan di DB
    $: kabidKS = pegawai['Kepala Bidang Kerjasama'];
    $: koorPemerintahan = pegawai['Kepala Bidang Koordinator Pemerintahan'];
    $: koorOtda = pegawai['Kepala Bidang Koordinator Otonomi Daerah'];

    // Staff Kerjasama
    $: staffKS1 = pegawai['Staff I Bidang Kerjasama'];
    $: staffKS2 = pegawai['Staff II Bidang Kerjasama'];
    $: staffKS3 = pegawai['Staff III Bidang Kerjasama'];

    // Staff Pemerintahan
    $: staffPemerintahan1 = pegawai['Staff I Bidang Koordinator Pemerintahan'];
    $: staffPemerintahan2 = pegawai['Staff II Bidang Koordinator Pemerintahan'];
    $: staffPemerintahan3 = pegawai['Staff III Bidang Koordinator Pemerintahan'];

    // Staff Otonomi Daerah
    $: staffOtda1 = pegawai['Staff I Bidang Koordinator Otonomi Daerah'];
    $: staffOtda2 = pegawai['Staff II Bidang Koordinator Otonomi Daerah'];
    $: staffOtda3 = pegawai['Staff III Bidang Koordinator Otonomi Daerah'];

 // Item yang sedang ditampilkan
 $: currentItem = quotes[currentIndex] || {};

 function formatTanggalIndonesia(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}


</script>

<svelte:window on:click={onWindowClick} />

<svelte:head>
	<title>Sipapaode | Biro Pemerintahan dan Otonomi Daerah Sultra</title>
	<meta name="description" content="Sipapaode | Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>



<!--  Section TOP Header -->

<section>
	<br/>

  <div class="container">
	 <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
		<div class="col-span-2 rounded-xl pr-3" style="padding: 20px 24px;background:linear-gradient(135deg, rgb(255, 255, 255), #F1F5F8);border-radius: 16px;">
		<Heading tag="h3" class="mb-4" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl" style="line-height:1.2;">Sistem Informasi Pelayanan <Mark class="dark:bg-blue-300 bg-blue-400" style="background:#759ABD;">Biro Pemerintahan</Mark> & <Mark class="dark:bg-blue-300 bg-blue-400" style="background:#759ABD;">Otonomi Daerah</Mark> Berbasis Digital di <Span gradient><b use:cascade={{ interval: 100 }}><b>Provinsi Sulawesi Tenggara</b></b></Span></Heading>
			<br/><h2 class="text-3xl font-extrabold">SIPAPAODE</h2>
		        <span class="morenext flex flex-wrap items-center gap-2 w-64">
				 <label style="border-bottom:1px dotted;margin-left:4px;">Tentang.</label> <Button on:click={() => (clickOutsideModal = true)} pill={true} outline={true} class="arrowvisit !p-2 size-8" color="blue"><ArrowRightOutline class="w-6 h-6" /></Button>
				</span>
				  <Modal size="lg" title="Hai, Selamat Datang di Situs Web Biro Pemerintahan dan Otonomi Daerah Prov. Sulawesi Tenggara (Sipapaode)" bind:open={clickOutsideModal} autoclose outsideclose>
					Di situs web Aplikasi Sipapaode ini, Anda dapat mengakses beragam layanan dan informasi yang disediakan oleh Biro Pemerintahan dan Otonomi Daerah Setda Prov. Sultra, antara lain Pengajuan Kerjasama dengan Prov. Sultra secara Online, serta Informasi Data Pemerintahan se-Sultra dan lainnya. Berikut adalah Beberapa Fasilitas Informasi, pada web Sipapaode: 
					<br/>
						<ul class="list-disc">
						<li><b style="color:#6767c3;">Pengajuan dan Tracking Informasi Kerjasama dengan Pemerintah Prov. Sultra.</b><br/>Pengajuan Kerjasama dengan Pemerintah Prov. Sultra dapat dilakukan secara Online dan mentracking progress laporan Kerjasama secara real time.</li>
						<li><b style="color:#6767c3;">Database laporan Evaluasi Kerjasama se-Prov. Sultra.</b><br/>Pendataan laporan Evaluasi Kerjasama Pemerintahan Daerah se-Sultra terdokumentasi dengan baik yang sewaktu-waktu dapat diakses kapan saja dan dimana saja selama terhubung Internet. </li>   
						<li><b style="color:#6767c3;">Database Informasi dan Pelaporan Standar Pelayanan Minimum (SPM).</b><br/>Database Dokumentasi Laporan Standar Pelayanan Minimum (SPM) pemerintah se-Prov Sultra. </li>
						<li><b style="color:#6767c3;">Informasi Fasilitas Penataan Wilayah Pemerintahan dan Pembentukan Daerah Otonomi Baru.</b><br/>Informasi Fasilitas Penataan Wilayah Pemerintahan dan Pembentukan Daerah Otonomi Baru termaksut Pemutakhiran Data oleh Kabupaten/Kota Otonomi Baru. </li>
						<li><b style="color:#6767c3;">Informasi Data Pemerintahan dan Rupa Bumi Se-Sultra.</b><br/>Informasi kode data wilayah, Letak Geografis dan Rupa Bumi Pemerintahan daerah Se-Sultra.</li>
						<li><b style="color:#6767c3;">Manajemen Penerbitan SK Gubernur serta SK Pengangkatan dan Pemberhentian Kepala Daerah.</b><br/>Database Manajemen Penerbitan SK Gubernur dan serta SK Pengangkatan dan Pemberhentian Kepala Daerah yang terdata dengan baik. </li>
						<li><b style="color:#6767c3;">Database Laporan LPPD dan LKPJ Pemerintahan se-Sultra.</b><br/>Manajemen Database Laporan LPPD dan LKPJ Pemerintahan secara digital yang dapat diakses kapan saja. </li>
						<li><b style="color:#6767c3;">Berita Hot Terkini dan Real-Time se-Sulawesi Tenggara.</b><br/>Ikuti berita Hot terkini di Sulawesi Tenggara yang terintegrasi secara real time dengan berbagai portal media. </li>
					</ul> 	<br/>
					Web Aplikasi Sipapaode berkomitmen memberikan layanan pemerintahan secara efektif dan mendukung transformasi digital pemerintahan yang baik.
					<svelte:fragment slot="footer">
					  <Button>Tutup</Button>
					</svelte:fragment>
				  </Modal>

				  <br/> <span style="font-size: 15px;margin-bottom: 8px;display: inline-block;margin-left: 5px;">Link Cepat:</span> <br/>
				 
				  <Button href="/#FiturLayanan" pill={true} outline={true} class="p-2! mb-2 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(117,155,189,0.3),3px_-3px_0px_rgb(137,170,201)]" size="xl" color="white" style="background:linear-gradient(225deg, #FFFFFF, #759BBD);margin-right:2px;"><BriefcaseSolid class="text-white h-8 w-8" /></Button><Popover class="text-sm font-light" type="light">Lihat Daftar Layanan</Popover>
				    <Button href="/#AlurLayanan" pill={true} outline={true} class="p-2! mb-2 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(117,155,189,0.3),3px_-3px_0px_rgb(137,170,201)]" size="xl" color="white" style="background:linear-gradient(225deg, #FFFFFF, #759BBD);margin-right:2px;"><DrawSquareSolid class="text-white h-8 w-8" /></Button><Popover class="text-sm font-light">Lihat Proses Alur Layanan</Popover>
				   <Button href="/#BeritaTerbaruSultra" pill={true} outline={true} class="p-2! mb-2 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(117,155,189,0.3),3px_-3px_0px_rgb(137,170,201)]" size="xl" color="white" style="background:linear-gradient(225deg, #FFFFFF, #759BBD);margin-right:2px;"><NewspaperSolid class="text-white h-8 w-8" /></Button><Popover class="text-sm font-light">Lihat Berita Terbaru di Sultra</Popover>
				    <Button href="/#InfoPemerintahan" pill={true} outline={true} class="p-2! mb-2 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(117,155,189,0.3),3px_-3px_0px_rgb(137,170,201)]" size="xl" color="white" style="background:linear-gradient(225deg, #FFFFFF, #759BBD);margin-right:2px;"><BuildingSolid class="text-white h-8 w-8" /></Button><Popover class="text-sm font-light">Lihat Informasi Pemerintahan di Sultra</Popover>
					 <Button href="/#StrukturOrganisasi" pill={true} outline={true} class="p-2! mb-2 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(117,155,189,0.3),3px_-3px_0px_rgb(137,170,201)]" size="xl" color="white" style="background:linear-gradient(225deg, #FFFFFF, #759BBD);margin-right:2px;"><ProfileCardSolid class="text-white h-8 w-8" /></Button><Popover class="text-sm font-light">Lihat Struktur Organisasi Biro Pemerintahan</Popover>
					  <Button href="/#JournalKegiatan" pill={true} outline={true} class="p-2! mb-2 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(117,155,189,0.3),3px_-3px_0px_rgb(137,170,201)]" size="xl" color="white" style="background:linear-gradient(225deg, #FFFFFF, #759BBD);margin-right:2px;"><ImageSolid class="text-white h-8 w-8" /></Button><Popover class="text-sm font-light">Lihat Journal Kegiatan Biro Pemerintahan</Popover>
                  
              </div>
		  
	     <div class="rounded-xl"><center>
			<img src={Berakhlak} alt="berakhlak" style="width:80%;height:100%;margin-bottom:10px;" />
			<div style="margin-top:22px;">
				<iframe width="100%" height="290" src={videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen 
				style="border-radius:20px;"></iframe>
				</div>
			<span class="text-xs text-gray-900 dark:text-white">Lihat Video Tentang SipapaOde</span>
			</center>
		  </div>
	   </div>
    </div>
    <br/><br/>
	
	<div style="text-align:center;margin:10px 0px;padding:14px;width:100%;">
		{#if BannerInfo.Status_banner}
        <div id="banner" tabindex="-1" class="flex z-50 gap-3 justify-between items-start py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center dark:border-gray-700 lg:py-4 dark:bg-gray-800" style="background:#f9fbfd;border:2px solid rgb(207 224 240);border-radius:10px;color:#345472;">
			<img class="w-14 h-14 rounded-full" src={ImagelogoSultra} alt="Sultra Pictures" />
		<h4 class="marquee-container text-sm md:text-base lg:text-xl text-left">
        <span class="marquee-text">
            {@html BannerInfo.Text_Banner}
        </span>
    </h4>
         <CloseButton class="border-2 bg-red-500 hover:bg-red-700" style="color:white;" on:click={() => (BannerInfo.Status_banner = false)} />
         </div> 
         {/if}
	</div>   
	  <br/><br/> 
	 
</section>
	<!--End  Section TOP Header -->  
	
	<div class="mouse m-5"></div>

	<!--  Section Fitur Layanan -->  
 <section>
	<Heading id="FiturLayanan" tag="h3" class="mb-3 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="box-shadow: #83A4C3 -15px -20px;border-bottom:8px solid #83A4C3;">FITUR LAYANAN ONLINE</Span></Heading> <br/>
	<div class="flex items-center font-light text-gray-500 dark:text-gray-400 p-1 mb-2 -mt-4" style="font-size:15px;padding: 2px 12px;background:white;border-radius: 6px;">
		Silahkan Pilih Layanan Online sesuai dengan Bidang di Bawah. Lihat Panduan Tentang Layanan <button id="panduaninfo">
			<InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /> </button>
	  </div>
	  <Popover triggeredBy="#panduaninfo" class="w-72 md:w-96 lg:w-96 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="left-start">
		<div class="p-3 space-y-2" style="z-index:100;">
		  <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Jenis Layanan</h3>
		  <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  <br/>
		  Layanan dapat dilakukan dengan mengisi formulir yang telah disediakan secara online pada situs ini, dengan melampirkan sejumlah dokumen yang telah dipersiapkan.<br/>
		   <Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  <br/>
		   Layanan dapat dilakukan dengan langsung berkunjung ke kantor Biro Pemerintahan dan Otonomi Daerah Provinsi Sulawesi Tenggara.  <br/>
		</div>
	  </Popover>
	
	<Tabs tabStyle="full"  defaultClass="flex border-2 border-slate-400 rounded-lg divide-x rtl:divide-x-reverse divide-blue-200 shadow dark:divide-blue-700" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
		<TabItem open style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
		  <span slot="title" class="text-base">Bag. Kerjasama</span>
		  <p class="text-2sm text-slate-500 dark:text-slate-400 pb-4 text-center"> 
		Dibawah berikut adalah Layanan Online pada Bidang Bagian Kerjasama. <a href="/profil-bidang-kerjasama" class="text-blue-600 underline hover:text-blue-800 transition-colors">Lihat Profil Bidang</a>.
		  </p> <center>
		  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mr-6">
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;"> 
				
				{#if OnlineKSpihakKetiga.Status_raw }<Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>
				 {/if} 
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKSwasta} alt="kerjasama pihak swasta">
				  <div class="img-blur">
					<a href="/kerjasama-pihak-ketiga">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
				  <a href="/kerjasama-pihak-ketiga">Fasilitas Kerjasama dengan Pihak Ketiga / Swasta</a>
				</h3>
				<p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk umum pihak ketiga atau instansi swasta.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;"> 
				{#if OnlineKSpemerintahdaerahkl.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge> {/if}  
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKAinstansi} alt="kerjasama instansi"> 
				  <div class="img-blur">
					<a href="/kerjasama-antar-pemerintah-daerah-kl">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
				  <a href="/kerjasama-antar-pemerintah-daerah-kl">Fasilitas Kerjasama antar Pemerintah Daerah dan K/L</a>
				</h3>
				<p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk instansi Pemerintah Daerah dan Kementerian atau Lembaga.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;">
				{#if OnlineLaporanEvaluasiKS.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKLuarNegeri} alt="Evaluasi Kerjasama">
				  <div class="img-blur">
					<a href="/pengiriman-evaluasi-kerjasama">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-sm font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
				  <a href="/pengiriman-evaluasi-kerjasama">Laporan Evaluasi Kerjasama</a>
				</h3>
				<p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam mengirim laporan evaluasi kerjasama.
				</p>
			  </div> </div>
			
		</div></center> <br/><span style="color:#a75710;"> //** Klik Icon Untuk Melanjutkan</span> <br/>
		</TabItem>
		<TabItem>
		  <span slot="title" class="text-base">Bag. Koordinator Pemerintahan</span>
		  <p class="text-2sm text-slate-500 dark:text-slate-400 pb-4 text-center"> 
			Dibawah berikut adalah Layanan Online pada Bidang Bagian Koordinator Pemerintahan. <a href="/profil-bidang-pemerintahan" class="text-blue-600 underline hover:text-blue-800 transition-colors">Lihat Profil Bidang</a>.
			  </p>  <center>
		  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mr-6">
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;">  
				{#if standarPM.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ PenataanWilayahimg } alt="kerjasama pihak swasta"> 
				  <div class="img-blur">
					<a href="/coming-soon">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
				  <a href="/coming-soon">Fasilitas Standar Pelayanan Minimum (SPM)</a>
				</h3>
				<p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam hal informasi dan pengiriman laporan Standar Pelayanan Minimum atau SPM.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;">
				{#if penataanWP.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				   <img src={regionimg} alt="kerjasama instansi"> 
				  <div class="img-blur">
					<a href="/coming-soon">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
				  <a href="/coming-soon">Fasilitasi Penetapan lokasi (Penlok)</a>
				</h3>
				<p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam hal informasi Fasilitasi Penataan Wilayah Pemerintahan dan Penlok.
				</p>
			  </div> </div>
			
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;">
				{#if infoKDW.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ KodeWilayahimg } alt="Report Kerjasama"> 
				  <div class="img-blur">
					<a href="/maps-sultra/#TabelOtonomi">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
				  <a href="/maps-sultra/#TabelOtonomi">Informasi Kode, Data Wilayah Pemerintahan, Pulau dan Rupa Bumi</a>
				</h3>
				<p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk umum dalam mengetahui Informasi Kode, Data Wilayah dan Rupa Bumi Kab/Kota Sultra.
				</p>
			  </div> </div>
			 
		</div></center> <br/><span style="color:#a75710;"> //** Klik Icon Untuk Melanjutkan</span> <br/>
		</TabItem>
		<TabItem>
		  <span slot="title" class="text-base">Bag. Koordinator Otonomi Daerah</span>
		  <p class="text-2sm text-slate-500 dark:text-slate-400 pb-4 text-center"> 
			Dibawah berikut adalah Layanan Online pada Bidang Bagian Koordinator Otonomi Daerah. <a href="/profil-bidang-otonomi" class="text-blue-600 underline hover:text-blue-800 transition-colors">Lihat Profil Bidang</a>.
			  </p>
		  <center>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mr-6">
			  <div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;"> 
				{#if penerbitanSKgub.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				  <div class="imgBox">
				  <img src={ penerbitanSKimg } alt="kerjasama pihak swasta"> 
					<div class="img-blur">
					  <a href="/coming-soon">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-1xl font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
					<a href="/coming-soon">Penerbitan Surat & SK Gubernur Pejabat Negara & Legistlatif</a>
				  </h3>
				  <p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk Kepala Daerah, DPRD dan ASN di Sultra dalam hal menerbitkan SK ataupun Surat resmi lainnya baik Pengangkatan/Pemberhentian ataupun Pengurusan Izin ke Luar Negeri.
				</p>
				</div> </div>
			  <div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;">
				{#if lppdLKPJ.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				  <div class="imgBox">
				    <img src={ laporanimg } alt="kerjasama instansi"> 
					<div class="img-blur">
					  <a href="/penyampaian-lppd">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-1xl font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
					<a href="/penyampaian-lppd">LKPJ & LPPD</a>
				  </h3>
				  <p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam hal pengiriman laporan LKPJ ataupun LPPD.
				</p>
				</div> </div>
			  <div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;">
				{#if InventarisasiPOB.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				  <div class="imgBox">
				    <img src={ Inventarisasiotonomi } alt="Kerjasama Luar Negeri"> 
					<div class="img-blur">
					  <a href="/coming-soon">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-sm font-bold" style="line-height:normal;background:#C8D7E4;padding:2px 8px;border-radius: 6px;">
					<a href="/coming-soon">Inventarisasi Penataan Urusan Daerah Otonomi Baru</a>
				  </h3>
				  <p class="textKetFitur" style="color:#224362;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam hal pengurusan inventarisasi penataan  Daerah otonomi baru.
				</p>
				</div> </div>
				
		  </div></center> <br/><span style="color:#a75710;"> //** Klik Icon Untuk Melanjutkan</span> <br/>
		</TabItem>
		
	  </Tabs>

    </section>

<br/><br/><br/>
  <!--  End Section Fitur Layanan --> 

  <!--  Section Proses Alur Layanan -->  
  <section style="align-items: normal;"> 
    <Heading id="AlurLayanan" tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid #83A4C3;">PROSES ALUR LAYANAN BIRO PEMERINTAHAN & OTDA SULTRA</Span></Heading>
	<br/>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
		<div class="rounded-xl p-2 pb-4">
			 <Timeline order="vertical" style={"padding: 8px;border-radius: 10px;border: 6px dotted #83A4C3;"}>
<TimelineItem title=" Persyaratan">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <RectangleListOutline class="w-6 h-6 text-slate-500 dark:text-slate-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan mb-4 text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
	Pemohon atau Pengguna layanan, menyampaikan Permohonan baik via Online ataupun Offline (Kantor), yang terdapat pada Fitur Layanan. Pengajuan Informasi oleh Publik dapat mendownload Formulir pada halaman Laporan dan Informasi.</p>
</TimelineItem>
<TimelineItem title=" Mekanisme">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <DrawSquareOutline class="w-6 h-6 text-slate-500 dark:text-slate-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
	<b>&#10162;</b> Pengguna layanan mengajukan Permohonan melalui Online atau Offline (Kantor).  
 <br/><b>&#10162;</b> Petugas yang telah ditunjuk oleh Kepala Biro Pemerintahan dan Otda Sultra Akan menerima Informasi Anda, memverifikasi dan memproses permohonan yang Anda ajukan.
 <br/>
 <span id="dots" style="margin-left:4px;"> &nbsp;</span><span id="more" style="display: none;">
 <b>&#10162;</b> Petugas layanan akan meneruskan permohonan Anda kepada Kepala Biro Pemerintahan dan Otda Sultra, lalu Kepala Biro Pemerintahan dan Otda Sultra menugaskan Pejabat/Pegawai berkompeten memberikan data dan informasi sesuai dengan permohonan yang Anda sampaikan.
 <br/><b>&#10162;</b> Pejabat atau Pegawai yang ditunjuk melaksanakan tugas memberikan data dan Informasi kepada Pengguna Layanan.
 <br/><b>&#10162;</b> Pengguna layanan akan menerima informasi baik secara online ataupun via Kantor dan selanjutnya menandatangani buku tamu yang telah disediakan.<br/>
</span><span on:click={ReadMore} id="ReadMore" style="text-decoration:underline;margin-top:-10px;cursor:pointer;font-weight: 600;">[+] Lihat Lebih Banyak</span>
</p>

</TimelineItem>
<TimelineItem title=" Waktu Penyelesaian">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <CalendarWeekSolid class="w-6 h-6 text-slate-500 dark:text-slate-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius:8px;box-shadow: #e9edf4 7px 7px;">
	Waktu penyelesaian bisa berlangsung dalam 1 jam ataupun selama 3-5 hari. Sesuai dengan Permohonan yang diajukan.</p>
</TimelineItem>
<TimelineItem title=" Output / Hasil">
	<svelte:fragment slot="icon">
	  <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
		<FileCheckOutline class="w-6 h-6 text-slate-500 dark:text-slate-500" />
	  </span>
	</svelte:fragment>
	<p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
		Output dapat berupa Informasi ataupun Surat Keputusan dari Penyelenggara.</p>
   </TimelineItem>
   <TimelineItem title=" Info Hot Line">
	<svelte:fragment slot="icon">
	  <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
		<UserHeadsetOutline class="w-6 h-6 text-slate-500 dark:text-slate-500" />
	  </span>
	</svelte:fragment>
	<p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
		Informasi Pertanyaan dapat melalui langsung di Kantor Biro Pemerintahan dan Otda Sultra atau melalui Contact Info yang telah disediakan.</p>
   </TimelineItem>
</Timeline> 
		 </div>
		 <div class="col-span-2 rounded-xl p-2 pb-4">
			<h2 class="text-2xl font-bold mb-2" style="box-shadow: #83A4C3 15px -20px;">Kotak Saran & Info</h2>

  <div class="w-full max-w-4xl bg-white border border-blue-200 rounded-2xl p-2 sm:p-4 shadow-sm">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-3">
          Alamat:
        </h3>
        <p class="text-gray-700 leading-relaxed">
          <b>Biro Pemerintahan dan Otonomi Daerah Sultra</b><br>
          Kompleks Bumi Praja Anduonohu,<br>
          Kota Kendari, Sulawesi Tenggara
        </p>
      </div>
      
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-3">
          Permohonan Informasi Publik
        </h3>
        
        <div class="flex items-center gap-4 mt-2">
          <a href="/formulir-pengajuan-informasi-publik" style="text-decoration:none;"><div class="flex-shrink-0 bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-200" style="font-size:50px;">
             📑
            </div></a>
          <p class="text-gray-700">
             Permohonan Informasi Publik dapat diajukan secara online melalui formulir yang diakses pada ikon di samping.
          </p>
        </div>
      </div>
      
    </div>
  </div>



	<br/><br/>
	
			<h2 id="BeritaTerbaruSultra" class="text-2xl font-bold mb-2" style="box-shadow: #83A4C3 15px -20px;margin-bottom:18px;">Berita Terbaru Hari Ini di Sulawesi Tenggara
			</h2> 
			
			<div>
				<!-- <iframe 
					src="https://rss.app/embed/v1/list/ttwGK2p1QDwAt0Yh" 
					frameborder="0" 
					style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;">
				</iframe>	-->
				<iframe width="100%" height="640" src="https://rss.app/embed/v1/list/ttwGK2p1QDwAt0Yh" frameborder="0"></iframe>
			</div>

		 </div>  
	 </div>
	 <a href="/berita-sulawesi-tenggara" class="linevisit mt-6 md:-mt-2"><Button color="light" pill style="cursor:pointer;position:relative;float:right;box-shadow:rgb(90, 134, 175) 4px 4px 0 0">Lihat Berita Terkini Lainnya di Sultra <label class="arrowvisit"><ArrowRightOutline class="w-6 h-6" /></label></Button></a>
	 <!-- <a href="/berita-sulawesi-tenggara" style="text-decoration:underline;"><button on:click={nextQuote} class="button-74" style="margin-top:40px;cursor:pointer;position: relative;">Lihat Berita Lainnya</button></a> -->        
  </section>
    <br/> <br/>
  <!--  End Section Proses Alur Layanan -->  

<!--  Map Modal -->  
  <Modal size="lg" title="Letak Geografis (Map) Kabupaten Bombana" bind:open={ModalmapBombana} autoclose>
	<div style="width: 100%">{@html DataBombana.Map }</div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{@html DataBombana.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Letak Geografis (Map) Kabupaten Wakatobi" bind:open={ModalmapWakatobi} autoclose>
	<div style="width: 100%">{@html DataWakatobi.Map }</div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{@html DataWakatobi.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Letak Geografis (Map) Kota Kendari" bind:open={ModalmapKendari} autoclose>
	<div style="width: 100%">{@html DataKotaKendari.Map } </div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{@html DataKotaKendari.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Letak Geografis (Map) Kabupaten Konawe" bind:open={ModalmapKonawe} autoclose>
	<div style="width: 100%">{@html DataKonawe.Map }</div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{@html DataKonawe.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Letak Geografis (Map) Kabupaten Konawe Utara" bind:open={ModalmapKonaweUtara} autoclose>
	<div style="width: 100%">{@html DataKonaweUtara.Map }</div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{@html DataKonaweUtara.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
<!--  End Map Modal -->  

  <!--  Section Informasi Otonomi -->  
 <section>
	<Heading id="InfoPemerintahan" tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid #83A4C3;">INFORMASI PEMERINTAHAN OTONOMI SULAWESI TENGGARA</Span></Heading>
	<br/>
	<div style="padding:12px;background:white;border-radius:14px;">
		  <div class="block grid-cols-12 gap-2 md:flex lg:flex">
			 <div><span style="font-size:40px;">🗺️</span></div> 
			  <div class="col-span-11 text-sm md:text-base lg:text-base">Provinsi Sulawesi Tenggara secara administratif terbagi menjadi 17 daerah otonom, yang terdiri dari 15 kabupaten dan 2 kota. Bagian ini menyajikan data informasi statistik Pemerintah Kab/Kota Sulawesi tenggara mencakup luas wilayah, jumlah penduduk, Map Geografis, serta Situs Web Portal Pemerintahan. 
				Untuk pratinjau, data 5 kabupaten/kota ditampilkan di bawah. Silakan klik tombol 'Lihat Selengkapnya' untuk mengakses informasi seluruh wilayah.
				</div>
			</div>
		</div> <br/>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
		<div class="p-1">
			
			<table id="MapArea"  style="width:100%;display: block;background-color: white;padding: 7px;border-radius: 8px;">
				<thead style="background:#D3DFEA;text-align: left;">
				<tr>
				<th style="width:40%;white-space: break-spaces;">Nama</th>
				<th style="width:40%;white-space:break-spaces;">Luas Wilayah / Jumlah Penduduk </th>
				<th style="width:20%;text-align:center;">Detail</th>
				</tr>
				</thead>
				<tbody>  
				<tr>
				<td class="block md:flex lg:flex" style="margin:4px;white-space:break-spaces;;"><img class="object-center" src={LogoBombana} alt="Kabupaten Bombana" width="40px" height="40px" style="margin-right: 5px;" /> {DataBombana.Nama } <Button id="popbombana" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:#5a86af;font-size: 11px;width: 10px;height: 15px;">i</Button> 
					<Popover triggeredBy="#popbombana" class="w-72 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
						<div class="p-2">
						  <center>
							<img class="object-center" src={LogoBombana} alt="Kabupaten Bombana" width="90px" height="90px" />
						 </center>
						 <p class="mt-2">
							<b>{ DataBombana.Nama } </b>
							<br/>Ibukota: { DataBombana.Ibukota }<br/>Kecamatan: { DataBombana.J_Kecamatan }<br/>Kelurahan: { DataBombana.J_Kelurahan }<br/>Desa: { DataBombana.J_Desa }
						 </p>
						</div>
					  </Popover>	
				</td>
				<td style="white-space: break-spaces;">{formatter.format(DataBombana.Luas_Wilayah)} km2 / {formatter.format(DataBombana.J_Penduduk)} 👤 </td>
				 <td style="text-align:center;"> 
					<span class="buttonDetail" on:click={()=>visibleBombana = !visibleBombana} bind:this={closeBombana} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid #5a86af;"> 
						&#8285; 
					</span>
					<!-- menu -->
					{#if visibleBombana}
					<div id="menuDropdown" class="dropdown-content">
					  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapBombana = true)}>Letak Geografis</a> 
					  <a href={ DataBombana.Situs } rel="nofollow noopener" target="_blank">Portal Pemerintahan</a>
					</div>
					{/if}
				  </td>
				</tr>
				
				<tr>
					<td class="block md:flex lg:flex" style="margin:4px;white-space: break-spaces;"><img class="object-center" src={LogoWakatobi} alt="Kabupaten Wakatobi" width="40px" height="40px" style="margin-right: 5px;" /> { DataWakatobi.Nama } <Button id="popwakatobi" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:#5a86af;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popwakatobi" class="w-72 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-2">
							  <center>
								<img class="object-center" src={LogoWakatobi} alt="Kabupaten Wakatobi" width="90px" height="90px" />
							 </center>
							 <p class="mt-2">
								<b>{ DataWakatobi.Nama }</b>
								<br/>Ibukota: { DataWakatobi.Ibukota }<br/>Kecamatan: { DataWakatobi.J_Kecamatan }<br/>Kelurahan: { DataWakatobi.J_Kelurahan }<br/>Desa: { DataWakatobi.J_Desa }<br/>
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;">{formatter.format(DataWakatobi.Luas_Wilayah)} km2 / {formatter.format(DataWakatobi.J_Penduduk)} 👤 </td>
					 <td style="text-align:center;"> 
						<span class="buttonDetail" on:click={()=>visibleWakatobi  = !visibleWakatobi} bind:this={closeWakatobi} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid #5a86af;"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleWakatobi}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapWakatobi = true)}>Letak Geografis</a> 
						  <a href={ DataWakatobi.Situs } rel="nofollow noopener" target="_blank">Portal Pemerintahan</a>
						</div>
						{/if}
					 </td>
				</tr>
				<tr>
					<td class="block md:flex lg:flex" style="margin:4px;white-space: break-spaces;"><img class="object-center" src={LogoKendari} alt="Kota Kendari" width="40px" height="40px" style="margin-right: 5px;"/> { DataKotaKendari.Nama } &nbsp; &emsp; &emsp; <Button id="popkendari" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:#5a86af;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkendari" class="w-72 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-2">
							  <center>
								<img class="object-center" src={LogoKendari} alt="Kota Kendari" width="90px" height="90px" />
							 </center>
							 <p class="mt-2">
								<b>{ DataKotaKendari.Nama }</b>
								<br/>Ibukota: { DataKotaKendari.Ibukota }<br/>Kecamatan: { DataKotaKendari.J_Kecamatan }<br/>Kelurahan: { DataKotaKendari.J_Kelurahan }<br/>Desa:{ DataKotaKendari.J_Desa }<br/>	
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;">{formatter.format(DataKotaKendari.Luas_Wilayah)} km2 / {formatter.format(DataKotaKendari.J_Penduduk)} 👤 </td>
					 <td style="text-align:center;"> 
						<span class="buttonDetail" on:click={()=>visibleKendari  = !visibleKendari} bind:this={closeKendari} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid #5a86af;"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKendari}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKendari = true)}>Letak Geografis</a> 
						  <a href={ DataKotaKendari.Situs } rel="nofollow noopener" target="_blank">Portal Pemerintahan</a>
						</div>
						{/if}
					 </td>
				</tr>
			   
				<tr>
					<td class="block md:flex lg:flex" style=";margin:4px;white-space: break-spaces;"><img class="object-center" src={LogoKonawe} alt="Kabupaten Konawe" width="40px" height="40px" style="margin-right: 5px;" /> {DataKonawe.Nama } <Button id="popkonawe" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:#5a86af;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkonawe" class="w-72 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-2">
							  <center>
								<img class="object-center" src={LogoKonawe} alt="Kabupaten Konawe" width="90px" height="90px" />
							 </center>
							 <p class="mt-2">
								<b>{DataKonawe.Nama }</b>
								<br/>Ibukota: {DataKonawe.Ibukota  }<br/>Kecamatan: {DataKonawe.J_Kecamatan }<br/>Kelurahan : {DataKonawe.J_Kelurahan }<br/>Desa: {DataKonawe.J_Desa}<br/>
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;"> {formatter.format(DataKonawe.Luas_Wilayah)} km2 / {formatter.format(DataKonawe.J_Penduduk)} 👤 </td>
					 <td style="text-align:center;"> 
						<span class="buttonDetail" on:click={()=>visibleKonawe  = !visibleKonawe} bind:this={closeKonawe} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid #5a86af;"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKonawe}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKonawe = true)}>Letak Geografis</a> 
						  <a href={DataKonawe.Situs } rel="nofollow noopener" target="_blank">Portal Pemerintahan</a>
						</div>
						{/if}
					 </td>
				</tr>

				<tr>
					<td class="block md:flex lg:flex" style="margin:4px;white-space: break-spaces;"><img class="object-center" src={LogoKonaweUtara} alt="Kabupaten Konawe Utara" width="40px" height="40px" style="margin-right: 5px;" /> {DataKonaweUtara.Nama } <Button id="popkonaweutara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:#5a86af;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkonaweutara" class="w-72 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-2">
							  <center>
								<img class="object-center" src={LogoKonaweUtara} alt="Kabupaten Konawe Utara" width="90px" height="90px" />
							 </center>
							 <p class="mt-2">
								<b>{DataKonaweUtara.Nama }</b>
								<br/>Ibukota: {DataKonaweUtara.Ibukota }<br/>Kecamatan: {DataKonaweUtara.J_Kecamatan }<br/>Kelurahan: {DataKonaweUtara.J_Kelurahan }<br/>Desa: {DataKonaweUtara.J_Desa } <br/>
							 </p>
							</div>
						  </Popover>
					</td>
					<td>{formatter.format(DataKonaweUtara.Luas_Wilayah)} km2 / {formatter.format(DataKonaweUtara.J_Penduduk)} 👤 </td>
					 <td style="text-align:center;"> 
						<span class="buttonDetail" on:click={()=>visibleKonaweUtara  = !visibleKonaweUtara} bind:this={closeKonaweUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid #5a86af;"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKonaweUtara}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKonaweUtara = true)}>Letak Geografis</a> 
						  <a href={DataKonaweUtara.Situs } rel="nofollow noopener" target="_blank">Portal Pemerintahan</a>
						</div>
						{/if}
					 </td>
				</tr>
		
			</tbody>
		</table>
		</div>
		<div class="p-1">
			<Card class="w-full max-w-2xl">
				<div class="flex justify-between pb-2 mb-4 border-b border-gray-200 dark:border-gray-700 ">
				  <div class="flex items-center">
					<div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
						<img class="w-8 h-8 rounded-full" src={ImagelogoSultra} alt="Flowbite logo" />
						<!--<UsersGroupOutline class="w-6 h-6 text-gray-500 dark:text-gray-400" />  -->
					</div>
					<div>
					  <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">Sulawesi Tenggara</h5>
					  <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Luas Wilayah / Jumlah Penduduk</p>
					</div>
				  </div>
				</div>
	
				<!-- <Chart {options} />  -->

		
		<div style="text-align:center;font-size: 15px;"><Badge rounded color="yellow"><InfoCircleSolid class="shrink-0 h-5 w-5" /> Statistik Berdasarkan {currentDataName}</Badge></div>

		<div class="container mx-auto p-1">
			
			<div bind:this={chartElement}></div>
			
		   <div class="flex justify-center -mt-4 space-x-4 relative">
			<button on:click={() => updateChartData(DataJP, 'Jumlah Penduduk', '#1A56DB')} class="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded" style="font-size:12px;border-radius:10px;">
			Jumlah Penduduk </button>
		    <button on:click={() => updateChartData(DataLW, 'Luas Wilayah', '#FDBA8C')} class="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-6 rounded" style="font-size:12px;border-radius:10px;">
			Luas Wilayah</button>
		   </div>
		   
	   </div>
			  </Card>
		</div>
	  </div>
  
   <br/> <a href="/maps-sultra/#TabelOtonomi" class="linevisit"><Button color="light" pill style="box-shadow:rgb(90, 134, 175) 4px 4px 0 0;">Lihat Selengkapnya Kota / Kabupaten Lainnya <label class="arrowvisit"><ArrowRightOutline class="w-6 h-6" /></label></Button></a>
   <br/>
  </section>
           <br/>
  <!-- End Section Otonomi -->

   <!-- Section Organization -->
<section>
	<Heading id="StrukturOrganisasi" tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid #83A4C3;">STRUKTUR ORGANISASI BIRO PEM. & OTDA SULTRA</Span></Heading>
	<span class="text-sm md:text-base lg:text-base" style="padding: 2px 12px;background:white;border-radius: 6px;">Dibawah berikut adalah Struktur Organisasi Biro Pemerintahan dan Otonomi Daerah Setda Sulawesi Tenggara. <a href="/data-pegawai" class="text-blue-600 underline hover:text-blue-800 transition-colors">Lihat Data Statistik Pegawai</a>.</span>
	<br/> 
	<div id="container_org">
        <ol class="static-org-chart">
            <li>
                <div class="staff_card">
                    <div class="staff_title">
                        Kepala Biro Pemerintahan & OTDA
                    </div>
                    <div class="staff_info">
                        <div class="staff_image">
                            <img src={kepalaBiro?.URL_PhotoProfile || (kepalaBiro ? (kepalaBiro.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM)} class="card-img-top" alt="Kepala Biro" style="border: 1px solid #d0d0ec;padding: 1px 2px;background: white;" />
                        </div>
                        <div class="staff_name_container">
							{kepalaBiro?.Nama || 'Jabatan Kosong'}
                        </div>
                    </div>
                </div>
                <ol id="first">
                   
                    <li>
                       <div class="staff_card" style="width:280px !important;padding:6px;height:100px;"> 
                        <img src={kabidTU?.URL_PhotoProfile || (kabidTU ? (kabidTU.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } style="width:60px;height:60px;border-radius:50%;border: 1px solid #d0d0ec;padding: 1px 2px;background: white;" alt="Kasubag TU" />
                        <div>Kasubag. Tata Usaha <br><label style="font-weight: 100;">{kabidTU?.Nama || 'Jabatan Kosong'}</label></div>
                    </div>
                    </li>
                  
                   
                </ol>
                <ol id="second">
                    <li>
                        <div class="staff_card">
                            <div class="staff_title">
                               Kabag. Kerjasama
                            </div>
                            <div class="staff_info">
                                <div class="staff_image">
                                    <img src={kabidKS?.URL_PhotoProfile || (kabidKS ? (kabidKS.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } class="card-img-top" alt="Kabid Kerjasama" style="border: 1px solid #d0d0ec;padding: 1px 2px;background: white;" />
                                </div>
                                <div class="staff_name_container">
									Hidayat Agung Wibowo.S.STP
                                </div>
                            </div>
                        </div>
                      
                    </li>
                 
                    <li>
                        <div class="staff_card">
                            <div class="staff_title">
                                Kabag. Koordinator Pemerintahan
                            </div>
                            <div class="staff_info">
                                <div class="staff_image">
                                    <img src={koorPemerintahan?.URL_PhotoProfile || (koorPemerintahan ? (koorPemerintahan.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } class="card-img-top" alt="Koord. Pemerintahan" style="border: 1px solid #d0d0ec;padding: 1px 2px;background: white;" />
                                </div>
                                <div class="staff_name_container">               
									Dudi Cahyanto, S.Sos
                                </div>
                            </div>
                        </div>
                       
                    </li>
                    <li>
                        <div class="staff_card">
                            <div class="staff_title">
                                Kabag. Koordinator Otonomi Daerah
                            </div>
                            <div class="staff_info">
                                <div class="staff_image">
                                     <img src={koorOtda?.URL_PhotoProfile || (koorOtda ? (koorOtda.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } class="card-img-top" alt="Koord. Otda" style="border: 1px solid #d0d0ec;padding: 1px 2px;background: white;" />
                                </div>
                                <div class="staff_name_container">
									Syahrin Ramadhan,S.STP.M.A
                                </div>
                            </div>
                        </div>
                       
                    </li>
                </ol>
            </li>
        </ol>
    </div>
	 <br/> <a href="/profil#struktur" class="linevisit"><Button color="light" pill style="box-shadow:rgb(90, 134, 175) 4px 4px 0 0;">Lihat Struktur Lebih Lengkap <label class="arrowvisit"><ArrowRightOutline class="w-6 h-6" /></label></Button></a>
	<br/>
</section>

<br/><br/>
  <!-- Section Quote -->
<section style="align-items: normal;">
    <center>
        <h3 id="JournalKegiatan" class="justify-start font-semibold text-xl sm:text-2xl lg:text-3xl mb-4">📆 Journal Kegiatan Biro Pemerintahan & Otonomi Daerah Sultra:</h3>
          <span class="text-sm md:text-base lg:text-base" style="padding: 4px 12px;background:white;border-radius: 6px;">Lihat dan Ikuti Rangkuman agenda dan kegiatan terbaru di Biro Pemerintahan & Otonomi Daerah Sultra.</span>
    </center>

    <div class="flex justify-end mt-4" style="text-align:right;margin-bottom:14px;">
        <button on:click={prevQuote} class="button-74 mr-2">&#8678; Sebelumnya</button>
        <button on:click={nextQuote} class="button-74">Berikutnya &#8680;</button>
    </div>
    
    <div class="textquote grid grid-cols-1 lg:grid-cols-12 gap-4" style="width: 100%;min-height: 390px;background:linear-gradient(135deg, rgb(255, 255, 255), rgb(241, 245, 248));margin: 0;border-radius: 15px;padding:20px;padding-top:40px;box-shadow: rgb(90, 134, 175) 10px 15px, rgba(90, 134, 175, 0.5) 20px 25px;box-sizing: border-box;margin-bottom:6px;">
        <div class="lg:col-span-8 rounded-xl lg:pr-2 order-2 lg:order-1">
            <img 
                src={currentItem.URL || '/placeholder-image.jpg'} 
                alt={currentItem.Description || 'Gallery image'}
                class="w-full h-48 sm:h-64 lg:h-80 rounded-xl lg:rounded-[40px] object-cover" 
            />
            <!-- Optional: Counter untuk menunjukkan posisi -->
            {#if quotes.length > 0}
            <div class="text-center mt-2 text-sm text-gray-600">
               Menampilkan gambar ke - {currentIndex + 1} / dari {quotes.length}
            </div>
            {/if}
        </div>
        
        <div class="lg:col-span-4 rounded-xl order-1 lg:order-2">
            <Badge border color="yellow" class="mb-2"><ClockOutline class="me-1.5 h-4 w-4" /> Diterbitkan: {formatTanggalIndonesia(currentItem.$updatedAt.slice(0, 10)) || 'undefined'}</Badge>
            
            <!-- Title dengan responsive font size -->
            <span class="font-semibold text-lg sm:text-xl lg:text-2xl text-slate-700 block mb-3 leading-tight" style="font-family: Libre Franklin, sans-serif;">
                🎯 {currentItem.Title || 'undefined'}.
            </span>
            
            <br/>
            <p class="text-sm sm:text-base leading-relaxed text-slate-700 mb-4" style="font-family:Libre Franklin, sans-serif;font-weight: 100;">
                {currentItem.Description || 'undefined'}.
            </p>
            
            <hr style="border: 0.5px solid slategray;" />
            <br/>
            
            <div class="space-y-1">
                <span class="block text-xs sm:text-sm font-light">📍Lokasi Kegiatan: {currentItem.Location || 'undefined'}</span>
                <span class="block text-xs sm:text-sm font-light">📅Tanggal Kegiatan: {formatTanggalIndonesia(currentItem.TanggalKegiatan.slice(0, 10)) || 'undefined'}</span>
            </div>
        </div>
    </div>
    <br/>  
    <center><a href="/journal-kegiatan" class="linevisit"><Button color="light" pill style="box-shadow:rgb(90, 134, 175) 4px 4px 0 0;">Lihat Journal Kegiatan Selengkapnya <label class="arrowvisit"><ArrowRightOutline class="w-6 h-6" /></label></Button></a></center>
</section>
  <br/> <br/>
  <!--  End Section Quote -->  

 <!--  Section Portal Lainnya -->  
 <section> 
	<br/> <br/>
	<Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid #83A4C3;">SINERGI PORTAL INFORMASI LAINNYA</Span></Heading> 
  <p class="text-sm md:text-base lg:text-base" style="padding: 2px 12px;background:white;border-radius: 6px;">Berikut adalah Daftar Situs yang bisa Anda kunjungi sehubungan dengan Informasi di Biro Pemerintahan.</p> <br/>
   <Marquee shadow speed={0.4} hoverSpeed={0.1} class="py-16 px-8"> 
	<div class="portallain grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
		<a href="https://ula.kemendagri.go.id/" target="_blank" style="color:cadetblue;"><div style="padding:12px 20px;border:1px solid;border-radius:12px;margin:10px;">
	    <img style="width:100%;height:110px;" src={UlaSiolaLogo} alt="ula siola" />	
		<br/><center><h3 class="textportal font-bold text-xl">Ula Siola Kemendagri</h3></center></div></a>

        <a href="https://elppd.kemendagri.go.id/" target="_blank" style="color:cadetblue;"><div style="padding:12px 20px;border:1px solid;border-radius:12px;margin:10px;">
		<img style="width:100%;height:110px;" src={SILPPDLogo} alt="Silppd" />
		<br/><center><h3 class="textportal font-bold text-xl">SILPPD Kemendagri</h3></center></div></a>

		<a href="https://www.lapor.go.id/" target="_blank" style="color:cadetblue;"><div style="padding:12px 20px;border:1px solid;border-radius:12px;margin:10px;">
		<img style="width:100%;height:110px;" src={laporLogo} alt="lapor" />	
		<br/><center><h3 class="textportal font-bold text-xl">L A P O R</h3></center></div></a>

		<a href="https://www.sultraprov.go.id/" target="_blank" style="color:cadetblue;"><div style="padding:12px 20px;border:1px solid;border-radius:12px;margin:10px;">
			<img style="width:100%;height:110px;" src={sultraprovLogo} alt="lapor" />	
			<br/><center><h3 class="textportal font-bold text-xl">Portal Sultra Prov</h3></center></div></a>
		</div>
 </Marquee> 
  <br/><br/>
  </section>

  <!--  Section FAQ -->  
 <section> 
	<br/> <br/>
<Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid #83A4C3;">PERTANYAAN SERING DIAJUKAN (F.A.Q)</Span></Heading> <br/>
<Accordion class="w-full" activeClass="bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800" inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-800">
	<AccordionItem class="font-semibold text-lg" open>
	  <span slot="header">Apa itu Sipapaode - Biro Pemerintahan dan Otonomi Daerah Sulawesi tenggara</span>
	  <p class="mb-2 text-gray-500 dark:text-gray-400">Sipapaode merupakan situs portal web Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara yang memberikan Informasi sehubungan dengan layanan Pemerintahan terutama pada Kantor Layanan Biro Pemerintahan dan Otonomi Daerah Setda Sultra. </p>
	</AccordionItem>
	<AccordionItem class="font-semibold text-lg">
	  <span slot="header">Bagaimana Proses Pengajuan Kerjasama dengan Pemerintah Prov. Sulawesi Tenggara melalui situs Sipapaode.</span>
	  <p class="mb-2 text-gray-500 dark:text-gray-400">Informasi sehubungan dengan Pengajuan Kerjasama dengan Pemerintahan Prov. Sulawesi Tenggara dapat dilihat pada Fitur Layanan Online yang terdapat pada Tab Bidang Bag. Kerjasama.</p>
	</AccordionItem>
	<AccordionItem class="font-semibold text-lg">
		<span slot="header">Dimana menemukan informasi tentang Data Wilayah Pemerintah, Kode, Rupa Bumi, dan Letak Geografis Daerah Pemerintahan di Prov. Sultra.</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">Informasi sehubungan dengan Data Wilayah Pemerintahan Daerah di Provinsi Sulawesi Tenggara dapat dilihat pada Fitur Layanan Online Tab Bidang Koordinator Pemerintahan atau dapat langsung mengunjungi halaman berikut:
        <br/><a href="/maps-sultra" target="_blank" style="text-decoration:underline;font-weight:600;">https://www.sipapaode.id/maps-sultra</a>
		</p>
	  </AccordionItem>
	  <AccordionItem class="font-semibold text-lg">
		<span slot="header">Terdapat Bidang apa saja di Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara, sehubungan dengan layanan Pemerintahan</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">Pada Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara, terdapat 3 Bidang yaitu: Bagian Kerjasama, Bagian Koordinator Pemerintahan dan Bagian Koordinator Otonomi Daerah, yang berhubungan dengan layanan Pemerintahan.</p>
	  </AccordionItem>
  </Accordion>
	<br/><br/>
  </section>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.card_fitur {
   /** display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;  **/
  width: 230px;
  height: /**360px; **/ 100%;
  margin: 0 10px;
  background: #fff;
  border-radius: 15px;
  text-align: center;
  transition: 0.3s;
  padding:14px 8px 8px 8px;
}

.card_fitur:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all .5s;
  border-bottom: 6px solid rgb(195, 221, 253);
  border: 1px solid #dadae8;
  background: #e4ecfb;
}
.card_fitur .imgBox {
	display: inline-flex;
  text-align: center;
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
.card_fitur .imgBox img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card_fitur .img-blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.5s;
}
.card_fitur .imgBox:hover .img-blur {
  opacity: 1;
}
.card_fitur .img-blur a {
  text-decoration: none;
  color: #fff;
  letter-spacing: 1px;
}
.card_fitur .img-blur::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  border: 2px dotted #fff;
  pointer-events: none;
  animation: border-anime 15s linear infinite;
}
@keyframes border-anime {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.card_fitur .title {
  margin: 20px 0;
}
.card_fitur .title a {
  font-size: 19px;
  color: #555;
  text-decoration: none;
  transition: 0.4s;
}
.card_fitur .title a:hover {
  color: #76A9FA;
}
.card_fitur .textKetFitur {
  font-size: 0.94rem;
  line-height: 1.2;
  color: #555;
  opacity: 0.6;
  display:none;
}

.card_fitur:hover .textKetFitur{
	display:inline-block;	
}

.alurlayanan:hover{
	transform: scale(1.1);
}

/** CSS TAble **/

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

	tbody tr:hover {
		background-color: #f6fbff;
	}

.dropdown-content {

  position: absolute;
  margin-top: 5px;
  background-color: #f9f9f9;
   min-width: 150px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
border-radius:9px;
right: auto;
margin-left:-60px;

}

.kasubag {
    font-weight: 200;
	text-align: left !important;
	width: 200px !important;
	margin-top: -16px !important;
 }

@media screen and (max-width: 760px) {
  .dropdown-content {
   right: 10px;
}
 .kasubag {
    text-align: right !important;
    margin-top: 0px !important;
}
}

.dropdown-content a {
  color: black;
  padding: 10px 15px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
 background-color:#edeff1;
}

/** animation pulse */
.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0px 0px 1px 1px #0000001a;
  margin-top: -3px;
  margin-left: -2.5px;
}

.pulse {
  animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
}

/**CSS arrow animation **/

.morenext:hover {
    margin-left: 10px;
    transition: 0.1s ease-in;
}

.arrowvisit {
display: inline-block;
transition: 0.1s ease-in;
}

.linevisit:hover .arrowvisit {
    transform: translateX(20%);
}

/**CSS Organization  **/
#container_org {
    padding: 10px;
}
ol.static-org-chart,
ol.static-org-chart ol,
ol.static-org-chart li,
ol.static-org-chart li > div {
    position: relative;
}
ol.static-org-chart,
ol.static-org-chart ol {
    list-style: none;
    margin: 0;
    padding: 0;
}
ol.static-org-chart {
    text-align: center;

}
ol.static-org-chart ol {
    padding-top: 1em;
}
ol.static-org-chart ol:before,
ol.static-org-chart ol:after,
ol.static-org-chart li:before,
ol.static-org-chart li:after,
ol.static-org-chart > li > div:before,
ol.static-org-chart > li > div:after {
    background-color: #a4acb1 ; 
    content: "";
    position: absolute;
}
ol.static-org-chart ol > li {
    padding: 1em 0 0 1em;
}
ol.static-org-chart > li ol:before {
    height: 1em;
    left: 50%;
    top: 0;
    width: 3px;
}
ol.static-org-chart > li ol:after {
    height: 3px;
    left: 3px;
    top: 1em;
    width: 50%;
}
ol.static-org-chart > li ol > li:not(:last-of-type):before {
    height: 3px;
    left: 0;
    top: 2em;
    width: 1em;
}
ol.static-org-chart > li ol > li:not(:last-of-type):after {
    height: 105%;
    left: 0;
    top: 0;
    width: 3px;
}
ol.static-org-chart > li ol > li:last-of-type:before {
    height: 3px;
    left: 0;
    top: 2em;
    width: 1em;
}
ol.static-org-chart > li ol > li:last-of-type:after {
    height: 2em;
    left: 0;
    top: 0;
    width: 3px;
}
/*** PRIMARY ***/
ol.static-org-chart > li > div {
    margin-left: 1em;
}
ol.static-org-chart > li > div:before {
    bottom: 2em;
    height: 3px;
    left: -1em;
    width: 1em;
}
ol.static-org-chart > li > div:first-of-type:after {
    bottom: 0;
    height: 2em;
    left: -1em;
    width: 3px;
}
ol.static-org-chart > li > div + div {
    margin-top: 1em;
}
ol.static-org-chart > li > div + div:after {
    height: calc(100% + 1em);
    right: -1em;
    top: -1em;
    width: 3px;
}
/*** SECONDARY ***/
ol.static-org-chart > li > ol:before {
    left: 0;
    right: inherit;
}
ol.static-org-chart > li > ol:after {
    left: 0;
    width: 100%;
}
ol.static-org-chart > li #first:after {
    width: 0%;
}
ol.static-org-chart #second:after {
    width: 0%;
}
ol.static-org-chart #second:before {
    height: 6em !important;
    left: 0 !important;
    top: -5em !important;
}
ol.static-org-chart #first > li > div {
	     height: 78px;
        width: 200px !important;
        color: #555a62 !important;
        background: linear-gradient(147deg, rgba(255, 255, 255, 1) 21%, rgba(254, 254, 255, 1) 32%, rgb(131 164 195) 100%, rgba(229, 231, 235, 1) 100%);
        border-radius: 12px;
      
        font-weight: 600;
}
ol.static-org-chart #first > li > div > div {
    position: relative;
    top: -30%;
    transform: translateY(-50%);
	right:-76px;
  width: 180px;
  text-align:right;
}
/*** MEDIA QUERIES ***/
@media only screen and (min-width: 50em) {
    ol.static-org-chart #second:before {
        height: 7em !important;
        left: 50% !important;
        top: -6em !important;
        width: 3px !important;
    }
    ol.static-org-chart {
        margin-left: -1em;
        margin-right: -1em;
    }
    /* PRIMARY */
    ol.static-org-chart > li > div {
        display: inline-block;
        float: none;
        margin: 0 1em 1em 1em;
        vertical-align: bottom;
    }
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(2),
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(2) ~ div {
        width: calc((100% / 2) - 2em - 4px);
    }
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(3),
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(3) ~ div {
        width: calc((100% / 3) - 2em - 4px);
    }
   
    ol.static-org-chart > li > div:before,
    ol.static-org-chart > li > div:after {
        bottom: -2.7em !important;
        top: inherit !important;
    }
    ol.static-org-chart > li > div:before {
        height: 2.7em !important;
        left: 50% !important;
        width: 3px !important;
    }
    ol.static-org-chart > li > div:only-of-type:after {
        display: none;
    }
    ol.static-org-chart > li > div:first-of-type:not(:only-of-type):after,
    ol.static-org-chart > li > div:last-of-type:not(:only-of-type):after {
        bottom: -1em;
        height: 3px;
        width: calc(50% + 1em + 3px);
    }
    ol.static-org-chart > li > div:first-of-type:not(:only-of-type):after {
        left: calc(50% + 3px);
    }
    ol.static-org-chart > li > div:last-of-type:not(:only-of-type):after {
        left: calc(-1em - 3px);
    }
    ol.static-org-chart > li > div + div:not(:last-of-type):after {
        height: 3px;
        left: -2em;
        width: calc(100% + 4em);
    }
    /* SECONDARY */
    ol.static-org-chart > li > ol {
        display: flex;
        flex-wrap: nowrap;
    }
    ol.static-org-chart > li > ol:before,
    ol.static-org-chart > li > ol > li:before {
        height: 1em !important;
        left: 50% !important;
        top: 0px !important;
        width: 3px !important;
    }
    
    ol.static-org-chart > li > ol:before {
        height: 0.2em !important;
        left: 8% !important;
        width: calc((100% / 2.2) - 1.5em - 10px) !important;
        top: 50px !important;
    }
    


    ol.static-org-chart > li > ol > li {
        flex-grow: 1;
        padding-left: 1em;
        padding-right: 1em;
        padding-top: 1em;
    }
    ol.static-org-chart > li > ol > li:only-of-type {
        padding-top: 0;
    }
    ol.static-org-chart > li > ol > li:only-of-type:before,
    ol.static-org-chart > li > ol > li:only-of-type:after {
        display: none;
    }
    ol.static-org-chart > li > ol > li:first-of-type:not(:only-of-type):after,
    ol.static-org-chart > li > ol > li:last-of-type:not(:only-of-type):after {
        height: 3px;
        top: 0;
        width: 50%;
    }
    ol.static-org-chart > li > ol > li:first-of-type:not(:only-of-type):after {
        left: 50%;
    }
    ol.static-org-chart > li > ol > li:last-of-type:not(:only-of-type):after {
        left: 0;
    }
    ol.static-org-chart > li > ol > li + li:not(:last-of-type):after {
        height: 3px;
        left: 0;
        top: 0;
        width: 100%;
    }
    ol.static-org-chart #first > li > div {
        height: 80px;
        width: 150px;
        color: #fff;
        background-color: #000053;
    }
    ol.static-org-chart #first > li > div > div {
        width: 180px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: -20%;
		right:-30px;
		text-align: right;
        transform: translateY(-50%);
    }
}
ol.static-org-chart .staff_card {
    width: 300px !important;
    min-width: 250px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);
	border-radius:12px;
}
ol.static-org-chart .staff_title {
    height: 50px;
    text-align: center;
    background: linear-gradient(147deg, rgba(255, 255, 255, 1) 21%, rgba(254, 254, 255, 1) 32%, rgb(131 164 195) 100%, rgba(229, 231, 235, 1) 100%);
    color: #555a62;
    padding: 10px;
    font-weight: bold;
	border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
ol.static-org-chart .staff_info {
    height: 80px;
    padding: 5px;
}
ol.static-org-chart .staff_image img {
    border-radius: 100px;
    width: 60px;
}
ol.static-org-chart .staff_image {
    float: left;
    width: 30%;
}
ol.static-org-chart .staff_name_container {
    padding-top: 15px;
    float: right;
    width: 60%;
}

ol.static-org-chart #second > li > div:not(:first-child) {
    height: 60px;
    width: 300px;
    background: #ececec;
    color:  #000053; 
    font-size: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-bottom: 0.4rem;
    border-radius:12px;
}
ol.static-org-chart #second > li > div:not(:first-child) > div {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
ol.static-org-chart #second > li > div:not(:first-child):hover {
    background: white;
    box-shadow: none;
}
ol.static-org-chart .staff_card + div {
    margin-top: 10px;
}

.staff_card:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
}

@media screen and (max-width:767px) {
		.portallain .textportal {
			display:none;
		}
		.textquote p {
			font-size:14px !important;
		}
		.textquote span {
			font-size:14px !important;
		}
	}

	/* CSS Button Carousel Quote*/
	.button-74 {
  background-color: white;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: rgb(90, 134, 175) 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
  padding: 0 12px;
  line-height: 34px;
  text-align: center;
  text-decoration: none;
}

.button-74:hover {
  background-color: aliceblue;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}

#BeritaSultra {

width: 100%;
}


.buttonDetail:hover {
  box-shadow: 0 0 10px #a5b8f2;
}

/*** Mouse */
.mouse {
  background: white;
  width: 32px;
  height: 52px;
  border-radius: 20px;
  border: 3px solid #999;
  position: fixed;
  top: calc(58% - 30px);
  left: calc(92% - 20px);
  z-index: 1000;
}
.mouse:before, .mouse:after {
  content: "";
  display: block;
  position: absolute;
}



/* Sixth */
.m-5:before {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 10px;
  left: calc(50% - 5px);
  border: 2px solid rgba(153, 153, 153, 0.55);
}
.m-5:after {
  top: 30px;
  left: calc(50% - 5px);
  border: 5px solid transparent;
  border-top-color: #999;
  -webkit-animation: m-5-arrow 1.2s ease-in-out infinite;
          animation: m-5-arrow 1.2s ease-in-out infinite;
}

@-webkit-keyframes m-5-arrow {
  20%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(9px);
  }
  80% {
    transform: translateY(-3px);
  }
}

@keyframes m-5-arrow {
  20%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(9px);
  }
  80% {
    transform: translateY(-3px);
  }
}

 /* 1. Wadah untuk teks berjalan */
    .marquee-container {
        overflow: hidden;      /* Menyembunyikan teks saat keluar dari area h4 */
        white-space: nowrap;   /* Memastikan teks tidak turun ke baris baru */
        width: 100%;           /* Mengisi sisa ruang yang tersedia */
    }

    /* 2. Teks yang akan berjalan */
    .marquee-text {
        display: inline-block; /* Diperlukan agar animasi transform berfungsi */
        animation: marquee-animation 20s linear infinite;
    }

    /* 3. Definisi animasi marquee */
    @keyframes marquee-animation {
        0% {
            transform: translateX(100%); /* Mulai dari luar sisi kanan container */
        }
        100% {
            transform: translateX(-100%);/* Berakhir di luar sisi kiri container */
        }
    }

     /* 4. BARIS BARU: Hentikan animasi saat kursor mouse di atasnya */
    .marquee-container:hover .marquee-text {
        animation-play-state: paused;
    }

</style>
