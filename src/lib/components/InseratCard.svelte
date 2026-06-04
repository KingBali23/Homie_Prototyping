<script>
	/** @type {{
	 *   _id: string,
	 *   title: string,
	 *   price: number,
	 *   size: number,
	 *   location: string,
	 *   imageUrl?: string,
	 *   description?: string
	 * }} */
	export let inserat;
	export let badge = '';

	const fallbackImage =
		'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=70';
</script>

<a class="card-link" href={`/inserate/${inserat._id}`}>
	<article class="card inserat-card">
		<div class="image-wrap">
			<img src={inserat.imageUrl || fallbackImage} alt={inserat.title} loading="lazy" />
			<span class="price-tag">CHF {inserat.price}/Monat</span>
			{#if badge}
				<span class="match-badge">{badge}</span>
			{/if}
		</div>
		<div class="card-body">
			<h3>{inserat.title}</h3>
			<p class="meta">
				<span>📍 {inserat.location}</span>
				<span>📐 {inserat.size} m²</span>
			</p>
			{#if inserat.description}
				<p class="excerpt">{inserat.description}</p>
			{/if}
			<span class="link-cta">Details ansehen →</span>
		</div>
	</article>
</a>

<style>
	.card-link {
		display: block;
		text-decoration: none;
		color: inherit;
		height: 100%;
	}

	.card-link:hover {
		text-decoration: none;
	}

	.inserat-card {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
	}

	.card-link:hover .inserat-card {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
		border-color: color-mix(in srgb, var(--color-accent) 30%, var(--color-border));
	}

	.image-wrap {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--color-surface-alt);
	}

	.image-wrap img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 240ms ease;
	}

	.card-link:hover .image-wrap img {
		transform: scale(1.04);
	}

	.price-tag {
		position: absolute;
		left: 0.75rem;
		bottom: 0.75rem;
		background: var(--color-surface);
		color: var(--color-text);
		padding: 0.35rem 0.7rem;
		border-radius: var(--radius-md);
		font-size: 0.85rem;
		font-weight: 600;
		box-shadow: var(--shadow-sm);
	}

	.match-badge {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background: var(--color-accent);
		color: #fff;
		padding: 0.3rem 0.65rem;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 600;
		box-shadow: var(--shadow-sm);
	}

	.card-body {
		padding: 1.1rem 1.2rem 1.3rem;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		flex: 1;
	}

	.card-body h3 {
		margin: 0;
		font-size: 1.15rem;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1rem;
		margin: 0;
		font-size: 0.88rem;
		color: var(--color-text-muted);
	}

	.excerpt {
		font-size: 0.92rem;
		margin: 0.2rem 0 0;
		color: var(--color-text-muted);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.link-cta {
		margin-top: auto;
		padding-top: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-accent);
	}
</style>
