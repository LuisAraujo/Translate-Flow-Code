EngineFlow = function(){	
	this.debug = false;
	this.selectedBlock;	
	this.marginX;
	this.ctrl = false;
	this.wsize = parseInt($("#container-canvas").css("width").substring(0,$("#container-canvas").css("width").length-2));
	this.hsize = parseInt($("#container-canvas").css("height").substring(0,$("#container-canvas").css("height").length-2));
	this.lastBlock_y = 0; 
	_this = this;
	
	window.onkeyup = function(e){
		
		
		if(e.key == "Control")
			_this.ctrl = false;
	}
	
	
	window.onkeydown = function(e){
		
		//e.preventdefault();
		
		if(e.key == "Control")
			_this.ctrl = true;
	}
	
	BT_ZOOM_IN.click(function(){
		console.log(canvas.scale);
		_this.zoomCanvas(1.1);
	});
	
	BT_ZOOM_OUT.click(function(){
		_this.zoomCanvas(0.9);
	});
	
	BT_UPDATE_BLOCK.click(function(){
		var command = $("#command-block").val();
		if(_this.selectedBlock)
			_this.selectedBlock.updateCommand(command);
	});
	
	BT_GERATE_CODE.click(function(){
		_this.getCommands();	
	});
	
	BT_NEW_BLOCK.click(function(){
		SUB_MENU_BTICONS.show();
		/*if(_this.selectedBlock == null){
			alert("Choise a block!");
			return;
		}
		var p = new Process(100,200, ctx, "/ * your command here* /");
		_this.selectedBlock.addLink(p);
		_this.addBlock(p);*/
	});
	
	
	
	BT_DEL_BLOCK.click(function(){
		if(_this.selectedBlock == null){
			alert("Choise a block!");
			return;
		}
		_this.removeBlock(_this.selectedBlock);  
	});
	
	
	BT_DEL_LINK.click(function(){
		if(_this.selectedBlock == null){
			alert("Choise a block!");
			return;
		}
		if(_this.selectedBlock.type != "decision")
			_this.selectedBlock.clearLinks();	
		else{
			_this.selectedBlock.linkyes = null;			
			_this.selectedBlock.linkno = null;			
		}		
	});
}

EngineFlow.prototype.stackBlock = new Array();

EngineFlow.prototype.start = function(){
	_this = this;
	canvas.height = this.hsize+30;
	console.log(this.wsize, this.hsize)
	canvas.width = this.wsize;
	window.requestAnimationFrame( function(){ _this.loop(_this)} );
}

EngineFlow.prototype.addBlock = function(block){
	block.name = "Block n"+this.stackBlock.length;
	this.stackBlock[this.stackBlock.length] = block;
}

EngineFlow.prototype.removeBlock = function(block){
	for(i = 0; i < this.stackBlock.length; i++){
		
		if(this.stackBlock[i].type != "decision")
			for(j = 0; j < this.stackBlock[i].links.length; j++){
				if(this.stackBlock[i].links[j] == block)
					this.stackBlock[i].links.splice(j, 1); 
			}
		else{
			if(this.stackBlock[i].linksyes == block)
					this.stackBlock[i].linksyes = null;
			else if(this.stackBlock[i].linksno == block)
					this.stackBlock[i].linksno = null;				
		}

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


EngineFlow.prototype.getCommands = function(){
	
	var textCommands = "";
	var i = 0;
	var tempStackBlock = [];
	for(var j=0; j< this.stackBlock.length; j++)
		tempStackBlock[j]  = this.stackBlock[j];
	
	while(tempStackBlock.length != 0){
		var command = tempStackBlock.shift();
		textCommands += command.getType()+":";
		textCommands += command.command+"\n"; 
		
		
		if(command.getType() == "decision"){
			textCommands += "[\n"
			if(command.linkyes!=null){
				textCommands += "yes:[";
				var command2 =  command.linkyes;
				
				while( (command2 != undefined) && ( command2 != null )){
 
					textCommands += command2.getType()+":";
					textCommands += command2.command; 
					
					for( var i = 0; i < tempStackBlock.length; i++){ 
						if ( tempStackBlock[i] ===  command2) {
						 tempStackBlock.splice(i, 1); 
						}
					}
					command2 =  command2.linkyes; 
				};
				textCommands += "]\n";
			}
			
			if(command.linkno!=null){
				textCommands += "no:[";
				var command2 =  command.linkno;
				while( (command2 != undefined) && ( command2 != null )){
					
					textCommands += command2.getType()+":";
					textCommands += command2.command; 
					
					for( var i = 0; i < tempStackBlock.length; i++){ 
						if ( tempStackBlock[i] ===  command2) {
						 tempStackBlock.splice(i, 1); 
						}
					}
					command2 =  command2.linkno;
				};
				
				textCommands += "]\n";
			}
			textCommands += "]\n";
		}
	};
	
}


EngineFlow.prototype.zoomCanvas = function(zoom){
	ctx.scale(zoom, zoom);
	resizeCanvas();
}


EngineFlow.prototype.resizeCanvas = function(_this){	

	if(this.lastBlock_y > canvas.height);
	    canvas.height =  lastBlock_y + 100;
}

