<script>
	export let data;
</script>

<svelte:head>
	<title>Homie – Dein WG-Zimmer wartet.</title>
</svelte:head>

<section class="hero">
	<div class="container hero-inner">
		<div class="hero-text">
			<p class="eyebrow">WG-Suche, ehrlich einfach</p>
			<h1>Finde dein neues Zuhause – ohne Umwege.</h1>
			<p class="lead">
				Homie zeigt dir WG-Zimmer mit den Infos, die wirklich zählen: Atmosphäre,
				Mitbewohnende, Preis und Lage. Erstelle ein Profil und erhalte direkt
				WG-Vorschläge, die zu dir passen.
			</p>
			<div class="cta-row">
				<a href="/profil/neu" class="btn btn-large">Profil erstellen & WGs finden</a>
				<a href="/inserate" class="btn btn-large btn-secondary">Alle Inserate ansehen</a>
			</div>
			<p class="muted small">
				{data.count}
				{data.count === 1 ? 'Inserat aktuell verfügbar' : 'Inserate aktuell verfügbar'}
			</p>
		</div>
		<div class="hero-illustration" aria-hidden="true">
			<div class="floating-card card-1">🛋️ Wohnzimmer</div>
			<div class="floating-card card-2">☕ Gemeinsame Küche</div>
			<div class="floating-card card-3">🪴 Balkon mit Aussicht</div>
		</div>
	</div>
</section>

<section class="section how">
	<div class="container">
		<h2>So funktioniert Homie</h2>
		<div class="steps">
			<div class="step">
				<div class="step-num">1</div>
				<h3>Profil erstellen</h3>
				<p class="muted">
					Sag uns, ob du suchst oder inserierst, und wähle die Kategorien, die zu dir
					passen – etwa Student:innen, International oder Gemeinschaftlich.
				</p>
			</div>
			<div class="step">
				<div class="step-num">2</div>
				<h3>Passende WGs erhalten</h3>
				<p class="muted">
					Homie schlägt dir direkt WG-Zimmer vor, die zu deinem Profil passen. Lieber
					selbst stöbern? Ein Klick zeigt dir alle Inserate.
				</p>
			</div>
			<div class="step">
				<div class="step-num">3</div>
				<h3>Kontakt aufnehmen</h3>
				<p class="muted">
					Ein Klick und dein Mailprogramm öffnet sich – Betreff bereits vorgeschrieben.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding: 4rem 0 3rem;
		background: linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-bg) 100%);
	}

	.hero-inner {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 3rem;
		align-items: center;
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

	.lead {
		font-size: 1.1rem;
		color: var(--color-text-muted);
		max-width: 38ch;
		margin-bottom: 1.5rem;
	}

	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.small {
		font-size: 0.88rem;
	}

	.hero-illustration {
		position: relative;
		height: 360px;
	}

	.floating-card {
		position: absolute;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 0.9rem 1.2rem;
		box-shadow: var(--shadow-md);
		font-weight: 500;
		font-size: 0.95rem;
		animation: float 6s ease-in-out infinite;
	}

	.card-1 {
		top: 10%;
		left: 5%;
		animation-delay: 0s;
	}

	.card-2 {
		top: 40%;
		right: 5%;
		animation-delay: 1.5s;
	}

	.card-3 {
		bottom: 8%;
		left: 18%;
		animation-delay: 3s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.how {
		padding: 3rem 0 4rem;
	}

	.how h2 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.step {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.75rem 1.5rem;
		text-align: left;
	}

	.step-num {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: var(--color-accent);
		color: #fff;
		display: grid;
		place-items: center;
		font-weight: 600;
		font-family: var(--font-serif);
		margin-bottom: 0.75rem;
	}

	.step h3 {
		margin-bottom: 0.4rem;
	}

	@media (max-width: 900px) {
		.hero-inner {
			grid-template-columns: 1fr;
		}
		.hero-illustration {
			height: 260px;
			max-width: 380px;
			margin: 0 auto;
			width: 100%;
		}
		.steps {
			grid-template-columns: 1fr;
		}
	}
</style>
