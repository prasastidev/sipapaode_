<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading } from 'flowbite-svelte';
    import { Gallery } from 'flowbite-svelte';
    const images = [
    { alt: 'erbology', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg' },
    { alt: 'shoes', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
    { alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
    { alt: 'plants', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
    { alt: 'watch', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg' },
    { alt: 'shoe', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' },
    { alt: 'cream', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg' },
    { alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg' },
    { alt: 'lamp', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg' },
    { alt: 'toiletbag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg' },
    { alt: 'playstation', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg' },
    { alt: 'bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg' }
  ];
</script>

<svelte:head>
	<title>Gallery Foto & Video</title>
	<meta name="description" content="Gallery Foto & Video - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/><br/>

<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Gallery Foto, Video & Kegiatan</Heading>
    <br/>
    <Gallery items={images} class="gap-4 grid-cols-2 md:grid-cols-3" /> 
    <br/><br/><br/>
</div>