export const CATEGORIES = [
	{ id: 'student', label: 'Student:innen', icon: '🎓' },
	{ id: 'berufstaetig', label: 'Berufstätige', icon: '💼' },
	{ id: 'international', label: 'International', icon: '🌍' },
	{ id: 'gemeinschaft', label: 'Gemeinschaftlich', icon: '🤝' },
	{ id: 'ruhig', label: 'Ruhig & entspannt', icon: '🌿' },
	{ id: 'senioren', label: 'Senioren', icon: '🧓' }
];

const byId = new Map(CATEGORIES.map((c) => [c.id, c]));

export function categoryLabel(id) {
	return byId.get(id)?.label ?? id;
}

export function categoryIcon(id) {
	return byId.get(id)?.icon ?? '';
}

export function isValidCategory(id) {
	return byId.has(id);
}
