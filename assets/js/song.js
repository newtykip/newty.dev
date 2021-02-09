// Function to update the song
const updateSong = () => {
    fetch(new URL('https://about.newtt.me/scrobbling'))
        .then(res => res.json())
        .then(res => {
            // Fetch the element
            const el = document.getElementById('song');

            if (!res.hasOwnProperty('message')) {
                // Update the content of the element
                const artist = res.type === 'spotify' ? res.artists[0].name.toLowerCase() : res.artist;
                const song = res.name.toLowerCase();
            
                switch (res.type) {
                    case 'spotfy': el.innerHTML = ` currently listening to: <a href="${res.url}">${artist} - ${song}</a>`;
                    case 'soundcloud': el.innerHTML = ` currently listening to: <a href="${res.url}"${artist} - ${song}</a>`;
                    case 'lastfm': el.innerHTML = ` currently listening to: ${artist} - ${song}`;
                }
                
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

// Check for a new song every 5 seconds
setInterval(updateSong, 5000);
updateSong(); // Initial run