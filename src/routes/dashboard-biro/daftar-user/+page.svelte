<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
  
    import { Heading, Modal, Toast, Toggle, Button, Textarea, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import {  EditOutline, CheckCircleSolid } from 'flowbite-svelte-icons';

  
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
          <label>Informasi banner pengumuman pada halaman depan dapat diaktivasi dan diedit melalui saluran informasi di bawah berikut.</label>
        </div>
      </div>
      <br/><br/>
      <Table shadow hoverable={true} class="whitespace-break-spaces table-auto overflow-x-auto">
        <TableHead>
          <TableHeadCell style="font-size: larger;" class="py-4">No</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Nama</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Email</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Role</TableHeadCell>
          <TableHeadCell style="font-size: larger;" class="py-4">Aksi</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
          <TableBodyRow>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">1</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">Asdfsd klsdfasdfsdf</TableBodyCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">asssdf@gmail.com</TableBodyCell>
            <TableHeadCell style="font-size: larger;" class="py-4">sdfkks</TableHeadCell>
            <TableBodyCell style="font-size: larger;" class="py-2 whitespace-break-spaces">
              <ButtonGroup class="*:!ring-primary-700">
                <Button style="color:blue;"><EditOutline class="w-4 h-4 me-2" />Edit</Button>
              </ButtonGroup>
            </TableBodyCell>
          </TableBodyRow>
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
  </style>