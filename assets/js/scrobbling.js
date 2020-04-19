const socket = io('wss://now-scrobbling.glitch.me');

socket.on('connect', () => console.log('Connected to websocket!'));

socket.on('track', data => {
  if (data.song.nowPlaying) {
    document.querySelector('#song').innerHTML = `<a href="${data.artists[0].url}">${data.artists[0].name}</a> - <a href="${data.song.url}">${data.song.name}</a>`;
    document.querySelector('#song').className = 'visible';
  } else {
    document.querySelector('#song').classList = '';
  }
});
