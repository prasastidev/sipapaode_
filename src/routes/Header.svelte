<script>
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import logo from '$lib/images/LogoSultradan-Sipapode.webp';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
    $: activeUrl = $page.url.pathname;
</script>

<header>


	<Navbar class="fixed w-full z-20 top-0 start-0  py-0.6 border-b-indigo-500" style="background-color: var(--color-bg-1);
    background-size: 100vw 100vh;
    background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);">		
		<NavBrand href="/">
		  <img src={logo} class="me-2" alt="Logo" style="width:140px;height:45px;" />
		  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SIPAPAODE</span>
		</NavBrand> 
		<NavHamburger  /> 
		<NavUl {activeUrl}>
		  <NavLi href="/">Beranda</NavLi>
		  <NavLi class="cursor-pointer">
			Profil <ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		  </NavLi>
		   <Dropdown class="w-44 z-20">
			<DropdownItem href="/profil" class="text-[#4a494d]">Selayang Pandang</DropdownItem>
			<DropdownItem href="/profil/#Bidang" class="text-[#4a494d]">Bidang-Bidang</DropdownItem>
			<DropdownItem href="/profil/#Visi" class="text-[#4a494d]">Visi Misi</DropdownItem>
			<DropdownItem href="/profil/#Struktur" class="text-[#4a494d]">Struktur Organisasi</DropdownItem>
			<DropdownItem href="/profil" class="text-[#4a494d]">Profil Pimpinan</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="/gallery" class="text-[#4a494d]">Gallery Foto & Kegiatan</DropdownItem>
		   </Dropdown>
		  <NavLi href="/maps-sultra">Lanskap Sultra</NavLi>
		  <NavLi class="cursor-pointer">Laporan dan Informasi <ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		  </NavLi>
		  <Dropdown class="w-44 z-20">
			<DropdownItem href="/penyampaian-lppd" class="text-[#4a494d]">Penyampaian LPPD dan LPKJ</DropdownItem>
			<DropdownItem href="/daftar-informasi-publik" class="text-[#4a494d]">Daftar Informasi Publik</DropdownItem>
			<DropdownItem href="/formulir-pengajuan-informasi-publik" class="text-[#4a494d]">Formulir Pengajuan Informasi oleh Publik</DropdownItem>
			<DropdownItem href="/profil" class="text-[#4a494d]">Regulasi / Produk Hukum</DropdownItem>
		   </Dropdown>
		  <NavLi href="/login" style="border: 2px solid #808a93;padding: 2px 14px;border-radius: 5px;vertical-align: middle;margin-top: -5px;">Masuk</NavLi>
		</NavUl>	
	  </Navbar>



</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	
</style>
