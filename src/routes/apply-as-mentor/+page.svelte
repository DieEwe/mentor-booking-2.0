<!-- src/routes/apply-as-mentor/+page.svelte -->
<script lang="ts">
  // description of how to apply

  import { goto } from '$app/navigation';
  function handleClick() {
    goto('https://cloud.seatable.io/...');
  }
</script>

<p class="text-lg font-medium mb-4">
  Wir freuen uns, dass du dich als MentorIn bewerben möchtest. Bitte nimm dir kurz Zeit und fülle unser Bewerbungsformular aus.
</p>
<button 
class="text-white bg-blue-700 hover:bg-blue-800 
           font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
           on:click={handleClick}>Zur Bewerbung</button>

<!-- <button
    class="text-white bg-blue-700 hover:bg-blue-800 
           font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
    on:click={() => window.location.href = 'https://cloud.seatable.io/dtable/forms/1ca77ba1-a9b9-4e05-9171-47bdb2c6d219/'}
  >
    Zur Bewerbung
  </button> -->


<!-- <script lang="ts">
    let userName = '';
    let userEmail = '';
  
    function submitApplication() {
      alert(`Application submitted for ${userName} (${userEmail}).`);
    }
  </script>
  
  <h2 class="text-2xl font-semibold mb-4">Apply as Mentor</h2>
  
  <form class="max-w-md flex flex-col gap-4">
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
        Your Name
      </label>
      <input
        id="name"
        type="text"
        bind:value={userName}
        class="bg-gray-50 border border-gray-300 text-gray-900 
               text-sm rounded-lg focus:ring-blue-500 
               focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Email
      </label>
      <input
        id="email"
        type="email"
        bind:value={userEmail}
        class="bg-gray-50 border border-gray-300 text-gray-900 
               text-sm rounded-lg focus:ring-blue-500 
               focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  
    <button
      type="button"
      on:click={submitApplication}
      class="text-white bg-blue-700 hover:bg-blue-800 
             font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
    >
      Submit Application
    </button>
  </form> -->
  