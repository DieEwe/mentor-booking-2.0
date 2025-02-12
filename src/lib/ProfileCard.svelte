<script lang="ts">
  import type { User } from '$lib/data';
  import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  export let user: User;

  // Display full name only if allowed
  $: fullName = user.canShowFullName
    ? `${user.firstName} ${user.lastName}`
    : user.firstName || 'Anonymous';

  // Build an array of badges (role, disability info, etc.)
  $: badges = [
    ...(user.role ? [user.role] : []),
    ...(user.isDisabilityVisibleOnProfile
      ? [
          user.hasVisibleDisability ? 'visible disability' : null,
          user.hasInvisibleDisability ? 'non-visible disability' : null
        ].filter(Boolean)
      : [])
  ];
</script>

<div class="profile-card">
  <div class="profile-image">
    <img src={user.avatar || 'https://via.placeholder.com/100'} alt="Profilbild" />
  </div>

  <h2>{fullName}</h2>

  {#if badges.length > 0}
    <div class="badges">
      {#each badges as b}
        <span class="badge">{b}</span>
      {/each}
    </div>
  {/if}

  {#if user.description}
    <p class="profile-description">{user.description}</p>
  {/if}

  <div class="social-links">
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

  <button class="btn btn-primary">Contact Me</button>
</div>
