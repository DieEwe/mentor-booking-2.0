/**
 * Datei: src/lib/data.ts
 *
 * Diese Datei enthält die Typdefinitionen und Mock-Daten für Coaching Events und Benutzer.
 * Die Daten dienen während der Entwicklung als Platzhalter und können später durch echte Daten,
 * beispielsweise aus einer Datenbank, ersetzt werden.
 */

/**
 * Typdefinition für ein Coaching Event.
 * Beschreibt alle Eigenschaften, die ein Event enthalten soll.
 */
export type CoachingEvent = {
  id: number;             // Eindeutige ID des Events
  date: string;           // Datum im Format "YYYY-MM-DD"
  time: string;           // Uhrzeit im Format "HH:MM" (optional auch "HH:MM:SS")
  company: string;        // Name des Unternehmens oder Veranstalters
  address: string;        // Adresse, an der das Event stattfindet
  saeule: number;         // Numerische Kennzahl, z. B. zur Kategorisierung des Events
  saeuleDesc: string;     // Beschreibung oder Erläuterung der Säule
  mentorName: string;     // Name des zugewiesenen Mentors (leer, falls noch keiner zugewiesen ist)
  coachName: string;      // Name des Coaches, der das Event leitet
  editing?: boolean;      // Flag, das angibt, ob das Event im Bearbeitungsmodus ist (optional)
};

/**
 * Typdefinition für einen Benutzer.
 * Enthält alle relevanten Informationen, die einen Benutzer beschreiben.
 */
export type User = {
  id: number;                        // Eindeutige Benutzer-ID
  firstName: string;                 // Vorname
  lastName: string;                  // Nachname
  email: string;                     // E-Mail-Adresse
  role: 'admin' | 'coach' | 'mentor' | 'guest'; // Benutzerrolle
  canShowFullName: boolean;          // Gibt an, ob der volle Name im Profil angezeigt werden darf
  hasVisibleDisability: boolean;     // Zeigt an, ob eine sichtbare Behinderung vorliegt
  hasInvisibleDisability: boolean;   // Zeigt an, ob eine unsichtbare Behinderung vorliegt
  isDisabilityVisibleOnProfile: boolean; // Bestimmt, ob die Behinderung im Profil sichtbar ist
  description?: string; // Add description property to User type
};

/**
 * Beispiel-Datensatz für einen Benutzer.
 * Diese Daten können während der Entwicklung genutzt und später durch echte Daten ersetzt werden.
 */
// src/lib/data.ts

export const mockUsers: User[] = [
  {
    id: 2,
    firstName: 'MentorJohn',
    lastName: 'Doe',
    email: 'mentorjohn@example.com',
    role: 'mentor',
    canShowFullName: false,
    hasVisibleDisability: false,
    hasInvisibleDisability: false,
    isDisabilityVisibleOnProfile: false
  },
  {
    id: 3,
    firstName: 'CoachEmma',
    lastName: 'Smith',
    email: 'coachemma@example.com',
    role: 'coach',
    canShowFullName: false,
    hasVisibleDisability: false,
    hasInvisibleDisability: false,
    isDisabilityVisibleOnProfile: false
  },
  {
    id: 4,
    firstName: 'AdminLuke',
    lastName: 'Sky',
    email: 'adminluke@example.com',
    role: 'admin',
    canShowFullName: false,
    hasVisibleDisability: false,
    hasInvisibleDisability: false,
    isDisabilityVisibleOnProfile: false
  },
  {
    id: 999,
    firstName: 'Guest',
    lastName: '',
    email: '',
    role: 'guest',
    canShowFullName: false,
    hasVisibleDisability: false,
    hasInvisibleDisability: false,
    isDisabilityVisibleOnProfile: false
  }
];


/**
 * Beispiel-Datensätze für Coaching Events.
 * Diese Mock-Daten dienen als Platzhalter und können in Zukunft durch Daten aus einer Datenbank ersetzt werden.
 */
export const mockEvents: CoachingEvent[] = [
  {
    id: 1,
    date: '2025-04-01',
    time: '10:00',
    company: 'Tech Corp',
    address: '123 Tech Street',
    saeule: 2,
    saeuleDesc: 'Säule 2: Innovation',
    mentorName: '',
    coachName: 'John Doe',
    editing: false
  },
  {
    id: 2,
    date: '2025-04-02',
    time: '14:00',
    company: 'Business Inc.',
    address: '456 Business Blvd',
    saeule: 1,
    saeuleDesc: 'Säule 1: Business',
    mentorName: 'Jane Mentor',
    coachName: 'Alice Coach',
    editing: false
  }
];
