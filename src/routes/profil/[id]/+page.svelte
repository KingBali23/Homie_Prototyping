<script>
	import InseratCard from '$lib/components/InseratCard.svelte';
	import { page } from '$app/stores';
	import { categoryIcon, categoryLabel } from '$lib/categories.js';

	export let data;

	$: p = data.profile;
	$: created = $page.url.searchParams.get('created');
	$: updated = $page.url.searchParams.get('updated');
	$: isInserierend = p.role === 'inserierend';

	function confirmDelete(event) {
		if (!confirm('Profil wirklich löschen? Das kann nicht rückgängig gemacht werden.')) {
			event.preventDefault();
		}
	}

	function badgeFor(overlap) {
		if (!overlap || overlap.length === 0) return '';
		if (overlap.length === 1) return '1 Match';
		return `${overlap.length} Matches`;
	}
</script>

<svelte:head>
	<title>{p.name} – Profil & Vorschläge – Homie</title>
</svelte:head>

<section class="section">
	<div class="container">
		<a href="/profil" class="back-link">← Alle Profile</a>

		{#if created}
			<div class="alert alert-success">✅ Profil erstellt. Hier sind deine passenden WGs.</div>
		{/if}
		{#if updated}
			<div class="alert alert-success">✅ Profil aktualisiert.</div>
		{/if}

		<div class="profile-summary card">
			<div class="summary-main">
				<span class="avatar" aria-hidden="true">{p.name ? p.name.charAt(0).toUpperCase() : '👤'}</span>
				<div>
					<h1>{p.name}</h1>
					<p class="role">{isInserierend ? '🏠 Inserierend' : '🔍 Auf Zimmersuche'}</p>
				</div>
			</div>

			<div class="summary-meta">
				{#if p.preferredLocation}<span>📍 Wunschort: {p.preferredLocation}</span>{/if}
				{#if p.maxPrice}<span>💰 Budget: bis CHF {p.maxPrice}</span>{/if}
			</div>

			{#if p.categories.length > 0}
				<ul class="category-chips">
					{#each p.categories as cat}
						<li>{categoryIcon(cat)} {categoryLabel(cat)}</li>
					{/each}
				</ul>
			{/if}

			{#if p.bio}
				<p class="bio">{p.bio}</p>
			{/if}

			<div class="profile-actions">
				<a href={`/profil/${p._id}/bearbeiten`} class="btn btn-secondary">✏️ Bearbeiten</a>
				<form method="POST" action="?/delete" on:submit={confirmDelete}>
					<button type="submit" class="btn btn-danger">🗑️ Löschen</button>
				</form>
			</div>
		</div>

		<div class="matches-head">
			<div>
				<h2>{isInserierend ? 'Ähnliche WGs zu deinem Profil' : 'Diese WGs passen zu dir'}</h2>
				<p class="muted">
					{#if data.hasRealMatches}
						Basierend auf deinen Kategorien{p.preferredLocation ? ', deinem Wunschort' : ''}{p.maxPrice ? ' und deinem Budget' : ''}.
					{:else}
						Noch keine starken Übereinstimmungen – hier sind aktuelle Inserate für dich.
					{/if}
				</p>
			</div>
			<a href="/inserate" class="btn btn-secondary">Alle Inserate anzeigen</a>
		</div>

		{#if isInserierend}
			<div class="inserier-hint card">
				<p>Du bietest selbst ein Zimmer an? Veröffentliche es, damit Suchende dich finden.</p>
				<a href="/inserate/neu" class="btn">+ Eigenes Inserat erstellen</a>
			</div>
		{/if}

		{#if data.suggestions.length === 0}
			<div class="empty-state card">
				<h3>Noch keine Inserate vorhanden</h3>
				<p class="muted">Sobald WG-Zimmer inseriert werden, erscheinen sie hier.</p>
				<a href="/inserate/neu" class="btn">Erstes Inserat erstellen</a>
			</div>
		{:else}
			<div class="grid">
				{#each data.suggestions as s (s.inserat._id)}
					<InseratCard inserat={s.inserat} badge={badgeFor(s.overlap)} />
				{/each}
			</div>
		{/if}
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

	.profile-summary {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2.5rem;
	}

	.summary-main {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.summary-main h1 {
		margin: 0;
		font-size: 1.8rem;
	}

	.role {
		margin: 0.2rem 0 0;
		color: var(--color-text-muted);
	}

	.avatar {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: var(--color-accent-soft);
		color: var(--color-accent);
		display: grid;
		place-items: center;
		font-weight: 600;
		font-family: var(--font-serif);
		font-size: 1.6rem;
		flex-shrink: 0;
	}

	.summary-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		color: var(--color-text-muted);
		font-size: 0.95rem;
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

	.bio {
		margin: 0;
		line-height: 1.7;
		white-space: pre-wrap;
	}

	.profile-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		padding-top: 0.25rem;
	}

	.profile-actions form {
		margin: 0;
	}

	.matches-head {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
	}

	.matches-head h2 {
		margin: 0 0 0.25rem;
	}

	.matches-head p {
		margin: 0;
	}

	.inserier-hint {
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1.75rem;
		background: var(--color-surface-alt);
	}

	.inserier-hint p {
		margin: 0;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.25rem;
	}

	.empty-state {
		padding: 3rem 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.empty-state h3 {
		margin: 0;
	}

	@media (max-width: 600px) {
		.profile-actions :global(.btn) {
			flex: 1;
		}
	}
</style>
