<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Tabs, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { ArrowRightAltOutline, MoonOutline, BuildingSolid, ArrowUpRightFromSquareSolid } from 'flowbite-svelte-icons';
    import PicProfileM from '$lib/images/ProfileM.webp';
	import PicProfileF from '$lib/images/ProfileF.webp';
    import PicKabagKS from '$lib/images/Hidayat.webp';
	import Karo from '$lib/images/Karo.webp';
    import PicTU from '$lib/images/Irma-Fitayanti.webp';

   // Variabel untuk mempermudah akses data Pegawai di HTML
    // Menggunakan $: (reactive statement) agar otomatis update jika data berubah
    $: pegawai = data.pegawaiByJabatan || {};

    // Pejabat Utama
    $: kepalaBiro = pegawai['Kepala Biro'];
    $: kabidTU = pegawai['Kepala Bidang Tata Usaha']; // Sesuai nama jabatan di DB
    $: kabidKS = pegawai['Kepala Bidang Kerjasama'];
    $: koorPemerintahan = pegawai['Kepala Bidang Koordinator Pemerintahan'];
    $: koorOtda = pegawai['Kepala Bidang Koordinator Otonomi Daerah'];

    // Staff Kerjasama
    $: staffKS1 = pegawai['Staff I Bidang Kerjasama'];
    $: staffKS2 = pegawai['Staff II Bidang Kerjasama'];
    $: staffKS3 = pegawai['Staff III Bidang Kerjasama'];

    // Staff Pemerintahan
    $: staffPemerintahan1 = pegawai['Staff I Bidang Koordinator Pemerintahan'];
    $: staffPemerintahan2 = pegawai['Staff II Bidang Koordinator Pemerintahan'];
    $: staffPemerintahan3 = pegawai['Staff III Bidang Koordinator Pemerintahan'];

    // Staff Otonomi Daerah
    $: staffOtda1 = pegawai['Staff I Bidang Koordinator Otonomi Daerah'];
    $: staffOtda2 = pegawai['Staff II Bidang Koordinator Otonomi Daerah'];
    $: staffOtda3 = pegawai['Staff III Bidang Koordinator Otonomi Daerah'];


</script>

<svelte:head>
	<title>Profil Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara</title>
	<meta name="description" content="Profil Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/>

<div class="page-container">
  <header class="header-card">
    <div class="logo">   <img src="/LogoSultra.webp" class="card-img-top" alt="Gambar logo sultra"/></div>
    <div class="title-container">
      <h1>BIRO PEMERINTAHAN DAN OTONOMI DAERAH</h1>
      <h2>PROV. SULAWESI TENGGARA</h2>
    </div>
  </header>

  <nav class="nav-container">
    <a href="#profil" class="nav-button">PROFIL</a>
    <a href="#visi-misi" class="nav-button">VISI MISI</a>
    <a href="#tupoksi" class="nav-button">TUPOKSI</a>
    <a href="#bidang" class="nav-button">BIDANG-BIDANG</a>
    <a href="#struktur" class="nav-button">STRUKTUR ORGANISASI</a>
    <a href="#alamat" class="nav-button">ALAMAT</a>
  </nav>

</div>


