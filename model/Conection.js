Conection = function(x, y, ctx, command){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 10;
	this.m = 0;
	this.command = "";
	this.w = 10;
	this.selected = false;
	this.moving = false;
	this.linksyes = null;
	this.linkno = null;
	this.wline = 40;
	this.type = "conection";
	
	
}

herda(Block, Conection);



Conection.prototype.printBlock = function(){
	
	this.ctx.beginPath();
	this.ctx.arc(this.x + this.w, this.y + this.w, this.w, 0, 2 * Math.PI);
	this.ctx.closePath(); 
	this.ctx.stroke();	
}

Conection.prototype.printText = function(){}

Conection.prototype.printLinks = function(color){}

