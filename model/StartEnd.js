StartEnd = function(x, y, ctx, type){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 40;
	this.m = 30;
	this.text = "";
	
	if(type == "end")
		this.text = "End";
	else if(type == "start")
		this.text = "Start";
		
	this.w = this.ctx.measureText(this.text).width;
	this.selected = false;
	this.moving = false;
	this.links = [];
	
	
}

StartEnd.prototype.printLinks = function(){
    var i = 0;
	for(i=0; i<this.links.length; i++){
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#000";
		this.ctx.moveTo(this.x + this.w/2 + this.m/2, this.y+this.h);
		this.ctx.lineTo(this.links[i].x+this.links[i].w/2 + this.m/2, this.links[i].y);
		this.ctx.stroke();
	}
}



StartEnd .prototype.printRegular = function(){

		
		this.ctx.beginPath();
		this.ctx.font = "15px Courier New";
		this.ctx.lineWidth = "2";
		this.ctx.strokeStyle = "black";
		roundRect(this.ctx, this.x, this.y, this.w+this.m, this.h, this.h/2, 0, true);
		//this.ctx.rect(this.x, this.y, this.w + this.m *2 , this.h); 
		this.ctx.stroke();
		this.ctx.fillStyle = "#0056E0";
		ctx.textAlign = "center";
		this.ctx.fillText(this.text, this.x + this.m/2 + this.w/2  ,this.y + this.h/2);
		this.printLinks();
}

StartEnd.prototype.printSelected = function(){
	
	this.ctx.globalAlpha = 0.2;
	this.printRegular();
	this.ctx.globalAlpha = 1;
	this.ctx.beginPath();
	this.ctx.fillStyle = "#0056E0";
	this.ctx.rect(this.x-2, this.y-2, 5, 5); 
	this.ctx.rect(this.x-2, this.y+this.h-2, 5, 5); 
	this.ctx.rect(this.x+this.w + this.m  -3, this.y-2, 5, 5); 
	this.ctx.rect(this.x+this.w + this.m -3, this.y+this.h-2, 5, 5); 
	this.ctx.fill();
}

StartEnd.prototype.printOption = function(){
	
	this.btadd.print();
	this.btflow.print();
	
	this.ctx.globalAlpha = 0.2;
	this.printRegular();
	this.ctx.globalAlpha = 1;
	this.ctx.beginPath();
	this.ctx.fillStyle = "#0056E0";

}
	
	
StartEnd.prototype.click = function(x, y){

	if ( ( (x > this.x)  &&  (x < this.x+this.w)) && ( (y > this.y)  &&  (y < this.y+this.h))) {
		return true;	
	}
	
	return false;
}


StartEnd.prototype.print = function(){
	
	if(this.selected){
		this.printSelected();
	}else if(this.options){
		this.printOption();
	}else{
		this.printRegular();
	}
}

StartEnd.prototype.addLink = function(idblock){
	this.links.push(idblock);
}
