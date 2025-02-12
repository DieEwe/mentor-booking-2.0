<script lang="ts">
	import '../app.css';
	import { logout } from '$lib/stores';
	import { currentUser } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';
	$: user = $currentUser;
	$: userRole = user ? user.role : 'guest';
  </script>
  
  <header class="header">
	<div class="container nav">
	  <a href="/" class="logo">
		<img src="/AppIcon.png" alt="Inklu-Solutions Logo" />
	  </a>
  
	  <nav class="nav-menu">
		<ul class="nav-links">
		  {#if userRole !== 'guest'}
			<li><a href="/alle-coaching-termine">Events</a></li>
			<li><a href="/mein-profil">Profil</a></li>
		  {/if}
		</ul>
	  </nav>
  
	  <div class="header-buttons">
		{#if userRole === 'guest'}
		  <a href="/apply-as-mentor" class="nav-btn">Bewerben</a>
		  <a href="/login" class="nav-btn">Log In</a>
		{:else}
		  <button on:click={logout} class="nav-btn">Log Out</button>
		{/if}
	  </div>
	</div>
  </header>
  
  <main class="container" style="padding: 40px 0;">
	<slot />
  </main>
  