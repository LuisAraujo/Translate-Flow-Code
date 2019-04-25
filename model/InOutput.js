InOutput = function(x, y, ctx, type){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 40;
	this.m = 10;
	this.command = "";
	this.margin = 10;
	this.w = this.margin + this.ctx.measureText(this.command + type).width;
	this.selected = false;
	this.moving = false;
	this.links = [];
	this.type = type;
}



herda(Block, InOutput);



InOutput.prototype.printBlock = function(){
    
	this.ctx.beginPath();
	this.ctx.moveTo(this.x, this.y);
	this.ctx.lineTo(this.x+this.w + 20, this.y );
	this.ctx.lineTo(this.x + this.w, this.y + this.h);
	this.ctx.lineTo(this.x - 20, this.y + this.h);
	this.ctx.lineTo(this.x, this.y);
	this.ctx.closePath(); 
	
	this.ctx.fill();
	this.ctx.stroke();
}

InOutput.prototype.printText = function(color){
    this.ctx.fillStyle = color != undefined?color:"#0056E0";
	ctx.textAlign = "left";
	this.ctx.fillText(this.type.toUpperCase() + "  " + this.command, this.x  ,this.y + this.h/2);
}


InOutput.prototype.resizeBlock = function(){
	this.w = this.margin + parseInt(this.ctx.measureText(this.command + "  "+ this.type).width * this.propText);
}
