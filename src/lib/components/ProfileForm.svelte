<script>
	import CategoryPicker from '$lib/components/CategoryPicker.svelte';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';

	/** @type {Record<string, any>} */
	export let profile = {};
	/** @type {Record<string, string> | null} */
	export let errors = null;
	export let submitLabel = 'Profil erstellen';
	export let cancelHref = '/profil';

	$: if (errors) scrollToFirstError();

	async function scrollToFirstError() {
		if (!browser) return;
		await tick();
		const field = document.querySelector('.form-error');
		const group = field?.closest('.form-group, .role-fieldset') ?? field;
		if (group) {
			group.scrollIntoView({ behavior: 'smooth', block: 'center' });
			const input = group.querySelector('input, textarea');
			if (input instanceof HTMLElement) input.focus();
		}
	}
</script>

<form method="POST" class="form stack-md">
	<fieldset class="role-fieldset">
		<legend>Ich bin … *</legend>
		<div class="role-options">
			<label class="role-option">
				<input
					type="radio"
					name="role"
					value="suchend"
					checked={(profile.role ?? 'suchend') === 'suchend'}
				/>
				<span class="role-icon" aria-hidden="true">🔍</span>
				<span class="role-text">
					<strong>Auf Zimmersuche</strong>
					<small>Ich suche ein passendes WG-Zimmer.</small>
				</span>
			</label>
			<label class="role-option">
				<input type="radio" name="role" value="inserierend" checked={profile.role === 'inserierend'} />
				<span class="role-icon" aria-hidden="true">🏠</span>
				<span class="role-text">
					<strong>Inserierend</strong>
					<small>Ich biete ein Zimmer in meiner WG an.</small>
				</span>
			</label>
		</div>
		{#if errors?.role}<span class="form-error">{errors.role}</span>{/if}
	</fieldset>

	<div class="form-row">
		<div class="form-group">
			<label for="name">Name *</label>
			<input id="name" name="name" type="text" value={profile.name ?? ''} maxlength="60" required />
			{#if errors?.name}<span class="form-error">{errors.name}</span>{/if}
		</div>
		<div class="form-group">
			<label for="email">E-Mail *</label>
			<input id="email" name="email" type="email" value={profile.email ?? ''} required />
			{#if errors?.email}<span class="form-error">{errors.email}</span>{/if}
		</div>
	</div>

	<div class="form-group">
		<label for="categories-picker">Kategorien *</label>
		<CategoryPicker selected={profile.categories} />
		<span class="form-hint">
			Wähle, was zu dir passt – danach richten sich deine WG-Vorschläge.
		</span>
		{#if errors?.categories}<span class="form-error">{errors.categories}</span>{/if}
	</div>

	<div class="form-row">
		<div class="form-group">
			<label for="preferredLocation">Wunschort</label>
			<input
				id="preferredLocation"
				name="preferredLocation"
				type="text"
				value={profile.preferredLocation ?? ''}
				placeholder="z. B. Winterthur"
			/>
			<span class="form-hint">Optional.</span>
		</div>
		<div class="form-group">
			<label for="maxPrice">Max. Budget (CHF/Monat)</label>
			<input
				id="maxPrice"
				name="maxPrice"
				type="number"
				min="0"
				step="50"
				value={profile.maxPrice ?? ''}
				placeholder="z. B. 800"
			/>
			{#if errors?.maxPrice}<span class="form-error">{errors.maxPrice}</span>{/if}
		</div>
	</div>

	<div class="form-group">
		<label for="bio">Über mich</label>
		<textarea
			id="bio"
			name="bio"
			placeholder="Erzähl kurz etwas über dich, deinen Alltag und was dir in einer WG wichtig ist."
			maxlength="500">{profile.bio ?? ''}</textarea>
		<span class="form-hint">Optional, max. 500 Zeichen.</span>
		{#if errors?.bio}<span class="form-error">{errors.bio}</span>{/if}
	</div>

	<div class="actions">
		<a href={cancelHref} class="btn btn-secondary">Abbrechen</a>
		<button type="submit" class="btn">{submitLabel}</button>
	</div>
</form>

<style>
	.form {
		max-width: 720px;
	}

	.role-fieldset {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1rem 1.2rem 1.2rem;
		margin: 0 0 1rem;
	}

	.role-fieldset legend {
		padding: 0 0.5rem;
		font-weight: 600;
		color: var(--color-text-muted);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.role-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.role-option {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
		padding: 0.85rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		cursor: pointer;
		transition: border-color 120ms ease, background 120ms ease;
	}

	.role-option:hover {
		border-color: color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
	}

	.role-option:has(input:checked) {
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
	}

	.role-option input {
		width: auto;
		margin: 0.2rem 0 0;
		accent-color: var(--color-accent);
	}

	.role-icon {
		font-size: 1.3rem;
		line-height: 1;
	}

	.role-text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.role-text small {
		color: var(--color-text-muted);
		font-size: 0.82rem;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding-top: 0.5rem;
	}

	@media (max-width: 600px) {
		.role-options {
			grid-template-columns: 1fr;
		}
		.actions {
			justify-content: stretch;
		}
		.actions :global(.btn) {
			flex: 1;
		}
	}
</style>
