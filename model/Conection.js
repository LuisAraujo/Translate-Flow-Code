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
	this.links  = [];
	this.wline = 40;
	this.type = "conection";
	
	
}

herda(Block, Conection);



Conection.prototype.printBlock = function(){
	
	this.ctx.beginPath();
	this.ctx.arc(this.x + this.w, this.y + this.w, this.w, 0, 2 * Math.PI);
	this.ctx.closePath(); 
	this.ctx.fill();
	this.ctx.stroke();	
		
}




Conection.prototype.printText = function(){}

Conection.prototype.printLinks = function(color){
	this.ctx.globalAlpha = 1;
	for(var i=0; i<this.links.length; i++){
		this.ctx.strokeStyle = color == undefined?"#000":color;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x + this.w + this.m/2, this.y+this.h*2);
		this.ctx.lineTo(this.links[i].x + this.links[i].w/2 + this.m/2, this.links[i].y);
		this.ctx.closePath();
		this.ctx.stroke();
	}
}


Conection.prototype.click = function(x, y){

	if ( ( (x > this.x)  
		&&  (x < this.x+ this.w*2)) 
		&& ( (y > this.y)  
		&&  (y < this.y+this.h*2))) {
		return true;	
	}
	
	return false;
}

Conection.prototype.printColider = function(){
    this.ctx.strokeStyle = "#42f445";
	this.ctx.strokeRect(this.x, this.y, this.w*2 , this.h*2); 
}