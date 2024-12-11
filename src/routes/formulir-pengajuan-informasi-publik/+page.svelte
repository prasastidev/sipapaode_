<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, GradientButton } from 'flowbite-svelte';
	import FormulirPengajuan from '$lib/documents/FORM-Permohonan-Informasi.pdf';
    import FormTandaTerima from '$lib/documents/FORM-Tanda-terima.pdf';
</script>

<svelte:head>
	<title>Formulir Pengajuan Informasi oleh Publik</title>
	<meta name="description" content="Formulir Pengajuan Informasi oleh Publik" />
</svelte:head>

<br/><br/>

<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Formulir Pengajuan Informasi oleh Publik dan Tata Cara Pengajuan</Heading>
    <br/>
 <Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Formulir Permohonan dan Pengajuan</Heading>
   Dibawah ini adalah Formulir Pengajuan Informasi. <br/><br/>

<GradientButton href={FormulirPengajuan} outline color="redToYellow" class="w-64">Download Formulir Pengajuan Informasi</GradientButton> <br/>
<GradientButton href={FormTandaTerima} outline color="redToYellow" class="w-64">Download Tanda Terima</GradientButton><br/><br/><br/>

<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Tata Cara Pengajuan Informasi</Heading>
   Dibawah ini adalah Formulir Pengajuan Informasi. <br/>
   <br/><br/> -- Gambar --
   <br/><br/><br/>
</div>