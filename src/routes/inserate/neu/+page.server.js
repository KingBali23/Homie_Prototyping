import { redirect, fail } from '@sveltejs/kit';
import { getInserateCollection } from '$lib/server/db.js';
import { validateInserat } from '$lib/validation.js';

export const actions = {
	default: async ({ request }) => {
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
		await collection.insertOne({
			...data,
			createdAt: new Date()
		});

		throw redirect(303, '/inserate?created=1');
	}
};
