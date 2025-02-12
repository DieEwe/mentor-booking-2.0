<script lang="ts">
  import { currentUser, logout } from '$lib/stores';
  import type { User } from '$lib/data';
  import ProfileCard from '$lib/ProfileCard.svelte';

  let user: User;          // real user data from the store
  let tempUser: User;      // copy for editing
  let isEditing = false;   // toggles edit mode

  $: user = $currentUser;

  function startEditing() {
    tempUser = structuredClone(user);
    isEditing = true;
  }

  function saveProfile() {
    user = { ...tempUser };
    alert('Profile changes saved (dummy).');
    isEditing = false;
  }

  function cancelEdit() {
    isEditing = false;
  }
</script>

<div class="profile-container">
  {#if !isEditing}
    <h2 class="section-title">Mein Profil</h2>
    <ProfileCard {user} />
    <button class="btn btn-primary" on:click={startEditing}>Bearbeiten</button>
    <button class="btn btn-secondary" on:click={logout}>Ausloggen</button>
  {:else}
    <h2 class="section-title">Profil bearbeiten</h2>
    <form class="form-container">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" bind:value={tempUser.email} />
      </div>

      <div class="form-group">
        <label for="password">New Password</label>
        <input id="password" type="password" placeholder="Enter new password" />
      </div>

      <div class="form-group">
        <input id="showFullName" type="checkbox" bind:checked={tempUser.canShowFullName} />
        <label for="showFullName">Show full name to others?</label>
      </div>

      <div class="form-group">
        <label for="description">Description (optional)</label>
        <textarea id="description" rows="3" bind:value={tempUser.description}></textarea>
      </div>

      <div class="form-group">
        <span>Disability Options:</span>
        <div>
          <input id="visibleDis" type="checkbox" bind:checked={tempUser.hasVisibleDisability} />
          <label for="visibleDis">Visible disability</label>
        </div>
        <div>
          <input id="invisibleDis" type="checkbox" bind:checked={tempUser.hasInvisibleDisability} />
          <label for="invisibleDis">Invisible disability</label>
        </div>
        <div>
          <input id="disabilityVisibility" type="checkbox" bind:checked={tempUser.isDisabilityVisibleOnProfile} />
          <label for="disabilityVisibility">Show disability info on profile</label>
        </div>
      </div>

      <button type="button" on:click={saveProfile} class="btn btn-primary">Speichern</button>
      <button type="button" on:click={cancelEdit} class="btn btn-secondary">Abbrechen</button>
    </form>
  {/if}
</div>
