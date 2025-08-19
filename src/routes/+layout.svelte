<script>import Header from './Header.svelte';
import '../app.css';

import { Footer, FooterCopyright, FooterLinkGroup, FooterLink, FooterBrand } from 'flowbite-svelte';
import logo from '$lib/images/SipapaOde-logo.webp';
import { MapPinAltOutline, BuildingOutline } from 'flowbite-svelte-icons';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

<Footer footerType="logo">
	<div class="sm:flex sm:items-center sm:justify-between">
	  <FooterBrand href="/" src={logo} alt="Logo" name="SiPaPaODe" style="color:rgb(60, 93, 124);"/>
	   <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
		<FooterLink href="/profil-bidang-kerjasama" style="color:rgb(60, 93, 124);">Bidang Kerjasama</FooterLink>
		<FooterLink href="/profil-bidang-pemerintahan" style="color:rgb(60, 93, 124);">Bidang Pemerintahan</FooterLink>
		<FooterLink href="/profil-bidang-otonomi" style="color:rgb(60, 93, 124);">Bidang Otonomi Daerah</FooterLink> 
	  </FooterLinkGroup>
	  
	</div> <br/>
	 <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
		<FooterLink href="/about" style="color:rgb(60, 93, 124);">About</FooterLink>
		<FooterLink href="/profil#Alamat" style="color:rgb(60, 93, 124);">Contact</FooterLink> 	
	  </FooterLinkGroup>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright href="/" by="SiPapaOde" /> 
	<span class="block text-sm text-gray-500 sm:text-center" style="color: #6b7280;"> <BuildingOutline class="w-4 h-4 align-middle inline" /> Biro Pemerintahan & Otonomi Daerah - Sulawesi Tenggara 
    <br/> <MapPinAltOutline class="w-4 h-4 align-middle inline" /> <span>Kompleks Bumi Praja Anduonohu, Kecamatan Poasia, Kota Kendari, Sulawesi Tenggara 93231</span>
	</span>
<br/>

  </Footer>

</div>


<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 1rem;
		width: 100%;
		max-width: 84rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
