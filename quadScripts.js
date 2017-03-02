//Javascript for drawing and calculating quadratics 2017
// Nia 1/26/17 for quad grapher
var a, b, c, context, w, h, k=40;

function init() {
  canvas= document.getElementById("mycanvas");
  context = canvas.getContext("2d");
  w = canvas.width = 800;
  h = canvas.height = 500;
  console.log('canvas is loaded into context');
  grid();
  $("#answers").hide();
canvasOffset = $("#mycanvas").offset();
offsetX = Math.round(canvasOffset.left),
offsetY = Math.round(canvasOffset.top); 
canvas.addEventListener("mousemove", doMouseMove, false);
}  // close init

function grid() {

  // thin line with a 40% opacity using rgba() 
  context.lineWidth=1;
  context.strokeStyle="rgba(11,79,0,1)";

//using the direct variation constant, k
//  here are the vertical and horizontal lines
  for ( i=0; i<h/(2*k); i++ ) {
      context.beginPath();
      context.moveTo( 0, h/2-i*k );
      context.lineTo( w, h/2-i*k );
      context.stroke();
      context.beginPath();
      context.moveTo( 0, h/2+i*k);
      context.lineTo( w, h/2+i*k );
      context.stroke();
    }
  for ( i=0; i<w/(2*k); i++ ) {
      context.beginPath();
      context.moveTo( w/2-i*k, 0 );
      context.lineTo( w/2-i*k, h );
      context.stroke();
      context.beginPath();
      context.moveTo( w/2+i*k, 0 );
      context.lineTo( w/2+i*k, h );
      context.stroke();
    }
  context.lineWidth=3;
    // x axis
        context.beginPath();
        context.moveTo(0,h/2);
        context.lineTo(w,h/2);
        context.stroke();

    // y axis
        context.beginPath();
        context.moveTo(w/2,0);
        context.lineTo(w/2,h);
        context.stroke();

}  //close grid

function QF() {
  // getting values to do quadratic formula
  a = $("#quadA").val();
  b = $("#linB").val();
  c = $("#constant").val();
  console.log(a,b,c);
  results(); 
  solutions();
  graphQuad();
}  // close QF

function results() {
  // finding vertex and displaying symline and yint results
  context.fillStyle="white";
  vX = -(b*1)/(2*a);
  vY = a*Math.pow(vX,2)+b*vX+c*1;
  vY = vY.toFixed(1);
  vX = vX.toFixed(1);
  context.beginPath();
  context.arc(w/2+vX*k,h/2-vY*k,5,0,6.28);
  context.fill();
  $("#vertex").text("Vertex is at (" + vX+","+vY+")");
  $("#vertexForm").text("Vertex Form is y= "+a+"(x-"+vX+")^2+ "+vY);
  $("#yInt").text("the y intercept is at (0,"+c+")");
  context.beginPath();
  context.arc(w/2,h/2-c*k,5,0,6.28);
  context.fill();

  context.setLineDash([5,10]);
  context.beginPath();
  context.moveTo(w/2+vX*k, 5);
  context.lineTo(w/2+vX*k, h-5);
  context.stroke();
  context.setLineDash([0]);

}  // close results()

function solutions() {
// qudratic formula
$("#answers").fadeIn(1500);
d = Math.pow(b*1,2)-4*a*c;
if (d<0) {
$("#solution1").text("The solutions are imaginary (no x-intercepts).");
}

else{
// the quadratic formula needs to be typed below assigning x1 and x2

x1 = (-1*b+d**.5)/(2*a)
x2 = (-1*b-d**.5)/(2*a)
x1 = x1.toFixed(3);
x2 = x2.toFixed(3);
$("#solution1").text("x = " + x1);
$("#solution2").text("x = " + x2);
  context.beginPath();
  context.arc(w/2+x1*k,h/2,5,0,6.28);
  context.arc(w/2+x2*k,h/2,5,0,6.28);
  context.fill();

}  //close of the if-else

}  //close solutions

function graphQuad () {
  for (var i = 0; i < w; i++) {
    x = (w/2-i)/k;
    y = c*1+b*x+a*Math.pow(x,2);
    nx =  (w/2-(i+1))/k;
    ny =  c*1+b*nx+a*Math.pow(nx,2);
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "LightGreen";
    context.moveTo(w/2+x*k, h/2-y*k);
    context.lineTo(w/2+nx*k, h/2-ny*k);
    context.stroke();
  }
} //close graphQuad
function zoomIn() {

    k = k + 2;
    resetCanvas();

}  // end zoomIN

function zoomOut() {

    k = k - 2;
    resetCanvas();

}  // end zoomOut

function resetCanvas(){
  context.clearRect(0,0,w,h);
  grid();
  graphQuad();
  results();
  solutions();
} // end resetCanvas

function doMouseMove(event) {
  resetCanvas();
    // always know where ther mouse is located
  mouseX = event.clientX-offsetX;
  mouseY = event.clientY-offsetY;
  pointX = (mouseX-w/2)/k;
  pointY = a*Math.pow(pointX,2)+b*pointX+c*1;
  pointX =  pointX.toFixed(2);
  pointY =  pointY.toFixed(2);
  console.log(mouseX,mouseY, pointX, pointY, offsetY, offsetX);
  context.beginPath();
  context.arc(mouseX,(h/2-pointY*k),5,0,2*Math.PI);
  context.fill(); 
  $("#point").text("Point on the curve: ("+pointX+","+pointY+")");
}  // end doMouseMove