<script>
	import { Tabs, TabItem, Heading, P, Span, Marquee, Button, Modal, Popover, Avatar, Timeline, TimelineItem, Chart, Card, Indicator, Badge, CloseButton, AccordionItem, Accordion} from 'flowbite-svelte';
	let clickOutsideModal = false;
	import { cascade } from 'svelte-typewriter';
	import {slide } from 'svelte/transition';
	import { ArrowRightOutline, CalendarWeekSolid, RectangleListOutline, DrawSquareOutline, InfoCircleOutline, FileCheckOutline, UserHeadsetOutline } from 'flowbite-svelte-icons';
	import ImageKSwasta from '$lib/images/Kerjasama-Pihak-Swasta.webp';
	import ImageKAinstansi from '$lib/images/Kerjasama-Antar-Instansipemerintah.webp';
	import ImageKLuarNegeri from '$lib/images/Kerjasama-Luar-Negeri.webp';
	import ReportKerjasama from '$lib/images/Report-Kerjasama.webp';
	import ImagelogoSultra from '$lib/images/Sultra-Logo.webp';
	import UlaSiolaLogo from '$lib/images/Ula-Siola.webp';
	import SILPPDLogo from '$lib/images/SILPPD.webp';
	import laporLogo from '$lib/images/Lapor.webp';
	import sultraprovLogo from '$lib/images/Sultraprov.webp';
	import mapBombana from '$lib/images/Bombana-Map.webp';
	import mapWakatobi from '$lib/images/Wakatobi-Map.webp';
	import mapKendari from '$lib/images/Kota-Kendari-Map.webp';
	import mapKonawe from '$lib/images/Konawe-Map.webp';
	import mapKonaweUtara from '$lib/images/Konawe-Utara-Map.webp';

	let ModalmapBombana, ModalmapWakatobi, ModalmapKendari, ModalmapKonawe, ModalmapKonaweUtara = false;
	 
    export let visibleBanner = true;
	
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

