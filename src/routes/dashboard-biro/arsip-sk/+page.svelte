<script>
  /** @type {import('./$types').PageData} */
  export let data = {
    TableDataSK_GubWakil: { documents: [], total: 0 },
    TableDataSK_BupatiWakil: { documents: [], total: 0 },
    TableDataSK_DPRD: { documents: [], total: 0 },
  };

  import {
    Heading, Select, Label, Tabs, TabItem, Modal, Toast, Input, Button, Textarea, ButtonGroup, Table,
    TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, FloatingLabelInput, Fileupload,
    Radio, Alert,
    // Pagination, <-- DIHAPUS
  } from 'flowbite-svelte';

  import {
    FilePdfOutline, FolderPlusOutline, CheckPlusCircleOutline, TrashBinOutline, CheckCircleSolid,
    ExclamationCircleOutline, ChevronLeftOutline, ChevronRightOutline, // Tambahkan ikon untuk kustom pagination
  } from 'flowbite-svelte-icons';

  import { storage, databases } from '$lib/appwrite';
  import { invalidateAll } from '$app/navigation';
  import { addTableArsipSK, deleteTableData } from '$lib/DokumenArsipSK.js';
  import { user } from '$lib/user';
  import { slide } from 'svelte/transition';
  import { v4 as uuidv4 } from 'uuid';

  let uuid = '';
  let toastStatus = false;
  let counter = 7;

  let ModalArsipSK = false;

  let ConfirmDeleteModalSKGubWakil = false;
  let selectedIdSKGubWakil = null;

  let ConfirmDeleteModalSKBupatiWakil = false;
  let selectedIdSKBupatiWakil = null;

  let ConfirmDeleteModalSKDPRD = false;
  let selectedIdSKDPRD = null;

  let selectPenerbitSK = '';
  let PenerbitSK = [
    { value: 'Presiden RI', name: 'Presiden RI' },
    { value: 'Menteri Dalam Negeri RI', name: 'Menteri Dalam Negeri RI' },
  ];

  // --- State untuk Paginasi dan Pencarian ---

  // Tab 1: Gubernur dan Wakil
  let currentPageGubWakil = 1;
  let itemsPerPageGubWakil = 20;
  let searchTermGubWakil = '';

  // Tab 2: Bupati dan Wakil
  let currentPageBupatiWakil = 1;
  let itemsPerPageBupatiWakil = 20;
  let searchTermBupatiWakil = '';

  // Tab 3: DPRD
  let currentPageDPRD = 1;
  let itemsPerPageDPRD = 20;
  let searchTermDPRD = '';

  // --- Logika Reaktif untuk Filtering dan Paginasi ---

  // Tab 1: Gubernur dan Wakil
  $: filteredDataGubWakil =
    data.TableDataSK_GubWakil.documents.filter(
      (item) =>
        (item.Penerbit?.toUpperCase().includes(searchTermGubWakil.toUpperCase()) ?? false) ||
        (item.Nomor_SK?.toUpperCase().includes(searchTermGubWakil.toUpperCase()) ?? false) ||
        (item.Tentang?.toUpperCase().includes(searchTermGubWakil.toUpperCase()) ?? false)
    ) ?? [];

  $: totalPagesGubWakil = Math.ceil(filteredDataGubWakil.length / itemsPerPageGubWakil);
  $: paginatedDataGubWakil = filteredDataGubWakil.slice(
    (currentPageGubWakil - 1) * itemsPerPageGubWakil,
    currentPageGubWakil * itemsPerPageGubWakil
  );
  $: if (searchTermGubWakil && currentPageGubWakil !== 1) currentPageGubWakil = 1; // Reset ke halaman 1 saat mencari

  // Tab 2: Bupati dan Wakil
  $: filteredDataBupatiWakil =
    data.TableDataSK_BupatiWakil.documents.filter(
      (item) =>
        (item.Penerbit?.toUpperCase().includes(searchTermBupatiWakil.toUpperCase()) ?? false) ||
        (item.Nomor_SK?.toUpperCase().includes(searchTermBupatiWakil.toUpperCase()) ?? false) ||
        (item.Tentang?.toUpperCase().includes(searchTermBupatiWakil.toUpperCase()) ?? false)
    ) ?? [];

  $: totalPagesBupatiWakil = Math.ceil(filteredDataBupatiWakil.length / itemsPerPageBupatiWakil);
  $: paginatedDataBupatiWakil = filteredDataBupatiWakil.slice(
    (currentPageBupatiWakil - 1) * itemsPerPageBupatiWakil,
    currentPageBupatiWakil * itemsPerPageBupatiWakil
  );
  $: if (searchTermBupatiWakil && currentPageBupatiWakil !== 1) currentPageBupatiWakil = 1;

  // Tab 3: DPRD
  $: filteredDataDPRD =
    data.TableDataSK_DPRD.documents.filter(
      (item) =>
        (item.Penerbit?.toUpperCase().includes(searchTermDPRD.toUpperCase()) ?? false) ||
        (item.Nomor_SK?.toUpperCase().includes(searchTermDPRD.toUpperCase()) ?? false) ||
        (item.Tentang?.toUpperCase().includes(searchTermDPRD.toUpperCase()) ?? false)
    ) ?? [];

  $: totalPagesDPRD = Math.ceil(filteredDataDPRD.length / itemsPerPageDPRD);
  $: paginatedDataDPRD = filteredDataDPRD.slice(
    (currentPageDPRD - 1) * itemsPerPageDPRD,
    currentPageDPRD * itemsPerPageDPRD
  );
  $: if (searchTermDPRD && currentPageDPRD !== 1) currentPageDPRD = 1;

  // --- Komponen Pagination Kustom ---
  /**
   * @typedef {object} CustomPaginationProps
   * @property {number} totalPages
   * @property {number} currentPage
   * @property {(page: number) => void} onPageChange
   */

  /** @type {import('svelte').SvelteComponent<CustomPaginationProps>} */
  function CustomPagination(props) {
    // Properti diakses melalui props
    const totalPages = props.totalPages;
    let currentPage = props.currentPage;
    const onPageChange = props.onPageChange;

    function goToPrevPage() {
      if (currentPage > 1) {
        currentPage--;
        onPageChange(currentPage);
      }
    }

    function goToNextPage() {
      if (currentPage < totalPages) {
        currentPage++;
        onPageChange(currentPage);
      }
    }

    // Perlu diperhatikan bahwa di Svelte, Anda perlu reaktif mengikat (bind)
    // nilai `currentPage` kembali ke parent atau membiarkan parent menanganinya
    // jika Anda tidak membuat ini sebagai komponen Svelte yang terpisah.
    // Karena kita membuatnya sebagai fungsi (untuk demonstrasi di dalam file yang sama),
    // kita akan menggunakan blok Svelte untuk rendering.

    return {
      template: `
        <div class="flex flex-col items-center">
            <span class="text-sm text-gray-700 dark:text-gray-400">
                Menampilkan halaman
                <span class="font-semibold text-gray-900 dark:text-white">${currentPage}</span>
                dari
                <span class="font-semibold text-gray-900 dark:text-white">${totalPages}</span>
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
                <button 
                    on:click={goToPrevPage}
                    disabled={currentPage === 1}
                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                >
                    <ChevronLeftOutline class="w-3.5 h-3.5 me-2 rtl:rotate-180" />
                    Sebelumnya
                </button>
                <button 
                    on:click={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                >
                    Berikutnya
                    <ChevronRightOutline class="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                </button>
            </div>
        </div>
      `,
      data: { currentPage },
      methods: { goToPrevPage, goToNextPage }
    };
  }
  // Karena kita tidak bisa mengimpor komponen Svelte yang didefinisikan sebagai fungsi
  // dalam file yang sama secara inline, kita akan mengimplementasikan logika kustom
  // pagination langsung di markup.

  // --- Fungsi Lainnya ---

  function formatTanggal(tanggalString) {
    if (!tanggalString) {
      return 'Tanggal tidak valid';
    }
    const tanggalObjek = new Date(tanggalString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(tanggalObjek);
  }

  const addDataFormtoTable = async (e) => {
    uuid = uuidv4();
    e.preventDefault();
    const formEl = e.target;
    const formData = new FormData(formEl);
    await addTableArsipSK(
      formData.get('Penerbit'),
      formData.get('nomorSK'),
      formData.get('tanggalSK'),
      formData.get('tentang'),
      formData.get('RingkasanIsi'),
      formData.get('KategoriSK'),
      uuid
    );

    const promise = storage.createFile(
      '675ee4440003f229a11d',
      uuid,
      document.getElementById('uploadDocSK').files[0]
    );
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
        throw error;
      }
    );

    invalidateAll();
    formEl.reset();
    toastStatus = true;
    counter = 7;
    timeout();
  };

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    toastStatus = false;
    ModalArsipSK = false;
  }

  function DownloadFile(id) {
    const result = storage.getFileDownload('675ee4440003f229a11d', id);
    return result;
  }

  function openDeleteModalSKGubWakil(id) {
    selectedIdSKGubWakil = id;
    ConfirmDeleteModalSKGubWakil = true;
  }

  function openDeleteModalSKBupatiWakil(id) {
    selectedIdSKBupatiWakil = id;
    ConfirmDeleteModalSKBupatiWakil = true;
  }

  function openDeleteModalSKDPRD(id) {
    selectedIdSKDPRD = id;
    ConfirmDeleteModalSKDPRD = true;
  }

  const remove = async (id) => {
    await deleteTableData(id);
    const result = await storage.deleteFile('675ee4440003f229a11d', id);
    console.log(result);
    invalidateAll();
  };
