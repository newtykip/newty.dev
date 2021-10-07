// Fetch the element
const twitchUrl = document.getElementsByClassName('twitchUrl');
const liveEl = document.getElementById('live');

// Check whether newt is live
fetch(new URL('https://newtt.me/api/twitch'))
	.then((res) => res.json())
	.then((res) => {
		twitchUrl.href = `https://twitch.tv/${res.username}`;

		if (res.stream === null) {
			liveEl.innerText = " (I'm Live!)";
		}
	});
