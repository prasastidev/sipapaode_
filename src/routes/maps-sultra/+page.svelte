<script>
import { Heading, Popover, Button, Avatar, Chart, Card, Modal, Tabs, TabItem } from 'flowbite-svelte';
import { InfoCircleOutline } from 'flowbite-svelte-icons';
import { tooltip } from './toolTipicon.js';
import mapSultrapng from '$lib/images/Map-sultra.webp';
import ImagelogoSultra from '$lib/images/Sultra-Logo.webp';
import { parseNumber } from './NumberParser.js'
	// In this locale "," is the decimal separator and "." is the group separator
	const locale = 'en-EN'
	const numDecimals = 2;
	const formatter = new Intl.NumberFormat(locale, {maximumFractionDigits: numDecimals});

import ApexCharts from 'apexcharts';
import { onMount, onDestroy } from 'svelte';

export let data = [];
let DataKotaKendari  = data.TableDatasWilayah.documents[0];
let DataKotaBaubau  = data.TableDatasWilayah.documents[1];
let DataWakatobi  = data.TableDatasWilayah.documents[2];
let DataMunaBarat  = data.TableDatasWilayah.documents[3];
let DataMuna  = data.TableDatasWilayah.documents[4];
let DataKonaweUtara  = data.TableDatasWilayah.documents[5];
let DataKonaweSelatan  = data.TableDatasWilayah.documents[6];
let DataKonaweKepulauan  = data.TableDatasWilayah.documents[7];
let DataKonawe = data.TableDatasWilayah.documents[8];
let DataKolakaUtara  = data.TableDatasWilayah.documents[9];
let DataKolakaTimur  = data.TableDatasWilayah.documents[10];
let DataKolaka  = data.TableDatasWilayah.documents[11];
let DataButonUtara = data.TableDatasWilayah.documents[12];
let DataButonTengah  = data.TableDatasWilayah.documents[13];
let DataButonSelatan  = data.TableDatasWilayah.documents[14];
let DataButon  = data.TableDatasWilayah.documents[15];
let DataBombana  = data.TableDatasWilayah.documents[16];

let Jum_LuasWilSultra, Jum_PendudukSultra, Jum_KecamatanSultra, Jum_KelurahanSultra, Jum_DesaSultra, Jum_PulauSultra, Jum_GunungSultra;

Jum_LuasWilSultra = (DataKotaKendari.Luas_Wilayah * 1) + (DataKotaBaubau.Luas_Wilayah * 1) + (DataWakatobi.Luas_Wilayah * 1) + (DataMunaBarat.Luas_Wilayah * 1) + (DataMuna.Luas_Wilayah * 1) + (DataKonaweUtara.Luas_Wilayah * 1)+ (DataKonaweSelatan.Luas_Wilayah * 1)+ (DataKonaweKepulauan.Luas_Wilayah * 1) +
(DataKonawe.Luas_Wilayah * 1) + (DataKolakaUtara.Luas_Wilayah * 1) + (DataKolakaTimur.Luas_Wilayah * 1) + (DataKolaka.Luas_Wilayah * 1) + (DataButonUtara.Luas_Wilayah * 1) + (DataButonTengah.Luas_Wilayah * 1) + (DataButonSelatan.Luas_Wilayah * 1) + (DataButon.Luas_Wilayah * 1) + (DataBombana.Luas_Wilayah * 1);

Jum_PendudukSultra = (DataKotaKendari.J_Penduduk * 1) + (DataKotaBaubau.J_Penduduk * 1) + (DataWakatobi.J_Penduduk * 1) + (DataMunaBarat.J_Penduduk * 1) + (DataMuna.J_Penduduk * 1) + (DataKonaweUtara.J_Penduduk * 1)+ (DataKonaweSelatan.J_Penduduk * 1)+ (DataKonaweKepulauan.J_Penduduk * 1) +
(DataKonawe.J_Penduduk * 1) + (DataKolakaUtara.J_Penduduk * 1) + (DataKolakaTimur.J_Penduduk * 1) + (DataKolaka.J_Penduduk * 1) + (DataButonUtara.J_Penduduk * 1) + (DataButonTengah.J_Penduduk * 1) + (DataButonSelatan.J_Penduduk * 1) + (DataButon.J_Penduduk * 1) + (DataBombana.J_Penduduk * 1);

Jum_KecamatanSultra = (DataKotaKendari.J_Kecamatan * 1) + (DataKotaBaubau.J_Kecamatan * 1) + (DataWakatobi.J_Kecamatan * 1) + (DataMunaBarat.J_Kecamatan * 1) + (DataMuna.J_Kecamatan * 1) + (DataKonaweUtara.J_Kecamatan * 1)+ (DataKonaweSelatan.J_Kecamatan * 1)+ (DataKonaweKepulauan.J_Kecamatan * 1) +
(DataKonawe.J_Kecamatan * 1) + (DataKolakaUtara.J_Kecamatan * 1) + (DataKolakaTimur.J_Kecamatan * 1) + (DataKolaka.J_Kecamatan * 1) + (DataButonUtara.J_Kecamatan * 1) + (DataButonTengah.J_Kecamatan * 1) + (DataButonSelatan.J_Kecamatan * 1) + (DataButon.J_Kecamatan * 1) + (DataBombana.J_Kecamatan * 1);

Jum_KelurahanSultra = (DataKotaKendari.J_Kelurahan * 1) + (DataKotaBaubau.J_Kelurahan * 1) + (DataWakatobi.J_Kelurahan * 1) +  (DataMunaBarat.J_Kelurahan * 1) + (DataMuna.J_Kelurahan * 1) + (DataKonaweUtara.J_Kelurahan * 1)+ (DataKonaweSelatan.J_Kelurahan * 1)+ (DataKonaweKepulauan.J_Kelurahan * 1) +
(DataKonawe.J_Kelurahan * 1) + (DataKolakaUtara.J_Kelurahan * 1) + (DataKolakaTimur.J_Kelurahan * 1) + (DataKolaka.J_Kelurahan * 1) + (DataButonUtara.J_Kelurahan * 1) + (DataButonTengah.J_Kelurahan * 1) + (DataButonSelatan.J_Kelurahan * 1) + (DataButon.J_Kelurahan * 1) + (DataBombana.J_Kelurahan * 1);

