// Fetch the element
const el = document.getElementById('live');

// Check whether newt is live
fetch(new URL('http://localhost:8080/api/twitch'))
	.then(res => res.json())
	.then(res => {
		if (res.isLive) {
			el.innerText = ' (I\'m Live!)';
		}
	});
