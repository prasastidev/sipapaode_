<script>
	/** @type {import('./$types').PageData} */
	export let data = { TableDataPengajuanTerakhir: { documents: [] } }; // Memberikan nilai default untuk menghindari error

	// Menambahkan 'Pagination' dari flowbite-svelte
	import {
		Heading,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge,
		Pagination
	} from 'flowbite-svelte';
	import { EyeOutline } from 'flowbite-svelte-icons';

	// Fungsi untuk memformat tanggal
	function formatTanggal(tanggalString) {
		// Pengaman jika tanggalnya kosong atau null
		if (!tanggalString) {
			return 'Tanggal tidak valid';
		}

		const tanggalObjek = new Date(tanggalString);

		// Opsi format tanggal
		const options = {
			day: 'numeric', // -> 27
			month: 'long', // -> Mei (bukan May)
			year: 'numeric' // -> 2026
		};

		// 'id-ID' adalah kode untuk Bahasa Indonesia 🇮🇩
		return new Intl.DateTimeFormat('id-ID', options).format(tanggalObjek);
	}

	// --- Variabel untuk State ---
	let searchTerm = '';
	let filteredDocuments = [];

	// --- Variabel untuk Pagination ---
	let currentPage = 1;
	const itemsPerPage = 10; // Atur jumlah data yang ingin ditampilkan per halaman
	let paginatedDocuments = [];
	let totalPages = 1;

	// --- Blok Reaktif ---
	// Kode di dalam blok ini akan berjalan setiap kali variabel dependen (seperti searchTerm, data, currentPage) berubah.
	$: {
		const allDocuments = data?.TableDataPengajuanTerakhir?.documents ?? [];

		// 1. Logika Filtering berdasarkan searchTerm
		if (searchTerm.trim()) {
			filteredDocuments = allDocuments.filter((doc) =>
				doc.Instansi.toLowerCase().includes(searchTerm.toLowerCase())
			);
			// Reset ke halaman pertama setiap kali pencarian baru dilakukan
			if (currentPage !== 1) {
				currentPage = 1;
			}
		} else {
			// Jika kolom pencarian kosong, tampilkan semua dokumen.
			filteredDocuments = allDocuments;
		}

		// 2. Logika Pagination
		// Hitung total halaman berdasarkan data yang sudah difilter
		totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

		// Pastikan currentPage tidak melebihi totalPages
		if (currentPage > totalPages) {
			currentPage = totalPages || 1;
		}

		// 'Slice' atau potong array data sesuai halaman saat ini
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);
	}

	// Data untuk setiap step
	const procedureSteps = [
		{
			number: 1,
			title: 'Proses Pengajuan /',
			subtitle: 'Submit Dokumen',
			completed: false
		},
		{
			number: 2,
			title: 'Proses',
			subtitle: 'Verifikasi Doc',
			completed: false
		},
		{
			number: 3,
			title: 'Penandatanganan',
			subtitle: 'Naskah',
			completed: false
		},
		{
			number: '',
			title: 'Perbaikan',
			subtitle: 'Pengajuan',
			completed: true
		}
	];

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
	<title>Tracking Status Pengajuan Kerjasama</title>
	<meta
		name="description"
		content="Tracking Status Pengiriman Pengajuan Kerjasama - Biro Pemerintahan dan Otonomi Daerah Prov. Sultra"
	/>
</svelte:head>

