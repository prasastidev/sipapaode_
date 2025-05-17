<script>
	import { Tabs, TabItem, Heading, P, Span, Marquee, Button, Modal, Popover, Avatar, Timeline, TimelineItem, Chart, Card, Indicator, Badge, CloseButton, AccordionItem, Accordion, Video} from 'flowbite-svelte';
	import { onMount, onDestroy } from 'svelte';
	import ApexCharts from 'apexcharts';
	let clickOutsideModal = false;
	import { cascade } from 'svelte-typewriter';
	import {slide } from 'svelte/transition';
	import { ArrowRightOutline, CalendarWeekSolid, RectangleListOutline, DrawSquareOutline, InfoCircleOutline, QuestionCircleOutline, FileCheckOutline, UserHeadsetOutline } from 'flowbite-svelte-icons';
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

	
	// In this locale "," is the decimal separator and "." is the group separator
	const locale = 'en-EN'
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

let quotes = [
    {
      text: "SiPapaOde dibuat agar agar pelayanan Pemerintahan terutama Biro Pemerintahan & Otonomi Daerah Sultra bisa terintegrasi dan lebih cepat.",
      position: "Kementerian Dalam Negeri, Jakarta",
	  picture: "https://cloud.appwrite.io/v1/storage/buckets/6791fea50005705fec23/files/679aea77003b037ff868/view?project=67384f1d0028200e3af4&project=67384f1d0028200e3af4"
    },
    {
      text: "Inovasi adalah kunci untuk masa depan yang lebih baik.",
      position: "CEO Inovasi Corp",
	  picture: "https://static.vecteezy.com/system/resources/thumbnails/013/394/721/small/user-profile-avatar-png.png"
    },
    {
      text: "Kreativitas adalah kekuatan yang menggerakkan dunia.",
      position: "Art Director Creative Agency",
	  picture: "https://static.vecteezy.com/system/resources/previews/051/718/789/non_2x/elegant-businessman-avatar-with-suit-and-tie-free-png.png"
    }
  ];

  let currentIndex = 0;

function nextQuote() {
  currentIndex = (currentIndex + 1) % quotes.length;
}

function prevQuote() {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
}


</script>

<svelte:window on:click={onWindowClick} />

<svelte:head>
	<title>Sipapaode | Biro Pemerintahan dan Otonomi Daerah Sultra</title>
	<meta name="description" content="Sipapaode | Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>



<!--  Section TOP Header -->

