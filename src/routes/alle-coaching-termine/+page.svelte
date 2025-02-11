<script lang="ts">
  // Importiere die Svelte Stores, in denen die Events und der aktuell angemeldete Benutzer gespeichert sind.
  import { coachingEvents, currentUser } from '$lib/stores';
  // Importiere die Typdefinitionen für CoachingEvent und User, damit TypeScript die richtigen Typen kennt.
  import type { CoachingEvent, User } from '$lib/data';
  // Importiere die "get"-Funktion, um initial synchron auf den Wert eines Stores zuzugreifen.
  import { get } from 'svelte/store';

  // Importiere die FullCalendar-Komponente und die Plugins.
  import FullCalendar from 'svelte-fullcalendar';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  //import '@fullcalendar/core/main.css';
  //import '@fullcalendar/daygrid/main.css';
  //import '@fullcalendar/timegrid/main.css';

  // Importiere die EventTable-Komponente.
  import EventTable from '$lib/components/EventTable.svelte';
  import Switch from '$lib/components/Switch.svelte';

  // Lese initial den Wert des coachingEvents-Stores aus und speichere ihn in der lokalen Variable "localEvents".
  // Falls der Store leer ist, wird ein leeres Array verwendet.
  let localEvents: CoachingEvent[] = get(coachingEvents) ?? [];

  // Variable für den aktuell angemeldeten Benutzer.
  let user: User;

  // Variable zur Steuerung, ob die Tabelle oder der Kalender angezeigt wird.
  // Standardmäßig wird hier die Tabellenansicht genutzt.
  let viewMode: 'table' | 'calendar' = 'table'; // Toggle state

  // Instead of viewMode directly, we bind the switch's value.
  let switchValue: string = 'off'; // 'off' means table view by default.

  // Derive the viewMode based on the switch value.
  $: viewMode = switchValue === 'on' ? 'calendar' : 'table';

  // Reaktive Anweisungen: Aktualisiere "localEvents" und "user" automatisch,
  // sobald sich die zugrunde liegenden Stores ($coachingEvents und $currentUser) ändern.
  $: localEvents = $coachingEvents;
  $: user = $currentUser;

  // Debug-Ausgabe: Protokolliere die aktuellen Events in der Konsole (optional).
  $: console.log('localEvents:', localEvents);

  // Hilfsfunktion: Kombiniert Datum und Uhrzeit zu einem gültigen ISO 8601-Datum-Zeit-String.
  function combineDateTime(date: string, time: string) {
    // Falls die Zeit im Format "HH:MM" vorliegt, hänge ":00" an, um Sekunden darzustellen.
    if (time && time.split(':').length === 2) {
      time += ':00';
    }
    // Gibt den kombinierten String im Format "YYYY-MM-DDTHH:MM:SS" zurück.
    return `${date}T${time}`;
  }

  // Erzeuge ein Array "calendarEvents", das die Events in einem Format enthält, das
  // von der Kalender-Komponente verstanden wird. Dies geschieht reaktiv, d.h. jedes Mal,
  // wenn sich "localEvents" ändert, wird "calendarEvents" neu berechnet.
  $: calendarEvents = (localEvents || []).map(evt => {
    // Prüfe, ob sowohl Datum als auch Zeit vorhanden sind.
    const hasValidDateTime = evt?.date && evt?.time;
    return {
      // Die ID wird in einen String umgewandelt, da die Kalender-Komponente oft IDs als Strings erwartet.
      id: evt?.id?.toString() || '',
      // Erstelle den Titel des Events, bestehend aus dem Firmennamen und dem Namen des Coaches.
      title: `${evt?.company ?? 'Unknown'} - ${evt?.coachName ?? 'No Coach'}`,
      // Setze die Startzeit des Events. Falls Datum und Zeit vorhanden sind, kombiniere sie.
      start: hasValidDateTime ? combineDateTime(evt.date, evt.time) : '',
      // Setze die Endzeit des Events. Hier wird aktuell der gleiche Wert wie bei "start" verwendet.
      end: hasValidDateTime ? combineDateTime(evt.date, evt.time) : '',
      // Kennzeichnet, dass es sich nicht um ein Ganztages-Event handelt.
      allDay: false,
      // Leeres Array für Ressourcen-IDs – kann später angepasst werden, falls benötigt.
      resourceIds: [],
      // Markiere das Event als bearbeitbar im Kalender.
      editable: true
    };
  });

  // Funktion zum Umschalten zwischen Tabellen- und Kalenderansicht.
  function toggleView() {
    viewMode = viewMode === 'table' ? 'calendar' : 'table';
  }

  // Funktion, mit der sich ein Mentor für ein Event "anmelden" (Opt In) kann.
  function optInAsMentor(eventId: number) {
    coachingEvents.update(events =>
      events.map(evt =>
        // Falls die Event-ID übereinstimmt und noch kein Mentor zugewiesen ist,
        // wird der Vorname des aktuell angemeldeten Benutzers als Mentor gesetzt.
        evt.id === eventId && !evt.mentorName
          ? { ...evt, mentorName: user.firstName }
          : evt
      )
    );
    // Zeige eine Bestätigungsmeldung an.
    alert(`You have opted in as a mentor for this event.`);
  }

  // Funktion zum Hinzufügen eines neuen Events.
  function addEvent() {
    // Erstelle ein neues Event-Objekt mit Beispiel-Daten.
    const newEvent: CoachingEvent = {
      // Die ID wird hier als Zeitstempel generiert.
      id: Date.now(),
      // Beispiel-Datum und -Zeit
      date: '2025-04-01',
      time: '10:00',
      // Beispiel-Firmenname
      company: 'New Company',
      // Beispiel-Adresse
      address: '456 Example Rd',
      // Numerische Säulenangabe
      saeule: 2,
      // Beschreibung der Säule
      saeuleDesc: 'Säule 2: Example',
      // Es ist noch kein Mentor zugewiesen, daher leerer String.
      mentorName: '',
      // Setzt den Coach-Namen, wenn der Benutzer die Rolle "coach" innehat.
      coachName: user.role === 'coach' ? user.firstName : ''
    };
    // Aktualisiere den coachingEvents-Store, indem das neue Event angehängt wird.
    coachingEvents.update(evts => [...evts, newEvent]);
  }

  // Funktion zum Löschen eines Events anhand seiner ID.
  function deleteEvent(id: number) {
    // Filtere alle Events, deren ID nicht der übergebenen entspricht.
    coachingEvents.update(evts => evts.filter(e => e.id !== id));
  }

  // Funktion, um den Bearbeitungsmodus (Edit Mode) eines Events umzuschalten.
  function toggleEditMode(id: number) {
    coachingEvents.update(evts =>
      evts.map(e => (e.id === id ? { ...e, editing: !e.editing } : e))
    );
  }

  // Funktion zum Speichern von Änderungen eines Events.
  // Hier wird lediglich der Bearbeitungsmodus beendet.
  function saveEvent(id: number) {
    coachingEvents.update(evts =>
      evts.map(e => (e.id === id ? { ...e, editing: false } : e))
    );
  }

  // Reaktive Anweisungen, die anhand der Benutzerrolle festlegen, ob bestimmte
  // Aktionen (z. B. Opt In, Edit, Delete) angezeigt werden.
  $: isMentor = user.role === 'mentor';
  $: isCoach = user.role === 'coach' || user.role === 'admin';

  // Definiere ein Array der Plugins für den Kalender. Hier wird ausschließlich das TimeGrid Plugin verwendet.
  let plugins = [timeGridPlugin, interactionPlugin];

  // Erstelle ein reaktives Options-Objekt für den Kalender.
  // Dieses Objekt wird neu berechnet, wenn sich "calendarEvents" ändert.
  $: options = {
    view: 'timeGridWeek',
    events: calendarEvents
  };
</script>

<!-- Button zum Umschalten zwischen Tabellen- und Kalenderansicht -->
<Switch 
bind:value={switchValue} 
label={switchValue === 'on' ? 'Kalender' : 'Events'} 
design="slider"
fontSize={12}
/>

<!--table view-->
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

<!--calendar view-->
{:else}
  <!-- Kalenderansicht: Zeige den Kalender mit den definierten Plugins und Optionen -->
  <FullCalendar
  plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
  events={calendarEvents}
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek'
  }}
/>

  <!-- Hinweis: Die Kalenderansicht wird durch die FullCalendar-Komponente dargestellt. -->
{/if}
