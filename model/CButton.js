CButton = function(x, y, w, h, img, ctx, callback){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.ctx = ctx;
	this.img = new Image();
	this.img.src = img;
	this.callback = callback;
}

CButton.prototype.click = function(x, y){

	if ( ( (x > this.x)  &&  (x < this.x+this.w)) && ( (y > this.y)  &&  (y < this.y+this.h))) {
		this.callback();
		return true;	
	}
	
	return false;
}


CButton.prototype.print = function(){
	this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h); 
}

