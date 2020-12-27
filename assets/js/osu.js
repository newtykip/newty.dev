fetch(new URL('https://me.newtt.pw/api/osu'))
    .then(res => res.json())
    .then(res => { document.getElementById('rank').innerHTML = `(#${res.rank})`; })
    .catch(err => console.error('There was an issue fetching data about newt\'s osu profile. Sorry!', err));