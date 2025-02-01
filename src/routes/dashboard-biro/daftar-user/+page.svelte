<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
  
    import { Heading, Modal, Toast, Toggle, Button, Avatar, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {  EditOutline, UserAddOutline, TrashBinOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
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
        console.log('Fetched users:', users);
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
    fetch(`/api/users/${user.$id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email
      })
    }).then(() => {
      editingUser = null;
      getUsers();
    });
  }

  async function createUser() {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create user');
      }

      console.log('User created:', result);
      showAddForm = false;
      newUser = { name: '', email: '', password: '' };
      getUsers();

    } catch (error) {
      console.error('Error details:', error);
      alert(error.message || 'Failed to create user');
    }
  }

  function startEdit(user) {
    editingUser = { ...user };
  }

  getUsers();
  
  </script>
  
  
  <svelte:head>
      <title>Dashboard Biro</title>
      <meta name="description" content="Dashboard Biro" />
  </svelte:head>
  
  <div class="container">
      <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Daftar User Terdaftar Sipapaode</Heading>
      <br/>
      <div class="modern-box">
        <div class="contentbox">
          <label>Berikut adalah daftar informasi pengguna terdaftar di Sipapaode. Pendaftaran pengguna baru dapat dilakukan melalui halaman ini.</label>
        </div>
      </div>
      <br/><br/>

      <button class="flex buttonPIC bg-blue-500 text-white px-6 py-2 rounded" on:click={() => showAddForm = true}>
        <UserAddOutline class="w-6 h-6 mr-1 text-white-800" /> Tambah User
      </button> 
  
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
            placeholder="Password"
            required
          />
          <div class="button-group">
            <button class="save-btn" on:click={createUser}>Registrasi</button>
            <button class="cancel-btn" on:click={() => showAddForm = false}>Batal</button>
          </div>
        </div>
      {/if}
  
      <br/><br/>
      
      <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
        <TableHead>
          <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Aktivitas Terakhir</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Tanggal Registrasi</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
          {#each users as user, i}
          <TableBodyRow>
           
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{i+1}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces"><div style="width:300px;"><Avatar class="grid -mb-3 align-middle" border />
              <br/>{#if editingUser && editingUser.$id === user.$id}
              <div style="display:flex;align-items:center;"><b style="margin-right:6px;">Nama:</b> <input type="text" bind:value={editingUser.name} placeholder="Name" /></div>
              <div style="display:flex;align-items:center;margin-top:-30px;"><b style="margin-right:6px;">Email:</b> <input type="email" bind:value={editingUser.email} placeholder="Email" /></div>
            <div class="button-group" style="margin-top:-20px;">
              <button class="save-btn" on:click={() => editUser(editingUser)}>Simpan</button>
              <button class="cancel-btn" on:click={() => editingUser = null}>Batal</button>
            </div> 
            {:else}<div style="margin-bottom:6px;line-height: 1.6;"><b>Nama:</b> {user.name}<br/><b>Email:</b> {user.email}</div>
            {/if}
            </TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{user.$updatedAt.slice(0, 10)}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">{user.$createdAt.slice(0, 10)}</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
              <ButtonGroup class="*:!ring-primary-700">
                <Button style="color:blue;" on:click={() => startEdit(user)}><EditOutline class="w-4 h-4 me-2" />Edit</Button>
                <Button style="color:red;" on:click={() => openDeleteModal(user.$id)} ><TrashBinOutline class="w-4 h-4 me-2" />Hapus</Button>
              </ButtonGroup>
            </TableBodyCell>
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
    .modern-box {
      position: relative;
      display: inline-block;
      padding: 12px;
    }
    
    .modern-box::before,
    .modern-box::after,
    .contentbox::before,
    .contentbox::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border: 4px solid #c7c7e7;
    }
    
    /* Top left corner */
    .modern-box::before {
      top: 0;
      left: 0;
      border-right: none;
      border-bottom: none;
    }
    
    /* Top right corner */
    .modern-box::after {
      top: 0;
      right: 0;
      border-left: none;
      border-bottom: none;
    }
  
    .contentbox {
      background: white;
      padding: 6px 12px;
      border-radius: 8px;
    }
    
    /* Bottom left corner */
    .contentbox::before {
      bottom: 0;
      left: 0;
      border-right: none;
      border-top: none;
    }
    
    /* Bottom right corner */
    .contentbox::after {
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
    }
    
    .contentbox label {
      font-size: 0.94rem;
      margin: 0;
      padding: 0;
    }


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

  </style>