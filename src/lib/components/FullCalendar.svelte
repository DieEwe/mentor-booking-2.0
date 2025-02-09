<script lang="ts">
    import { onMount } from 'svelte';
    import { Calendar } from '@fullcalendar/core';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import '@fullcalendar/core/main.css';
    import '@fullcalendar/daygrid/main.css';
    import '@fullcalendar/timegrid/main.css';
  
    export let events: any[] = [];
  
    let calendarEl: HTMLElement;
  
    onMount(() => {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        events
      });
      calendar.render();
    });
  </script>
  
  <div bind:this={calendarEl}></div>