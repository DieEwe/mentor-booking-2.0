<script lang="ts">
  import { goto } from '$app/navigation';
  import { loginAs } from '$lib/stores';
  import { mockUsers } from '$lib/data';
  import type { User } from '$lib/data';

  let email = '';
  let password = '';

  function attemptLogin() {
    const foundUser = mockUsers.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser && password !== '') {
      loginAs(foundUser);
      alert(`Logged in as ${foundUser.role}`);
      goto('/alle-coaching-termine');
    } else {
      alert('Invalid credentials or user not found in dummy data');
    }
  }
</script>

<h2 class="section-title">Login</h2>

<form class="form-container">
  <div class="form-group">
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} />
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} />
  </div>

  <button type="button" on:click={attemptLogin} class="btn btn-primary">Login</button>
</form>
