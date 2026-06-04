import { error, redirect, fail } from '@sveltejs/kit';
import { getProfileCollection, ObjectId } from '$lib/server/db.js';
import { validateProfile } from '$lib/profileValidation.js';

export async function load({ params }) {
	let objectId;
	try {
		objectId = new ObjectId(params.id);
	} catch {
		throw error(404, 'Profil nicht gefunden');
	}

	const collection = await getProfileCollection();
	const doc = await collection.findOne({ _id: objectId });

	if (!doc) {
		throw error(404, 'Profil nicht gefunden');
	}

	return {
		profile: {
			...doc,
			_id: doc._id.toString(),
			createdAt: doc.createdAt?.toISOString() ?? null,
			categories: Array.isArray(doc.categories) ? doc.categories : []
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
		const { data, errors } = validateProfile(fields);

		if (errors) {
			return fail(400, {
				errors,
				values: fields
			});
		}

		const collection = await getProfileCollection();
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
			return fail(404, { message: 'Profil nicht gefunden' });
		}

		throw redirect(303, `/profil/${params.id}?updated=1`);
	}
};