/** Chart Data **/
	const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: 'Luas Wilayah (km2)',
        color: '#1A56DB',
        data: [
          { x: 'Kab.Bombana', y: 3316.16},
          { x: 'Kab. Wakatobi', y: 473.62 },
          { x: 'Kota Kendari', y: 271.80 },
          { x: 'Kab. Konawe', y: 6087.68 },
          { x: 'Konawe Utara', y: 5101.76 }
        ]
      },
      {
        name: 'Jumlah Penduduk',
        color: '#FDBA8C',
        data: [
          { x: 'Kab.Bombana', y: 150706 },
          { x: 'Kab. Wakatobi', y: 111402 },
          { x: 'Kota Kendari', y: 347381 },
          { x: 'Kab. Konawe', y: 266299 },
          { x: 'Konawe Utara', y: 62403 }
        ]
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
	
</script>

<svelte:window on:click={onWindowClick} />

<svelte:head>
	<title>Home</title>
	<meta name="description" content="sipapaode" />
</svelte:head>

<!--  Section TOP Header -->
<section>
	<br/><br/><br/>

  <div class="container">
	 <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
		<div class="col-span-2 rounded-xl pr-3">
		<Heading tag="h3" class="mb-4" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl">Sistem Informasi Pelayanan Pemerintahan & Otonomi Daerah Berbasis Digital di <Span gradient><b use:cascade={{ interval: 100 }}><b>Provinsi Sulawesi Tenggara</b></b></Span></Heading>
			<br/><h2 class="text-3xl font-extrabold">SIPAPAODE</h2>
		        <span class="morenext flex flex-wrap items-center gap-2 w-64">
				 <label style="border-bottom:1px dotted;margin-left:4px;">Lihat Profile</label> <Button on:click={() => (clickOutsideModal = true)} pill={true} outline={true} class="arrowvisit !p-2 size-8"><ArrowRightOutline class="w-6 h-6" /></Button>
				</span>
				  <Modal title="Tentang SiPapaODe" bind:open={clickOutsideModal} autoclose outsideclose>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400"><b>Sambutan Kepala Biro Pemerintahan dan Otonomi Daerah. </b></p>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						Selamat datang kepada seluruh peserta dalam acara ini. Pada kesempatan yang berharga ini, kita akan membahas tentang Sipapaode, sebuah inisiatif penting dalam mendukung pelaksanaan pemerintahan yang lebih efektif
						dan efisien. Sipapaode diharapkan dapat menjadi alat yang memudahkan koordinasi antar daerah, 
						memperkuat transparansi, dan meningkatkan partisipasi masyarakat dalam proses pembangunan. 
						Mari kita bersama-sama menjadikan platform ini sebagai sarana untuk mencapai tujuan bersama 
						dalam memajukan daerah kita. Terima kasih atas kehadiran dan partisipasi aktif semua pihak. 
						Semoga acara ini memberikan manfaat yang besar bagi kita semua. <br/>
					</p>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Wassalamu’alaikum warahmatullahi wabarakatuh.</p>
					<svelte:fragment slot="footer">
					  <Button href="/profil">Lanjut, Lihat Profil Biro Pemerintahan & Otonomi Daerah - Sultra</Button>
					  <Button color="alternative">Tutup</Button>
					</svelte:fragment>
				  </Modal>

				  <br/> <span style="font-size: 15px;margin-bottom: 8px;display: inline-block;margin-left: 5px;">Bidang di Biro Pemerintahan & Otonomi Daerah, meliputi:</span> <br/>
				  <Button color="light" pill id="b1" style="background:transparent;margin:2px;"> Bag. Kerjasama</Button><Popover class="w-64 text-sm font-light" transition={slide} placement='bottom' title="Bag. Kerjasama" triggeredBy="#b1">Memfasilitasi Administrasi Kerjasama Badan Usaha/Swasta maupun Antar Pemerintah Dalam dan Luar Negeri</Popover>
                  <Button color="light" pill id="b2" style="background:transparent;margin:2px;"> Koord. Pemerintahan</Button><Popover class="w-64 text-sm font-light" transition={slide} title="Koordinasi Pemerintahan" triggeredBy="#b2">Informasi Standar Pelayanan Minimal (SPM), Informasi dan Koordinasi Pelaksanaan monitoring, Evaluasi dan Pelaporan di Bidang Pemerintahan Umum, Kode dan Data Wilayah serta Pembentukan Daerah Otonomi Baru.</Popover>
				  <Button color="light" pill id="b3" style="background:transparent;margin:2px;"> Koord. Otonomi Daerah</Button><Popover class="w-64 text-sm font-light" transition={slide} title="Koordinasi Otonomi Daerah" triggeredBy="#b3">Pengkoordinasian Administrasi Kepala Daerah dan DPRD, Penerbitan SK Gubernur tentang usul Pengangkatan Pj Bupati/Walikota, Penerbitan SK Gubernur Pemberhentian, Pengganti Antar Waktu, Serta Administrasi Evaluasi Kinerja Daerah.</Popover>
              </div>
		  
	     <div class="rounded-xl"><center>
		  <iframe width="100%" height="315" src="https://www.youtube.com/embed/xqm5f9mQQxw?si=_HsZkcpDKZOhKtMd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen 
			style="border-radius:20px;"></iframe><span class="text-xs text-gray-900 dark:text-white">Lihat Video Tentang SipapaOde</span>
			</center>
		  </div>
	   </div>
    </div>
    <br/><br/>
	<div style="text-align:center;margin:10px 0px;padding:14px;width:100%;">
		{#if visibleBanner}
        <div id="banner" tabindex="-1" class="flex z-50 gap-8 justify-between items-start py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center dark:border-gray-700 lg:py-4 dark:bg-gray-800">
			<img class="w-14 h-14 rounded-full" src={ImagelogoSultra} alt="Sultra Pictures" />
			<h4 class="text-2xl text-center">Biro Pemerintah & Otonomi Daerah Sulawesi Tenggara Mengucapkan HUT RI 2024 ke - 79</h4><br/>
         <CloseButton class="border-2" on:click={() => (visibleBanner = false)} />
         </div>
         {/if}

	</div>
	  <br/><br/>
</section>
	<!--End  Section TOP Header -->  

	<!--  Section Fitur Layanan -->  
 <section>
	<Heading tag="h3" class="mb-3 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="box-shadow: #c3ddfd -15px -20px;border-bottom:8px solid #c3ddfd;">FITUR LAYANAN BIRO</Span></Heading> <br/>
	<div class="flex items-center font-light text-gray-500 dark:text-gray-400 p-1 mb-2 -mt-4" style="font-size:15px;">
		<button id="panduaninfo">
		  <InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" />
		</button> Lihat Panduan Tentang Layanan
	  </div>
	  <Popover triggeredBy="#panduaninfo" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
		<div class="p-3 space-y-2" style="z-index:100;">
		  <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Status Layanan</h3>
		  <Badge color="green" rounded class="px-2.5 py-0.5 mb-2 place-items-start">
		  <Indicator color="green" size="xs" class="me-1" />Online</Badge> - <label style="color:blue;">Via Online</label> <br/>
		   Layanan bertanda ini akan dilakukan secara online, Anda bisa mensubmit berkas permohonan secara online dan diproses melalui online, Anda akan menerima notifikasi melalui Email atau No WA. <br/>
		   <Badge color="dark" rounded class="px-2.5 py-0.5 mb-2 place-items-start">
			<Indicator color="dark" size="xs" class="me-1" />Offline</Badge> - <label style="color:blue;">Via Langsung (Kantor)</label> <br/>
		   Layananan bertanda ini akan dilakukan secara Offline atau melalui Via langsung Kantor Biro Pemerintahan & Otonomi Daerah Sultra dan di proses di Kantor Biro Pemerintahan & Otda Sulawesi Tenggara.
		</div>
	  </Popover>
	
	<Tabs tabStyle="full"  defaultClass="flex border-2 border-slate-400 rounded-lg divide-x rtl:divide-x-reverse divide-blue-200 shadow dark:divide-blue-700">
		<TabItem open>
		  <span slot="title" class="text-base">Bag. Kerjasama</span>
		  <p class="text-2sm text-gray-500 dark:text-gray-400 pb-4"> 
            Pilih layanan Bag. Kerjasama sesuai dengan kerjasama yang akan Anda lakukan. Silahkan Baca Prosedur sebelum melakukan proses Pengajuan.
		  </p> <center>
		  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mr-6">
			<div class="p-0"> <div class="card_fitur" style="width:100%;"> 
				<Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Via Online</Badge>  
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKSwasta} alt="kerjasama pihak swasta">
				  <div class="img-blur">
					<a href="/kerjasama">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;">
				  <a href="#">Fasilitas Kerjasama & PKS dengan Pihak Ketiga / Badan Usaha (Swasta)</a>
				</h3>
				<p class="textKetFitur">
				   <a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;"> 
				<Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Via Online</Badge>  
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKAinstansi} alt="kerjasama instansi"> 
				  <div class="img-blur">
					<a href="#">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;">
				  <a href="#">Fasilitas Kerjasama & PKS antar Pemerintah Daerah dan K/L</a>
				</h3>
				<p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;"> <Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Via Online</Badge>  
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<br/>
				<div class="imgBox">
				  <img src={ImageKLuarNegeri} alt="Kerjasama Luar Negeri">
				  <div class="img-blur">
					<a href="#">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-sm font-bold" style="line-height:normal;">
				  <a href="#">Fasilitas Kerjasama & PKS dengan Pihak Asing / Luar Negeri</a>
				</h3>
				<p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				</p>
			  </div> </div>
			
		</div></center> <br/><span style="color:#a75710;"> //** Kolom Layanan Bag. Kerjasama.</span> <br/>
		</TabItem>
		<TabItem>
		  <span slot="title" class="text-base">Koord. Pemerintahan</span>
		  <p class="text-2sm text-gray-500 dark:text-gray-400 pb-4">
			Pilih layanan Koordinator Pemerintahan sesuai dengan yang akan Anda lakukan. Silahkan Baca Prosedur sebelum melakukan proses Pengajuan.
		  </p>  <center>
		  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mr-6">
			<div class="p-0"> <div class="card_fitur" style="width:100%;">  <Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<div class="imgBox">
				<!--  <img src={ImageKSwasta} alt="kerjasama pihak swasta"> -->
				  <div class="img-blur">
					<a href="#">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;">
				  <a href="#">Fasilitas Penataan Wilayah Pemerintahan (HUT RI, HUT SULTRA)</a>
				</h3>
				<p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;">
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<div class="imgBox">
				<!--   <img src={ImageKAinstansi} alt="kerjasama instansi"> -->
				  <div class="img-blur">
					<a href="#">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;">
				  <a href="#">Fasilitas Penegasan Batas Daerah</a>
				</h3>
				<p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;">
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<div class="imgBox">
				<!--   <img src={ImageKLuarNegeri} alt="Kerjasama Luar Negeri"> -->
				  <div class="img-blur">
					<a href="#">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-sm font-bold" style="line-height:normal;">
				  <a href="#">Pembentukan Daerah Otonomi Baru</a>
				</h3>
				<p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				</p>
			  </div> </div>
			<div class="p-0"> <div class="card_fitur" style="width:100%;">
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<div class="imgBox">
				<!--   <img src={ReportKerjasama} alt="Report Kerjasama">  -->
				  <div class="img-blur">
					<a href="#">Lanjutkan ></a>
				  </div>
				</div>
				<h3 class="title text-1xl font-bold" style="line-height:normal;">
				  <a href="#">Informasi Kode, Data Wilayah Pemerintahan, Pulau dan Rupa Bumi</a>
				</h3>
				<p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				</p>
			  </div> </div>
			 
		</div></center> <br/><span style="color:#a75710;"> //** Kolom Layanan Koord. Pemerintahan</span> <br/>
		</TabItem>
		<TabItem>
		  <span slot="title" class="text-base">Koord. Otonomi Daerah</span>
		  <p class="text-2sm text-gray-500 dark:text-gray-400 pb-4">
			Pilih layanan Koordinator Otonomi sesuai dengan yang akan Anda lakukan. Silahkan Baca Prosedur sebelum melakukan proses Pengajuan.
		  </p>
		  <center>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mr-6">
			  <div class="p-0"> <div class="card_fitur" style="width:100%;">
				<Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Via Online</Badge>  
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  
				<br/>
				  <div class="imgBox">
				  <!--  <img src={ImageKSwasta} alt="kerjasama pihak swasta"> -->
					<div class="img-blur">
					  <a href="#">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-1xl font-bold" style="line-height:normal;">
					<a href="#">Penerbitan Surat & SK Gubernur Pejabat Negara & Legistlatif</a>
				  </h3>
				  <p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				  </p>
				</div> </div>
			  <div class="p-0"> <div class="card_fitur" style="width:100%;">
				<Badge color="green" rounded class="mb-4"><Indicator color="green" size="xs" class="me-1" />Via Online</Badge>  <br/>
				  <div class="imgBox">
				  <!--   <img src={ImageKAinstansi} alt="kerjasama instansi"> -->
					<div class="img-blur">
					  <a href="#">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-1xl font-bold" style="line-height:normal;">
					<a href="#">Laporan dan Evaluasi: LPKJ, LPPD & LPJ</a>
				  </h3>
				  <p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				  </p>
				</div> </div>
			  <div class="p-0"> <div class="card_fitur" style="width:100%;">
				<Badge color="yellow" rounded class="mb-4"><Indicator color="yellow" size="xs" class="me-1" />Via Kantor</Badge>  <br/>
				  <div class="imgBox">
				  <!--   <img src={ImageKLuarNegeri} alt="Kerjasama Luar Negeri"> -->
					<div class="img-blur">
					  <a href="#">Lanjutkan ></a>
					</div>
				  </div>
				  <h3 class="title text-sm font-bold" style="line-height:normal;">
					<a href="#">Inventarisasi Penataan Urusan Daerah Otonomi Baru</a>
				  </h3>
				  <p class="textKetFitur">
					<a href="#" style="text-decoration:underline;">Baca Prosedur</a>
				  </p>
				</div> </div>
				
		  </div></center> <br/><span style="color:#a75710;"> //** Kolom Layanan Koord. Otonomi Daerah</span> <br/>
		</TabItem>
		
	  </Tabs>

    </section>

