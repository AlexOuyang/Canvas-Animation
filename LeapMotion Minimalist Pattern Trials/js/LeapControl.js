
var HandDetected = false;
//fist - HandIndexFingerDirection <0; palm - HandIndexFingerDirection>0
var HandIndexFingerDirection;
//gesture control
Leap.loop({
	frame: function(frame){
  		var hand = frame.hands[0];
  		if (hand){
  			HandDetected = true;
  			//App.init();
   			var dot = Leap.vec3.dot(hand.direction, hand.indexFinger.direction);

    		console.assert(!isNaN(dot));

    		HandIndexFingerDirection = dot.toPrecision(2);

    		console.log(HandIndexFingerDirection);
  		} else {
  			HandDetected = false;
  		}
	}
});


//activate the pattern
App.init();



				PatternCxt.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


