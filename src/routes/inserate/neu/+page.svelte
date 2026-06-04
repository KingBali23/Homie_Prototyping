<script>
	import InseratForm from '$lib/components/InseratForm.svelte';

	export let form;
</script>

<svelte:head>
	<title>Neues Inserat erstellen – Homie</title>
</svelte:head>

<section class="section">
	<div class="container narrow">
		<a href="/inserate" class="back-link">← Zurück zur Übersicht</a>
		<h1>Neues Inserat erstellen</h1>
		<p class="muted">
			Fülle die Felder aus, um dein WG-Zimmer auf Homie zu veröffentlichen. Pflichtfelder
			sind mit * markiert.
		</p>

		{#if form?.errors}
			<div class="alert alert-error">
				Bitte überprüfe deine Eingaben.
			</div>
		{/if}

		<InseratForm
			inserat={form?.values ?? {}}
			errors={form?.errors ?? null}
			submitLabel="Inserat veröffentlichen"
			cancelHref="/inserate"
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