<section>
	<br/><br/><br/>

  <div class="container">
	 <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
		<div class="col-span-2 rounded-xl pr-3">
		<Heading tag="h3" class="mb-4" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl" style="line-height:1.2;">Sistem Informasi Pelayanan <u>Biro Pemerintahan</u> & <u>Otonomi Daerah</u> Berbasis Digital di <Span gradient><b use:cascade={{ interval: 100 }}><b>Provinsi Sulawesi Tenggara</b></b></Span></Heading>
			<br/><h2 class="text-3xl font-extrabold">SIPAPAODE</h2>
		        <span class="morenext flex flex-wrap items-center gap-2 w-64">
				 <label style="border-bottom:1px dotted;margin-left:4px;">Info.</label> <Button on:click={() => (clickOutsideModal = true)} pill={true} outline={true} class="arrowvisit !p-2 size-8"><ArrowRightOutline class="w-6 h-6" /></Button>
				</span>
				  <Modal size="lg" title="Selamat Datang di Situs Web Aplikasi Sipapaode" bind:open={clickOutsideModal} autoclose outsideclose>
					Di situs web Aplikasi Sipapaode, Anda dapat mengakses beragam layanan dan informasi yang berkaitan dengan kerjasama serta pengelolaan pemerintahan di Provinsi Sulawesi Tenggara. Berikut adalah beberapa fasilitas yang tersedia untuk mendukung efisiensi dan transparansi dalam pengelolaan pemerintahan:
					<br/>
						<ul class="list-disc">
						<li><b style="color:#6767c3;">Pengajuan Kerjasama Secara Online</b><br/>Anda dapat mengajukan kerjasama baik dengan pihak ketiga/swasta maupun antar pemerintah secara online kepada Pemerintah Provinsi Sulawesi Tenggara.</li>
						<li><b style="color:#6767c3;">Dokumentasi dan Pemantauan Kerjasama</b><br/>Melihat dokumentasi kerjasama yang telah dilakukan serta melakukan pemantauan (monitoring) secara online. Selain itu, tersedia juga fasilitas pelaporan evaluasi kerjasama antara Pemerintah Daerah Kabupaten/Kota di Provinsi Sulawesi Tenggara. </li>   
						<li><b style="color:#6767c3;">Informasi dan Pelaporan Standar Pelayanan Minimum (SPM)</b><br/>Mendapatkan informasi terkait fasilitas standar pelayanan minimum (SPM) yang diterapkan oleh Pemerintah Daerah Kabupaten/Kota di Provinsi Sulawesi Tenggara. </li>
						<li><b style="color:#6767c3;">Data Wilayah Pemerintahan</b><br/>Akses informasi data wilayah pemerintahan baik dari Pemerintah Provinsi maupun Kabupaten/Kota, lengkap dengan pemetaan (GIS) dan rupabumi. </li>
						<li><b style="color:#6767c3;">Penataan Wilayah Pemerintahan.</b><br/>Fasilitas untuk penataan wilayah pemerintahan, termasuk pemutakhiran data oleh Kabupaten/Kota dan pembentukan daerah otonomi baru.</li>
						<li><b style="color:#6767c3;">Penerbitan SK Pemerintahan</b><br/>Proses penerbitan Surat Keputusan (SK) terkait dengan berbagai aspek pemerintahan. </li>
						<li><b style="color:#6767c3;">Penerbitan SK Gubernur</b><br/>Penerbitan SK Gubernur sehubungan dengan pengajuan keberangkatan luar negeri. </li>
						<li><b style="color:#6767c3;">Laporan LPPD dan LKPJ</b><br/>Laporan Laporan Penyelenggaraan Pemerintahan Daerah (LPPD) dan Laporan Keterangan Pertanggungjawaban (LKPJ) oleh Pemerintah Daerah Kabupaten/Kota, serta inventarisasi penataan urusan daerah otonomi baru. </li>
						<li><b style="color:#6767c3;">Saran dan Informasi</b><br/>Mengirimkan saran dan informasi kepada Biro Pemerintahan dan Otonomi Daerah Provinsi Sulawesi Tenggara. </li>
					</ul> 	<br/>
					Dengan fitur-fitur tersebut, Web Aplikasi Sipapaode berkomitmen untuk mendukung transparansi, efisiensi, dan kolaborasi dalam pengelolaan pemerintahan di Provinsi Sulawesi Tenggara.
					<svelte:fragment slot="footer">
					  <Button>Tutup</Button>
					</svelte:fragment>
				  </Modal>

				  <br/> <span style="font-size: 15px;margin-bottom: 8px;display: inline-block;margin-left: 5px;">Bidang di Biro Pemerintahan & Otonomi Daerah, meliputi:</span> <br/>
				  <Button color="light" pill id="b1" style="background:transparent;margin:2px;border: 1px solid #2fb7e0;"><QuestionCircleOutline class="w-5 h-5 mr-1" style="color:#8ac5db;" /> Bag. Kerjasama</Button><Popover class="w-64 text-sm font-light" transition={slide} placement='bottom' title="Bag. Kerjasama" triggeredBy="#b1" trigger="click">Memfasilitasi Administrasi Kerjasama Pihak Ketiga / Swasta maupun Antar Pemerintah dan K/L, Pendataan dan Monitoring</Popover>
                  <Button color="light" pill id="b2" style="background:transparent;margin:2px;border: 1px solid #2fb7e0;"><QuestionCircleOutline class="w-5 h-5 mr-1" style="color:#8ac5db;" /> Koord. Pemerintahan</Button><Popover class="w-64 text-sm font-light" transition={slide} title="Koordinasi Pemerintahan" triggeredBy="#b2" trigger="click">Fasilitas Tata Wilayah Pemerintahan dan Administrasi Pemerintahan (Fasilitas Pembentukan Daerah Otonomi Baru, Kode Data Wilayah Pemerintahan, Pemetaan (GIS), serta rupa bumi).</Popover>
				  <Button color="light" pill id="b3" style="background:transparent;margin:2px;border: 1px solid #2fb7e0;"><QuestionCircleOutline class="w-5 h-5 mr-1" style="color:#8ac5db;" /> Koord. Otonomi Daerah</Button><Popover class="w-64 text-sm font-light" transition={slide} title="Koordinasi Otonomi Daerah" triggeredBy="#b3" trigger="click">Fasilitas Penerbitan SK Sehubungan dengan Pemerintahan, SK Gubernur izin keberangkatan ke Luar Negeri dan Administrasi Laporan Evaluasi Kinerja Daerah (LPPD & LKPJ).</Popover>
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
        <div id="banner" tabindex="-1" class="flex z-50 gap-3 justify-between items-start py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center dark:border-gray-700 lg:py-4 dark:bg-gray-800" style="border:3px solid #bcd6ad;border-radius:10px;">
			<img class="w-14 h-14 rounded-full" src={ImagelogoSultra} alt="Sultra Pictures" />
			<h4 class="text-xl text-left"> {@html BannerInfo.Text_Banner} </h4>
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
	<Heading tag="h3" class="mb-3 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="box-shadow: #c3ddfd -15px -20px;border-bottom:8px solid #c3ddfd;">FITUR PELAYANAN ONLINE</Span></Heading> <br/>
	<div class="flex items-center font-light text-gray-500 dark:text-gray-400 p-1 mb-2 -mt-4" style="font-size:15px;">
		Silahkan Pilih Layanan Online sesuai Bidang di Bawah. Lihat Panduan Tentang Layanan <button id="panduaninfo">
			<InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /> </button>
	  </div>
	  <Popover triggeredBy="#panduaninfo" class="w-72 md:w-96 lg:w-96 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="left-start">
		<div class="p-3 space-y-2" style="z-index:100;">
		  <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Jenis Layanan</h3>
		  <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  <br/>
		  Pelayanan akan dilakukan dengan mengisi formulir secara online yang telah disediakan, dengan melampirkan sejumlah dokumen yang telah dipersiapkan.<br/>
		   <Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  <br/>
		   Pelayanan dapat dilakukan kantor Biro Pemerintahan dengan membawa sejumlah dokumen yang telah dipersiapkan. <br/>
		</div>
	  </Popover>
	
	<Tabs tabStyle="full"  defaultClass="flex border-2 border-slate-400 rounded-lg divide-x rtl:divide-x-reverse divide-blue-200 shadow dark:divide-blue-700" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
		<TabItem open style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
		  <span slot="title" class="text-base">Bag. Kerjasama</span>
		  <p class="text-2sm text-blue-400 dark:text-blue-300 pb-4 text-center"> 
		Dibawah berikut adalah pilihan Layanan Online pada Bidang Bagian Kerjasama.
		  </p> <center>
		  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mr-6">
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;"> 
				
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
				<h3 class="title text-1xl font-bold" style="line-height:normal;background: #f0f8ff;">
				  <a href="/kerjasama-pihak-ketiga">Fasilitas Kerjasama dengan Pihak Ketiga / Swasta</a>
				</h3>
				<p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk umum pihak ketiga atau instansi swasta.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;"> 
				{#if OnlineKSpemerintahdaerahkl.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge> {/if}  
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKAinstansi} alt="kerjasama instansi"> 
				  <div class="img-blur">
					<a href="/kerjasama-antar-pemerintah-daerah-kl">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background: #f0f8ff;">
				  <a href="/kerjasama-antar-pemerintah-daerah-kl">Fasilitas Kerjasama antar Pemerintah Daerah dan K/L</a>
				</h3>
				<p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk instansi Pemerintah Daerah dan Kementerian atau Lembaga.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
				{#if OnlineLaporanEvaluasiKS.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKLuarNegeri} alt="Evaluasi Kerjasama">
				  <div class="img-blur">
					<a href="/pengiriman-evaluasi-kerjasama">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-sm font-bold" style="line-height:normal;background: #f0f8ff;">
				  <a href="/pengiriman-evaluasi-kerjasama">Laporan Evaluasi Kerjasama</a>
				</h3>
				<p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam mengirim laporan evaluasi kerjasama.
				</p>
			  </div> </div>
			
		</div></center> <br/><span style="color:#a75710;"> //** Klik Icon Untuk Melanjutkan</span> <br/>
		</TabItem>
		<TabItem>
		  <span slot="title" class="text-base">Koord. Pemerintahan</span>
		  <p class="text-2sm text-blue-400 dark:text-blue-300 pb-4 text-center"> 
			Dibawah berikut adalah pilihan Layanan Online pada Bidang Koordinator Pemerintahan.
			  </p>  <center>
		  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mr-6">
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">  
				{#if standarPM.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ PenataanWilayahimg } alt="kerjasama pihak swasta"> 
				  <div class="img-blur">
					<a href="/coming-soon">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background: #f0f8ff;">
				  <a href="/coming-soon">Fasilitas Standar Pelayanan Minimum (SPM)</a>
				</h3>
				<p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam hal informasi dan pengiriman laporan Standar Pelayanan Minimum atau SPM.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
				{#if penataanWP.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				   <img src={regionimg} alt="kerjasama instansi"> 
				  <div class="img-blur">
					<a href="/coming-soon">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background: #f0f8ff;">
				  <a href="/coming-soon">Fasilitas Penataan Wilayah Pemerintahan & Fasilitas Penegasan Batas Daerah</a>
				</h3>
				<p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam hal informasi Fasilitasi Penataan Wilayah Pemerintahan dan Penegasan Batas Daerah.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
				{#if DaerahOB.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
			      <img src={ Otonomiimg } alt="Kerjasama Luar Negeri"> 
				  <div class="img-blur">
					<a href="/coming-soon">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-sm font-bold" style="line-height:normal;background: #f0f8ff;">
				  <a href="/coming-soon">Pembentukan Daerah Otonomi Baru</a>
				</h3>
				<p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk Pemerintah Daerah di Sultra dalam hal informasi pembentukan daerah Otonomi Baru.
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
				{#if infoKDW.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ KodeWilayahimg } alt="Report Kerjasama"> 
				  <div class="img-blur">
					<a href="/maps-sultra/#TabelOtonomi">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;background: #f0f8ff;">
				  <a href="/maps-sultra/#TabelOtonomi">Informasi Kode, Data Wilayah Pemerintahan, Pulau dan Rupa Bumi</a>
				</h3>
				<p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk umum dalam mengetahui Informasi Kode, Data Wilayah dan Rupa Bumi Kab/Kota Sultra.
				</p>
			  </div> </div>
			 
		</div></center> <br/><span style="color:#a75710;"> //** Klik Icon Untuk Melanjutkan</span> <br/>
		</TabItem>
		<TabItem>
		  <span slot="title" class="text-base">Koord. Otonomi Daerah</span>
		  <p class="text-2sm text-blue-400 dark:text-blue-300 pb-4 text-center"> 
			Dibawah berikut adalah pilihan Layanan Online pada Bidang Koordinator Otonomi Daerah.
			  </p>
		  <center>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mr-6">
			  <div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;"> 
				{#if penerbitanSKgub.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				  <div class="imgBox">
				  <img src={ penerbitanSKimg } alt="kerjasama pihak swasta"> 
					<div class="img-blur">
					  <a href="/coming-soon">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-1xl font-bold" style="line-height:normal;background: #f0f8ff;">
					<a href="/coming-soon">Penerbitan Surat & SK Gubernur Pejabat Negara & Legistlatif</a>
				  </h3>
				  <p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk Kepala Daerah, DPRD dan ASN di Sultra dalam hal menerbitkan SK ataupun Surat resmi lainnya baik Pengangkatan/Pemberhentian ataupun Pengurusan Izin ke Luar Negeri.
				</p>
				</div> </div>
			  <div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
				{#if lppdLKPJ.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				  <div class="imgBox">
				    <img src={ laporanimg } alt="kerjasama instansi"> 
					<div class="img-blur">
					  <a href="/penyampaian-lppd">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-1xl font-bold" style="line-height:normal;background: #f0f8ff;">
					<a href="/penyampaian-lppd">Laporan dan Evaluasi: LKPJ & LPPD</a>
				  </h3>
				  <p class="textKetFitur" style="color:#2c6ed8;">
					Layanan ini diperuntukan untuk Pemerintah Daerah se-Sultra dalam hal pengiriman laporan LKPJ ataupun LPPD.
				</p>
				</div> </div>
			  <div class="p-0"> <div class="card_fitur" style="width:100%;box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
				{#if InventarisasiPOB.Status_raw } <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Pengisian Formulir Online</Badge>  {/if}    
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Visit Kantor</Badge>  
				<br/>
				  <div class="imgBox">
				    <img src={ Inventarisasiotonomi } alt="Kerjasama Luar Negeri"> 
					<div class="img-blur">
					  <a href="/coming-soon">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-sm font-bold" style="line-height:normal;background: #f0f8ff;">
					<a href="/coming-soon">Inventarisasi Penataan Urusan Daerah Otonomi Baru</a>
				  </h3>
				  <p class="textKetFitur" style="color:#2c6ed8;">
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
    <Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">PROSES ALUR LAYANAN BIRO PEMERINTAHAN & OTDA SULTRA</Span></Heading>
	<br/>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
		<div class="rounded-xl p-2 pb-4">
			 <Timeline order="vertical" style={"padding: 8px;border-radius: 10px;border: 6px dotted #c3ddfd;"}>
<TimelineItem title=" Persyaratan">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <RectangleListOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan mb-4 text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
	Pemohon atau Pengguna layanan, menyampaikan Permohonan baik via Online ataupun Offline (Kantor), yang terdapat pada Fitur Layanan. Pengajuan Informasi oleh Publik dapat mendownload Formulir pada halaman Laporan dan Informasi.</p>
</TimelineItem>
<TimelineItem title=" Mekanisme">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <DrawSquareOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
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
	 <CalendarWeekSolid class="w-6 h-6 text-blue-500 dark:text-blue-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius:8px;box-shadow: #e9edf4 7px 7px;">
	Waktu penyelesaian bisa berlangsung dalam 1 jam ataupun selama 3-5 hari. Sesuai dengan Permohonan yang diajukan.</p>
</TimelineItem>
<TimelineItem title=" Output / Hasil">
	<svelte:fragment slot="icon">
	  <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
		<FileCheckOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
	  </span>
	</svelte:fragment>
	<p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
		Output dapat berupa Informasi ataupun Surat Keputusan dari Penyelenggara.</p>
   </TimelineItem>
   <TimelineItem title=" Info Hot Line">
	<svelte:fragment slot="icon">
	  <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
		<UserHeadsetOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
	  </span>
	</svelte:fragment>
	<p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
		Informasi Pertanyaan dapat melalui langsung di Kantor Biro Pemerintahan dan Otda Sultra atau melalui Contact Info yang telah disediakan.</p>
   </TimelineItem>
</Timeline> 
		 </div>
		 <div class="col-span-2 rounded-xl p-2 pb-4">
			<h2 class="text-2xl font-bold mb-2" style="box-shadow: #c3ddfd 15px -20px;">Kotak Saran & Info</h2>
			
			<div style="padding:10px;background:white;">
				<div class="block grid-cols-8 gap-2 md:flex lg:flex">
					<div class="col-span-6">
						<b>Alamat:</b> <br/>
						<b>Biro Pemerintahan dan Otonomi Daerah Sultra</b><br/>
						Kompleks Bumi Praja Anduonohu, <br/>Kota Kendari, Sulawesi Tenggara 93231 <br/>	
					</div>
					<div><img src="https://app.wondersites.org/templates/review-widget.net/assets/img/widgets/square-widget-7.png" style="height:100px;width:250px;margin-left:10px;" /></div> 			 
				   </div>
			
   
			</div> <br/><br/><br/>
			
			<h2 class="text-2xl font-bold mb-2" style="box-shadow: #c3ddfd 15px -20px;margin-bottom:18px;">Berita Hot Terkini di Sulawesi Tenggara
			</h2> 
			<div id="BeritaSultra" style="position: relative;height: 70%;padding-bottom:70px; /* Aspect ratio: 1600/900 * 100 */">
				<iframe 
					src="https://rss.app/embed/v1/list/tVd4uipyQtOidTKx" 
					frameborder="0" 
					style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;">
				</iframe>
			</div>	 		   
		 </div>  
	 </div>
	 <a href="/berita-sulawesi-tenggara" class="linevisit mt-10 md:-mt-10"><Button color="light" pill style="cursor:pointer;position: relative;float:right;">Lihat Berita Lainnya <label class="arrowvisit"><ArrowRightOutline class="w-6 h-6" /></label></Button></a>
	 <!-- <a href="/berita-sulawesi-tenggara" style="text-decoration:underline;"><button on:click={nextQuote} class="button-74" style="margin-top:40px;cursor:pointer;position: relative;">Lihat Berita Lainnya</button></a> -->        
  </section>
    <br/> <br/>
  <!--  End Section Proses Alur Layanan -->  

<!--  Map Modal -->  
  <Modal size="lg" title="Map Kabupaten Bombana" bind:open={ModalmapBombana} autoclose>
	<div style="width: 100%">{@html DataBombana.Map }</div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{@html DataBombana.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Map Kabupaten Wakatobi" bind:open={ModalmapWakatobi} autoclose>
	<div style="width: 100%">{@html DataWakatobi.Map }</div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{@html DataWakatobi.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Map Kota Kendari" bind:open={ModalmapKendari} autoclose>
	<div style="width: 100%">{@html DataKotaKendari.Map } </div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{@html DataKotaKendari.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Map Kabupaten Konawe" bind:open={ModalmapKonawe} autoclose>
	<div style="width: 100%">{@html DataKonawe.Map }</div>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{@html DataKonawe.KetMap }</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal size="lg" title="Map Kabupaten Konawe Utara" bind:open={ModalmapKonaweUtara} autoclose>
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
	<Heading id="InfoTabelGrafik" tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">INFORMASI PEMERINTAHAN OTONOMI SULAWESI TENGGARA</Span></Heading>
	<br/>
	<div style="padding:12px;background:white;border-radius:14px;">
		  <div class="block grid-cols-12 gap-2 md:flex lg:flex">
			 <div><span style="font-size:40px;">🗺️</span></div> 
			  <div class="col-span-11">Lihat informasi statistik Pemerintah Kab/Kota Sulawesi tenggara mencakup luas wilayah, jumlah penduduk, Lambang, Jumlah Kecamatan, Kelurahan / Desa, Map Geografis, serta Situs web Pemerintahan. <span style="color:#49a1f2;">(Update: 2025)</span></div>
			</div>
		</div> <br/>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
		<div class="p-1">
			
			<table id="MapArea" class="table-striped" style="width:100%;display: block;background-color: white;padding: 7px;border-radius: 8px;">
				<thead style="background:#ecf4fb;text-align: left;">
				<tr>
				<th style="width:40%;white-space: break-spaces;">Nama</th>
				<th style="width:40%;white-space:break-spaces;">Luas Wilayah / Jumlah Penduduk </th>
				<th style="width:20%;">Detail</th>
				</tr>
				</thead>
				<tbody>  
				<tr>
				<td>{ DataBombana.Nama }<Button id="popbombana" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button> 
					<Popover triggeredBy="#popbombana" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
						<div class="p-3">
						  <center>
							<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Lambang_Kabupaten_Bombana.png" alt="Jese Leos" width="90px" height="90px" />
						 </center>
						 <p class="mt-3">
							<b>{ DataBombana.Nama }</b><br/>
							Ibukota : { DataBombana.Ibukota } <br/>
							Kecamatan : { DataBombana.J_Kecamatan }<br/>
							Kelurahan/Desa : { DataBombana.J_Kelurahan }/{ DataBombana.J_Desa }	<br/>
						 </p>
						</div>
					  </Popover>	
				</td>
				<td style="white-space: break-spaces;">{formatter.format(DataBombana.Luas_Wilayah)} km2 / {formatter.format(DataBombana.J_Penduduk)} 👤 </td>
				 <td> 
					<span class="buttonDetail" on:click={()=>visibleBombana = !visibleBombana} bind:this={closeBombana} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
						&#8285; 
					</span>
					<!-- menu -->
					{#if visibleBombana}
					<div id="menuDropdown" class="dropdown-content">
					  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapBombana = true)}>Lihat Map</a> 
					  <a href={ DataBombana.Situs } rel="nofollow noopener" target="_blank">Ke Situs Web</a>
					</div>
					{/if}
				  </td>
				</tr>
				
				<tr>
					<td>{ DataWakatobi.Nama } <Button id="popwakatobi" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popwakatobi" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/id/0/0d/Logo_Kabupaten_Wakatobi_Sulawesi_Tenggara.png" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>{ DataWakatobi.Nama }</b><br/>
								Ibukota : { DataWakatobi.Ibukota } <br/>
								Kecamatan : { DataWakatobi.J_Kecamatan }<br/>
								Kelurahan/Desa : { DataWakatobi.J_Kelurahan }/{ DataWakatobi.J_Desa }	<br/>
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;">{formatter.format(DataWakatobi.Luas_Wilayah)} km2 / {formatter.format(DataWakatobi.J_Penduduk)} 👤 </td>
					 <td> 
						<span class="buttonDetail" on:click={()=>visibleWakatobi  = !visibleWakatobi} bind:this={closeWakatobi} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleWakatobi}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapWakatobi = true)}>Lihat Map</a> 
						  <a href={ DataWakatobi.Situs } rel="nofollow noopener" target="_blank">Ke Situs Web</a>
						</div>
						{/if}
					 </td>
				</tr>
				<tr>
					<td>{ DataKotaKendari.Nama } <Button id="popkendari" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkendari" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Lambang_Kota_Kendari.png" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>{ DataKotaKendari.Nama }</b><br/>
								Ibukota : { DataKotaKendari.Ibukota } <br/>
								Kecamatan : { DataKotaKendari.J_Kecamatan }<br/>
								Kelurahan/Desa : { DataKotaKendari.J_Kelurahan }/{ DataKotaKendari.J_Desa }<br/>	
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;">{formatter.format(DataKotaKendari.Luas_Wilayah)} km2 / {formatter.format(DataKotaKendari.J_Penduduk)} 👤 </td>
					 <td> 
						<span class="buttonDetail" on:click={()=>visibleKendari  = !visibleKendari} bind:this={closeKendari} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKendari}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKendari = true)}>Lihat Map</a> 
						  <a href={ DataKotaKendari.Situs } rel="nofollow noopener" target="_blank">Ke Situs Web</a>
						</div>
						{/if}
					 </td>
				</tr>
			   
				<tr>
					<td>{DataKonawe.Nama } <Button id="popkonawe" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkonawe" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Lambang_Kabupaten_Konawe.png" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>{DataKonawe.Nama }</b><br/>
								Ibukota : {DataKonawe.Ibukota  } <br/>
								Kecamatan : {DataKonawe.J_Kecamatan }<br/>
								Kelurahan/Desa : {DataKonawe.J_Kelurahan }/{DataKonawe.J_Desa}	<br/>
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;"> {formatter.format(DataKonawe.Luas_Wilayah)} km2 / {formatter.format(DataKonawe.J_Penduduk)} 👤 </td>
					 <td> 
						<span class="buttonDetail" on:click={()=>visibleKonawe  = !visibleKonawe} bind:this={closeKonawe} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKonawe}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKonawe = true)}>Lihat Map</a> 
						  <a href={DataKonawe.Situs } rel="nofollow noopener" target="_blank">Ke Situs Web</a>
						</div>
						{/if}
					 </td>
				</tr>

				<tr>
					<td>{DataKonaweUtara.Nama } <Button id="popkonaweutara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkonaweutara" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_konawe_utara.jpg" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>{DataKonaweUtara.Nama }</b><br/>
								Ibukota : {DataKonaweUtara.Ibukota }<br/>
								Kecamatan : {DataKonaweUtara.J_Kecamatan }<br/>
								Kelurahan/Desa : {DataKonaweUtara.J_Kelurahan }/{DataKonaweUtara.J_Desa }
							 </p>
							</div>
						  </Popover>
					</td>
					<td>{formatter.format(DataKonaweUtara.Luas_Wilayah)} km2 / {formatter.format(DataKonaweUtara.J_Penduduk)} 👤 </td>
					 <td> 
						<span class="buttonDetail" on:click={()=>visibleKonaweUtara  = !visibleKonaweUtara} bind:this={closeKonaweUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKonaweUtara}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKonaweUtara = true)}>Lihat Map</a> 
						  <a href={DataKonaweUtara.Situs } rel="nofollow noopener" target="_blank">Ke Situs Web</a>
						</div>
						{/if}
					 </td>
				</tr>
		
			</tbody>
		</table>
		</div>
		<div class="p-1">
			<Card class="w-full max-w-lg">
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

		
		Berdasarkan {currentDataName} <br/>

		<div class="container mx-auto p-1 pb-1">
			
			<div bind:this={chartElement}></div>
			
		   <div class="flex justify-left -mt-10 space-x-4 relative">
			<button on:click={() => updateChartData(DataJP, 'Jumlah Penduduk', '#1A56DB')} class="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded" style="font-size:12px;border-radius:10px;">
			Jumlah Penduduk </button>
		    <button on:click={() => updateChartData(DataLW, 'Luas Wilayah', '#FDBA8C')} class="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-6 rounded" style="font-size:12px;border-radius:10px;">
			Luas Wilayah</button>
		   </div>
		   
	   </div>
			  </Card>
		</div>
	  </div>
  
   <br/> <a href="/maps-sultra/#TabelOtonomi" class="linevisit"><Button color="light" pill>Lihat Kota / Kabupaten Lainnya <label class="arrowvisit"><ArrowRightOutline class="w-6 h-6" /></label></Button></a>
   <br/>
  </section>
           <br/>
  <!-- End Section Otonomi -->

   <!-- Section Organization -->
