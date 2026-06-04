<script>
	import ProfileForm from '$lib/components/ProfileForm.svelte';

	export let data;
	export let form;

	$: initialValues = form?.values ?? data.profile;
</script>

<svelte:head>
	<title>Profil bearbeiten – Homie</title>
</svelte:head>

<section class="section">
	<div class="container narrow">
		<a href={`/profil/${data.profile._id}`} class="back-link">← Zurück zum Profil</a>
		<h1>Profil bearbeiten</h1>

		{#if form?.errors}
			<div class="alert alert-error">Bitte überprüfe deine Eingaben.</div>
		{/if}

		<ProfileForm
			profile={initialValues}
			errors={form?.errors ?? null}
			submitLabel="Änderungen speichern"
			cancelHref={`/profil/${data.profile._id}`}
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
