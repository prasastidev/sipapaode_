<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Toggle, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import { InfoCircleOutline } from 'flowbite-svelte-icons';
    import { Popover } from 'flowbite-svelte';
    import { databases } from '$lib/appwrite';
    import { invalidateAll } from '$app/navigation';
    import { ID, Query } from 'appwrite';

    function UpdateLayananOnline(Status_raw, id) {
        Status_raw = !Status_raw;
        const promise = databases.updateDocument('673dd7b2001a83873b47', '6742979f00204341e7dd', id, {
            Status_raw: Status_raw
        });
        invalidateAll();

        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
            throw error;
        });
    }

    const uniqueBidang = [...new Set(data.TableDatasLayananOnline.documents.map(item => item.Bidang))];
    let selectedBidang = '';

    // Array untuk menyimpan index yang ingin disembunyikan dari data asli
    const hiddenIndexes = [0, 2, 3, 4, 5, 6];

    $: filteredData = selectedBidang 
        ? data.TableDatasLayananOnline.documents
            .map((item, originalIndex) => ({ ...item, originalIndex })) // Tambahkan originalIndex
            .filter(item => !hiddenIndexes.includes(item.originalIndex)) // Filter berdasarkan index asli
            .filter(item => item.Bidang === selectedBidang) // Filter berdasarkan bidang
        : data.TableDatasLayananOnline.documents
            .map((item, originalIndex) => ({ ...item, originalIndex })) // Tambahkan originalIndex
            .filter(item => !hiddenIndexes.includes(item.originalIndex)); // Filter berdasarkan index asli

</script>

<svelte:head>
    <title>Fitur Layanan</title>
    <meta name="description" content="Fitur" />
</svelte:head>

<div class="container">
    <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Pengaturan Visibility Formulir Layanan</Heading>
    <br/>

   <br/>

    <!-- Filter Buttons -->
    <div class="mb-4 flex gap-2">
        <button 
            class="px-4 py-2 rounded {!selectedBidang ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
            on:click={() => selectedBidang = ''}>
            All
        </button>
        {#each uniqueBidang as bidang}
            <button 
                class="px-4 py-2 rounded {selectedBidang === bidang ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
                on:click={() => selectedBidang = bidang}>
                {bidang}
            </button>
        {/each}
    </div>

    <section>
        <br/>
        {#if data.TableDatasLayananOnline.documents.length > 0}
        <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
            <TableHead>
                <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
                <TableHeadCell style="font-size: larger;" class="py-4">Layanan Online</TableHeadCell>
                <TableHeadCell style="font-size: larger;" class="py-4">Bidang</TableHeadCell>
                <TableHeadCell style="font-size: larger;display:flex;" class="py-4">Enable/Disable 
                    <button id="InfoAktif" style="margin-top:-4px;">
                        <InfoCircleOutline class="w-5 h-5 ms-1.5 mr-1" /> 
                    </button>
                </TableHeadCell>
            </TableHead>
            <Popover triggeredBy="#InfoAktif" class="w-40 md:w-64 lg:w-64 text-sm font-light text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-20" placement="left-start">
                <div class="p-3 space-y-2" style="z-index:100;">
                    Tekan tombol Toggle dibawah untuk melakukan Enable atau Disable Formulir Online.
                </div>
            </Popover>
            <TableBody tableBodyClass="divide-y">
                {#each filteredData as cetakTabel, i}	
                    <TableBodyRow>
                        <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
                            <span class="Bulat">{i+1}</span>
                        </TableBodyCell>
                        <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
                            {cetakTabel.Jenis_layanan}
                        </TableBodyCell>
                        <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
                            {cetakTabel.Bidang}
                        </TableBodyCell>
                        <TableBodyCell class="py-3 whitespace-break-spaces">
                            <Toggle color="green" bind:checked={cetakTabel.Status_raw} on:click={UpdateLayananOnline(cetakTabel.Status_raw, cetakTabel.$id )}>
                                Formulir Online {cetakTabel.Status_raw ? 'Aktif' : 'Tidak Aktif'}
                            </Toggle>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
        {:else}
        <p class="alert alert-danger">No Data found</p>
        {/if}
    </section>
    <br/>
</div>

<!-- Style tetap sama -->
<style>
    .Bulat {
        background: #86bcea;
        border-radius: 3em;
        -moz-border-radius: 3em;
        -webkit-border-radius: 3em;
        color: #ffffff;
        height: 1.8em;
        width: 1.8em;
        display: inline-block;
        font-size: 14px;
        line-height: 2em;
        text-align: center;
    }

</style>