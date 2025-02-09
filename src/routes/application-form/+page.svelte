<!-- src/routes/application-form/+page.svelte -->
<script lang="ts">
    let fullName = '';
    let phone = '';
    let availability = '';
  
    function sendForm() {
      alert(`Form submitted for ${fullName} (dummy)`);
    }
  </script>
  
  <h2 class="text-2xl font-semibold mb-4">Mentor Application Form</h2>
  
  <form class="max-w-md flex flex-col gap-4">
    <div>
      <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900">
        Full Name
      </label>
      <input
        id="fullName"
        type="text"
        bind:value={fullName}
        class="bg-gray-50 border border-gray-300 text-gray-900 
               text-sm rounded-lg focus:ring-blue-500 
               focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  
    <div>
      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">
        Phone
      </label>
      <input
        id="phone"
        type="text"
        bind:value={phone}
        class="bg-gray-50 border border-gray-300 text-gray-900 
               text-sm rounded-lg focus:ring-blue-500 
               focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  
    <div>
      <label for="availability" class="block mb-2 text-sm font-medium text-gray-900">
        Availability
      </label>
      <textarea
        id="availability"
        rows="3"
        bind:value={availability}
        class="bg-gray-50 border border-gray-300 text-gray-900 
               text-sm rounded-lg focus:ring-blue-500 
               focus:border-blue-500 block w-full p-2.5"
      ></textarea>
    </div>
  
    <button
      type="button"
      on:click={sendForm}
      class="text-white bg-blue-700 hover:bg-blue-800 
             font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
    >
      Submit
    </button>
  </form>
  