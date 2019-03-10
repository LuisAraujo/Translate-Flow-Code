Block = function(x, y, ctx, command){
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



Block.prototype.printRegular = function(){

	this.ctx.font = "15px Courier New";
	this.ctx.lineWidth = "2";
	this.ctx.strokeStyle = "black";
	
	this.printBlock();
	this.printText();

	this.printLinks();
}

Block.prototype.printLinks = function(color){
	this.ctx.globalAlpha = 1;
	for(var i=0; i<this.links.length; i++){
		this.ctx.strokeStyle = color == undefined?"#000":color;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x + this.w/2 + this.m/2, this.y+this.h);
		this.ctx.lineTo(this.links[i].x+this.links[i].w/2 + this.m/2, this.links[i].y);
		this.ctx.closePath();
		this.ctx.stroke();
	}
}


Block.prototype.printSelected = function(){
	this.ctx.strokeStyle = "#4286f4";
	this.ctx.font = "15px Courier New";
	this.ctx.lineWidth = "2";
	this.printBlock();
	this.ctx.textAlign = "center";
	this.ctx.fillStyle = "#0056E0";
	this.ctx.fillText(this.text, this.x + this.m + this.w/2  ,this.y + this.h/2);
	this.printLinks();
}

Block.prototype.printMoving = function(){
	this.ctx.font = "15px Courier New";
	this.ctx.lineWidth = "2";
	this.ctx.strokeStyle = "#aaa";
	this.printBlock();
	this.ctx.fillStyle = "#aaa";
	this.ctx.textAlign = "center";
	this.ctx.fillText(this.text, this.x + this.m + this.w/2  ,this.y + this.h/2);
	this.ctx.setLineDash([4, 2]);
	this.printLinks("#aa");
	this.ctx.setLineDash([0, 0]);
}

	
Block.prototype.click = function(x, y){

	if ( ( (x > this.x)  
		&&  (x < this.x+ this.w+this.m*2)) 
		&& ( (y > this.y)  
		&&  (y < this.y+this.h))) {
		return true;	
	}
	
	return false;
}


Block.prototype.print = function(){
	
	if(this.moving){
		this.printMoving();
	}else if(this.selected){
		this.printSelected();
	}else{
		this.printRegular();
	}
}

Block.prototype.updateCommand = function(command){
	this.text = command;
	this.resizeBlock();
}
	
Block.prototype.resizeBlock = function(){
	this.w = this.ctx.measureText(this.text).width;
}


Block.prototype.addLink = function(idblock){
	this.links.push(idblock);
}
