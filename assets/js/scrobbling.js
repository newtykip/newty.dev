const socket = io('wss://now-scrobbling.glitch.me');

socket.on('connect', () => console.log('Connected to websocket!'));

socket.on('track', data => {
    if (data.song.nowPlaying) {
        document.querySelector('#song').innerHTML = `<a href="${data.artists[0].url}">${data.artists[0].name.toLowerCase()}</a> - <a href="${data.song.url}">${data.song.name.toLowerCase()}</a>`;
        document.querySelector('#song').className = 'visible';
    } else {
        document.querySelector('#song').classList = '';
    }
});