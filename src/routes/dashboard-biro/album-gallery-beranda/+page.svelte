<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
  
    import { Heading, Modal, Toast, Toggle, Button, Textarea, ButtonGroup, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import {  EditOutline, CheckCircleSolid } from 'flowbite-svelte-icons';
    import { databases } from '$lib/appwrite';
    import { UpdateTableTextInfo } from '$lib/textInfoBanner.js';
    import { invalidateAll } from '$app/navigation';
    import { slide } from 'svelte/transition';
    import ScreenInfo from '$lib/images/ScreenshotInfo.png';
  

  
  </script>
  
  
  <svelte:head>
      <title>Dashboard Biro</title>
      <meta name="description" content="Dashboard Biro" />
  </svelte:head>
  
  <div class="container">
      <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Album Gallery Photo (Beranda)</Heading>
      <br/>
      <div class="modern-box">
        <div class="contentbox">
          <label>Dibawah berikut adalah pengeditan informasi pengumuman yang terdapat pada halaman depan situs. Pengeditan Text dan Penyetingan Aktivasi Tampil terdapat pada table halaman ini.</label>
        </div>
      </div>
      <br/> <br/>
  
    
   
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