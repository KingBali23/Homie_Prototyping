import { getProfileCollection } from '$lib/server/db.js';

export async function load() {
	try {
		const collection = await getProfileCollection();
		const docs = await collection.find({}).sort({ createdAt: -1 }).limit(12).toArray();

		const profile = docs.map((doc) => ({
			_id: doc._id.toString(),
			name: doc.name,
			role: doc.role,
			categories: Array.isArray(doc.categories) ? doc.categories : []
		}));

		return { profile };
	} catch (err) {
		console.error('Fehler beim Laden der Profile:', err);
		return { profile: [], error: 'Profile konnten nicht geladen werden.' };
	}
}