<section>
	<Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">STRUKTUR ORGANISASI BIRO PEM. & OTDA SULTRA</Span></Heading>
	<span>Dibawah berikut adalah Struktur Organisasi Biro Pemerintahan dan Otonomi Daerah Setda Sulawesi Tenggara</span>
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
                            <img src={Karo} class="card-img-top" />
                        </div>
                        <div class="staff_name_container">
							Muliadi, S.ST
                        </div>
                    </div>
                </div>
                <ol id="first">
                   
                    <li>
                        <div style="width:260px !important;padding:6px;"> 
							<img src={ PicTU } style="width:60px;height:60px;border-radius:50%;" />
						
                            <div>Kasubag. Tata Usaha</div>
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
                                    <img src={ PicKabagKS } class="card-img-top" />
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
                                Koordinator Pemerintahan
                            </div>
                            <div class="staff_info">
                                <div class="staff_image">
                                    <img src={ PicProfileM } class="card-img-top" />
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
                                Koordinator Otonomi Daerah
                            </div>
                            <div class="staff_info">
                                <div class="staff_image">
                                    <img src={ PicProfileM } class="card-img-top" />
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
	 <br/> <a href="/profil/#Struktur" class="linevisit"><Button color="light" pill>Lihat Struktur Lebih Lengkap <label class="arrowvisit"><ArrowRightOutline class="w-6 h-6" /></label></Button></a>
	<br/>
