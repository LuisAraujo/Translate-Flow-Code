StartEnd = function(x, y, ctx, command){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 40;
	this.m = 30;
	this.command = command;
	this.w = this.ctx.measureText(this.command).width;
	this.selected = false;
	this.moving = false;
	this.links = [];
	this.type = command;

	
	
}

herda(Block, StartEnd);

StartEnd.prototype.printBlock = function(){
    this.ctx.beginPath();
	roundRect(this.ctx, this.x, this.y, this.w+this.m, this.h, this.h/2, 0, true); 
   	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.stroke();
	
}


StartEnd.prototype.printText = function(){
    this.ctx.fillStyle = "#0056E0";
	this.ctx.textAlign = "center";
	this.ctx.fillText(this.command, this.x + this.m/2 + this.w/2  ,this.y + this.h/2);
}

StartEnd.prototype.printColider = function(){
	this.ctx.strokeStyle = "#42f445";
	this.ctx.strokeRect(this.x, this.y, this.w + this.m  , this.h); 
}

Block.prototype.click = function(x, y){

	if ( ( (x > this.x)  
		&&  (x < this.x+ this.w+this.m)) 
		&& ( (y > this.y)  
		&&  (y < this.y+this.h))) {
		return true;	
	}
	
	return false;
}


StartEnd.prototype.updateCommand = function(command){
	alert("Do not is possible change start and end command");
}
	
