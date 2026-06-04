<script>
	import { page } from '$app/stores';
	import { categoryIcon, categoryLabel } from '$lib/categories.js';

	export let data;

	$: deleted = $page.url.searchParams.get('deleted');
</script>

<svelte:head>
	<title>Profil & Matching – Homie</title>
</svelte:head>

<section class="section">
	<div class="container">
		<div class="intro card">
			<div class="intro-text">
				<p class="eyebrow">Finde schneller, was passt</p>
				<h1>Erstelle dein Profil – wir zeigen dir passende WGs</h1>
				<p class="muted">
					Sag uns, ob du suchst oder inserierst, und was zu dir passt. Auf Basis deiner
					Kategorien, deines Wunschorts und deines Budgets schlagen wir dir passende WG-Zimmer
					vor. Kein Login nötig – im Prototyp wird dein Profil direkt gespeichert.
				</p>
				<a href="/profil/neu" class="btn btn-large">Profil erstellen</a>
			</div>
		</div>

		{#if deleted}
			<div class="alert alert-success">🗑️ Profil erfolgreich gelöscht.</div>
		{/if}
		{#if data.error}
			<div class="alert alert-error">{data.error}</div>
		{/if}

		{#if data.profile.length > 0}
			<h2 class="list-title">Bestehende Profile</h2>
			<p class="muted">Im Prototyp findest du dein Profil hier wieder.</p>
			<div class="profile-grid">
				{#each data.profile as p (p._id)}
					<a class="profile-card card" href={`/profil/${p._id}`}>
						<div class="profile-head">
							<span class="avatar" aria-hidden="true">{p.name ? p.name.charAt(0).toUpperCase() : '👤'}</span>
							<div>
								<p class="profile-name">{p.name}</p>
								<span class="role-tag">{p.role === 'inserierend' ? '🏠 Inserierend' : '🔍 Auf Suche'}</span>
							</div>
						</div>
						{#if p.categories.length > 0}
							<ul class="mini-chips">
								{#each p.categories.slice(0, 4) as cat}
									<li>{categoryIcon(cat)} {categoryLabel(cat)}</li>
								{/each}
							</ul>
						{/if}
						<span class="link-cta">Vorschläge ansehen →</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.intro {
		padding: 2.5rem;
		margin-bottom: 2.5rem;
		background: linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-surface) 100%);
	}

	.intro-text {
		max-width: 620px;
	}

	.eyebrow {
		display: inline-block;
		background: var(--color-accent-soft);
		color: var(--color-accent);
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0.3rem 0.75rem;
		border-radius: 999px;
		margin: 0 0 1rem;
	}

	.intro h1 {
		margin-bottom: 0.75rem;
	}

	.intro .btn {
		margin-top: 1rem;
	}

	.list-title {
		margin-bottom: 0.25rem;
	}

	.profile-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1.25rem;
		margin-top: 1.25rem;
	}

	.profile-card {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		text-decoration: none;
		color: inherit;
		transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
	}

	.profile-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
		border-color: color-mix(in srgb, var(--color-accent) 30%, var(--color-border));
		text-decoration: none;
	}

	.profile-head {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.avatar {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--color-accent-soft);
		color: var(--color-accent);
		display: grid;
		place-items: center;
		font-weight: 600;
		font-family: var(--font-serif);
		font-size: 1.1rem;
	}

	.profile-name {
		margin: 0;
		font-weight: 600;
	}

	.role-tag {
		font-size: 0.82rem;
		color: var(--color-text-muted);
	}

	.mini-chips {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.mini-chips li {
		background: var(--color-surface-alt);
		border: 1px solid var(--color-border);
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		font-size: 0.8rem;
	}

	.link-cta {
		margin-top: auto;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-accent);
	}
</style>
