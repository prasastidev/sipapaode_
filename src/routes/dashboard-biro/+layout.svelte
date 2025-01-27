<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { user } from '$lib/user';
    import {  Sidebar, Toggle, SidebarWrapper, SidebarBrand, SidebarItem, SidebarGroup, SidebarDropdownItem, SidebarDropdownWrapper } from 'flowbite-svelte';
    import { ChartPieSolid, BadgeCheckSolid, ObjectsColumnSolid, BookSolid, BuildingSolid, LandmarkSolid, DrawSquareSolid, UserCircleSolid, UsersSolid, BullhornSolid, ArrowLeftToBracketOutline, FileCopyAltSolid } from 'flowbite-svelte-icons';
    let spanClass = 'flex-1 ms-3 whitespace-break-spaces';
    

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
                  <SidebarDropdownItem label="👥 Data Pengajuan Formulir Kerjasama Online" href="/dashboard-biro/data-formulir-online-kerjasama" class="pl-4 ps-8"/>
                  <SidebarDropdownItem label="📁 Data File Dokumen Kerjasama" href="/dashboard-biro/data-rekap-kerjasama" class="pl-4 ps-8"/>
                  <SidebarDropdownItem label="✅ Update Checklist Laporan Evaluasi Kerjasama" href="/dashboard-biro/laporan-evaluasi-kerjasama" class="pl-4 ps-8"/>
                  <SidebarDropdownItem label="🖼️ Gallery Photo Dokumentasi Kerjasama" href="/dashboard-biro/gallery-photo-kerjasama" class="pl-4 ps-8"/>
                </SidebarDropdownWrapper>
                <SidebarDropdownWrapper label="Koord. Pemerintahan" {spanClass} style="text-align: left;">
                  <svelte:fragment slot="icon">
                    <LandmarkSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <SidebarDropdownItem label="🗺️ Kode Data Wilayah Pemerintahan, Pulau dan Rupa Bumi" href="/dashboard-biro/lanskap-sultra" class="pl-4 ps-8" />
                  <SidebarDropdownItem label="🖼️ Gallery Photo Dokumentasi Pemerintahan" href="/dashboard-biro/gallery-photo-pemerintahan" class="pl-4 ps-8"/>
                  </SidebarDropdownWrapper>
                  <SidebarDropdownWrapper label="Koord. Otonomi Daerah" {spanClass} style="text-align: left;">
                    <svelte:fragment slot="icon">
                      <BuildingSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                    <SidebarDropdownItem label="✅ Update Checklist Laporan LPPD & LKPJ" href="/dashboard-biro/laporan-lppd" class="pl-4 ps-8" />
                    <SidebarDropdownItem label="📁 Data Dokumen LPPD & LKPJ" href="/dashboard-biro/rekap-lppd-lkpj" class="pl-4 ps-8" />
                    <SidebarDropdownItem label="🗂️ Data Dokumen SK" href="/dashboard-biro/arsip-sk" class="pl-4 ps-8" />
                    <SidebarDropdownItem label="🖼️ Gallery Photo Dokumentasi Otonomi Daerah" href="/dashboard-biro/gallery-photo-otonomi" class="pl-4 ps-8"/>
                  </SidebarDropdownWrapper>
                  <SidebarItem label="Tata Usaha (Data Pegawai)" href="/dashboard-biro/data-pegawai-biro">
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
                <SidebarItem label="Informasi PIC" href="/dashboard-biro/info-pic">
                  <svelte:fragment slot="icon">
                    <UserCircleSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
              <SidebarGroup border> <br/>
                <div style="font-size: 16px;text-align: left;color:#515b6d">SipapaOde Versi 1.1</div>
                <div style="display: flex;gap:10px;">
                  <a href="https://www.youtube.com/" target="_blank"><div class="icon youtube">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.246 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                  </div></a>
                  <a href="https://x.com/" target="_blank"><div class="icon x">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.901 1.153h3.68l-8.04 9.557L24 22.846h-7.406l-5.8-7.584-6.638 7.584H1.474l8.615-9.824L0 1.154h7.594l5.243 6.932ZM17.361 20.68h2.039L6.964 3.282H4.738L17.361 20.68Z"/>
                    </svg>
                </div></a>
                  <div class="icon email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.425 1.001l-4 3.241-4-3.241-8.575 9.35h25.148l-8.573-9.35z"/>
                      </svg>
                  </div>
              </div>
             
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
    
    .icon {
            width: 26px;
            height: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 40%;
            transition: transform 0.3s ease;
        }
        .icon:hover {
            transform: scale(1.1);
        }
        .youtube {
            background-color: #FF0000;
            color: white;
        }
        .x {
            background-color: black;
            color: white;
        }
        .email {
            background-color: #359cea;
            color: white;
        }
</style>