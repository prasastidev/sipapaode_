<script>
	
	import { page } from '$app/stores';
	import { user } from '$lib/user';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider, Tooltip } from 'flowbite-svelte';
	import logo from '$lib/images/LogoSultradan-Sipapode.webp';
	import sultraicon from '$lib/images/Sultra-Icon.webp';
	import { ChevronDownOutline, UserCircleSolid } from 'flowbite-svelte-icons';
    $: activeUrl = $page.url.pathname;

	
</script>

<header>
	
	<Navbar class="sticky w-full z-20 top-0 start-0 py-0.6 border-b-indigo-500" style="background-color: var(--color-bg-1);
background-size: 100vw 100vh;background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);box-shadow:rgb(186 186 199 / 40%) 0px 2px 4px;
border-bottom-left-radius: 24px;border-bottom-right-radius: 24px;"> 
    <NavBrand href="/" style="color:#3C5D7C;flex-wrap: nowrap;">
      <img src={logo} class="me-2" alt="Logo" style="width:140px;height:45px;" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SIPAPAODE</span>
    </NavBrand> 
    <NavHamburger /> 
    <NavUl {activeUrl} class="text-2sm">
      <NavLi href="/" style="color:rgb(60, 93, 124);font-size:15px;padding: 4px 10px;background:#F1F5F8;border-radius: 8px;box-shadow: #5A86AF 5px 5px;">Beranda</NavLi>
      <NavLi class="cursor-pointer" style="color:rgb(60, 93, 124);font-size:15px;padding: 4px 10px; background:#F1F5F8;border-radius: 8px;box-shadow: #5A86AF 5px 5px">
        Profil <ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
        <Dropdown class="w-64 z-20" style="width:320px;">
          <DropdownItem href="/profil" class="text-[#4a494d]">Selayang Pandang</DropdownItem>
          <DropdownItem href="/profil/#bidang" class="text-[#4a494d]">Bidang-Bidang</DropdownItem>
          <DropdownItem href="/profil/#visi-misi" class="text-[#4a494d]">Visi Misi</DropdownItem>
          <DropdownItem href="/profil/#struktur" class="text-[#4a494d]">Struktur Organisasi</DropdownItem>
          <DropdownItem href="/profil-pimpinan" class="text-[#4a494d]">Profil Pimpinan</DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/gallery" class="text-[#4a494d]">Gallery Foto & Kegiatan</DropdownItem>
		  <DropdownItem href="/journal-kegiatan" class="text-[#4a494d]">Time Line Journal Kegiatan</DropdownItem>
        </Dropdown>
      <NavLi id="mapsSultra" href="/maps-sultra" style="font-size:15px;color:#2e6c09;padding:4px 10px; background:#F1F5F8;border-radius: 8px;box-shadow:#5A86AF 5px 5px;"> <span style="font-size:20px;vertical-align:middle;">🗺️</span> Lanskap Sultra</NavLi>
      <Tooltip type='auto' triggeredBy="#mapsSultra" placement='bottom' class="w-72 md:w-80 lg:w-80">
        Informasi Geografis, Kode Wilayah, Pemerintahan, Rupa Bumi dan Grafik Kab/Kota di Provinsi Sulawesi Tenggara</Tooltip>
      <NavLi class="cursor-pointer" style="color:rgb(60, 93, 124);font-size:15px;padding: 4px 10px;background:#F1F5F8;border-radius: 8px;box-shadow:#5A86AF 5px 5px;">Laporan dan Informasi <ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-64 z-20" style="width:320px;">
		<DropdownItem href="/daftar-informasi-publik" class="text-[#4a494d]">Daftar Informasi Publik</DropdownItem>
		 <DropdownItem href="/formulir-pengajuan-informasi-publik" class="text-[#4a494d]">Formulir Permohonan Informasi Publik</DropdownItem>
        <DropdownItem href="/penyampaian-lppd" class="text-[#4a494d]">Informasi Laporan LPPD dan LPKJ</DropdownItem>
        <DropdownItem href="/pengiriman-evaluasi-kerjasama" class="text-[#4a494d]">Informasi Laporan Evaluasi Kerjasama</DropdownItem>
        <DropdownItem href="/data-pegawai" class="text-[#4a494d]">Infografis Data Pegawai</DropdownItem>
		<DropdownDivider />
		<DropdownItem href="/regulasi-produk" class="text-[#4a494d]">Produk Hukum (Download Center)</DropdownItem>
       <DropdownItem href="/berita-sulawesi-tenggara" class="text-[#4a494d]">Berita Terkini Sulawesi Tenggara</DropdownItem>
	</Dropdown>
      {#if $user}
        <div style="width: 120px;display:flex;color:#3C5D7C;">Hi, <a id="gotoDashboard" href="/dashboard-biro" style="display:flex;color:#3C5D7C;"><UserCircleSolid class="w-6 h-6" /> {$user.name}</a>
        </div>
        <Tooltip type='auto' triggeredBy="#gotoDashboard" placement='bottom' class="w-32">Masuk ke Dashboard Anda</Tooltip>
      {:else}
        <NavLi href="/login" style="border: 2px solid rgb(128, 138, 147);padding: 4px 10px;border-radius: 5px;vertical-align: middle;box-shadow: rgb(90, 134, 175) 5px 5px;background: white;font-size: 15px;">Dashboard</NavLi>
      {/if}
    </NavUl>
</Navbar>

</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	
</style>