</section>

<br/><br/>
  <!--  Section Quote -->  
 <section style="align-items: normal;"> 
	<center><h3 class="justify-start font-semibold text-3xl mb-4">Dokumentasi Album Gallery:</h3></center>
	<div class="flex justify-end mt-4" style="text-align:right;margin-bottom:14px;">
		<button on:click={prevQuote} class="button-74 mr-2">&#8678; Prev</button>
		<button on:click={nextQuote} class="button-74">Next &#8680;</button>
	  </div>

<div class="textquote grid grid-cols-12" style="width: 100%;height: 330px;background-color: aliceblue;margin: 0;border-radius: 15px;padding:20px;padding-top:40px;box-shadow: 15px 20px darkslategray;box-sizing: border-box;">
	<div class="col-span-8 rounded-xl pr-2">
	  <img src={quotes[currentIndex].picture} style="width:560px;height:260px;border-radius:40px;" /><br/>
	  
	</div>
	<div class="col-span-4 rounded-xl">
	<span style="font-family: Libre Franklin, sans-serif;font-size:60px;color: darkslategray;font-weight: 900;display: block;height:50px;line-height: 60px;">“</span>
	 <p style="font-family:Libre Franklin, sans-serif;font-weight: 100;font-size: 18px;line-height: 1.4;color: darkslategray;">{quotes[currentIndex].text}.</p>