<br/><br/><br/>
  <!--  End Section Fitur Layanan --> 

  <!--  Section Proses Alur Layanan -->  
  <section> 
    <Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">PROSES ALUR LAYANAN BIRO PEMERINTAHAN & OTDA SULTRA</Span></Heading>
	<br/>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
		<div class="rounded-xl col-span-2 p-2 pb-4">
			 <Timeline order="vertical" style={"padding: 8px;border-radius: 10px;border: 6px dotted #c3ddfd;"}>
<TimelineItem title=" Persyaratan">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <RectangleListOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan mb-4 text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">Pengguna Layanan menyampaikan Surat Permohonan baik secara Online ataupun Offline. Layanan berstatus Online atau Offline sesuai dengan Pengajuan layanan. Jika layanan berstatus online Anda bisa mengajukan permohonan secara Online. dan layanan berstatus offline, Anda bisa mengajukan surat permohonan di tujukan ke Alamat Biro Pemerintahan dan Otda Sultra. Jl. xxx Sulawesi Tenggara.</p>
</TimelineItem>
<TimelineItem title=" Mekanisme">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <DrawSquareOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
	<b>&#10162;</b> Pengguna Layanan mengajukan atau menyampaikan surat resmi ditujukan kepada Kepala Biro Pemerintahan dan Otda Sulawesi Tenggara, baik via online maupun via Offline (langsung). 
 <br/><b>&#10162;</b> Kepala Biro Pemerintahan dan Otda Sulawesi tenggara mendisposisikan surat permohonan melalui kepada Kepala Bagian Otonomi Daerah. Selanjutnya,
 <br/><b>&#10162;</b> Kepala Bagian Otonomi daerah akan menugaskan Pejabat/Pegawai berkompeten untuk memberikan data dan Informasi.
 <br/><b>&#10162;</b> Pejabat atau Pegawai yang ditunjuk melaksanakan tugas memberikan data dan informasi ke pengguna layanan.
 <br/><b>&#10162;</b> Pengguna layanan akan menerima informasi baik melalui online atau data langsung ke Kantor Biro Pemerintahan dan Otda Sultra dan selanjutnya mengisi buku tamu.</p>
