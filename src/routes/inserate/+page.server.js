import { getInserateCollection } from '$lib/server/db.js';

export async function load({ url }) {
	const search = url.searchParams.get('q')?.trim().toLowerCase() ?? '';
	const maxPrice = Number(url.searchParams.get('maxPrice')) || null;

	try {
		const collection = await getInserateCollection();
		const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();

		const inserate = docs
			.map((doc) => ({
				...doc,
				_id: doc._id.toString(),
				createdAt: doc.createdAt?.toISOString() ?? null
			}))
			.filter((i) => {
				if (search) {
					const haystack = `${i.title} ${i.location} ${i.description}`.toLowerCase();
					if (!haystack.includes(search)) return false;
				}
				if (maxPrice && i.price > maxPrice) return false;
				return true;
			});

		return {
			inserate,
			filters: { search, maxPrice }
		};
	} catch (err) {
		console.error('Fehler beim Laden der Inserate:', err);
		return {
			inserate: [],
			filters: { search, maxPrice },
			error: 'Inserate konnten nicht geladen werden.'
		};
	}
}
