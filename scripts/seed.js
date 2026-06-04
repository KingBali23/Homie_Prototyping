// Seed-Script: füllt die Datenbank mit Beispiel-Inseraten.
// Ausführen mit: node scripts/seed.js
// (Voraussetzung: .env mit MONGODB_URI im Projekt-Root.)

import { MongoClient } from 'mongodb';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// .env minimal selber laden, ohne Extra-Dependency
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
	const envText = readFileSync(join(__dirname, '..', '.env'), 'utf8');
	for (const line of envText.split('\n')) {
		const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
		if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
	}
} catch {
	// .env optional
}

const uri = process.env.MONGODB_URI;
if (!uri) {
	console.error('❌ MONGODB_URI fehlt. Bitte in .env eintragen.');
	process.exit(1);
}

const inserate = [
	{
		title: 'Helles Zimmer in 3er-WG',
		description:
			'Wir suchen eine entspannte Person für unsere gemütliche 3er-WG mitten in Winterthur. Das Zimmer hat eine grosse Fensterfront, ist hell und ruhig. Wir kochen gerne zusammen, sind aber auch alle berufstätig bzw. im Studium und haben unseren eigenen Rhythmus.',
		price: 650,
		size: 15,
		location: 'Winterthur',
		imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=75',
		availableFrom: '2026-01-01',
		features: ['WLAN', 'Balkon', 'Waschmaschine', 'möbliert'],
		categories: ['student', 'gemeinschaft'],
		contactName: 'Peter Meier',
		contactEmail: 'peter.meier@example.com',
		createdAt: new Date()
	},
	{
		title: 'Sonniges WG-Zimmer mit Aussicht',
		description:
			'Im Herzen von Zürich-Wiedikon wartet ein helles 14 m² Zimmer in einer freundlichen 4er-WG. Grosse Wohnküche, gemütliches Wohnzimmer und ein kleiner Garten. Wir sind alle zwischen 22 und 28, studieren oder arbeiten und haben gerne mal Filmabende.',
		price: 780,
		size: 14,
		location: 'Zürich',
		imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=75',
		availableFrom: '2026-02-01',
		features: ['WLAN', 'Garten', 'Waschmaschine', 'Geschirrspüler'],
		categories: ['student', 'gemeinschaft', 'international'],
		contactName: 'Susanne B.',
		contactEmail: 'susanne.b@example.com',
		createdAt: new Date()
	},
	{
		title: 'Ruhiges Zimmer nahe Hauptbahnhof',
		description:
			'Schönes ruhiges Zimmer in einer 2er-WG, nur 5 Minuten zu Fuss vom Hauptbahnhof. Ideal für Studierende. Mitbewohnerin ist 24, Studentin, lieb und unkompliziert. Die Wohnung ist hell, modern eingerichtet und sehr gut gelegen.',
		price: 720,
		size: 13,
		location: 'Winterthur',
		imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=75',
		availableFrom: '2026-03-01',
		features: ['WLAN', 'möbliert', 'Lift', 'Kellerabteil'],
		categories: ['student', 'ruhig'],
		contactName: 'Lena K.',
		contactEmail: 'lena.k@example.com',
		createdAt: new Date()
	},
	{
		title: 'Grosses Zimmer in Altbau-WG',
		description:
			'Charmanter Altbau, Stuckdecken, Parkett. Wir suchen eine kreative Person für unsere 4er-WG. Wir kochen oft zusammen, gehen ab und zu klettern und haben einen kleinen Schrebergarten in der Nähe. Das Zimmer ist 18 m², hat zwei Fenster und ist sehr hell.',
		price: 850,
		size: 18,
		location: 'Bern',
		imageUrl: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=75',
		availableFrom: '2026-02-15',
		features: ['WLAN', 'Altbau', 'Waschmaschine', 'Veloraum'],
		categories: ['gemeinschaft', 'berufstaetig'],
		contactName: 'Tobias R.',
		contactEmail: 'tobias.r@example.com',
		createdAt: new Date()
	},
	{
		title: 'Modernes Zimmer in Neubau-WG',
		description:
			'Im 4. Stock eines Neubaus, mit Lift und kleinem Balkon. Die WG besteht aus drei Personen Mitte 20, alle berufstätig. Die Küche ist modern ausgestattet und das Zimmer ist möbliert (Bett, Schreibtisch, Kleiderschrank).',
		price: 690,
		size: 12,
		location: 'St. Gallen',
		imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=75',
		availableFrom: '2026-01-15',
		features: ['WLAN', 'Balkon', 'Lift', 'möbliert', 'Geschirrspüler'],
		categories: ['berufstaetig', 'ruhig'],
		contactName: 'Marco S.',
		contactEmail: 'marco.s@example.com',
		createdAt: new Date()
	},
	{
		title: 'Gemütliches Zimmer in Studi-WG',
		description:
			'Wir sind eine bunte 5er-WG (ZHAW & ETH) und suchen eine entspannte Person, die gerne mal mitkocht oder einen Filmabend macht. Das Zimmer ist 11 m², gut geschnitten und mit Bett, Schreibtisch und Kleiderschrank ausgestattet.',
		price: 580,
		size: 11,
		location: 'Winterthur',
		imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=75',
		availableFrom: '2026-04-01',
		features: ['WLAN', 'Waschmaschine', 'möbliert', 'Veloraum'],
		categories: ['student', 'international', 'gemeinschaft'],
		contactName: 'Nora F.',
		contactEmail: 'nora.f@example.com',
		createdAt: new Date()
	}
];

const client = new MongoClient(uri);

try {
	await client.connect();
	console.log('✅ Verbunden mit MongoDB');

	const db = client.db('homie');
	const collection = db.collection('inserate');

	const existing = await collection.countDocuments();
	if (existing > 0) {
		const arg = process.argv[2];
		if (arg !== '--force') {
			console.log(`⚠️  Es sind bereits ${existing} Inserate vorhanden.`);
			console.log('   Mit `node scripts/seed.js --force` löschst und seedest du erneut.');
			process.exit(0);
		}
		console.log('🗑️  Lösche bestehende Inserate (--force)...');
		await collection.deleteMany({});
	}

	const result = await collection.insertMany(inserate);
	console.log(`✅ ${result.insertedCount} Inserate angelegt.`);
} catch (err) {
	console.error('❌ Fehler:', err);
	process.exit(1);
} finally {
	await client.close();
}
