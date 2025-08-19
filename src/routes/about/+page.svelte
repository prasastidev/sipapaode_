<script>
    /** @type {import('./$types').PageData} */

    import { Heading } from 'flowbite-svelte';
    import { ArrowUpFromBracketOutline } from 'flowbite-svelte-icons';
    import sipapaodeScreen from '$lib/images/Sipapaode-screen.png';
    import ImageKSwasta from '$lib/images/Kerjasama-Pihak-Swasta.webp';
    import ImageKLuarNegeri from '$lib/images/Kerjasama-Luar-Negeri.webp';
    import PenataanWilayahimg from '$lib/images/Penataan-wilayah.webp';
    import KodeWilayahimg from '$lib/images/Kode-Wilayah.webp';
    import Otonomiimg from '$lib/images/otonomi.webp';
    import penerbitanSKimg from '$lib/images/SK.webp';
    import laporanimg from '$lib/images/laporan.webp';
    import Inventarisasiotonomi from '$lib/images/inventarisasi-otonomi-baru.webp';


</script>

<svelte:head>
	<title>About Sipapaode - Biro Pemerintahan dan Otonomi Daerah Sultra</title>
	<meta name="description" content="About Sipapaode - Biro Pemerintahan dan OtonAboomi Daerah Sulawesi Tenggara" />
</svelte:head>

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


<div class="modern-box">
  <div class="contentbox">
    <label class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2"><div class="col-span-2 rounded-xl pr-3">
      <h1 class="text-lg" style="text-align:left;color #242a38;font-weight: 600;">
        Silakan unduh buku panduan ringkas tentang sipapaode dengan mengklik tombol download yang tersedia di samping.
      </h1></div>
      <div class="rounded-xl content-center"><a href="#" style="text-decoration:none;"><button class="flex buttonPIC bg-blue-500 text-white px-6 py-2 rounded float-right">
        <ArrowUpFromBracketOutline class="w-6 h-6 mr-1 text-white-800" /> Download</button></a> 
        </div> </label>
  </div>
</div>
<br/><br/><hr/><br/>


Di situs web aplikasi Sipapaode, Anda dapat mengakses berbagai layanan dan informasi terkait kerjasama serta pengelolaan pemerintahan di Provinsi Sulawesi Tenggara. Fasilitas yang tersedia mencakup informasi kebijakan, data statistik, dan platform komunikasi untuk meningkatkan kolaborasi antar instansi dan masyarakat demi pembangunan yang lebih baik.
<br/><br/>
<div class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1" style="margin-bottom:12px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
 <div> <img src={ImageKSwasta} alt="kerjasama pihak swasta" style="border-radius:50%;width:50px;height:50px;"></div>
 <div  class="col-span-11 mr-3" style="background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Pengajuan kerjasama dengan pihak ketiga atau antar pemerintah dapat dilakukan secara online kepada Pemerintah Provinsi Sulawesi Tenggara. </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1" style="margin-bottom:12px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <div> <img src={ImageKLuarNegeri} alt="kerjasama pihak swasta" style="border-radius:50%;width:50px;height:50px;"></div>
  <div  class="col-span-11 mr-3" style="background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Pendataan laporan evaluasi kerjasama antara Pemerintah Kab/Kota Prov. Sulawesi Tenggara dan Pusat dilakukan untuk meningkatkan sinergi dan efektivitas program. </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1" style="margin-bottom:12px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <div> <img src={PenataanWilayahimg} alt="kerjasama pihak swasta" style="border-radius:50%;width:50px;height:50px;"></div>
  <div  class="col-span-11 mr-3" style="background-color: #f5f5f5;padding: 15px;border-radius: 10px;"> Informasi dan pelaporan SPM di Sulawesi Tenggara mencakup fasilitas yang diterapkan oleh Pemerintah Daerah Kabupaten/Kota untuk meningkatkan pelayanan. </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1" style="margin-bottom:12px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <div> <img src={KodeWilayahimg} alt="kerjasama pihak swasta" style="border-radius:50%;width:50px;height:50px;"></div>
  <div  class="col-span-11 mr-3" style="background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Akses informasi wilayah pemerintahan dari Pemerintah Provinsi dan Kabupaten/Kota, lengkap dengan pemetaan GIS dan rupabumi yang akurat. </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1" style="margin-bottom:12px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <div> <img src={penerbitanSKimg} alt="kerjasama pihak swasta" style="border-radius:50%;width:50px;height:50px;"></div>
  <div  class="col-span-11 mr-3" style="background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Penerbitan Surat Keputusan (SK) Pemerintahan melibatkan proses resmi, termasuk SK Gubernur terkait pengajuan keberangkatan luar negeri, memastikan kepatuhan terhadap regulasi dan prosedur yang berlaku. </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1" style="margin-bottom:12px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <div> <img src={laporanimg} alt="kerjasama pihak swasta" style="border-radius:50%;width:50px;height:50px;"></div>
  <div  class="col-span-11 mr-3" style="background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Laporan LPPD dan LKPJ menyajikan evaluasi kinerja penyelenggaraan pemerintahan daerah serta akuntabilitas pengelolaan sumber daya dan program. </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-1" style="margin-bottom:12px;background-color: #fff;padding:16px;border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
  <div> <img src={Inventarisasiotonomi} alt="kerjasama pihak swasta" style="border-radius:50%;width:50px;height:50px;"></div>
  <div  class="col-span-11 mr-3" style="background-color: #f5f5f5;padding: 15px;border-radius: 10px;">Inventarisasi penataan urusan daerah otonomi baru di Sulawesi Tenggara mencakup evaluasi, pengelolaan sumber daya, dan pemberdayaan masyarakat. </div>
 </div>


<br/><br/>

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
    padding: 16px 20px;
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

