<script lang="ts">
  import type { User } from '$lib/data';

  import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  export let user: User;

  // Voller Name nur anzeigen, wenn erlaubt.
  $: fullName = user.canShowFullName 
    ? `${user.firstName} ${user.lastName}`
    : user.firstName || 'Anonymous';

  // Anzeige-Badges für Rolle + evtl. Behinderungsstatus.
  // Du kannst diesen Array flexibel erweitern.
  // Deklariere badges von vornherein als string[]
    let badges: string[] = [];

  // Rolle (admin, coach, mentor, guest) als Badge hinzufügen
  if (user.role) {
    badges.push(user.role);
  }

  // Behinderung nur anzeigen, wenn vom User erlaubt
  if (user.isDisabilityVisibleOnProfile) {
    if (user.hasVisibleDisability) {
      badges.push('visible disability');
    }
    if (user.hasInvisibleDisability) {
      badges.push('non-visible disability');
    }
  }
</script>

<!-- Container Card -->
<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6 text-center">
  <!-- Profilfoto, falls vorhanden -->
  <div class="w-24 h-24 mx-auto rounded-full overflow-hidden">
    <img
      src={user.avatar || 'https://via.placeholder.com/100'}
      alt="Profilbild"
      class="object-cover w-full h-full"
    />
  </div>

  <!-- Name -->
  <h2 class="mt-4 text-2xl font-semibold text-gray-800">
    {fullName}
  </h2>

  <!-- Badges -->
  {#if badges.length > 0}
    <div class="flex flex-wrap justify-center gap-2 mt-3">
      {#each badges as b}
        <span
          class="inline-block bg-gray-200 text-gray-700 text-xs 
                 font-medium px-2 py-1 rounded"
        >
          {b}
        </span>
      {/each}
    </div>
  {/if}

  <!-- Beschreibung -->
  {#if user.description}
    <p class="mt-4 text-gray-700 text-sm">
      {user.description}
    </p>
  {/if}

  <!-- Optionale Social Links (falls du sie verwenden möchtest) -->
  <div class="flex justify-center space-x-4 mt-4 text-gray-500">
    {#if user.github}
    <a href={user.github} target="_blank">
      <FontAwesomeIcon icon={faGithub} />
    </a>
    {/if}
    {#if user.twitter}
      <a href={user.twitter} target="_blank">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    {/if}
    {#if user.linkedin}
      <a href={user.linkedin} target="_blank">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
    {/if}
  
  </div>

 
  <button
    class="mt-4 bg-blue-600 text-white px-4 py-2 rounded 
           hover:bg-blue-700 focus:outline-none"
  >
    Contact Me
  </button>
</div>
