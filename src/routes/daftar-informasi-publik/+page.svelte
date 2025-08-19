<script>
    /** @type {import('./$types').PageData} */
 
    import { Heading, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { EyeOutline } from 'flowbite-svelte-icons';

    // Buat objek Date baru saat komponen dimuat
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
	<title>Daftar Informasi Publik</title>
	<meta name="description" content="Daftar Informasi Publik - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;">Daftar Informasi Publik</Heading>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Biro Pemerintahan dan Otonomi Daerah<br/>
Sulawesi Tenggara </Heading>
<p style="font-size:20px;">📅 Tanggal hari ini: <strong>{formattedDate}</strong></p>
<br/>

<br/>
<Table shadow hoverable={true} class="whitespace-break-spaces">
    <TableHead>
      <TableHeadCell class="py-5">No</TableHeadCell>
      <TableHeadCell class="py-5">Jenis Informasi</TableHeadCell>
      <TableHeadCell class="py-5">Ringkasan Isi Informasi</TableHeadCell>
      <TableHeadCell class="py-5">Penanggung Jawab Pembuatan atau Penerbitan Informasi</TableHeadCell>
      <TableHeadCell class="py-5">Waktu dan Tempat Pembuatan Informasi</TableHeadCell>
      <TableHeadCell class="py-5">Bentuk Informasi yang Tersedia</TableHeadCell>
      <TableHeadCell class="py-5">Jangka Waktu Penyimpanan atau Retensi Arsip</TableHeadCell>
      <TableHeadCell class="py-5">Link Media yang Memuat Informasi</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      <TableBodyRow>
        <TableBodyCell colspan="8" class="font-semibold" style="background: antiquewhite;">A. Informasi Tentang Profil Biro Pemerintahan dan Otonomi Daerah</TableBodyCell>
        </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>1</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Alamat dan Kontak</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Kedudukan, domisili berserta alamat lengkap dan kontak.</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><a href="/profil/#Alamat" style="border-bottom:2px dotted #1251d1;color:#1251d1;"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</a></TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>2</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Visi dan Misi</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Visi dan Misi Biro Pemerintahan Prov. Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">5 Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><a href="/profil/#Visi" style="border-bottom:2px dotted #1251d1;color:#1251d1;"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</a></TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>3</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Tupoksi Biro Pemerintahan</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Tugas Pokok dan Fungsi dari Biro Pemerintahan Prov. Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><a href="/profil/#Bidang" style="border-bottom:2px dotted #1251d1;color:#1251d1;"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</a></TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>4</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Struktur Organisasi</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Struktur Organisasi Biro Pemerintahan Prov. Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><a href="/profil/#Struktur" style="border-bottom:2px dotted #1251d1;color:#1251d1;"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</a></TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>5</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Profil Pimpinan</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Profil Pimpinan Biro Pemerintahan Prov. Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><a href="/profil-pimpinan" style="border-bottom:2px dotted #1251d1;color:#1251d1;"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</a></TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell colspan="8" class="font-semibold" style="background: antiquewhite;">B. Ringkasan Informasi Tentang Program, Kegiatan dan Kinerja Badan Publik</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>6</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">DIP</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Daftar Informasi Publik di Biro Pemerintahan Prov. Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Berkala</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><a href="/daftar-informasi-publik" style="border-bottom:2px dotted #1251d1;color:#1251d1;"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</a></TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>7</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">SK</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">SK PPID</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>8</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">DPA</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Dokumen Pelaksanaan Anggaran Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>9</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">RENSTRA</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Rencana Strategis Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">5 Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>10</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">LAKIP</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Laporan Akuntabilitas Pemerintahan Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>11</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Rencana Aliran Kas</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Arus Kas Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>12</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Laporan Keuangan</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Laporan Keuangan Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>13</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Laporan Tahunan</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Laporan Tahunan Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>14</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">LKJIP</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">LKJIP Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>15</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">RENJA</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Rencana Kerja Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Setiap Tahun</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>16</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">SOP</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Standar Operasional Prosedur di Biro Pemerintahan Sultra</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Biro Pemerintahan dan Otda</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Tidak Tentu</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Hardcopy dan Softcopy</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces">Selama Berlaku</TableBodyCell>
        <TableBodyCell class="whitespace-break-spaces"><EyeOutline class="w-4 h-4 align-middle inline" /> Lihat</TableBodyCell>
      </TableBodyRow>
    
    </TableBody>
</Table>

<br/><br/>
Formulir pengajuan informasi oleh Publik dapat dilihat pada link berikut: <a href="/formulir-pengajuan-informasi-publik" style="text-decoration:underline;">Pengajuan Informasi</a>
<br/><br/><br/>

</div>