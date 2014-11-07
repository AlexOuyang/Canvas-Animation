var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasWidth = canvas.width = window.innerWidth,
    canvasHeight = canvas.height = window.innerHeight,  
    cellWidth = 80,
    cellHeight = 80,
    columns = Math.ceil(canvasWidth / cellWidth),
    rows = Math.ceil(canvasHeight / cellHeight),
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    },
	  iCol, iRow;
		
var render = function(x,y){
  //clear out the previous drawing
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  
  for(iCol = 0; iCol < columns; iCol++){
    for(iRow = 0; iRow < rows; iRow++){	     
      var pattern = rand(0, 3);
      var lightness = rand(0, 90);
      //starts drawing
      context.beginPath();      
      if(pattern === 0){
        context.moveTo(iCol * cellWidth, iRow * cellHeight);      
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight);
        context.lineTo(iCol * cellWidth, iRow * cellHeight + cellHeight);
      } else if(pattern === 1){
        context.moveTo(iCol * cellWidth + cellWidth, iRow * cellHeight);      
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight + cellHeight);
        context.lineTo(iCol * cellWidth, iRow * cellHeight);
      } else if(pattern === 2){
        context.moveTo(iCol * cellWidth + cellWidth, iRow * cellHeight + cellHeight);      
        context.lineTo(iCol * cellWidth, iRow * cellHeight + cellHeight);
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight);
      } else {
        context.moveTo(iCol * cellWidth, iRow * cellHeight + cellHeight);      
        context.lineTo(iCol * cellWidth, iRow * cellHeight);
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight + cellHeight);
      }
      //context.fillStyle = 'hsl(300, 60%, '+lightness+'%)';  
      //color is depended on mouse x position
      var colorChange = x/4;
      //opacity is depended on mouse y position
      var opacity = y/1000; 
      context.fillStyle = 'hsla('+colorChange+',60%,'+lightness+'%,'+opacity+')'; 
      context.closePath();		
      context.fill();
		};
	};
};

render();

//$(window).on('click', render(event.pageX, event.pageY));

$( "canvas" ).mousemove(function( event ) {
    var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
    var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
    $( "span:first" ).text( "( event.pageX, event.pageY ) : " + pageCoords );
    $( "span:last" ).text( "( event.clientX, event.clientY ) : " + clientCoords );
    //calls the render function when the mouse is moved
    $(window).on('click', render(event.pageX, event.pageY));
});