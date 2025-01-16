<script>

    import { Heading, Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
    import ImagelogoSipapaOde from '$lib/images/SipapaOde-logo.webp';

    import { user } from '$lib/user';


	const login = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		await user.login(formData.get('email'), formData.get('password'));
	};

</script>

<svelte:head>
	<title>Login Sipapaode</title>
	<meta name="description" content="Login Sipapaode - Biro Pemerintahan dan Otonomi Daerah Sulawesi Tenggara" />
</svelte:head>

<br/><br/><br/><br/>


<div class="flex container justify-center mb-16">
  <Card horizontal size="lg">

<div class="flex w-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto w-24 h-20" src={ ImagelogoSipapaOde } alt="sipapaode">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login Ke Akun Dashboard Anda</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" on:submit={login}>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log In</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Tidak Punya Akun?
      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Registrasi</a>
    </p>
  </div>
</div>

</Card></div>