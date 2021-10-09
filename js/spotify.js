// Fetch the element
const el = document.getElementById('song');
var storedSong = null;

// Update the song
const updateSong = () => {
	fetch(new URL('https://newtt.me/api/np'))
		.then((res) => res.json())
		.then((res) => {
			if (!res.hasOwnProperty('message')) {
				// Ensure that the song is visible
				if (!el.classList.contains('visible')) {
					el.classList.remove('hidden');
					el.classList.add('visible');
				}

				const artist = res.artists[0].name.toLowerCase();
				const song = res.name.toLowerCase();

				// If the song is different to the previous one, reanimate
				if (res.id !== storedSong) {
					// Go away!
					el.classList.remove('visible');
					el.classList.add('hidden');

					// Come back!
					window.setTimeout(() => {
						el.classList.remove('hidden');
						el.classList.add('visible');

						el.innerHTML = `listening to: <a href="${res.url}">${artist} - ${song}</a>`;
					}, 1000);
				} else {
					el.innerHTML = `listening to: <a href="${res.url}">${artist} - ${song}</a>`;
				}

				storedSong = res.id;

				console.log(
					`Song updated! Currently listening to ${artist} - ${song}`,
				);
			} else {
				// Ensure that the song is not visible
				if (el.classList.contains('visible')) {
					el.classList.remove('visible');
					el.classList.add('hidden');
				}

				console.log('Song updated! Currently listening to nothing!');
			}
		})
		.catch((err) => {
			console.error(
				"There was an issue fetching data about newt's current song. Sorry!",
				err,
			);
			// Ensure that the song is not visible
			if (el.classList.contains('visible')) {
				el.classList.remove('visible');
			}
		});
};

// Check for a new song every 5 seconds
setInterval(updateSong, 5000);
updateSong();
