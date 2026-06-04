export function scoreInserat(profile, inserat) {
	const profileCats = Array.isArray(profile.categories) ? profile.categories : [];
	const inseratCats = Array.isArray(inserat.categories) ? inserat.categories : [];

	const overlap = inseratCats.filter((c) => profileCats.includes(c));

	let score = overlap.length * 10;

	if (profile.preferredLocation && inserat.location) {
		const a = profile.preferredLocation.trim().toLowerCase();
		const b = inserat.location.trim().toLowerCase();
		if (a && (b.includes(a) || a.includes(b))) {
			score += 6;
		}
	}

	if (profile.maxPrice && typeof inserat.price === 'number' && inserat.price <= profile.maxPrice) {
		score += 4;
	}

	return { score, overlap };
}

export function findMatches(profile, inserate, limit = 6) {
	const maxPrice = profile.maxPrice || null;

	const ranked = inserate
		.filter((i) => !(maxPrice && typeof i.price === 'number' && i.price > maxPrice))
		.map((i) => ({ inserat: i, match: scoreInserat(profile, i) }))
		.sort((a, b) => {
			if (b.match.score !== a.match.score) return b.match.score - a.match.score;
			const da = a.inserat.createdAt ? new Date(a.inserat.createdAt).getTime() : 0;
			const db = b.inserat.createdAt ? new Date(b.inserat.createdAt).getTime() : 0;
			return db - da;
		});

	const withScore = ranked.filter((r) => r.match.score > 0).slice(0, limit);
	const suggestions = withScore.length > 0 ? withScore : ranked.slice(0, limit);

	return {
		suggestions,
		hasRealMatches: withScore.length > 0
	};
}
