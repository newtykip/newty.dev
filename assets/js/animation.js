// adapted from https://github.com/paperjs/paper.js/blob/develop/examples/Animated/Smoothing.html

var center = view.center;
var width = view.size.width;
var height = view.size.height;

var curPos = center / 2;

var path = new Path();
var maxHeight = 200;
var points = 12;

path.fillColor = "red";
var hue = Math.floor(Math.random() * 360);

function createPath() {
    // start point
    path.add(view.bounds.bottomLeft);
    // evenly distribute n points
    for (var i = 1; i < points; i++) {
        path.add(new Point(width / points * i, 0));
    }
    // end point
    path.add(view.bounds.bottomRight);
    // smooth path
    path.smooth();
}

function onFrame(e) {
    // shift points to cursor
    maxHeight += (center.y - curPos.y - maxHeight) / 10;
    cycleHue();
    // magic numbers
    for (var i = 1; i < points; i++) {
		var sinSeed = e.count + (i + i % 10) * 100;
		var sinHeight = Math.cos(sinSeed / 200) * maxHeight;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
        path.segments[i].point.y = yPos;
    }
}

function onMouseMove(e) {
	curPos = e.point;
	cycleHue();
}

function onResize() {
    // redefine bounds
    center = view.center;
	width = view.size.width;
    height = view.size.height;
    // reset path segments
    path.segments = [];
    createPath();
}

function cycleHue() {
    hue++;
    path.fillColor.hue = hue;
}

createPath();