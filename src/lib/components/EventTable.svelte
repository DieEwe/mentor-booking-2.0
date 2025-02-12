<script lang="ts">
    import EventRow from '$lib/components/EventRow.svelte';
    import PlusFab from '$lib/components/PlusFab.svelte';
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
  
  <h1 class="gradient">Alle Coaching Termine</h1>
  
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
  <div class="flex items-center space-x-2">
    <!-- PlusFab is your custom FAB component that shows the plus icon -->
    <PlusFab on:click={addEvent} />
    <span class="text-gray-700 text-md">Event hinzufügen</span>
  </div>
{/if}

