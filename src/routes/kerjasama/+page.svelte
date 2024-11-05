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

<br/><br/><br/>


<div class="text-column w-full">
	<Heading tag="h3" class="mb-4" customSize="text-3xl text-center font-extrabold  md:text-3xl lg:text-4xl">Formulir Fasilitas Kerjasama & PKS dengan Pihak Ketiga / Badan Usaha (Swasta)</Heading>
	<br/>
    <p>
		Dibawah berikut adalah Form Pengajuan Kerjasama
	</p> <br/>
    <div id="exampleWrapper" class="grid gap-3 mb-6">
      <Heading tag="h4" class="mb-2" customSize="text-xl font-extrabold  md:text-2xl lg:text-2xl">Identitas Perusahaan (Badan Usaha)</Heading>
        <FloatingLabelInput style="filled" id="floating_name" name="floating_name" type="text">
          Nama Perusahaan (Badan Usaha):
        </FloatingLabelInput>
        <FloatingLabelInput style="filled" id="floating_name" name="floating_name" type="text">
          Nama Pimpinan Perusahaan (Direktur):
        </FloatingLabelInput>
        <FloatingLabelInput style="filled" id="floating_name" name="floating_name" type="text">
          Alamat Perusahaan:
        </FloatingLabelInput>
        <FloatingLabelInput style="filled" id="floating_name" name="floating_name" type="text">
          NPWP Perusahaan:
        </FloatingLabelInput>
        <FloatingLabelInput style="filled" id="floating_name" name="floating_name" type="text">
          KTP Pimpinan Perusahaan (Direktur):
        </FloatingLabelInput>
        <FloatingLabelInput style="filled" id="floating_name" name="floating_name" type="text">
          Judul Naskah Kerjasama:
        </FloatingLabelInput>
         <FloatingLabelInput style="filled" id="floating_email" name="floating_email" type="email">
          Email:
          </FloatingLabelInput>
          <FloatingLabelInput style="filled" id="floating_email" name="floating_email" type="tel">
           No Telepon
          </FloatingLabelInput>
      </div>
      <Heading tag="h4" class="mb-2" customSize="text-xl font-extrabold  md:text-2xl lg:text-2xl">Upload Berkas Pendukung</Heading>
      <Label for="UploadDocumentKerjasama" class="pb-2">Upload Lampiran Proposal Kerjasama:</Label>
      <Fileupload id="UploadDocumentKerjasama" class="mb-2" />
      <Helper>DOC, PDF (MAX. 800x400px).</Helper>
      <br/>
      <Label for="UploadDocument" class="pb-2">Upload Document Perusahaan</Label>
     <Fileupload id="UploadDocument" class="mb-2" />
     <Helper>DOC, PDF (MAX. 800x400px).</Helper>
     <br/>
     <Label for="UploadKTP" class="pb-2">Upload KTP</Label>
     <Fileupload id="UploadKTP" class="mb-2" />
     <Helper>SVG, PNG, JPG or GIF (MAX. 800x400px).</Helper>
      
     <br/> <br/> <br/>
</div>