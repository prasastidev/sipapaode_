<script>import Header from './Header.svelte';
import '../app.css';
import { user } from '$lib/user';
import { Footer, FooterCopyright, FooterLinkGroup, FooterLink, FooterBrand } from 'flowbite-svelte';
import logo from '$lib/images/SipapaOde-logo.webp';
import { MapPinAltOutline, BuildingOutline } from 'flowbite-svelte-icons';
</script>

<div class="app">
	<Header></Header>
	

	<main>
		<slot></slot>
	</main>

<Footer footerType="logo">
	<div class="sm:flex sm:items-center sm:justify-between">
	  <FooterBrand href="/" src={logo} alt="Logo" name="SiPaPaODe" />
	  <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
		<FooterLink href="/">About</FooterLink>

		<FooterLink href="/profil#Alamat">Contact</FooterLink>
	  </FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright href="/" by="SiPapaOde" /> 
	<span class="block text-sm text-gray-500 sm:text-center" style="color: #6b7280;"> <BuildingOutline class="w-4 h-4 align-middle inline" /> Biro Pemerintahan & Otonomi Daerah - Sulawesi Tenggara 
    <br/> <MapPinAltOutline class="w-4 h-4 align-middle inline" /> <span>Kompleks Bumi Praja Anduonohu, Kecamatan Poasia, Kota Kendari, Sulawesi Tenggara 93231</span>
	</span>
<br/>
{#if $user}
	<div>Anda telah login sebagai 
		<span>{$user.name}</span>
		<button type="button" on:click={user.logout}>Logout</button>		
	</div> 
	{:else}
	  <p>Hello Anda belum login</p>
	{/if}
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
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
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
