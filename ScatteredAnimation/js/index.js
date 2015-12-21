"use strict";

var SwirlingBegin = false;

var WIDTH;
var HEIGHT;

var SwirlingSizeX = 4; // the size of the swirls
var SwirlingSizeY = 4;
var PARTICLES = 10000;
var space = 100, space2 = space * space;
var SL = 5; // speed limit
var AF = 0.4; // attract force
//used to control the fofrce replatoin and attraction.
var reverse = 4;

var x, y;

var points = [];

var particles = [];

var i;
var point;


var mx, my;
var dx, dy, d, d2;


var n;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//An event handler for the resize event on the window.
window.onresize = function() {
	//alert("resize event detected!");
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
  
  
  ctx.fillStyle = '#000';
  //ctx.fillStyle = '#b491eb';
  ctx.font = '200pt Iceland';
  ctx.textAlign = 'center';
  ctx.fillText('Alexღ', WIDTH / 2, HEIGHT / 2);
  //ctx.strokeText('Alexღ', WIDTH / 2, HEIGHT / 2)
};

window.onresize();



var imageData = ctx.getImageData(0,0,WIDTH,WIDTH);
var data = imageData.data;


for (y=0;y<HEIGHT;y++) {
  for (x=0;x<WIDTH;x++) {
    if (data[(y * WIDTH + x)*4+3]) {
      points.push({x: x, y: y});
    }
  }
}


for (i=0; i<PARTICLES; i++) {
  
  point = points[Math.random() * points.length | 0];
  particles.push({
    x: point.x + Math.random() - 0.5,
    y: point.y + Math.random() - 0.5,
    dx: 0, dy: 0
  })
}

var m = [];
var disablemouse = false;

for (i=0; i<10; i++) {
  // just assume we dont have more than 10 fingers
  m.push({x: 0, y: 0});
}

if ('ontouchstart' in document.documentElement) {
  canvas.addEventListener('touchstart', touches);
  canvas.addEventListener('touchmove', touches);
  
  canvas.addEventListener('touchend', function(e) {
    //touch the screen to swirl
  	SwirlingBegin = true;
  	//alert(SwirlingBegin);

    for (var i=1; i<m.length; i++) {
      m[i].x = 0;
    }
  })
  
} else {
  
  // canvas.addEventListener('mousemove', function(e) {
    // m[0].x = e.offsetX;
    // m[0].y = e.offsetY;
  // });
  
  // canvas.addEventListener('mousedown', function(e) {
    // m[0].x = e.offsetX;
    // m[0].y = e.offsetY;
    //repal the attraction
    // reverse = -0.4;
		
  // });
  
  // canvas.addEventListener('mouseup', function(e) {
    // m[0].x = 0;
    
    // reverse = 1;
  // });
}

//helper function
function touches(e) {
  
  disablemouse = true;
  
  var touches = e.touches, touch;
  for (var i=1; i<m.length; i++) {
    touch = touches[i-1];
    if (touch) {
      m[i].x = touch.clientX;
      m[i].y = touch.clientY;
    } else {
      m[i].x = 0;
    }
  }
}





function draw() {
  // var n = Date.now() / 1000 ;
  var n = (Date.now() % 1000 );
  // / 120;
  
  ctx.beginPath();
  
  // begin the swirlings 
	if (SwirlingBegin) {
		//clear out the particle trajectory when sirling
		//ctx.clearRect(0, 0, WIDTH, HEIGHT);

		for (i=0;i<PARTICLES;i++) {
			point = particles[i];
			
			for (var j=0; j<m.length; j++) {
				// if (mx) {

				mx = m[j].x;
				if (!mx) continue;

				my = m[j].y;
				dx = mx - point.x;
				dy = my - point.y;

				d2 = dx * dx + dy * dy;

				if (d2 < space2) {
				// attraction

				d = Math.sqrt(d2)

				// Constant speed - seems to converge
				// point.dx += dx / space;
				// point.dy += dy / space;

				// More Chaoes

				point.dx += dx / d * (1 - dx / space) * AF * reverse;
				point.dy += dy / d * (1 - dy / space) * AF * reverse;

				if (point.dx < -SL) point.dx = -SL;
				else if (point.dx > SL) point.dx = SL;
				  
				if (point.dy < -SL) point.dy = -SL;
				else if (point.dy > SL) point.dy = SL;
				
				} else {
				  
				  // friction
				  point.dx *= 0.9
				  point.dy *= 0.9
				  
				}

			}

			point.y += Math.cos(point.x / SwirlingSizeX);
			point.x += Math.sin(point.y / SwirlingSizeY);

			point.x += point.dx;
			point.y += point.dy;

			ctx.rect(point.x, point.y, 1, 1);
		}

	}
  
  
  ctx.closePath();
  
  ctx.fill();
  

}


setInterval(draw, 50);


    
//setTimeout(function(){
//    drawing = setInterval(draw, 50);
//}, 3000);