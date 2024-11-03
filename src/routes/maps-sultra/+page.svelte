<script>
import { Heading, Tooltip, Popover, Button, Avatar, Chart, Card, Modal } from 'flowbite-svelte';
import { InfoCircleOutline, UsersGroupOutline, ArrowUpOutline, ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
import { tooltip } from './toolTipicon.js';
import mapSultrapng from '$lib/images/Map-sultra.webp';
import ImagelogoSultra from '$lib/images/Sultra-Logo.webp';
import mapBombana from '$lib/images/Bombana-Map.webp';
import mapButon from '$lib/images/Buton-Map.webp';
import mapButonUtara from '$lib/images/Buton-Utara-Map.webp';

let ModalmapBombana, ModalmapButon, ModalmapButonUtara = false;


 let visibleBombana = false;
 let visibleButon = false;
 let visibleButonSelatan = false;
 let visibleButonTengah = false;
 let visibleButonUtara = false;
 let visibleKolaka = false;
 let visibleKolakaTimur = false;
 let visibleKolakaUtara = false;
 let visibleKonawe = false;
 let visibleKonaweKepulauan = false;
 let visibleKonaweSelatan = false;
 let visibleKonaweUtara = false;
 let visibleMuna = false;
 let visibleMunaBarat = false;
 let visibleWakatobi = false;
 let visibleBaubau = false;
 let visibleKendari = false;
 let closeBombana, closeButon, closeButonSelatan, closeButonTengah, closeButonUtara, closeKolaka, closeKolakaTimur, 
     closeKolakaUtara, closeKonawe, closeKonaweKepulauan, closeKonaweSelatan, closeKonaweUtara, closeMuna,
	 closeMunaBarat, closeWakatobi, closeBaubau, closeKendari;


function toogleKolaka() {
	visibleKolaka  = !visibleKolaka
    }

function onWindowClick(e) {
        if (closeBombana.contains(e.target) == false)
		visibleBombana = false;
		if (closeButon.contains(e.target) == false)
		visibleButon = false;
		if (closeButonSelatan.contains(e.target) == false)
		visibleButonSelatan = false;
		if (closeButonTengah.contains(e.target) == false)
		visibleButonTengah = false;
		if (closeButonUtara.contains(e.target) == false)
		visibleButonUtara = false;
	    if (closeKolaka.contains(e.target) == false)
		visibleKolaka = false;
		if (closeKolakaTimur.contains(e.target) == false)
		visibleKolakaTimur = false;
	    if (closeKolakaUtara.contains(e.target) == false)
		visibleKolakaUtara = false;
		if (closeKonawe.contains(e.target) == false)
		visibleKonawe = false;
		if (closeKonaweKepulauan.contains(e.target) == false)
		visibleKonaweKepulauan = false;
		if (closeKonaweSelatan.contains(e.target) == false)
		visibleKonaweSelatan = false;
		if (closeKonaweUtara.contains(e.target) == false)
		visibleKonaweUtara = false;
		if (closeMuna.contains(e.target) == false)
		visibleMuna = false;
		if (closeMunaBarat.contains(e.target) == false)
		visibleMunaBarat = false;
		if (closeWakatobi.contains(e.target) == false)
		visibleWakatobi = false;
		if (closeBaubau.contains(e.target) == false)
		visibleBaubau = false;
		if (closeKendari.contains(e.target) == false)
		visibleKendari = false;
    }

/** Chart **/
	const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: 'Luas Wilayah',
        color: '#1A56DB',
        data: [
          { x: 'Kabupaten Bombana', y: 231 },
          { x: 'Kabupaten Buton', y: 122 },
          { x: 'Kabupaten Buton Selatan', y: 63 },
          { x: 'Kabupaten Buton Tengah', y: 421 },
          { x: 'Kabupaten Buton Utara', y: 122 },
          { x: 'Kabupaten Kolaka', y: 323 },
          { x: 'Kabupaten Kolaka Timur', y: 111 },
		  { x: 'Kabupaten Kolaka Utara', y: 111 },
		  { x: 'Kabupaten Konawe', y: 111 },
		  { x: 'Kabupaten Konawe Kepulauan', y: 111 },
		  { x: 'Kabupaten Konawe Selatan', y: 111 },
		  { x: 'Kabupaten Konawe Utara', y: 111 },
		  { x: 'Kabupaten Muna', y: 111 },
		  { x: 'Kabupaten Muna Barat', y: 111 },
		  { x: 'Kabupaten Wakatobi', y: 111 },
		  { x: 'Kota Baubau', y: 111 },
		  { x: 'Kota Kendari', y: 111 }
        ]
      },
      {
        name: 'Jumlah Penduduk',
        color: '#FDBA8C',
        data: [
			{ x: 'Kabupaten Bombana', y: 231 },
          { x: 'Kabupaten Buton', y: 142 },
          { x: 'Kabupaten Buton Selatan', y: 633 },
          { x: 'Kabupaten Buton Tengah', y: 421 },
          { x: 'Kabupaten Buton Utara', y: 122 },
          { x: 'Kabupaten Kolaka', y: 323 },
          { x: 'Kabupaten Kolaka Timur', y: 111 },
		  { x: 'Kabupaten Kolaka Utara', y: 111 },
		  { x: 'Kabupaten Konawe', y: 111 },
		  { x: 'Kabupaten Konawe Kepulauan', y: 111 },
		  { x: 'Kabupaten Konawe Selatan', y: 111 },
		  { x: 'Kabupaten Konawe Utara', y: 511 },
		  { x: 'Kabupaten Muna', y: 111 },
		  { x: 'Kabupaten Muna Barat', y: 111 },
		  { x: 'Kabupaten Wakatobi', y: 111 },
		  { x: 'Kota Baubau', y: 111 },
		  { x: 'Kota Kendari', y: 111 }
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
  /** End Chart **/

</script>

<svelte:window on:click={onWindowClick} />

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>


<br/><br/><br/>


<div class="container mt-14">
	<Heading tag="h3" class="mb-4" customSize="text-3xl text-center font-extrabold  md:text-3xl lg:text-4xl">Peta & Informasi Pemerintahan Otonomi Sulawesi Tenggara</Heading>
	<br/>
	<Heading tag="h4" class="mb-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Lanskap Geografis Sulawesi Tenggara</Heading>
	
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🗺️ Luas Wilayah (km2)</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
			 <button id="infoLW"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			</div>
			<Popover triggeredBy="#infoLW" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
			  <div class="p-3 space-y-2" style="z-index:100;">
				Informasi Luas Wilayah di Sulawesi Tenggara secara keseluruhan 
			  </div>
			</Popover>	
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🧑🏽‍🤝‍🧑🏽 Jumlah Penduduk</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoJP"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoJP" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Penduduk di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>	
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🌆 Kabupaten</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoJK"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoJK" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Kabupaten di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>	
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🏙️ Kota</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoKota"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoKota" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Kota di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🏘️ Kecamatan</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoKecamatan"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoKecamatan" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Kecamatan di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🏡 Kelurahan / Desa</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoKD"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoKD" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Kecamatan / Desa di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🏞️ Gunung</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoGunung"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoGunung" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Gunung di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🏝️ Pulau</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoPulau"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoPulau" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Pulau di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🌳 Hutan</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoHutan"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoHutan" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Hutan di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight">111.222</p></Card>
		</div>
	</div>
	<br/><br/>
	<Heading tag="h4" class="mb-4 mt-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Maps Sulawesi Tenggara</Heading>
	<img src={mapSultrapng} alt="Logo" style="width:100%;height:100%;border-radius: 16px;padding: 4px;border: 1px solid #cfcfd8;" />
    Gambar: Map Sultra (Source: <a href="https://www.google.com/maps/place/Sulawesi+Tenggara/@-4.4942734,121.4209727,8z/data=!3m1!4b1!4m6!3m5!1s0x2d98ecde0b6b7183:0x621d7c439f04a4ed!8m2!3d-4.14491!4d122.174605!16zL20vMDJiZGox?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Sultra</a>)
	<br/><br/>
	<Heading id="TabelOtonomi" tag="h4" class="mb-4 mt-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Tabel Kabupaten/Kota Sulawesi Tenggara</Heading>
	<p class="pb-3">
		Dibawah berikut ini adalah Peta Wilayah dan Informasi Pemerintahan di Wilayah Sulawesi Tenggara terdiri dari Kota dan Kabupaten. 
	</p>

	  <Modal title="Map Kabupaten Bombana" bind:open={ModalmapBombana} autoclose>
		<img src={mapBombana} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Bombana (Source: <a href="https://www.google.com/maps/place/Sulawesi+Tenggara/@-4.4942734,121.4209727,8z/data=!3m1!4b1!4m6!3m5!1s0x2d98ecde0b6b7183:0x621d7c439f04a4ed!8m2!3d-4.14491!4d122.174605!16zL20vMDJiZGox?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Bombana</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Kabupaten Bombana terletak di jazirah tenggara Pulau Sulawesi, secara geografis terletak di bagian selatan garis khatulistiwa, memanjang dari utara ke selatan di antara antara 4°30' – 6°25' Lintang Selatan dan membentang dari barat ke timur antara 120°82' – 122°20' Bujur Timur.</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	   <Modal title="Map Kabupaten Buton" bind:open={ModalmapButon} autoclose>
		<img src={mapButon} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Buton (Source: <a href="https://www.google.com/maps/place/Kabupaten+Buton,+Sulawesi+Tenggara/@-5.3224,123.6794745,9z/data=!4m6!3m5!1s0x2da3f5668552c07b:0x3030bfbcaf77180!8m2!3d-5.3096355!4d122.9888319!16s%2Fg%2F11b5v3q35f?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Buton</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Buton memiliki wilayah daratan seluas ± 2.488,71 km² atau 248.871 ha dan wilayah perairan laut diperkirakan seluas ± 21.054 km², berbatasan dengan:<br/>
		    <b>Utara:</b> Kabupaten Buton Utara <br/><b>Timur:</b> Kabupaten Wakatobi<br/><b>Selatan:</b> Laut Flores Kabupaten Buton Selatan<br/><b>Barat:</b> Kota Baubau
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Buton Utara" bind:open={ModalmapButonUtara} autoclose>
		<img src={mapButonUtara} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Buton Utara (Source: <a href="https://www.google.com/maps/place/Kabupaten+Buton+Utara,+Sulawesi+Tenggara/@-4.7572686,122.3967805,10z/data=!3m1!4b1!4m6!3m5!1s0x2da22bb84440a04f:0xd228ff15314dd9b8!8m2!3d-4.7023424!4d123.0338767!16s%2Fm%2F0gh602c?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Buton Utara</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Kabupaten Buton Utara dengan luas wilayah 1.923,03 km² (belum termasuk wilayah perairan), terletak di jazirah Sulawesi Tenggara meliputi bagian Utara Pulau Buton dan gugusan pulau-pulau di sekitarnya; secara administratif terdiri dari 6 kecamatan dan 59 desa/kelurahan/UPT. Ditinjau dari letak geografisnya Kabupaten Buton Utara terletak pada 4,6 LS – 5,15 LS serta membujur dari Barat ke Timur antara 122,59 BT – 123,15 BT.</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>

	<table id="MapArea" class="table-striped" style="width:100%;display: block;background-color: white;padding: 7px;border-radius: 8px;">
        <thead style="background:#ecf4fb;text-align: left;">
        <tr>
        <th style="width:18%;">Nama</th>
        <th style="width:14%;white-space: break-spaces;">Luas Wilayah <span use:tooltip={"Luas Wilayah"}></span> </th>
        <th style="width:14%;white-space: break-spaces;" class="hidekolom">J. Penduduk <span use:tooltip={"Jumlah Penduduk saat ini yang di Update"}></span></th>
		<th style="width:10%;white-space: break-spaces;" class="hidekolom">J. Gunung <span use:tooltip={"Jumlah Gunung saat ini yang di Update"}></span></th>
		<th style="width:10%;white-space: break-spaces;" class="hidekolom">J. Pulau <span use:tooltip={"Jumlah Pulau saat ini yang di Update"}></span></th>
		<th style="width:10%;white-space: break-spaces;" class="hidekolom">J. Hutan <span use:tooltip={"Jumlah Hutan saat ini yang di Update"}></span></th>
		<th style="width:14%;white-space:break-spaces;" class="hidekolom">Koordinat <span use:tooltip={"Koordinat Map"}></span></th>
        <th style="width:10%;">Detail</th>
        </tr>
        </thead>
        <tbody>  
        <tr>
        <td>Kabupaten Bombana <Button id="popbombana" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button> 
			<Popover triggeredBy="#popbombana" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
				<div class="p-3">
				  <center>
					<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Lambang_Kabupaten_Bombana.png" alt="Bombana" width="90px" height="90px" />
				 </center>
				 <p class="mt-3">
					<b>Kabupaten Bombana</b><br/>
					Ibukota : Rumbia <br/>
					Kecamatan : 22<br/>
					Kelurahan/Desa : 22/121	
				 </p>
				</div>
			  </Popover>	
		</td>
        <td>2.958,69 km2 </td>
        <td class="hidekolom">243.842  </td>
		<td class="hidekolom">12  </td>
		<td class="hidekolom">4  </td>
		<td class="hidekolom">--  </td>
         <td class="hidekolom">4°S 121.6°E </td>
		 <td> 
			<span on:click={()=> visibleBombana = !visibleBombana} bind:this={closeBombana} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
				&#8285; 
			</span>
			<!-- menu -->
		    {#if visibleBombana}
			<div id="menuDropdown" class="dropdown-content">
			  <a href="#" on:click={() => (ModalmapBombana = true)}>Lihat Map</a> 
			  <a href="https://bombanakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
			</div>
		    {/if}
		  </td>
        </tr>
        <tr>
        <td>Kabupaten Buton <Button id="popbuton" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
			<Popover triggeredBy="#popbuton" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
				<div class="p-3">
				  <center>
					<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Kabupaten_Buton.png" alt="Buton" width="90px" height="90px" />
				 </center>
				 <p class="mt-3">
					<b>Kabupaten Buton</b><br/>
					Ibukota : Pasarwajo <br/>
					Kecamatan : 7 <br/>
					Kelurahan/Desa : 12/83	
				 </p>
				</div>
			  </Popover>
		</td>
        <td>2.958,69 km2 </td>
        <td class="hidekolom">243.842  </td>
		<td class="hidekolom">12  </td>
		<td class="hidekolom">4  </td>
		<td class="hidekolom">--  </td>
         <td class="hidekolom">4°S 121.6°E </td>
         <td> 
			<span on:click={()=> visibleButon  = !visibleButon} bind:this={closeButon} class="KBW2024" style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
				&#8285; 
			</span>
			<!-- menu -->
		    {#if visibleButon}
			<div id="menuDropdown" class="dropdown-content">
			  <a href="#" on:click={() => (ModalmapButon = true)}>Lihat Map</a> 
			  <a href="https://butonkab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
			</div>
		    {/if}
		 </td>
        </tr>
        
		<tr>
			<td>Kabupaten Buton Selatan <Button id="popbutonselatan" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbutonselatan" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/8/81/Lambang_Kabupaten_Buton_Selatan.png" alt="Buton Selatan" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Buton Selatan</b><br/>
						Ibukota : Batauga <br/>
						Kecamatan : 7<br/>
						Kelurahan/Desa : 10/60	
					 </p>
					</div>
				  </Popover>	
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		<td class="hidekolom">4  </td>
		<td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleButonSelatan  = !visibleButonSelatan} bind:this={closeButonSelatan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonSelatan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="http://butonselatankab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>
		<tr>
			<td>Kabupaten Buton Tengah <Button id="popbutontengah" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbutontengah" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Lambang_Kabupaten_Buton_Tengah.tif/lossless-page1-581px-Lambang_Kabupaten_Buton_Tengah.tif.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Buton Tengah</b><br/>
						Ibukota : Labungkari <br/>
						Kecamatan : 7<br/>
						Kelurahan/Desa : 10/67	
					 </p>
					</div>
				  </Popover>	
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		<td class="hidekolom">4  </td>
		<td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleButonTengah  = !visibleButonTengah} bind:this={closeButonTengah} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonTengah}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="#" on:click={() => (ModalmapButonUtara = true)}>Lihat Map</a> 
				  <a href="https://butontengahkab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Buton Utara <Button id="popbutonutara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbutonutara" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Lambang_Kabupaten_Buton_Utara.jpg" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Buton Utara</b><br/>
						Ibukota : Buranga <br/>
						Kecamatan : 6<br/>
						Kelurahan/Desa : 12/78	
					 </p>
					</div>
				  </Popover>	
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		<td class="hidekolom">4  </td>
		<td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleButonUtara  = !visibleButonUtara} bind:this={closeButonUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="#" on:click={() => (ModalmapButonUtara = true)}>Lihat Map</a> 
				  <a href="https://www.butonutarakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Kolaka <Button id="popkolaka" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkolaka" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Lambang_Kab_Kolaka.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Kolaka</b><br/>
						Ibukota : Kota Kolaka <br/>
						Kecamatan : 12<br/>
						Kelurahan/Desa : 35/100	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		<td class="hidekolom">4  </td>
		<td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={toogleKolaka} bind:this={closeKolaka} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolaka}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://kolakakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Kolaka Timur <Button id="popkolakatimur" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkolakatimur" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Lambang_Kabupaten_Kolaka_Timur.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Kolaka Timur</b><br/>
						Ibukota : Tirawuta <br/>
						Kecamatan : 13<br/>
						Kelurahan/Desa : 16/117	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		   <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleKolakaTimur  = !visibleKolakaTimur} bind:this={closeKolakaTimur} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolakaTimur}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://kolakatimurkab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Kolaka Utara <Button id="popkolakautara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkolakautara" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Lambang_Kabupaten_Kolaka_Utara.svg" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Kolaka Utara</b><br/>
						Ibukota : Lasusua <br/>
						Kecamatan : 15<br/>
						Kelurahan/Desa : 06/172	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		   <td class="hidekolom">4  </td>
	    	<td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleKolakaUtara = !visibleKolakaUtara} bind:this={closeKolakaUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolakaUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://kolutkab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
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
						Kelurahan/Desa : 57/297	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		 <td class="hidekolom">4  </td>
		  <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleKonawe  = !visibleKonawe} bind:this={closeKonawe} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonawe}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://www.konawekab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Konawe Kepulauan <Button id="popkonawekepulauan" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkonawekepulauan" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Lambang_Kabupaten_Konawe_Kepulauan.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Konawe Kepulauan</b><br/>
						Ibukota : Langara <br/>
						Kecamatan : 7<br/>
						Kelurahan/Desa : 07/89	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleKonaweKepulauan = !visibleKonaweKepulauan} bind:this={closeKonaweKepulauan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweKepulauan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://konkepkab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Konawe Selatan  <Button id="popkonaweselatan" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkonaweselatan" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/8/81/Lambang_Kabupaten_Buton_Selatan.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Konawe Selatan</b><br/>
						Ibukota : Andolo <br/>
						Kecamatan : 25<br/>
						Kelurahan/Desa : 15/336	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleKonaweSelatan = !visibleKonaweSelatan} bind:this={closeKonaweSelatan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweSelatan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://konkepkab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
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
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleKonaweUtara = !visibleKonaweUtara} bind:this={closeKonaweUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://konaweutarakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Muna <Button id="popkabupatenmuna" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkabupatenmuna" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/7/71/Lambang_Kabupaten_Muna_Revisi.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Muna</b><br/>
						Ibukota : Kota Raha <br/>
						Kecamatan : 22<br/>
						Kelurahan/Desa : 26/125
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleMuna = !visibleMuna} bind:this={closeMuna} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleMuna}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="#" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kabupaten Muna Barat <Button id="popkabupatenmunabarat" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkabupatenmunabarat" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Lambang_Kabupaten_Muna_Barat.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kabupaten Muna Barat</b><br/>
						Ibukota : Sawerigading <br/>
						Kecamatan : 11<br/>
						Kelurahan/Desa : 05/81	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleMunaBarat = !visibleMunaBarat} bind:this={closeMunaBarat} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleMunaBarat}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://munabarat.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
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
						Kelurahan/Desa : 26/75	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleWakatobi  = !visibleWakatobi} bind:this={closeWakatobi} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleWakatobi}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://www.wakatobikab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td>Kota Baubau <Button id="popbaubau" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbaubau" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Baubau.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kota Baubau</b><br/>
						Ibukota : Baubau <br/>
						Kecamatan : 8<br/>
						Kelurahan/Desa : 43/-	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleBaubau  = !visibleBaubau} bind:this={closeBaubau} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleBaubau}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NXYyZWw5M2FqMHJkcDI0NjBrYmJrNmx1ajQga2FuYWxjb2luY29tQG0&tmsrc=kanalcoincom%40gmail.com" rel="nofollow noopener" target="_blank">Ke Situs</a>
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
						Kelurahan/Desa : 64/-	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>2.958,69 km2 </td>
			<td class="hidekolom">243.842  </td>
			<td class="hidekolom">12  </td>
		    <td class="hidekolom">4  </td>
		    <td class="hidekolom">--  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={()=> visibleKendari  = !visibleKendari} bind:this={closeKendari} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKendari}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="https://tickets.koreablockchainweek.com/" target="_blank" rel="nofollow noopener">Lihat Map</a> 
				  <a href="https://www.kendarikota.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>
      
        </tbody>
        </table>

	<br/><br/>
	<Heading tag="h4" class="mb-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Grafik Kabupaten/Kota Sulawesi Tenggara</Heading>
	<Card class="w-full max-w-full">
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
	  <br/><br/>
     <div style="text-align:center;margin-bottom:15px;">***</div>
	 Update terakhir data di atas | tanggal: 31 October 2024 <br/><br/><br/>
   
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

