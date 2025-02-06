<script lang="ts">
  // Importiere die Svelte Stores, in denen die Events und der aktuell angemeldete Benutzer gespeichert sind.
  import { coachingEvents, currentUser } from '$lib/stores';
  // Importiere die Typdefinitionen für CoachingEvent und User, damit TypeScript die richtigen Typen kennt.
  import type { CoachingEvent, User } from '$lib/data';
  // Importiere die "get"-Funktion, um initial synchron auf den Wert eines Stores zuzugreifen.
  import { get } from 'svelte/store';

  // Importiere die Kalender-Komponente und das TimeGrid Plugin aus der Event Calendar-Bibliothek.
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  // Importiere die zugehörigen CSS-Dateien der Event Calendar-Bibliothek.
  import '@event-calendar/core/index.css';

  // Lese initial den Wert des coachingEvents-Stores aus und speichere ihn in der lokalen Variable "localEvents".
  // Falls der Store leer ist, wird ein leeres Array verwendet.
  let localEvents: CoachingEvent[] = get(coachingEvents) ?? [];

  // Variable für den aktuell angemeldeten Benutzer.
  let user: User;

  // Variable zur Steuerung, ob die Tabelle oder der Kalender angezeigt wird.
  // Standardmäßig wird hier die Tabellenansicht genutzt.
  let viewMode: 'table' | 'calendar' = 'table'; // Toggle state

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
  let plugins = [TimeGrid];

  // Erstelle ein reaktives Options-Objekt für den Kalender.
  // Dieses Objekt wird neu berechnet, wenn sich "calendarEvents" ändert.
  $: options = {
    view: 'timeGridWeek',
    events: calendarEvents
  };
</script>

<!-- Button zum Umschalten zwischen Tabellen- und Kalenderansicht -->
<button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={toggleView}>
  Toggle to {viewMode === 'table' ? 'Calendar' : 'Table'} View
</button>

{#if viewMode === 'table'}
  <!-- Tabellenansicht: Anzeige aller Coaching Termine -->
  <h2 class="text-2xl font-semibold mb-4">Alle Coaching Termine</h2>
  {#if localEvents.length === 0}
    <!-- Falls keine Events vorhanden sind, wird diese Nachricht angezeigt -->
    <p>No events available.</p>
  {:else}
    <!-- Tabelle mit allen Event-Daten -->
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="px-6 py-3">Date</th>
            <th class="px-6 py-3">Time</th>
            <th class="px-6 py-3">Company</th>
            <th class="px-6 py-3">Address</th>
            <th class="px-6 py-3">Säule</th>
            <th class="px-6 py-3">Mentor</th>
            <th class="px-6 py-3">Coach</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Schleife über alle Events, um für jedes eine Tabellenzeile zu erzeugen -->
          {#each localEvents as evt}
              {#if evt.editing}
                <!-- Bearbeitungsmodus: Zeige Input-Felder -->
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <!-- Datum als Input (Typ "date" sorgt für einen Datepicker) -->
                  <td class="px-6 py-4">
                    <input
                      type="date"
                      class="border p-1"
                      bind:value={evt.date} />
                  </td>
                  <!-- Uhrzeit als Input (Typ "time") -->
                  <td class="px-6 py-4">
                    <input
                      type="time"
                      class="border p-1"
                      bind:value={evt.time} />
                  </td>
                  <!-- Firmenname -->
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      class="border p-1"
                      bind:value={evt.company} />
                  </td>
                  <!-- Adresse -->
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      class="border p-1"
                      bind:value={evt.address} />
                  </td>
                  <!-- Säule und Säulenbeschreibung -->
                  <td class="px-6 py-4">
                    <input
                      type="number"
                      class="border p-1 w-16"
                      bind:value={evt.saeule} />
                    <input
                      type="text"
                      class="border p-1 ml-2"
                      bind:value={evt.saeuleDesc} />
                  </td>
                  <!-- Mentorname (hier als Anzeige, nicht editierbar) -->
                  <td class="px-6 py-4">
                    {evt.mentorName || '—'}
                  </td>
                  <!-- Coachname (ebenfalls als Anzeige) -->
                  <td class="px-6 py-4">
                    {evt.coachName || '—'}
                  </td>
                  <!-- Aktionen: Save und Cancel -->
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
                <!-- Normaler Anzeigemodus -->
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
          {/each}

        </tbody>
      </table>
    </div>
  {/if}
  <!-- Falls der Benutzer Coach oder Admin ist, wird ein Button zum Hinzufügen eines neuen Events angezeigt -->
  {#if isCoach}
    <button
      class="mt-4 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
      on:click={addEvent}
    >
      Add New Event
    </button>
  {/if}
{:else}
  <!-- Kalenderansicht: Zeige den Kalender mit den definierten Plugins und Optionen -->
  <Calendar {plugins} {options} />
{/if}
