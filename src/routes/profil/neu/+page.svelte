<script>
	import ProfileForm from '$lib/components/ProfileForm.svelte';

	export let form;
</script>

<svelte:head>
	<title>Profil erstellen – Homie</title>
</svelte:head>

<section class="section">
	<div class="container narrow">
		<a href="/profil" class="back-link">← Zurück</a>
		<h1>Profil erstellen</h1>
		<p class="muted">
			Auf Basis deiner Angaben erhältst du direkt passende WG-Vorschläge. Pflichtfelder sind mit *
			markiert.
		</p>

		{#if form?.errors}
			<div class="alert alert-error">⚠️ Bitte überprüfe die rot markierten Felder.</div>
		{/if}

		<ProfileForm
			profile={form?.values ?? {}}
			errors={form?.errors ?? null}
			submitLabel="Profil erstellen & Vorschläge ansehen"
			cancelHref="/profil"
		/>
	</div>
</section>

<style>
	.narrow {
		max-width: 760px;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
		color: var(--color-text-muted);
		font-size: 0.92rem;
	}

	.back-link:hover {
		color: var(--color-accent);
	}

	h1 {
		margin-bottom: 0.5rem;
	}
</style>
