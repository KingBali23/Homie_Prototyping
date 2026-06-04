import { getInserateCollection } from '$lib/server/db.js';

export async function load() {
	try {
		const collection = await getInserateCollection();
		const count = await collection.countDocuments();
		return { count };
	} catch (err) {
		console.error('Fehler beim Laden der Inserate-Anzahl:', err);
		return { count: 0 };
	}
}
