<script lang="ts">
  import { coachingEvents, currentUser } from '$lib/stores';
  import type { CoachingEvent, User } from '$lib/data';
  import { get } from 'svelte/store';
  import FullCalendar from 'svelte-fullcalendar';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import EventTable from '$lib/components/EventTable.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import PlusFab from '$lib/components/PlusFab.svelte';

  let localEvents: CoachingEvent[] = get(coachingEvents) ?? [];
  let user: User;
  let viewMode: 'table' | 'calendar' = 'table';
  let switchValue: string = 'off';
  $: viewMode = switchValue === 'on' ? 'calendar' : 'table';
  $: localEvents = $coachingEvents;
  $: user = $currentUser;
  $: console.log('localEvents:', localEvents);

  function combineDateTime(date: string, time: string) {
    if (time && time.split(':').length === 2) {
      time += ':00';
    }
    return `${date}T${time}`;
  }
  $: calendarEvents = (localEvents || []).map(evt => {
    const hasValidDateTime = evt?.date && evt?.time;
    return {
      id: evt?.id?.toString() || '',
      title: `${evt?.company ?? 'Unknown'} - ${evt?.coachName ?? 'No Coach'}`,
      start: hasValidDateTime ? combineDateTime(evt.date, evt.time) : '',
      end: hasValidDateTime ? combineDateTime(evt.date, evt.time) : '',
      allDay: false,
      resourceIds: [],
      editable: true
    };
  });

  function optInAsMentor(eventId: number) {
    coachingEvents.update(events =>
      events.map(evt =>
        evt.id === eventId && !evt.mentorName
          ? { ...evt, mentorName: user.firstName }
          : evt
      )
    );
    alert(`You have opted in as a mentor for this event.`);
  }

  function addEvent() {
    const newEvent: CoachingEvent = {
      id: Date.now(),
      date: '2025-04-01',
      time: '10:00',
      company: 'New Company',
      address: '456 Example Rd',
      saeule: 2,
      saeuleDesc: 'Säule 2: Example',
      mentorName: '',
      coachName: user.role === 'coach' ? user.firstName : ''
    };
    coachingEvents.update(evts => [...evts, newEvent]);
  }

  function deleteEvent(id: number) {
    coachingEvents.update(evts => evts.filter(e => e.id !== id));
  }

  function toggleEditMode(id: number) {
    coachingEvents.update(evts =>
      evts.map(e => (e.id === id ? { ...e, editing: !e.editing } : e))
    );
  }

  function saveEvent(id: number) {
    coachingEvents.update(evts =>
      evts.map(e => (e.id === id ? { ...e, editing: false } : e))
    );
  }

  $: isMentor = user.role === 'mentor';
  $: isCoach = user.role === 'coach' || user.role === 'admin';
</script>

<Switch bind:value={switchValue} label={switchValue === 'on' ? 'Kalender' : 'Events'} design="slider" fontSize={12} />

{#if viewMode === 'table'}
  <EventTable
    events={localEvents}
    user={user}
    isMentor={isMentor}
    isCoach={isCoach}
    addEvent={addEvent}
    optInAsMentor={optInAsMentor}
    toggleEditMode={toggleEditMode}
    saveEvent={saveEvent}
    deleteEvent={deleteEvent}
  />
{:else}
  <div class="fullcalendar-container">
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      events={calendarEvents}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
    />
  </div>
{/if}