</TimelineItem>
<TimelineItem title=" Waktu Penyelesaian">
 <svelte:fragment slot="icon">
   <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
	 <CalendarWeekSolid class="w-6 h-6 text-blue-500 dark:text-blue-500" />
   </span>
 </svelte:fragment>
 <p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius:8px;box-shadow: #e9edf4 7px 7px;">
	Informasi akan disampaikan maksimal 3 hari sejak surat permohonan diterima. Bisa berlangsung hingga 1 jam, Jika Permohonan dilakukan secara offline (langsung).</p>
</TimelineItem>
<TimelineItem title=" Output / Hasil">
	<svelte:fragment slot="icon">
	  <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
		<FileCheckOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
	  </span>
	</svelte:fragment>
	<p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
		Output atau hasil bisa berupa pdf berisi Informasi atau kebijakan.</p>
   </TimelineItem>
   <TimelineItem title=" Info Hot Line">
	<svelte:fragment slot="icon">
	  <span class="circle pulse flex absolute -start-3 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
		<UserHeadsetOutline class="w-6 h-6 text-blue-500 dark:text-blue-500" />
	  </span>
	</svelte:fragment>
	<p class="alurlayanan text-base font-normal text-gray-500 dark:text-gray-400" style="background: white;padding: 4px;border-radius: 8px;box-shadow: #e9edf4 7px 7px;">
		Bisa konsultasi langsung atau melalui Contact (+6200000)</p>
   </TimelineItem>
