<script lang="ts">
  import type { CoachingEvent, User } from '$lib/data';

  export let evt: CoachingEvent;
  export let user: User;

  export let isMentor: boolean;
  export let isCoach: boolean;

  // Functions passed down from the parent page:
  export let optInAsMentor: (eventId: number) => void;
  export let toggleEditMode: (eventId: number) => void;
  export let deleteEvent: (eventId: number) => void;
  export let saveEvent: (eventId: number) => void;
</script>

{#if evt.editing}
  <!-- EDIT MODE ROW -->
  <tr>
    <td>
      <input type="date" class="input-field" bind:value={evt.date} />
    </td>
    <td>
      <input type="time" class="input-field" bind:value={evt.time} />
    </td>
    <td>
      <input type="text" class="input-field" bind:value={evt.company} />
    </td>
    <td>
      <input type="text" class="input-field" bind:value={evt.address} />
    </td>
    <td>
      <input type="number" class="input-field" style="width: 60px;" bind:value={evt.saeule} />
      <input type="text" class="input-field" style="margin-left: 8px;" bind:value={evt.saeuleDesc} />
    </td>
    <td>{evt.mentorName || '—'}</td>
    <td>{evt.coachName || '—'}</td>
    <td>
      <button class="btn btn-primary" on:click={() => saveEvent(evt.id)}>Save</button>
      <button class="btn btn-secondary" on:click={() => toggleEditMode(evt.id)}>Cancel</button>
    </td>
  </tr>
{:else}
  <!-- DISPLAY MODE ROW -->
  <tr>
    <td>{evt.date}</td>
    <td>{evt.time}</td>
    <td>{evt.company}</td>
    <td>{evt.address}</td>
    <td>{evt.saeule} ({evt.saeuleDesc})</td>
    <td>{evt.mentorName || '—'}</td>
    <td>{evt.coachName || '—'}</td>
    <td>
      {#if isMentor && !evt.mentorName}
        <button class="btn btn-primary" on:click={() => optInAsMentor(evt.id)}>Opt In</button>
      {/if}
      {#if isCoach}
        <button class="btn btn-secondary" on:click={() => toggleEditMode(evt.id)}>Edit</button>
        <button class="btn btn-danger" on:click={() => deleteEvent(evt.id)}>Delete</button>
      {/if}
    </td>
  </tr>
{/if}
