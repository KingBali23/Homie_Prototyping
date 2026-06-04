# Projektdokumentation - Homie

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

## 1. Ausgangslage

Viele Studierende und junge Erwachsene haben Mühe, ein passendes WG-Zimmer zu finden. Bestehende Plattformen wie Flatfox, Homegate oder ImmoScout decken den Wohnungsmarkt breit ab, sind aber nicht spezifisch auf die WG-Suche ausgerichtet. Für Suchende ist entscheidend, ob die WG zur eigenen Lebenssituation passt – diese sozialen Informationen fehlen häufig oder sind über verschiedene Kanäle verstreut. Zudem ist die Kontaktaufnahme oft umständlich.

- **Problem:** Die WG-Suche ist unübersichtlich und repetitiv. Relevante Informationen (Art der WG, Mitbewohnende, Preis, Lage) sind schlecht auffindbar, und die Kontaktaufnahme ist mühsam.
- **Ziele:** Suchende sollen passende Zimmer schnell finden, zentrale Informationen auf einen Blick sehen und unkompliziert Kontakt aufnehmen können – ohne unnötig komplexen Prozess.
- **Primäre Zielgruppe:** Studierende und junge Erwachsene, die ein WG-Zimmer suchen und eine einfache, übersichtliche und schnelle Lösung bevorzugen.
- **Weitere Stakeholder:** Inserierende Personen (bestehende WGs), die unkompliziert ein freies Zimmer veröffentlichen möchten.

**How Might We:**
- Wie könnten wir WG-Suchenden helfen, schneller passende Zimmer zu finden?
- Wie könnten wir die wichtigsten Informationen zu einer WG übersichtlich darstellen?
- Wie könnten wir die Kontaktaufnahme zwischen Suchenden und Inserierenden möglichst einfach gestalten?

## 2. Lösungsidee

Homie ist eine einfache Webplattform für die WG-Zimmersuche. Im Zentrum steht ein klarer Kern-Workflow statt einer überladenen Marktplattform.

