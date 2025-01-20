<script>
    /** @type {import('./$types').PageData} */
    export let data=[];
    import { Heading, Card, Listgroup, Avatar } from 'flowbite-svelte';
    import { CheckCircleSolid, UsersSolid, LandmarkSolid, BuildingSolid, ObjectsColumnSolid } from 'flowbite-svelte-icons';
    import { user } from '$lib/user';

let DataKotaKendari  = data.TableDatasWilayah.documents[0];
let DataKotaBaubau  = data.TableDatasWilayah.documents[1];
let DataWakatobi  = data.TableDatasWilayah.documents[2];
let DataMunaBarat  = data.TableDatasWilayah.documents[3];
let DataMuna  = data.TableDatasWilayah.documents[4];
let DataKonaweUtara  = data.TableDatasWilayah.documents[5];
let DataKonaweSelatan  = data.TableDatasWilayah.documents[6];
let DataKonaweKepulauan  = data.TableDatasWilayah.documents[7];
let DataKonawe = data.TableDatasWilayah.documents[8];
let DataKolakaUtara  = data.TableDatasWilayah.documents[9];
let DataKolakaTimur  = data.TableDatasWilayah.documents[10];
let DataKolaka  = data.TableDatasWilayah.documents[11];
let DataButonUtara = data.TableDatasWilayah.documents[12];
let DataButonTengah  = data.TableDatasWilayah.documents[13];
let DataButonSelatan  = data.TableDatasWilayah.documents[14];
let DataButon  = data.TableDatasWilayah.documents[15];
let DataBombana  = data.TableDatasWilayah.documents[16];
let TotalKSTerdaftar =  data.TableDatas.total;
let TotalKSTerdaftarBerlaku =  data.TableDatasKSBerlaku.total;
let TotalKSTerdaftarBerakhir;


TotalKSTerdaftarBerakhir = TotalKSTerdaftar - TotalKSTerdaftarBerlaku;

let Jum_KecamatanSultra, Jum_KelurahanSultra, Jum_DesaSultra;

Jum_KecamatanSultra = (DataKotaKendari.J_Kecamatan * 1) + (DataKotaBaubau.J_Kecamatan * 1) + (DataWakatobi.J_Kecamatan * 1) + (DataMunaBarat.J_Kecamatan * 1) + (DataMuna.J_Kecamatan * 1) + (DataKonaweUtara.J_Kecamatan * 1)+ (DataKonaweSelatan.J_Kecamatan * 1)+ (DataKonaweKepulauan.J_Kecamatan * 1) +
(DataKonawe.J_Kecamatan * 1) + (DataKolakaUtara.J_Kecamatan * 1) + (DataKolakaTimur.J_Kecamatan * 1) + (DataKolaka.J_Kecamatan * 1) + (DataButonUtara.J_Kecamatan * 1) + (DataButonTengah.J_Kecamatan * 1) + (DataButonSelatan.J_Kecamatan * 1) + (DataButon.J_Kecamatan * 1) + (DataBombana.J_Kecamatan * 1);

Jum_KelurahanSultra = (DataKotaKendari.J_Kelurahan * 1) + (DataKotaBaubau.J_Kelurahan * 1) + (DataWakatobi.J_Kelurahan * 1) + (DataMunaBarat.J_Kelurahan * 1) +(DataMuna.J_Kelurahan * 1) + (DataKonaweUtara.J_Kelurahan * 1)+ (DataKonaweSelatan.J_Kelurahan * 1)+ (DataKonaweKepulauan.J_Kelurahan * 1) +
(DataKonawe.J_Kelurahan * 1) + (DataKolakaUtara.J_Kelurahan * 1) + (DataKolakaTimur.J_Kelurahan * 1) + (DataKolaka.J_Kelurahan * 1) + (DataButonUtara.J_Kelurahan * 1) + (DataButonTengah.J_Kelurahan * 1) + (DataButonSelatan.J_Kelurahan * 1) + (DataButon.J_Kelurahan * 1) + (DataBombana.J_Kelurahan * 1);

Jum_DesaSultra = (DataKotaKendari.J_Desa * 1) + (DataKotaBaubau.J_Desa * 1) + (DataWakatobi.J_Desa * 1) + (DataMunaBarat.J_Desa * 1) + (DataMuna.J_Desa * 1) + (DataKonaweUtara.J_Desa * 1)+ (DataKonaweSelatan.J_Desa * 1)+ (DataKonaweKepulauan.J_Desa * 1) +
(DataKonawe.J_Desa * 1) + (DataKolakaUtara.J_Desa * 1) + (DataKolakaTimur.J_Desa * 1) + (DataKolaka.J_Desa * 1) + (DataButonUtara.J_Desa * 1) + (DataButonTengah.J_Desa * 1) + (DataButonSelatan.J_Desa * 1) + (DataButon.J_Desa * 1) + (DataBombana.J_Desa * 1);

</script>

<svelte:head>
	<title>Dashboard Biro</title>
	<meta name="description" content="Dashboard Biro" />
