import { error, redirect, fail } from '@sveltejs/kit';
import { getInserateCollection, ObjectId } from '$lib/server/db.js';
import { validateInserat } from '$lib/validation.js';

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
	default: async ({ request, params }) => {
		let objectId;
		try {
			objectId = new ObjectId(params.id);
		} catch {
			return fail(400, { message: 'Ungültige ID' });
		}

		const form = await request.formData();
		const fields = Object.fromEntries(form.entries());
		fields.categories = form.getAll('categories');
		const { data, errors } = validateInserat(fields);

		if (errors) {
			return fail(400, {
				errors,
				values: fields
			});
		}

		const collection = await getInserateCollection();
		const result = await collection.updateOne(
			{ _id: objectId },
			{
				$set: {
					...data,
					updatedAt: new Date()
				}
			}
		);

		if (result.matchedCount === 0) {
			return fail(404, { message: 'Inserat nicht gefunden' });
		}

		throw redirect(303, `/inserate/${params.id}?updated=1`);
	}
};
