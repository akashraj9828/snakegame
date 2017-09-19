function snake() {
	this.x = 0;
	this.y = 0;
	this.pos=createVector(this.x,this.y)
	this.xspeed = 1;
	this.yspeed = 0;

	this.tail = [];

	this.dir = function (x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}



	this.update = function () {

		this.pos.x = this.pos.x + this.xspeed * scl;
		this.pos.y = this.pos.y + this.yspeed * scl;
		this.pos.x = constrain(this.pos.x, 0, width - scl);
		this.pos.y = constrain(this.pos.y, 0, height - scl);
		// console.log(this.pos)
	}

	this.updateTail=function(){
		
		for(i = this.tail.length-1; i >=0; i--){
			// console.log("tail:"+i+":"+this.tail[i])
			// temp=tail[i]
			if(i==0){
				this.tail[0]=createVector(this.pos.x,this.pos.y)
			}else{
			this.tail[i]=this.tail[i-1]
			}
			
			
		}
		
	}

	this.show = function () {
		for (var i =0; i <this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		fill(255)
		rect(this.pos.x, this.pos.y, scl, scl);
	}


	this.eat = function (food) {
		var d = dist(this.pos.x, this.pos.y, food.x, food.y)
		if (d < scl) {
			temp=createVector(this.pos.x,this.pos.y)
			this.tail.push(temp)
			// console.log("tail ddded")
			return true;
		} else {
			return false;
		}

	}
	}
