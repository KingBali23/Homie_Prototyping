# Homie

> Webplattform für die WG-Zimmersuche – Prototyp im Modul **Prototyping** (ZHAW)

Homie ist eine einfache Webplattform, auf der Suchende WG-Inserate durchsuchen, im Detail
ansehen und direkt per E-Mail mit der inserierenden Person Kontakt aufnehmen können.
Zusätzlich können eigene Inserate erstellt, bearbeitet und gelöscht werden.

Über ein **Profil** geben Nutzer:innen an, ob sie suchen oder inserieren, und wählen
Kategorien (z. B. Student:innen, International, Gemeinschaftlich). Auf dieser Basis schlägt
Homie direkt **passende WG-Zimmer** vor (Matching nach Kategorien, Wunschort und Budget).
Wer lieber selbst stöbert, gelangt mit einem Klick zur kompletten Inserate-Übersicht.

## 🛠️ Tech-Stack

- **Frontend / Backend**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Datenbank**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Free Tier)
- **Deployment**: [Netlify](https://www.netlify.com/) mit `@sveltejs/adapter-netlify`
- **Versionskontrolle**: Git / GitHub

## 📁 Projektstruktur

```
homie/
├── src/
│   ├── lib/
│   │   ├── components/        # Wiederverwendbare Komponenten
│   │   │   ├── Header.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── InseratCard.svelte
│   │   │   ├── ContactCard.svelte
│   │   │   ├── InseratForm.svelte
│   │   │   ├── ProfileForm.svelte
│   │   │   └── CategoryPicker.svelte
│   │   ├── server/
│   │   │   └── db.js          # MongoDB-Anbindung (inserate + profile)
│   │   ├── categories.js      # Gemeinsame Kategorien
│   │   ├── matching.js        # Matching-Logik Profil ↔ Inserate
│   │   ├── validation.js      # Validierung Inserate
│   │   └── profileValidation.js  # Validierung Profile
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte       # Startseite
│   │   ├── +page.server.js
│   │   ├── +error.svelte
│   │   ├── inserate/
│   │   │   ├── +page.svelte         # Übersicht
│   │   │   ├── +page.server.js
│   │   │   ├── neu/                 # Neues Inserat
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.server.js
│   │   │   └── [id]/                # Detailseite
│   │   │       ├── +page.svelte
│   │   │       ├── +page.server.js
│   │   │       └── bearbeiten/      # Bearbeiten
│   │   │           ├── +page.svelte
│   │   │           └── +page.server.js
│   │   └── profil/
│   │       ├── +page.svelte         # Profil-Übersicht
│   │       ├── +page.server.js
│   │       ├── neu/                 # Profil erstellen
│   │       │   ├── +page.svelte
│   │       │   └── +page.server.js
│   │       └── [id]/                # Profil + Matching
│   │           ├── +page.svelte
│   │           ├── +page.server.js
│   │           └── bearbeiten/      # Profil bearbeiten
│   │               ├── +page.svelte
│   │               └── +page.server.js
│   ├── app.html
│   └── app.css
├── scripts/
│   └── seed.js                # Beispiel-Daten einspielen
├── static/
│   └── favicon.svg
├── netlify.toml
├── svelte.config.js
├── vite.config.js
└── package.json
```

## 🚀 Workflows

| Workflow | Ablauf |
| --- | --- |
| **Hauptworkflow** | Startseite → Inserate → Detailseite → Kontakt (E-Mail) |
| **Inserat erstellen** | Navigation → „Inserat erstellen" → Formular → Übersicht |
| **Inserat bearbeiten** | Detailseite → „Bearbeiten" → Formular → Detailseite |
| **Inserat löschen** | Detailseite → „Löschen" → Bestätigung → Übersicht |

## ⚙️ Lokale Entwicklung

### Voraussetzungen

- Node.js 18+ (empfohlen: 20)
- npm
- Ein MongoDB-Atlas-Account (kostenloser Tier reicht)

### 1. Repository klonen & Dependencies installieren

```bash
git clone <your-repo-url>
cd homie
npm install
```

### 2. MongoDB Atlas vorbereiten

1. Auf [mongodb.com/atlas](https://www.mongodb.com/atlas) registrieren
2. Einen **Free Cluster (M0)** anlegen (z.B. in Frankfurt für tiefere Latenz)
3. Unter **Database Access** einen Datenbank-User mit Passwort erstellen
4. Unter **Network Access** `0.0.0.0/0` erlauben (für Netlify nötig)
5. Unter **Connect → Drivers** den Connection String kopieren
   - Format: `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### 3. Environment-Variable setzen

Erstelle eine Datei `.env` im Projekt-Root:

```bash
cp .env.example .env
```

Trage den Connection String ein:

```
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 4. Beispiel-Inserate einspielen (optional)

```bash
npm run seed
```

Das legt 6 Beispiel-Inserate in der Datenbank an.

### 5. Dev-Server starten

```bash
npm run dev
```

Die App läuft jetzt auf [http://localhost:5173](http://localhost:5173).

## ☁️ Deployment auf Netlify

> Das Deployment passiert auf deinem eigenen Netlify-Account – ich kann das nicht für
> dich erledigen, weil ich keinen Zugriff darauf habe. Es dauert aber nur ein paar Minuten.

### Schritt 1: Code zu GitHub pushen

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<dein-user>/homie.git
git push -u origin main
```

> ℹ️ Vor der finalen Abgabe musst du gemäss Aufgabenstellung `mmeisterhans` und
> `bkuehnis` als Collaborators hinzufügen, falls das Repo privat ist.

### Schritt 2: Netlify mit GitHub verbinden

1. Auf [netlify.com](https://www.netlify.com/) anmelden (kostenlos möglich)
2. **„Add new site → Import an existing project"** auswählen
3. **GitHub** verbinden und das `homie`-Repo wählen
4. Build-Settings prüfen – sollten automatisch erkannt werden dank `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `build`
5. **Vor dem Deploy:** unter **„Show advanced → New variable"** die Environment-Variable
   eintragen:
   - Key: `MONGODB_URI`
   - Value: dein MongoDB-Connection-String
6. **„Deploy site"** klicken

Nach ca. 1–2 Minuten ist die Seite unter einer URL wie
`https://<random-name>.netlify.app` erreichbar. Diese URL gibst du auf Moodle ab.

### Schritt 3: (optional) Seed-Daten in die Cloud-DB

Lokal mit derselben `MONGODB_URI` ausführen:

```bash
npm run seed
```

## 📋 Erfüllte Anforderungen (Übung 11)

### Mindestumfang

- ✅ Klar definierter Hauptworkflow (Inserat finden → Detail → Kontakt)
- ✅ Übersichtsseite mit Daten aus MongoDB (`/inserate`)
- ✅ Seite zum Erfassen von Daten (`/inserate/neu`)
- ✅ Seite zum Bearbeiten von Daten (`/inserate/[id]/bearbeiten`)
- ✅ SvelteKit mit eigenen Komponenten (`Header`, `Footer`, `InseratCard`, `ContactCard`, `InseratForm`)
- ✅ MongoDB-Persistenz (Create, Read, Update, Delete)
- ✅ Git/GitHub-fähig (`.gitignore`, sauberes Repo)
- ✅ Netlify-Deployment-ready (`netlify.toml`, Netlify-Adapter)

### Umgesetzte Erweiterungen

- ✅ Mehrere Workflows: Erstellen, Bearbeiten, Löschen
- ✅ Komplexe Validierung (Server-seitig + Client-Hinweise)
- ✅ Filter und Suche auf der Übersichtsseite
- ✅ Status-Feedback (Success-Toasts für Create/Update/Delete, Error-Alerts)
- ✅ Responsive Design (Desktop-first, mobil bedienbar)
- ✅ Custom Error-Page für 404 etc.
- ✅ Saubere Komponenten-Struktur

### Bewusst nicht im Scope (aus Aufgabenstellung)

- Login / Authentifizierung
- Interner Chat
- Komplexes Matching
- Bild-Upload (stattdessen: URL-Feld)

## 🎨 Design

Das Design orientiert sich am Figma-Mockup aus Übung 10. Die UI ist bewusst reduziert
gehalten, damit Struktur und Interaktionen im Vordergrund stehen. Farbpalette:

- Hintergrund: warmes Off-White (`#faf8f4`)
- Akzent: gedämpftes Terrakotta (`#c75a3a`)
- Schriftarten: **Fraunces** (Überschriften) + **Inter** (Fliesstext)

## 📝 Lizenz

Studienprojekt – kein produktiver Einsatz.
