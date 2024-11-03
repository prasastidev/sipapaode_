<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Tabs, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { ArrowRightAltOutline, MoonOutline, BuildingSolid } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>Profil</title>
	<meta name="description" content="Profil" />
</svelte:head>

<br/><br/>

<div class="container">
<Heading tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Profil</Heading>
<br/>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Selayang Pandang</Heading>
sdfj s dfkaj sdfkja skd jfkasjdfkajs dkfj ajsda <br/>
asdjfa sdfksdjfasjdf asj asdfjasdfj a kfaj sdfj asdf <br/><br/>

<Heading id="Bidang" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Bidang-Bidang</Heading>
<br/>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl"><ArrowRightAltOutline class="w-10 h-10 align-middle inline" /> Bagian Kerjasama</Heading>
sdfj s dfkaj sdfkja skd jfkasjdfkajs dkfj ajsda <br/>
asdjfa sdfksdjfasjdf asj asdfjasdfj a kfaj sdfj asdf <br/>
<Tabs class="mt-4">
    <TabItem open title="Tugas">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Profile:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
    <TabItem title="Fungsi">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Settings:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
  </Tabs> <br/><br/>

<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl"><ArrowRightAltOutline class="w-10 h-10 align-middle inline" /> Koordinator Pemerintahan</Heading>
sdfj s dfkaj sdfkja skd jfkasjdfkajs dkfj ajsda <br/>
asdjfa sdfksdjfasjdf asj asdfjasdfj a kfaj sdfj asdf <br/><br/>
<Tabs class="mt-4">
    <TabItem open title="Tugas">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Profile:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
    <TabItem title="Fungsi">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Settings:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
  </Tabs> <br/><br/>

<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl"><ArrowRightAltOutline class="w-10 h-10 align-middle inline" /> Koordinator Otonomi Daerah</Heading>
sdfj s dfkaj sdfkja skd jfkasjdfkajs dkfj ajsda <br/>
asdjfa sdfksdjfasjdf asj asdfjasdfj a kfaj sdfj asdf <br/><br/>
<Tabs class="mt-4">
    <TabItem open title="Tugas">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Profile:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
    <TabItem title="Fungsi">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Settings:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
  </Tabs> <br/><br/>

<hr/>

<Heading id="Visi" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Visi Misi</Heading>
<br/>
<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Visi</Heading>
sdfj s dfkaj sdfkja skd jfkasjdfkajs dkfj ajsda <br/>
asdjfa sdfksdjfasjdf asj asdfjasdfj a kfaj sdfj asdf <br/><br/>

<Heading tag="h4" class="mb-4" customSize="text-2xl text-left font-extrabold  md:text-3xl lg:text-3xl">Misi</Heading>
sdfj s dfkaj sdfkja skd jfkasjdfkajs dkfj ajsda <br/>
asdjfa sdfksdjfasjdf asj asdfjasdfj a kfaj sdfj asdf <br/><br/>
<hr/>

