<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import NostrIgnition from '$lib/NostrIgnition/NostrIgnition';
	import { nip19 } from 'nostr-tools';

	let npub: string;
	let inputNPUB: string;
	let dispatch = createEventDispatcher();

	function login() {
		const checkLogin = setInterval(() => {
			const connected = NostrIgnition.connected();
			if (connected) {
				dispatch('logged', NostrIgnition.remoteNpub());
				npub = NostrIgnition.remoteNpub() as string;
				clearInterval(checkLogin);
			}
		}, 1000);

		NostrIgnition.connect(nip19.decode(inputNPUB).data as string);
		// (window as any).nostr();
	}
</script>

<div class="flex flex-col gap-2">
	<input type="text" class="input input-bordered w-72" bind:value={inputNPUB} />
	<button class="btn btn-outline btn-sm w-56" on:click={login}>Login</button>
	{#if npub}
		<div>
			<h2>Connection Success!</h2>
			<p>Your NostrNpub is:</p>
			<p>{npub}</p>
		</div>
	{/if}
</div>
