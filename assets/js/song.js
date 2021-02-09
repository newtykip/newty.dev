// Fetch the element
const el = document.getElementById('song');

// Function to update the song
const updateSong = () => {
    fetch(new URL('http://localhost:3000/api/scrobbling'))
        .then(res => res.json())
        .then(res => {
            if (!res.hasOwnProperty('message')) {
                // Update the content of the element
                const artist = res.type === 'spotify' ? res.artists[0].name.toLowerCase() : res.artist.toLowerCase();
                const song = res.name.toLowerCase();
                let msg = ' currently listening to: ';

                if (res.type === 'spotify' || res.type === 'soundcloud') msg += `<a href="${res.url}">${artist} - ${song}</a>`;
                else msg += `${artist} - ${song}`;

                el.innerHTML = msg;
                
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
        .catch(err => {
            console.error('There was an issue fetching data about newt\'s current song. Sorry!', err);
            // Ensure that the song is not visible
            if (el.classList.contains('visible')) {
                el.classList.remove('visible');
            }
        });
};

// Check for a new song every 5 seconds
setInterval(updateSong, 5000);
updateSong(); // Initial run