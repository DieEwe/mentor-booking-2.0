/**
 * Datei: src/lib/stores.ts
 *
 * Diese Datei definiert Svelte Stores, in denen die Coaching Events und der aktuell
 * angemeldete Benutzer gespeichert sind. Die Stores verwenden zu Beginn Mock-Daten,
 * die später durch echte Daten (z. B. aus einer Datenbank) ersetzt werden können.
 */

import { writable } from 'svelte/store';
// Importiere die Typdefinitionen für CoachingEvent und User
import type { CoachingEvent, User } from '$lib/data';
// Importiere die in data.ts definierten Mock-Daten
import { mockEvents, mockUsers } from '$lib/data';

/**
 * Svelte Store für Coaching Events.
 * Alle Events werden hier als Array gespeichert. Zu Beginn werden die Mock-Daten verwendet.
 */
export const coachingEvents = writable<CoachingEvent[]>(mockEvents);

/**
 * Svelte Store für den aktuell angemeldeten Benutzer.
 * Standardmäßig wird hier der Mock-Benutzer verwendet.
 */
export const currentUser = writable<User>(mockUsers[3]);

/**
 * Funktion zum Aktualisieren eines Events.
 * Nur Benutzer mit den Rollen "admin" oder "coach" dürfen Events bearbeiten.
 *
 * @param eventId - Die ID des Events, das aktualisiert werden soll.
 * @param newData - Ein Objekt mit den zu ändernden Eigenschaften des Events.
 * @param user - Der aktuell angemeldete Benutzer.
 */
export function updateEvent(eventId: number, newData: Partial<CoachingEvent>, user: User) {
  if (user.role === 'admin' || user.role === 'coach') {
    coachingEvents.update(events => {
      return events.map(event =>
        event.id === eventId ? { ...event, ...newData } : event
      );
    });
  } else {
    throw new Error('Unauthorized'); 
    // or return a { success: false, reason: 'Unauthorized' } 
  }
}


/**
 * Funktion, um einen Benutzer anzumelden.
 * Setzt den currentUser Store auf den übergebenen Benutzer.
 *
 * @param user - Der Benutzer, mit dem man sich anmelden möchte.
 */
export function loginAs(user: User) {
  currentUser.set(user);
}

/**
 * Funktion, um den aktuellen Benutzer abzumelden.
 * Setzt den currentUser Store auf einen Gast-Benutzer.
 */
export function logout() {
    // Erstelle einen einfachen Gast-Benutzer und annotiere ihn explizit als User,
  // damit TypeScript den exakten Literaltyp für die Eigenschaft "role" erkennt.
  const guestUser: User = {
    id: 999,
    firstName: 'Guest',
    lastName: '',
    email: '',
    role: 'guest',
    canShowFullName: false,
    hasVisibleDisability: false,
    hasInvisibleDisability: false,
    isDisabilityVisibleOnProfile: false
  };
  currentUser.set(guestUser);
}
