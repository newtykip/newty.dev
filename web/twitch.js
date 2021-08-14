// Fetch the element
const liveEl = document.getElementById('live');

// Check whether newt is live
fetch(new URL('https://newtt.me/api/twitch'))
	.then(res => res.json())
	.then(res => {
		if (res.isLive) {
			liveEl.innerText = ' (I\'m Live!)';
		}
	});
