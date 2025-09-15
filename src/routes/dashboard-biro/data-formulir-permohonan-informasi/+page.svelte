<script>
    /** @type {{ data: import('./$types').PageData }} */
     export let data;
    
    import { Button, ButtonGroup, Label, Heading } from 'flowbite-svelte';
    import { FilePdfOutline, ImageOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
	  import { deleteTableData, UpdateStatusPermohonanInformasi } from '$lib/DatapermohonanInformasiOnline.js';


    // --- State Management ---
  
// PERUBAHAN: Inisialisasi 'submissions' dari prop 'data' yang diterima dari +page.js
    // Gunakan reactive statement ($:) agar 'submissions' otomatis update jika 'data' berubah.
    $: submissions = data.TableDataPermohonanInformasi.documents || [];

    function DownloadFile(id) {
        const result = storage.getFileView('68a48e3400216612eab6', id);
        return result.href; // PERUBAHAN: Kembalikan href untuk digunakan di tag <a>
    }

    const remove = async (id) => {
        try {
            const document = await databases.getDocument(
                '673dd7b2001a83873b47', 
                'data_pengajuan_permohonan_informasi_',
                id
            );
            
            const deletePromises = [];
            
            if (document.IDBucketLampiranKTP) {
                deletePromises.push(
                    storage.deleteFile('68a48e3400216612eab6', document.IDBucketLampiranKTP)
                );
            }
            
            if (document.IDBucketLampiranPengesahan) {
                deletePromises.push(
                    storage.deleteFile('68a48e3400216612eab6', document.IDBucketLampiranPengesahan)
                );
            }
            
            await Promise.all(deletePromises);
            await deleteTableData(id);
            
            console.log('Berhasil menghapus data dan semua lampiran');
            await invalidateAll(); // Panggil invalidateAll untuk memuat ulang data dari server
            
        } catch (error) {
            console.error('Error saat menghapus data:', error);
            // Anda bisa menambahkan notifikasi error ke user di sini
        }
    };

    // --- LOGIKA PENCARIAN ---
    let searchTerm = '';
    $: filteredSubmissions = searchTerm
        ? submissions.filter(submission => {
            const lowerCaseSearch = searchTerm.toLowerCase();
            // PERUBAHAN: Akses properti langsung dari 'submission', bukan 'submission.data'
            return (
                submission.NamaLengkap.toLowerCase().includes(lowerCaseSearch) ||
                submission.NIK.includes(searchTerm)
            );
        })
        : submissions;
    
    // --- LOGIKA PAGINATION ---
    let currentPage = 1;
    let itemsPerPage = 3; 

    $: totalItems = filteredSubmissions.length;
    $: totalPages = Math.ceil(totalItems / itemsPerPage);
    $: paginatedSubmissions = filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    $: if (searchTerm) currentPage = 1; // Reset ke halaman 1 saat pencarian berubah

    // PERUBAHAN: Fungsi handleDelete dihapus karena tidak digunakan dan tidak efisien.
    // Kita langsung memanggil fungsi 'remove' yang berinteraksi dengan database.
</script>

<svelte:head>
    <title>Dashboard Permohonan Informasi</title>
    <meta name="description" content="Dashboard Permohonan Informasi" />
</svelte:head>

<div class="container mx-auto px-4 py-8">

    <Heading tag="h3" customSize="text-xl text-left font-extrabold md:text-2xl lg:text-3xl">Data Pengajuan Permohonan Informasi</Heading>
    <br/>

    <form class="flex items-center w-full" on:submit|preventDefault>
      <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
          </div>
          <input 
            type="text" 
            id="simple-search" 
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" 
            placeholder="Cari berdasarkan Nama atau NIK..." 
            bind:value={searchTerm}
          />
      </div>
    </form>
    <br/>
    
    <div class="mb-4 text-sm text-gray-600">
        Menampilkan {paginatedSubmissions.length} dari {totalItems} data yang cocok. Halaman {currentPage} dari {totalPages}.
    </div>

    <div class="space-y-6">
      {#each paginatedSubmissions as submission, i (submission.$id)}
        <div class="bg-white rounded-lg shadow-lg p-6 border-l-8 border-sky-700 flex items-start gap-6" transition:slide>
            <div class="w-10 h-10 bg-sky-700 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ring-4 ring-white">
                {(currentPage - 1) * itemsPerPage + i + 1}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 flex-grow">
              <div class="space-y-3">
                    <div><Label><b>Nama Lengkap:</b></Label><p class="text-gray-700">{submission.NamaLengkap}</p></div>
                    <div><Label><b>NIK:</b></Label><p class="text-gray-700">{submission.NIK}</p></div>
                    <div><Label><b>Email:</b></Label><p class="text-gray-700">{submission.Email}</p></div>
                    <div><Label><b>Kontak:</b></Label><p class="text-gray-700">{submission.NoContact}</p></div>
                    <div><Label><b>Alamat:</b></Label><p class="text-gray-700">{submission.Alamat}</p></div>
                </div>
                <div class="space-y-3">
                    <div><Label><b>Permintaan Informasi:</b></Label><p class="text-gray-700">{submission.PermintaanInformasi}</p></div>
                    <div><Label><b>Tujuan:</b></Label><p class="text-gray-700">{submission.TujuanPengajuan}</p></div>
                    <div><Label><b>Cara Mendapatkan:</b></Label><p class="text-gray-700 capitalize">{submission.CaraMendapatkan}</p></div>
                    <div><Label><b>Cara Pemberian:</b></Label><p class="text-gray-700 capitalize">{submission.CaraPemberian}</p></div>
                </div>
                <div class="space-y-3">
                    <div>
                        <Label><b>File KTP:</b></Label>
                        {#if submission.IDBucketLampiranKTP}
                            <a href={DownloadFile(submission.IDBucketLampiranKTP)} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline flex items-center gap-1">
                                <ImageOutline class="w-5 h-5" /> Lihat/Unduh File
                            </a>
                        {:else} - {/if}
                    </div>
                    <div>
                        <Label><b>File Pengesahan:</b></Label>
                        {#if submission.IDBucketLampiranPengesahan}
                            <a href={DownloadFile(submission.IDBucketLampiranPengesahan)} target="_blank" rel="noopener noreferrer" class="text-red-600 hover:underline flex items-center gap-1">
                                <FilePdfOutline class="w-5 h-5" /> Lihat/Unduh File
                            </a>
                        {:else} - {/if}
                    </div>
                    <div><Label><b>Status:</b></Label><p class="font-semibold text-green-600">{submission.Status}</p></div>
                    <div class="flex gap-2 pt-4">
                        <Button size="sm" color="light">Edit</Button>
                        <Button size="sm" color="red" on:click={() => remove(submission.$id)}>Delete</Button>
                    </div>
                </div>
            </div>
        </div>
      {:else}
        <div class="text-center py-10 border rounded-lg bg-gray-50">
            <p class="text-gray-600 font-semibold">Data Tidak Ditemukan</p>
            <p class="text-gray-500 mt-1">
                {#if searchTerm}
                    Tidak ada data yang cocok dengan pencarian "{searchTerm}".
                {:else}
                    Belum ada data pengajuan yang masuk.
                {/if}
            </p>
        </div>
      {/each}
    </div>
    
    {#if totalPages > 1}
      <div class="flex justify-center mt-8">
          <ButtonGroup>
              <Button on:click={() => currentPage = Math.max(1, currentPage - 1)} disabled={currentPage === 1} color="light">Sebelumnya</Button>
              {#each Array(totalPages) as _, page}
                  {@const pageNumber = page + 1}
                  <Button 
                      on:click={() => currentPage = pageNumber} 
                      color={currentPage === pageNumber ? 'blue' : 'light'}
                  >
                      {pageNumber}
                  </Button>
              {/each}
              <Button on:click={() => currentPage = Math.min(totalPages, currentPage + 1)} disabled={currentPage === totalPages} color="light">Berikutnya</Button>
          </ButtonGroup>
      </div>
    {/if}
</div>