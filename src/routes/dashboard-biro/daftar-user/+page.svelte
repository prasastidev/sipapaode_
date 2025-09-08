<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    
    import { Heading, Modal, Toast, Alert, Badge, Button, Avatar, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {  EditOutline, UserAddOutline, TrashBinOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { user } from '$lib/user';

     // ✅ TAMBAHKAN DUA BARIS INI
    let userRole;
    $: userRole = $user?.prefs?.['Role']; // Tanda ?. untuk keamanan jika user belum login

    let users = [];
    let editingUser = null;
    let showAddForm = false;
    let newUser = {
    name: '',
    email: '',
    password: ''
  };

  let ConfirmDeleteModal = false;
  let selectedId = null;

  function getUsers() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        users = data.users;
       // console.log('Fetched users:', users);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }

  function openDeleteModal(id) {
    selectedId = id;
    ConfirmDeleteModal = true;
  }

  function removeUser(id) {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(() => {
        users = users.filter(u => u.$id !== id);
      });
      ConfirmDeleteModal = false;
  }

  
  function editUser(user) {
  // Only include fields that have actually changed
  const updateData = {};
  
  if (user.name !== user.originalName) {
    updateData.name = user.name;
  }
  
  if (user.email !== user.originalEmail) {
    updateData.email = user.email;
  }
  
  if (user.password && user.password.trim() !== '') {
    updateData.password = user.password;
  }

  // Only proceed if there are actual changes
  if (Object.keys(updateData).length === 0) {
    editingUser = null;
    return;
  }

  fetch(`/api/users/${user.$id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.error || 'Failed to update user');
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('User updated:', data);
    editingUser = null;
    getUsers(); // Refresh user data
  })
  .catch(error => {
    console.error('Error updating user:', error);
    alert('Failed to update user: ' + error.message);
  });
}


async function createUser() {
  try {
    // Validate required fields
    if (!newUser.email?.trim() || !newUser.password?.trim() || !newUser.name?.trim()) {
      throw new Error('Semua kolom harus terisi dengan lengkap');
    }

    // Password validation
    if (newUser.password.trim().length < 8) {
      throw new Error('Password harus minimal 8 karakter');
    }

     // Email format validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email.trim())) {
      throw new Error('Format email tidak valid');
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: newUser.email.trim(),
        password: newUser.password.trim(),
        name: newUser.name.trim()
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Gagal membuat user baru');
    }

    console.log('User created:', result);
    showAddForm = false;
    newUser = { name: '', email: '', password: '' };
    getUsers();
    alert('User berhasil dibuat');

  } catch (error) {
    console.error('Error details:', error);
    alert(error.message || 'Gagal membuat user baru');
  }
}

  // Modify the startEdit function to store original values
function startEdit(user) {
  editingUser = {
    ...user,
    originalName: user.name,
    originalEmail: user.email,
    password: '' // Clear password field for editing
  };
}

  getUsers();

 function formatTanggal(tanggalString) {
        // Hentikan jika tanggal tidak valid
        if (!tanggalString) return 'Tanggal tidak tersedia';

        // Opsi untuk format: hari, bulan (panjang), tahun
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        // Buat objek tanggal baru dan format dengan lokal 'id-ID' (Indonesia)
        return new Date(tanggalString).toLocaleDateString('id-ID', options);
    }
  
  </script>
  
  
  <svelte:head>
      <title>Dashboard Biro</title>
      <meta name="description" content="Dashboard Biro" />
  </svelte:head>
  
  <div class="container">
      <Heading tag="h3" customSize="text-xl text-left font-extrabold  md:text-2xl lg:text-3xl">Manajemen User Sipapaode</Heading>
      <br/>
      {#if $user.prefs['Role'] !== "PIC Tata Usaha"}
    <Alert color="yellow">
    <span class="font-medium" style="font-weight:600;">Halaman ini hanya bisa di Update oleh PIC Tata Usaha</span>
    </Alert>
    <br/>
    {/if}
  
    {#if $user.prefs['Role'] === "PIC Tata Usaha"}
      <button class="flex buttonPIC bg-blue-500 text-white px-6 py-2 rounded" on:click={() => showAddForm = true}>
        <UserAddOutline class="w-6 h-6 mr-1 text-white-800" /> Tambah User Baru
      </button> 
     {/if}
  
      {#if showAddForm}
        <div class="form-container">
          <h3>Registrasi User Baru</h3>
          <input 
            type="text" 
            bind:value={newUser.name} 
            placeholder="Name"
            required
          />
          <input 
            type="email" 
            bind:value={newUser.email} 
            placeholder="Email"
            required
          />
          <input 
            type="password" 
            bind:value={newUser.password} 
            placeholder="Password (minimal 8 Character)"
            required
          />
          <div class="button-group">
            <button class="save-btn" on:click={createUser}>Registrasi</button>
            <button class="cancel-btn" on:click={() => showAddForm = false}>Batal</button>
          </div>
        </div>
      {/if}
  
      <br/>
      
      <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
        <TableHead>
          <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Role</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Aktivitas Terakhir</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Tanggal Registrasi</TableHeadCell>
           {#if $user.prefs['Role'] === "PIC Tata Usaha"}
          <TableHeadCell style="font-size: larger;" class="py-4">
           Aksi   
          </TableHeadCell>
           {/if}
       
        </TableHead>
        <TableBody tableBodyClass="divide-y">
          {#each users as user, i}
          <TableBodyRow>   
            
            {#if editingUser && editingUser.$id === user.$id}
            <TableBodyCell style="font-size: medium;" class="py-2 whitespace-break-spaces">{i+1}</TableBodyCell>
            <TableBodyCell style="font-size: medium;" class="py-2 whitespace-break-spaces">
              <div style="width:340px;"><Avatar class="grid -mb-3 align-middle" border />
              <br/>
              <div style="display:flex;align-items:center;">
                <b style="margin-right:6px;">Nama:</b>
                <input type="text" bind:value={editingUser.name} placeholder="Name" />
              </div>
              <div style="display:flex;align-items:center;margin-top:-30px;">
                <b style="margin-right:6px;">Email:</b>
                <input type="email" bind:value={editingUser.email} placeholder="Email" />
              </div>
              <div style="display:flex;align-items:center;margin-top:-30px;">
                <b style="margin-right:6px;">Password:</b>
                <input type="password" bind:value={editingUser.password} placeholder="Kosongkan jika tidak di Update" />
              </div>
          
            </TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces"><Badge border color="indigo"> {user.prefs['Role']}</Badge></TableBodyCell> 
            <TableBodyCell style="font-size: medium;" class="py-2 whitespace-break-spaces">{user.$updatedAt.slice(0, 10)}</TableBodyCell>
            <TableBodyCell style="font-size: medium;" class="py-2 whitespace-break-spaces">{user.$createdAt.slice(0, 10)}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
              <ButtonGroup class="*:!ring-primary-700">
                <button class="save-btn" on:click={() => editUser(editingUser)}>Simpan</button>
                <button class="cancel-btn" on:click={() => editingUser = null}>Batal</button>
              </ButtonGroup>
            </TableBodyCell>
            {:else}  
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{i+1}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces"><div style="width:300px;"><Avatar class="grid -mb-3 align-middle" border />
              <br/>
              <div style="display:flex;align-items:center;"><b style="margin-right:6px;">Nama:</b> {user.name}</div>
              <div style="display:flex;align-items:center;margin-top:-10px;margin-bottom:10px;"><b style="margin-right:6px;">Email:</b> {user.email}</div>
            </TableBodyCell>
             <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces"><Badge border color="indigo"> {user.prefs['Role'] || 'User'} </Badge></TableBodyCell> 
            <TableBodyCell style="font-size: medium;" class="py-2 whitespace-break-spaces">{formatTanggal(user.$updatedAt.slice(0, 10))}</TableBodyCell>
            <TableBodyCell style="font-size: medium;" class="py-2 whitespace-break-spaces">{formatTanggal(user.$createdAt.slice(0, 10))}</TableBodyCell>
             {#if userRole === "PIC Tata Usaha"}
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
               <ButtonGroup class="*:!ring-primary-700">
                <button class="edit-btn" on:click={() => startEdit(user)}>Edit</button>
                <button class="delete-btn" on:click={() => openDeleteModal(user.$id)}>Delete</button>
              </ButtonGroup>     
            </TableBodyCell>
                {/if} 
            {/if}
            <Modal bind:open={ConfirmDeleteModal} size="xs" autoclose={false}>
              <div class="text-center">
                <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda sudah memastikan akan menghapus User yang Anda pilih.</h3>
                <Button color="red" class="me-2" on:click={() => removeUser(selectedId)}>Ya, Hapus</Button>
                <Button color="alternative" on:click={()=> ConfirmDeleteModal = !ConfirmDeleteModal}>Tidak, Batal</Button>
              </div>
            </Modal>
          </TableBodyRow>
        {/each}
        </TableBody>
      </Table>
   
  </div>

  
  
  <style>
   
    .container {
    padding: 20px;
  }
  
  .form-container {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
  
  }

  .button-group {
     margin-top: 10px;
   }
 
   button {
     margin-right: 10px;
     padding: 8px 16px;
     border-radius: 4px;
     border: none;
     cursor: pointer;
   }
 
   .save-btn {
     background-color: #4CAF50;
     color: white;
   }
 
   .cancel-btn {
     background-color: #f44336;
     color: white;
   }
 
   .edit-btn {
     background-color: #2196F3;
     color: white;
   }
 
   .delete-btn {
     background-color: #f44336;
     color: white;
   }

  </style>