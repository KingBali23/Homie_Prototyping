/**
 * Validiert die Felder eines Inserats.
 * @param {Record<string, FormDataEntryValue | null>} fields
 * @returns {{ data: any, errors: Record<string, string> | null }}
 */
export function validateInserat(fields) {
	/** @type {Record<string, string>} */
	const errors = {};

	const title = String(fields.title ?? '').trim();
	const description = String(fields.description ?? '').trim();
	const location = String(fields.location ?? '').trim();
	const contactName = String(fields.contactName ?? '').trim();
	const contactEmail = String(fields.contactEmail ?? '').trim();
	const imageUrl = String(fields.imageUrl ?? '').trim();
	const availableFrom = String(fields.availableFrom ?? '').trim();

	const priceRaw = String(fields.price ?? '').trim();
	const sizeRaw = String(fields.size ?? '').trim();

	if (!title) errors.title = 'Bitte gib einen Titel an.';
	else if (title.length < 5) errors.title = 'Mindestens 5 Zeichen.';
	else if (title.length > 100) errors.title = 'Maximal 100 Zeichen.';

	if (!description) errors.description = 'Bitte gib eine Beschreibung an.';
	else if (description.length < 20) errors.description = 'Mindestens 20 Zeichen.';
	else if (description.length > 1000) errors.description = 'Maximal 1000 Zeichen.';

	if (!location) errors.location = 'Bitte gib einen Ort an.';

	const price = Number(priceRaw);
	if (!priceRaw) errors.price = 'Bitte Preis angeben.';
	else if (!Number.isFinite(price) || price < 0) errors.price = 'Bitte gültigen Preis eingeben.';
	else if (price > 10000) errors.price = 'Bitte realistischen Preis eingeben.';

	const size = Number(sizeRaw);
	if (!sizeRaw) errors.size = 'Bitte Grösse angeben.';
	else if (!Number.isFinite(size) || size < 1) errors.size = 'Bitte gültige Grösse eingeben.';
	else if (size > 200) errors.size = 'Bitte realistische Grösse eingeben.';

	if (!contactName) errors.contactName = 'Bitte gib deinen Namen an.';

	if (!contactEmail) {
		errors.contactEmail = 'Bitte E-Mail-Adresse angeben.';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
		errors.contactEmail = 'Bitte gültige E-Mail-Adresse eingeben.';
	}

	if (imageUrl) {
		try {
			new URL(imageUrl);
		} catch {
			errors.imageUrl = 'Bitte gültige URL eingeben.';
		}
	}

	const featuresRaw = String(fields.features ?? '').trim();
	const features = featuresRaw
		? featuresRaw
				.split(',')
				.map((f) => f.trim())
				.filter(Boolean)
		: [];

	const categories = Array.isArray(fields.categories)
		? fields.categories.map((c) => String(c)).filter(Boolean)
		: fields.categories
			? [String(fields.categories)]
			: [];

	const data = {
		title,
		description,
		location,
		price,
		size,
		contactName,
		contactEmail,
		imageUrl,
		availableFrom,
		features,
		categories
	};

	return {
		data,
		errors: Object.keys(errors).length ? errors : null
	};
}
