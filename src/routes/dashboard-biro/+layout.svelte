<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { user } from '$lib/user';
    import {  Sidebar, SidebarWrapper, SidebarBrand, SidebarItem, SidebarGroup, SidebarDropdownItem, SidebarDropdownWrapper } from 'flowbite-svelte';
    import { ChartPieSolid, BadgeCheckSolid, BuildingSolid, LandmarkSolid, DrawSquareSolid, UserCircleSolid, UsersSolid, BullhornSolid, ArrowLeftToBracketOutline, FileCopyAltSolid } from 'flowbite-svelte-icons';
    let spanClass = 'flex-1 ms-3 whitespace-break-spaces';

  let site = {
    name: 'SIPAPAODE',
    href: '/dashboard-biro',
    img: '/src/lib/images/SipapaOde-logo.webp'
  };

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>


<br/><br/>
<div class="container max-w-full">


<div class="grid grid-cols-12 gap-1 w-full">
 
    <div class="col-span-3 w-full">
        <Sidebar>
            <SidebarWrapper>
              <SidebarGroup>
                <SidebarBrand {site} />
                <SidebarItem label="Dashboard" href="/dashboard-biro">
                  <svelte:fragment slot="icon">
                    <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
                <SidebarDropdownWrapper label="Bag. Kerjasama">
                  <svelte:fragment slot="icon">
                    <UsersSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <SidebarDropdownItem label="Data Formulir Penawaran Kerjasama Secara Online" />
                  <SidebarDropdownItem label="Data Rekapitulasi Kerjasama Tahun Berjalan" href="/dashboard-biro/data-rekap-kerjasama" />
                </SidebarDropdownWrapper>
                <SidebarItem label="Koord. Pemerintahan" {spanClass} href="/dashboard-biro/pemerintahan">
                    <svelte:fragment slot="icon">
                      <LandmarkSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                    <svelte:fragment slot="subtext">
                      <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Koord. Otonomi Daerah" {spanClass} href="/dashboard-biro/otonomi-daerah">
                    <svelte:fragment slot="icon">
                      <BuildingSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                    <svelte:fragment slot="subtext">
                      <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Lanskap Sultra" href="/dashboard-biro/lanskap-sultra">
                    <svelte:fragment slot="icon">
                      <DrawSquareSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Laporan LPPD" href="/dashboard-biro/laporan-lppd">
                    <svelte:fragment slot="icon">
                      <FileCopyAltSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Status Layanan" href="/dashboard-biro/status-layanan">
                    <svelte:fragment slot="icon">
                      <BadgeCheckSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Banner Info" href="/dashboard-biro/banner-info">
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

    <div class="col-span-9 w-full" style="margin-left:34px;"><slot></slot></div>

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