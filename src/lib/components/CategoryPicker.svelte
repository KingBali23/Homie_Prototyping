<script>
	import { CATEGORIES } from '$lib/categories.js';

	export let selected = [];
	export let name = 'categories';

	$: selectedSet = new Set(Array.isArray(selected) ? selected : selected ? [selected] : []);
</script>

<div class="category-grid">
	{#each CATEGORIES as cat}
		<label class="category-option">
			<input type="checkbox" {name} value={cat.id} checked={selectedSet.has(cat.id)} />
			<span class="category-icon" aria-hidden="true">{cat.icon}</span>
			<span class="category-label">{cat.label}</span>
		</label>
	{/each}
</div>

<style>
	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 0.6rem;
	}

	.category-option {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.65rem 0.85rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		cursor: pointer;
		font-size: 0.92rem;
		font-weight: 500;
		transition: border-color 120ms ease, background 120ms ease;
	}

	.category-option:hover {
		border-color: color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
	}

	.category-option:has(input:checked) {
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
		color: var(--color-accent);
	}

	.category-option input {
		width: auto;
		margin: 0;
		accent-color: var(--color-accent);
	}

	.category-icon {
		font-size: 1.1rem;
	}
</style>
