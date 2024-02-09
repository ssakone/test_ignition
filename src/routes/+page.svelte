<script lang="ts">
	import Login from '$lib/Login.svelte';
	import NostrIgnition from '$lib/NostrIgnition/NostrIgnition';
	import Signup from '$lib/Signup.svelte';
	import '$lib/store';
	import { nip19 } from 'nostr-tools';

	let npub: string;

	const handleSignup = (event: { detail: string }) => {
		console.log('Npub: ', event.detail);
		alert('Npub: ' + event.detail);
		npub = event.detail;
	};

	const handleLogin = (event: { detail: string }) => {
		alert('Npub: ' + event.detail);
		npub = event.detail;
	};
	const event = {
		content: 'Hello, world!',
		created_at: new Date().getTime() / 1000,
		tags: [],
		pubkey: '',
		kind: 1
	};

	let signedEvent = '';

	function signEvent() {
		event['pubkey'] = nip19.decode(npub).data as string;
		NostrIgnition.signEvent(event).then((signed) => {
			console.log('signed', signed?.result);
			signedEvent = JSON.stringify(signed?.result);
		});
	}
</script>

<div class="flex flex-col w-full p-8 gap-2">
	<h1 class="text-2xl">Signup with ignition</h1>
	<Signup on:signup={handleSignup} />

	<span class="divider my-0" />

	<h1 class="text-2xl">Login with ignition</h1>
	<Login on:logged={handleLogin} />

	<span class="divider my-0" />

	<h1 class="text-2xl">Signing</h1>
	<textarea class="textarea textarea-bordered w-full h-32">{JSON.stringify(event)}</textarea>
	<button class="btn btn-outline btn-sm" on:click={signEvent}> Sign </button>
	<span>Signed:</span>
	<pre>{signedEvent}</pre>
</div>
