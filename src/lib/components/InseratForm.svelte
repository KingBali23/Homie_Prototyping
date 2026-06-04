<script>
	import CategoryPicker from '$lib/components/CategoryPicker.svelte';

	/** @type {Record<string, any>} */
	export let inserat = {};
	/** @type {Record<string, string> | null} */
	export let errors = null;
	export let submitLabel = 'Inserat veröffentlichen';
	export let cancelHref = '/inserate';
</script>

<form method="POST" class="form stack-md">
	<div class="form-group">
		<label for="title">Titel *</label>
		<input
			id="title"
			name="title"
			type="text"
			value={inserat.title ?? ''}
			placeholder="z. B. Helles Zimmer in 3er-WG"
			maxlength="100"
			required
		/>
		{#if errors?.title}<span class="form-error">{errors.title}</span>{/if}
	</div>

	<div class="form-row">
		<div class="form-group">
			<label for="price">Preis (CHF/Monat) *</label>
			<input
				id="price"
				name="price"
				type="number"
				min="0"
				step="10"
				value={inserat.price ?? ''}
				required
			/>
			{#if errors?.price}<span class="form-error">{errors.price}</span>{/if}
		</div>
		<div class="form-group">
			<label for="size">Grösse (m²) *</label>
			<input
				id="size"
				name="size"
				type="number"
				min="1"
				step="1"
				value={inserat.size ?? ''}
				required
			/>
			{#if errors?.size}<span class="form-error">{errors.size}</span>{/if}
		</div>
	</div>

	<div class="form-row">
		<div class="form-group">
			<label for="location">Ort *</label>
			<input
				id="location"
				name="location"
				type="text"
				value={inserat.location ?? ''}
				placeholder="z. B. Winterthur"
				required
			/>
			{#if errors?.location}<span class="form-error">{errors.location}</span>{/if}
		</div>
		<div class="form-group">
			<label for="availableFrom">Verfügbar ab</label>
			<input
				id="availableFrom"
				name="availableFrom"
				type="date"
				value={inserat.availableFrom ?? ''}
			/>
		</div>
	</div>

	<div class="form-group">
		<label for="description">Beschreibung *</label>
		<textarea
			id="description"
			name="description"
			placeholder="Beschreibe die WG, die Atmosphäre und die Mitbewohnenden."
			maxlength="1000"
			required>{inserat.description ?? ''}</textarea>
		<span class="form-hint">Max. 1000 Zeichen.</span>
		{#if errors?.description}<span class="form-error">{errors.description}</span>{/if}
	</div>

	<div class="form-group">
		<label for="features">Ausstattung (kommagetrennt)</label>
		<input
			id="features"
			name="features"
			type="text"
			value={Array.isArray(inserat.features) ? inserat.features.join(', ') : (inserat.features ?? '')}
			placeholder="WLAN, Balkon, Waschmaschine, möbliert"
		/>
		<span class="form-hint">Wird automatisch als Liste angezeigt.</span>
	</div>

	<div class="form-group">
		<label for="categories-picker">Passt zu (Kategorien)</label>
		<CategoryPicker selected={inserat.categories} />
		<span class="form-hint">
			Hilft Suchenden, deine WG über das Matching zu finden.
		</span>
	</div>

	<div class="form-group">
		<label for="imageUrl">Bild-URL</label>
		<input
			id="imageUrl"
			name="imageUrl"
			type="url"
			value={inserat.imageUrl ?? ''}
			placeholder="https://..."
		/>
		<span class="form-hint">Optional. Leer lassen, um Platzhalterbild zu verwenden.</span>
		{#if errors?.imageUrl}<span class="form-error">{errors.imageUrl}</span>{/if}
	</div>

	<fieldset class="contact-fieldset">
		<legend>Kontakt</legend>
		<div class="form-row">
			<div class="form-group">
				<label for="contactName">Dein Name *</label>
				<input
					id="contactName"
					name="contactName"
					type="text"
					value={inserat.contactName ?? ''}
					required
				/>
				{#if errors?.contactName}<span class="form-error">{errors.contactName}</span>{/if}
			</div>
			<div class="form-group">
				<label for="contactEmail">E-Mail *</label>
				<input
					id="contactEmail"
					name="contactEmail"
					type="email"
					value={inserat.contactEmail ?? ''}
					required
				/>
				{#if errors?.contactEmail}<span class="form-error">{errors.contactEmail}</span>{/if}
			</div>
		</div>
	</fieldset>

	<div class="actions">
		<a href={cancelHref} class="btn btn-secondary">Abbrechen</a>
		<button type="submit" class="btn">{submitLabel}</button>
	</div>
</form>

<style>
	.form {
		max-width: 720px;
	}

	.contact-fieldset {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1rem 1.2rem 0.3rem;
		margin: 0 0 1rem;
	}

	.contact-fieldset legend {
		padding: 0 0.5rem;
		font-weight: 600;
		color: var(--color-text-muted);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding-top: 0.5rem;
	}

	@media (max-width: 600px) {
		.actions {
			justify-content: stretch;
		}
		.actions :global(.btn) {
			flex: 1;
		}
	}
</style>
