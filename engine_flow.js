EngineFlow = function(){	
	this.debug = false;
	this.selectedBlock;	
	this.marginX;
	this.ctrl = false;
	this.wsize = parseInt($("#canv-flow").css("width").substring(0,$("#canv-flow").css("width").length-2));
	this.hsize = parseInt($("#canv-flow").css("height").substring(0,$("#canv-flow").css("height").length-2));
	console.log(this.wsize);
	_this = this;
	window.onkeyup = function(e){
		if(e.key == "Control")
			_this.ctrl = false;
	}
	
	
	window.onkeydown = function(e){
		if(e.key == "Control")
			_this.ctrl = true;
	}
	
	$("#bt-updateblock").click(function(){
		
		var command = $("#command-block").val();
		if(_this.selectedBlock)
			_this.selectedBlock.updateCommand(command);
		
	});
	
	$("#bt-geratecode").click(function(){
		_this.getCommands();	
	});
	
	$("#bt-addlink").click(function(){
		if(_this.selectedBlock == null){
			alert("Choise a block!");
			return;
		}
		var p = new Process(100,200, ctx, "/*your command here*/");
		_this.selectedBlock.addLink(p);
		_this.addBlock(p);
	});
}

EngineFlow.prototype.stackBlock = [];

EngineFlow.prototype.start = function(){
	_this = this;
	window.requestAnimationFrame( function(){ _this.loop(_this)} );
}

EngineFlow.prototype.addBlock = function(block){
	block.name = "Block n"+this.stackBlock.length;
	this.stackBlock[this.stackBlock.length] = block;
}

EngineFlow.prototype.loop = function(_this){	
	ctx.clearRect(0,0,this.wsize,this.hsize);

	for(i=0; i < _this.stackBlock.length; i++){
		_this.stackBlock[i].print();
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
	
	
	console.log(textCommands);
	
	
}