Jum_DesaSultra = (DataKotaKendari.J_Desa * 1) + (DataKotaBaubau.J_Desa * 1) + (DataWakatobi.J_Desa * 1) + (DataMunaBarat.J_Desa * 1) + (DataMuna.J_Desa * 1) + (DataKonaweUtara.J_Desa * 1)+ (DataKonaweSelatan.J_Desa * 1)+ (DataKonaweKepulauan.J_Desa * 1) +
(DataKonawe.J_Desa * 1) + (DataKolakaUtara.J_Desa * 1) + (DataKolakaTimur.J_Desa * 1) + (DataKolaka.J_Desa * 1) + (DataButonUtara.J_Desa * 1) + (DataButonTengah.J_Desa * 1) + (DataButonSelatan.J_Desa * 1) + (DataButon.J_Desa * 1) + (DataBombana.J_Desa * 1);

Jum_GunungSultra = (DataKotaKendari.J_Gunung * 1) + (DataKotaBaubau.J_Gunung * 1) + (DataWakatobi.J_Gunung * 1) + (DataMunaBarat.J_Gunung * 1) + (DataMuna.J_Gunung * 1) + (DataKonaweUtara.J_Gunung * 1)+ (DataKonaweSelatan.J_Gunung * 1)+ (DataKonaweKepulauan.J_Gunung * 1) +
(DataKonawe.J_Gunung * 1) + (DataKolakaUtara.J_Gunung * 1) + (DataKolakaTimur.J_Gunung * 1) + (DataKolaka.J_Gunung * 1) + (DataButonUtara.J_Gunung * 1) + (DataButonTengah.J_Gunung * 1) + (DataButonSelatan.J_Gunung * 1) + (DataButon.J_Gunung * 1) + (DataBombana.J_Gunung * 1);

Jum_PulauSultra = (DataKotaKendari.J_Pulau * 1) + (DataKotaBaubau.J_Pulau * 1) + (DataWakatobi.J_Pulau * 1) + (DataMunaBarat.J_Pulau * 1) + (DataMuna.J_Pulau * 1) + (DataKonaweUtara.J_Pulau * 1)+ (DataKonaweSelatan.J_Pulau * 1)+ (DataKonaweKepulauan.J_Pulau * 1) +
(DataKonawe.J_Pulau * 1) + (DataKolakaUtara.J_Pulau * 1) + (DataKolakaTimur.J_Pulau * 1) + (DataKolaka.J_Pulau * 1) + (DataButonUtara.J_Pulau * 1) + (DataButonTengah.J_Pulau * 1) + (DataButonSelatan.J_Pulau * 1) + (DataButon.J_Pulau * 1) + (DataBombana.J_Pulau * 1);


let ModalmapBombana, ModalmapButon, ModalmapButonSelatan, ModalmapButonTengah, ModalmapButonUtara, ModalmapKolaka, ModalmapKonawe, ModalmapKonaweUtara, ModalmapKolakaTimur, ModalmapWakatobi  = false;
let ModalmapKolakaUtara, ModalmapKonaweKepulauan, ModalmapKonaweSelatan, ModalmapMuna, ModalmapMunaBarat, ModalmapKendari, ModalmapBaubau  = false;

let visibleBombana, visibleButon, visibleButonSelatan, visibleButonTengah, visibleButonUtara = false;
let visibleKolaka, visibleKolakaTimur, visibleKolakaUtara, visibleKonawe, visibleKonaweKepulauan, visibleKonaweSelatan, visibleKonaweUtara = false;
let visibleMuna, visibleMunaBarat, visibleWakatobi, visibleBaubau, visibleKendari = false;