<div class="container">
<Heading id="profil" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Profil</Heading>
<br/>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Selayang Pandang</Heading>
<div style="padding:8px 16px;background:#f9fafb;border-radius:12px;">Biro Pemerintahan dan Otonomi Daerah Sekretariat Daerah Provinsi Sulawesi Tenggara dipimpin oleh Kepala Biro yang berkedudukan dibawah dan bertanggung jawab kepada Gubernur melalui Sekretaris Deaerah yang dibentuk berdasarkan 
Peraturan Daerah Provinsi Sulawesi Tenggara Nomor 11 Tahun 2012 Tentang Organisasi dan Tata Kerja Sekretariat Daerah Provinsi dan Tata Kerja Sekretariat Dewan Perwakilan Rakyat Daerah Provinsi Sulawesi Tenggara, dan
dijabarkan dalam Peraturan Gubernur Sulawesi Tenggara Nomor 43 Tahun 2020 tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi, Serta Tata Kerja Biro Pemerintahan dan Otonomi Daerah.</div>
 <br/><br/> <hr/>

 <Heading id="visi-misi" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Visi Misi</Heading>
 <br/>
 <Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Visi</Heading>
 <div style="padding:8px 16px;background:#f9fafb;border-radius:12px;">Pembangunan Sulawesi Tenggara periode Pemerintahan tahun 2018-2023 adalah terwujudnya Sulawesi Tenggara yang aman, maju, sejahtera dan bermartabat.</div> <br/><br/>
 
 <Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Misi</Heading>
 <div style="padding:8px 16px;background:#f9fafb;border-radius:12px;">
 1. Meningkatkan kualitas hidup masyarakat agar dapat berdaulat dan aman dalam bidang ekonomi, pangan, lingkungan, politik serta iman dan taqwa. <br/>
 2. Memajukan daya saing wilayah melalui penguatan ekonomi lokal dan peningkatan investasi. <br/>
 3. Mewujudkan birokrasi pemerintahan provinsi yang modern, tata kelola pemerintahan desa yang baik (good village governance) serta pengingkatan kapasitas pemerintahan kecamatan dan kelurahan sebagai pusat pelayanan pemerintahan. <br/>
 4. Meningkatkan konektivitas dan kemitraan antara pemerintah, swasta dan masyarakat dalam rangka pengingkatan daya saing daerah melalui pembangunan dan perbaikan infrastruktur, social ekonomi. <br/>
 5. Pembangunan yang bertumpu pada pelestarian sumber daya alam dan peningkatan nilai tambah dalam rangka peningkatan daya saing daerah.
 </div><br/><br/>
 <hr/>

 <Heading id="tupoksi" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Tupoksi</Heading> 
 <Tabs class="mt-4">
    <TabItem open title="Tugas Pokok">
      <p class="text-2sm text-gray-500 dark:text-gray-400">
        <b>Biro Pemerintahan dan Otonomi Daerah mempunyai tugas antara lain:</b> <br/><br/>
        a. Membantu Asisten Pemerintahan dan Kesejahteraan Rakyat dalam penyiapan perumusan kebijakan daerah, pengkoordinasian pelaksanaan tugas Perangkat Deaerah, pemantauan dan Evaluasi
        pelaksanaan kebijakan di bidang pemerintahan, otonomi daerah dan kerjasama. <br/>
        b. Menyiapkan bahan perumusan kebijakan daerah, pengkoordinasian perumusan kebijakan daerah, pengkoordinasian pelaksanaan tugas perangkat dearah,
        pemantauan dan evaluasi pelaksanaan kebijakan daerah di bidang administrasi pemerintahan dan fasilitasi penataan wilayah, pemerintahan umum dan melaksanakan
        urusan tata usaha biro. <br/>
        c. Menyiapkan bahan perumusan kebijakan daerah, pengkoordinasian pelaksanaan tugas perangkat daerah, pemantauan dan evaluasi pelaksanaan kebijakan daerah di bidang administrasi kepala daerah dan
        DPRD, pengembangan otonomi daerah dan penataan urusan, evaluasi dan penyelenggaraan pemerintahan. <br/>
        d. Menyiapkan bahan perumusan kebijakan daerah, pengkoordinasian perumusan kebijakan daerah, pengkoordinasian perumusan kebijakan daerah, pengkoordinasian pelaksaan tugas perangkata daerah,
        pemantauan dan evaluasi pelaksanaan kebijakan daerah di bidang kerjasama antar pemerintah, kerjasama badan usaha/swasta, serta evaluasi pelaksanaan kerjasama.
      </p>
    </TabItem>
    <TabItem title="Fungsi">
      <p class="text-2sm text-gray-500 dark:text-gray-400">
       <b>Biro Pemerintahan dan Otonomi Daerah menyelenggarakan fungsi:</b> <br/><br/>
       a. Penyiapan perumusan kebijakan daerah di bidang pemerintahan, otonomi daerah dan kerjasama; <br/>
       b. Penyiapan pengkoordinasian pelaksanaan tugas perangkat daerah di bidang pemerintahan, otonomi daerah dan kerjasama. <br/>
       c. Penyiapan pemantauan dan evaluasi pelaksanaan kebijakan di bidang pemeritahan, otonomi daerah dan kerjasama; <br/>
       d. Penyiapan bahan perumusan kebijakan daerah di bidang administrasi pemerintahan dan fasilitasi penataan wilayah serta pemerintahan umum; <br/>
       e. Penyiapan bahan pengkoordinasian perumusan kebijakan daerah di bidang administrasi pemerintahan dan fasilitasi penataan wilayah serta pemerintahan umum; <br/>
       f. Penyiapan bahan pemantauan dan evaluasi pelaksanaan kebijakan daerah di bidang administrasi pemerintahan dan fasilitasi penataan wilayah serta pemerintahan umum; <br/>
       g. Pelaksaan urusan tata usaha; <br/>
       h. Penyiapan bahan perumusan kebijakan daerah di bidang administrasi kepala daerah dan DPRD, pengembangan otonomi daerah dan penataan urusan, evaluasi dan penyelenggaran pemerintahan; <br/>
       i. Penyiapan bahan pengkoordinasian pelaksaan tugas Perangkat Daerah di bidang administrasi kepala daerah dan DPRD, pengembangan otonomi daerah dan penataan urusan, evaluasi dan penyelenggaraan pemerintahan; <br/>
       j. Penyiapan bahan pemantauan dan evaluasi pelaksanaan kebijakan daerah di bidang administrasi kepala daerah dan DPRD, pengembangan otonomi daerah dan penataan urusan, evaluasi dan penyelenggaraan pemerintahan; <br/>
       k. Penyiapan bahan perumusan kebijakan daerah di bidang kerjasama antar pemerintah kerjasama badan usaha/swasta, evaluasi pelaksanaan kerjasama; <br/>
       l. Penyiapan bahan pengkoordinasian perumusan kebijakan daerah di bidang kerjasama antar pemerintah kerjasama badan usaha/swasta, evaluasi pelaksanaan kerjama <br/>
       m. Penyiapan bahan pengkoordinasian pelaksanaan tugas perangkat daerah di bidang kerjasama antara pemerintah kerjasama badan usaha/swasta, evaluasi pelaksanaan kerjasama; <br/>
       n. Penyiapan bahan pemantauan dan evaluasi pelaksanaan kebijakan daerah di bidang kerjasama antar pemerintah kerjasama badan usaha/swasta, evaluasi pelaksanaan kerjasama; <br/>
       o. Pelaksanaan fungsi lain yang diberikan oleh Asisten Bidang Pemerintahan dan Kesejahteraan Masyarakat sesuai dengan tugas dan fungsinya.
      </p>
    </TabItem>
  </Tabs> <br/><br/>
 <hr/>

