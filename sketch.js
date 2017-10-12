
var scl = 40;
var food;
var walls=true
var score=0
var pause=false;
var w;
var h;
var difficulty=1.5;

function setup() {
	scl=floor(windowHeight/15)
	w=floor((windowWidth-scl)/scl)*scl
	h=floor((windowHeight-scl)/scl)*scl
	canvas = createCanvas(w,h);
	canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2)
	s = new snake();
	frameRate(10*difficulty);

	pickLocation();
}

function draw() {
	background(51);

	renderSnake()
	renderFood()
	renderTexts()



}

function renderSnake() {
	s.wall()
	s.show();
	s.updateTail()
	
	s.update();
	s.bite()
	
	
}

function renderFood(){
	if (s.eat(food)) {
		score+=difficulty*10
		pickLocation();
	}
	fill(100, 200, 100,);
	rect(food.x, food.y, scl, scl);
}

function pickLocation() {
	var cols = floor(width / scl);
	var rows = floor(height / scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}




function play_pause(){
	if(pause){
	  pause=false;
	  loop()
	}else if(!pause){
	  pause=true;
	 
	  noLoop();
	}
 
  }
  function renderTexts(){
	textAlign(CENTER)

	textSize(20)
	fill(27,225,124,140)
	text("score:"+score,width/9,height/20)

	textSize(15)
	fill(255)
	if(pause){
		text("II PAUSED",width/10,height/7)
		noLoop()
	}
	
	textSize(30)
	fill(255)
	if(s.bitted){
		text("don't hurt yourslef!! :P\npress x to play again",width/2,height/3)
		pause=true;
	}
	
	textSize(20)
	fill(255)
	if(s.wallHit){
		text("you banged your head on wall LOL!\n be carefull \n press x to play again",width/2,height/5)
		pause=true
}
  }

  function reset(){
	s.x=0
	s.y=0
	s.tail.splice(0,s.tail.length)
	score=0
	s.wallHit=false
	s.bitted=false
	s.dir(1,0)
	pause=false
	loop()
  }

  function keyPressed() {
	if (keyCode === UP_ARROW||key=="W"||key=="w") {
		s.dir(0, -1)
		console.log(keyCode)
	} else if (keyCode === DOWN_ARROW || key=="S"||key=="s") {
		s.dir(0, 1)
	} else if (keyCode === RIGHT_ARROW||key=="D"||key=="d") {
		s.dir(1, 0)
	} else if (keyCode === LEFT_ARROW||key=="A"||key=="a") {
		s.dir(-1, 0)
	}else  if(key=="p" || key=="P"){
		play_pause()
	}else if((s.bitted||s.wallHit) && (key=="x"||key=="X")){
		reset()
		
	}
	
}