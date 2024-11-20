<script>
import { Heading, Popover, Button, Avatar, Chart, Card, Modal, Tabs, TabItem } from 'flowbite-svelte';
import { InfoCircleOutline } from 'flowbite-svelte-icons';
import { tooltip } from './toolTipicon.js';
import mapSultrapng from '$lib/images/Map-sultra.webp';
import ImagelogoSultra from '$lib/images/Sultra-Logo.webp';
import mapBombana from '$lib/images/Bombana-Map.webp';
import mapButon from '$lib/images/Buton-Map.webp';
import mapButonUtara from '$lib/images/Buton-Utara-Map.webp';
import mapWakatobi from '$lib/images/Wakatobi-Map.webp';
import mapKolaka from '$lib/images/Kolaka-Map.webp';
import mapKolakaTimur from '$lib/images/Kolaka-Timur-Map.webp';
import mapKolakaUtara from '$lib/images/Kolaka-Utara-Map.webp';
import mapKonawe from '$lib/images/Konawe-Map.webp';
import mapKonaweKepulauan from '$lib/images/Konawe-Kepulauan-Map.webp';
import mapKonaweSelatan from '$lib/images/Konawe-Selatan-Map.webp';
import mapKonaweUtara from '$lib/images/Konawe-Utara-Map.webp';
import mapMuna from '$lib/images/Kabupaten-Muna-Map.webp';
import mapBaubau from '$lib/images/Kota-Baubau-Map.webp';
import mapKendari from '$lib/images/Kota-Kendari-Map.webp';

let ModalmapBombana, ModalmapButon, ModalmapButonSelatan, ModalmapButonTengah, ModalmapButonUtara, ModalmapKolaka, ModalmapKonawe, ModalmapKonaweUtara, ModalmapKolakaTimur, ModalmapWakatobi  = false;
let ModalmapKolakaUtara, ModalmapKonaweKepulauan, ModalmapKonaweSelatan, ModalmapMuna, ModalmapMunaBarat, ModalmapKendari, ModalmapBaubau  = false;

