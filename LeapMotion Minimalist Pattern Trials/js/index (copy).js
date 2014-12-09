// window.Math shortcuts, Math object can be accessed anywhere 
Object.getOwnPropertyNames(window.Math).forEach(function(method) {
	window[method] = Math[method];
});

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// bg - background
var bgCanvas = document.getElementById('bg');
//bg ball - background bubbles
var BubbleCanvas = document.getElementById('bg-balls');
//fg - line animations	
var fgCanvas = document.getElementById('fg');
var bgCtx = bgCanvas.getContext('2d');
var bgBallsCtx = BubbleCanvas.getContext('2d');
var fgCtx = fgCanvas.getContext('2d');
var LineSize = 30;
var CANVAS_WIDTH = 666;
var CANVAS_HEIGHT = 666;
var BG_LINES_COUNT = 15;
var BG_LINES_LENGTH = 1500;
var FG_LINES_COUNT = 4;
var FG_LINES_QUEUE_LENGTH = 66;
var FG_LINES_COLORS = [{
		h: 30,
		s: 50,
		l: 50
	}, {
		h: 0,
		s: 50,
		l: 50
	}, {
		h: 220,
		s: 50,
		l: 50
	}, {
		h: 150,
		s: 50,
		l: 50
	}];
//the radian of a circle
var TwoPI = 2 * PI;
// Bubble class
var Ball = function(x, y, size, speed, color) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.draw = function(time) {
			this.speed = random() * this.size;
			this.x += (random() -random()) * this.speed;
			this.y += (random() -random()) * this.speed;
			if (this.x > CANVAS_WIDTH || this.x < 0)
				this.x *= -1;
			if (this.y > CANVAS_HEIGHT || this.y < 0)
				this.y *= -1;

			bgBallsCtx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';
			bgBallsCtx.beginPath();
			bgBallsCtx.arc(this.x, this.y, this.size, 0, TwoPI);
			bgBallsCtx.fill();
		};
	};

	//line class
var Line = function(x, y, color, ease, size, offset) {
		var _this = this,
			tmpOffset = clone(offset);
		this.x = x;
		this.y = y;
		this.color = color;
		this.size = size;
		this.queue = [];
		this.ease = ease;
		this.offset = offset;

		this.draw = function(time) {

			var newParticle = {
				x: this.x + this.offset.x,
				y: this.y + this.offset.y,
				size: this.size,
				color: clone(this.color)
			};

			if (this.queue.length > FG_LINES_QUEUE_LENGTH)
				this.queue.splice(0, 1);

			if (this.offset.x + 10 > tmpOffset.x)
				tmpOffset.x = (random() * CANVAS_WIDTH / 2) - CANVAS_WIDTH / 2;
			if (this.offset.y + 10 > tmpOffset.y)
				tmpOffset.y = (random() * CANVAS_HEIGHT / 2) - CANVAS_HEIGHT / 2;


			this.offset.x += (tmpOffset.x - this.offset.x) / this.ease;
			this.offset.y += (tmpOffset.y - this.offset.y) / this.ease;


			this.queue.forEach(function(particle, i) {
				var next = _this.queue[i + 1];

				if (particle.color.l - 0.5 > 0)
					particle.color.l -= 0.5;

				if (particle.color.s - 0.8 > 0)
					particle.color.s -= 0.8;

				particle.size += 0.2;


				particle.color.h += 1;

				if (next) {
					fgCtx.beginPath();
					fgCtx.strokeStyle = 'hsl(' + particle.color.h + ',' + particle.color.s + '%,' + particle.color.l + '%)';
					fgCtx.lineWidth = particle.size;
					fgCtx.moveTo(particle.x, particle.y);
					fgCtx.lineTo(next.x, next.y);
					fgCtx.stroke();
				} else {
					lastParticle = particle;
				}

			});

			this.queue.push(newParticle);

		};
	};

// cloning object
var clone = function(obj) {
		if (null === obj || "object" !== typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		}
		return copy;
	};

//converting degrees to radians
var toRadians = function(angle) {
		return angle * PI / 180;
	};

//return randomly shuffled array of objects
var	shuffle = function(o) {
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

// app
var	App = {
		time: 0,
		emitter: {
			x: CANVAS_WIDTH / 2,
			y: CANVAS_HEIGHT / 2,
			step: 8,
			angle: toRadians(0)
		},
		ballsArr: [],
		linesArr: [],
		init: function() {
			this.drawBgLines();
			this.createBalls();
			this.createLines();
			// texture of the Lines, 'darker' or 'lighter'
			//fgCtx.globalCompositeOperation = 'darker';
			fgCtx.shadowColor = 'rgba(0,0,0,0.3)';
			fgCtx.lineCap = 'square';
			fgCtx.shadowBlur = 30;
			this.animate();
		},
		animate: function() {
			window.requestAnimFrame(this.animate.bind(this));
			this.draw();
		},
		draw: function() {
			bgBallsCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			this.ballsArr.forEach(function(ball) {
				ball.draw(App.time);
			});

			//clear out the past lines
			fgCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			this.linesArr.forEach(function(line) {
				line.x = App.emitter.x;
				line.y = App.emitter.y;
				line.draw(App.time);
			});

			App.emitter.x += sin(App.emitter.angle) * App.emitter.step;
			App.emitter.y += cos(App.emitter.angle) * App.emitter.step;

			App.emitter.angle += this.time;

			this.time++;

			/*if (this.time%30===0)
				this.linesArr = shuffle(this.linesArr);*/

		},
		createLines: function() {
			var i = FG_LINES_COUNT;
			while (i--) {
				// new line (x, y, color, ease, size, offset)
				this.linesArr.push(new Line(0,0,FG_LINES_COLORS[i],5,LineSize, {x: 0,y: 0}));
			}
		},
		createBalls: function() {
			var i = BG_BALLS_COUNT;
			while (i--) {
				this.ballsArr.push(
					new Ball(
						random() * CANVAS_WIDTH,
						random() * CANVAS_HEIGHT,
						random() * 5,
						random(), {
							r: BG_BALLS_GRAY,
							g: BG_BALLS_GRAY,
							b: BG_BALLS_GRAY,
							a: random()
						}
					)
				);
			}
		},
		drawBgLines: function() {
			var i = BG_LINES_COUNT,
				position = {
					x: 0,
					y: 0
				},
				gray,
				angle,
				j;

			while (i--) {

				j = BG_LINES_LENGTH;
				position.x = position.y = CANVAS_WIDTH / 2;
				angle = toRadians(random() * 360);
				gray = ~~ (random() * 30) + 10;
				gray = gray < 10 ? 15 : gray;
				bgCtx.fillStyle = 'rgb(' + gray + ', ' + gray + ',' + gray + ')';

				while (j--) {
					bgCtx.beginPath();
					bgCtx.arc(position.x, position.y, j / BG_LINES_LENGTH * 2, 0, TwoPI);
					position.x += cos(angle) + random() - 0.5;
					position.y += sin(angle) + random() - 0.5;
					angle += j / ((random() * BG_LINES_LENGTH * 100) - BG_LINES_LENGTH / 2);
					bgCtx.fill();
				}
			}
		}
	};

App.init();

console.log(Object.getOwnPropertyNames(Math));