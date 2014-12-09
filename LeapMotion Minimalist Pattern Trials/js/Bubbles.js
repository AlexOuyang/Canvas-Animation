//bg ball - background bubbles
var BubbleCanvas = document.getElementById('bg-balls');
var bgBallsCtx = BubbleCanvas.getContext('2d');
var BG_BALLS_COUNT = 50;
var BG_BALLS_GRAY = 100;
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



var	Bubbles = {
		//the array of bubbles 
		ballsArr: [],
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
		animate: function() {
			window.requestAnimFrame(this.animate.bind(this));
			
			this.draw();
		},
		draw: function() {
			//draw the bubbles
			bgBallsCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			this.ballsArr.forEach(function(ball) {
				ball.draw(Bubbles.time);
			});
		},

		init: function() {
			//create bubbless
			this.createBalls();

			this.animate();
		}
	};

Bubbles.init();