<Heading id="bidang" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Bidang-Bidang</Heading>
<br/>
<a href="/profil-tata-usaha" class="no-underline text-inherit group"><Heading tag="h4" class="mb-4" customSize="flex items-center gap-2 text-2xl text-left font-extrabold md:text-3xl lg:text-3xl"><ArrowRightAltOutline class="w-10 h-10 align-middle inline" /> Sub Bagian Tata Usaha <ArrowUpRightFromSquareSolid class="shrink-0 h-8 w-8 transition-transform duration-300 ease-in-out group-hover:translate-x-1" /></Heading></a>
<a href="/profil-bidang-kerjasama" class="no-underline text-inherit group"><Heading tag="h4" class="mb-4" customSize="flex items-center gap-2 text-2xl text-left font-extrabold md:text-3xl lg:text-3xl"><ArrowRightAltOutline class="w-10 h-10 align-middle inline" /> Bagian Kerjasama <ArrowUpRightFromSquareSolid class="shrink-0 h-8 w-8 transition-transform duration-300 ease-in-out group-hover:translate-x-1" /></Heading></a>
<a href="/profil-bidang-pemerintahan" class="no-underline text-inherit group"><Heading tag="h4" class="mb-4" customSize="flex items-center gap-2 text-2xl text-left font-extrabold md:text-3xl lg:text-3xl"><ArrowRightAltOutline class="w-10 h-10 align-middle inline" /> Koordinator Pemerintahan <ArrowUpRightFromSquareSolid class="shrink-0 h-8 w-8 transition-transform duration-300 ease-in-out group-hover:translate-x-1" /></Heading></a>
<a href="/profil-bidang-otonomi" class="no-underline text-inherit group"><Heading tag="h4" class="mb-4" customSize="flex items-center gap-2 text-2xl text-left font-extrabold md:text-3xl lg:text-3xl"><ArrowRightAltOutline class="w-10 h-10 align-middle inline" /> Koordinator Otonomi Daerah <ArrowUpRightFromSquareSolid class="shrink-0 h-8 w-8 transition-transform duration-300 ease-in-out group-hover:translate-x-1" /></Heading></a>
<br/><br/><hr/>


