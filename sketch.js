/* GAME variables*/
var scl = 40;
var food;
var walls = false
var score = 0
var pause = false;
var w;
var h;
var difficulty = 0.5;
/* GAME variables*/


/*Speech recognition*/
var myRec = new p5.SpeechRec('en-US', parseResult);
myRec.continuous = true;
myRec.interimResults = true;

var most_recent_word
/*Speech recognition*/



function setup() {
	scl = floor(windowHeight / 15)
	w = floor((windowWidth - scl) / scl) * scl
	h = floor((windowHeight - scl) / scl) * scl
	canvas = createCanvas(w, h);
	canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2)
	s = new snake();
	frameRate(10 * difficulty);

	pickLocation();

	//Start speech recognition
	myRec.start()
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

function renderFood() {
	if (s.eat(food)) {
		score += difficulty * 10
		pickLocation();
	}
	fill(100, 200, 100, );
	rect(food.x, food.y, scl, scl);
}

function pickLocation() {
	var cols = floor(width / scl);
	var rows = floor(height / scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}




function play_pause() {
	if (pause) {
		pause = false;
		loop()
	} else if (!pause) {
		pause = true;

		noLoop();
	}

}
function renderTexts() {
	textAlign(CENTER)

	textSize(20)
	fill(27, 225, 124, 140)
	text("score:" + score, width / 9, height / 20)

	textSize(15)
	fill(255)
	if (pause) {
		text("II PAUSED", width / 10, height / 7)
		noLoop()
	}

	textSize(30)
	fill(255)
	if (s.bitted) {
		text("don't hurt yourslef!! :P\npress x to play again", width / 2, height / 3)
		pause = true;
	}

	textSize(20)
	fill(255)
	if (s.wallHit) {
		text("you banged your head on wall LOL!\n be carefull \n press x to play again", width / 2, height / 5)
		pause = true
	}



	push()
	textSize(20)
	textAlign(CENTER)
	fill(255, 0, 0)
	text("voice commands::", 20, 20)
	fill(0, 0, 255)
	text("left", 30, 35)
	text("right", 30, 50)
	text("up", 30, 65)
	text("down", 30, 80)
	text("stop", 30, 95)
	text("clear", 30, 110)

	textAlign(RIGHT)
	fill(0, 255, 0,50)
	textSize(30)
	text("COMAAND:", width, 40)
	fill(100,200,150)
	text(" " + myRec.resultString, width, 60)

	
	pop()


}

function reset() {
	s.x = 0
	s.y = 0
	s.tail.splice(0, s.tail.length)
	score = 0
	s.wallHit = false
	s.bitted = false
	s.dir(1, 0)
	pause = false
	loop()
}

function keyPressed() {
	if (keyCode === UP_ARROW || key == "W" || key == "w") {
		s.dir(0, -1)
		console.log(keyCode)
	} else if (keyCode === DOWN_ARROW || key == "S" || key == "s") {
		s.dir(0, 1)
	} else if (keyCode === RIGHT_ARROW || key == "D" || key == "d") {
		s.dir(1, 0)
	} else if (keyCode === LEFT_ARROW || key == "A" || key == "a") {
		s.dir(-1, 0)
	} else if (key == "p" || key == "P") {
		play_pause()
	} else if ((s.bitted || s.wallHit) && (key == "x" || key == "X")) {
		reset()

	}

}


//////////SPEECH RECOGNITION COMMANDS////////////////
function parseResult() {

	// console.log(myRec.resultString)
	most_recent_word = myRec.resultString.split(' ').pop()
	var confidence = myRec.resultConfidence;

	// console.log(most_recent_word + "  conficence::  " + confidence)
	if (most_recent_word.indexOf("left") !== -1) {
		s.dir(-1, 0)
		// console.log(dx)
	}
	else

		if (most_recent_word.indexOf("right") !== -1) {
			s.dir(1, 0)
			// console.log(dx)
		}


	if (most_recent_word.indexOf("up") !== -1) {
		s.dir(0, -1)
		// console.log(dy)
	}
	else

		if (most_recent_word.indexOf("down") !== -1) {
			s.dir(0, 1)
			// console.log(dy)
		}


	if (most_recent_word.indexOf("stop") !== -1) {
		pause = true;
		noLoop();
	}
	else
		if (most_recent_word.indexOf("start") !== -1) {
			pause = false
			loop()
		}
		else
		if (most_recent_word.indexOf("reset") !== -1) {
			reset()
		}
		else
		if (most_recent_word.indexOf("reload") !== -1) {
			location.reload()
		}

	if (most_recent_word.indexOf("fast") !== -1) {
		difficulty*=1.2;
		frameRate(10 * difficulty);
		// console.log(difficulty)
	} else

		if (most_recent_word.indexOf("slow") !== -1) {
			difficulty*=0.8
			frameRate(10 * difficulty);
			// console.log(difficulty)
		}



}