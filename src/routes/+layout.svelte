<script lang="ts">
	import '$lib/../app.css';
	import { logout } from '$lib/stores';
	import { currentUser } from '$lib/stores';
	$: user = $currentUser;
	$: userRole = user ? user.role : 'guest';
  </script>
  
  <header class="bg-white shadow-md sticky top-0 z-50">

  </header>
  
  <main class="container py-8">
		<!-- Use a container that centers its content -->
		<div class="navbar-container">
			<!-- Logo and Brand centered -->
			<a href="/" class="flex items-center mb-2">
			  <img src="/logo.svg" alt="My Web App Logo" class="w-10 h-10 mr-3" />
			  <span class="text-xl font-heading text-gray-800">My Web App</span>
			</a>
			<!-- Centered Navigation Menu -->
			<nav class="w-full">
			  <ul class="flex justify-center space-x-6">
				<li><a href="/" class="nav-link">Home</a></li>
				{#if userRole === 'guest'}
				  <li><a href="/login" class="nav-link">Login</a></li>
				  <li><a href="/apply-as-mentor" class="nav-link">Bewerbung als MentorIn</a></li>
				{:else if userRole === 'mentor' || userRole === 'coach' || userRole === 'admin'}
				  <li><a href="/alle-coaching-termine" class="nav-link">Alle Coaching Termine</a></li>
				  <li><a href="/mein-profil" class="nav-link">Mein Profil</a></li>
				  <li><button on:click={logout} class="nav-link focus:outline-none">Ausloggen</button></li>
				{/if}
			  </ul>
			</nav>
		  </div>
	<slot />
  </main>
  