<script lang="ts">
    import EventRow from '$lib/components/EventRow.svelte';
    import type { CoachingEvent, User } from '$lib/data';
  
    export let events: CoachingEvent[] = [];
    export let user: User;
    export let isMentor: boolean;
    export let isCoach: boolean;
  
    // Functions to mutate data, which the parent provides.
    export let addEvent: () => void;
    export let optInAsMentor: (id: number) => void;
    export let toggleEditMode: (id: number) => void;
    export let saveEvent: (id: number) => void;
    export let deleteEvent: (id: number) => void;
  </script>
  
  <h2 class="text-2xl font-semibold mb-4">Alle Coaching Termine</h2>
  
  {#if events.length === 0}
    <p>No events available.</p>
  {:else}
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Company</th>
            <th>Address</th>
            <th>Säule</th>
            <th>Mentor</th>
            <th>Coach</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each events as evt}
            <EventRow
              bind:evt={evt}
              {user}
              {isMentor}
              {isCoach}
              {optInAsMentor}
              {toggleEditMode}
              {deleteEvent}
              {saveEvent}
            />
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  
  {#if isCoach}
    <button
      class="mt-4 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
      on:click={addEvent}
    >
      Add New Event
    </button>
  {/if}
  