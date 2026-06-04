<script>
	import { page } from '$app/stores';

	$: path = $page.url.pathname;
</script>

<header class="site-header">
	<div class="container header-inner">
		<a href="/" class="logo">
			<span class="logo-mark">🏠</span>
			<span class="logo-text">Homie</span>
		</a>

		<nav aria-label="Hauptnavigation">
			<a href="/" class:active={path === '/'}>Start</a>
			<a href="/inserate" class:active={path.startsWith('/inserate') && path !== '/inserate/neu'}>
				Inserate
			</a>
			<a href="/profil" class:active={path.startsWith('/profil')}>Profil</a>
			<a href="/inserate/neu" class="btn btn-secondary nav-cta" class:active={path === '/inserate/neu'}>
				Inserat erstellen
			</a>
		</nav>
	</div>
</header>

<style>
	.site-header {
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		z-index: 10;
		backdrop-filter: saturate(180%) blur(8px);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.85rem;
		padding-bottom: 0.85rem;
		gap: 1rem;
	}

	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-serif);
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-text);
		text-decoration: none;
	}

	.logo-mark {
		font-size: 1.5rem;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	nav a {
		color: var(--color-text);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.95rem;
		padding: 0.35rem 0;
		border-bottom: 2px solid transparent;
		transition: color 120ms ease, border-color 120ms ease;
	}

	nav a:not(.nav-cta):hover {
		color: var(--color-accent);
	}

	nav a.active:not(.nav-cta) {
		border-bottom-color: var(--color-accent);
		color: var(--color-accent);
	}

	.nav-cta {
		padding: 0.5rem 1rem !important;
		border-bottom: 1px solid var(--color-border) !important;
	}

	@media (max-width: 600px) {
		nav {
			gap: 0.75rem;
		}
		nav a:not(.nav-cta) {
			font-size: 0.9rem;
		}
		.nav-cta {
			padding: 0.4rem 0.75rem !important;
			font-size: 0.85rem;
		}
	}
</style>