</Timeline> 
		 </div>
		 <div class="rounded-xl p-2 pb-4">
			<h2 class="text-2xl font-bold mb-2" style="box-shadow: #c3ddfd 15px -20px;">Informasi Tentang Layanan
			</h2>
			<p style="padding: 4px 4px 16px 8px;border-radius:8px;background: rgb(255,255,255);
background: linear-gradient(147deg, rgba(255,255,255,1) 38%, rgba(254,254,255,1) 73%, rgba(226,237,255,1) 99%, rgba(229,231,235,1) 100%);">
Informasi pengajuan layanan pada Biro Pemerintahan dan Otonomi Daerah Sultra dapat dilakukan melalui Fitur Layanan yang terdapat pada Tab kolom layanan di atas. <br/> <br/>
Jika Status layanan berlangsung Online, Layanan bisa langsung di ajukan secara Online 
dengan melihat informasi sehubungan dengan informasi yang akan diajukan pada kolom tab layanan tersebut. Jika layanan berstatus offline Anda bisa langsung datang ke Kantor Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara untuk menerima informasi tentang layanan.
<br/><br/>  <b>Verifikasi Layanan:</b> <br/>
			<b>Senin - Kamis</b> (Pukul 08.00 - 15.00) <br/>
			<b>Jumat</b> (Pukul 08.00 - 12.00)	<br/>		
			</p> <br/> <br/>
			
			<h2 class="text-2xl font-bold mb-2" style="box-shadow: #c3ddfd 15px -20px;">Kotak Saran, Info & Pengaduan</h2>
			<p style="padding:10px;background:white;">
			<b>Email:</b> hotline@gmail.com <br/><br/>
			
		    <b>HotLine:</b> +62000000 <br/><br/>
			<b>Alamat:</b> <br/>
			<b>Biro Pemerintahan dan Otonomi Daerah Sultra</b><br/>
			Kompleks Bumi Praja Anduonohu, <br/>Kecamatan Poasia, <br/>Kota Kendari, Sulawesi Tenggara 93231 <br/>
			</p>
		 </div>             
	 </div>
  </section>
    <br/> <br/>
  <!--  End Section Proses Alur Layanan -->  