</svelte:head>

<div>
    <Heading tag="h3" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl">Dashboard</Heading>
    <br/>
 
     Hai {$user.name}, Selamat Datang di Dashboard Anda .... <br/><br/>

     <div class="flex justify-between items-center mb-4">
      <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Informasi Profile Anda</h5>
    </div>
     <Card padding="xl" size="xl">
        <Listgroup class="border-0 dark:!bg-transparent">
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <Avatar class="border flex-shrink-0 w-14 h-14" size="none" />
            <div class="flex-1 min-w-0">
              <p class="text-xl font-medium text-gray-900 truncate dark:text-white">
                {$user.name}
              </p>
              <p class="text-md text-gray-500 truncate dark:text-gray-400">
                {$user.prefs['Bidang']}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {$user.email}
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                 <span style="padding:8px;border-radius:8px;background-color:#f0f9ff;">
                    <CheckCircleSolid class="w-5 h-5" style="color:green;" />
                </span>
            </div>
          </div>
        </Listgroup>
      </Card>
      <br/><br/>
      <center><hr style="width:80%;height:2px;background:#d6d6d6;"/></center>
      <br/><br/>
      <div class="grid grid-cols-2 gap-6">
        <div> 
          <div class="flex justify-between items-center mb-4">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"><UsersSolid class="inline-flex w-6 h-6 text-gray-500 dark:text-gray-400" style="vertical-align:sub;" /> Bagian Kerjasama</h5>
        </div>
        <Card padding="xl" size="xl" class="p-6 sm:p-6">
          <ul class="font-bold text-gray-700 dark:text-gray-400 leading-tight">
            <li class="mb-3">Total Kerjasama Terdaftar <br/>
                <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">{TotalKSTerdaftar}</span>
            </li>
            <li class="mb-3">Total Kerjasama Aktif (Masih Berlaku) <br/>
               <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;"> {TotalKSTerdaftarBerlaku} </span>
            </li>
            <li class="mb-3">Total Kerjasama Telah Berakhir <br/>
              <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;"> {TotalKSTerdaftarBerakhir} </span>
            </li>
          </ul>
        </Card>
        </div>

        <div>
          <div class="flex justify-between items-center mb-4">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"><LandmarkSolid class="inline-flex w-6 h-6 text-gray-500 dark:text-gray-400 mr-1" style="vertical-align:sub;" /> Koordinator Pemerintahan</h5>
        </div>
        <Card padding="xl" size="xl" class="p-6 sm:p-6">
          <ul class="font-bold text-gray-700 dark:text-gray-400 leading-tight">
            <li class="mb-3">Jumlah Kab/Kota - Sultra <br/>
                <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">17</span>
            </li>
            <li class="mb-3">Total Jumlah Kecamatan - Sultra <br/>
               <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">{Jum_KecamatanSultra}</span>
            </li>
            <li class="mb-3">Total Jumlah Kelurahan - Sultra <br/>
              <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">{Jum_KelurahanSultra}</span>
            </li>
            <li class="mb-3">Total Jumlah Desa - Sultra <br/>
              <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">{Jum_DesaSultra}</span>
            </li>
          </ul>
        </Card>
        </div>
      </div>
   <br/><br/>


   <div class="grid grid-cols-2 gap-6">
    <div> 
      <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"><BuildingSolid class="inline-flex w-6 h-6 text-gray-500 dark:text-gray-400 mr-1" style="vertical-align:sub;" /> Koordinator Otonomi Daerah</h5>
    </div>
    <Card padding="xl" size="xl" class="p-6 sm:p-6">
      <ul class="font-bold text-gray-700 dark:text-gray-400 leading-tight">
        <li class="mb-3">Total Penerbitan SK Gubernur & Wakil <br/>
            <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">{ data.TableDataSK_GubWakil.total }</span>
        </li>
        <li class="mb-3">Total Dokumen LPPD Kab/Kota<br/>
           <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">{ data.TableDataDokLPPD.total }</span>
        </li>
        <li class="mb-3">Total Dokumen LKPJ Kab/Kota <br/>
          <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">{ data.TableDataDokLKPJ.total }</span>
        </li>
      </ul>
    </Card>
    </div>

    <div>
      <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"><ObjectsColumnSolid class="inline-flex w-6 h-6 text-gray-500 dark:text-gray-400 mr-1" style="vertical-align:sub;" /> Tata Usaha</h5>
    </div>
    <Card padding="xl" size="xl" class="p-6 sm:p-6">
      <ul class="font-bold text-gray-700 dark:text-gray-400 leading-tight">
        <li class="mb-3">Total Pegawai <br/>
            <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">--</span>
        </li>
        <li class="mb-3">Total Pegawai honorer <br/>
           <span class="font-normal text-blue-700 text-xl" style="padding: 4px 12px;background: aliceblue;border-radius:8px;">--</span>
        </li>
      </ul>
    </Card>
    </div>
  </div>

      
	 
  <br/> <br/>
</div>