Process = function(x, y, ctx, command){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 40;
	this.m = 10;
	this.text = command;
	this.w = this.ctx.measureText(this.text).width;
	this.selected = false;
	this.moving = false;
	this.links = [];
	
	
}

herda(Block, Process);



Process.prototype.printBlock = function(){
    this.ctx.strokeRect(this.x, this.y, this.w + this.m *2 , this.h); 
	 
}

Process.prototype.printText = function(){
    this.ctx.fillStyle = "#0056E0";
	ctx.textAlign = "center";
	this.ctx.fillText(this.text, this.x + this.m + this.w/2  ,this.y + this.h/2);
}
