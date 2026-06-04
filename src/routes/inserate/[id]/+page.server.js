import { error, redirect, fail } from '@sveltejs/kit';
import { getInserateCollection, ObjectId } from '$lib/server/db.js';

export async function load({ params }) {
	let objectId;
	try {
		objectId = new ObjectId(params.id);
	} catch {
		throw error(404, 'Inserat nicht gefunden');
	}

	const collection = await getInserateCollection();
	const doc = await collection.findOne({ _id: objectId });

	if (!doc) {
		throw error(404, 'Inserat nicht gefunden');
	}

	return {
		inserat: {
			...doc,
			_id: doc._id.toString(),
			createdAt: doc.createdAt?.toISOString() ?? null
		}
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

		const collection = await getInserateCollection();
		const result = await collection.deleteOne({ _id: objectId });

		if (result.deletedCount === 0) {
			return fail(404, { message: 'Inserat nicht gefunden' });
		}

		throw redirect(303, '/inserate?deleted=1');
	}
};