<div class="container">
	<Heading
		tag="h3"
		class="mb-4 mt-14"
		customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl"
		style="color:#1f4d8c;"
	>
		Tracking dan Pemantauan Status Pengiriman Pengajuan Kerjasama
	</Heading>
	<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl"
		>Biro Pemerintahan dan Otonomi Daerah<br />
		Sulawesi Tenggara
	</Heading>
	<p style="font-size:20px;">
		📅 Tanggal hari ini: <strong>{formattedDate}</strong>
	</p>
	<br />

	<br />
	Dibawah berikut adalah Tahapan Pengajuan Kerjasama dengan Pemerintah Prov. Sulawesi Tenggara.
	<br /><br />
	<div class="flex justify-center w-full">
		<div class="process-flow-container">
			<div class="process-flow">
				{#each procedureSteps as step, index}
					<div class="step-wrapper">
						<!-- Circle Step -->
						<div class="step-circle" class:completed={step.completed}>
							<span class="step-number">{step.number}</span>
						</div>

						<!-- Step Label -->
						<div class="step-label">
							<div class="step-title">{step.title}</div>
							<div class="step-subtitle">{step.subtitle}</div>
						</div>

						<!-- Arrow (tidak ditampilkan untuk step terakhir) -->
						{#if index < procedureSteps.length - 1}
							<div class="arrow">
								<svg width="60" height="20" viewBox="0 0 60 20" fill="none">
									<path d="M0 10L50 10M45 5L50 10L45 15" stroke="#5B7FBF" stroke-width="2" />
								</svg>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<br />
	<!-- Menambahkan on:submit|preventDefault untuk mencegah reload halaman saat form disubmit -->
	<form class="flex items-center w-full mx-auto" style="width:100%;" on:submit|preventDefault>
		<label for="simple-search" class="sr-only">Search</label>
		<div class="relative w-full">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<svg
					class="w-4 h-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 18 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
					/>
				</svg>
			</div>
			<!-- Menggunakan bind:value untuk menghubungkan input dengan variabel searchTerm dan menghapus on:keyup -->
			<input
				bind:value={searchTerm}
				type="text"
				id="simple-search"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Cari Nama Instansi ..."
			/>
		</div>
		<button
			type="submit"
			class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			<svg
				class="w-4 h-4"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			</svg>
			<span class="sr-only">Search</span>
		</button>
	</form>
	<br />
	<Table shadow hoverable={true} class="whitespace-break-spaces">
		<TableHead>
			<TableHeadCell class="py-5">No</TableHeadCell>
			<TableHeadCell class="py-5">Tanggal Pengajuan</TableHeadCell>
			<TableHeadCell class="py-5">Instansi</TableHeadCell>
			<TableHeadCell class="py-5">Tentang</TableHeadCell>
			<TableHeadCell class="py-5">Jenis Kerjasama</TableHeadCell>
			<TableHeadCell class="py-5">Kategori</TableHeadCell>
			<TableHeadCell class="py-5">Status</TableHeadCell>
			<TableHeadCell class="py-5">Estimasi Hari Proses</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			<!-- Mengganti perulangan untuk menggunakan paginatedDocuments -->
			{#each paginatedDocuments as cetakTabel, i}
				<TableBodyRow>
					<!-- Menyesuaikan nomor urut berdasarkan halaman saat ini -->
					<TableBodyCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableBodyCell>
					<TableBodyCell class="whitespace-break-spaces">
						<span
							style="padding: 2px 8px;background: #f1ecba;border-radius: 6px;color: #423c04;"
							>{formatTanggal(cetakTabel.$updatedAt.slice(0, 10))}</span
						></TableBodyCell
					>
					<TableBodyCell class="whitespace-break-spaces">
						<span style="font-size:18px;font-weight:600;">{cetakTabel.Instansi}</span> <br />
						<br /><span>PIC: {cetakTabel.Nama} </span>
					</TableBodyCell>
					<TableBodyCell class="whitespace-break-spaces">{cetakTabel.Tentang}</TableBodyCell>
					<TableBodyCell class="whitespace-break-spaces"
						>{cetakTabel.OpsiPengajuan}</TableBodyCell
					>
					<TableBodyCell class="whitespace-break-spaces"
						>{cetakTabel.Kategory_KS}</TableBodyCell
					>
					<TableBodyCell class="whitespace-break-spaces">
						<td style="padding:14px 4px;"
							><Badge
								color={cetakTabel.Status === 'Proses Pengajuan'
									? 'yellow'
									: cetakTabel.Status === 'Proses Verifikasi'
									? 'blue'
									: cetakTabel.Status === 'Penandatanganan Naskah'
									? 'green'
									: cetakTabel.Status === 'Ditolak'
									? 'red'
									: 'gray'}
								border>{cetakTabel.Status}</Badge
							></td
						>
					</TableBodyCell>
					<TableBodyCell class="whitespace-break-spaces"
						>{cetakTabel.Estimasi} Kerja</TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>

	<!-- Menambahkan komponen Pagination di bawah tabel -->
	{#if totalPages > 1}
		<div class="flex justify-center mt-6">
			<Pagination {totalPages} bind:currentPage />
		</div>
	{/if}

	<br /><br />
</div>

<br /><br />
<style>
	/** Prosedure CSS   */
	.step {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background: #46e5d9;
		color: white;
		border-radius: 50%;
		font-weight: bold;
	}

	.step-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.step-title {
		font-weight: bold;
		font-size: 1.125rem;
	}

	.step-description {
		color: #4b5563;
	}

	/** Step Pengajuan */
	.process-flow-container {
		width: 100%;
		padding: 2rem;
		display: flex;
		justify-content: center;
		background-color: #f8f9fa;
		border-radius: 12px;
	}

	.process-flow {
		display: flex;
		align-items: center;
		gap: 1rem;
		max-width: 1200px;
		width: 100%;
	}

	.step-wrapper {
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
		flex: 1;
	}

	.step-circle {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: #e8f4fd;
		border: 3px solid #90c695;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		transition: all 0.3s ease;
	}

	.step-circle.completed {
		background-color: #90c695;
		border-color: #6b8e6b;
	}

	.step-number {
		font-size: 1.5rem;
		font-weight: bold;
		color: #333;
	}

	.step-circle.completed .step-number {
		color: white;
	}

	.step-label {
		text-align: center;
		max-width: 150px;
	}

	.step-title {
		font-size: 1rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.25rem;
		line-height: 1.2;
	}

	.step-subtitle {
		font-size: 0.9rem;
		color: #666;
		text-decoration: underline;
		text-decoration-style: wavy;
		text-decoration-color: #ff6b6b;
		line-height: 1.2;
	}

	.arrow {
		position: absolute;
		top: 30px;
		right: -40px;
		z-index: 1;
	}

	.arrow svg {
		width: 60px;
		height: 20px;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.process-flow-container {
			padding: 1rem;
		}

		.process-flow {
			flex-direction: column;
			gap: 2rem;
		}

		.step-wrapper {
			flex-direction: row;
			justify-content: flex-start;
			width: 100%;
			max-width: 400px;
		}

		.step-circle {
			margin-bottom: 0;
			margin-right: 1rem;
			flex-shrink: 0;
		}

		.step-label {
			text-align: left;
			max-width: none;
			flex: 1;
		}

		.arrow {
			position: static;
			align-self: center;
			margin: 1rem 0;
		}

		.arrow svg {
			transform: rotate(90deg);
			width: 20px;
			height: 60px;
		}
	}

	@media (max-width: 480px) {
		.step-circle {
			width: 50px;
			height: 50px;
		}

		.step-number {
			font-size: 1.25rem;
		}

		.step-title {
			font-size: 0.9rem;
		}

		.step-subtitle {
			font-size: 0.8rem;
		}
	}

	/* Hover effects */
	.step-circle:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	/* Animation untuk step completion */
	.step-circle {
		animation: fadeIn 0.5s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
