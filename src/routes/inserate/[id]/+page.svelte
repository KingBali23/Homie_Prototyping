<script>
	import ContactCard from '$lib/components/ContactCard.svelte';
	import { page } from '$app/stores';
	import { categoryLabel, categoryIcon } from '$lib/categories.js';

	export let data;

	$: i = data.inserat;
	$: features = Array.isArray(i.features) ? i.features : [];
	$: categories = Array.isArray(i.categories) ? i.categories : [];
	$: updated = $page.url.searchParams.get('updated');

	const fallbackImage =
		'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=75';

	function confirmDelete(event) {
		if (!confirm('Inserat wirklich löschen? Das kann nicht rückgängig gemacht werden.')) {
			event.preventDefault();
		}
	}
</script>

<svelte:head>
	<title>{i.title} – Homie</title>
</svelte:head>

<section class="section">
	<div class="container">
		<a href="/inserate" class="back-link">← Zurück zur Übersicht</a>

		{#if updated}
			<div class="alert alert-success">✅ Inserat erfolgreich aktualisiert.</div>
		{/if}

		<div class="detail-grid">
			<div class="main">
				<div class="image-hero">
					<img src={i.imageUrl || fallbackImage} alt={i.title} />
				</div>

				<header class="title-block">
					<h1>{i.title}</h1>
					<div class="key-facts">
						<span class="price">CHF {i.price} / Monat</span>
						<span>📍 {i.location}</span>
						<span>📐 {i.size} m²</span>
						{#if i.availableFrom}
							<span>📅 ab {new Date(i.availableFrom).toLocaleDateString('de-CH')}</span>
						{/if}
					</div>
				</header>

				<section class="block">
					<h2>Beschreibung</h2>
					<p class="description">{i.description}</p>
				</section>

				{#if categories.length > 0}
					<section class="block">
						<h2>Passt zu</h2>
						<ul class="category-chips">
							{#each categories as cat}
								<li>{categoryIcon(cat)} {categoryLabel(cat)}</li>
							{/each}
						</ul>
					</section>
				{/if}

				{#if features.length > 0}
					<section class="block">
						<h2>Ausstattung</h2>
						<ul class="features">
							{#each features as feature}
								<li>✓ {feature}</li>
							{/each}
						</ul>
					</section>
				{/if}

				<section class="block edit-actions">
					<h2>Inserat verwalten</h2>
					<p class="muted">Im Prototyp können Inserate ohne Login bearbeitet oder gelöscht werden.</p>
					<div class="action-row">
						<a href={`/inserate/${i._id}/bearbeiten`} class="btn btn-secondary">
							✏️ Bearbeiten
						</a>
						<form method="POST" action="?/delete" on:submit={confirmDelete}>
							<button type="submit" class="btn btn-danger">🗑️ Löschen</button>
						</form>
					</div>
				</section>
			</div>

			<div class="sidebar">
				<ContactCard
					contactName={i.contactName}
					contactEmail={i.contactEmail}
					title={i.title}
				/>
			</div>
		</div>
	</div>
</section>

<style>
	.back-link {
		display: inline-block;
		margin-bottom: 1.25rem;
		color: var(--color-text-muted);
		font-size: 0.92rem;
	}

	.back-link:hover {
		color: var(--color-accent);
	}

	.detail-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 320px;
		gap: 2rem;
		align-items: start;
	}

	.image-hero {
		border-radius: var(--radius-lg);
		overflow: hidden;
		aspect-ratio: 16 / 9;
		background: var(--color-surface-alt);
		margin-bottom: 1.5rem;
	}

	.image-hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.title-block h1 {
		margin-bottom: 0.5rem;
	}

	.key-facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		color: var(--color-text-muted);
		font-size: 0.95rem;
		margin-bottom: 2rem;
	}

	.price {
		color: var(--color-accent);
		font-weight: 600;
	}

	.block {
		margin-bottom: 2.25rem;
	}

	.block h2 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.description {
		white-space: pre-wrap;
		line-height: 1.7;
	}

	.features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 0.5rem;
	}

	.features li {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		padding: 0.55rem 0.85rem;
		border-radius: var(--radius-md);
		font-size: 0.92rem;
	}

	.category-chips {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.category-chips li {
		background: var(--color-accent-soft);
		color: var(--color-accent);
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.edit-actions {
		padding: 1.25rem;
		background: var(--color-surface-alt);
		border-radius: var(--radius-lg);
		border: 1px dashed var(--color-border);
	}

	.edit-actions h2 {
		font-size: 1.1rem;
	}

	.action-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: 0.75rem;
	}

	.action-row form {
		margin: 0;
	}

	@media (max-width: 900px) {
		.detail-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
