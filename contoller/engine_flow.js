EngineFlow = function(){
	this.msgerrosmanager = new MsgErroManager();
	this.translate = new TranslateCode();	
	this.runner = new Runner();	
	this.debug = false;
	this.linkingblocks = false;
	this.selectedBlock;	
	this.marginX;
	this.ctrl = false;
	this.wsize = parseInt($("#container-canvas").css("width").substring(0,$("#container-canvas").css("width").length-2));
	this.hsize = parseInt($("#container-canvas").css("height").substring(0,$("#container-canvas").css("height").length-2));
	this.lastBlock_y = 0;
	this.direction = new Image(5, 5);
	this.direction2 = new Image(5, 5);
	this.direction.src = "src/images/direction.png";
	this.direction2.src = "src/images/direction2.png";
	
}

EngineFlow.prototype.upCtrl = function(){
		this.ctrl = false;
}

EngineFlow.prototype.downCtrl = function(){
		this.ctrl = true;
}
EngineFlow.prototype.stackBlock = new Array();

EngineFlow.prototype.start = function(){
	_this = this;
	canvas.height = this.hsize+30;
	canvas.width = this.wsize;
	window.requestAnimationFrame( function(){ _this.loop(_this)} );
}

EngineFlow.prototype.addBlock = function(block){
	block.name = "Block n"+this.stackBlock.length;
	block.id = this.stackBlock.length;
	this.stackBlock[this.stackBlock.length] = block;
}

EngineFlow.prototype.removeBlock = function(block){
	for(i = 0; i < this.stackBlock.length; i++){
		
		this.stackBlock[i].removeLinks(block);
		
		if( this.stackBlock[i] == block ){
			this.stackBlock.splice(i, 1); 
		}
	}	
}

EngineFlow.prototype.loop = function(_this){	
	ctx.clearRect(0,0,this.wsize,this.hsize);

	for(i=0; i < _this.stackBlock.length; i++){
		_this.stackBlock[i].print();
		if(this.lastBlock_y < _this.stackBlock[i].y)
			this.lastBlock_y = _this.stackBlock[i].y;
	};
	
	window.requestAnimationFrame( function(){ _this.loop(_this)} );
}

EngineFlow.prototype.setDataInMenu = function(){
	$("#name-block").html(this.selectedBlock.name);
	$("#command-block").val(this.selectedBlock.text);
	
	$("#linkto-block").html("<option>No Block</option>");
	this.stackBlock.forEach( function(block, i){
		$("#linkto-block").append("<option val='"+i+"'>"+block.name+"</option>");
	});
}

EngineFlow.prototype.runCode = function(){
	MSG_RUN.show();
	MSG_TEXT_RUN.html("");
	var commandstranlated = this.translate.getCommands(this.stackBlock[0]);
	
	this.runner.startRunning(commandstranlated);
}


EngineFlow.prototype.translateCode = function(){
	var commandstranlated = this.translate.getCommands(this.stackBlock[0]);
	var codejs = this.translate.translateToCode(commandstranlated, "javascrip", "");
	return codejs;
	
}


EngineFlow.prototype.zoomCanvas = function(zoom){
	ctx.scale(zoom, zoom);
	this.resizeCanvas();
}


EngineFlow.prototype.resizeCanvas = function(){
	
	if(this.stackBlock.length == 0){
		
		canvas.height = parseInt($("#container-canvas").css("height").substring(0,$("#container-canvas").css("height").length-2));
		canvas.width = parseInt($("#container-canvas").css("width").substring(0,$("#container-canvas").css("width").length-2));
		
	}else if(this.lastBlock_y > canvas.height)
	    canvas.height =  lastBlock_y + 100;



	canvas_img.height = canvas.height;
	canvas_img.width = canvas.width;

}

EngineFlow.prototype.exportPng = function(){
	var dataURL = canvas.toDataURL('image/png');
	canvas_img.src = dataURL;
}
