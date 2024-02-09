<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import NostrIgnition from '$lib/NostrIgnition/NostrIgnition';
	import { Nip46, type BunkerProfile } from '$lib/NostrIgnition/nip46';

	let selectedBunker: BunkerProfile;
	let username: string;
	let email: string;
	let busy: boolean = false;

	let npub: string;
	let dispatch = createEventDispatcher();
	let nip46: Nip46;

	function prepareSignup() {
		console.log('selectedBunker', selectedBunker);
		console.log('username', username);
		console.log('email', email);

		busy = true;

		const checkSignup = setInterval(() => {
			const connected = NostrIgnition.connected();
			if (connected) {
				dispatch('signup', NostrIgnition.remoteNpub());
				npub = NostrIgnition.remoteNpub() as string;
				clearInterval(checkSignup);
				busy = false;
			}
		}, 1000);

		NostrIgnition.createAccount(selectedBunker.pubkey, username, email)
			.then((rs) => {
				if (rs && rs.error) {
					NostrIgnition.openNewWindow(`${rs.error}?redirect_uri=http://localhost:4000`);
				}
				console.log('rs', rs);
			})
			.catch((err) => {
				busy = false;
				alert(err);
			});
	}
	let bunkers: BunkerProfile[] = [];
	onMount(() => {
		nip46 = new Nip46();
		nip46.fetchBunkers().then((_bunkers) => {
			selectedBunker = (_bunkers as BunkerProfile[])[0];
			bunkers = _bunkers as BunkerProfile[];
		});
	});
</script>

<div class="flex flex-col gap-2">
	{#if busy}
		<span class="loading"></span>
	{/if}
	<input type="text" class="input input-bordered w-72" placeholder="email" bind:value={email} />
	<div>
		<input
			type="text"
			class="input input-bordered w-72"
			placeholder="username"
			bind:value={username}
		/>
		<select bind:value={selectedBunker} class="select input-bordered">
			{#each bunkers as bunker}
				<option value={bunker}>{bunker.domain}</option>
			{/each}
		</select>
	</div>
	<button class="btn btn-outline btn-sm w-56" on:click={prepareSignup}
		>Click to open Signup Dialog</button
	>
	{#if npub}
		<div>
			<h2>Connection Success!</h2>
			<p>Your NostrNpub is:</p>
			<p>{npub}</p>
		</div>
	{/if}
</div>
