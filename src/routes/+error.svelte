<script>
  import { page } from '$app/stores';
  
  $: isNetworkError = $page.error?.message?.includes('Periksa koneksi') || 
                      $page.error?.code === 'NETWORK_ERROR';
  $: is404Error = $page.status === 404;
</script>

<svelte:head>
  <title>
    {is404Error ? 'Halaman Tidak Ditemukan' : isNetworkError ? 'Tidak Ada Koneksi' : 'Terjadi Kesalahan'}
  </title>
</svelte:head>

<br/><br/><br/>
<div class="error-container">
  {#if is404Error}
    <div class="not-found-error">
      <div class="icon">🔍</div>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL yang dimasukkan salah.</p>
      <div class="button-group">
        <button class="retry-btn" on:click={() => history.back()}>
          <span class="btn-icon">←</span>
          Kembali
        </button>
        <button class="retry-btn" on:click={() => window.location.href = '/'}>
          <span class="btn-icon">🏠</span>
          Ke Beranda
        </button>
      </div>
    </div>
  {:else if isNetworkError}
    <div class="network-error">
      <div class="icon">🌐</div>
      <h1>Periksa Koneksi Internet Anda</h1>
      <p>Sepertinya ada masalah dengan koneksi internet Anda. Pastikan Anda terhubung ke internet dan coba lagi.</p>
      <button class="retry-btn" on:click={() => window.location.reload()}>
        <span class="btn-icon">🔄</span>
        Coba Lagi
      </button>
    </div>
  {:else}
    <div class="general-error">
      <div class="icon">⚠️</div>
      <h1>Terjadi Kesalahan</h1>
      <p>Maaf, terjadi kesalahan internal. Silakan coba lagi nanti.</p>
      <button class="retry-btn" on:click={() => history.back()}>
        Kembali
      </button>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background: linear-gradient(135deg, #5a86af 0%, #efebf2 100%);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    border-radius: 16px;
  }
  
  .network-error, .general-error, .not-found-error {
    text-align: center;
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-width: 500px;
    margin: 0 1rem;
  }

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  h1 {
    font-size: 2.5rem;
    margin: 1rem 0;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
  }
  
  p {
    font-size: 1.1rem;
    margin: 1.5rem 0 2rem 0;
    opacity: 0.9;
    line-height: 1.6;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .retry-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .retry-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .btn-icon {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .retry-btn:hover .btn-icon {
    transform: rotate(180deg);
  }

  /* Khusus untuk icon panah dan rumah, tidak perlu rotasi */
  .retry-btn:hover .btn-icon:first-child {
    transform: translateX(-2px);
  }

  /* Responsive */
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .network-error, .general-error, .not-found-error {
      padding: 2rem 1.5rem;
    }
    
    .icon {
      font-size: 3rem;
    }

    .button-group {
      flex-direction: column;
      align-items: center;
    }

    .retry-btn {
      width: 100%;
      max-width: 200px;
    }
  }
</style>