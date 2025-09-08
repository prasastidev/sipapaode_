<script>
    /** @type {{ data: import('./$types').PageData }} */
    export let data;
    
    import { Button, ButtonGroup, Label, Heading } from 'flowbite-svelte';
    import { FilePdfOutline, ImageOutline } from 'flowbite-svelte-icons';

    // --- State Management ---
    // Untuk tujuan demonstrasi, saya tambahkan lebih banyak data dummy
    let submissions = [
        { id: 1, data: { nama: 'Budiman Astrodinoto', nik: '112455598234', email: 'budiman@email.com', kontak: '081235432', alamat: 'Jl. Artadinata B No. 5', permintaan: 'Informasi Dokumen LPPD Prov. Sultra tahun 2025', tujuan: 'Riset', infoMethod: 'salinan', pemberianMethod: 'email' }, ktpFile: { name: 'ktp_budiman.jpg' }, pengesahanFile: { name: 'pengesahan_a.pdf' }, status: 'Telah Diproses' },
        { id: 2, data: { nama: 'Citra Lestari', nik: '345678901234', email: 'citra@email.com', kontak: '08122343', alamat: 'Jl. Bangkok No 10', permintaan: 'Informasi Laporan Kerjasama Prov. Sultra tahun 2025', tujuan: 'Research', infoMethod: 'salinan', pemberianMethod: 'email' }, ktpFile: { name: 'ktp_citra.jpg' }, pengesahanFile: null, status: 'Telah Diproses' },
        { id: 3, data: { nama: 'Andi Wijaya', nik: '567890123456', email: 'andi@email.com', kontak: '0812213', alamat: 'Jl. Cluster', permintaan: 'Info C', tujuan: 'Riset C', infoMethod: 'lihat', pemberianMethod: 'langsung' }, ktpFile: { name: 'ktp_andi.jpg' }, pengesahanFile: { name: 'pengesahan_c.pdf' }, status: 'Telah Diproses' },
        { id: 4, data: { nama: 'Dewi Sartika', nik: '789012345678', email: 'dewi@email.com', kontak: '08123443', alamat: 'Jl. Dominggo', permintaan: 'Info D', tujuan: 'Riset D', infoMethod: 'salinan', pemberianMethod: 'email' }, ktpFile: { name: 'ktp_dewi.jpg' }, pengesahanFile: { name: 'pengesahan_d.pdf' }, status: 'Telah Diproses' },
        { id: 5, data: { nama: 'Eko Prasetyo', nik: '901234567890', email: 'eko@email.com', kontak: '0812333', alamat: 'Jl. Eralangga', permintaan: 'Info E', tujuan: 'Riset E', infoMethod: 'lihat', pemberianMethod: 'langsung' }, ktpFile: { name: 'ktp_eko.jpg' }, pengesahanFile: null, status: 'Menunggu Proses' },
        { id: 6, data: { nama: 'Fajar Nugroho', nik: '123456789012', email: 'fajar@email.com', kontak: '08122223', alamat: 'Jl. Fahrenhait', permintaan: 'Info F', tujuan: 'Riset F', infoMethod: 'salinan', pemberianMethod: 'email' }, ktpFile: { name: 'ktp_fajar.jpg' }, pengesahanFile: { name: 'pengesahan_f.pdf' }, status: 'Telah Diproses' }
    ];

    // --- LOGIKA PENCARIAN ---
    let searchTerm = '';
    $: filteredSubmissions = searchTerm
        ? submissions.filter(submission => {
            const lowerCaseSearch = searchTerm.toLowerCase();
            return (
                submission.data.nama.toLowerCase().includes(lowerCaseSearch) ||
                submission.data.nik.includes(searchTerm)
            );
        })
        : submissions;
    
    // --- LOGIKA PAGINATION ---
    let currentPage = 1;
    let itemsPerPage = 3; // Tampilkan 3 data per halaman

    // Reactive statements untuk pagination
    $: totalItems = filteredSubmissions.length;
    $: totalPages = Math.ceil(totalItems / itemsPerPage);
    // Potong data yang sudah difilter sesuai halaman saat ini
    $: paginatedSubmissions = filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset ke halaman 1 setiap kali hasil pencarian berubah
    $: if (filteredSubmissions) currentPage = 1;

    function handleDelete(id) {
        submissions = submissions.filter(sub => sub.id !== id);
    }
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
      {#each paginatedSubmissions as submission, i (submission.id)}
        <div class="bg-white rounded-lg shadow-lg p-6 border-l-8 border-sky-700 flex items-start gap-6">
            <div class="w-10 h-10 bg-sky-700 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ring-4 ring-white">
                {(currentPage - 1) * itemsPerPage + i + 1}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 flex-grow">
              <div class="space-y-3">
                <div><Label><b>Nama Lengkap:</b></Label><p class="text-gray-700">{submission.data.nama}</p></div>
                <div><Label><b>NIK:</b></Label><p class="text-gray-700">{submission.data.nik}</p></div>
                <div><Label><b>Email:</b></Label><p class="text-gray-700">{submission.data.email}</p></div>
                <div><Label><b>Kontak:</b></Label><p class="text-gray-700">{submission.data.kontak}</p></div>
                <div><Label><b>Alamat:</b></Label><p class="text-gray-700">{submission.data.alamat}</p></div>
              </div>
              <div class="space-y-3">
                <div><Label><b>Permintaan Informasi:</b></Label><p class="text-gray-700">{submission.data.permintaan}</p></div>
                <div><Label><b>Tujuan:</b></Label><p class="text-gray-700">{submission.data.tujuan}</p></div>
                <div><Label><b>Cara Mendapatkan:</b></Label><p class="text-gray-700 capitalize">{submission.data.infoMethod}</p></div>
                <div><Label><b>Cara Pemberian:</b></Label><p class="text-gray-700 capitalize">{submission.data.pemberianMethod}</p></div>
              </div>
              <div class="space-y-3">
                <div>
                  <Label><b>File KTP:</b></Label>
                  {#if submission.ktpFile} <span class="text-blue-600 flex items-center gap-1"><ImageOutline class="w-5 h-5" /> {submission.ktpFile.name}</span> {:else} - {/if}
                </div>
                <div>
                  <Label><b>File Pengesahan:</b></Label>
                  {#if submission.pengesahanFile} <span class="text-red-600 flex items-center gap-1"><FilePdfOutline class="w-5 h-5" /> {submission.pengesahanFile.name}</span> {:else} - {/if}
                </div>
                  <div><Label><b>Status:</b></Label><p class="font-semibold text-green-600">{submission.status}</p></div>
                  <div class="flex gap-2 pt-4">
                   <Button size="sm" color="light">Edit</Button>
                   <Button size="sm" color="red" on:click={() => handleDelete(submission.id)}>Delete</Button>
                  </div>
              </div>
            </div>
        </div>
      {:else}
        <div class="text-center py-10 border rounded-lg bg-gray-50">
            <p class="text-gray-600 font-semibold">Data Tidak Ditemukan</p>
            <p class="text-gray-500 mt-1">Tidak ada data yang cocok dengan pencarian "{searchTerm}".</p>
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