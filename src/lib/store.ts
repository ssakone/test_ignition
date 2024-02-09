import NostrIgnition from '$lib/NostrIgnition/NostrIgnition';

const createNostrIgnition = () => {
    return NostrIgnition.init({
        appName: 'Sakone Test',
        redirectUri: 'http://localhost:4000',
        timeout: 15000
    });
}

if (typeof document !== 'undefined') {
    createNostrIgnition().then(() => {
        console.log('NostrIgnition initialized');

        NostrIgnition.logout();
    })
}