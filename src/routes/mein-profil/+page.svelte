<!-- src/routes/mein-profil/+page.svelte -->
<script lang="ts">
    import { currentUser, logout } from '$lib/stores';
    import type { User } from '$lib/data';
    import { get } from 'svelte/store';
  
    let user: User;
    let newPassword = '';
  
    $: user = $currentUser;
  
    function saveProfile() {
      alert('Profile changes saved (dummy).');
    }
  </script>
  
  <h2 class="text-2xl font-semibold mb-4">Mein Profil</h2>
  
  <form class="max-w-lg flex flex-col gap-4">
    <!-- Email -->
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Email
      </label>
      <input
        id="email"
        type="email"
        bind:value={user.email}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
               rounded-lg focus:ring-blue-500 focus:border-blue-500 
               block w-full p-2.5"
      />
    </div>
  
    <!-- Password -->
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
        New Password
      </label>
      <input
        id="password"
        type="password"
        bind:value={newPassword}
        placeholder="Enter new password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
               rounded-lg focus:ring-blue-500 focus:border-blue-500 
               block w-full p-2.5"
      />
    </div>
  
    <!-- Toggle show full name -->
    <div class="flex items-center">
      <input
        id="showFullName"
        type="checkbox"
        bind:checked={user.canShowFullName}
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
               rounded focus:ring-blue-500"
      />
      <label for="showFullName" class="ml-2 text-sm font-medium text-gray-900">
        Show full name to others?
      </label>
    </div>
  
    <!-- Description -->
    <div>
      <label for="description" class="block mb-2 text-sm font-medium text-gray-900">
        Description (optional)
      </label>
      <textarea
        id="description"
        rows="3"
        bind:value={user.description}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
               rounded-lg focus:ring-blue-500 focus:border-blue-500 
               block w-full p-2.5"
      ></textarea>
    </div>
  
    <!-- Disability Options -->
    <div class="grid gap-2">
      <span class="font-medium text-gray-900">Disability Options:</span>
  
      <div class="flex items-center">
        <input
          id="visibleDis"
          type="checkbox"
          bind:checked={user.hasVisibleDisability}
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                 rounded focus:ring-blue-500"
        />
        <label for="visibleDis" class="ml-2 text-sm font-medium text-gray-900">
          Visible disability
        </label>
      </div>
  
      <div class="flex items-center">
        <input
          id="invisibleDis"
          type="checkbox"
          bind:checked={user.hasInvisibleDisability}
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                 rounded focus:ring-blue-500"
        />
        <label for="invisibleDis" class="ml-2 text-sm font-medium text-gray-900">
          Invisible disability
        </label>
      </div>
  
      <div class="flex items-center">
        <input
          id="disabilityVisibility"
          type="checkbox"
          bind:checked={user.isDisabilityVisibleOnProfile}
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                 rounded focus:ring-blue-500"
        />
        <label for="disabilityVisibility" class="ml-2 text-sm font-medium text-gray-900">
          Show disability info on profile
        </label>
      </div>
    </div>
  
    <button
      type="button"
      on:click={saveProfile}
      class="text-white bg-blue-700 hover:bg-blue-800 
             font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4"
    >
      Save
    </button>

    <button
    type="button"
    on:click={logout}
    class="text-white bg-third hover:third-hover 
           font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4"
  >
    ausloggen
  </button>
    
  </form>
  