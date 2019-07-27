Decision = function(x, y, ctx, command){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 70;
	this.m = 20;
	this.command = command;
	this.propText = 1.6;
	this.w = this.ctx.measureText(this.command).width * this.propText;
	this.selected = false;
	this.moving = false;
	this.linkyes = null;
	this.linkno = null;
	this.wline = 60;
	this.type = "decision";
	this.havelinktome = 0;
}

herda(Block, Decision);



Decision.prototype.printBlock = function(){
	
	this.ctx.beginPath();
	this.ctx.moveTo(this.x - this.m/4, this.y+this.h/2);
	this.ctx.lineTo(this.x+this.w/2 + this.m/4 , this.y+this.h);
	this.ctx.lineTo(this.x + this.w + this.m/2 , this.y+this.h/2);
	this.ctx.lineTo(this.x+this.w/2 + this.m/4 , this.y);
	this.ctx.closePath(); 
	
	this.ctx.fill();
	this.ctx.stroke();
	ctx.fillStyle = "#000";
	this.ctx.fillText("yes", this.x - this.m/4 - this.ctx.measureText("no").width,  this.y+this.h/2 - 10);
	this.ctx.fillText("no", this.x + this.w + this.m/2 + this.ctx.measureText("no").width,  this.y+this.h/2 - 10);
	
}

Decision.prototype.printText = function(color){
    this.ctx.fillStyle = color != undefined?color:"#0056E0";
	ctx.textAlign = "center";
	this.ctx.fillText(this.command, this.x + this.w/2 + this.m/4, this.y + this.h/2);
}




Decision.prototype.printLinks = function(color){
	this.ctx.globalAlpha = 1;
	this.ctx.strokeStyle = color == undefined?"#000":color;

	if(this.linkyes != null){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - this.m/4,  this.y+this.h/2);
		this.ctx.lineTo(this.linkyes.x + this.linkyes.w/2 + this.m/2 ,  this.y+this.h/2);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(this.linkyes.x + this.linkyes.w/2 + this.m/2,  this.y+this.h/2);
		this.ctx.lineTo(this.linkyes.x + this.linkyes.w/2 + this.m/2, this.linkyes.y);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.drawImage(ef.direction,(this.linkyes.x + this.linkyes.w/2 + this.m/2) - 5,this.linkyes.y - 10, 10, 10);
	}
	
	if(this.linkno != null){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x + this.w + this.m/2,  this.y+this.h/2);
		this.ctx.lineTo(this.linkno.x + this.linkno.w/2 + this.m/2,  this.y+this.h/2);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(this.linkno.x + this.linkno.w/2 + this.m/2,  this.y+this.h/2);
		this.ctx.lineTo(this.linkno.x + this.linkno.w/2 + this.m/2, this.linkno.y);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.drawImage(ef.direction,(this.linkno.x + this.linkno.w/2 + this.m/2) - 5,this.linkno.y - 10, 10, 10);
	}
}

Decision.prototype.printColider = function(){
	this.ctx.strokeStyle = "#42f445";
	this.ctx.strokeRect(this.x - this.m/4, this.y, this.w + this.m/2 + this.m/4 , this.h); 
}

Decision.prototype.click = function(x, y){

	if ( ( (x > this.x-this.m/4)  
		&&  (x < this.x+ this.w + this.m/2 + this.m/4)) 
		&& ( (y > this.y)  
		&&  (y < this.y+this.h))) {
		return true;	
	}
	
	return false;
}


/*@overwite*/
Decision.prototype.removeLinks = function(block){
	if(this.linkyes == block)
		this.linkyes = null;
	else
		this.linkno = null;	
}

