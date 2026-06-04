import { redirect, fail } from '@sveltejs/kit';
import { getProfileCollection } from '$lib/server/db.js';
import { validateProfile } from '$lib/profileValidation.js';

export const actions = {
	default: async ({ request }) => {
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
		const result = await collection.insertOne({
			...data,
			createdAt: new Date()
		});

		throw redirect(303, `/profil/${result.insertedId.toString()}?created=1`);
	}
};
