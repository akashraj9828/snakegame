function snake() {
	// this.prevX = 0;
	// this.prevY = 0;
	this.x=0
	this.y=0
	// this=createVector(this.x,this.y)
	this.xspeed = 1;
	this.yspeed = 0;

	this.tail = [];

	this.dir = function (x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.setPos=function(x,y){
		if(x)
			this.x=x
		if(y)
			this.y=y
	}


	this.update = function () {
		// this.prevX=this.x
		// this.prevY=this.y
		this.x = this.x + this.xspeed * scl;
		this.y = this.y + this.yspeed * scl;
		console.log("x:"+this.x+"y:"+this.y)
		// this.x = constrain(this.x, 0, width - scl);
		// this.y = constrain(this.y, 0, height - scl);

		// console.log(this)
	}


	this.setX=function(x){
		this.x=x
	}
	this.wall=function(){
		if(walls){
			if(this.x<0||this.y<0||this.x+scl>width||this.y+scl>height){
				textAlign(CENTER)
				textSize(40)
				fill(255)
				text("Game Over",width/2,height/2)
			}

		}else{
			if(this.x>width-scl){
				this.x=0
			}else if(this.x<0){
				this.x=width
			}
			if(this.y>height-scl){
				this.y=0
			}else if(this.y<0){
				this.y=height
			}
		}
	}

	// if(this.x+scl>width){
	// 	this.x=0
	// }else if(this.x<0){
	// 	this.x=width
	// }
	// if(this.y+scl>height){
	// 	this.y=0
	// }else if(this.y<0){
	// 	this.y=height
	// }

	this.show = function () {
		for (var i =0; i <this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		fill(255)
		rect(this.x, this.y, scl, scl);
	}

	this.updateTail=function(){
		
		for(i = this.tail.length-1; i >=0; i--){
			if(i==0){
				this.tail[i]=createVector(this.x,this.y)
			}else{
			this.tail[i]=this.tail[i-1]
			}
			
			
		}
		
	}



	this.eat = function (food) {

		var d = dist(this.x, this.y, food.x, food.y)
		if (d < scl) {
			temp=createVector(this.x,this.y)
			this.tail.push(temp)
			// console.log("tail ddded")

			return true;
		} else {
			return false;
		}

	}
	}