<!-- SECTION STRUKTUR ORGANISASI-->

<Heading id="struktur" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Struktur Organisasi</Heading>
<br/>
<div id="container_org">
    <ol class="static-org-chart">
        <li>
            <div class="staff_card">
                <div class="staff_title">
                    Kepala Biro Pemerintahan & OTDA
                </div>
                <div class="staff_info">
                    <div class="staff_image">
                        <img src={kepalaBiro?.URL_PhotoProfile || (kepalaBiro ? (kepalaBiro.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM)} class="card-img-top" alt="Kepala Biro" />
                    </div>
                    <div class="staff_name_container">
                        {kepalaBiro?.Nama || 'Jabatan Kosong'}
                    </div>
                </div>
            </div>

            <ol id="first">
                <li>
                    <div class="staff_card" style="width:280px !important;padding:6px;height:100px;"> 
                        <img src={kabidTU?.URL_PhotoProfile || (kabidTU ? (kabidTU.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } style="width:60px;height:60px;border-radius:50%;" alt="Kasubag TU" />
                        <div>Kasubag. Tata Usaha <br><label style="font-weight: 100;">{kabidTU?.Nama || 'Jabatan Kosong'}</label></div>
                    </div>
                </li>
            </ol>

            <ol id="second">
                <li>
                    <div class="staff_card">
                        <div class="staff_title">Kabag. Kerjasama</div>
                        <div class="staff_info">
                            <div class="staff_image">
                                <img src={kabidKS?.URL_PhotoProfile || (kabidKS ? (kabidKS.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } class="card-img-top" alt="Kabid Kerjasama" />
                            </div>
                            <div class="staff_name_container">{kabidKS?.Nama || 'Jabatan Kosong'}</div>
                        </div>
                    </div>
                    <div><div>{staffKS1?.Nama || 'Posisi Staff Kosong'}</div></div>
                    <div><div>{staffKS2?.Nama || 'Posisi Staff Kosong'}</div></div>
                    <div><div>{staffKS3?.Nama || 'Posisi Staff Kosong'}</div></div>
                </li>

                <li>
                    <div class="staff_card">
                        <div class="staff_title">Kabag. Koordinator Pemerintahan</div>
                        <div class="staff_info">
                            <div class="staff_image">
                                <img src={koorPemerintahan?.URL_PhotoProfile || (koorPemerintahan ? (koorPemerintahan.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } class="card-img-top" alt="Koord. Pemerintahan"/>
                            </div>
                            <div class="staff_name_container">{koorPemerintahan?.Nama || 'Jabatan Kosong'}</div>
                        </div>
                    </div>
                    <div><div>{staffPemerintahan1?.Nama || 'Posisi Staff Kosong'}</div></div>
                    <div><div>{staffPemerintahan2?.Nama || 'Posisi Staff Kosong'}</div></div>
                    <div><div>{staffPemerintahan3?.Nama || 'Posisi Staff Kosong'}</div></div>
                </li>

                <li>
                    <div class="staff_card">
                        <div class="staff_title">Kabag. Koordinator Otonomi Daerah</div>
                        <div class="staff_info">
                            <div class="staff_image">
                                <img src={koorOtda?.URL_PhotoProfile || (koorOtda ? (koorOtda.Jenis_Kelamin === 'Wanita' ? PicProfileF : PicProfileM) : PicProfileM) } class="card-img-top" alt="Koord. Otda"/>
                            </div>
                            <div class="staff_name_container">{koorOtda?.Nama || 'Jabatan Kosong'}</div>
                        </div>
                    </div>
                     <div><div>{staffOtda1?.Nama || 'Posisi Staff Kosong'}</div></div>
                    <div><div>{staffOtda2?.Nama || 'Posisi Staff Kosong'}</div></div>
                    <div><div>{staffOtda3?.Nama || 'Posisi Staff Kosong'}</div></div>
                </li>
            </ol>
        </li>
    </ol>
</div>

<br/>
<!-- END SECTION STRUKTUR ORGANISASI-->
<br/><br/>
 <hr/>

 <Heading id="alamat" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Alamat dan Kontak</Heading>
 
 <div class="block grid-cols-12 gap-4 md:flex lg:flex">
  <div><BuildingSolid class="w-16 h-16 align-middle inline" /></div>
  <div class="col-span-10 text-2xl font-extrabold">Biro Pemerintahan dan Otonomi Daerah<br/>Sulawesi Tenggara <br/>
  <span class="text-lg font-normal">Kompleks Bumi Praja Anduonohu, Kecamatan Poasia, <br/>Kota Kendari, Sulawesi Tenggara 93231 <br/>
  </span>
  </div>
</div>
 


<hr/> <br/><br/>

</div>

<style>

/** CSS HEADER */
 /* Penataan Halaman Utama */
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family);
    padding: 0.5rem;
    
  }

  /* Kartu Header */
  .header-card {
    background-color: var(--primary-bg);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 1220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    background-color: #f7fafc;
  }

  /* Logo */
  .logo {
    width: 120px;
    height: 120px;
    background-color: var(--logo-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-text);
    margin-bottom: 1.5rem;
  }
  
  /* Kontainer Judul */
  .title-container {
    text-align: center;
    color: var(--primary-text);
  }

  .title-container h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .title-container h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0.25rem 0 0 0;
  }

  /* Kontainer Tombol Navigasi */
  .nav-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 920px; /* Sedikit lebih lebar dari header */
  }

  /* Tombol Navigasi */
  .nav-button {
    background-color: var(--primary-bg);
    color: var(--primary-text);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.9rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    text-align: center;
    background: #f7fafc;
  }

  .nav-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: #f1f9ff;
 
  }

  /* Penyesuaian untuk layar lebih kecil */
  @media (max-width: 768px) {
    .header-card {
      padding: 1.5rem 1rem;
    }
    .logo {
      width: 90px;
      height: 90px;
      font-size: 1.2rem;
    }
    .title-container h1 {
      font-size: 1.25rem;
    }
    .title-container h2 {
      font-size: 1rem;
    }
    .nav-container {
      flex-direction: column;
      align-items: center;
    }
    .nav-button {
      width: 80%;
    }
  }

  /**CSS Organization  **/
#container_org {
    padding: 10px;
}
ol.static-org-chart,
ol.static-org-chart ol,
ol.static-org-chart li,
ol.static-org-chart li > div {
    position: relative;
}
ol.static-org-chart,
ol.static-org-chart ol {
    list-style: none;
    margin: 0;
    padding: 0;
}
ol.static-org-chart {
    text-align: center;

}
ol.static-org-chart ol {
    padding-top: 1em;
}
ol.static-org-chart ol:before,
ol.static-org-chart ol:after,
ol.static-org-chart li:before,
ol.static-org-chart li:after,
ol.static-org-chart > li > div:before,
ol.static-org-chart > li > div:after {
    background-color: #a4acb1 ; 
    content: "";
    position: absolute;
}
ol.static-org-chart ol > li {
    padding: 1em 0 0 1em;
}
ol.static-org-chart > li ol:before {
    height: 1em;
    left: 50%;
    top: 0;
    width: 3px;
}
ol.static-org-chart > li ol:after {
    height: 3px;
    left: 3px;
    top: 1em;
    width: 50%;
}
ol.static-org-chart > li ol > li:not(:last-of-type):before {
    height: 3px;
    left: 0;
    top: 2em;
    width: 1em;
}
ol.static-org-chart > li ol > li:not(:last-of-type):after {
    height: 105%;
    left: 0;
    top: 0;
    width: 3px;
}
ol.static-org-chart > li ol > li:last-of-type:before {
    height: 3px;
    left: 0;
    top: 2em;
    width: 1em;
}
ol.static-org-chart > li ol > li:last-of-type:after {
    height: 2em;
    left: 0;
    top: 0;
    width: 3px;
}
/*** PRIMARY ***/
ol.static-org-chart > li > div {
    margin-left: 1em;
}
ol.static-org-chart > li > div:before {
    bottom: 2em;
    height: 3px;
    left: -1em;
    width: 1em;
}
ol.static-org-chart > li > div:first-of-type:after {
    bottom: 0;
    height: 2em;
    left: -1em;
    width: 3px;
}
ol.static-org-chart > li > div + div {
    margin-top: 1em;
}
ol.static-org-chart > li > div + div:after {
    height: calc(100% + 1em);
    right: -1em;
    top: -1em;
    width: 3px;
}
/*** SECONDARY ***/
ol.static-org-chart > li > ol:before {
    left: 0;
    right: inherit;
}
ol.static-org-chart > li > ol:after {
    left: 0;
    width: 100%;
}
ol.static-org-chart > li #first:after {
    width: 0%;
}
ol.static-org-chart #second:after {
    width: 0%;
}
ol.static-org-chart #second:before {
    height: 6em !important;
    left: 0 !important;
    top: -5em !important;
}
ol.static-org-chart #first > li > div {
	     height: 78px;
        width: 200px !important;
        color: #555a62 !important;
        background: linear-gradient(147deg, rgba(255, 255, 255, 1) 21%, rgba(254, 254, 255, 1) 32%, rgba(226, 237, 255, 1) 100%, rgba(229, 231, 235, 1) 100%);
        border-radius: 12px;
      
        font-weight: 600;
}
ol.static-org-chart #first > li > div > div {
    position: relative;
    top: -30%;
    transform: translateY(-50%);
	right:-76px;
  width: 180px;
  text-align:right;
}
/*** MEDIA QUERIES ***/
@media only screen and (min-width: 50em) {
    ol.static-org-chart #second:before {
        height: 7em !important;
        left: 50% !important;
        top: -6em !important;
        width: 3px !important;
    }
    ol.static-org-chart {
        margin-left: -1em;
        margin-right: -1em;
    }
    /* PRIMARY */
    ol.static-org-chart > li > div {
        display: inline-block;
        float: none;
        margin: 0 1em 1em 1em;
        vertical-align: bottom;
    }
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(2),
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(2) ~ div {
        width: calc((100% / 2) - 2em - 4px);
    }
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(3),
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(3) ~ div {
        width: calc((100% / 3) - 2em - 4px);
    }
   
    ol.static-org-chart > li > div:before,
    ol.static-org-chart > li > div:after {
        bottom: -2.7em !important;
        top: inherit !important;
    }
    ol.static-org-chart > li > div:before {
        height: 2.7em !important;
        left: 50% !important;
        width: 3px !important;
    }
    ol.static-org-chart > li > div:only-of-type:after {
        display: none;
    }
    ol.static-org-chart > li > div:first-of-type:not(:only-of-type):after,
    ol.static-org-chart > li > div:last-of-type:not(:only-of-type):after {
        bottom: -1em;
        height: 3px;
        width: calc(50% + 1em + 3px);
    }
    ol.static-org-chart > li > div:first-of-type:not(:only-of-type):after {
        left: calc(50% + 3px);
    }
    ol.static-org-chart > li > div:last-of-type:not(:only-of-type):after {
        left: calc(-1em - 3px);
    }
    ol.static-org-chart > li > div + div:not(:last-of-type):after {
        height: 3px;
        left: -2em;
        width: calc(100% + 4em);
    }
    /* SECONDARY */
    ol.static-org-chart > li > ol {
        display: flex;
        flex-wrap: nowrap;
    }
    ol.static-org-chart > li > ol:before,
    ol.static-org-chart > li > ol > li:before {
        height: 1em !important;
        left: 50% !important;
        top: 0px !important;
        width: 3px !important;
    }
    
    ol.static-org-chart > li > ol:before {
        height: 0.2em !important;
        left: 8% !important;
        width: calc((100% / 2.2) - 1.5em - 10px) !important;
        top: 50px !important;
    }
    


    ol.static-org-chart > li > ol > li {
        flex-grow: 1;
        padding-left: 1em;
        padding-right: 1em;
        padding-top: 1em;
    }
    ol.static-org-chart > li > ol > li:only-of-type {
        padding-top: 0;
    }
    ol.static-org-chart > li > ol > li:only-of-type:before,
    ol.static-org-chart > li > ol > li:only-of-type:after {
        display: none;
    }
    ol.static-org-chart > li > ol > li:first-of-type:not(:only-of-type):after,
    ol.static-org-chart > li > ol > li:last-of-type:not(:only-of-type):after {
        height: 3px;
        top: 0;
        width: 50%;
    }
    ol.static-org-chart > li > ol > li:first-of-type:not(:only-of-type):after {
        left: 50%;
    }
    ol.static-org-chart > li > ol > li:last-of-type:not(:only-of-type):after {
        left: 0;
    }
    ol.static-org-chart > li > ol > li + li:not(:last-of-type):after {
        height: 3px;
        left: 0;
        top: 0;
        width: 100%;
    }
    ol.static-org-chart #first > li > div {
        height: 80px;
        width: 150px;
        color: #fff;
        background-color: #000053;
    }
    ol.static-org-chart #first > li > div > div {
        width: 180px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: -20%;
		right:-30px;
		text-align: right;
        transform: translateY(-50%);
    }
}
ol.static-org-chart .staff_card {
    width: 300px !important;
    min-width: 250px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);
	border-radius:12px;
}
ol.static-org-chart .staff_title {
    height: 50px;
    text-align: center;
    background: linear-gradient(147deg, rgba(255,255,255,1) 21%, rgba(254,254,255,1) 32%, rgba(226,237,255,1) 100%, rgba(229,231,235,1) 100%);
    color: #555a62;
    padding: 10px;
    font-weight: bold;
	border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
ol.static-org-chart .staff_info {
    height: 80px;
    padding: 5px;
}
ol.static-org-chart .staff_image img {
    border-radius: 100px;
    width: 60px;
}
ol.static-org-chart .staff_image {
    float: left;
    width: 30%;
}
ol.static-org-chart .staff_name_container {
    padding-top: 15px;
    float: right;
    width: 60%;
}

ol.static-org-chart #second > li > div:not(:first-child) {
    height: 60px;
    width: 300px;
    background: linear-gradient(147deg, rgba(255,255,255,1) 21%, rgba(254,254,255,1) 32%, rgba(226,237,255,1) 100%, rgba(229,231,235,1) 100%);
    color:  #000053; 
    font-size: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-bottom: 0.4rem;
    border-radius:12px;
}
ol.static-org-chart #second > li > div:not(:first-child) > div {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
ol.static-org-chart #second > li > div:not(:first-child):hover {
    background: white;
    box-shadow: none;
}
ol.static-org-chart .staff_card + div {
    margin-top: 10px;
}

.staff_card:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
}


</style>