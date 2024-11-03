<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import {  Sidebar, SidebarWrapper, SidebarBrand, SidebarItem, SidebarGroup } from 'flowbite-svelte';
    import { ChartPieSolid, BuildingSolid, LandmarkSolid, DrawSquareSolid, UserCircleSolid, UsersSolid, BullhornSolid, ArrowLeftToBracketOutline, FileCopyAltSolid } from 'flowbite-svelte-icons';
    let spanClass = 'flex-1 ms-3 whitespace-break-spaces';

  let site = {
    name: 'SIPAPAODE',
    href: '/dashboard-biro',
    img: 'http://localhost:5173/src/lib/images/SipapaOde-logo.webp'
  };

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>


<br/><br/>
<div class="container">


<div class="grid grid-cols-12 gap-4">

    <div class="col-span-4">
        <Sidebar>
            <SidebarWrapper>
              <SidebarGroup>
                <SidebarBrand {site} />
                <SidebarItem label="Dashboard" href="/dashboard-biro">
                  <svelte:fragment slot="icon">
                    <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Bag. Kerjasama" {spanClass} href="/dashboard-biro/kerjasama">
                  <svelte:fragment slot="icon">
                    <UsersSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <svelte:fragment slot="subtext">
                    <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
                  </svelte:fragment>
                </SidebarItem>
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
                  <SidebarItem label="Lanskap Sultra">
                    <svelte:fragment slot="icon">
                      <DrawSquareSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Laporan LPPD">
                    <svelte:fragment slot="icon">
                      <FileCopyAltSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                  <SidebarItem label="Banner Info">
                    <svelte:fragment slot="icon">
                      <BullhornSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                  </SidebarItem>
                <SidebarItem label="Info Users">
                  <svelte:fragment slot="icon">
                    <UserCircleSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
              <SidebarGroup border>
                <SidebarItem label="Keluar (Log Out)">
                  <svelte:fragment slot="icon">
                    <ArrowLeftToBracketOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
        
    </div>

    <div class="col-span-8"><slot></slot></div>

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