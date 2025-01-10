<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading } from 'flowbite-svelte';
    import {  BuildingOutline } from 'flowbite-svelte-icons';

</script>

<svelte:head>
	<title>Coming Soon</title>
	<meta name="description" content="Gallery Foto & Video" />
</svelte:head>

<br/><br/>

<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Berita Terkini - Sulawesi Tenggara</Heading>
    <br/>

    <div style="position: relative; width: 100%; padding-top: 177.78%; height:2300px;/* Aspect ratio: 1600/900 * 100 */">
        <iframe 
            src="https://rss.app/embed/v1/magazine/tjSJifrmqBjNu6f7" 
            frameborder="0" 
            style="border-radius:20px;position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;">
        </iframe>
    </div>
  
</div>