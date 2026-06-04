<script>
	export let contactName = '';
	export let contactEmail = '';
	export let title = '';

	$: subject = `Anfrage zu deinem WG-Inserat: ${title}`;
	$: mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
</script>

<aside class="card contact-card">
	<div class="avatar" aria-hidden="true">
		{contactName ? contactName.charAt(0).toUpperCase() : '👤'}
	</div>
	<div class="name-block">
		<p class="label">Ansprechperson</p>
		<p class="name">{contactName || 'Inserent:in'}</p>
	</div>

	<a class="btn btn-large mail-btn" href={mailtoHref}>
		✉️ E-Mail senden
	</a>

	<p class="hint muted">
		Beim Klick öffnet sich dein Mailprogramm – der Betreff ist bereits vorausgefüllt.
	</p>

	<ul class="tips">
		<li>Stell dich kurz vor – Studium, Alter, Hobbies.</li>
		<li>Schreibe, warum die WG zu dir passt.</li>
		<li>Frag nach einem Besichtigungstermin.</li>
	</ul>
</aside>

<style>
	.contact-card {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		position: sticky;
		top: 5.5rem;
	}

	.avatar {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: var(--color-accent-soft);
		color: var(--color-accent);
		display: grid;
		place-items: center;
		font-size: 1.4rem;
		font-weight: 600;
		font-family: var(--font-serif);
	}

	.name-block .label {
		margin: 0;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
	}

	.name-block .name {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.mail-btn {
		margin-top: 0.5rem;
		width: 100%;
	}

	.hint {
		font-size: 0.82rem;
		margin: 0;
	}

	.tips {
		margin: 0.5rem 0 0;
		padding-left: 1.1rem;
		font-size: 0.88rem;
		color: var(--color-text-muted);
	}

	.tips li + li {
		margin-top: 0.25rem;
	}

	@media (max-width: 900px) {
		.contact-card {
			position: static;
		}
	}
</style>