<Heading id="Struktur" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Struktur Organisasi</Heading>
<br/>
  <!-- Awal -->
  <div id="container_org">
    <ol class="static-org-chart">
        <li>
            <div class="staff_card">
                <div class="staff_title">
                    Kepala Biro Pemerintahan & OTDA
                </div>
                <div class="staff_info">
                    <div class="staff_image">
                        <img src="https://miro.medium.com/fit/c/256/256/1*7oNrN58deYJ7G2k8P5iljQ.jpeg" class="card-img-top" />
                    </div>
                    <div class="staff_name_container">
          Muliadi, S.ST
                    </div>
                </div>
            </div>
            <ol id="first">
               
                <li>
                    <div style="width:280px !important;padding:6px;height:100px;"> 
          <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" style="width:60px;height:60px;border-radius:50%;" />
        
                        <div>Kasubag. Tata Usaha <br><label style="font-weight: 100;">Irma Fitayanti Baso, S.Kom</label></div>
                    </div>
                </li>
              
               
            </ol>
            <ol id="second">
                <li>
                    <div class="staff_card">
                        <div class="staff_title">
                           Kabag. Kerjasama
                        </div>
                        <div class="staff_info">
                            <div class="staff_image">
                                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="card-img-top" />
                            </div>
                            <div class="staff_name_container">
              Hidayat Agung Wibowo.S.STP
                            </div>
                        </div>
                    </div>
                    <div><div>LM. Hartono Jaya, S.Ip.,MH</div></div>
                    <div><div>Susi Hasmiati, S.STP. MM.</div></div>
                    <div><div>Herlina Uddin, S.STP, M.Si</div></div>
                </li>
             
                <li>
                    <div class="staff_card">
                        <div class="staff_title">
                            Koordinator Pemerintahan
                        </div>
                        <div class="staff_info">
                            <div class="staff_image">
                                <img src="https://miro.medium.com/fit/c/256/256/1*7oNrN58deYJ7G2k8P5iljQ.jpeg" class="card-img-top" />
                            </div>
                            <div class="staff_name_container">               
              Dudi Cahyanto, S.Sos
                            </div>
                        </div>
                    </div>
                    <div><div>Mila Karmila, S.IP.</div></div>
                    <div><div>Sayidina Supahardi, S.Sos. M.Si.</div></div>
                </li>
                <li>
                    <div class="staff_card">
                        <div class="staff_title">
                            Koordinator Otonomi Daerah
                        </div>
                        <div class="staff_info">
                            <div class="staff_image">
                                <img src="https://miro.medium.com/fit/c/256/256/1*7oNrN58deYJ7G2k8P5iljQ.jpeg" class="card-img-top" />
                            </div>
                            <div class="staff_name_container">
              Syahrin Ramadhan,S.STP.M.A
                            </div>
                        </div>
                    </div>
                    <div><div>Resya Saputra, S.STP., M.Si.</div></div>
                    <div><div>Risky Tahir, S.IP</div></div>
                    <div><div>Irmawan, S.Sos</div></div>
                </li>
            </ol>
        </li>
    </ol>
</div>
<br/>
<!-- End -->
<br/><br/>
 <hr/>

 <Heading id="Alamat" tag="h3" class="mb-4 mt-14" customSize="text-3xl text-left font-extrabold  md:text-3xl lg:text-4xl" style="color:#1f4d8c;"><MoonOutline class="w-11 h-11 align-middle inline" /> Alamat dan Kontak</Heading>
 
 <div class="grid grid-cols-12 gap-4">
  <div><BuildingSolid class="w-16 h-16 align-middle inline" /></div>
  <div class="col-span-10 text-2xl font-extrabold">Biro Pemerintahan dan Otonomi Daerah<br/>Sulawesi Tenggara <br/>
  <span class="text-lg font-normal">Kompleks Bumi Praja Anduonohu, Kecamatan Poasia, <br/>Kota Kendari, Sulawesi Tenggara 93231 <br/>
  Email: -</span>
  </div>
</div>
 
  



<hr/> <br/><br/>

</div>

<style>
  /**CSS Organization  **/
