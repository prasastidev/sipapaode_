<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading } from 'flowbite-svelte';
    import {  BuildingOutline } from 'flowbite-svelte-icons';

      import { onMount } from 'svelte';

  onMount(() => {
    // Buat elemen div untuk widget
    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'id305017f99593f';
    widgetDiv.setAttribute('a', '{"t":"r","v":"1.2","lang":"id","locs":[1713],"ssot":"c","sics":"ds","cbkg":"#FFFFFF","cfnt":"#000000","codd":"#FFFFFF","cont":"#000000d4"}');
    widgetDiv.innerHTML = 'Sumber Data Cuaca: <a href="https://cuacalab.id/cuaca_sulawesi_tenggara/">cuaca Sulawesi Tenggara</a>';
    
    // Tambahkan ke container
    const container = document.getElementById('weather-container');
    if (container) {
      container.appendChild(widgetDiv);
    }

    // Load script
    const script = document.createElement('script');
    script.src = 'https://static1.cuacalab.id/widgetjs/?id=id305017f99593f';
    script.async = true;
    document.head.appendChild(script);
  });

  const today = new Date();
  // Opsi untuk memformat tanggal agar lebih mudah dibaca
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Format tanggal ke dalam string yang mudah dibaca
  const formattedDate = today.toLocaleDateString('id-ID', options);

</script>

<svelte:head>
	<title>Berita Terkini Sulawesi Tenggara</title>
	<meta name="description" content="Berita Terkini Sulawesi Tenggara" />
</svelte:head>
<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Berita Terkini di Sulawesi Tenggara</Heading>
    <br/>
    <div id="weather-container" style="border-radius:10px !important;"></div>
    <br/>
    <p style="font-size:22px;">📅 Tanggal hari ini: <strong>{formattedDate}</strong></p>
    <br/><br/>
    <div style="position: relative; width: 100%; height:3400px;/* Aspect ratio: 1600/900 * 100 */">
       <iframe 
            src="https://rss.app/embed/v1/magazine/ttEYXQfFYDKKGull" 
            frameborder="0" 
            style="border-radius:20px;position: absolute; top: 0; left: 0; width: 100%; height: 116%; border: 0;">
        </iframe>
 

    </div>
  <br/><br/><br/><br/><br/><br/>
</div>
<br/><br/>
<br/><br/>
<br/><br/>