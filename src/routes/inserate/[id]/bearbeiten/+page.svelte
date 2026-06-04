<script>
	import InseratForm from '$lib/components/InseratForm.svelte';

	export let data;
	export let form;

	$: initialValues = form?.values ?? data.inserat;
</script>

<svelte:head>
	<title>Inserat bearbeiten – Homie</title>
</svelte:head>

<section class="section">
	<div class="container narrow">
		<a href={`/inserate/${data.inserat._id}`} class="back-link">← Zurück zum Inserat</a>
		<h1>Inserat bearbeiten</h1>

		{#if form?.errors}
			<div class="alert alert-error">⚠️ Bitte überprüfe die rot markierten Felder.</div>
		{/if}

		<InseratForm
			inserat={initialValues}
			errors={form?.errors ?? null}
			submitLabel="Änderungen speichern"
			cancelHref={`/inserate/${data.inserat._id}`}
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
		margin-bottom: 1rem;
	}
</style>
