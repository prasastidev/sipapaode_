<script>
    /** @type {import('./$types').PageData} */
    export let data = [];
    import { Heading, Tabs, TabItem, Gallery, ButtonGroup, Button } from 'flowbite-svelte';
    import { ZoomInOutline, ImageOutline } from 'flowbite-svelte-icons';
    import { storage, ID } from '$lib/appwrite';
   

  function showimageKS(id) {
    const result = storage.getFileView('67545c85000bd5d33ef2', id);
    return result;  
  }

  function showimageOtonomi(id) {
    const result = storage.getFileView('67920a70002df0712bce', id);
    return result;  
  }

  function showimagePemerintahan(id) {
    const result = storage.getFileView('6791fea50005705fec23', id);
    return result;  
  }

</script>

<svelte:head>
	<title>Gallery Foto dan Kegiatan</title>
	<meta name="description" content="Gallery Foto & Kegiatan - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/><br/>

<div class="container">
    <Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Gallery Foto & Kegiatan</Heading>
    <br/>

    <Tabs tabStyle="underline">
      <TabItem open>
        <div slot="title" class="flex items-center gap-2 text-lg">
          <ImageOutline size="lg" /> Bagian Kerjasama
        </div>   
          {#if data.DatasGambarKS.total === 0}
          <p>Saat ini Tidak terdapat Gambar pada Gallery Photo Bagian Kerjasama.</p>
          {:else}
          <p>Terdapat {data.DatasGambarKS.total} Gambar dalam Folder Gallery Bagian Kerjasama</p>
        {/if}
         <br/>
          <div style="padding:18px;border-radius:12px;border:2px solid #e4e4ff;">
            <div class="grid grid-cols-3 gap-4">
              {#each data.DatasGambarKS.files as cetakTabel,i}
             <div style="float:left;text-align:center;">
             <img src={showimageKS(cetakTabel.$id)} alt="image" style="width:460px;height:240px;margin:10px;border-radius:10px;"/>
             <span style="font-size:14px;">{cetakTabel.name}</span> <br/>
              <ButtonGroup class="*:!ring-primary-700">
                <Button style="color:blue;"><a href={showimageKS(cetakTabel.$id)} target="_blank" style="color:blue;display:flex;align-items: center;"><ZoomInOutline class="w-4 h-4 me-2 flex" />Lihat</a></Button>
             </ButtonGroup> 
              </div>
             {/each}
            </div>    
      </TabItem>
      <TabItem>
        <div slot="title" class="flex items-center gap-2 text-lg">
          <ImageOutline size="lg" /> Koordinator Pemerintahan
        </div>
        {#if data.DatasGambarPemerintahan.total === 0}
        <p>Saat ini Tidak terdapat Gambar pada Gallery Photo Koordinator Pemerintahan.</p>
        {:else}
        <p>Terdapat {data.DatasGambarPemerintahan.total} Gambar dalam Folder Gallery Koordinator Pemerintahan</p>
      {/if}
       <br/>
        <div style="padding:18px;border-radius:12px;border:2px solid #e4e4ff;">
          <div class="grid grid-cols-3 gap-4">
            {#each data.DatasGambarPemerintahan.files as cetakTabel,i}
           <div style="float:left;text-align:center;">
           <img src={showimagePemerintahan(cetakTabel.$id)} alt="image" style="width:460px;height:240px;margin:10px;border-radius:10px;"/>
           <span style="font-size:14px;">{cetakTabel.name}</span> <br/>
            <ButtonGroup class="*:!ring-primary-700">
              <Button style="color:blue;"><a href={showimagePemerintahan(cetakTabel.$id)} target="_blank" style="color:blue;display:flex;align-items: center;"><ZoomInOutline class="w-4 h-4 me-2 flex" />Lihat</a></Button>
           </ButtonGroup> 
            </div>
           {/each}
          </div> 
      </TabItem>
      <TabItem>
        <div slot="title" class="flex items-center gap-2 text-lg">
          <ImageOutline size="lg" /> Koordinator Otonomi Daerah
        </div>
        {#if data.DatasGambarOtonomi.total === 0}
          <p>Saat ini Tidak terdapat Gambar pada Gallery Photo Koordinator Otonomi Daerah.</p>
          {:else}
          <p>Terdapat {data.DatasGambarOtonomi.total} Gambar dalam Folder Gallery Koordinator Otonomi Daerah</p>
        {/if}
         <br/>
          <div style="padding:18px;border-radius:12px;border:2px solid #e4e4ff;">
            <div class="grid grid-cols-3 gap-4">
              {#each data.DatasGambarOtonomi.files as cetakTabel,i}
             <div style="float:left;text-align:center;">
             <img src={showimageOtonomi(cetakTabel.$id)} alt="image" style="width:460px;height:240px;margin:10px;border-radius:10px;"/>
             <span style="font-size:14px;">{cetakTabel.name}</span> <br/>
              <ButtonGroup class="*:!ring-primary-700">
                <Button style="color:blue;"><a href={showimageOtonomi(cetakTabel.$id)} target="_blank" style="color:blue;display:flex;align-items: center;"><ZoomInOutline class="w-4 h-4 me-2 flex" />Lihat</a></Button>
             </ButtonGroup> 
              </div>
             {/each}
            </div> 
      </TabItem>
    </Tabs>


    <br/>

    <br/>
</div>