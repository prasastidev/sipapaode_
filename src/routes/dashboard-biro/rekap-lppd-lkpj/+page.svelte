<script>
    /** @type {import('./$types').PageData} */
    export let data = {
        TableDataDokLPPD: { documents: [] },
        TableDataDokLKPJ: { documents: [] }
    };

    // --- Import Components dan Dependencies ---
    // Hapus import Pagination dari flowbite-svelte
    import { Heading, Modal, Label, Radio, Checkbox, Toast, Fileupload, Select, Tabs, TabItem, Alert, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { CheckCircleSolid, CheckPlusCircleOutline, TrashBinOutline, FilePdfOutline, FolderOutline, ExclamationCircleOutline, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
    import { addTableDokLPPDLKPJ } from '$lib/DokumenLPPDLKPJ.js';
    import { v4 as uuidv4 } from "uuid";
    import { deleteTableData } from '$lib/DokumenLPPDLKPJ.js';
    import { user } from '$lib/user';

    // --- Variabel State Umum ---
    let ConfirmDeleteModalLPPD = false;
    let selectedIdLPPD = null;
    let ConfirmDeleteModalLKPJ = false;
    let selectedIdLKPJ = null;
    let uuid = "";
    let ModalKirimLPPD = false;
    let JenisLaporan;
    let ButtonKirimLPPD = false;
    let TahunTerbit;
    let toastStatus = false;
    let counter = 7;
    
    // --- Variabel untuk Filter dan Dropdown ---
    let selectKabKota = 'Semua Kabupaten/Kota';
    let selectTahun = 'Semua Tahun';

    // Daftar Lengkap Kab/Kota & Tahun (Data tetap sama)
    const KabKotaName = [
        { value: 'Kota Kendari', name: 'Kota Kendari' },
        { value: 'Kota Baubau', name: 'Kota Baubau' },
        { value: 'Kabupaten Wakatobi', name: 'Kabupaten Wakatobi' },
        { value: 'Kabupaten Muna Barat', name: 'Kabupaten Muna Barat' },
        { value: 'Kabupaten Muna', name: 'Kabupaten Muna' },
        { value: 'Kabupaten Konawe Utara', name: 'Kabupaten Konawe Utara' },
        { value: 'Kabupaten Konawe Selatan', name: 'Kabupaten Konawe Selatan' },
        { value: 'Kabupaten Konawe Kepulauan', name: 'Kabupaten Konawe Kepulauan' },
        { value: 'Kabupaten Konawe', name: 'Kabupaten Konawe' },
        { value: 'Kabupaten Kolaka Utara', name: 'Kabupaten Kolaka Utara' },
        { value: 'Kabupaten Kolaka Timur', name: 'Kabupaten Kolaka Timur' },
        { value: 'Kabupaten Kolaka', name: 'Kabupaten Kolaka' },
        { value: 'Kabupaten Buton Utara', name: 'Kabupaten Buton Utara' },
        { value: 'Kabupaten Buton Tengah', name: 'Kabupaten Buton Tengah' },
        { value: 'Kabupaten Buton Selatan', name: 'Kabupaten Buton Selatan' },
        { value: 'Kabupaten Buton', name: 'Kabupaten Buton' },
        { value: 'Kabupaten Bombana', name: 'Kabupaten Bombana' }
    ];

    const kabupatenOptions = ['Semua Kabupaten/Kota', 'Kota Kendari', 'Kota Baubau', 'Kabupaten Wakatobi', 'Kabupaten Muna Barat', 'Kabupaten Muna', 'Kabupaten Konawe Utara', 'Kabupaten Konawe Selatan', 'Kabupaten Konawe Kepulauan', 'Kabupaten Konawe', 'Kabupaten Kolaka Utara', 'Kabupaten Kolaka Timur', 'Kabupaten Kolaka', 'Kabupaten Buton Utara', 'Kabupaten Buton Tengah', 'Kabupaten Buton Selatan', 'Kabupaten Buton', 'Kabupaten Bombana'];
    const TahunPenerbitan = [
        { value: '2020', name: '2020' },
        { value: '2021', name: '2021' },
        { value: '2022', name: '2022' },
        { value: '2023', name: '2023' },
        { value: '2024', name: '2024' },
        { value: '2025', name: '2025' },
        { value: '2026', name: '2026' },
        { value: '2027', name: '2027' },
        { value: '2028', name: '2028' },
        { value: '2029', name: '2029' },
        { value: '2030', name: '2030' }
    ];
    const tahunOptions = ['Semua Tahun', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

    // Variabel reaktif untuk menampung data yang sudah difilter
    let filteredFilesLPPD = [];
    let filteredFilesLKPJ = [];

    // --- VARIABEL UNTUK PAGINATION ---
    let itemsPerPage = 8; // Jumlah item per halaman
    let currentPageLPPD = 1; // Halaman saat ini untuk LPPD
    let currentPageLKPJ = 1; // Halaman saat ini untuk LKPJ

    // Data yang ditampilkan setelah pagination
    let paginatedFilesLPPD = []; 
    let paginatedFilesLKPJ = []; 
    // Total halaman LPPD/LKPJ
    let totalPagesLPPD = 1;
    let totalPagesLKPJ = 1;

    // --- LOGIKA UTAMA PAGINATION & FILTERING ---

    // Logika Pemfilteran Data LPPD (Blok Filter & Total Halaman)
    $: {
        if (data.TableDataDokLPPD && data.TableDataDokLPPD.documents) {
            filteredFilesLPPD = data.TableDataDokLPPD.documents.filter(doc => {
                const kabKotaMatch = selectKabKota === 'Semua Kabupaten/Kota' || doc.Kabupaten_Kota === selectKabKota;
                const tahunMatch = selectTahun === 'Semua Tahun' || String(doc.Tahun) === selectTahun;
                const jenisMatch = doc.Jenis_laporan === 'LPPD' || doc.Jenis_laporan === 'Laporan LPPD';
                return kabKotaMatch && tahunMatch && jenisMatch;
            });
            totalPagesLPPD = Math.ceil(filteredFilesLPPD.length / itemsPerPage);
        } else {
            filteredFilesLPPD = [];
            totalPagesLPPD = 1;
        }

        // Reset halaman ke 1 setiap kali filter atau itemPerPage berubah
        currentPageLPPD = 1; 
    }

    // Logika Pemfilteran Data LKPJ (Blok Filter & Total Halaman)
    $: {
        if (data.TableDataDokLKPJ && data.TableDataDokLKPJ.documents) {
            filteredFilesLKPJ = data.TableDataDokLKPJ.documents.filter(doc => {
                const kabKotaMatch = selectKabKota === 'Semua Kabupaten/Kota' || doc.Kabupaten_Kota === selectKabKota;
                const tahunMatch = selectTahun === 'Semua Tahun' || String(doc.Tahun) === selectTahun;
                 const jenisMatch = doc.Jenis_laporan === 'LKPJ' || doc.Jenis_laporan === 'Laporan LKPJ';
                return kabKotaMatch && tahunMatch && jenisMatch;
            });
            totalPagesLKPJ = Math.ceil(filteredFilesLKPJ.length / itemsPerPage);
        } else {
             filteredFilesLKPJ = [];
             totalPagesLKPJ = 1;
        }

        // Reset halaman ke 1 setiap kali filter atau itemPerPage berubah
        currentPageLKPJ = 1; 
    }

    // --- BLOK REAKTIF PAGINATION (LPPD) - MEMOTONG DATA SESUAI HALAMAN SAAT INI ---
    $: {
        const start = (currentPageLPPD - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        paginatedFilesLPPD = filteredFilesLPPD.slice(start, end);
    }

    // --- BLOK REAKTIF PAGINATION (LKPJ) - MEMOTONG DATA SESUAI HALAMAN SAAT INI ---
    $: {
        const start = (currentPageLKPJ - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        paginatedFilesLKPJ = filteredFilesLKPJ.slice(start, end);
    }

    // --- FUNGSI KLIK PAGINATION KUSTOM ---

    function nextPage(type) {
        if (type === 'LPPD' && currentPageLPPD < totalPagesLPPD) {
            currentPageLPPD++;
        } else if (type === 'LKPJ' && currentPageLKPJ < totalPagesLKPJ) {
            currentPageLKPJ++;
        }
    }

    function prevPage(type) {
        if (type === 'LPPD' && currentPageLPPD > 1) {
            currentPageLPPD--;
        } else if (type === 'LKPJ' && currentPageLKPJ > 1) {
            currentPageLKPJ--;
        }
    }

    // --- Fungsi Form dan Delete (tetap sama) ---
    
    const addDataFormtoTable = async (e) => {
        uuid = uuidv4();
        e.preventDefault();
        const formEl = e.target;
        const formData = new FormData(formEl);

        if (!JenisLaporan) {
             alert("Pilih Jenis Dokumen (LPPD/LKPJ) terlebih dahulu.");
             return;
        }

        try {
            await addTableDokLPPDLKPJ(
                formData.get('KabKota'),
                formData.get('JenisDoc'),
                formData.get('Tahun'),
                uuid
            );

            const fileInput = document.getElementById('uploadDoc');
            if (fileInput && fileInput.files.length > 0) {
                const promise = storage.createFile('675e48c4001bd540c846', uuid, fileInput.files[0]);
                await promise;
            } else {
                 throw new Error("Tidak ada file yang dipilih untuk diupload.");
            }

            formEl.reset();
            
            JenisLaporan = undefined;
            ButtonKirimLPPD = false; 
            
            currentPageLPPD = 1; 
            currentPageLKPJ = 1; 
            
            invalidateAll();
            toastStatus = true;
            counter = 7;
            timeout();

        } catch (error) {
            console.error("Gagal menambahkan data:", error);
            alert(`Gagal menyimpan dokumen: ${error.message}. Periksa kunci Appwrite dan kolom database.`);
        }
    };

    function timeout() {
        if (--counter > 0) return setTimeout(timeout, 1000);
        toastStatus = false;
        ModalKirimLPPD = false;
    }

    function DownloadFile(id) {
        const result = storage.getFileView('675e48c4001bd540c846', id);
        return result.href || result;
    }

    function openDeleteModalLPPD(id) {
        selectedIdLPPD = id;
        ConfirmDeleteModalLPPD = true;
    }

    function openDeleteModalLKPJ(id) {
        selectedIdLKPJ = id;
        ConfirmDeleteModalLKPJ = true;
    }

    const remove = async (id) => {
        try {
            await deleteTableData(id);
            await storage.deleteFile('675e48c4001bd540c846', id);

            ConfirmDeleteModalLPPD = false;
            ConfirmDeleteModalLKPJ = false;
            
            currentPageLPPD = 1;
            currentPageLKPJ = 1;
            
            invalidateAll();
        } catch (error) {
            console.error("Gagal menghapus data/file:", error);
            alert("Gagal menghapus dokumen. Cek console untuk detail.");
        }
    };

 
</script>

<svelte:head>
    <title>Dashboard Biro</title>
    <meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Daftar Dokumen LPPD dan LKPJ Kabupaten/Kota Sulawesi Tenggara</Heading>

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
                Klik tombol di samping untuk menambah Data Dokumen LPPD ataupun LKPJ Baru
            </div>
            <div class="">
                <Button
                    style="box-shadow:rgb(102 144 246 / 40%) 5px 10px;"
                    color="blue"
                    class="float-right"
                    on:click={() => (ModalKirimLPPD = true)}
                >
                    <CheckPlusCircleOutline class="inline-flex w-6 h-6 mr-2 text-white-500 dark:text-white-400" />
                    Tambah Dokumen LPPD dan LKPJ</Button>
            </div>
        </div>
    {/if}
    <br />

    <Modal size="lg" title="Formulir Penyimpanan Arsip Dokumen LPPD dan LKPJ se-Kabupaten/Kota Prov. Sulawesi Tenggara" bind:open={ModalKirimLPPD}  autoclose={false}>
        <form class="space-y-6" on:submit|preventDefault={addDataFormtoTable}> 
        <Label>
            Pilih Nama Kabupaten / Kota
            <Select class="mt-2" items={KabKotaName} name="KabKota" bind:value={selectKabKota} required />
        </Label>
        <br/>
        <label class="text-sm">Pilih Jenis Dokumen yang akan disimpan:</label>
        <ul style="margin-top:3px;" class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
            <li class="w-full"><Radio name="JenisDoc" class="p-3" value="Laporan LPPD" bind:group={JenisLaporan} checked>Laporan LPPD</Radio></li>
            <li class="w-full"><Radio name="JenisDoc" class="p-3" value="Laporan LKPJ" bind:group={JenisLaporan}>Laporan LKPJ</Radio></li>
        </ul> 
        <Label>
            Tahun Penerbitan
            <Select class="mt-2" items={TahunPenerbitan} name="Tahun" bind:value={selectTahun} required />
        </Label>
        
        <div class="mb-6">
            <label for="uploadDoc" class="text-sm">*Upload Dokumen {JenisLaporan || 'Dokumen'} (pdf):</label>
            <Fileupload class="mb-2" name="UploadDokumen" id="uploadDoc" required />
        </div>
        <Checkbox bind:checked={ButtonKirimLPPD} class="inline-block">Dokumen <b>{JenisLaporan || ''} {selectKabKota} Tahun {selectTahun}</b>, siap di Upload ke Data Arsip.</Checkbox>
        <br/>
        <div>
            <Button disabled={!ButtonKirimLPPD} type="submit" value="submit" class="flex w-full h-10 justify-center mb-4 rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Simpan Dokumen {JenisLaporan || 'Dokumen'}</Button>
        </div> 
        </form> 
        <svelte:fragment slot="footer">
            <Button color="alternative" on:click={()=> ModalKirimLPPD = false} >Batal</Button>
            <Toast class="max-w-2xl" color="green" transition={slide} bind:toastStatus>
                <CheckCircleSolid slot="icon" class="w-5 h-5" />
                Data Dokumen telah berhasil diUpload. Form akan tutup dalam {counter}s.
            </Toast> 
        </svelte:fragment>
    </Modal>

    <br/>
    <Tabs tabStyle="pill">
        <TabItem open>
            <span slot="title" class="flex items-center"><FolderOutline class="w-6 h-6 mr-1 text-white-800" /> DOKUMEN LPPD</span>
            <section>
                Dibawah berikut adalah Data Dokumen LPPD.  <br/>
                {#if data.TableDataDokLPPD && data.TableDataDokLPPD.total === 0}
                    <p>Saat ini Tidak ada Data Dokumen LPPD</p>
                {:else if data.TableDataDokLPPD}
                    <p>Total {data.TableDataDokLPPD.total} Dokumen LPPD pada Data Arsip. Terdapat {filteredFilesLPPD.length} Dokumen LPPD yang Sesuai Filter. Menampilkan halaman [{currentPageLPPD}] dari [{totalPagesLPPD}].</p>
                {/if}

                <div class="page-container">
                    <div class="filters-container">
                        <div class="filter-group">
                            <label for="kabupaten-select">Pilih Kabupaten:</label>
                            <select id="kabupaten-select" bind:value={selectKabKota} class="custom-select">
                                {#each kabupatenOptions as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="tahun-select">Pilih Tahun:</label>
                            <select id="tahun-select" bind:value={selectTahun} class="custom-select">
                                {#each tahunOptions as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label for="items-per-page-lppd">Item per Halaman:</label>
                            <select id="items-per-page-lppd" bind:value={itemsPerPage} class="custom-select" style="width: 100px;">
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                                <option value={24}>24</option>
                                <option value={48}>48</option>
                            </select>
                        </div>
                    </div>

                    <div class="pdf-grid">
                        {#each paginatedFilesLPPD as cetakTabel (cetakTabel.$id)}
                            <div class="pdf-card-wrapper">
                                <a href={DownloadFile(cetakTabel.$id)} target="_blank" class="pdf-card">
                                    <div class="pdf-icon-placeholder">
                                        <Button style="height:100px;margin-bottom:6px;background: #fc9a9a;">
                                            <FilePdfOutline class="w-11 h-11" />
                                        </Button>
                                        <br/>
                                        <span class="pdf-text">PDF</span>
                                    </div>
                                    <div class="pdf-info">
                                        {cetakTabel.Jenis_laporan} {cetakTabel.Kabupaten_Kota} <br/>
                                        Tahun {cetakTabel.Tahun}
                                    </div>
                                </a>
                                {#if $user.prefs['Role'] === "PIC Otonomi"}
                                    <div class="pdf-actions">
                                        <ButtonGroup class="*:!ring-primary-700">
                                            <Button style="color:red;" on:click={() => openDeleteModalLPPD(cetakTabel.$id)}>
                                                <TrashBinOutline class="w-4 h-4 me-2" />Hapus
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                {/if}
                            </div>
                        {/each}

                        {#if paginatedFilesLPPD.length === 0 && filteredFilesLPPD.length > 0}
                            <p class="no-results">Halaman ini kosong. Anda mungkin perlu kembali ke halaman pertama.</p>
                        {:else if filteredFilesLPPD.length === 0}
                            <p class="no-results">Tidak ada dokumen yang ditemukan untuk filter ini.</p>
                        {/if}
                    </div>

                    {#if totalPagesLPPD > 1}
                        <div class="flex justify-center mt-6 space-x-3">
                            <Button
                                color="alternative"
                                size="sm"
                                on:click={() => prevPage('LPPD')}
                                disabled={currentPageLPPD === 1}
                            >
                                <ChevronLeftOutline class="w-4 h-4 mr-1" />
                                Previous
                            </Button>
                            
                            <span class="text-sm font-medium py-2 px-4">
                                Halaman [{currentPageLPPD}] dari [{totalPagesLPPD}]
                            </span>
                            
                            <Button
                                color="alternative"
                                size="sm"
                                on:click={() => nextPage('LPPD')}
                                disabled={currentPageLPPD === totalPagesLPPD}
                            >
                                Next
                                <ChevronRightOutline class="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    {/if}
                    </div>

                <Modal bind:open={ConfirmDeleteModalLPPD} size="xs" autoclose={false}>
                    <div class="text-center">
                        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data LPPD dan File Document yang Anda Pilih</h3>
                        <Button color="red" class="me-2" on:click={() => remove(selectedIdLPPD)}>Ya, Hapus Sekarang</Button>
                        <Button color="alternative" on:click={()=> ConfirmDeleteModalLPPD = false}>Tidak, Batal</Button>
                    </div>
                </Modal>


                <br/>


            </section>
        </TabItem>
        <TabItem>
            <span slot="title" class="flex items-center"><FolderOutline class="w-6 h-6 mr-1 text-white-800" /> DOKUMEN LKPJ</span>
            <section>
                Dibawah berikut adalah Data Dokumen LKPJ.
                <br/>
                {#if data.TableDataDokLKPJ && data.TableDataDokLKPJ.total === 0}
                    <p>Saat ini Tidak ada Data Dokumen LKPJ</p>
                {:else if data.TableDataDokLKPJ}
                    <p>Total {data.TableDataDokLKPJ.total} Dokumen LPPD pada Data Arsip. Terdapat {filteredFilesLKPJ.length} Dokumen Pengiriman LKPJ yang Sesuai Filter. Menampilkan halaman [{currentPageLKPJ}] dari [{totalPagesLKPJ}].</p>
                {/if}

                <div class="page-container">
                    <div class="filters-container">
                        <div class="filter-group">
                            <label for="kabupaten-select-lkpj">Pilih Kabupaten:</label>
                            <select id="kabupaten-select-lkpj" bind:value={selectKabKota} class="custom-select">
                                {#each kabupatenOptions as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="tahun-select-lkpj">Pilih Tahun:</label>
                            <select id="tahun-select-lkpj" bind:value={selectTahun} class="custom-select">
                                {#each tahunOptions as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="items-per-page-lkpj">Item per Halaman:</label>
                            <select id="items-per-page-lkpj" bind:value={itemsPerPage} class="custom-select" style="width: 100px;">
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                                <option value={12}>12</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>

                    <div class="pdf-grid">
                        {#each paginatedFilesLKPJ as cetakTabel (cetakTabel.$id)}
                            <div class="pdf-card-wrapper">
                                <a href={DownloadFile(cetakTabel.$id)} target="_blank" class="pdf-card">
                                    <div class="pdf-icon-placeholder">
                                        <Button style="height:100px;margin-bottom:6px;background: #fc9a9a;">
                                            <FilePdfOutline class="w-11 h-11" />
                                        </Button>
                                        <br/>
                                        <span class="pdf-text">PDF</span>
                                    </div>
                                    <div class="pdf-info">
                                        {cetakTabel.Jenis_laporan} {cetakTabel.Kabupaten_Kota} <br/>
                                        Tahun {cetakTabel.Tahun}
                                    </div>
                                </a>
                                {#if $user.prefs['Role'] === "PIC Otonomi"}
                                    <div class="pdf-actions">
                                        <ButtonGroup class="*:!ring-primary-700">
                                            <Button style="color:red;" on:click={() => openDeleteModalLKPJ(cetakTabel.$id)}>
                                                <TrashBinOutline class="w-4 h-4 me-2" />Hapus
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                {/if}
                            </div>
                        {/each}

                        {#if paginatedFilesLKPJ.length === 0 && filteredFilesLKPJ.length > 0}
                            <p class="no-results">Halaman ini kosong. Anda mungkin perlu kembali ke halaman pertama.</p>
                        {:else if filteredFilesLKPJ.length === 0}
                            <p class="no-results">Tidak ada dokumen yang ditemukan untuk filter ini.</p>
                        {/if}
                    </div>

                    {#if totalPagesLKPJ > 1}
                        <div class="flex justify-center mt-6 space-x-3">
                            <Button
                                color="alternative"
                                size="sm"
                                on:click={() => prevPage('LKPJ')}
                                disabled={currentPageLKPJ === 1}
                            >
                                <ChevronLeftOutline class="w-4 h-4 mr-1" />
                                Previous
                            </Button>
                            
                            <span class="text-sm font-medium py-2 px-4">
                                Page **{currentPageLKPJ}** of **{totalPagesLKPJ}**
                            </span>
                            
                            <Button
                                color="alternative"
                                size="sm"
                                on:click={() => nextPage('LKPJ')}
                                disabled={currentPageLKPJ === totalPagesLKPJ}
                            >
                                Next
                                <ChevronRightOutline class="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    {/if}
                    </div>

                    <Modal bind:open={ConfirmDeleteModalLKPJ} size="xs" autoclose={false}>
                    <div class="text-center">
                        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus data LKPJ dan File Document yang Anda Pilih</h3>
                        <Button color="red" class="me-2" on:click={() => remove(selectedIdLKPJ)}>Ya, Hapus Sekarang</Button>
                        <Button color="alternative" on:click={()=> ConfirmDeleteModalLKPJ = false}>Tidak, Batal</Button>
                    </div>
                     </Modal>

                <br/>

            </section>
        </TabItem>
    </Tabs>

    <br/> <br/>
</div>

<style>
/* Style CSS Anda tetap sama */
.page-container {
    padding: 20px;
    font-family: Arial, sans-serif;
}

/* Filters Styling */
.filters-container {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.filter-group {
    display: flex;
    flex-direction: column;
}

.filter-group label {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
}

.custom-select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 240px;
    background-color: white;
    appearance: none; 
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007bff%22%20d%3D%22M287%2069.9a17.6%2017.6%200%200%200-13.3-6.1H18.7a17.6%2017.6%200%200%200-13.3%206.1c-4.9%205.2-4.9%2013.7%200%2018.9l127%20134.8c4.9%205.2%2012.8%205.2%2017.7%200l127-134.8c4.8-5.2%204.8-13.6-.1-18.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 10px top 50%;
    background-size: 10px auto;
}

.filter-group label[for="kabupaten-select"] {
    color: #dc3545; 
}

.filter-group label[for="tahun-select"] {
    color: #dc3545; 
}

.filter-group label[for="kabupaten-select-lkpj"] {
    color: #dc3545; 
}

.filter-group label[for="tahun-select-lkpj"] {
    color: #dc3545; 
}

/* Grid and Card Styling */
.pdf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
}

/* Wrapper untuk card dan tombol aksi */
.pdf-card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.pdf-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: #000;
    padding: 15px 15px 10px 15px;
    border-radius: 5px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.pdf-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pdf-icon-placeholder {
    position: relative;
    width: 120px;
    height: 150px;
    background-color: #dbeaff; 
    border: 1px solid #c0d8ff;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(0 0, 80% 0, 100% 15%, 100% 100%, 0 100%);
}

.pdf-icon-placeholder::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 15%;
    background: #a9c7ff; 
    clip-path: polygon(0 100%, 100% 0, 100% 100%);
}

.pdf-text {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    color: #dc3545; 
    background-color: white;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #dc3545;
}

.pdf-info {
    font-size: 14px;
    line-height: 1.3;
    color: #333;
}

.pdf-info a {
    color: #dc3545; 
    text-decoration: underline;
}

/* Container untuk tombol aksi */
.pdf-actions {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 15px;
    margin-top: -5px;
}

/* Pastikan button group mengambil lebar penuh */
.pdf-actions :global(.ButtonGroup) {
    width: 100%;
}

.pdf-actions :global(button) {
    width: 100%;
    font-size: 13px;
    padding: 8px 12px;
}

.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 50px;
    color: #666;
}
</style>