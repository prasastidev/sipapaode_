<script>
    /** @type {import('./$types').PageData} */

    import { Heading, Tabs, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { ArrowRightAltOutline, MoonOutline, BuildingSolid } from 'flowbite-svelte-icons';
    import sipapaodeScreen from '$lib/images/Sipapaode-screen.png';


</script>

<svelte:head>
	<title>About Sipapaode - Biro Pemerintahan dan Otonomi Daerah Sultra</title>
	<meta name="description" content="About Sipapaode - Biro Pemerintahan dan OtonAboomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/><br/>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"> About</Heading>
<br/>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Apa itu Sipapaode</Heading>
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
    <div class="rounded-xl pr-3">
        <img src={sipapaodeScreen} alt="sipapaode"/>
     </div>
      
     <div class="col-span-2 rounded-xl">
        Sipapaode adalah salah satu Inovasi di Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara, yang merupakan akronim dari Sistem Informasi Pelayanan Pemerintahan dan Otonomi Daerah. Dirancang untuk meningkatkan efisiensi, transparansi, dan aksesibilitas layanan pemerintahan di Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara. Melalui sistem ini, diharapkan masyarakat dapat dengan mudah mengakses informasi dan layanan, serta mendukung sinergi data antara pemerintah daerah provinsi dan kabupaten/kota di Sulawesi Tenggara.
     <br/>		   
     </div>

</div>
<br/><br/>		


<hr/> <br/><br/>

</div>

