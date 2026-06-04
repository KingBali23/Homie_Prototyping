import { error, redirect, fail } from '@sveltejs/kit';
import { getProfileCollection, getInserateCollection, ObjectId } from '$lib/server/db.js';
import { findMatches } from '$lib/matching.js';

export async function load({ params }) {
	let objectId;
	try {
		objectId = new ObjectId(params.id);
	} catch {
		throw error(404, 'Profil nicht gefunden');
	}

	const profileCollection = await getProfileCollection();
	const doc = await profileCollection.findOne({ _id: objectId });

	if (!doc) {
		throw error(404, 'Profil nicht gefunden');
	}

	const profile = {
		...doc,
		_id: doc._id.toString(),
		createdAt: doc.createdAt?.toISOString() ?? null,
		categories: Array.isArray(doc.categories) ? doc.categories : []
	};

	const inserateCollection = await getInserateCollection();
	const inserateDocs = await inserateCollection.find({}).sort({ createdAt: -1 }).toArray();
	const inserate = inserateDocs.map((d) => ({
		...d,
		_id: d._id.toString(),
		createdAt: d.createdAt?.toISOString() ?? null,
		categories: Array.isArray(d.categories) ? d.categories : []
	}));

	const { suggestions, hasRealMatches } = findMatches(profile, inserate, 6);

	return {
		profile,
		suggestions: suggestions.map((s) => ({
			inserat: s.inserat,
			overlap: s.match.overlap,
			score: s.match.score
		})),
		hasRealMatches,
		totalInserate: inserate.length
	};
}

export const actions = {
	delete: async ({ params }) => {
		let objectId;
		try {
			objectId = new ObjectId(params.id);
		} catch {
			return fail(400, { message: 'Ungültige ID' });
		}

		const collection = await getProfileCollection();
		const result = await collection.deleteOne({ _id: objectId });

		if (result.deletedCount === 0) {
			return fail(404, { message: 'Profil nicht gefunden' });
		}

		throw redirect(303, '/profil?deleted=1');
	}
};
