// Function to update the song
const updateSong = () => {
    fetch(new URL('https://me.newtt.pw/api/song'))
        .then(res => res.json())
        .then(res => {
            // Fetch the element
            const el = document.getElementById('song');

            if (!res.hasOwnProperty('message')) {
                // Update the content of the element
                const artist = res.artists[0].name.toLowerCase();
                const song = res.name.toLowerCase();
                el.innerHTML = ` currently listening to: <a href="${res.url}">${artist} - ${song}</a>`;
                
                // Ensure that the song is visible
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }

                console.log(`Song updated! Currently listening to ${artist} - ${song}`);
            } else {
                // Ensure that the song is not visible
                if (el.classList.contains('visible')) {
                    el.classList.remove('visible');
                }

                console.log('Song updated! Currently listening to nothing!');
            }
        })
        .catch(err => console.error('There was an issue fetching data about newt\'s current song. Sorry!', err));
};

// Check for a new song every 10 seconds
setInterval(updateSong, 10000);
updateSong(); // Initial run