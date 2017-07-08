
var scl=40;
var food;

function setup() {
createCanvas(400,400);
s= new snake();
frameRate(7);
	
pickLocation();
}

function draw() {
  background(51);
  s.update();
  s.show();

  
  if (s.eat(food))
  {
	  pickLocation();
	  
  }
  
  
  
	fill(255,0,100);
  rect(food.x,food.y,scl,scl);
  
  
}

function pickLocation(){
	var cols=floor(width/scl);
	var rows=floor(height/scl);
	food=createVector(floor(random(cols)),floor(random(rows)));
	food.mult(scl);	
}


function keyPressed(){
	if(keyCode===UP_ARROW){
		s.dir(0,-1)
	}else if(keyCode===DOWN_ARROW){
		s.dir(0,1)
	}else if(keyCode===RIGHT_ARROW){
		s.dir(1,0)
	}else if(keyCode===LEFT_ARROW){
		s.dir(-1,0)
	}
}