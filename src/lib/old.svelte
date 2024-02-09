<script>
	import { onMount } from 'svelte';

	function openBunker() {
		if (typeof window === 'undefined') return;
		(window as any).nostr();
	}
	onMount(() => {
		// console.log('NostrIgnition', NostrIgnition);
		// NostrIgnition.init({
		// 	appName: 'DemoApp222',
		// 	redirectUri: 'http://localhost:4000',
		// 	timeout: 15000
		// });
		// const checkConnected = setInterval(() => {
		// 	// NostrIgnition.ping().then((res) => {
		// 	// 	console.log('ping res', res);
		// 	// 	clearInterval(checkConnected);
		// 	// 	document.getElementById('pingButton').innerText = 'Pinged!';
		// 	// });
		// 	const remoteNpub = NostrIgnition.remoteNpub();
		// 	console.log('remoteNpub', remoteNpub);
		// 	if (remoteNpub) {
		// 		document.getElementById('newNostrNpub').innerText = remoteNpub;
		// 		document.getElementById('connectionSuccess').style.display = 'flex';
		// 		clearInterval(checkConnected);
		// 	}
		// 	// const remoteNpub = NostrIgnition.remotePubkey();
		// 	// console.log('remoteNpub', remoteNpub);
		// 	// if (remoteNpub) {
		// 	// 	document.getElementById('newNostrNpub').innerText = remoteNpub;
		// 	// 	document.getElementById('connectionSuccess').style.display = 'flex';
		// 	// 	clearInterval(checkConnected);
		// 	// }
		// 	// if (NostrIgnition.connected()) {
		// 	// 	console.log('connected');
		// 	// 	document.getElementById('newNostrNpub').innerText = NostrIgnition.remoteNpub();
		// 	// 	document.getElementById('connectionSuccess').style.display = 'flex';
		// 	// 	const event = {
		// 	// 		content: 'Hello World!',
		// 	// 		pubkey: NostrIgnition.remotePubkey(),
		// 	// 		createdAt: Math.floor(Date.now() / 1000),
		// 	// 		kind: 1,
		// 	// 		tags: []
		// 	// 	};
		// 	// 	document.getElementById('noteCode').innerText = JSON.stringify(event, null, 4);
		// 	// 	clearInterval(checkConnected);
		// 	// } else {
		// 	// 	console.log('not connected');
		// 	// }
		// }, 1000);
	});
</script>

<h1 style="text-align: center">Nostr Ignition - Demo</h1>
<button on:click={openBunker}> Log in with Nostr </button>

<div id="connectionSuccess">
	<h2>🎊 Connected successfully! 🎊</h2>
	<img src="https://i.nostr.build/a4OQ.gif" alt="thumbs-up" />
	<div id="npubMessage">
		The npub of your account is:
		<div id="newNostrNpub"></div>
	</div>
	<div id="sign" style="margin-top: 2rem">
		<h2>Want to try signing a note? Don't worry, we won't publish it.</h2>
		<pre id="noteCode">
				&#123;
					"content": "Hello World!",
					"pubkey": "NostrPubkey",
					"createdAt": 1629782400,
					"kind": 1,
					"tags": []
				&#125;
			</pre>
		<button
			style="display: block; font-size: 1.25rem; padding: 5px 8px; margin: 0 auto"
			on:click={NostrIgnition.signEvent(JSON.parse(document.getElementById('noteCode').innerText))}
		>
			Sign "Hello World!"
		</button>
		<h2 style="margin-top: 4rem">Or, open your browser console and try pinging the bunker.</h2>
		<button
			style="display: block; font-size: 1.25rem; padding: 5px 8px; margin: 0 auto"
			onclick="NostrIgnition.ping()"
			id="pingButton"
		>
			Ping Bunker
		</button>
	</div>
</div>
