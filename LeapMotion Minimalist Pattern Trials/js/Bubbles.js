//bg ball - background bubbles
var BubbleCanvas = document.getElementById('bubbles');
var BubblesCtx = BubbleCanvas.getContext('2d');
var BubbleCount = 50;
//random rgb gray color value
var BubbleColor = 100;
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
			//each particle moves at different speed
			this.speed = random() * this.size;
			this.x += (random() -random()) * this.speed;
			this.y += (random() -random()) * this.speed;

			BubblesCtx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';
			BubblesCtx.beginPath();
			BubblesCtx.arc(this.x, this.y, this.size, 0, TwoPI);
			BubblesCtx.fill();
		};
	};


// Create a Bubbles Object
var	Bubbles = {
		//the array of bubbles 
		BubbleArray: [],
		createBalls: function() {
			var i = BubbleCount;
			while (i--) {
				this.BubbleArray.push(
					new Ball(
						random() * CANVAS_WIDTH,
						random() * CANVAS_HEIGHT,
						random() * 5,
						random(), 
						{
							r: BubbleColor,
							g: BubbleColor,
							b: BubbleColor,
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
			BubblesCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			this.BubbleArray.forEach(function(ball) {
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
