StartEnd = function(x, y, ctx, command){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 40;
	this.m = 30;
	this.text = command;
	this.w = this.ctx.measureText(this.text).width;
	this.selected = false;
	this.moving = false;
	this.links = [];
	
	
}

herda(Block, StartEnd);

StartEnd.prototype.printBlock = function(){
    this.ctx.beginPath();
	roundRect(this.ctx, this.x, this.y, this.w+this.m, this.h, this.h/2, 0, true); 
   	this.ctx.closePath();
	this.ctx.stroke();
	
}


StartEnd.prototype.printText = function(){
    this.ctx.fillStyle = "#0056E0";
	this.ctx.textAlign = "center";
	this.ctx.fillText(this.text, this.x + this.m/2 + this.w/2  ,this.y + this.h/2);
}

