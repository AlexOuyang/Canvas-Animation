
var HandDetected = false;
//fold index finger - HandIndexFingerDirection <0; extend index finger - HandIndexFingerDirection>0
var HandIndexFingerDirection;
var HandMiddleFingerDirection;
//Hand position (x,y,z) x-leapmotion length direction, y-height, z -width
var HandX;
var HandY;
var HandZ;

//setup leapmotion controller
var controller = Leap.loop({
	frame: function(frame){
		//detect gesture
  		var hand = frame.hands[0];
  		if (hand){
  			HandDetected = true;
  			//App.init();
   			var LeapIndexFinger = Leap.vec3.dot(hand.direction, hand.indexFinger.direction);
   			var LeapMiddleFinger = Leap.vec3.dot(hand.direction, hand.middleFinger.direction);
    		console.assert(!isNaN(LeapIndexFinger));

    		HandIndexFingerDirection = LeapIndexFinger.toPrecision(2);
    		HandMiddleFingerDirection = LeapMiddleFinger.toPrecision(2);

    		//console.log(HandIndexFingerDirection);

	  		//detect hand position
			var Handaverage = avgHandPosition(hand, 30);
			//adjust HandY position
			HandX = Handaverage[0] * (2) + 400;
			//adjust HandY position on canvas
			HandY = Handaverage[1] * (-2) + 800;
			HandZ = Handaverage[1];

			//check if both hands are registered
			var pointablesMap = frame.pointablesMap;
			var fingerSize = Object.keys(pointablesMap).length;
			if(fingerSize ==10){
				//console.log("both hands");
			}else{
				//
			}


			console.log(fingerSize);


  		} else {
  			HandDetected = false;

  		} 
  	}

});


//helper function
function avgHandPosition(hand, historySamples) {
	var sum = Leap.vec3.create();
	Leap.vec3.copy(sum, hand.palmPosition);

	for(var s = 1; s < historySamples; s++){
	    var oldHand = controller.frame(s).hand(hand.id)
	    if(!oldHand.valid) break;
	    Leap.vec3.add(sum, oldHand.palmPosition, sum);
	}
	
	Leap.vec3.scale(sum, sum, 1/s);
	return sum;
}

//activate the patternCluster
App.init();



				PatternCxt.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


