const body = document.body;
const html = document.documentElement;
const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

console.log(height, width)

VANTA.NET({
    el: 'html',
    mouseControls: true,
    touchControls: false,
    gyroControls: false,
    minHeight: height,
    minWidth: width,
    backgroundColor: 0x0f0f10,
    color: 0xffffff,
    showDots: false,
    scale: 0.3,
    points: width >= 1920 ? 7 : Math.floor(width / 100),
});
