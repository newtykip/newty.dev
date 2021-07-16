var width, height, center;
var points = 10;
var path = new Path();
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
path.fillColor = 'red';
path.fillColor.brightness = 0.9;
var hue = Math.floor(Math.random() * 360);
initializePath();

function cycleHue() {
    hue = hue + 0.6;
    path.fillColor.hue = hue;
}

function initializePath() {
	center = view.center;
	width = view.size.width;
	height = view.size.height / 1.2;
	path.segments = [];
	path.add(view.bounds.bottomLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
	path.add(view.bounds.bottomRight);
}

function onFrame(event) {
    pathHeight += (center.y - mousePos.y - pathHeight) / 10;
    cycleHue();
	for (var i = 1; i < points; i++) {
		var sinSeed = event.count + (i + i % 10) * 100;
		var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
		path.segments[i].point.y = yPos;
	}
	path.smooth({ type: 'continuous' });
}

function onMouseMove(event) {
    mousePos = event.point;
    cycleHue();
}

function onResize(event) {
	initializePath();
}
