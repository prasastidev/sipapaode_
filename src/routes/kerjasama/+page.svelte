<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, FloatingLabelInput, Fileupload, Label, Helper } from 'flowbite-svelte';
    let files;

</script>

<svelte:head>
	<title>Kerjasama</title>
	<meta name="description" content="Kerjasama" />
</svelte:head>

<br/><br/>


<div class="text-column w-full">
	<Heading tag="h3" class="mb-4" customSize="text-3xl text-center font-extrabold  md:text-3xl lg:text-4xl">FORM PENGAJUAN</Heading>
	<br/>
    <p>
		Dibawah berikut adalah Form Pengajuan Kerjasama
	</p> <br/>
    <div id="exampleWrapper" class="grid gap-3 mb-6">
        <FloatingLabelInput style="filled" id="floating_name" name="floating_name" type="text">
          Masukan Nama Lengkap
        </FloatingLabelInput>
        <FloatingLabelInput style="filled" id="floating_email" name="floating_email" type="email">
            Masukan Email
          </FloatingLabelInput>
          <FloatingLabelInput style="filled" id="floating_email" name="floating_email" type="tel">
            Masukan No Telepon
          </FloatingLabelInput>
      </div>

     <Label for="UploadDocument" class="pb-2">Upload Document Perusahaan</Label>
     <Fileupload id="UploadDocument" class="mb-2" />
     <Helper>DOC, PDF (MAX. 800x400px).</Helper>
     <br/>
     <Label for="UploadKTP" class="pb-2">Upload KTP</Label>
     <Fileupload id="UploadKTP" class="mb-2" />
     <Helper>SVG, PNG, JPG or GIF (MAX. 800x400px).</Helper>
      
</div>