let visibleBombana, visibleButon, visibleButonSelatan, visibleButonTengah, visibleButonUtara = false;
let visibleKolaka, visibleKolakaTimur, visibleKolakaUtara, visibleKonawe, visibleKonaweKepulauan, visibleKonaweSelatan, visibleKonaweUtara = false;
let visibleMuna, visibleMunaBarat, visibleWakatobi, visibleBaubau, visibleKendari = false;

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
          { x: 'Kabupaten Bombana', y: 3316.16 },
          { x: 'Kabupaten Buton', y: 1648.04 },
          { x: 'Kabupaten Buton Selatan', y: 510 },
          { x: 'Kabupaten Buton Tengah', y: 958 },
          { x: 'Kabupaten Buton Utara', y: 1923.03 },
          { x: 'Kabupaten Kolaka', y: 2958.69 },
          { x: 'Kabupaten Kolaka Timur', y: 3992.53 },
		  { x: 'Kabupaten Kolaka Utara', y: 3392 },
		  { x: 'Kabupaten Konawe', y: 6087.68 },
		  { x: 'Kabupaten Konawe Kepulauan', y: 867.58 },
		  { x: 'Kabupaten Konawe Selatan', y: 4237.74 },
		  { x: 'Kabupaten Konawe Utara', y: 5101.76 },
		  { x: 'Kabupaten Muna', y: 2057.69 },
		  { x: 'Kabupaten Muna Barat', y: 1022.89 },
		  { x: 'Kabupaten Wakatobi', y: 473.62 },
		  { x: 'Kota Baubau', y: 295.07 },
		  { x: 'Kota Kendari', y: 271.8 }
        ]
      },
      {
        name: 'Jumlah Penduduk',
        color: '#FDBA8C',
        data: [
			{ x: 'Kabupaten Bombana', y: 150706 },
          { x: 'Kabupaten Buton', y: 119353 },
          { x: 'Kabupaten Buton Selatan', y: 99173 },
          { x: 'Kabupaten Buton Tengah', y: 118907 },
          { x: 'Kabupaten Buton Utara', y: 68553 },
          { x: 'Kabupaten Kolaka', y: 243842 },
          { x: 'Kabupaten Kolaka Timur', y: 125311 },
		  { x: 'Kabupaten Kolaka Utara', y: 139319 },
		  { x: 'Kabupaten Konawe', y: 266299 },
		  { x: 'Kabupaten Konawe Kepulauan', y: 38849 },
		  { x: 'Kabupaten Konawe Selatan', y: 317826 },
		  { x: 'Kabupaten Konawe Utara', y: 62403 },
		  { x: 'Kabupaten Muna', y: 223991 },
		  { x: 'Kabupaten Muna Barat', y: 84182 },
		  { x: 'Kabupaten Wakatobi', y: 111402 },
		  { x: 'Kota Baubau', y: 162377 },
		  { x: 'Kota Kendari', y: 400665 }
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">38.140</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">2,744 juta</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">15</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">2</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">219</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">377 / 1.915</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">Tidak Spesifik</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">111.222</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">111.222</p></Card>
		</div>
	</div>
	<br/><br/>
	<Heading tag="h4" class="mb-4 mt-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Maps Sulawesi Tenggara</Heading>
	<Tabs>
		<TabItem open title="Maps Sultra">
		 <div style="width: 100%"><iframe width="100%" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=provinsi%20sulawesi%20tenggara+(My%20Business%20Name)&amp;t=&amp;z=8&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps trackers</a></iframe></div>
		</TabItem>
		<TabItem title="Screenshot">
			<img src={mapSultrapng} alt="Logo" style="width:100%;height:100%;border-radius: 16px;padding: 4px;border: 1px solid #cfcfd8;" />
			Gambar: Map Sultra (Source: <a href="https://www.google.com/maps/place/Sulawesi+Tenggara/@-4.4942734,121.4209727,8z/data=!3m1!4b1!4m6!3m5!1s0x2d98ecde0b6b7183:0x621d7c439f04a4ed!8m2!3d-4.14491!4d122.174605!16zL20vMDJiZGox?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Sultra</a>)
			
		</TabItem>
	  </Tabs>
	 <br/><br/>
	<Heading id="TabelOtonomi" tag="h4" class="mb-4 mt-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Tabel Kabupaten/Kota Sulawesi Tenggara</Heading>
	<p class="pb-3">
		Dibawah berikut ini adalah Peta Wilayah dan Informasi Pemerintahan di Wilayah Sulawesi Tenggara terdiri dari Kota dan Kabupaten. 
	</p>

	  <Modal title="Map Kabupaten Bombana" bind:open={ModalmapBombana} autoclose>
        <div style="width: 100%"><iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=kabupaten%20bombana+(My%20Business%20Name)&amp;t=&amp;z=9&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe></div>
		
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Kabupaten Bombana terletak di jazirah tenggara Pulau Sulawesi, secara geografis terletak di bagian selatan garis khatulistiwa, memanjang dari utara ke selatan di antara antara 4°30' – 6°25' Lintang Selatan dan membentang dari barat ke timur antara 120°82' – 122°20' Bujur Timur.</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	   <Modal title="Map Kabupaten Buton" bind:open={ModalmapButon} autoclose>
		<div style="width: 100%"><iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=kabupaten%20buton+(My%20Business%20Name)&amp;t=&amp;z=9&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe></div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Buton memiliki wilayah daratan seluas ± 2.488,71 km² atau 248.871 ha dan wilayah perairan laut diperkirakan seluas ± 21.054 km², berbatasan dengan:<br/>
		    <b>Utara:</b> Kabupaten Buton Utara <br/><b>Timur:</b> Kabupaten Wakatobi<br/><b>Selatan:</b> Laut Flores Kabupaten Buton Selatan<br/><b>Barat:</b> Kota Baubau
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Buton Selatan" bind:open={ModalmapButonSelatan} autoclose>
		<img src={mapButon} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Buton Selatan (Source: <a href="https://www.google.com/maps/place/Kabupaten+Buton,+Sulawesi+Tenggara/@-5.3224,123.6794745,9z/data=!4m6!3m5!1s0x2da3f5668552c07b:0x3030bfbcaf77180!8m2!3d-5.3096355!4d122.9888319!16s%2Fg%2F11b5v3q35f?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Buton</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Buton Selatan sebagian besar wilayahnya terletak di Pulau Buton yang merupakan pulau terbesar di luar pulau induk Kepulauan Sulawesi, serta pulau ke-130 terbesar di dunia. Kabupaten Buton Selatan, berbatasan dengan wilayah berikut:<br/>
		    <b>Utara:</b> Kota Baubau dan Kabupaten Buton <br/><b>Timur:</b> Kabupaten Buton dan Laut Flores<br/><b>Selatan:</b> Laut Flores dan Provinsi Nusa Tenggara Timur<br/><b>Barat:</b> Laut Flores
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Buton Tengah" bind:open={ModalmapButonTengah} autoclose>
		<img src={mapButon} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Buton Tengah (Source: <a href="https://www.google.com/maps/place/Kabupaten+Buton,+Sulawesi+Tenggara/@-5.3224,123.6794745,9z/data=!4m6!3m5!1s0x2da3f5668552c07b:0x3030bfbcaf77180!8m2!3d-5.3096355!4d122.9888319!16s%2Fg%2F11b5v3q35f?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Buton</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Buton Tengah merupakan salah satu kabupaten yang berada di Provinsi Sulawesi Tenggara, Indonesia. Ibu kotanya berada di Labungkari, kecamatan Lakudo. Wilayah Kabupaten Buton Tengah berbatasan dengan:<br/>
		    <b>Utara:</b> Kabupaten Muna dan Kabupaten Bombana <br/><b>Timur:</b> Selat Buton<br/><b>Selatan:</b> Laut Flores<br/><b>Barat:</b> Teluk Bone
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
	  <Modal title="Map Kabupaten Kolaka" bind:open={ModalmapKolaka} autoclose>
		<img src={mapKolaka} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Kolaka (Source: <a href="https://www.google.com/maps/place/Kabupaten+Kolaka,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2d9788c9c099dc31:0x3030bfbcaf77190?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Kolaka</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Kolaka mencakup jazirah daratan dan kepulauan yang memiliki wilayah daratan seluas 3.283,64 km² dan wilayah perairan/laut diperkirakan seluas ± 15.000 km², berbatasan dengan: <br/>
			<b>Utara:</b> Kabupaten Kolaka Utara <br/><b>Timur:</b> Kabupaten Kolaka Timur<br/><b>Selatan:</b> Kabupaten Bombana<br/><b>Barat:</b> Teluk Bone.
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Kolaka Timur" bind:open={ModalmapKolakaTimur} autoclose>
		<img src={mapKolakaTimur} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Kolaka Timur (Source: <a href="https://www.google.com/maps/place/Kabupaten+Kolaka+Timur,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2d9786ccebcd4fa9:0xe48fcfcb2efd1dae?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Kolaka Timur</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Kolaka Timur adalah salah satu kabupaten di provinsi Sulawesi Tenggara, Indonesia. Ibu kota kabupaten ini terletak di Tirawuta. Batas-batas wilayah Kabupaten Kolaka Timur adalah sebagai berikut: <br/>
			<b>Utara:</b> Kabupaten Kolaka Utara <br/><b>Timur:</b> Kabupaten Konawe dan Kabupaten Konawe Selatan<br/><b>Selatan:</b> Kabupaten Bombana<br/><b>Barat:</b> Kabupaten Kolaka dan Kabupaten Kolaka Utara.
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Kolaka Utara" bind:open={ModalmapKolakaUtara} autoclose>
		<img src={mapKolakaUtara} alt="Logo" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Kolaka Utara (Source: <a href="https://www.google.com/maps/place/Kabupaten+Kolaka+Utara,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2d9733ebf15cf45f:0x3030bfbcaf771a0?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Kolaka Utara</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Kolaka Utara mencakup wilayah daratan dan kepulauan yang memiliki daratan seluas 3.391 km2 dan wilayah perairan (laut) diperkirakan seluas ± 5.000 km2. Secara geografis terletak memanjang dari utara ke selatan berada di antara 2.00° Lintang Selatan dan membentang dari Barat ke Timur di antara 122.045° – 124.060° Bujur Timur, berbatasan dengan: <br/>
			<b>Utara:</b> Kabupaten Luwu Timur, Provinsi Sulawesi Selatan <br/><b>Timur:</b> Kabupaten Kolaka Timur, Provinsi Sulawesi Tenggara<br/><b>Selatan:</b> Kabupaten Kolaka, Provinsi Sulawesi Tenggara<br/><b>Barat:</b> 	Teluk Bone.
		</p>
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
	  <Modal title="Map Kabupaten Konawe Kepulauan" bind:open={ModalmapKonaweKepulauan} autoclose>
		<img src={mapKonaweKepulauan} alt="map konawe" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Konawe Kepulauan (Source: <a href="https://www.google.com/maps/place/Konawe+Kepulauan,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2d9f52bf686a2c3f:0xb2c5a836f6d090bb?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Konawe Kepulauan</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Konawe Kepulauan secara geografis berbatasan dengan Selat Wawonii di sebelah utara dan barat, Laut Banda di sebelah timur, serta Selat Buton di sebelah selatan. Luas wilayah Kabupaten Konawe Kepulauan adalah sekitar 1.513,98 kilometer persegi yang terdiri dari daratan seluas 867,58 kilometer persegi, perairan seluas 646,40 kilometer persegi, dan garis pantai sepanjang 178 kilometer.</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Konawe Selatan" bind:open={ModalmapKonaweSelatan} autoclose>
		<img src={mapKonaweSelatan} alt="map konawe" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Konawe Selatan (Source: <a href="https://www.google.com/maps/place/Kabupaten+Konawe+Selatan,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2d9880367932576f:0x3030bfbcaf771c0?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Konawe Selatan</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Konawe Selatan secara geografis terletak di bagian selatan khatulistiwa, melintang dari utara ke selatan antara 3.58° dan 4.31° Lintang Selatan, membujur dari barat ke timur antara 121°58’ dan 123°16 Bujur Timur. Batas wilayah kabupaten ini meliputi: <br/>
			<b>Utara:</b> Kabupaten Konawe dan Kota Kendari <br/><b>Timur:</b> Laut Banda dan Laut Maluku<br/><b>Selatan:</b> 	Kabupaten Muna dan Kabupaten Bombana<br/><b>Barat:</b> 	Kabupaten Kolaka.
		</p>
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
	  <Modal title="Map Kabupaten Muna" bind:open={ModalmapMuna} autoclose>
		<img src={mapMuna} alt="map muna" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Muna (Source: <a href="https://www.google.com/maps/place/Kabupaten+Muna,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2da24a926bb533a3:0x3030bfbcaf771d0?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Muna</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Muna terletak di jazirah sulawesi bagian tenggara, meliputi bagian utara pulau muna, serta pulau-pulau kecil yang tersebar di sekitar kawasan tersebut, Secara astronomis, Kabupaten Muna terletak di bagian selatan garis khatulistiwa, memanjang dariutara ke selatan di antara 4015’ – 5015’ Lintang Selatan dan membentang dari Barat ke Timur di antara 122030’ – 123015’ Bujur Timur.</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Muna Barat" bind:open={ModalmapMunaBarat} autoclose>
		<img src={mapMuna} alt="map muna" style="width:100%;height:300px;" />
		Gambar: Map Kabupaten Muna Barat (Source: <a href="https://www.google.com/maps/place/Kabupaten+Muna,+Sulawesi+Tenggara/data=!4m2!3m1!1s0x2da24a926bb533a3:0x3030bfbcaf771d0?sa=X&ved=1t:242&ictx=111" style="color:blue;text-decoration:underline;">GoogleMaps Muna</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Kabupaten Muna Barat merupakan salah satu kabupaten di Provinsi Sulawesi Tenggara, Indonesia yang merupakan hasil pemekaran dari Kabupaten Muna pada pertengahan tahun 2014. Ibu kota Kabupaten Muna Barat terletak di Laworo, kecamatan Sawerigadi.</p>
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
	  <Modal title="Map Kota Baubau" bind:open={ModalmapBaubau} autoclose>
		<img src={mapBaubau} alt="map kendari" style="width:100%;height:300px;" />
		Gambar: Map Kota Baubau (Source: <a href="https://www.google.com/maps/place/Baubau,+Waborobo,+Kec.+Betoambari,+Kota+Bau-Bau,+Sulawesi+Tenggara/@-5.5070779,122.596901,15z/data=!3m1!4b1!4m6!3m5!1s0x2da475a35ff82689:0x3030bfbcaf771f0!8m2!3d-5.507078!4d122.596901!16s%2Fm%2F02rwr7_?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Baubau</a>)
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Secara geografis terletak di bagian selatan garis khatulistiwa di antara 5.21° – 5.33° Lintang Selatan dan di antara 122.30° – 122.47° Bujur Timur atau terletak di sebelah Selatan Provinsi Sulawesi Tenggara.</p>
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

	<table id="MapArea" class="table-striped" style="width:100%;display: block;background-color: white;padding: 7px;border-radius: 8px;">
        <thead style="background:#ecf4fb;text-align: left;">
        <tr>
        <th style="width:26%;">Nama</th>
        <th style="width:14%;white-space: break-spaces;">Luas Wilayah <span use:tooltip={"Luas Wilayah"}></span> </th>
        <th style="width:14%;white-space: break-spaces;" class="hidekolom">J. Penduduk <span use:tooltip={"Jumlah Penduduk saat ini yang di Update"}></span></th>
		<th style="width:10%;white-space: break-spaces;" class="hidekolom">J. Gunung <span use:tooltip={"Jumlah Gunung saat ini yang di Update"}></span></th>
		<th style="width:10%;white-space: break-spaces;" class="hidekolom">J. Pulau <span use:tooltip={"Jumlah Pulau saat ini yang di Update"}></span></th>
		<th style="width:16%;white-space:break-spaces;" class="hidekolom">Koordinat <span use:tooltip={"Koordinat Map"}></span></th>
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
        <td>3.316,16 km2 </td>
        <td class="hidekolom">150.706  </td>
		<td class="hidekolom">Tidak Spesifik  </td>
		<td class="hidekolom">26  </td>
         <td class="hidekolom">4.6°S 121.8°E </td>
		 <td> 
			<span on:click={()=> visibleBombana = !visibleBombana} bind:this={closeBombana} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
				&#8285; 
			</span>
			<!-- menu -->
		    {#if visibleBombana}
			<div id="menuDropdown" class="dropdown-content">
			  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapBombana = true)}>Lihat Map</a> 
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
        <td>1.648,04 km2 </td>
        <td class="hidekolom">119.353  </td>
		<td class="hidekolom">Tidak Spesifik  </td>
		<td class="hidekolom">11  </td>
         <td class="hidekolom">5.31667°S 122.58333°E </td>
         <td> 
			<span on:click={()=> visibleButon  = !visibleButon} bind:this={closeButon} class="KBW2024" style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
				&#8285; 
			</span>
			<!-- menu -->
		    {#if visibleButon}
			<div id="menuDropdown" class="dropdown-content">
			  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButon = true)}>Lihat Map</a> 
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
			<td>510 km2 </td>
			<td class="hidekolom">99.173  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		<td class="hidekolom">15  </td>
			 <td class="hidekolom">5.56667°S 122.7°E </td>
			 <td> 
				<span on:click={()=> visibleButonSelatan  = !visibleButonSelatan} bind:this={closeButonSelatan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonSelatan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButonSelatan = true)}>Lihat Map</a> 
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
			<td>958 km2  </td>
			<td class="hidekolom">118.907  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		<td class="hidekolom">38  </td>
			 <td class="hidekolom">5.31667°S 122.33333°E </td>
			 <td> 
				<span on:click={()=> visibleButonTengah  = !visibleButonTengah} bind:this={closeButonTengah} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonTengah}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButonTengah = true)}>Lihat Map</a> 
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
			<td>1.923,03 km2 </td>
			<td class="hidekolom">68.553  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		<td class="hidekolom">29  </td>
			 <td class="hidekolom">5.01457°S 122.93015°E </td>
			 <td> 
				<span on:click={()=> visibleButonUtara  = !visibleButonUtara} bind:this={closeButonUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButonUtara = true)}>Lihat Map</a> 
				  <a href="https://www.butonutarakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr id="kolakatabel">
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
			<td class="hidekolom">Tidak Spesifik  </td>
		<td class="hidekolom">14  </td>
			 <td class="hidekolom">4°S 121.6°E </td>
			 <td> 
				<span on:click={toogleKolaka} bind:this={closeKolaka} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolaka}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKolaka = true)}>Lihat Map</a> 
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
			<td>3.992,53 km2 </td>
			<td class="hidekolom">125.311  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		   <td class="hidekolom">--  </td>
			 <td class="hidekolom">4.01807°S 121.86172°E </td>
			 <td> 
				<span on:click={()=> visibleKolakaTimur  = !visibleKolakaTimur} bind:this={closeKolakaTimur} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolakaTimur}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKolakaTimur = true)}>Lihat Map</a> 
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
			<td>3.392 km2 </td>
			<td class="hidekolom">139.319  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		   <td class="hidekolom">11  </td>
			 <td class="hidekolom">3.3°S 121°E </td>
			 <td> 
				<span on:click={()=> visibleKolakaUtara = !visibleKolakaUtara} bind:this={closeKolakaUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolakaUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKolakaUtara = true)}>Lihat Map</a> 
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
			<td>6.087,68 km2 </td>
			<td class="hidekolom">266.299  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		 <td class="hidekolom">6  </td>
			 <td class="hidekolom">3.91717°S 122.08823°E </td>
			 <td> 
				<span on:click={()=> visibleKonawe  = !visibleKonawe} bind:this={closeKonawe} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonawe}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonawe = true)}>Lihat Map</a> 
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
			<td>867,58 km2 </td>
			<td class="hidekolom">38.849 </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">3  </td>
			 <td class="hidekolom">4.11656°S 123.10181°E </td>
			 <td> 
				<span on:click={()=> visibleKonaweKepulauan = !visibleKonaweKepulauan} bind:this={closeKonaweKepulauan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweKepulauan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonaweKepulauan = true)}>Lihat Map</a> 
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
			<td>4.237,74 km2 </td>
			<td class="hidekolom">317.826  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">29  </td>
			 <td class="hidekolom">3.4114°S 122.02°E </td>
			 <td> 
				<span on:click={()=> visibleKonaweSelatan = !visibleKonaweSelatan} bind:this={closeKonaweSelatan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweSelatan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonaweSelatan = true)}>Lihat Map</a> 
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
			<td>5.101,76 km2 </td>
			<td class="hidekolom">62.403  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">72  </td>
			 <td class="hidekolom">3.4114°S 122.02°E </td>
			 <td> 
				<span on:click={()=> visibleKonaweUtara = !visibleKonaweUtara} bind:this={closeKonaweUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonaweUtara = true)}>Lihat Map</a> 
				  <a href="https://konaweutarakab.go.id/" rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr id="muna">
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
			<td>2.057,69 km2 </td>
			<td class="hidekolom">223.991  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">167  </td>
			 <td class="hidekolom">4.8°S 122.6°E </td>
			 <td> 
				<span on:click={()=> visibleMuna = !visibleMuna} bind:this={closeMuna} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleMuna}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapMuna = true)}>Lihat Map</a> 
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
			<td>1.022,89 km2 </td>
			<td class="hidekolom">84.182  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">35  </td>
			 <td class="hidekolom">4.83333°S 122.48333°E </td>
			 <td> 
				<span on:click={()=> visibleMunaBarat = !visibleMunaBarat} bind:this={closeMunaBarat} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleMunaBarat}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapMunaBarat = true)}>Lihat Map</a> 
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
			<td>473,62 km2 </td>
			<td class="hidekolom">111.402  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">142  </td>
			 <td class="hidekolom">5.31934°S 123.5948°E </td>
			 <td> 
				<span on:click={()=> visibleWakatobi  = !visibleWakatobi} bind:this={closeWakatobi} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleWakatobi}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapWakatobi = true)}>Lihat Map</a> 
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
			<td>295,07 km2 </td>
			<td class="hidekolom">162.377  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">18  </td>
			 <td class="hidekolom">5.4622°S 122.6058°E </td>
			 <td> 
				<span on:click={()=> visibleBaubau  = !visibleBaubau} bind:this={closeBaubau} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleBaubau}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapBaubau = true)}>Lihat Map</a> 
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
			<td>271,8 km2 </td>
			<td class="hidekolom">400.665  </td>
			<td class="hidekolom">Tidak Spesifik  </td>
		    <td class="hidekolom">1  </td>
			 <td class="hidekolom">3.9675°S 122.5947°E </td>
			 <td> 
				<span on:click={()=> visibleKendari  = !visibleKendari} bind:this={closeKendari} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKendari}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapKendari = true)}>Lihat Map</a> 
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
	 Update terakhir data di atas | tanggal: 07 November 2024 <br/><br/><br/>
   
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