</script>

<svelte:head>
  <title>Dashboard Biro</title>
  <meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
  <Heading tag="h3" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl">Manajemen Pengelolaan Arsip Dokumen SK</Heading>
  <br />

  {#if $user.prefs['Role'] !== 'PIC Otonomi'}
    <Alert color="yellow">
      <span class="font-medium" style="font-weight:600;"
        >Halaman ini hanya bisa di Update oleh PIC Otonomi Daerah</span
      >
    </Alert>
    <br />
  {/if}

  {#if $user.prefs['Role'] === 'PIC Otonomi'}
    <div
      class="grid grid-cols-3 gap-4"
      style=" background: white;padding: 18px 10px;border-radius: 12px;border:1px solid rgb(203, 213, 225);"
    >
      <div class="col-span-2" style="font-size:22px;margin-left:10px;">
        Klik tombol di samping untuk menambah Data Dokumen Arsip SK Baru
      </div>
      <div class="">
        <Button
          style="box-shadow:rgb(102 144 246 / 40%) 5px 10px;"
          color="blue"
          class="float-right"
          on:click={() => (ModalArsipSK = true)}
        >
          <CheckPlusCircleOutline class="inline-flex w-6 h-6 mr-2 text-white-500 dark:text-white-400" />
          Tambah Data Arsip SK</Button
        >
      </div>
    </div>
  {/if}
  <br />

  <Modal size="lg" title="Pengisian Data Arsip SK" bind:open={ModalArsipSK} autoclose={false}>
    <form class="space-y-6" on:submit={addDataFormtoTable}>
      <Label>
        SK Diterbitkan oleh:
        <Select class="mt-2" items={PenerbitSK} name="Penerbit" bind:value={selectPenerbitSK} required />
      </Label>
      <FloatingLabelInput style="filled" id="nomorSK" name="nomorSK" type="text" required>
        Nomor SK:
      </FloatingLabelInput>
      <div class="mb-6">
        <label for="tanggalSK" class="text-sm">Tanggal Penerbitan SK:</label>
        <Input
          style="margin-top:3px;"
          type="date"
          id="tanggalSK"
          placeholder="Tanggal"
          name="tanggalSK"
          required
        />
      </div>
      <Textarea id="tentang" placeholder="Tentang" rows="2" name="tentang" required />
      <Textarea id="RingkasanIsi" placeholder="Ringkasan Isi SK" rows="3" name="RingkasanIsi" />
      <div class="mb-6">
        <label class="text-sm">Upload File Dokumen SK (Pdf):</label>
        <Fileupload class="mb-2" name="UploadDokumen" id="uploadDocSK" required />
      </div> <br />
      <label class="text-sm">Kategori SK</label>
      <ul
        style="margin-top:3px;"
        class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600"
      >
        <li class="w-full"><Radio name="KategoriSK" class="p-3" value="Gubernur dan Wakil">Gubernur dan Wakil</Radio></li>
        <li class="w-full"
          ><Radio name="KategoriSK" class="p-3" value="Bupati dan Wakil">Bupati / Walikota dan Wakil</Radio></li>
        <li class="w-full"><Radio name="KategoriSK" class="p-3" value="DPRD">DPRD</Radio></li>
      </ul>
      <div>
        <button
          type="submit"
          value="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Simpan dan Tambah Data Arsip SK</button
        >
      </div>
    </form>
    <svelte:fragment slot="footer">
      <Button color="alternative" on:click={() => (ModalArsipSK = !ModalArsipSK)}>Batal</Button>
      <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Data Dokumen Arsip SK telah berhasil ditambahkan. Form akan tutup dalam {counter}s.
      </Toast>
    </svelte:fragment>
  </Modal>
  <br />

  <Tabs tabStyle="pill">
    <TabItem open>
      <span slot="title" class="flex items-center"
        ><FolderPlusOutline class="w-6 h-6 mr-1 text-white-800" /> Gubernur dan Wakil</span
      >
      <section>
        {#if data.TableDataSK_GubWakil.total === 0}
          <p>Saat ini Tidak ada Data Dokumen SK pada Tab Gubernur & Wakil Gubernur</p>
        {:else}
          <p>Terdapat {data.TableDataSK_GubWakil.total} Dokumen SK pada Tab Gubernur & Wakil Gubernur</p>
        {/if}
        <br />
        <form class="flex items-center w-full mx-auto" style="width:100%;" on:submit|preventDefault>
          <label for="search-gub-wakil" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              bind:value={searchTermGubWakil}
              type="text"
              id="search-gub-wakil"
              class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari SK berdasarkan Penerbit, Nomor, atau Tentang..."
            />
          </div>
        </form><br />
        <Table id="TABLE_SKGubWakil" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
          <TableHead>
            <TableHeadCell style="font-size: larger;" class="py-4 content-start">No</TableHeadCell>
            <TableHeadCell style="font-size: larger;" class="py-4 content-start">File Dokumen SK</TableHeadCell>
            <TableHeadCell style="font-size: larger;" class="py-4 content-start">Detail SK</TableHeadCell>
            <TableHeadCell style="font-size: larger;" class="py-4 content-start">Ringkasan Isi SK</TableHeadCell>
            {#if $user.prefs['Role'] === 'PIC Otonomi'}
              <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
            {/if}
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each paginatedDataGubWakil as cetakTabel, i}
              <TableBodyRow>
                <TableBodyCell class="content-start">
                  {(currentPageGubWakil - 1) * itemsPerPageGubWakil + i + 1}
                </TableBodyCell>
                <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                  <ButtonGroup class="*:!ring-primary-700">
                    <a href={DownloadFile(cetakTabel.$id)} target="_blank"
                      ><Button style="color:#ff6767;height: 80px;"><FilePdfOutline class="w-11 h-11" />
                      </Button></a
                    ></ButtonGroup
                  ><label style="color:#89aae4;margin-top:5px;display: block;">Unduh SK</label>
                </TableBodyCell>
                <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"
                  ><div style="width:300px;overflow-wrap: anywhere;">
                    <b>Diterbitkan oleh:</b><br />{cetakTabel.Penerbit} <br /><br /><b
                      >Nomor SK:</b
                    ><br />{cetakTabel.Nomor_SK} <br /><br /><b
                      >Tanggal Penerbitan SK:</b
                    ><br />{formatTanggal(cetakTabel.TanggalSK.slice(0, 10))}<br />
                    <br /><b>Tentang:</b><br />{cetakTabel.Tentang}
                  </div>
                </TableBodyCell>
                <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"
                  ><div style="width:300px;overflow-wrap: anywhere;">
                    <b>Ringkasan Isi SK:</b><br />{cetakTabel.Ringkasan_Isi}
                  </div>
                </TableBodyCell>
                {#if $user.prefs['Role'] === 'PIC Otonomi'}
                  <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"
                    ><ButtonGroup class="*:!ring-primary-700">
                      <Button style="color:red;" on:click={() => openDeleteModalSKGubWakil(cetakTabel.$id)}
                        ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button
                      >
                    </ButtonGroup></TableBodyCell
                  >
                {/if}
                <Modal bind:open={ConfirmDeleteModalSKGubWakil} size="xs" autoclose={false}>
                  <div class="text-center">
                    <ExclamationCircleOutline
                      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    />
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Apakah Anda sudah memastikan akan menghapus data SK dan File Document yang Anda Pilih
                    </h3>
                    <Button color="red" class="me-2" on:click={() => {remove(selectedIdSKGubWakil); ConfirmDeleteModalSKGubWakil = false;}}
                      >Ya, Hapus Sekarang</Button
                    >
                    <Button color="alternative" on:click={() => (ConfirmDeleteModalSKGubWakil = !ConfirmDeleteModalSKGubWakil)}
                      >Tidak, Batal</Button
                    >
                  </div>
                </Modal>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>

        <div class="flex justify-center mt-4">
            <div class="flex flex-col items-center">
                <span class="text-sm text-gray-700 dark:text-gray-400">
                    Menampilkan halaman
                    <span class="font-semibold text-gray-900 dark:text-white">{currentPageGubWakil}</span>
                    dari
                    <span class="font-semibold text-gray-900 dark:text-white">{totalPagesGubWakil}</span>
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                    <button 
                        on:click={() => { if (currentPageGubWakil > 1) currentPageGubWakil--; }}
                        disabled={currentPageGubWakil === 1}
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                        <ChevronLeftOutline class="w-3.5 h-3.5 me-2 rtl:rotate-180" />
                        Sebelumnya
                    </button>
                    <button 
                        on:click={() => { if (currentPageGubWakil < totalPagesGubWakil) currentPageGubWakil++; }}
                        disabled={currentPageGubWakil === totalPagesGubWakil || totalPagesGubWakil === 0}
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                        Berikutnya
                        <ChevronRightOutline class="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                    </button>
                </div>
            </div>
        </div>
        </section>
    </TabItem>

    <TabItem>
      <span slot="title" class="flex items-center"><FolderPlusOutline class="w-6 h-6 mr-1 text-white-800" /> Bupati / WaliKota dan Wakil</span>
      <section>
          {#if data.TableDataSK_BupatiWakil.total === 0}
          <p>Saat ini Tidak ada Data Dokumen SK pada Tab Bupati & Wakil Bupati</p>
          {:else}
          <p>Terdapat {data.TableDataSK_BupatiWakil.total} Dokumen SK pada Tab Bupati & Wakil Bupati</p>
          {/if} 
          <br/>
          <form class="flex items-center w-full mx-auto" style="width:100%;" on:submit|preventDefault> 
              <label for="search-bupati-wakil" class="sr-only">Search</label>
              <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input bind:value={searchTermBupatiWakil} type="text" id="search-bupati-wakil" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari SK berdasarkan Penerbit, Nomor, atau Tentang..." />
              </div>
          </form><br/>
          <Table id="TABLE_SKBupatiWakil" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
              <TableHead>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">No</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">File Dokumen SK</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Detail SK</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Ringkasan Isi SK</TableHeadCell>
                  {#if $user.prefs['Role'] === "PIC Otonomi"}
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
                  {/if} 
              </TableHead>
              <TableBody tableBodyClass="divide-y">
                  {#each paginatedDataBupatiWakil as cetakTabel, i} 
                  <TableBodyRow>
                      <TableBodyCell class="content-start">{(currentPageBupatiWakil - 1) * itemsPerPageBupatiWakil + i + 1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#ff6767;height: 80px;"><FilePdfOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh SK</label> 
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Diterbitkan oleh:</b><br/>{cetakTabel.Penerbit} <br/><br/><b>Nomor SK:</b><br/>{cetakTabel.Nomor_SK} <br/><br/><b>Tanggal Penerbitan SK:</b><br/>{formatTanggal(cetakTabel.TanggalSK.slice(0, 10))}<br/>
                          <br/><b>Tentang:</b><br/>{cetakTabel.Tentang}
                      </div>                  
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Ringkasan Isi SK:</b><br/>{cetakTabel.Ringkasan_Isi}
                      </div>                  
                      </TableBodyCell>
                      {#if $user.prefs['Role'] === "PIC Otonomi"}
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><ButtonGroup class="*:!ring-primary-700">
                          <Button style="color:red;" on:click={() => openDeleteModalSKBupatiWakil(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                      </ButtonGroup></TableBodyCell>
                      {/if}
                      <Modal bind:open={ConfirmDeleteModalSKBupatiWakil} size="xs" autoclose={false}>
                          <div class="text-center">
                              <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data SK dan File Document yang Anda Pilih</h3>
                              <Button color="red" class="me-2" on:click={() => {remove(selectedIdSKBupatiWakil); ConfirmDeleteModalSKBupatiWakil = false;}}>Ya, Hapus Sekarang</Button>
                              <Button color="alternative" on:click={()=> ConfirmDeleteModalSKBupatiWakil = !ConfirmDeleteModalSKBupatiWakil}>Tidak, Batal</Button>
                          </div>
                      </Modal>
                  </TableBodyRow>
                  {/each}
              </TableBody>    
          </Table>
          
          <div class="flex justify-center mt-4">
            <div class="flex flex-col items-center">
                <span class="text-sm text-gray-700 dark:text-gray-400">
                    Menampilkan halaman
                    <span class="font-semibold text-gray-900 dark:text-white">{currentPageBupatiWakil}</span>
                    dari
                    <span class="font-semibold text-gray-900 dark:text-white">{totalPagesBupatiWakil}</span>
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                    <button 
                        on:click={() => { if (currentPageBupatiWakil > 1) currentPageBupatiWakil--; }}
                        disabled={currentPageBupatiWakil === 1}
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                        <ChevronLeftOutline class="w-3.5 h-3.5 me-2 rtl:rotate-180" />
                        Sebelumnya
                    </button>
                    <button 
                        on:click={() => { if (currentPageBupatiWakil < totalPagesBupatiWakil) currentPageBupatiWakil++; }}
                        disabled={currentPageBupatiWakil === totalPagesBupatiWakil || totalPagesBupatiWakil === 0}
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                        Berikutnya
                        <ChevronRightOutline class="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                    </button>
                </div>
            </div>
          </div>
          </section>
    </TabItem>

    <TabItem>
      <span slot="title" class="flex items-center"><FolderPlusOutline class="w-6 h-6 mr-1 text-white-800" /> DPRD </span>
      <section>
          {#if data.TableDataSK_DPRD.total === 0}
          <p>Saat ini Tidak ada Data Dokumen SK pada Tab DPRD</p>
          {:else}
          <p>Terdapat {data.TableDataSK_DPRD.total} Dokumen SK pada Tab DPRD</p>
          {/if} 
          <br/>
          <form class="flex items-center w-full mx-auto" style="width:100%;" on:submit|preventDefault> 
              <label for="search-dprd" class="sr-only">Search</label>
              <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input bind:value={searchTermDPRD} type="text" id="search-dprd" class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari SK berdasarkan Penerbit, Nomor, atau Tentang..." />
              </div>
          </form><br/>
          <Table id="TABLE_SKDPRD" shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
              <TableHead>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">No</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">File Dokumen SK</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Detail SK</TableHeadCell>
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Ringkasan Isi SK</TableHeadCell>
                  {#if $user.prefs['Role'] === "PIC Otonomi"}
                  <TableHeadCell style="font-size: larger;" class="py-4 content-start">Aksi</TableHeadCell>
                  {/if}
              </TableHead>
              <TableBody tableBodyClass="divide-y">
                  {#each paginatedDataDPRD as cetakTabel, i} 
                  <TableBodyRow>
                      <TableBodyCell class="content-start">{(currentPageDPRD - 1) * itemsPerPageDPRD + i + 1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start">
                          <ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:#ff6767;height: 80px;"><FilePdfOutline class="w-11 h-11" /> </Button></a></ButtonGroup><label style="color:#89aae4;margin-top:5px;display: block;">Unduh SK</label> 
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Diterbitkan oleh:</b><br/>{cetakTabel.Penerbit} <br/><br/><b>Nomor SK:</b><br/>{cetakTabel.Nomor_SK} <br/><br/><b>Tanggal Penerbitan SK:</b><br/>{formatTanggal(cetakTabel.TanggalSK.slice(0, 10))}<br/>
                          <br/><b>Tentang:</b><br/>{cetakTabel.Tentang}
                      </div>                  
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><div style="width:300px;overflow-wrap: anywhere;"><b>Ringkasan Isi SK:</b><br/>{cetakTabel.Ringkasan_Isi}
                      </div>                  
                      </TableBodyCell>
                      {#if $user.prefs['Role'] === "PIC Otonomi"}
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2 content-start"><ButtonGroup class="*:!ring-primary-700">
                          <Button style="color:red;" on:click={() => openDeleteModalSKDPRD(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                          </ButtonGroup></TableBodyCell>
                      {/if}
                      <Modal bind:open={ConfirmDeleteModalSKDPRD} size="xs" autoclose={false}>
                          <div class="text-center">
                              <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data SK dan File Document yang Anda Pilih</h3>
                              <Button color="red" class="me-2" on:click={() => {remove(selectedIdSKDPRD); ConfirmDeleteModalSKDPRD = false;}}>Ya, Hapus Sekarang</Button>
                              <Button color="alternative" on:click={()=> ConfirmDeleteModalSKDPRD = !ConfirmDeleteModalSKDPRD}>Tidak, Batal</Button>
                          </div>
                      </Modal>
                  </TableBodyRow>
                  {/each}
              </TableBody>    
          </Table>
          
          <div class="flex justify-center mt-4">
            <div class="flex flex-col items-center">
                <span class="text-sm text-gray-700 dark:text-gray-400">
                    Menampilkan halaman
                    <span class="font-semibold text-gray-900 dark:text-white">{currentPageDPRD}</span>
                    dari
                    <span class="font-semibold text-gray-900 dark:text-white">{totalPagesDPRD}</span>
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                    <button 
                        on:click={() => { if (currentPageDPRD > 1) currentPageDPRD--; }}
                        disabled={currentPageDPRD === 1}
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                        <ChevronLeftOutline class="w-3.5 h-3.5 me-2 rtl:rotate-180" />
                        Sebelumnya
                    </button>
                    <button 
                        on:click={() => { if (currentPageDPRD < totalPagesDPRD) currentPageDPRD++; }}
                        disabled={currentPageDPRD === totalPagesDPRD || totalPagesDPRD === 0}
                        class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                        Berikutnya
                        <ChevronRightOutline class="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                    </button>
                </div>
            </div>
          </div>
          </section>
    </TabItem>
  </Tabs>

  <br /><br />
</div>