<hr style=" border: 0.5px solid slategray;" /> <br/>
<span style="font-weight: 100; font-size: 14px;">📍 {quotes[currentIndex].position}</span>
	</div>             
</div>
</section>
  <br/> <br/>
  <!--  End Section Quote -->  

 <!--  Section Portal Lainnya -->  
 <section> 
	<br/> <br/>
	<Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">SINERGI PORTAL INFORMASI LAINNYA</Span></Heading> <br/>
  <p>Berikut adalah Daftar Situs yang bisa Anda kunjungi sehubungan dengan Informasi Pemerintahan.</p> <br/>
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
<Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">PERTANYAAN SERING DIAJUKAN (F.A.Q)</Span></Heading> <br/>
<Accordion class="w-full" activeClass="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800" inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
	<AccordionItem class="font-semibold text-lg" open>
	  <span slot="header">Apa itu Sipapaode - Biro Pemerintahan dan Otonomi Daerah Sulawesi tenggara</span>
	  <p class="mb-2 text-gray-500 dark:text-gray-400">Sipapaode merupakan langkah maju dalam upaya meningkatkan pelayanan pemerintahan di Sulawesi Tenggara. Dengan memanfaatkan teknologi informasi, diharapkan sistem ini dapat menciptakan layanan yang lebih efisien, transparan, dan mudah diakses oleh masyarakat. </p>
	</AccordionItem>
	<AccordionItem class="font-semibold text-lg">
	  <span slot="header">Bagaimana Pengajuan Proses Fasilitas Kerjasama Antar Pemerintah Dalam dan Luar Negeri atau Badan Usaha / Swasta.</span>
	  <p class="mb-2 text-gray-500 dark:text-gray-400">Proses pengajuan fasilitas kerjasama dapat dilakukan melalui Fitur-Fitur Layanan di Tab Kerjasama. Anda akan diarahkan untuk mengisi Formulir serta mendapatkan informasi tambahan mengenai kerjasama tersebut.</p>
	</AccordionItem>
	<AccordionItem class="font-semibold text-lg">
		<span slot="header">Dibagian mana menemukan informasi tentang Kode data wilayah pemerintahan, Pulau dan Rupa Bumi di Sulawesi Tenggara.</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">Anda dapat menemukan Informasi tersebut pada halaman situs web Applikasi Sipapaode pada halaman di Bawah berikut ini:
        <br/><a href="/maps-sultra" target="_blank" style="text-decoration:underline;">https://www.sipapaode.id/maps-sultra</a>
		</p>
	  </AccordionItem>
	  <AccordionItem class="font-semibold text-lg">
		<span slot="header">Apa saja bidang di Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara.</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">Bidang di Biro Pemerintahan dan Otonomi Daerah Prov. Sulawesi Tenggara adalah Bagian Kerjasama, Koord. Pemerintahan dan Koord. Otonomi Daerah.</p>
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
	}
	
	tr:nth-child(even) {
	  background-color: #f2f2f2;
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

@media screen and (max-width: 760px) {
  .dropdown-content {
   right: 10px;
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
        background: linear-gradient(147deg, rgba(255, 255, 255, 1) 21%, rgba(254, 254, 255, 1) 32%, rgba(226, 237, 255, 1) 100%, rgba(229, 231, 235, 1) 100%);
        border-radius: 12px;
        border: 3px dotted #3b3b44;
        font-weight: 600;
}
ol.static-org-chart #first > li > div > div {
    position: relative;
    top: -60%;
    transform: translateY(-50%);
	right:-40px;
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
        bottom: -1em !important;
        top: inherit !important;
    }
    ol.static-org-chart > li > div:before {
        height: 1em !important;
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
        width: 120px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: -50%;
		right:-60px;
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
    background: linear-gradient(147deg, rgba(255,255,255,1) 21%, rgba(254,254,255,1) 32%, rgba(226,237,255,1) 100%, rgba(229,231,235,1) 100%);
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
    width: 250px;
    background-color: #ececec;
    color:  #000053; 
    font-size: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-bottom: 0.2rem;
}
ol.static-org-chart #second > li > div:not(:first-child) > div {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
ol.static-org-chart #second > li > div:not(:first-child):hover {
    background-color: #b3ff66;
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
  background-color: aliceblue;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
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
  background-color: #fff;
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
padding-top: 127.78%;
width: 100%;
}

@media screen and (max-width: 767px) {
#BeritaSultra {
padding-top: 197.78%;
width: 112%;
margin-left: -6%;
}

}

.buttonDetail:hover {
  box-shadow: 0 0 10px #a5b8f2;
}

/*** Mouse */
.mouse {
  width: 32px;
  height: 52px;
  border-radius: 20px;
  border: 3px solid #999;
  position: fixed;
  top: calc(58% - 30px);
  left: calc(92% - 20px);
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


</style>
