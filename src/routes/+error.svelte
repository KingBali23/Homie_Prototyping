<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Fehler – Homie</title>
</svelte:head>

<section class="section">
	<div class="container narrow">
		<h1>{$page.status}</h1>
		<p class="lead">{$page.error?.message ?? 'Etwas ist schiefgelaufen.'}</p>
		<a href="/" class="btn">Zurück zur Startseite</a>
	</div>
</section>

<style>
	.narrow {
		max-width: 600px;
		text-align: center;
	}

	h1 {
		font-size: 5rem;
		color: var(--color-accent);
		margin-bottom: 0;
	}

	.lead {
		font-size: 1.1rem;
		color: var(--color-text-muted);
		margin-bottom: 2rem;
	}
</style>