:global(.tooltip) {
		white-space: break-spaces;
		position: relative;
		padding-top: 0.35rem;
		cursor: zoom-in;
		border-bottom: 1px solid currentColor;
	}
	
	:global(.tooltip::after) {
		margin: 0 0.15rem 0 0.25rem;
		content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-50 -50 100 100"%3E%3Cg fill="none" stroke="hsl(0, 0%25, 30%25)" stroke-linecap="round"%3E%3Cpath stroke-width="8" d="M -13 -13 m 0 -10 v 20 m 10 -10 h -20" /%3E%3Cg stroke-width="14"%3E%3Ccircle r="30" cx="-13" cy="-13" /%3E%3Cpath d="M 24 24 l 18 18" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
	}
	
	:global(#tooltip) {
		position: absolute;
		bottom: 100%;
		right: 0.78rem;
		transform: translate(50%, 0);
		padding: 0.22rem 0.38rem;
		background:  hsl(0, 0%, 20%);
		color:  hsl(0, 0%, 98%); 
		font-size: 0.75em;
		border-radius: 0.25rem;
		filter: drop-shadow(0 1px 2px hsla(0, 0%, 0%, 0.2));
		width: max-content;
		white-space: break-spaces;
	}
	
	:global(.tooltip:not(:focus) #tooltip::before) {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		width: 0.6em;
		height: 0.25em;
		background: inherit;
		clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
	}

	@media screen and (max-width:767px) {
		.hidekolom {
			display:none;
		}
	}

</style>