let  closeBombana, closeButon, closeButonSelatan, closeButonTengah, closeButonUtara, closeKolaka, closeKolakaTimur, 
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

	let DataLW = [
          { x: 'Kabupaten Bombana', y: DataBombana.Luas_Wilayah },
          { x: 'Kabupaten Buton', y: DataButon.Luas_Wilayah },
          { x: 'Kabupaten Buton Selatan', y: DataButonSelatan.Luas_Wilayah },
          { x: 'Kabupaten Buton Tengah', y: DataButonTengah.Luas_Wilayah },
          { x: 'Kabupaten Buton Utara', y: DataButonUtara.Luas_Wilayah },
          { x: 'Kabupaten Kolaka', y: DataKolaka.Luas_Wilayah },
          { x: 'Kabupaten Kolaka Timur', y: DataKolakaTimur.Luas_Wilayah },
		  { x: 'Kabupaten Kolaka Utara', y: DataKolakaUtara.Luas_Wilayah },
		  { x: 'Kabupaten Konawe', y: DataKonawe.Luas_Wilayah },
		  { x: 'Kabupaten Konawe Kepulauan', y: DataKonaweKepulauan.Luas_Wilayah },
		  { x: 'Kabupaten Konawe Selatan', y: DataKonaweSelatan.Luas_Wilayah },
		  { x: 'Kabupaten Konawe Utara', y: DataKonaweUtara.Luas_Wilayah },
		  { x: 'Kabupaten Muna', y: DataMuna.Luas_Wilayah },
		  { x: 'Kabupaten Muna Barat', y: DataMunaBarat.Luas_Wilayah },
		  { x: 'Kabupaten Wakatobi', y: DataWakatobi.Luas_Wilayah },
		  { x: 'Kota Baubau', y: DataKotaBaubau.Luas_Wilayah },
		  { x: 'Kota Kendari', y: DataKotaKendari.Luas_Wilayah }
        ];
	
		let DataJP = [
          { x: 'Kabupaten Bombana', y: DataBombana.J_Penduduk },
          { x: 'Kabupaten Buton', y: DataButon.J_Penduduk },
          { x: 'Kabupaten Buton Selatan', y: DataButonSelatan.J_Penduduk },
          { x: 'Kabupaten Buton Tengah', y: DataButonTengah.J_Penduduk },
          { x: 'Kabupaten Buton Utara', y: DataButonUtara.J_Penduduk },
          { x: 'Kabupaten Kolaka', y: DataKolaka.J_Penduduk },
          { x: 'Kabupaten Kolaka Timur', y: DataKolakaTimur.J_Penduduk },
		  { x: 'Kabupaten Kolaka Utara', y: DataKolakaUtara.J_Penduduk },
		  { x: 'Kabupaten Konawe', y: DataKonawe.J_Penduduk },
		  { x: 'Kabupaten Konawe Kepulauan', y: DataKonaweKepulauan.J_Penduduk },
		  { x: 'Kabupaten Konawe Selatan', y: DataKonaweSelatan.J_Penduduk },
		  { x: 'Kabupaten Konawe Utara', y: DataKonaweUtara.J_Penduduk },
		  { x: 'Kabupaten Muna', y: DataMuna.J_Penduduk },
		  { x: 'Kabupaten Muna Barat', y: DataMunaBarat.J_Penduduk },
		  { x: 'Kabupaten Wakatobi', y: DataWakatobi.J_Penduduk },
		  { x: 'Kota Baubau', y: DataKotaBaubau.J_Penduduk },
		  { x: 'Kota Kendari', y: DataKotaKendari.J_Penduduk }
        ];

		let DataJKecamatan = [
          { x: 'Kabupaten Bombana', y: DataBombana.J_Kecamatan },
          { x: 'Kabupaten Buton', y: DataButon.J_Kecamatan },
          { x: 'Kabupaten Buton Selatan', y: DataButonSelatan.J_Kecamatan },
          { x: 'Kabupaten Buton Tengah', y: DataButonTengah.J_Kecamatan },
          { x: 'Kabupaten Buton Utara', y: DataButonUtara.J_Kecamatan },
          { x: 'Kabupaten Kolaka', y: DataKolaka.J_Kecamatan },
          { x: 'Kabupaten Kolaka Timur', y: DataKolakaTimur.J_Kecamatan },
		  { x: 'Kabupaten Kolaka Utara', y: DataKolakaUtara.J_Kecamatan },
		  { x: 'Kabupaten Konawe', y: DataKonawe.J_Kecamatan },
		  { x: 'Kabupaten Konawe Kepulauan', y: DataKonaweKepulauan.J_Kecamatan },
		  { x: 'Kabupaten Konawe Selatan', y: DataKonaweSelatan.J_Kecamatan },
		  { x: 'Kabupaten Konawe Utara', y: DataKonaweUtara.J_Kecamatan },
		  { x: 'Kabupaten Muna', y: DataMuna.J_Kecamatan },
		  { x: 'Kabupaten Muna Barat', y: DataMunaBarat.J_Kecamatan },
		  { x: 'Kabupaten Wakatobi', y: DataWakatobi.J_Kecamatan },
		  { x: 'Kota Baubau', y: DataKotaBaubau.J_Kecamatan },
		  { x: 'Kota Kendari', y: DataKotaKendari.J_Kecamatan }
        ];

		let DataJGunung = [
          { x: 'Kabupaten Bombana', y: DataBombana.J_Gunung },
          { x: 'Kabupaten Buton', y: DataButon.J_Gunung },
          { x: 'Kabupaten Buton Selatan', y: DataButonSelatan.J_Gunung },
          { x: 'Kabupaten Buton Tengah', y: DataButonTengah.J_Gunung },
          { x: 'Kabupaten Buton Utara', y: DataButonUtara.J_Gunung },
          { x: 'Kabupaten Kolaka', y: DataKolaka.J_Gunung },
          { x: 'Kabupaten Kolaka Timur', y: DataKolakaTimur.J_Gunung },
		  { x: 'Kabupaten Kolaka Utara', y: DataKolakaUtara.J_Gunung },
		  { x: 'Kabupaten Konawe', y: DataKonawe.J_Gunung },
		  { x: 'Kabupaten Konawe Kepulauan', y: DataKonaweKepulauan.J_Gunung },
		  { x: 'Kabupaten Konawe Selatan', y: DataKonaweSelatan.J_Gunung },
		  { x: 'Kabupaten Konawe Utara', y: DataKonaweUtara.J_Gunung },
		  { x: 'Kabupaten Muna', y: DataMuna.J_Gunung },
		  { x: 'Kabupaten Muna Barat', y: DataMunaBarat.J_Gunung },
		  { x: 'Kabupaten Wakatobi', y: DataWakatobi.J_Gunung },
		  { x: 'Kota Baubau', y: DataKotaBaubau.J_Gunung },
		  { x: 'Kota Kendari', y: DataKotaKendari.J_Gunung }
        ];

		let DataJPulau = [
          { x: 'Kabupaten Bombana', y: DataBombana.J_Pulau },
          { x: 'Kabupaten Buton', y: DataButon.J_Pulau },
          { x: 'Kabupaten Buton Selatan', y: DataButonSelatan.J_Pulau },
          { x: 'Kabupaten Buton Tengah', y: DataButonTengah.J_Pulau },
          { x: 'Kabupaten Buton Utara', y: DataButonUtara.J_Pulau },
          { x: 'Kabupaten Kolaka', y: DataKolaka.J_Pulau },
          { x: 'Kabupaten Kolaka Timur', y: DataKolakaTimur.J_Pulau },
		  { x: 'Kabupaten Kolaka Utara', y: DataKolakaUtara.J_Pulau },
		  { x: 'Kabupaten Konawe', y: DataKonawe.J_Pulau },
		  { x: 'Kabupaten Konawe Kepulauan', y: DataKonaweKepulauan.J_Pulau },
		  { x: 'Kabupaten Konawe Selatan', y: DataKonaweSelatan.J_Pulau },
		  { x: 'Kabupaten Konawe Utara', y: DataKonaweUtara.J_Pulau },
		  { x: 'Kabupaten Muna', y: DataMuna.J_Pulau },
		  { x: 'Kabupaten Muna Barat', y: DataMunaBarat.J_Pulau },
		  { x: 'Kabupaten Wakatobi', y: DataWakatobi.J_Pulau },
		  { x: 'Kota Baubau', y: DataKotaBaubau.J_Pulau },
		  { x: 'Kota Kendari', y: DataKotaKendari.J_Pulau }
        ];

	let chart;
	let chartElement;
	let selectedData = DataJP;
	let currentDataName = 'Jumlah Penduduk';


