<script lang="ts">
    import type { CoachingEvent, User } from '$lib/data';
  
    export let evt: CoachingEvent;
    export let user: User;
  
    // These booleans let us know if the user can do certain actions
    export let isMentor: boolean;
    export let isCoach: boolean;
  
    // These functions will be passed down from the parent (the page),
    // so the parent can still control the store updates and side effects.
    export let optInAsMentor: (eventId: number) => void;
    export let toggleEditMode: (eventId: number) => void;
    export let deleteEvent: (eventId: number) => void;
    export let saveEvent: (eventId: number) => void;
  </script>
  
  {#if evt.editing}
    <!-- EDITING ROW -->
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">
        <input type="date" class="border p-1" bind:value={evt.date} />
      </td>
      <td class="px-6 py-4">
        <input type="time" class="border p-1" bind:value={evt.time} />
      </td>
      <td class="px-6 py-4">
        <input type="text" class="border p-1" bind:value={evt.company} />
      </td>
      <td class="px-6 py-4">
        <input type="text" class="border p-1" bind:value={evt.address} />
      </td>
      <td class="px-6 py-4">
        <input type="number" class="border p-1 w-16" bind:value={evt.saeule} />
        <input type="text" class="border p-1 ml-2" bind:value={evt.saeuleDesc} />
      </td>
      <td class="px-6 py-4">
        {evt.mentorName || '—'}
      </td>
      <td class="px-6 py-4">
        {evt.coachName || '—'}
      </td>
      <td class="px-6 py-4 flex gap-2">
        <button
          class="bg-green-500 text-white px-2 py-1 rounded"
          on:click={() => saveEvent(evt.id)}>
          Save
        </button>
        <button
          class="bg-gray-500 text-white px-2 py-1 rounded"
          on:click={() => toggleEditMode(evt.id)}>
          Cancel
        </button>
      </td>
    </tr>
  {:else}
    <!-- DISPLAY (VIEW) ROW -->
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="px-6 py-4">{evt.date}</td>
      <td class="px-6 py-4">{evt.time}</td>
      <td class="px-6 py-4">{evt.company}</td>
      <td class="px-6 py-4">{evt.address}</td>
      <td class="px-6 py-4">{evt.saeule} ({evt.saeuleDesc})</td>
      <td class="px-6 py-4">{evt.mentorName || '—'}</td>
      <td class="px-6 py-4">{evt.coachName || '—'}</td>
      <td class="px-6 py-4 flex gap-2">
        {#if isMentor && !evt.mentorName}
          <button
            class="bg-blue-600 text-white px-2 py-1 rounded"
            on:click={() => optInAsMentor(evt.id)}>
            Opt In
          </button>
        {/if}
        {#if isCoach}
          <button
            class="bg-yellow-500 text-white px-2 py-1 rounded"
            on:click={() => toggleEditMode(evt.id)}>
            Edit
          </button>
          <button
            class="bg-red-600 text-white px-2 py-1 rounded"
            on:click={() => deleteEvent(evt.id)}>
            Delete
          </button>
        {/if}
      </td>
    </tr>
  {/if}
  