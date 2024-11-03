<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Heading, Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
    import ImagelogoSipapaOde from '$lib/images/SipapaOde-logo.webp';
   
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<br/><br/><br/><br/>

<div class="flex container justify-center mb-16">
    <Card horizontal size="lg">
      <div class="grid grid-cols-4 gap-4 w-full">
            <div><Heading tag="h3" class="mb-4" customSize="text3xl text-left font-bold  md:text-4xl lg:text-4xl">Login</Heading>
             <img class="w-14 h-14" src={ImagelogoSipapaOde} alt="Sipapaode logo" style="width:100px; height:90px;" />
            </div>
             
            <div class="col-span-3">
                <form class="flex flex-col space-y-6" action="/">
                    <Label class="space-y-2">
                      <span>Email</span>
                      <Input type="email" name="email" placeholder="name@company.com" required />
                    </Label>
                    <Label class="space-y-2">
                      <span>Password Anda</span>
                      <Input type="password" name="password" placeholder="•••••" required />
                    </Label>
                    <div class="flex items-start">
                      <Checkbox>Ingatkan saya</Checkbox>
                      <a href="/" class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500"> Kehilangan password? </a>
                    </div>
                    <Button type="submit" class="w-full">Login ke Akun Anda</Button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Tidak punya Akun <a href="/" class="text-primary-700 hover:underline dark:text-primary-500"> Daftar Akun </a>
                    </div>
                  </form>
            </div>
      </div>    <br/>  
      </Card>

    
</div>