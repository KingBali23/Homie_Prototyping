<script>
	import InseratCard from '$lib/components/InseratCard.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	let search = data.filters.search;
	let maxPrice = data.filters.maxPrice ?? '';

	function applyFilters() {
		const params = new URLSearchParams();
		if (search) params.set('q', search);
		if (maxPrice) params.set('maxPrice', String(maxPrice));
		const qs = params.toString();
		goto(qs ? `/inserate?${qs}` : '/inserate', { keepFocus: true });
	}

	function resetFilters() {
		search = '';
		maxPrice = '';
		goto('/inserate');
	}

	$: hasFilters = Boolean(search || maxPrice);

	// Success/Error toast aus URL
	$: created = $page.url.searchParams.get('created');
	$: deleted = $page.url.searchParams.get('deleted');
	$: updated = $page.url.searchParams.get('updated');
</script>

<svelte:head>
	<title>Inserate – Homie</title>
</svelte:head>

<section class="section">
	<div class="container">
		<div class="page-head">
			<div>
				<h1>WG-Zimmer</h1>
				<p class="muted">
					{data.inserate.length}
					{data.inserate.length === 1 ? 'Inserat gefunden' : 'Inserate gefunden'}
				</p>
			</div>
			<a href="/inserate/neu" class="btn">+ Neues Inserat</a>
		</div>

		{#if created}
			<div class="alert alert-success">✅ Inserat erfolgreich erstellt.</div>
		{/if}
		{#if updated}
			<div class="alert alert-success">✅ Inserat erfolgreich aktualisiert.</div>
		{/if}
		{#if deleted}
			<div class="alert alert-success">🗑️ Inserat erfolgreich gelöscht.</div>
		{/if}
		{#if data.error}
			<div class="alert alert-error">{data.error}</div>
		{/if}

		<div class="filter-bar card">
			<div class="filter-fields">
				<div class="filter-group">
					<label for="search">Suche</label>
					<input
						id="search"
						type="search"
						placeholder="Titel, Ort oder Beschreibung"
						bind:value={search}
						on:keydown={(e) => e.key === 'Enter' && applyFilters()}
					/>
				</div>
				<div class="filter-group">
					<label for="maxPrice">Max. Preis (CHF)</label>
					<input
						id="maxPrice"
						type="number"
						min="0"
						step="50"
						placeholder="z. B. 800"
						bind:value={maxPrice}
						on:keydown={(e) => e.key === 'Enter' && applyFilters()}
					/>
				</div>
			</div>
			<div class="filter-actions">
				<button type="button" class="btn" on:click={applyFilters}>Filtern</button>
				{#if hasFilters}
					<button type="button" class="btn btn-secondary" on:click={resetFilters}>
						Zurücksetzen
					</button>
				{/if}
			</div>
		</div>

		{#if data.inserate.length === 0}
			<div class="empty-state card">
				<h2>Keine Inserate gefunden</h2>
				<p class="muted">
					{#if hasFilters}
						Passe deine Filter an oder setze sie zurück.
					{:else}
						Sei der/die Erste und veröffentliche ein Inserat.
					{/if}
				</p>
				{#if !hasFilters}
					<a href="/inserate/neu" class="btn">Inserat erstellen</a>
				{/if}
			</div>
		{:else}
			<div class="grid">
				{#each data.inserate as inserat (inserat._id)}
					<InseratCard {inserat} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.page-head {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.page-head h1 {
		margin: 0;
	}

	.filter-bar {
		padding: 1.1rem 1.25rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: end;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.filter-fields {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
		flex: 1;
		min-width: 280px;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.filter-group label {
		font-size: 0.82rem;
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.filter-group input {
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		font-family: inherit;
		font-size: 0.92rem;
	}

	.filter-group input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px var(--color-accent-soft);
	}

	.filter-actions {
		display: flex;
		gap: 0.5rem;
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

	.empty-state h2 {
		margin: 0;
	}

	@media (max-width: 600px) {
		.filter-fields {
			grid-template-columns: 1fr;
		}
		.filter-actions {
			width: 100%;
		}
		.filter-actions :global(.btn) {
			flex: 1;
		}
	}
</style>
