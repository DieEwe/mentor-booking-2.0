<script lang="ts">
  import EventRow from '$lib/components/EventRow.svelte';
  import PlusFab from '$lib/components/PlusFab.svelte';
  import type { CoachingEvent, User } from '$lib/data';

  export let events: CoachingEvent[] = [];
  export let user: User;
  export let isMentor: boolean;
  export let isCoach: boolean;

  // Functions passed from the parent page:
  export let addEvent: () => void;
  export let optInAsMentor: (id: number) => void;
  export let toggleEditMode: (id: number) => void;
  export let saveEvent: (id: number) => void;
  export let deleteEvent: (id: number) => void;
</script>

<h1 class="section-title">Alle Coaching Termine</h1>

{#if events.length === 0}
  <p>No events available.</p>
{:else}
  <div class="table-container">
    <table class="table">
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
  <div class="button-group">
    <PlusFab on:click={addEvent} />
    <span>Add Event</span>
  </div>
{/if}
