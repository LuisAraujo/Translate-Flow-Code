Decision = function(x, y, ctx, command){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 70;
	this.m = 20;
	this.command = "A > 10";
	this.propText = 1.6;
	this.w = this.ctx.measureText(this.command).width * this.propText;
	this.selected = false;
	this.moving = false;
	this.linksyes = null;
	this.linkno = null;
	this.wline = 60;
	this.type = "decision";
	
	
}

herda(Block, Decision);



Decision.prototype.printBlock = function(){
	
	this.ctx.beginPath();
	this.ctx.moveTo(this.x - this.m/4, this.y+this.h/2);
	
	this.ctx.lineTo(this.x+this.w/2 + this.m/4 , this.y+this.h);
	
	this.ctx.lineTo(this.x + this.w + this.m/2 , this.y+this.h/2);
	
	this.ctx.lineTo(this.x+this.w/2 + this.m/4 , this.y);
	
	this.ctx.closePath(); 
	this.ctx.stroke();
	this.ctx.fillText("no", this.x - this.m/4 - this.ctx.measureText("no").width,  this.y+this.h/2 - 10);
	this.ctx.fillText("yes", this.x + this.w + this.m/2 + this.ctx.measureText("no").width,  this.y+this.h/2 - 10);
	
}

Decision.prototype.printText = function(){
    this.ctx.fillStyle = "#0056E0";
	ctx.textAlign = "center";
	this.ctx.fillText(this.command, this.x + this.w/2 + this.m/4, this.y + this.h/2);
}

Decision.prototype.printLinks = function(color){
	this.ctx.globalAlpha = 1;
	this.ctx.strokeStyle = color == undefined?"#000":color;

	if(this.linkyes){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - this.m/4 ,  this.y+this.h/2);
		this.ctx.lineTo(this.x - this.m/4 - this.wline,  this.y+this.h/2);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(this.x - this.m/4 - this.wline,  this.y+this.h/2);
		this.ctx.lineTo(this.linkyes.x + this.linkyes.w/2 + this.m/2, this.linkyes.y);
		this.ctx.closePath();
		this.ctx.stroke();
	}
	
	if(this.linkno){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x + this.w + this.m/2,  this.y+this.h/2);
		this.ctx.lineTo(this.x + this.w + this.m/2 + this.wline,  this.y+this.h/2);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(this.x + this.w + this.m/2 + this.wline,  this.y+this.h/2);
		this.ctx.lineTo(this.linkno.x + this.linkno.w/2 + this.m/2, this.linkno.y);
		this.ctx.closePath();
		this.ctx.stroke();
	}
}

