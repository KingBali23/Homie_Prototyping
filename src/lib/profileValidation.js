import { isValidCategory } from '$lib/categories.js';

export function validateProfile(fields) {
	/** @type {Record<string, string>} */
	const errors = {};

	const name = String(fields.name ?? '').trim();
	const email = String(fields.email ?? '').trim();
	const role = String(fields.role ?? '').trim();
	const preferredLocation = String(fields.preferredLocation ?? '').trim();
	const bio = String(fields.bio ?? '').trim();
	const maxPriceRaw = String(fields.maxPrice ?? '').trim();

	const categories = Array.isArray(fields.categories)
		? fields.categories.map((c) => String(c)).filter(isValidCategory)
		: fields.categories
			? [String(fields.categories)].filter(isValidCategory)
			: [];

	if (!name) errors.name = 'Bitte gib deinen Namen an.';
	else if (name.length < 2) errors.name = 'Mindestens 2 Zeichen.';
	else if (name.length > 60) errors.name = 'Maximal 60 Zeichen.';

	if (!email) {
		errors.email = 'Bitte E-Mail-Adresse angeben.';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = 'Bitte gültige E-Mail-Adresse eingeben.';
	}

	if (role !== 'suchend' && role !== 'inserierend') {
		errors.role = 'Bitte wähle eine Rolle.';
	}

	if (categories.length === 0) {
		errors.categories = 'Bitte wähle mindestens eine Kategorie.';
	}

	let maxPrice = null;
	if (maxPriceRaw) {
		const n = Number(maxPriceRaw);
		if (!Number.isFinite(n) || n < 0) errors.maxPrice = 'Bitte gültigen Betrag eingeben.';
		else if (n > 10000) errors.maxPrice = 'Bitte realistischen Betrag eingeben.';
		else maxPrice = n;
	}

	if (bio.length > 500) errors.bio = 'Maximal 500 Zeichen.';

	const data = {
		name,
		email,
		role,
		categories,
		preferredLocation,
		maxPrice,
		bio
	};

	return {
		data,
		errors: Object.keys(errors).length ? errors : null
	};
}
