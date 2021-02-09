const formatNumber = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Fetch information about my osu profile
fetch(new URL('https://about.newtt.me/osu'))
    .then(res => res.json())
    .then(res => { document.getElementById('rank').innerHTML = `(#${formatNumber(res.globalRank)})`; })
    .catch(err => console.error('There was an issue fetching data about newt\'s osu profile. Sorry!', err));