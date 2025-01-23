<script>
    /** @type {import('./$types').PageData} */

    import { Heading, Tabs, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { ArrowRightAltOutline, MoonOutline, BuildingSolid } from 'flowbite-svelte-icons';
    import sipapaodeScreen from '$lib/images/Sipapaode-screen.png';
    import ImageKSwasta from '$lib/images/Kerjasama-Pihak-Swasta.webp';


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
<br/><br/><hr/><br/>

<!-- 
<div class="modern-box">
  <div class="contentbox">
    <label>Dibawah berikut adalah Data Informasi Pihak yang melakukan Pengajuan Kerjasama Secara Online Baik dilakukan oleh Pihak Ketiga/Swasta ataupun Pemerintah Daerah dan K/L.</label>
  </div>
</div>
<br/><br/>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Bagaimana Sipapaode Bekerja</Heading>
<br/>
<div style="display:flex;margin-bottom:12px;align-items: center;gap: 16px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
 <div style="width: 50px;height: 50px;border-radius: 50%;background-color: #e0e0e0;"> <img src={ImageKSwasta} alt="kerjasama pihak swasta" style="border-radius:50%;"></div>
 <div style="flex-grow: 1;background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Memfasilitasi Kerjasama dengan Pemerintah Prov. Sulawesi Tenggara secara Online. </div>
</div>
<div style=" display:flex;margin-bottom:12px;align-items: center;gap: 16px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <div style="width: 50px;height: 50px;border-radius: 50%;background-color: #e0e0e0;"></div>
   <div style="flex-grow: 1;background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Pendataan laporan Evaluasi Kerjasama dari Pemerintahan Kab/Kota Prov. Sulawesi Tenggara dengan Pusat.  </div>
</div> 

<div style=" display:flex;margin-bottom:12px;align-items: center;gap: 16px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
    <div style="width: 50px;height: 50px;border-radius: 50%;background-color: #e0e0e0;"></div>
    <div style="flex-grow: 1;background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Informasi Pendataan Wilayah Pemerintahan, administrasi dan Rupabumi.  </div>
 </div> 
<br/><br/>
  -->
</div>
<style>
    
  .modern-box {
    position: relative;
    display: inline-block;
    padding: 12px;
  }
  
  .modern-box::before,
  .modern-box::after,
  .contentbox::before,
  .contentbox::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 4px solid #c7c7e7;
  }
  
  /* Top left corner */
  .modern-box::before {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }
  
  /* Top right corner */
  .modern-box::after {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
  }

  .contentbox {
    background: white;
    padding: 6px 12px;
    border-radius: 8px;
  }
  
  /* Bottom left corner */
  .contentbox::before {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
  }
  
  /* Bottom right corner */
  .contentbox::after {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
  }
  
  .contentbox label {
    font-size: 0.94rem;
    margin: 0;
    padding: 0;
  }
</style>

