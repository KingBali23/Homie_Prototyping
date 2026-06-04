<footer class="site-footer">
	<div class="container footer-inner">
		<p class="muted">
			© {new Date().getFullYear()} Homie · Prototyp im Rahmen des Moduls Prototyping (ZHAW)
		</p>
		<p class="muted">
			Demo-Daten – keine echten Inserate.
		</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: auto;
		padding: 2rem 0;
		border-top: 1px solid var(--color-border);
		background: var(--color-surface-alt);
	}

	.footer-inner {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		justify-content: space-between;
		font-size: 0.85rem;
	}

	.footer-inner p {
		margin: 0;
	}
</style>