#container_org {
    padding: 10px;
}
ol.static-org-chart,
ol.static-org-chart ol,
ol.static-org-chart li,
ol.static-org-chart li > div {
    position: relative;
}
ol.static-org-chart,
ol.static-org-chart ol {
    list-style: none;
    margin: 0;
    padding: 0;
}
ol.static-org-chart {
    text-align: center;

}
ol.static-org-chart ol {
    padding-top: 1em;
}
ol.static-org-chart ol:before,
ol.static-org-chart ol:after,
ol.static-org-chart li:before,
ol.static-org-chart li:after,
ol.static-org-chart > li > div:before,
ol.static-org-chart > li > div:after {
    background-color: #a4acb1 ; 
    content: "";
    position: absolute;
}
ol.static-org-chart ol > li {
    padding: 1em 0 0 1em;
}
ol.static-org-chart > li ol:before {
    height: 1em;
    left: 50%;
    top: 0;
    width: 3px;
}
ol.static-org-chart > li ol:after {
    height: 3px;
    left: 3px;
    top: 1em;
    width: 50%;
}
ol.static-org-chart > li ol > li:not(:last-of-type):before {
    height: 3px;
    left: 0;
    top: 2em;
    width: 1em;
}
ol.static-org-chart > li ol > li:not(:last-of-type):after {
    height: 105%;
    left: 0;
    top: 0;
    width: 3px;
}
ol.static-org-chart > li ol > li:last-of-type:before {
    height: 3px;
    left: 0;
    top: 2em;
    width: 1em;
}
ol.static-org-chart > li ol > li:last-of-type:after {
    height: 2em;
    left: 0;
    top: 0;
    width: 3px;
}
/*** PRIMARY ***/
ol.static-org-chart > li > div {
    margin-left: 1em;
}
ol.static-org-chart > li > div:before {
    bottom: 2em;
    height: 3px;
    left: -1em;
    width: 1em;
}
ol.static-org-chart > li > div:first-of-type:after {
    bottom: 0;
    height: 2em;
    left: -1em;
    width: 3px;
}
ol.static-org-chart > li > div + div {
    margin-top: 1em;
}
ol.static-org-chart > li > div + div:after {
    height: calc(100% + 1em);
    right: -1em;
    top: -1em;
    width: 3px;
}
/*** SECONDARY ***/
ol.static-org-chart > li > ol:before {
    left: 0;
    right: inherit;
}
ol.static-org-chart > li > ol:after {
    left: 0;
    width: 100%;
}
ol.static-org-chart > li #first:after {
    width: 0%;
}
ol.static-org-chart #second:after {
    width: 0%;
}
ol.static-org-chart #second:before {
    height: 6em !important;
    left: 0 !important;
    top: -5em !important;
}
ol.static-org-chart #first > li > div {
	     height: 78px;
        width: 200px !important;
        color: #555a62 !important;
        background: linear-gradient(147deg, rgba(255, 255, 255, 1) 21%, rgba(254, 254, 255, 1) 32%, rgba(226, 237, 255, 1) 100%, rgba(229, 231, 235, 1) 100%);
        border-radius: 12px;
        border: 3px dotted #3b3b44;
        font-weight: 600;
}
ol.static-org-chart #first > li > div > div {
    position: relative;
    top: -30%;
    transform: translateY(-50%);
	right:-76px;
  width: 180px;
  text-align:right;
}
/*** MEDIA QUERIES ***/
@media only screen and (min-width: 50em) {
    ol.static-org-chart #second:before {
        height: 7em !important;
        left: 50% !important;
        top: -6em !important;
        width: 3px !important;
    }
    ol.static-org-chart {
        margin-left: -1em;
        margin-right: -1em;
    }
    /* PRIMARY */
    ol.static-org-chart > li > div {
        display: inline-block;
        float: none;
        margin: 0 1em 1em 1em;
        vertical-align: bottom;
    }
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(2),
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(2) ~ div {
        width: calc((100% / 2) - 2em - 4px);
    }
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(3),
    ol.static-org-chart > li > div:first-of-type:nth-last-of-type(3) ~ div {
        width: calc((100% / 3) - 2em - 4px);
    }
   
    ol.static-org-chart > li > div:before,
    ol.static-org-chart > li > div:after {
        bottom: -2.7em !important;
        top: inherit !important;
    }
    ol.static-org-chart > li > div:before {
        height: 2.7em !important;
        left: 50% !important;
        width: 3px !important;
    }
    ol.static-org-chart > li > div:only-of-type:after {
        display: none;
    }
    ol.static-org-chart > li > div:first-of-type:not(:only-of-type):after,
    ol.static-org-chart > li > div:last-of-type:not(:only-of-type):after {
        bottom: -1em;
        height: 3px;
        width: calc(50% + 1em + 3px);
    }
    ol.static-org-chart > li > div:first-of-type:not(:only-of-type):after {
        left: calc(50% + 3px);
    }
    ol.static-org-chart > li > div:last-of-type:not(:only-of-type):after {
        left: calc(-1em - 3px);
    }
    ol.static-org-chart > li > div + div:not(:last-of-type):after {
        height: 3px;
        left: -2em;
        width: calc(100% + 4em);
    }
    /* SECONDARY */
    ol.static-org-chart > li > ol {
        display: flex;
        flex-wrap: nowrap;
    }
    ol.static-org-chart > li > ol:before,
    ol.static-org-chart > li > ol > li:before {
        height: 1em !important;
        left: 50% !important;
        top: 0px !important;
        width: 3px !important;
    }
    
    ol.static-org-chart > li > ol:before {
        height: 0.2em !important;
        left: 8% !important;
        width: calc((100% / 2.2) - 1.5em - 10px) !important;
        top: 50px !important;
    }
    


    ol.static-org-chart > li > ol > li {
        flex-grow: 1;
        padding-left: 1em;
        padding-right: 1em;
        padding-top: 1em;
    }
    ol.static-org-chart > li > ol > li:only-of-type {
        padding-top: 0;
    }
    ol.static-org-chart > li > ol > li:only-of-type:before,
    ol.static-org-chart > li > ol > li:only-of-type:after {
        display: none;
    }
    ol.static-org-chart > li > ol > li:first-of-type:not(:only-of-type):after,
    ol.static-org-chart > li > ol > li:last-of-type:not(:only-of-type):after {
        height: 3px;
        top: 0;
        width: 50%;
    }
    ol.static-org-chart > li > ol > li:first-of-type:not(:only-of-type):after {
        left: 50%;
    }
    ol.static-org-chart > li > ol > li:last-of-type:not(:only-of-type):after {
        left: 0;
    }
    ol.static-org-chart > li > ol > li + li:not(:last-of-type):after {
        height: 3px;
        left: 0;
        top: 0;
        width: 100%;
    }
    ol.static-org-chart #first > li > div {
        height: 80px;
        width: 150px;
        color: #fff;
        background-color: #000053;
    }
    ol.static-org-chart #first > li > div > div {
        width: 180px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: -20%;
		right:-30px;
		text-align: right;
        transform: translateY(-50%);
    }
}
ol.static-org-chart .staff_card {
    width: 300px !important;
    min-width: 250px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);
	border-radius:12px;
}
ol.static-org-chart .staff_title {
    height: 50px;
    text-align: center;
    background: linear-gradient(147deg, rgba(255,255,255,1) 21%, rgba(254,254,255,1) 32%, rgba(226,237,255,1) 100%, rgba(229,231,235,1) 100%);
    color: #555a62;
    padding: 10px;
    font-weight: bold;
	border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
ol.static-org-chart .staff_info {
    height: 80px;
    padding: 5px;
}
ol.static-org-chart .staff_image img {
    border-radius: 100px;
    width: 60px;
}
ol.static-org-chart .staff_image {
    float: left;
    width: 30%;
}
ol.static-org-chart .staff_name_container {
    padding-top: 15px;
    float: right;
    width: 60%;
}

ol.static-org-chart #second > li > div:not(:first-child) {
    height: 60px;
    width: 300px;
    background: linear-gradient(147deg, rgba(255,255,255,1) 21%, rgba(254,254,255,1) 32%, rgba(226,237,255,1) 100%, rgba(229,231,235,1) 100%);
    color:  #000053; 
    font-size: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-bottom: 0.4rem;
    border-radius:12px;
}
ol.static-org-chart #second > li > div:not(:first-child) > div {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
ol.static-org-chart #second > li > div:not(:first-child):hover {
    background: white;
    box-shadow: none;
}
ol.static-org-chart .staff_card + div {
    margin-top: 10px;
}

.staff_card:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
}
</style>