<!--  Map Modal -->  
  <Modal title="Map Kabupaten Bombana" bind:open={ModalmapBombana} autoclose>
	<img src={mapBombana} alt="Logo" style="width:100%;height:300px;" />
	Gambar: Map Kabupaten Bombana (Source: <a href="https://www.google.com/maps/place/Sulawesi+Tenggara/@-4.4942734,121.4209727,8z/data=!3m1!4b1!4m6!3m5!1s0x2d98ecde0b6b7183:0x621d7c439f04a4ed!8m2!3d-4.14491!4d122.174605!16zL20vMDJiZGox?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Bombana</a>)
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Kabupaten Bombana terletak di jazirah tenggara Pulau Sulawesi, secara geografis terletak di bagian selatan garis khatulistiwa, memanjang dari utara ke selatan di antara antara 4°30' – 6°25' Lintang Selatan dan membentang dari barat ke timur antara 120°82' – 122°20' Bujur Timur.</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal title="Map Kabupaten Wakatobi" bind:open={ModalmapWakatobi} autoclose>
	<img src={mapWakatobi} alt="Logo" style="width:100%;height:300px;" />
	Gambar: Map Kabupaten Wakatobi (Source: <a href="https://www.google.com/maps/place/Kabupaten+Wakatobi/@-5.6700935,123.1344553,9z/data=!3m1!4b1!4m6!3m5!1s0x2da132c009d62f91:0x27e60d480afc1529!8m2!3d-5.6326806!4d123.8902463!16zL20vMGQyYndj?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Wakatobi</a>)
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Kabupaten Wakatobi berbentuk kepulauan dan terletak di tenggara Pulau Sulawesi. Secara astronomis, Kabupaten Wakatobi berada di selatan garis khatulistiwa, membujur dari 5,00º sampai 6,25º Lintang Selatan (sepanjang ± 160 km) dan melintang dari 123,34º sampai 124.64º Bujur Timur (sepanjang ± 120 km).</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal title="Map Kota Kendari" bind:open={ModalmapKendari} autoclose>
	<img src={mapKendari} alt="map kendari" style="width:100%;height:300px;" />
	Gambar: Map Kota Kendari (Source: <a href="https://www.google.com/maps/place/Kendari,+Kota+Kendari,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2d98ecde0b6b7183:0x1397347f9e562fc7?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Kendari</a>)
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Kota Kendari terletak di jazirah Tenggara Pulau Sulawesi. Wilayah daratannya sebagian besar terdapat di daratan, mengelilingi Teluk Kendari dan terdapat satu pulau, yaitu Pulau Bungkutoko, secara geografis terletak di bagian selatan garis khatulistiwa, berada di antara 3º54’30” - 4º3’11” Lintang Selatan dan 122º23’ - 122º39’ Bujur Timur.</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal title="Map Kabupaten Konawe" bind:open={ModalmapKonawe} autoclose>
	<img src={mapKonawe} alt="map konawe" style="width:100%;height:300px;" />
	Gambar: Map Kabupaten Konawe (Source: <a href="https://www.google.com/maps/place/Kabupaten+Konawe,+Sulawesi+Tenggara/@-3.4664963,121.4289399,9.26z/data=!4m6!3m5!1s0x2d99b7c9063c2883:0x3030bfbcaf771b0!8m2!3d-3.9380432!4d122.0837445!16s%2Fm%2F0g56mg6?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Konawe</a>)
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Kabupaten Konawe ibu kotanya adalah Unaaha yang berjarak sekitar 73 km dari Kota Kendari, secara geografis terletak dibagian selatan Katulistiwa, memanjang dari utara ke selatan di antara antara 3°00' – 4°25' Lintang Selatan dan membentang dari barat ke timur antara 121°73' – 123°15' Bujur Timur dengan batas wilayah.</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
  <Modal title="Map Kabupaten Konawe Utara" bind:open={ModalmapKonaweUtara} autoclose>
	<img src={mapKonaweUtara} alt="map konawe" style="width:100%;height:300px;" />
	Gambar: Map Kabupaten Konawe utara (Source: <a href="https://www.google.com/maps/place/Kabupaten+Konawe+Utara,+Sulawesi+Tenggara/@-3.4163503,119.8010381,8z/data=!3m1!4b1!4m6!3m5!1s0x2d999f1690a5fca9:0xdd75d90ad4943502!8m2!3d-3.3803291!4d122.0837445!16s%2Fm%2F0gh63gk?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Konawe Utara</a>)
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Secara geografis, Kabupaten Konawe Utara terletak pada 2°97' - 3°86' Lintang Selatan dan 121°49' - 112°49' Bujur Timur. Topografi wilayahnya mulai dari kepulauan, pesisir, dataran rendah, hingga pegunungan dengan ketinggian wilayah antara 0-2.400 meter di atas permukaan air laut (mdpl). Termasuk beberapa pulau di Laut Banda diantaranya yaitu Pulau Labengki Besar, Pulau Labengki Kecil, Pulau Bawulu, Pulau Manui, dan lain-lain. Kabupaten Konawe Utara memiliki 24 daerah aliran sungai (DAS) dan sungai terbesarnya adalah Sungai Lasolo. Gunung tertingginya adalah Gunung Osu Nondoto (2.421 mdpl).</p>
	<svelte:fragment slot="footer">
	  <Button color="alternative">Tutup</Button>
	</svelte:fragment>
  </Modal>
<!--  End Map Modal -->  

  <!--  Section Informasi Otonomi -->  
 <section>
	<Heading id="InfoTabelGrafik" tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">INFORMASI PEMERINTAHAN OTONOMI SULAWESI TENGGARA</Span></Heading>
	<br/>
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
				<td>Kabupaten Bombana <Button id="popbombana" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button> 
					<Popover triggeredBy="#popbombana" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
						<div class="p-3">
						  <center>
							<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Lambang_Kabupaten_Bombana.png" alt="Jese Leos" width="90px" height="90px" />
						 </center>
						 <p class="mt-3">
							<b>Kabupaten Bombana</b><br/>
							Ibukota : Rumbia <br/>
							Kecamatan : 22<br/>
							Kelurahan/Desa : 22/121	<br/>
						 </p>
						</div>
					  </Popover>	
				</td>
				<td style="white-space: break-spaces;">3.316,16 km2 / 150.706 </td>
				 <td> 
					<span on:click={()=>visibleBombana = !visibleBombana} bind:this={closeBombana} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
						&#8285; 
					</span>
					<!-- menu -->
					{#if visibleBombana}
					<div id="menuDropdown" class="dropdown-content">
					  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapBombana = true)}>Lihat Map</a> 
					  <a href="https://bombanakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
					</div>
					{/if}
				  </td>
				</tr>
				
				<tr>
					<td>Kabupaten Wakatobi <Button id="popwakatobi" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popwakatobi" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/id/0/0d/Logo_Kabupaten_Wakatobi_Sulawesi_Tenggara.png" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>Kabupaten Wakatobi</b><br/>
								Ibukota : Wangi-wangi <br/>
								Kecamatan : 08<br/>
								Kelurahan/Desa : 26/75	<br/>
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;">473,62 km2 / 111.402 </td>
					 <td> 
						<span on:click={()=>visibleWakatobi  = !visibleWakatobi} bind:this={closeWakatobi} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleWakatobi}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapWakatobi = true)}>Lihat Map</a> 
						  <a href="#" rel="nofollow noopener" target="_blank">Ke Situs</a>
						</div>
						{/if}
					 </td>
				</tr>
				<tr>
					<td>Kota Kendari <Button id="popkendari" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkendari" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Lambang_Kota_Kendari.png" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>Kota Kendari</b><br/>
								Ibukota :  <br/>
								Kecamatan : 10<br/>
								Kelurahan/Desa : 64/-<br/>	
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;">271,80 km2 / 347.381 </td>
					 <td> 
						<span on:click={()=>visibleKendari  = !visibleKendari} bind:this={closeKendari} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKendari}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKendari = true)}>Lihat Map</a> 
						  <a href="https://kendarikota.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
						</div>
						{/if}
					 </td>
				</tr>
			   
				<tr>
					<td>Kabupaten Konawe <Button id="popkonawe" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkonawe" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Lambang_Kabupaten_Konawe.png" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>Kabupaten Konawe</b><br/>
								Ibukota : Kota Unaaha <br/>
								Kecamatan : 27<br/>
								Kelurahan/Desa : 57/297	<br/>
							 </p>
							</div>
						  </Popover>
					</td>
					<td style="white-space: break-spaces;">6.087,68 km2 / 266.299 </td>
					 <td> 
						<span on:click={()=>visibleKonawe  = !visibleKonawe} bind:this={closeKonawe} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKonawe}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKonawe = true)}>Lihat Map</a> 
						  <a href="https://www.konawekab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
						</div>
						{/if}
					 </td>
				</tr>

				<tr>
					<td>Kabupaten Konawe Utara <Button id="popkonaweutara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
						<Popover triggeredBy="#popkonaweutara" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
							<div class="p-3">
							  <center>
								<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_konawe_utara.jpg" alt="Jese Leos" width="90px" height="90px" />
							 </center>
							 <p class="mt-3">
								<b>Kabupaten Konawe Utara</b><br/>
								Ibukota : Wanggudu <br/>
								Kecamatan : 13<br/>
								Kelurahan/Desa : 11/159
							 </p>
							</div>
						  </Popover>
					</td>
					<td>5.101,76 km2 / 62.403 </td>
					 <td> 
						<span on:click={()=>visibleKonaweUtara  = !visibleKonaweUtara} bind:this={closeKonaweUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgba(129, 129, 137, 0.44);"> 
							&#8285; 
						</span>
						<!-- menu -->
						{#if visibleKonaweUtara}
						<div id="menuDropdown" class="dropdown-content">
						  <a href="/#InfoTabelGrafik" on:click={() => (ModalmapKonaweUtara = true)}>Lihat Map</a> 
						  <a href="http://konaweutarakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
						</div>
						{/if}
					 </td>
				</tr>
		
			</tbody>
		</table>
		</div>
		<div class="p-1">
			<Card class="w-full max-w-lg">
				<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 ">
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
	
				<Chart {options} />
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
                            <img src="https://miro.medium.com/fit/c/256/256/1*7oNrN58deYJ7G2k8P5iljQ.jpeg" class="card-img-top" />
                        </div>
                        <div class="staff_name_container">
							Muliadi, S.ST
                        </div>
                    </div>
                </div>
                <ol id="first">
                   
                    <li>
                        <div style="width:260px !important;padding:6px;"> 
							<img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" style="width:60px;height:60px;border-radius:50%;" />
						
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
                                    <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="card-img-top" />
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
                                    <img src="https://miro.medium.com/fit/c/256/256/1*7oNrN58deYJ7G2k8P5iljQ.jpeg" class="card-img-top" />
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
                                    <img src="https://miro.medium.com/fit/c/256/256/1*7oNrN58deYJ7G2k8P5iljQ.jpeg" class="card-img-top" />
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
 <section> 
	<h3 class="justify-start font-semibold text-3xl mb-4">Quote Hari ini:</h3>
<div class="textquote grid grid-cols-4" style="width: 100%;height: 330px;background-color: aliceblue;margin: 0;border-radius: 15px;padding:20px;padding-top:40px;box-shadow: 15px 20px darkslategray;box-sizing: border-box;">
	<div class="rounded-xl pr-2">
	  <Avatar src="https://miro.medium.com/v2/resize:fill:256:256/1*7oNrN58deYJ7G2k8P5iljQ.jpeg" size="xl" /><br/>
	  <div style="font-family:Libre Franklin, sans-serif;font-weight: 300;vertical-align: middle;margin-top: 10px;display: inline-block;padding-left: 20px;font-size: 18px;color: darkslategray;"><span>Muliadi, S.ST</span></div>
	</div>
	<div class="col-span-3 rounded-xl">
	<span style="font-family: Libre Franklin, sans-serif;font-size: 200px;color: darkslategray;font-weight: 900;display: block;height: 80px;line-height: 105px;">“</span>
	 <p style="font-family:Libre Franklin, sans-serif;font-weight: 100;font-size: 26px;line-height: 1.4;color: darkslategray;">SiPapaOde dibuat agar agar pelayanan Pemerintahan terutama Biro Pemerintahan & Otonomi Daerah Sultra bisa terintegrasi dan lebih cepat.</p>
<hr style=" border: 0.5px solid slategray;" /> <br/>
<span style="font-weight: 100; font-size: 14px;">Kepala Biro Pemerintahan & Otonomi Daerah</span>
	</div>             
</div>
</section>
  <br/> <br/>
  <!--  End Section Quote -->  

 <!--  Section Portal Lainnya -->  
 <section> 
	<br/> <br/>
	<Heading tag="h3" class="mb-5 text-center" customSize="text-3xl font-extrabold  md:text-3xl lg:text-4xl"><Span decorationClass="decoration-8 decoration-blue-400 dark:decoration-blue-600" style="border-bottom: 8px solid rgb(195, 221, 253);">SINERGI PORTAL INFORMASI LAINNYA</Span></Heading> <br/>
  <p>Dibawah adalah Daftar Situs yang bisa Anda kunjungi sehubungan dengan Informasi Pemerintahan</p> <br/>
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
	  <span slot="header">Apa itu Sipapaode - Biro Pemerintahan</span>
	  <p class="mb-2 text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...</p>
	</AccordionItem>
	<AccordionItem class="font-semibold text-lg">
	  <span slot="header">Bagaimana Pengajuan Proses Fasilitas Kerjasama Antar Pemerintah Dalam dan Luar Negeri atau Badan Usaha / Swasta.</span>
	  <p class="mb-2 text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...</p>
	</AccordionItem>
	<AccordionItem class="font-semibold text-lg">
		<span slot="header">Bagaimana Pengajuan Proses Fasilitas Kerjasama Antar Pemerintah Dalam dan Luar Negeri atau Badan Usaha / Swasta.</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...</p>
	  </AccordionItem>
	  <AccordionItem class="font-semibold text-lg">
		<span slot="header">Bagaimana Pengajuan Proses Fasilitas Kerjasama Antar Pemerintah Dalam dan Luar Negeri atau Badan Usaha / Swasta.</span>
		<p class="mb-2 text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint explicabo ...</p>
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

</style>
