<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { user } from '$lib/user';
    import {  Sidebar, Toggle, SidebarWrapper, SidebarBrand, SidebarItem, SidebarGroup, SidebarDropdownItem, SidebarDropdownWrapper } from 'flowbite-svelte';
    import { ChartPieSolid, BadgeCheckSolid, ObjectsColumnSolid, BookSolid, BuildingSolid, LandmarkSolid, DrawSquareSolid, UserCircleSolid, UsersSolid, BullhornSolid, ArrowLeftToBracketOutline, FileCopyAltSolid } from 'flowbite-svelte-icons';
    let spanClass = 'flex-1 ms-3 whitespace-break-spaces';


  let site = {
    name: 'SIPAPAODE',
    href: '/dashboard-biro'
  };

 let sidebarShow = true;

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>


<br/><br/>
<div class="container max-w-full" style="width:100%;">
  <div style="border:2px solid #00b1ff;padding: 4px;border-radius:12px;width: max-content;"><Toggle class="w-64 text-base" bind:value={sidebarShow} checked={sidebarShow} on:click={() => (sidebarShow = !sidebarShow)}>
    <svelte:fragment slot="offLabel"></svelte:fragment> {sidebarShow ? 'Hilangkan Menu Sidebar' : 'Tampilkan Menu Sidebar'} 
  </Toggle></div> <br/>
  <div class="grid grid-cols-12 gap-1 w-full">
    {#if sidebarShow} 
    <div class="col-span-3 w-full">
        <Sidebar>
            <SidebarWrapper>
              <SidebarGroup>
                <div style="font-size: 24px;font-weight: 600;text-align: left;color:#6b7280">SIPAPAODE</div>
                <SidebarItem label="Dashboard" href="/dashboard-biro">
                  <svelte:fragment slot="icon">
                    <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
                <SidebarDropdownWrapper label="Bag. Kerjasama">
                  <svelte:fragment slot="icon">
                    <UsersSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <SidebarDropdownItem label="🔴 Data Formulir Pengajuan Kerjasama Secara Online" href="/dashboard-biro/data-formulir-online-kerjasama" class="pl-4 ps-8"/>
                  <SidebarDropdownItem label="📁 Data Rekapitulasi Kerjasama" href="/dashboard-biro/data-rekap-kerjasama" class="pl-4 ps-8"/>
                  <SidebarDropdownItem label="📑 Laporan Evaluasi Kerjasama" href="/dashboard-biro/laporan-evaluasi-kerjasama" class="pl-4 ps-8"/>
                  <SidebarDropdownItem label="🖼️ Gallery Photo Documentasi Kerjasama" href="/dashboard-biro/gallery-photo-kerjasama" class="pl-4 ps-8"/>
                </SidebarDropdownWrapper>
                <SidebarDropdownWrapper label="Koord. Pemerintahan" {spanClass} style="text-align: left;">
                  <svelte:fragment slot="icon">
                    <LandmarkSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <SidebarDropdownItem label="🗺️ Kode Data Wilayah Pemerintahan, Pulau dan Rupa Bumi" href="/dashboard-biro/lanskap-sultra" class="pl-4 ps-8" />
                </SidebarDropdownWrapper>
                  <SidebarDropdownWrapper label="Koord. Otonomi Daerah" {spanClass} style="text-align: left;">
                    <svelte:fragment slot="icon">
                      <BuildingSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                    <SidebarDropdownItem label="⭕ Laporan Pengiriman LPPD & LKPJ" href="/dashboard-biro/laporan-lppd" class="pl-4 ps-8" />
                    <SidebarDropdownItem label="📗 Data Dokumen LPPD & LKPJ" href="/dashboard-biro/rekap-lppd-lkpj" class="pl-4 ps-8" />
                    <SidebarDropdownItem label="🗂️ Arsip Dokumen SK" href="/dashboard-biro/arsip-sk" class="pl-4 ps-8" />
                  </SidebarDropdownWrapper>
                  <SidebarItem label="Tata Usaha (Data Pegawai)" href="#">
                    <svelte:fragment slot="icon">
                      <ObjectsColumnSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Status Layanan" href="/dashboard-biro/status-layanan">
                    <svelte:fragment slot="icon">
                      <BadgeCheckSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Banner Info (Pengumuman)" href="/dashboard-biro/banner-info">
                    <svelte:fragment slot="icon">
                      <BullhornSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                <SidebarItem label="Info Users" href="/dashboard-biro/info-users">
                  <svelte:fragment slot="icon">
                    <UserCircleSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
              <SidebarGroup border>
                <SidebarItem label="Keluar (Log Out)" on:click={user.logout}>
                  <svelte:fragment slot="icon">
                    <ArrowLeftToBracketOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
      </div>
      {/if}
      {#if sidebarShow} 
    <div class="col-span-9 w-full" style="margin-left:34px;width:100%;"><slot></slot></div>
    {:else}
    <div class="col-span-9 w-max-full" style="margin-left:34px;width: 1020px;"><slot></slot></div>
    {/if}
</div>

  <br/> <br/>
</div>

<style>
    .container {
        display: flex;
		flex-direction: column;
        margin-top: 30px;
        width: max-content;
    }
    
</style>