- **Kernfunktionalität:**
  - **Inserate ansehen:** WG-Zimmer werden in einer übersichtlichen Liste mit Such- und Filterfunktion dargestellt.
  - **Detailseite öffnen:** Zu jedem Inserat gibt es eine Detailansicht mit den wichtigsten Informationen (Bild, Titel, Preis, Ort, Grösse, Beschreibung, Ausstattung, Kategorien).
  - **Kontakt aufnehmen:** Über einen klar sichtbaren E-Mail-Button wird mit vorausgefülltem Betreff direkt das Mailprogramm geöffnet.
  - **Eigene Inserate verwalten:** Inserate können erstellt, bearbeitet und gelöscht werden (CRUD).
  - **Profil & Matching (Erweiterung):** Nutzer:innen legen ein Profil an (suchend/inserierend, Kategorien, Wunschort, Budget) und erhalten direkt passende WG-Vorschläge. Siehe [Kapitel 4](#4-erweiterungen-optional).
- **Annahmen:** Eine reduzierte, fokussierte Darstellung der wirklich relevanten Informationen wird von der Zielgruppe gegenüber breiten Immobilienplattformen bevorzugt.
- **Abgrenzung:** Bewusst nicht im Fokus der ersten Version: Login/Authentifizierung, interner Live-Chat, Bild-Upload (stattdessen Bild-URL), komplexes ML-basiertes Matching und umfangreiche Automatisierungen.

## 3. Vorgehen & Artefakte

Die Durchführung erfolgte phasenbasiert entlang des im Unterricht eingeführten Vorgehens (Understand & Define → Sketch → Decide → Prototype → Validate).

### 3.1 Understand & Define

- **Zielgruppenverständnis:** Problemraum im Bereich Alltag / Wohnen / Digitalisierung. Recherche zu bestehenden Plattformen (Flatfox, Homegate, ImmoScout) zeigte, dass diese den Wohnungsmarkt generell abdecken, aber nicht WG-spezifisch sind. Definierte Zielgruppe: Studierende und junge Erwachsene auf WG-Suche.
- **Wesentliche Erkenntnisse:**
  - Für Suchende zählt weniger die reine Verfügbarkeit als die Frage, ob die WG zur eigenen Lebenssituation passt.
  - Wichtige soziale Informationen (Mitbewohnende, Atmosphäre) fehlen bei bestehenden Lösungen häufig.
  - Die Kontaktaufnahme ist oft umständlich und über mehrere Kanäle verteilt.
  - Daraus ergibt sich die Chance für einen klaren, reduzierten Prototyp mit engem Fokus.

### 3.2 Sketch

- **Variantenüberblick:** Mit der Methode Crazy 8s wurden mehrere Varianten für das zentrale Feature **Kontaktaufnahme auf der Detailseite** skizziert. Im Fokus standen Klarheit, Struktur und ein einfacher Happy Path.
- **Skizzen:** Untersucht wurden u. a. eine Variante mit interner Nachrichtenfunktion und eine Variante mit klarer Kontaktkarte und direktem E-Mail-Button. Die Varianten unterschieden sich vor allem in Umfang und Komplexität der Kontaktaufnahme.

> _Platzhalter: Foto/Scan der Crazy-8s-Skizzen einfügen (z. B. `docs/sketches/crazy8s.png`)._

### 3.3 Decide

- **Gewählte Variante & Begründung:** Entschieden wurde die Lösung mit **klarer Kontaktkarte und direktem E-Mail-Button**. Entscheidkriterien: Verständlichkeit, Umsetzbarkeit im Projektrahmen und Passung zum reduzierten Scope. Ein interner Chat wäre möglich, würde den Prototyp aber unnötig vergrössern; die direkte Kontaktaufnahme per E-Mail ist einfacher und für eine erste Version ausreichend.
- **End-to-End-Ablauf (User Journey):**
  - Workflow 1: Startseite → Inserate → Detailseite
  - Workflow 2: Startseite → Inserate → Detailseite → Kontaktaufnahme (E-Mail)
  - Workflow 3: Inserate → Detailseite → Kontaktaufnahme → zurück zum Inserat
  - Ergänzend (Erweiterung): Startseite → Profil erstellen → passende Vorschläge → Detailseite → Kontakt
- **Mockup:** Figma-Prototyp (Desktop): https://www.figma.com/design/tpNPJeBZFT6CoN2CyhQP1d/Homie
  - Entscheid für ein Desktop-Mockup, da sich die Inhalte übersichtlich darstellen lassen.
  - Konsistente Navigation auf allen Seiten.
  - Bewusst einfaches visuelles Design, damit Struktur und Interaktionen im Vordergrund stehen.
  - Homepage erklärt den Zweck und führt mit klarem Call-to-Action zur Inserate-Übersicht.

> _Platzhalter: Screenshots der wichtigsten Figma-Screens einfügen (Startseite, Übersicht, Detailseite)._

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.

- **Informationsarchitektur:** Flache, gut auffindbare Struktur mit durchgängiger Navigation (Start, Inserate, Profil, Inserat erstellen).
  - `/` – Startseite mit Einstieg und Erklärung
  - `/inserate` – Übersicht mit Suche und Preisfilter
  - `/inserate/[id]` – Detailseite eines Inserats
  - `/inserate/neu` – Inserat erstellen
  - `/inserate/[id]/bearbeiten` – Inserat bearbeiten
  - `/profil`, `/profil/neu`, `/profil/[id]`, `/profil/[id]/bearbeiten` – Profil & Matching
- **User Interface Design:** Reduzierte, ruhige Oberfläche mit warmer Farbpalette (Off-White-Hintergrund, Terrakotta-Akzent), Karten-Layout für Inserate, gut sichtbarer E-Mail-Button auf der Detailseite und klaren Statusmeldungen (Erfolg/Fehler).

> _Platzhalter: Screenshots der fertigen App einfügen, je mit kurzer Beschreibung – empfohlen: Startseite, Inserate-Übersicht, Detailseite mit Kontaktkarte, Formular „Inserat erstellen", Profilseite mit Vorschlägen._

- **Designentscheidungen:**
  - Karten zeigen Preis und Ort direkt, damit Suchende sich schnell orientieren können.
  - Kontaktaufnahme per E-Mail mit vorausgefülltem Betreff statt internem Chat (siehe 3.3).
  - Durchgängige, konsistente Navigation und einheitliche Komponenten (Buttons, Formulare, Karten).
  - Serverseitige Validierung mit verständlichen Fehlermeldungen direkt an den Feldern.

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:** SvelteKit (Svelte 5), MongoDB (Atlas) über den offiziellen `mongodb`-Treiber, Deployment via `@sveltejs/adapter-netlify`. Eigenes CSS-Design-System (keine UI-Bibliothek), Web-Fonts (Inter, Fraunces).
- **Tooling:** Visual Studio Code, Git/GitHub, MongoDB Atlas, Netlify, Figma (Mockup). Der KI-Einsatz wird im [Kapitel 6](#6-ki-deklaration) beschrieben.
- **Struktur & Komponenten:**
  - **Routen:** `+page.svelte`/`+page.server.js` je Seite; dynamische Route `[id]`; `+layout.svelte` für Header/Footer; `+error.svelte` für 404.
  - **Komponenten:** `Header`, `Footer`, `InseratCard`, `ContactCard`, `InseratForm`, `ProfileForm`, `CategoryPicker`.
  - **Bibliotheksmodule:** `lib/server/db.js` (DB-Anbindung), `lib/validation.js` und `lib/profileValidation.js` (Validierung), `lib/categories.js` (gemeinsame Kategorien), `lib/matching.js` (Matching-Logik).
- **Daten & Schnittstellen:**
  - MongoDB-Datenbank `homie` mit zwei Collections: `inserate` und `profile`.
  - **Lesen:** `load()`-Funktionen in `+page.server.js` lesen Daten (z. B. `find()`, `findOne()`).
  - **Schreiben:** SvelteKit Form Actions (`?/create`, `?/delete`, Default-Action) schreiben über `insertOne`, `updateOne`, `deleteOne`.
  - **Validierung:** serverseitig vor jedem Schreibvorgang; bei Fehlern werden Eingaben und Feldfehler zurückgegeben.
  - **Datenmodell Inserat:** `title`, `description`, `location`, `price`, `size`, `contactName`, `contactEmail`, `imageUrl`, `availableFrom`, `features[]`, `categories[]`, `createdAt`.
  - **Datenmodell Profil:** `name`, `email`, `role` (suchend/inserierend), `categories[]`, `preferredLocation`, `maxPrice`, `bio`, `createdAt`.
- **Deployment:** Netlify, mit `MONGODB_URI` als Environment-Variable. URL: **https://pthomie.netlify.app/**

> _Platzhalter: Falls die Live-URL abweicht, hier ersetzen._

- **Besondere Entscheidungen / Trade-offs:** Verzicht auf Login (Prototyp-Scope); Bild-URL statt Upload; bewusst keine UI-Bibliothek, sondern ein schlankes eigenes Design-System für volle Kontrolle und Konsistenz.

### 3.5 Validate

- **URL der getesteten Version:** https://pthomie.netlify.app/ (Prototyp v0.2)
- **Ziele der Prüfung:**
  - Findet die Testperson den Hauptworkflow (Zimmer suchen → Detail ansehen → Kontakt aufnehmen) ohne Hilfe?
  - Versteht die Testperson, wie ein eigenes Zimmer veröffentlicht wird?
  - Sind Navigation, Bezeichnungen und Rückmeldungen verständlich?
  - Wird die reduzierte, fokussierte Darstellung als hilfreich empfunden?
- **Vorgehen:** Moderierter, szenario-basierter Usability-Test mit Think-Aloud. Eine Testleitung stellt die Aufgaben (schriftlich vorgelegt), beobachtet und protokolliert (Feedback-Grid, Issue-Map), greift möglichst wenig ein; Diskussion am Schluss. Durchführung on-site auf einem Laptop (Chrome).
- **Stichprobe:** 2 Testpersonen aus der Zielgruppe (Studierende der ZHAW):
  - **0001 – Kerim Altintas:** 24 J., Wirtschaftsinformatik (4. Sem.), wohnt seit 2 Jahren in einer 3er-WG, erfahrener Nutzer (Flatfox).
  - **0002 – Ahmed Kashif:** 21 J., Betriebsökonomie (2. Sem.), wohnt noch bei den Eltern, plant WG-Umzug, weniger Plattform-Erfahrung.
- **Aufgaben/Szenarien:**
  1. **Ein passendes Zimmer finden:** Als Studentin/Student in Winterthur mit Budget ~700 CHF einen Überblick verschaffen und ein passendes Zimmer finden.
  2. **Mit einer WG in Kontakt treten:** Die zuständige Person eines gefundenen Zimmers für einen Besichtigungstermin erreichen.
  3. **Ein freies Zimmer bekannt machen:** Ein frei werdendes Zimmer auf der Plattform veröffentlichen.
- **Kennzahlen & Beobachtungen:**

  | Szenario | TP 0001 | Zeit 0001 | TP 0002 | Zeit 0002 |
  | --- | --- | --- | --- | --- |
  | 1 – Zimmer finden | ohne Hilfe | ~50 Sek. | ohne Hilfe | ~1 Min. |
  | 2 – Kontakt aufnehmen | ohne Hilfe | ~25 Sek. | ohne Hilfe | ~30 Sek. |
  | 3 – Zimmer veröffentlichen | ohne Hilfe | ~2 Min. | mit Hilfe | ~3 Min. |

  Selbsteinschätzung (Skala −2 bis +2): „einfach zu bedienen" 0001 +1 / 0002 0; „Informationen übersichtlich" +2 / +1; „nützlich für die WG-Suche" +1 / +2; „würde ich selbst verwenden" +1 / +1.

  **Positive Beobachtungen:** übersichtliche Karten, Preis sofort sichtbar, schneller Einstieg über die Startseite, vorausgefüllter E-Mail-Betreff, schlanke und klare Oberfläche.

  **Identifizierte Usability-Probleme (mit Schweregrad 0–4):**

  | # | Problem | Ort | Schweregrad | Beobachtet bei |
  | --- | --- | --- | --- | --- |
  | I1 | Format des Ausstattungsfelds unklar (Freitext, Komma-Trennung) – mit „und" getrennt bzw. leer gelassen | Inserat erstellen | 3 – gross | 0001, 0002 |
  | I2 | Einstieg zum Inserat-Erstellen nicht sofort gefunden (zuerst auf Übersicht gesucht) | Navigation / Übersicht | 2–3 | 0001, 0002 |
  | I3 | Fehlermeldung bei zu kurzer Beschreibung übersehen (Formular erneut abgeschickt) | Inserat erstellen | 2–3 | 0001, 0002 |
  | I4 | Unklar, ob Filter/Preisfeld automatisch greift oder Klick/Enter nötig ist | Inserate-Übersicht | 2 | 0001, 0002 |
  | I5 | Öffnen eines externen Mailprogramms kam unerwartet (Nachricht auf der Seite erwartet) | Detailseite / Kontakt | 1–2 | 0001, 0002 |

- **Zusammenfassung der Resultate:** Der Hauptworkflow (suchen → Detail → Kontakt) funktioniert sehr gut – beide Testpersonen lösten ihn ohne Hilfe und schnell. Die Oberfläche wird als klar und aufgeräumt wahrgenommen. Schwierigkeiten konzentrieren sich auf den Workflow „Inserat erstellen", insbesondere auf das Ausstattungsfeld, die Auffindbarkeit des Einstiegs und die Sichtbarkeit der Fehlermeldung.
- **Abgeleitete Verbesserungen (priorisiert):**
  1. **Ausstattungsfeld klarer gestalten** (I1, hoch): Auswahl-/Tag-basierte Eingabe oder deutlich erklärendes Beispiel statt reinem Freitext.
  2. **Einstieg „Inserat erstellen" prominenter machen** (I2, hoch): auffälligerer Call-to-Action, auch direkt in der Übersicht.
  3. **Fehlermeldungen deutlicher anzeigen** (I3, mittel): hervorgehobene Meldung, automatisches Scrollen zum Fehler, klare Feldmarkierung.
  4. **Filterverhalten verständlicher machen** (I4, mittel): Live-Filterung oder klarer Hinweis, dass „Filtern" geklickt werden muss.
  5. **Kontakt-Hinweis ergänzen** (I5, niedrig): am E-Mail-Button verdeutlichen, dass eine E-Mail vorbereitet (nicht sofort gesendet) wird.

  Weitere Wünsche der Testpersonen (über den Mindestumfang hinaus): Fotos der Zimmer, Merkliste/Favoriten, Sortierung nach Preis, Kartenansicht der Lage, Filter nach Anzahl Mitbewohnender.

## 4. Erweiterungen [Optional]

### 4.1 Profil & Matching (passende WG-Vorschläge)

- **Beschreibung & Nutzen:** Nutzer:innen legen ein Profil an und geben an, ob sie suchend oder inserierend sind, welche Kategorien zu ihnen passen (z. B. Student:innen, International, Gemeinschaftlich, Ruhig & entspannt, Berufstätige, Senioren) sowie optional Wunschort und Budget. Auf dieser Basis erhalten sie direkt passende WG-Vorschläge – sortiert nach Übereinstimmung der Kategorien, Wunschort und Budget. Das adressiert das Kernbedürfnis aus der Problemanalyse, schneller passende statt beliebige Zimmer zu finden. Gefallen die Vorschläge nicht, führt ein Button „Alle Inserate anzeigen" zur vollständigen Übersicht.
- **Wo umgesetzt:**
  - **Frontend:** Profil-Seiten (`src/routes/profil/`), Komponenten `ProfileForm.svelte` und `CategoryPicker.svelte`; Match-Badges auf `InseratCard.svelte`; Kategorien im `InseratForm.svelte` und auf der Detailseite.
  - **Backend:** Form Actions in `src/routes/profil/neu/+page.server.js`, `src/routes/profil/[id]/+page.server.js` (Matching im `load`) und `.../bearbeiten/+page.server.js`; Matching-Logik in `src/lib/matching.js`; Validierung in `src/lib/profileValidation.js`.
  - **Datenbank:** Neue Collection `profile` in MongoDB (CRUD über `getProfileCollection()` in `src/lib/server/db.js`). Inserate erhalten ein zusätzliches Feld `categories` als Grundlage für das Matching.
- **Referenz:** Beschreibung in Kap. 2 und 3.4; Screenshot der Profilseite mit Vorschlägen (siehe Platzhalter in 3.4.1).
- **Aus Evaluation abgeleitet?:** Nein – produktseitige Erweiterung über den Mindestumfang hinaus. Die für das Matching eingeführte Kategorien-Auswahl schafft zugleich die Grundlage, das in der Evaluation identifizierte Problem I1 (Freitext-Eingabe) künftig auch beim Ausstattungsfeld strukturiert zu lösen.

### 4.2 Weitere Erweiterungen im Mindestumfang-Bereich

- **Beschreibung & Nutzen:** Über das reine Erstellen hinaus wurden Bearbeiten und Löschen von Inseraten, eine Such- und Preisfilterfunktion, Statusmeldungen (Erfolg/Fehler) und eine eigene Fehlerseite umgesetzt – für einen vollständigen, stabilen CRUD-Workflow und gute Bedienbarkeit.
- **Wo umgesetzt:** `src/routes/inserate/` (Übersicht, `neu`, `[id]`, `[id]/bearbeiten`), `+error.svelte`.
- **Referenz:** Kap. 3.4.
- **Aus Evaluation abgeleitet?:** Nein.

## 5. Projektorganisation [Optional]

- **Repository & Struktur:** Git/GitHub. Quellcode unter `src/` (Routen unter `src/routes/`, wiederverwendbare Komponenten und Module unter `src/lib/`), Beispiel-Daten unter `scripts/seed.js`, Konfiguration im Projekt-Root (`svelte.config.js`, `netlify.toml`, `package.json`).
- **Repository-URL:** _[GitHub-URL eintragen]_
- **Commit-Praxis:** sprechende Commits je abgeschlossener Funktion/Anpassung.

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools:** Claude (Anthropic, Modell Claude Opus) als KI-Assistent in einem Chat-Interface.
- **Zweck & Umfang:** KI wurde eingesetzt für Codevorschläge und -gerüste (SvelteKit-Routen, Komponenten, MongoDB-Anbindung, Validierung, Matching-Logik), für die Umsetzung der Erweiterung „Profil & Matching", zum Beheben von Einrichtungsproblemen (z. B. lokale Umgebungsvariablen) sowie für Entwürfe und die Strukturierung dieser Dokumentation entlang der vorgegebenen README-Vorlage. Teile des Codes und der Dokumentationstexte sind ganz oder teilweise mit KI-Unterstützung entstanden.
- **Eigene Leistung (Abgrenzung):** Idee, Problem- und Zielgruppenanalyse, Crazy-8s-Skizzen, Designentscheide und das Figma-Mockup stammen aus eigener Arbeit in den Übungen. Die Usability-Tests (Planung, Durchführung, Protokolle, Auswertung) wurden eigenständig durchgeführt. Der KI-generierte Code und die Texte wurden geprüft, angepasst, lokal getestet und in das bestehende Projekt integriert; die Verantwortung für Korrektheit und Urheberrecht liegt bei der/dem Studierenden.

### 6.2 Prompt-Vorgehen

Das Prompting erfolgte iterativ und kontextbasiert: Zunächst wurden Idee, Anforderungen und der bestehende Projektstand bereitgestellt, anschliessend wurden einzelne Funktionen schrittweise beschrieben und umgesetzt. Rückmeldungen (Fehlermeldungen, gewünschte Anpassungen) wurden zurückgespielt und gezielt verfeinert. Beispielhafter Prompt: die Beschreibung der gewünschten Profil-/Matching-Funktion inklusive Kategorien und „Alle Inserate anzeigen"-Button. Auf Korrektheit und konsistenten Code-Stil wurde geachtet; Quellen/Assets siehe Anhang.

### 6.3 Reflexion

KI war besonders nützlich für ein schnelles, konsistentes Code-Gerüst und die strukturierte Dokumentation. Grenzen zeigten sich dort, wo umgebungsspezifische Schritte (MongoDB-Atlas-Einrichtung, lokale `.env`, Deployment) nur durch eigenes Handeln gelöst werden konnten. Zur Qualitätssicherung wurde der generierte Code lokal gebaut und getestet sowie inhaltlich überprüft, bevor er übernommen wurde.

## 7. Anhang [Optional]

- **Quellen:** Platzhalterbilder von Unsplash (Inserate ohne eigene Bild-URL); Web-Fonts „Inter" und „Fraunces" via Google Fonts.
- **Testmaterialien:** Interviewprotokolle der Usability-Tests (Testpersonen 0001 und 0002) inkl. Szenarien, Feedback-Grid und Issue-Map (`Homie_Usability-Test_Protokoll_0001.docx`, `Homie_Usability-Test_Protokoll_0002.docx`).
- **Mockup:** Figma-Prototyp – https://www.figma.com/design/tpNPJeBZFT6CoN2CyhQP1d/Homie

### Setup / Lokale Entwicklung

Voraussetzungen: Node.js 18+ und ein MongoDB-Atlas-Account.

```bash
npm install
# .env im Projekt-Root anlegen:
# MONGODB_URI=mongodb+srv://USER:PASSWORT@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
npm run seed   # optional: Beispiel-Inserate einspielen
npm run dev
```

Deployment auf Netlify: Repository verbinden, Build-Command `npm run build`, Publish-Verzeichnis `build` (über `netlify.toml` erkannt), und die Environment-Variable `MONGODB_URI` hinterlegen.
