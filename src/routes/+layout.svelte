<script lang="ts">
	import '$lib/../app.css';  // Keep your import
	import { logout } from '$lib/stores';
	import { currentUser } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';
	$: user = $currentUser;
	$: userRole = user ? user.role : 'guest';
  </script>
  
  <header class="bg-white shadow-md sticky top-0 z-50 py-4">
	<!-- Outer container to center content -->
	<div class="mx-auto max-w-7xl px-4 flex items-center justify-between">
	  <!-- Left side: brand/logo -->
	  <a href="/" class="flex items-center">
		 <!-- If you have a logo, place an <img> here: -->
		 <img src="/favicon.svg" alt="Inklu-Solutions Logo" class="w-8 h-8 md:w-11 md:h-11 lg:w-14 lg:h-14" />
		 <!-- If you have a text place it here: -->
		<!--<span class="text-xl font-bold tracking-tight text-gray-900">My Web App</span>-->
	  </a>
  
	  <!-- Center Nav: hidden on mobile, shown on md+ -->
	  <nav class="hidden md:block">
		<ul class="flex space-x-6">
		  {#if userRole === 'guest'}
			<li></li>
		  {:else}
			<li><a href="/alle-coaching-termine" >Events</a></li>
			<li><a href="/mein-profil" >Profil</a></li>
		  {/if}
		</ul>
	  </nav>
  
	  <!-- Right side: CTA buttons (mimicking “Log in” and “Book demo”) -->
	  <div class="flex items-center space-x-2">
		<!-- Example: If user is guest, show these two buttons -->
		{#if userRole === 'guest'}
		  <a
			href="/apply-as-mentor"
			class="btn-nav1"
		  >
			Bewerben
		  </a>
		  <a
			href="/login">
			<button class="btn-nav2">Log In</button>
			</a>
		{:else}
		  <!-- If user is logged in, do something else or keep it hidden
			   e.g. show “Book a Demo” anyway or remove entirely.
		  -->
		  <button
			on:click={logout}
			class="btn-nav2"
		  >
			Log Out
		  </button>
		{/if}
	  </div>
	</div>
  </header>
  
  <!-- Main content container -->
  <main class="mx-auto max-w-7xl px-4 py-10">
	<slot />
  </main>
  