<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading } from 'flowbite-svelte';
    import Karo from '$lib/images/Karo.webp';
</script>

<svelte:head>
	<title>Profil Pimpinan</title>
	<meta name="description" content="Kepala Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/><br/>

<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Profil Pimpinan</Heading>
    <br/>

    <div class="flex">
        <img src={Karo} class="card-img-top" style="margin-right:20px;"/>
       <div>
        <h2 style="font-size:28px;font-weight:600;">Muliadi, S.ST</h2>
        <br/>
        <span>Kepala Biro Pemerintahan dan Otonomi Daerah - Sulawesi Tenggara</span>
       </div>
    </div>

<br/>
<br/>
<br/>

</div>