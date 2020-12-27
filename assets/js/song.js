fetch(new URL('https://me.newtt.pw/api/song'))
    .then(res => res.json())
    .then(res => {
        if (!res.hasOwnProperty('message')) {
            document.getElementById('song').innerHTML = ` currently listening to: <a href="${res.url}">${res.artists[0].name.toLowerCase()} - ${res.name.toLowerCase()}</a>`;
            document.getElementById('song').classList.add('visible');
        }
    })
    .catch(err => console.error('There was an issue fetching data about newt\'s current song. Sorry!', err));