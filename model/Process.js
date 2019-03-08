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


Process.prototype.printRegular = function(){

		this.ctx.beginPath();
		this.ctx.font = "15px Courier New";
		this.ctx.lineWidth = "2";
		this.ctx.strokeStyle = "black";
		this.ctx.rect(this.x, this.y, this.w + this.m *2 , this.h); 
		this.ctx.stroke();
		this.ctx.fillStyle = "#0056E0";
		ctx.textAlign = "center";
		this.ctx.fillText(this.text, this.x + this.m + this.w/2  ,this.y + this.h/2);
		this.printLinks();
}


Process.prototype.printLinks = function(){
    var i = 0;
	for(i=0; i<this.links.length; i++){
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#000";
		this.ctx.moveTo(this.x + this.w/2 + this.m/2, this.y+this.h);
		this.ctx.lineTo(this.links[i].x+this.links[i].w/2 + this.m/2, this.links[i].y);
		this.ctx.stroke();
	}
}



Process.prototype.printSelected = function(){
	
	this.ctx.globalAlpha = 0.2;
	this.printRegular();
	this.ctx.globalAlpha = 1;
	this.ctx.beginPath();
	this.ctx.fillStyle = "#0056E0";
	this.ctx.rect(this.x-2, this.y-2, 5, 5); 
	this.ctx.rect(this.x-2, this.y+this.h-2, 5, 5); 
	this.ctx.rect(this.x+this.w + this.m*2 -3, this.y-2, 5, 5); 
	this.ctx.rect(this.x+this.w + this.m*2 -3, this.y+this.h-2, 5, 5); 
	this.ctx.fill();
}

//nao usado
Process.prototype.printOption = function(){
	
	this.btadd.print();
	this.btflow.print();
	
	this.ctx.globalAlpha = 0.2;
	this.printRegular();
	this.ctx.globalAlpha = 1;
	this.ctx.beginPath();
	this.ctx.fillStyle = "#0056E0";

}
	
	
Process.prototype.click = function(x, y){

	if ( ( (x > this.x)  &&  (x < this.x+this.w)) && ( (y > this.y)  &&  (y < this.y+this.h))) {
		return true;	
	}
	
	return false;
}


Process.prototype.print = function(){
	
	if(this.selected){
		this.printSelected();
	}else if(this.options){
		this.printOption();
	}else{
		this.printRegular();
	}
}

Process.prototype.updateCommand = function(command){
	this.text = command;
	this.resizeBlock();
}
	
Process.prototype.resizeBlock = function(){
	this.w = this.ctx.measureText(this.text).width;
}


Process.prototype.addLink = function(idblock){
	this.links.push(idblock);
}
