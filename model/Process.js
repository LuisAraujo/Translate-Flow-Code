Process = function(x, y, ctx, command){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 40;
	this.m = 10;
	this.command = command;
	this.w = this.ctx.measureText(this.command).width;
	this.selected = false;
	this.moving = false;
	this.links = [];
	this.type = "process";
	
	
}

herda(Block, Process);



Process.prototype.printBlock = function(){
    this.ctx.fillRect(this.x, this.y, this.w + this.m *2 , this.h); 
	this.ctx.strokeRect(this.x, this.y, this.w + this.m *2 , this.h); 
	 
}

Process.prototype.printText = function(){
    this.ctx.fillStyle = "#0056E0";
	ctx.textAlign = "center";
	this.ctx.fillText(this.command, this.x + this.m + this.w/2  ,this.y + this.h/2);
}