/** Chart **/
	const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: currentDataName,
        color: '#1A56DB',
        data:  selectedData 
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
	function updateChartData(newData, dataName) {
		selectedData = newData;
		currentDataName = dataName;
		
		// Update the series data
		chart.updateSeries([{
			name: dataName,
			data: newData
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


  function SearchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("simple-search");
      filter = input.value.toUpperCase();
      table = document.getElementById("MapArea");
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

	
</script>

<svelte:window on:click={onWindowClick} />

<svelte:head>
	<title>Sipapaode - Lanskap Sulawesi Tenggara</title>
	<meta name="description" content="Lanskap Sulawesi Tenggara - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>


<br/><br/><br/>


<div class="container mt-14">
	<Heading tag="h3" class="mb-4" customSize="text-3xl text-center font-extrabold  md:text-3xl lg:text-4xl">Peta & Informasi Pemerintahan Otonomi Sulawesi Tenggara</Heading>
	<br/>
	Dibawah Berikut adalah informasi Data Statistic Provinsi Sulawesi Tenggara se-kab/kota Sulawesi Tenggara. Mencakup <a href="/maps-sultra/#Maps" style="text-decoration:underline;">Maps</a>, <a href="/maps-sultra/#TabelOtonomi" style="text-decoration:underline;">Kode dan Data Administrasi</a>, serta <a href="/maps-sultra/#grafik" style="text-decoration:underline;">Grafik</a>.
	<br/><br/>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{formatter.format(Jum_LuasWilSultra)} </p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{formatter.format(Jum_PendudukSultra)} </p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{Jum_KecamatanSultra}</p></Card>
		</div>
		<div><Card><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">🏡 Kelurahan / Desa</h5>
			<div class="flex items-center text-sm font-light text-gray-500 dark:text-gray-400" style="justify-content: right;position:relative;top:-54px;left:18px;">
				<button id="infoKD"><InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /></button>
			   </div>
			   <Popover triggeredBy="#infoKD" class="w-72 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="bottom-start">
				 <div class="p-3 space-y-2" style="z-index:100;">
				   Informasi Jumlah Kelurahan / Desa di Sulawesi Tenggara secara keseluruhan
				 </div>
			   </Popover>
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{Jum_KelurahanSultra} / {Jum_DesaSultra}</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{Jum_GunungSultra}</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">{Jum_PulauSultra}</p></Card>
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
			<p class="font-semibold text-xl text-[#5f9ea0] dark:text-[#5f9ea0] leading-tight pl-2">-</p></Card>
		</div>
	</div>
	<br/><br/>
	<Heading id="Maps" tag="h4" class="mb-4 mt-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Maps Sulawesi Tenggara</Heading>
	<Tabs>
		<TabItem open title="Maps Sultra">
		 <div style="width: 100%"><iframe width="100%" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=provinsi%20sulawesi%20tenggara+(My%20Business%20Name)&amp;t=&amp;z=8&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps trackers</a></iframe></div>
		</TabItem>
		<TabItem open title="Satelite">
			<div style="width: 100%"><iframe width="100%" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=sulawesi%20tenggara+(My%20Business%20Name)&amp;t=k&amp;z=9&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe></div>
		   </TabItem>
		<TabItem title="Screenshot">
			<img src={mapSultrapng} alt="Logo" style="width:100%;height:100%;border-radius: 16px;padding: 4px;border: 1px solid #cfcfd8;" />
			Gambar: Map Sultra (Source: <a href="https://www.google.com/maps/place/Sulawesi+Tenggara/@-4.4942734,121.4209727,8z/data=!3m1!4b1!4m6!3m5!1s0x2d98ecde0b6b7183:0x621d7c439f04a4ed!8m2!3d-4.14491!4d122.174605!16zL20vMDJiZGox?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D" style="color:blue;text-decoration:underline;">GoogleMaps Sultra</a>)	
		</TabItem>
	  </Tabs>
	 <br/><br/>
	<Heading id="TabelOtonomi" tag="h4" class="mb-4 mt-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Tabel Kode dan Data Wilayah Administrasi Pemerintahan Per Kab/Kota Sulawesi Tenggara</Heading>
	<p class="pb-3">
		Dibawah berikut ini adalah Peta Wilayah dan Informasi Pemerintahan di Wilayah Sulawesi Tenggara terdiri dari Kota dan Kabupaten. 
	</p>

	  <Modal title="Map Kabupaten Bombana" bind:open={ModalmapBombana} autoclose>
        <div style="width: 100%">{@html DataBombana.Map}</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{@html DataBombana.KetMap}</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	   <Modal title="Map Kabupaten Buton" bind:open={ModalmapButon} autoclose>
		<div style="width: 100%">{@html DataButon.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataButon.KetMap }
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Buton Selatan" bind:open={ModalmapButonSelatan} autoclose>
		<div style="width: 100%">{@html DataButonSelatan.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataButonSelatan.KetMap }
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Buton Tengah" bind:open={ModalmapButonTengah} autoclose>
		<div style="width: 100%">{@html DataButonTengah.Map} </div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataButonTengah.KetMap}
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Buton Utara" bind:open={ModalmapButonUtara} autoclose>
		<div style="width: 100%">{@html DataButonUtara.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataButonUtara.KetMap }</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Kolaka" bind:open={ModalmapKolaka} autoclose>
		<div style="width: 100%">{@html DataKolaka.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKolaka.KetMap  }
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Kolaka Timur" bind:open={ModalmapKolakaTimur} autoclose>
		<div style="width: 100%">{@html DataKolakaTimur.Map } </div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKolakaTimur.KetMap }
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Kolaka Utara" bind:open={ModalmapKolakaUtara} autoclose>
		<div style="width: 100%">{@html DataKolakaUtara.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKolakaUtara.KetMap }
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Konawe" bind:open={ModalmapKonawe} autoclose>
		<div style="width: 100%">{@html DataKonawe.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKonawe.KetMap }</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Konawe Kepulauan" bind:open={ModalmapKonaweKepulauan} autoclose>
		<div style="width: 100%">{@html DataKonaweKepulauan.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKonaweKepulauan.KetMap }</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Konawe Selatan" bind:open={ModalmapKonaweSelatan} autoclose>
		<div style="width: 100%">{@html DataKonaweSelatan.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKonaweSelatan.KetMap }
		</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Konawe Utara" bind:open={ModalmapKonaweUtara} autoclose>
		<div style="width: 100%">{@html DataKonaweUtara.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKonaweUtara.KetMap }</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Muna" bind:open={ModalmapMuna} autoclose>
		<div style="width: 100%">{@html DataMuna.Map }</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataMuna.KetMap }</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Muna Barat" bind:open={ModalmapMunaBarat} autoclose>
		<div style="width: 100%">{@html DataMunaBarat.Map} </div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataMunaBarat.KetMap}</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kabupaten Wakatobi" bind:open={ModalmapWakatobi} autoclose>
		<div style="width: 100%">{@html DataWakatobi.Map}</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataWakatobi.KetMap}</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kota Baubau" bind:open={ModalmapBaubau} autoclose>
		<div style="width: 100%">{@html DataKotaBaubau.Map}</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKotaBaubau.KetMap}</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	  <Modal title="Map Kota Kendari" bind:open={ModalmapKendari} autoclose>
		<div style="width: 100%">{@html DataKotaKendari.Map}</div>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{@html DataKotaKendari.KetMap}</p>
		<svelte:fragment slot="footer">
		  <Button color="alternative">Tutup</Button>
		</svelte:fragment>
	  </Modal>
	 

	  <form class="flex items-center w-full mx-auto" style="width:100%;">   
		<label for="simple-search" class="sr-only">Search</label>
		<div class="relative w-full">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
				</svg>
			</div>
			<input on:keyup={SearchTable} type="text" id="simple-search" class="bg-white-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Nama Kabupaten / Kota ..." required />
		</div>
		<button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			</svg>
			<span class="sr-only">Search</span>
		</button>
	</form>
     <br/>
	 <Button class="px-2 py-0.1" style="width:fit-content;border-radius:50%;background:cadetblue;vertical-align: middle;font-size: 11px;width: 10px;height: 15px;">i</Button> Sentuh Pada Tabel untuk melihat Ibukota, Lambang dan Kecamatan  <br/>
	<table id="MapArea" class="table-striped mt-2" style="width:100%;display: block;background-color: white;padding: 7px;border-radius: 8px;">
        <thead style="background:#ecf4fb;text-align: left;">
        <tr>
		<th style="width:6%;" class="hidekolom">Kode</th>	
        <th style="width:22%;">Nama</th>
        <th style="width:28%;white-space: break-spaces;">Luas Wilayah / J. Penduduk <span use:tooltip={"Luas Wilayah dan Jumlah Penduduk tiap Kab/Kota"}></span> </th>
		<th style="width:20%;white-space: break-spaces;" class="hidekolom">J. Rupa Bumi <span use:tooltip={"Jumlah Gunung saat ini yang di Update"}></span></th>
		<th style="width:14%;white-space:break-spaces;" class="hidekolom">Koordinat <span use:tooltip={"Koordinat Map"}></span></th>
        <th style="width:10%;">Detail</th>
        </tr>
        </thead>
        <tbody>  
        <tr>
		<td class="hidekolom">{ DataBombana.KodeW }</td>
        <td>{ DataBombana.Nama } <Button id="popbombana" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button> 
			<Popover triggeredBy="#popbombana" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
				<div class="p-3">
				  <center>
					<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Lambang_Kabupaten_Bombana.png" alt="Bombana" width="90px" height="90px" />
				 </center>
				 <p class="mt-3">
					<b>{ DataBombana.Nama }</b><br/>
					Ibukota : { DataBombana.Ibukota } <br/>
					Kecamatan : { DataBombana.J_Kecamatan }<br/>
					Kelurahan/Desa : { DataBombana.J_Kelurahan }/{ DataBombana.J_Desa }	
				 </p>
				</div>
			  </Popover>	
		</td>
        <td> {formatter.format(DataBombana.Luas_Wilayah)} km2 / {formatter.format(DataBombana.J_Penduduk)}  </td>
		<td class="hidekolom">Gunung: { DataBombana.J_Gunung } <br/>Pulau: { DataBombana.J_Pulau } <br/>Selat: { DataBombana.J_Selat } <br/>Danau: { DataBombana.J_Danau } <br/>Sungai: { DataBombana.J_Sungai } <br/>Rawa: { DataBombana.J_Rawa} </td>
        <td class="hidekolom">{ DataBombana.Koordinat } </td>
		 <td> 
			<span class="buttonDetail" on:click={()=> visibleBombana = !visibleBombana} bind:this={closeBombana} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
				&#8285; 
			</span>
			<!-- menu -->
		    {#if visibleBombana}
			<div id="menuDropdown" class="dropdown-content">
			  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapBombana = true)}>Lihat Map</a> 
			  <a href={DataBombana.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
			</div>
		    {/if}
		  </td>
        </tr>
        <tr>
		<td class="hidekolom">{ DataButon.KodeW }</td>	
        <td>{ DataButon.Nama } <Button id="popbuton" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
			<Popover triggeredBy="#popbuton" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
				<div class="p-3">
				  <center>
					<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Kabupaten_Buton.png" alt="Buton" width="90px" height="90px" />
				 </center>
				 <p class="mt-3">
					<b>{ DataButon.Nama }</b><br/>
					Ibukota : { DataButon.Ibukota } <br/>
					Kecamatan : { DataButon.J_Kecamatan } <br/>
					Kelurahan/Desa : { DataButon.J_Kelurahan }/{ DataButon.J_Desa }	
				 </p>
				</div>
			  </Popover>
		</td>
        <td> {formatter.format(DataButon.Luas_Wilayah)} km2 / {formatter.format(DataButon.J_Penduduk)} </td>
		<td class="hidekolom">Gunung: { DataButon.J_Gunung }<br/>Pulau: { DataButon.J_Pulau } <br/>Selat: { DataButon.J_Selat } <br/>Danau: { DataButon.J_Danau } <br/>Sungai: { DataButon.J_Sungai } <br/>Rawa: { DataButon.J_Rawa} </td>
         <td class="hidekolom">{ DataButon.Koordinat } </td>
         <td> 
			<span class="buttonDetail" on:click={()=> visibleButon  = !visibleButon} bind:this={closeButon} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
				&#8285; 
			</span>
			<!-- menu -->
		    {#if visibleButon}
			<div id="menuDropdown" class="dropdown-content">
			  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButon = true)}>Lihat Map</a> 
			  <a href={ DataButon.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
			</div>
		    {/if}
		 </td>
        </tr>
        
		<tr>
			<td class="hidekolom">{DataButonSelatan.KodeW }</td>
			<td>{ DataButonSelatan.Nama } <Button id="popbutonselatan" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbutonselatan" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/8/81/Lambang_Kabupaten_Buton_Selatan.png" alt="Buton Selatan" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{ DataButonSelatan.Nama }</b><br/>
						Ibukota : { DataButonSelatan.Ibukota } <br/>
						Kecamatan : { DataButonSelatan.J_Kecamatan }<br/>
						Kelurahan/Desa :{ DataButonSelatan.J_Kelurahan}/{ DataButonSelatan.J_Desa}	
					 </p>
					</div>
				  </Popover>	
			</td>
			<td> {formatter.format(DataButonSelatan.Luas_Wilayah)} km2 / {formatter.format(DataButonSelatan.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: { DataButonSelatan.J_Gunung }<br/>Pulau: { DataButonSelatan.J_Pulau } <br/>Selat: { DataButonSelatan.J_Selat } <br/>Danau: { DataButonSelatan.J_Danau } <br/>Sungai: { DataButonSelatan.J_Sungai } <br/>Rawa: { DataButonSelatan.J_Rawa}    </td>
			 <td class="hidekolom">{ DataButonSelatan.Koordinat }  </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleButonSelatan  = !visibleButonSelatan} bind:this={closeButonSelatan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonSelatan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButonSelatan = true)}>Lihat Map</a> 
				  <a href={ DataButonSelatan.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>
		<tr>
			<td class="hidekolom">{DataButonTengah.KodeW }</td>
			<td>{DataButonTengah.Nama} <Button id="popbutontengah" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbutontengah" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Lambang_Kabupaten_Buton_Tengah.tif/lossless-page1-581px-Lambang_Kabupaten_Buton_Tengah.tif.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataButonTengah.Nama}</b><br/>
						Ibukota : {DataButonTengah.Ibukota} <br/>
						Kecamatan : {DataButonTengah.J_Kecamatan}<br/>
						Kelurahan/Desa : {DataButonTengah.J_Kelurahan}/{DataButonTengah.J_Desa}	
					 </p>
					</div>
				  </Popover>	
			</td>
			<td> {formatter.format(DataButonTengah.Luas_Wilayah)} km2 / {formatter.format(DataButonTengah.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataButonTengah.J_Gunung} <br/>Pulau: {DataButonTengah.J_Pulau} <br/>Selat: { DataButonTengah.J_Selat } <br/>Danau: { DataButonTengah.J_Danau } <br/>Sungai: { DataButonTengah.J_Sungai } <br/>Rawa: { DataButonTengah.J_Rawa} </td>
			 <td class="hidekolom">{DataButonTengah.Koordinat} </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleButonTengah  = !visibleButonTengah} bind:this={closeButonTengah} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonTengah}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButonTengah = true)}>Lihat Map</a> 
				  <a href={DataButonTengah.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataButonUtara.KodeW }</td>
			<td>{DataButonUtara.Nama } <Button id="popbutonutara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbutonutara" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Lambang_Kabupaten_Buton_Utara.jpg" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataButonUtara.Nama }</b><br/>
						Ibukota : {DataButonUtara.Ibukota } <br/>
						Kecamatan : {DataButonUtara.J_Kecamatan }<br/>
						Kelurahan/Desa : {DataButonUtara.J_Kelurahan }/{DataButonUtara.J_Desa } 	
					 </p>
					</div>
				  </Popover>	
			</td>
			<td> {formatter.format(DataButonUtara.Luas_Wilayah)} km2 / {formatter.format(DataButonUtara.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataButonUtara.J_Gunung } <br/>Pulau: {DataButonUtara.J_Pulau } <br/>Selat: { DataButonUtara.J_Selat } <br/>Danau: { DataButonUtara.J_Danau } <br/>Sungai: { DataButonUtara.J_Sungai } <br/>Rawa: { DataButonUtara.J_Rawa}   </td>
			 <td class="hidekolom">{DataButonUtara.Koordinat } </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleButonUtara  = !visibleButonUtara} bind:this={closeButonUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleButonUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#MapArea" on:click={() => (ModalmapButonUtara = true)}>Lihat Map</a> 
				  <a href={DataButonUtara.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr id="kolakatabel">
			<td class="hidekolom">{DataKolaka.KodeW }</td>
			<td>{DataKolaka.Nama } <Button id="popkolaka" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkolaka" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Lambang_Kab_Kolaka.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKolaka.Nama }</b><br/>
						Ibukota : {DataKolaka.Ibukota } <br/>
						Kecamatan : {DataKolaka.J_Kecamatan }<br/>
						Kelurahan/Desa : {DataKolaka.J_Kelurahan }/{DataKolaka.J_Desa }
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKolaka.Luas_Wilayah)} km2 / {formatter.format(DataKolaka.J_Penduduk)}  </td>
			<td class="hidekolom">Gunung: {DataKolaka.J_Gunung } <br/>Pulau: {DataKolaka.J_Pulau } <br/>Selat: { DataKolaka.J_Selat } <br/>Danau: { DataKolaka.J_Danau } <br/>Sungai: { DataKolaka.J_Sungai } <br/>Rawa: { DataKolaka.J_Rawa}  </td>
			 <td class="hidekolom">{DataKolaka.Koordinat }</td>
			 <td> 
				<span class="buttonDetail" on:click={toogleKolaka} bind:this={closeKolaka} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolaka}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKolaka = true)}>Lihat Map</a> 
				  <a href={DataKolaka.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKolakaTimur.KodeW }</td>
			<td>{DataKolakaTimur.Nama } <Button id="popkolakatimur" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkolakatimur" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Lambang_Kabupaten_Kolaka_Timur.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKolakaTimur.Nama } </b><br/>
						Ibukota : {DataKolakaTimur.Ibukota } a <br/>
						Kecamatan : {DataKolakaTimur.J_Kecamatan } <br/>
						Kelurahan/Desa : {DataKolakaTimur.J_Kelurahan }/{DataKolakaTimur.J_Desa }	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKolakaTimur.Luas_Wilayah)} km2 / {formatter.format(DataKolakaTimur.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataKolakaTimur.J_Gunung} <br/>Pulau: {DataKolakaTimur.J_Pulau } <br/>Selat: { DataKolakaTimur.J_Selat } <br/>Danau: { DataKolakaTimur.J_Danau } <br/>Sungai: { DataKolakaTimur.J_Sungai } <br/>Rawa: { DataKolakaTimur.J_Rawa}  </td>
			 <td class="hidekolom">{DataKolakaTimur.Koordinat } </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleKolakaTimur  = !visibleKolakaTimur} bind:this={closeKolakaTimur} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolakaTimur}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKolakaTimur = true)}>Lihat Map</a> 
				  <a href={DataKolakaTimur.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKolakaUtara.KodeW }</td>
			<td>{DataKolakaUtara.Nama } <Button id="popkolakautara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkolakautara" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Lambang_Kabupaten_Kolaka_Utara.svg" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKolakaUtara.Nama }</b><br/>
						Ibukota : {DataKolakaUtara.Ibukota } <br/>
						Kecamatan : {DataKolakaUtara.J_Kecamatan }<br/>
						Kelurahan/Desa : {DataKolakaUtara.J_Kelurahan }/{DataKolakaUtara.J_Desa }	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKolakaUtara.Luas_Wilayah)} km2 / {formatter.format(DataKolakaUtara.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataKolakaUtara.J_Gunung }<br/>Pulau: {DataKolakaUtara.J_Pulau }  <br/>Selat: { DataKolakaUtara.J_Selat } <br/>Danau: { DataKolakaUtara.J_Danau } <br/>Sungai: { DataKolakaUtara.J_Sungai } <br/>Rawa: { DataKolakaUtara.J_Rawa}  </td>
			 <td class="hidekolom">{DataKolakaUtara.Koordinat }</td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleKolakaUtara = !visibleKolakaUtara} bind:this={closeKolakaUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKolakaUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKolakaUtara = true)}>Lihat Map</a> 
				  <a href={DataKolakaUtara.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKonawe.KodeW }</td>
			<td>{DataKonawe.Nama } <Button id="popkonawe" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkonawe" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Lambang_Kabupaten_Konawe.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKonawe.Nama } </b><br/>
						Ibukota : {DataKonawe.Ibukota }  <br/>
						Kecamatan : {DataKonawe.J_Kecamatan } <br/>
						Kelurahan/Desa : {DataKonawe.J_Kelurahan } /{DataKonawe.J_Desa  } 	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKonawe.Luas_Wilayah)} km2 / {formatter.format(DataKonawe.J_Penduduk)}</td>
			<td class="hidekolom">Gunung: {DataKonawe.J_Gunung }<br/>Pulau: {DataKonawe.J_Pulau } <br/>Selat: { DataKonawe.J_Selat } <br/>Danau: { DataKonawe.J_Danau } <br/>Sungai: { DataKonawe.J_Sungai } <br/>Rawa: { DataKonawe.J_Rawa}   </td>
			 <td class="hidekolom">{DataKonawe.Koordinat } </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleKonawe  = !visibleKonawe} bind:this={closeKonawe} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonawe}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonawe = true)}>Lihat Map</a> 
				  <a href={DataKonawe.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKonaweKepulauan.KodeW }</td>
			<td> {DataKonaweKepulauan.Nama} <Button id="popkonawekepulauan" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkonawekepulauan" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Lambang_Kabupaten_Konawe_Kepulauan.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKonaweKepulauan.Nama } </b><br/>
						Ibukota : {DataKonaweKepulauan.Ibukota }  <br/>
						Kecamatan : {DataKonaweKepulauan.J_Kecamatan } <br/>
						Kelurahan/Desa : {DataKonaweKepulauan.J_Kelurahan } / {DataKonaweKepulauan.J_Desa } 	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKonaweKepulauan.Luas_Wilayah)} km2 / {formatter.format(DataKonaweKepulauan.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataKonaweKepulauan.J_Gunung } <br/>Pulau: {DataKonaweKepulauan.J_Pulau } <br/>Selat: { DataKonaweKepulauan.J_Selat } <br/>Danau: { DataKonaweKepulauan.J_Danau } <br/>Sungai: { DataKonaweKepulauan.J_Sungai } <br/>Rawa: { DataKonaweKepulauan.J_Rawa} </td>
			 <td class="hidekolom">{DataKonaweKepulauan.Koordinat } </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleKonaweKepulauan = !visibleKonaweKepulauan} bind:this={closeKonaweKepulauan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweKepulauan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonaweKepulauan = true)}>Lihat Map</a> 
				  <a href={DataKonaweKepulauan.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKonaweSelatan.KodeW }</td>
			<td>{DataKonaweSelatan.Nama }  <Button id="popkonaweselatan" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkonaweselatan" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/8/81/Lambang_Kabupaten_Buton_Selatan.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKonaweSelatan.Nama} </b><br/>
						Ibukota : {DataKonaweSelatan.Ibukota}  <br/>
						Kecamatan : {DataKonaweSelatan.J_Kecamatan}<br/>
						Kelurahan/Desa : {DataKonaweSelatan.J_Kelurahan}/{DataKonaweSelatan.J_Desa}	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKonaweSelatan.Luas_Wilayah)} km2 / {formatter.format(DataKonaweSelatan.J_Penduduk)}  </td>
			<td class="hidekolom">Gunung: {DataKonaweSelatan.J_Gunung } <br/>Pulau: {DataKonaweSelatan.J_Pulau} <br/>Selat: { DataKonaweSelatan.J_Selat } <br/>Danau: { DataKonaweSelatan.J_Danau } <br/>Sungai: { DataKonaweSelatan.J_Sungai } <br/>Rawa: { DataKonaweSelatan.J_Rawa}</td>
			 <td class="hidekolom">{DataKonaweSelatan.Koordinat} </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleKonaweSelatan = !visibleKonaweSelatan} bind:this={closeKonaweSelatan} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweSelatan}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonaweSelatan = true)}>Lihat Map</a> 
				  <a href={DataKonaweSelatan.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKonaweUtara.KodeW }</td>
			<td>{DataKonaweUtara.Nama } <Button id="popkonaweutara" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkonaweutara" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_konawe_utara.jpg" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKonaweUtara.Nama }</b><br/>
						Ibukota : {DataKonaweUtara.Ibukota } <br/>
						Kecamatan : {DataKonaweUtara.J_Kecamatan }<br/>
						Kelurahan/Desa : {DataKonaweUtara.J_Kelurahan }/{DataKonaweUtara.J_Desa }	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKonaweUtara.Luas_Wilayah)} km2 / {formatter.format(DataKonaweUtara.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataKonaweUtara.J_Gunung }<br/>Pulau: {DataKonaweUtara.J_Pulau } <br/>Selat: { DataKonaweUtara.J_Selat } <br/>Danau: { DataKonaweUtara.J_Danau } <br/>Sungai: { DataKonaweUtara.J_Sungai } <br/>Rawa: { DataKonaweUtara.J_Rawa}  </td>
			 <td class="hidekolom">{DataKonaweUtara.Koordinat }</td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleKonaweUtara = !visibleKonaweUtara} bind:this={closeKonaweUtara} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKonaweUtara}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#kolakatabel" on:click={() => (ModalmapKonaweUtara = true)}>Lihat Map</a> 
				  <a href={DataKonaweUtara.Situs } rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr id="muna">
			<td class="hidekolom">{DataMuna.KodeW}</td>
			<td>{DataMuna.Nama} <Button id="popkabupatenmuna" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkabupatenmuna" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/7/71/Lambang_Kabupaten_Muna_Revisi.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataMuna.Nama}</b><br/>
						Ibukota : {DataMuna.Ibukota} <br/>
						Kecamatan : {DataMuna.J_Kecamatan}<br/>
						Kelurahan/Desa : {DataMuna.J_Kelurahan}/{DataMuna.J_Desa}
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataMuna.Luas_Wilayah)} km2 / {formatter.format(DataMuna.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataMuna.J_Gunung} <br/>Pulau: {DataMuna.J_Pulau} <br/>Selat: { DataMuna.J_Selat } <br/>Danau: { DataMuna.J_Danau } <br/>Sungai: { DataMuna.J_Sungai } <br/>Rawa: { DataMuna.J_Rawa}  </td>
			 <td class="hidekolom"> {DataMuna.Koordinat} </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleMuna = !visibleMuna} bind:this={closeMuna} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleMuna}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapMuna = true)}>Lihat Map</a> 
				  <a href={DataMuna.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataMunaBarat.KodeW}</td>
			<td>{DataMunaBarat.Nama} <Button id="popkabupatenmunabarat" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkabupatenmunabarat" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Lambang_Kabupaten_Muna_Barat.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataMunaBarat.Nama}</b><br/>
						Ibukota : {DataMunaBarat.Ibukota} <br/>
						Kecamatan : {DataMunaBarat.J_Kecamatan}<br/>
						Kelurahan/Desa : {DataMunaBarat.J_Kelurahan}/{DataMunaBarat.J_Desa}	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataMunaBarat.Luas_Wilayah)} km2 / {formatter.format(DataMunaBarat.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataMunaBarat.J_Gunung} <br/>Pulau: {DataMunaBarat.J_Pulau} <br/>Selat: { DataMunaBarat.J_Selat } <br/>Danau: { DataMunaBarat.J_Danau } <br/>Sungai: { DataMunaBarat.J_Sungai } <br/>Rawa: { DataMunaBarat.J_Rawa}   </td>
			 <td class="hidekolom">{DataMunaBarat.Koordinat} </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleMunaBarat = !visibleMunaBarat} bind:this={closeMunaBarat} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleMunaBarat}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapMunaBarat = true)}>Lihat Map</a> 
				  <a href={DataMunaBarat.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataWakatobi.KodeW}</td>
			<td>{DataWakatobi.Nama} <Button id="popwakatobi" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popwakatobi" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/id/0/0d/Logo_Kabupaten_Wakatobi_Sulawesi_Tenggara.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataWakatobi.Nama} </b><br/>
						Ibukota : {DataWakatobi.Ibukota} <br/>
						Kecamatan : {DataWakatobi.J_Kecamatan}<br/>
						Kelurahan/Desa : {DataWakatobi.J_Kelurahan}/{DataWakatobi.J_Desa}
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataWakatobi.Luas_Wilayah)} km2 / {formatter.format(DataWakatobi.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataWakatobi.J_Gunung}<br/> Pulau: {DataWakatobi.J_Pulau} <br/>Selat: { DataWakatobi.J_Selat } <br/>Danau: { DataWakatobi.J_Danau } <br/>Sungai: { DataWakatobi.J_Sungai } <br/>Rawa: { DataWakatobi.J_Rawa}    </td>
			 <td class="hidekolom">{DataWakatobi.Koordinat} </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleWakatobi  = !visibleWakatobi} bind:this={closeWakatobi} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleWakatobi}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapWakatobi = true)}>Lihat Map</a> 
				  <a href={DataWakatobi.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKotaBaubau.KodeW}</td>
			<td>{DataKotaBaubau.Nama} <Button id="popbaubau" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popbaubau" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Baubau.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>{DataKotaBaubau.Nama}</b><br/>
						Ibukota : {DataKotaBaubau.Ibukota} <br/>
						Kecamatan : {DataKotaBaubau.J_Kecamatan}<br/>
						Kelurahan/Desa : {DataKotaBaubau.J_Kelurahan}/{DataKotaBaubau.J_Desa}	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKotaBaubau.Luas_Wilayah)} km2 / {formatter.format(DataKotaBaubau.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataKotaBaubau.J_Gunung} <br/>Pulau: {DataKotaBaubau.J_Pulau} <br/>Selat: { DataKotaBaubau.J_Selat } <br/>Danau: {DataKotaBaubau.J_Danau } <br/>Sungai: { DataKotaBaubau.J_Sungai } <br/>Rawa: { DataKotaBaubau.J_Rawa}  </td>
			 <td class="hidekolom">{DataKotaBaubau.Koordinat} </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleBaubau  = !visibleBaubau} bind:this={closeBaubau} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleBaubau}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapBaubau = true)}>Lihat Map</a> 
				  <a href={DataKotaBaubau.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>

		<tr>
			<td class="hidekolom">{DataKotaKendari.KodeW}</td>
			<td>{DataKotaKendari.Nama} <Button id="popkendari" class="px-2 py-0.1 -mb-2" style="width:fit-content;border-radius:50%;background:cadetblue;font-size: 11px;width: 10px;height: 15px;">i</Button>
				<Popover triggeredBy="#popkendari" class="w-64 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
					<div class="p-3">
					  <center>
						<img class="object-center" src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Lambang_Kota_Kendari.png" alt="Jese Leos" width="90px" height="90px" />
					 </center>
					 <p class="mt-3">
						<b>Kota Kendari</b><br/>
						Ibukota :  <br/>
						Kecamatan : {DataKotaKendari.J_Kecamatan} <br/>
						Kelurahan/Desa : {DataKotaKendari.J_Kelurahan}/ {DataKotaKendari.J_Desa }	
					 </p>
					</div>
				  </Popover>
			</td>
			<td>{formatter.format(DataKotaKendari.Luas_Wilayah)} km2 / {formatter.format(DataKotaKendari.J_Penduduk)} </td>
			<td class="hidekolom">Gunung: {DataKotaKendari.J_Gunung} <br/>Pulau: {DataKotaKendari.J_Pulau} <br/>Selat: { DataKotaKendari.J_Selat } <br/>Danau: {DataKotaKendari.J_Danau } <br/>Sungai: { DataKotaKendari.J_Sungai } <br/>Rawa: { DataKotaKendari.J_Rawa}  </td>
			 <td class="hidekolom">{DataKotaKendari.Koordinat}  </td>
			 <td> 
				<span class="buttonDetail" on:click={()=> visibleKendari  = !visibleKendari} bind:this={closeKendari} style="font-weight:600;padding: 6px 12px; font-size:14px; background-color: #e2e7eb; border-radius: 50%; margin-left:5px;color:black;cursor: pointer;border: 2px solid rgb(129 129 137 / 44%);"> 
					&#8285; 
				</span>
				<!-- menu -->
				{#if visibleKendari}
				<div id="menuDropdown" class="dropdown-content">
				  <a href="/maps-sultra/#muna" on:click={() => (ModalmapKendari = true)}>Lihat Map</a> 
				  <a href={DataKotaKendari.Situs} rel="nofollow noopener" target="_blank">Ke Situs</a>
				</div>
				{/if}
			 </td>
		</tr>
      
        </tbody>
        </table>

	<br/><br/>
	<Heading id="grafik" tag="h4" class="mb-4" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-2xl">Grafik Kabupaten/Kota Sulawesi Tenggara</Heading>
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
		
		
		<div style="text-align:center;margin-bottom:15px;">***</div>
		Data Berdasarkan {currentDataName} <br/>

		<div class="container mx-auto p-4">
		
			<div bind:this={chartElement}></div>
			
		   <div class="flex justify-center mt-4 space-x-4">
			<button on:click={() => updateChartData(DataJP, 'Jumlah Penduduk')} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			Jumlah Penduduk </button>
		    <button on:click={() => updateChartData(DataLW, 'Luas Wilayah')} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
			Luas Wilayah</button>
			<button on:click={() => updateChartData(DataJKecamatan, 'Jumlah Kecamatan')} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
			Jumlah Kecamatan </button>
		   </div>

	   </div>
		
	    
	  </Card>
	  <br/><br/>
	  ** Data di atas diupdate oleh Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara - Bidang Koordinator Pemerintahan
	  <br/><br/>
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

.buttonDetail:hover {
  box-shadow: 0 0 10px #a5b8f2;
}

</style>

