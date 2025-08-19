<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Button, ButtonGroup } from 'flowbite-svelte';
    import { EyeOutline, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

    // Ambil data dari load function dengan struktur yang benar
    $: allJournalEntries = data?.TableJournalKegiatan?.documents || [];
    
    // Pagination settings
    const itemsPerPage = 50;
    let currentPage = 1;
    
    // Calculate pagination
    $: totalPages = Math.ceil(allJournalEntries.length / itemsPerPage);
    $: startIndex = (currentPage - 1) * itemsPerPage;
    $: endIndex = startIndex + itemsPerPage;
    $: journalEntries = allJournalEntries.slice(startIndex, endIndex);
    
    // Pagination functions
    function goToPage(page) {
        currentPage = page;
        // Scroll to top when changing page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function nextPage() {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }
    
    function prevPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
    
    // Generate page numbers for pagination
    $: visiblePages = (() => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    })();

    // Fungsi untuk format tanggal Indonesia
    function formatTanggalIndonesia(dateString) {
        if (!dateString) return 'undefined';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'undefined';
            
            const months = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];
            
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            
            return `${day} ${month} ${year}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'undefined';
        }
    }

     const today = new Date();

  // Opsi untuk memformat tanggal agar lebih mudah dibaca
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Format tanggal ke dalam string yang mudah dibaca
  const formattedDate = today.toLocaleDateString('id-ID', options);
</script>

<svelte:head>
    <title>Journal Kegiatan</title>
    <meta name="description" content="Journal Kegiatan - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold md:text-3xl lg:text-4xl" style="color:#1f4d8c;">TimeLine Journal Kegiatan Biro Pemerintahan</Heading>
    <p style="font-size:20px;">📅 Tanggal hari ini: <strong>{formattedDate}</strong></p>
    <br/>
    <!-- Pagination Info -->
    {#if allJournalEntries.length > 0}
        <div class="pagination-info">
            <p class="text-sm text-gray-600 mb-4">
                Menampilkan {startIndex + 1} - {Math.min(endIndex, allJournalEntries.length)} dari {allJournalEntries.length} journal kegiatan
                (Halaman {currentPage} dari {totalPages})
            </p>
        </div>
    {/if}
    
    <br/><br/>

    {#if journalEntries && journalEntries.length > 0}
        <div class="timeline">
            {#each journalEntries as entry, index}
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    
                    <div class="date-badge">
                       Diterbitkan:<br/> {formatTanggalIndonesia(entry.$updatedAt?.slice(0, 10)) || formatTanggalIndonesia(entry.$createdAt?.slice(0, 10)) || 'undefined'}
                    </div>
                    
                    <div class="content-wrapper">
                        <div class="image-container">
                            {#if entry.URL}
                                <img 
                                    src={entry.URL} 
                                    alt={entry.Description || 'Journal image'}
                                    class="journal-image"
                                    on:error={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                <div class="image-placeholder" style="display: none;">
                                    Image Gambar
                                </div>
                            {:else}
                                <div class="image-placeholder">
                                    Image Gambar
                                </div>
                            {/if}
                        </div>
                        
                        <div class="content-details">
                            <div class="activity-title">
                                {entry.Title || `Kegiatan ${startIndex + index + 1}`}
                            </div>
                            
                            <div class="description">
                                {entry.Description || 'Tidak ada deskripsi tersedia'}
                            </div>
                            
                            <div class="meta-info">
                                <div class="meta-item">
                                    <span class="meta-text">📍 Lokasi Kegiatan: {entry.Location || 'undefined'}</span>
                                </div>
                                
                                <div class="meta-item">
                                    <span class="meta-text">📅 Tanggal Kegiatan: {formatTanggalIndonesia(entry.TanggalKegiatan?.slice(0, 10)) || formatTanggalIndonesia(entry.$createdAt?.slice(0, 10)) || 'undefined'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        
        <!-- Pagination Controls -->
        {#if totalPages > 1}
            <div class="pagination-container">
                <div class="pagination-wrapper">
                    <!-- Previous Button -->
                    <Button 
                        color="light" 
                        size="sm"
                        disabled={currentPage === 1}
                        on:click={prevPage}
                        class="pagination-btn"
                    >
                        <ChevronLeftOutline class="w-4 h-4 me-1" />
                        Sebelumnya
                    </Button>
                    
                    <!-- Page Numbers -->
                    <ButtonGroup class="pagination-numbers">
                        {#each visiblePages as page}
                            {#if page === '...'}
                                <span class="pagination-ellipsis">...</span>
                            {:else}
                                <Button 
                                    color={currentPage === page ? 'blue' : 'light'}
                                    size="sm"
                                    on:click={() => goToPage(page)}
                                    class="pagination-number {currentPage === page ? 'active' : ''}"
                                >
                                    {page}
                                </Button>
                            {/if}
                        {/each}
                    </ButtonGroup>
                    
                    <!-- Next Button -->
                    <Button 
                        color="light" 
                        size="sm"
                        disabled={currentPage === totalPages}
                        on:click={nextPage}
                        class="pagination-btn"
                    >
                        Berikutnya
                        <ChevronRightOutline class="w-4 h-4 ms-1" />
                    </Button>
                </div>
                
                <!-- Quick Page Jump -->
                <div class="page-jump">
                    <label for="pageInput" class="text-sm text-gray-600 me-2">Ke halaman:</label>
                    <input 
                        id="pageInput"
                        type="number" 
                        min="1" 
                        max={totalPages}
                        bind:value={currentPage}
                        on:input={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= totalPages) {
                                goToPage(value);
                            }
                        }}
                        class="page-input"
                    />
                    <span class="text-sm text-gray-600 ms-2">dari {totalPages}</span>
                </div>
            </div>
        {/if}
        
    {:else if allJournalEntries.length > 0}
        <div class="no-data">
            <p>Tidak ada data pada halaman ini.</p>
        </div>
    {:else}
        <div class="no-data">
            <p>Belum ada data journal kegiatan tersedia.</p>
            <p style="font-size: 12px; color: #999; margin-top: 10px;">
                Total documents: {data?.TableJournalKegiatan?.total || 0}
            </p>
        </div>
    {/if}
</div>

<br/><br/>

<style>
    .timeline {
        position: relative;
        padding-left: 30px;
    }

    .timeline::before {
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #bdc3c7;
    }

    .timeline-item {
        position: relative;
        margin-bottom: 40px;
        display: flex;
        gap: 20px;
    }

    .timeline-dot {
        position: absolute;
        left: -30px;
        top: 10px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #3498db;
        border: 3px solid white;
        box-shadow: 0 0 0 2px #3498db;
        z-index: 1;
    }

    .date-badge {
        background: #fef9c2;
        color: #894b00;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        height: fit-content;
        border: 1px solid #ffdf20;
    }

    .content-wrapper {
        flex: 1;
        display: flex;
        gap: 20px;
        align-items: flex-start;
        background: linear-gradient(135deg, rgb(255, 255, 255), rgb(241, 245, 248));
        padding: 6px 10px;
        border-radius: 10px;
        box-shadow: rgb(90, 134, 175) 6px 8px;
    }

    .image-container {
        width: 200px;
        height: 150px;
        flex-shrink: 0;
        position: relative;
    }

    .journal-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
        border: 2px solid #e1f0ff;
    }

    .image-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #e8f4fd, #c3e5f8);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #7fb3d3;
        font-weight: 500;
        border: 2px solid #e1f0ff;
    }

    .content-details {
        flex: 1;
    }

    .activity-title {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 10px;
        line-height: 1.3;
    }

    .description {
        font-size: 14px;
        color: #5a6c7d;
        line-height: 1.6;
        margin-bottom: 15px;
        text-align: justify;
    }

    .meta-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
    }

    .meta-text {
        color: #34495e;
        font-weight: 500;
    }

    .no-data {
        text-align: center;
        padding: 40px 20px;
        color: #7f8c8d;
        font-style: italic;
    }

    .pagination-info {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }

    /* Pagination Styles */
    .pagination-container {
        margin-top: 40px;
        padding: 20px 0;
        border-top: 2px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }

    .pagination-wrapper {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .pagination-numbers {
        display: flex;
        gap: 2px;
    }

    .pagination-ellipsis {
        padding: 8px 12px;
        color: #6b7280;
        font-weight: 500;
        display: flex;
        align-items: center;
    }

    .page-jump {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .page-input {
        width: 60px;
        padding: 4px 8px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        text-align: center;
        font-size: 14px;
    }

    .page-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    :global(.pagination-btn) {
        min-width: 100px;
    }

    :global(.pagination-number) {
        min-width: 40px;
    }

    :global(.pagination-number.active) {
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .content-wrapper {
            flex-direction: column;
        }
        
        .image-container {
            width: 100%;
            height: 120px;
        }
        
        .container {
            padding: 15px;
        }
        
        .timeline {
            padding-left: 20px;
        }
        
        .timeline::before {
            left: 10px;
        }
        
        .timeline-dot {
            left: -20px;
        }

        .pagination-wrapper {
            flex-direction: column;
            gap: 10px;
        }

        .pagination-numbers {
            order: 2;
        }

        .pagination-btn {
            order: 1;
        }

        .page-jump {
            order: 3;
            font-size: 12px;
        }
    }
</style>