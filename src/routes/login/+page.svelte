<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
    import { loginAs } from '$lib/stores';
    import { mockUsers } from '$lib/data';
    import type { User } from '$lib/data';
  
    let email = '';
    let password = '';
  
    function attemptLogin() {
      const foundUser = mockUsers.find((u: User) => u.email.toLowerCase() === email.toLowerCase()); //Emails are case-insensitive
      if (foundUser && password !== '') {
        loginAs(foundUser);
        alert(`Logged in as ${foundUser.role}`);
        goto('/alle-coaching-termine');
      } else {
        alert('Invalid credentials or user not found in dummy data');
      }
    }
  </script>
  
  <h2 class="text-2xl font-semibold mb-4">Login</h2>
  
  <form class="flex flex-col gap-4 max-w-sm">
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Email
      </label>
      <input
        id="email"
        type="email"
        bind:value={email}
        class="bg-gray-50 border border-gray-300 text-gray-900 
               text-sm rounded-lg focus:ring-blue-500 
               focus:border-blue-500 block w-full p-2.5"
      />
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
        Password
      </label>
      <input
        id="password"
        type="password"
        bind:value={password}
        class="bg-gray-50 border border-gray-300 text-gray-900 
               text-sm rounded-lg focus:ring-blue-500 
               focus:border-blue-500 block w-full p-2.5"
      />
    </div>
    <button
      type="button"
      on:click={attemptLogin}
      class="text-white bg-blue-700 hover:bg-blue-800 
             font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
    >
      Login
    </button>
  </form>
  