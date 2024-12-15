<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Tabs, TabItem, Button, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {  TrashBinOutline, DownloadOutline, EyeOutline, BuildingOutline } from 'flowbite-svelte-icons';
    import { storage, databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
	 import { deleteTableData } from '$lib/DokumenLPPDLKPJ.js';


  function DownloadFile(id) {
  const result = storage.getFileView('675e48c4001bd540c846', id);
	return result;
}

  const remove = async (id) => {
		await deleteTableData(id);
    // Delete File Storage
		const result = await storage.deleteFile('675e48c4001bd540c846', id );
    console.log(result);
		invalidateAll();
	};

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Rekap Document LPPD & LKPJ Kabupaten/Kota - Sulawesi Tenggara</Heading>
    <br/><br/>

    <Tabs tabStyle="pill">
        <TabItem open>
          <span slot="title">Dokumen LPPD</span>
          <section>
            Dibawah berikut adalah Data Dokumen Pengiriman LPPD.  <br/>
              {#if data.TableDataDokLPPD.total === 0}
              <p>Saat ini Tidak ada Data Dokumen Pengiriman LPPD dan LKPJ</p>
              {:else}
              <p>Terdapat {data.TableDataDokLPPD.total} Dokumen Pengiriman LPPD</p>
               {/if}
               <br/>
              
                <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
                  <TableHead>
                    <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Nama Kabupaten / Kota</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Tahun</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Jenis Laporan</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Tanggal Submit</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Download File</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Pengirim</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
                  </TableHead>
                  <TableBody tableBodyClass="divide-y">
                    {#each data.TableDataDokLPPD.documents as cetakTabel, i}	
                    <TableBodyRow>
                      <TableBodyCell>{i+1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Tahun}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Jenis_laporan} {cetakTabel.Kabupaten_Kota} Tahun {cetakTabel.Tahun} </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.$updatedAt.slice(0, 10)}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:green;"><EyeOutline class="w-4 h-4 me-2" />Download File</Button></a> </ButtonGroup></TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2"><div style="width:260px;"><b>Nama Pengirim:</b> {cetakTabel.Nama_Pengirim} <br/><b>NIP Pengirim:</b> {cetakTabel.NIP_pengirim} <br/><b>Instansi Pengirim:</b> {cetakTabel.Instansi_Pengirim} <br/><b>Contac Person:</b> {cetakTabel.Contac_Person} </div>
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700">
                          <Button style="color:red;" on:click={() => remove(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                        </ButtonGroup></TableBodyCell>
                    </TableBodyRow>
                 {/each}
              
                  </TableBody>    
                </Table>
            </section>
        </TabItem>
        <TabItem>
          <span slot="title">Dokumen LKPJ</span>
          <section>
            Dibawah berikut adalah Data Dokumen Pengiriman LKPJ.  <br/>
              {#if data.TableDataDokLKPJ.total === 0}
              <p>Saat ini Tidak ada Data Dokumen Pengiriman LKPJ</p>
              {:else}
              <p>Terdapat {data.TableDataDokLKPJ.total} Dokumen Pengiriman LKPJ</p>
               {/if}
               <br/>
              
                <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
                  <TableHead>
                    <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Nama Kabupaten / Kota</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Tahun</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Jenis Laporan</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Tanggal Submit</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Download File</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Pengirim</TableHeadCell>
                    <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
                  </TableHead>
                  <TableBody tableBodyClass="divide-y">
                    {#each data.TableDataDokLKPJ.documents as cetakTabel, i}	
                    <TableBodyRow>
                      <TableBodyCell>{i+1}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Kabupaten_Kota}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Tahun}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.Jenis_laporan} {cetakTabel.Kabupaten_Kota} Tahun {cetakTabel.Tahun} </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2">{cetakTabel.$updatedAt.slice(0, 10)}</TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700"> <a href={DownloadFile(cetakTabel.$id)} target="_blank"><Button style="color:green;"><EyeOutline class="w-4 h-4 me-2" />Download File</Button></a> </ButtonGroup></TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2"><div style="width:260px;"><b>Nama Pengirim:</b> {cetakTabel.Nama_Pengirim} <br/><b>NIP Pengirim:</b> {cetakTabel.NIP_pengirim} <br/><b>Instansi Pengirim:</b> {cetakTabel.Instansi_Pengirim} <br/><b>Contac Person:</b> {cetakTabel.Contac_Person} </div>
                      </TableBodyCell>
                      <TableBodyCell class="whitespace-break-spaces py-3 px-2"><ButtonGroup class="*:!ring-primary-700">
                          <Button style="color:red;" on:click={() => remove(cetakTabel.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
                        </ButtonGroup></TableBodyCell>
                    </TableBodyRow>
                 {/each}
              
                  </TableBody>    
                </Table>
            </section>
        </TabItem>
      </Tabs>

  <br/> <br/>
</div>